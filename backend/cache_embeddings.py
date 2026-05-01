import os
import sys
import numpy as np
from google import genai
from dotenv import load_dotenv

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from services.knowledge_base import RESUME_CHUNKS

def main():
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY missing from .env")
        return

    print(f"Caching embeddings for {len(RESUME_CHUNKS)} chunks...")
    
    client = genai.Client(api_key=api_key)
    texts = [c["content"] for c in RESUME_CHUNKS]
    
    # We can batch embed them, but just to be safe with the SDK, we'll do them sequentially 
    # or pass the list if the SDK supports it.
    embeddings = []
    for text in texts:
        result = client.models.embed_content(
            model="gemini-embedding-2",
            contents=text,
        )
        embeddings.append(result.embeddings[0].values)
    
    emb_array = np.array(embeddings, dtype=np.float32)
    
    out_path = os.path.join(os.path.dirname(__file__), 'services', 'embeddings.npy')
    np.save(out_path, emb_array)
    print(f"Saved {emb_array.shape} embeddings to {out_path}")

if __name__ == "__main__":
    main()
