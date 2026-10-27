"""Index curated public portfolio evidence in Pinecone.

Environment: PINECONE_API_KEY, PINECONE_INDEX, optional PINECONE_NAMESPACE.
Create a 1024-dimension cosine *dense vector* index in the Pinecone console first.
Run: python scripts/sync_pinecone.py
Do not upload personal data or secrets. Re-run after knowledge updates.
"""
import os
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "backend"))
from services.curated_data import KNOWLEDGE
from services.pinecone_store import _resources, EMBEDDING_MODEL, NAMESPACE

def main():
    if not os.getenv("PINECONE_API_KEY") or not os.getenv("PINECONE_INDEX"):
        raise SystemExit("Set PINECONE_API_KEY and PINECONE_INDEX before indexing")
    pc, index = _resources()
    chunks = KNOWLEDGE["chunks"]
    count = 0
    for start in range(0, len(chunks), 12):
        batch = chunks[start:start+12]
        passages = [f"{x['title']}\nCategory: {x['category']}\n{x['content']}" for x in batch]
        embeddings = pc.inference.embed(
            model=EMBEDDING_MODEL,
            inputs=passages,
            parameters={"input_type": "passage", "truncate": "END"},
        )
        if len(embeddings.data) != len(batch):
            raise RuntimeError("Embedding response count mismatch")
        vectors = [
            (chunk["id"], list(emb.values), {
                "category": chunk["category"],
                "title": chunk["title"],
                "url": chunk.get("url", ""),
            })
            for chunk, emb in zip(batch, embeddings.data)
        ]
        index.upsert(vectors=vectors, namespace=NAMESPACE)
        count += len(vectors)
    print(f"Indexed {count} public evidence chunks in {os.getenv('PINECONE_INDEX')}/{NAMESPACE}")

if __name__ == "__main__":
    main()
