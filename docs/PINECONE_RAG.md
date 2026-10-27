# Portfolio AI assistant — Pinecone RAG setup

The chatbot uses the curated public facts in `public/portfolio-knowledge.json`, mirrored in `backend/services/curated_data.py`.

## Architecture

User message → query intent + conversation-aware retrieval query → Pinecone semantic similarity (when configured) → category and source-ID validation → Groq/Gemini grounded generation → validated citations.

When Pinecone is not configured, a category-filtered lexical retriever serves as a degraded retrieval path. When the LLM is unavailable, the API reports an error; it never represents canned text as an AI answer. A no-evidence query returns an explicit uncertainty statement.

## Provision Pinecone

1. In your Pinecone account, create a **dense vector** index with **1024 dimensions** and **cosine similarity**. Use `multilingual-e5-large` for embeddings. Wait for the index to become ready.
2. Set these **server-side** environment variables in your Vercel project settings (never add them to GitHub or use `VITE_` prefixes): `PINECONE_API_KEY`, `PINECONE_INDEX`, optional `PINECONE_NAMESPACE=portfolio-v1`, `PINECONE_EMBED_MODEL=multilingual-e5-large`, and your configured `GROQ_API_KEY` (or `GEMINI_API_KEY`).
3. With an authorized local environment holding the same Pinecone credentials, run `pip install -r backend/requirements.txt` and `python scripts/sync_pinecone.py` to embed and upsert the public knowledge chunks. Confirm the script prints the chunk count.
4. Redeploy the Vercel project after its environment settings change.
5. Run `python -m unittest discover -s backend/tests -p 'test_portfolio_chat.py'` and test representative questions about location, projects, education, job experience, follow-ups, and unsupported claims. Confirm citations correspond to the underlying published sources.

Do not paste API keys into chat or commit them to the repository. Rotate any previously shared keys.

## Maintenance

After updating `public/portfolio-knowledge.json`, refresh `backend/services/curated_data.py` consistently and rerun the sync script. Change `PINECONE_NAMESPACE` when switching to a newly versioned corpus.

**Provisioning status is distinct from code readiness:** a successful frontend deployment does not confirm that Pinecone retrieval has been configured, indexed, or tested live.
