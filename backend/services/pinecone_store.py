"""Pinecone dense-vector retrieval with versioned portfolio namespace.

Pinecone index schema: {"fields":{"embedding":{"type":"dense_vector",
"dimension":1024,"metric":"cosine"}}}. Create once via scripts/sync_pinecone.py.
Only permit returned IDs present in the curated portfolio corpus; the model
cannot cite arbitrary Pinecone metadata.
"""
import logging
import os
from functools import lru_cache
from services.retrieval import RESUME_CHUNKS

logger = logging.getLogger("portfolio.pinecone")
CORPUS = {chunk["id"]: chunk for chunk in RESUME_CHUNKS}
NAMESPACE = os.getenv("PINECONE_NAMESPACE", "portfolio-v1")
EMBEDDING_MODEL = os.getenv("PINECONE_EMBED_MODEL", "multilingual-e5-large")

def configured():
    return bool(os.getenv("PINECONE_API_KEY") and os.getenv("PINECONE_INDEX"))

@lru_cache(maxsize=1)
def _resources():
    from pinecone import Pinecone
    pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"], timeout=8)
    index = pc.index(os.environ["PINECONE_INDEX"])
    return pc, index

def vector_search(query, intent=None, top_k=6):
    """Return only evidence entries identified by Pinecone, with similarity values."""
    if not configured():
        return []
    pc, index = _resources()
    vector = pc.inference.embed(
        model=EMBEDDING_MODEL,
        inputs=[query[:800]],
        parameters={"input_type": "query"},
    ).data[0].values
    response = index.query(
        vector=list(vector), namespace=NAMESPACE,
        top_k=min(20, max(top_k * 2, 10)), include_metadata=True,
    )
    ranked = []
    for item in response.matches:
        chunk = CORPUS.get(item.id)
        if not chunk:
            continue
        if intent in ("contact", "education", "experience", "skills") and chunk["category"] != intent:
            continue
        score = float(item.score or 0)
        if score < float(os.getenv("PINECONE_MIN_SIMILARITY", "0.72")):
            continue
        ranked.append((chunk, score))
        if len(ranked) >= top_k:
            break
    return ranked
