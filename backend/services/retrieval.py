"""
Hybrid retrieval engine — Dense (sentence-transformers embeddings) + Sparse (BM25).
Uses Reciprocal Rank Fusion (RRF) to combine results.
Embeddings are computed once at startup and cached in memory.
"""

import os
import math
from typing import List, Optional

import numpy as np
from rank_bm25 import BM25Okapi

from services.knowledge_base import RESUME_CHUNKS, ResumeChunk


# ─── Module-level state (initialized at startup) 

_embeddings: Optional[np.ndarray] = None  # (num_chunks, embedding_dim)
_bm25: Optional[BM25Okapi] = None
_initialized = False
_embed_model = None  # Lazy-loaded sentence-transformers model


# ─── Embedding Helpers 

def _get_embed_model():
    """Lazy-load the sentence-transformers model."""
    global _embed_model
    if _embed_model is None:
        from sentence_transformers import SentenceTransformer
        _embed_model = SentenceTransformer("all-MiniLM-L6-v2")
        print("[RAG] Loaded sentence-transformers model: all-MiniLM-L6-v2")
    return _embed_model


def _embed_texts(texts: List[str]) -> np.ndarray:
    """Embed a list of texts using sentence-transformers."""
    model = _get_embed_model()
    return model.encode(texts, convert_to_numpy=True).astype(np.float32)


def _embed_query(query: str) -> np.ndarray:
    """Embed a single query string."""
    model = _get_embed_model()
    return model.encode(query, convert_to_numpy=True).astype(np.float32)


# ─── Initialization 

def _tokenize(text: str) -> List[str]:
    """Simple whitespace tokenizer for BM25."""
    return text.lower().split()


def initialize():
    """
    Compute embeddings for all chunks and build the BM25 index.
    Call this once at application startup.
    """
    global _embeddings, _bm25, _initialized

    if _initialized:
        return

    # Build BM25 index
    corpus = [
        _tokenize(f"{c['content']} {' '.join(c['keywords'])}")
        for c in RESUME_CHUNKS
    ]
    _bm25 = BM25Okapi(corpus)

    # Load dense embeddings from pre-computed cache
    try:
        emb_path = os.path.join(os.path.dirname(__file__), 'embeddings.npy')
        if os.path.exists(emb_path):
            _embeddings = np.load(emb_path)
            print(f"[RAG] Loaded pre-computed embeddings from {emb_path} ({_embeddings.shape[1]}d)")
        else:
            print("[RAG] No embeddings.npy found! Run cache_embeddings.py first.")
            # Fallback to computing on the fly using sentence-transformers
            try:
                texts = [c["content"] for c in RESUME_CHUNKS]
                _embeddings = _embed_texts(texts)
                print(f"[RAG] Embedded {len(texts)} chunks dynamically")
            except Exception as e:
                print(f"[RAG] Dynamic embedding failed: {e}")
                _embeddings = None
    except Exception as e:
        print(f"[RAG] Embedding initialization failed: {e}")
        _embeddings = None

    _initialized = True
    print(f"[RAG] Retrieval engine initialized ({len(RESUME_CHUNKS)} chunks)")


# ─── Dense Retrieval 

def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Compute cosine similarity between two vectors."""
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(np.dot(a, b) / (norm_a * norm_b))


def _dense_retrieve(query: str, top_k: int = 10) -> List[tuple[int, float]]:
    """
    Retrieve chunks by embedding similarity.
    Returns list of (chunk_index, similarity_score).
    """
    if _embeddings is None:
        return []

    try:
        query_emb = _embed_query(query)
    except Exception as e:
        print(f"[RAG] Query embedding failed: {e}")
        return []

    # Compute similarities
    similarities = []
    for i in range(len(RESUME_CHUNKS)):
        sim = _cosine_similarity(query_emb, _embeddings[i])
        similarities.append((i, sim))

    # Sort by similarity descending
    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[:top_k]


# ─── Sparse Retrieval (BM25) ────────────────────

def _sparse_retrieve(query: str, top_k: int = 10) -> List[tuple[int, float]]:
    """
    Retrieve chunks using BM25.
    Returns list of (chunk_index, bm25_score).
    """
    if _bm25 is None:
        return []

    tokens = _tokenize(query)
    scores = _bm25.get_scores(tokens)

    indexed_scores = [(i, float(s)) for i, s in enumerate(scores)]
    indexed_scores.sort(key=lambda x: x[1], reverse=True)
    return indexed_scores[:top_k]


# ─── Reciprocal Rank Fusion ─────────────────────

def _reciprocal_rank_fusion(
    *ranked_lists: List[tuple[int, float]],
    k: int = 60,
) -> List[tuple[int, float]]:
    """
    Combine multiple ranked result lists using RRF.
    k=60 is the standard constant from the RRF paper.
    """
    fused_scores: dict[int, float] = {}

    for ranked_list in ranked_lists:
        for rank, (doc_idx, _score) in enumerate(ranked_list):
            if doc_idx not in fused_scores:
                fused_scores[doc_idx] = 0.0
            fused_scores[doc_idx] += 1.0 / (k + rank + 1)

    # Sort by fused score descending
    results = sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)
    return results


# ─── Public API ──────────────────────────────────────────────────────────────

def retrieve(
    query: str,
    intent: Optional[str] = None,
    top_k: int = 5,
) -> List[tuple[ResumeChunk, float]]:
    """
    Hybrid retrieval: dense + sparse + intent-based injection.

    Strategy:
    1. Run dense + sparse retrieval and fuse with RRF
    2. If a valid intent is detected, GUARANTEE that all intent-matched
       chunks appear in the results (inject them at the top)
    3. Fill remaining slots from the fused ranking

    Args:
        query: The user's question
        intent: Classified intent (e.g. "skills", "projects")
        top_k: Number of chunks to return

    Returns:
        List of (chunk, score) tuples, sorted by relevance.
    """
    if not _initialized:
        initialize()

    # Run both retrievers
    dense_results = _dense_retrieve(query, top_k=15)
    sparse_results = _sparse_retrieve(query, top_k=15)

    # Fuse results
    fused = _reciprocal_rank_fusion(dense_results, sparse_results)

    # Build result set with intent injection
    results: List[tuple[ResumeChunk, float]] = []
    used_ids: set[str] = set()

    if intent and intent not in ("greeting", "thanks", "personal", "unknown"):
        # First: inject all chunks matching the intent, ordered by their fused score
        intent_chunks = []
        for doc_idx, score in fused:
            chunk = RESUME_CHUNKS[doc_idx]
            if chunk["category"] == intent:
                intent_chunks.append((chunk, score * 2.0))  # Strong boost
                used_ids.add(chunk["id"])

        # If no intent chunks came from fusion, pull them directly from the KB
        if not intent_chunks:
            for i, chunk in enumerate(RESUME_CHUNKS):
                if chunk["category"] == intent:
                    intent_chunks.append((chunk, 0.5))  # Base score
                    used_ids.add(chunk["id"])

        results.extend(intent_chunks)

    # Fill remaining slots from the fused ranking
    for doc_idx, score in fused:
        if len(results) >= top_k:
            break
        chunk = RESUME_CHUNKS[doc_idx]
        if chunk["id"] not in used_ids:
            results.append((chunk, score))
            used_ids.add(chunk["id"])

    return results[:top_k]
