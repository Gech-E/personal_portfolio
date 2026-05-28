import os
import sys
import numpy as np
from sentence_transformers import SentenceTransformer

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from services.knowledge_base import RESUME_CHUNKS

def main():
    print(f"Caching embeddings for {len(RESUME_CHUNKS)} chunks...")

    model = SentenceTransformer("all-MiniLM-L6-v2")
    texts = [c["content"] for c in RESUME_CHUNKS]

    emb_array = model.encode(texts, convert_to_numpy=True).astype(np.float32)

    out_path = os.path.join(os.path.dirname(__file__), 'services', 'embeddings.npy')
    np.save(out_path, emb_array)
    print(f"Saved {emb_array.shape} embeddings to {out_path}")

if __name__ == "__main__":
    main()
