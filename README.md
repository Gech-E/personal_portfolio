# Getachew Ekubay — Developer Portfolio

**A personal portfolio with a React interface and a retrieval-augmented AI assistant.**

[Portfolio](https://getachewekubay.vercel.app) · [LinkedIn](https://www.linkedin.com/in/getachewekubay/) · [GitHub](https://github.com/Gech-E)

## Overview

This project presents my full-stack and AI/ML work and lets visitors ask questions about my professional background. The frontend uses **React, TypeScript, Vite, and Tailwind CSS**. A separate **FastAPI** backend provides portfolio data, contact endpoints, and the assistant.

The assistant retrieves information from a curated portfolio knowledge base before generating a response. Generation uses Groq through the OpenAI-compatible API; it requires a configured API key.

## Features

- Responsive portfolio interface with project and skills sections.
- Chat endpoint with intent classification, retrieval, and an answerability check.
- BM25 retrieval, with an optional dense retrieval path using sentence-transformers and cached embeddings.
- PostgreSQL-backed persistence and contact endpoints.
- Backend request-size limits, rate limiting, and API error handling.

**Project status:** Portfolio implementation. AI responses depend on provider availability and backend configuration. Retrieval checks help ground answers, but do not guarantee correctness.

## Technology

| Layer | Implementation |
| --- | --- |
| Interface | React, TypeScript, Vite, Tailwind CSS, Radix UI, Motion |
| API | Python, FastAPI, Uvicorn, Pydantic |
| Retrieval | BM25, NumPy, optional sentence-transformers |
| Generation | Groq via the OpenAI Python client |
| Persistence | PostgreSQL with psycopg2 |

## Run locally

### 1. Clone the project

```bash
git clone https://github.com/Gech-E/personal_portfolio.git
cd personal_portfolio
```

### 2. Start the API

Use Python 3.11+ and a local PostgreSQL instance if you need persistence.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

On Windows, activate with `.venv\Scripts\activate` and use `copy .env.example .env`.

Set these values in `backend/.env`:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Connection string for your local PostgreSQL database |
| `GROQ_API_KEY` | Provider key for generated assistant responses |

The application attempts to initialize its database at startup. Chat can run without database persistence; contact and other database-backed features need a working database. Without a valid provider key, generated replies are unavailable.

```bash
uvicorn main:app --reload --port 8000
```

Development API documentation: [http://localhost:8000/docs](http://localhost:8000/docs).

Dense query embeddings require the optional `sentence-transformers` package and its model. The standard requirements support the BM25 retrieval path.

### 3. Start the frontend

Open a second terminal at the repository root:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually **http://localhost:5173**. Local API requests default to **http://localhost:8000**. Set `VITE_API_URL` in a root `.env.local` file if the API runs elsewhere; restart Vite after changing it.

### 4. Build the interface

```bash
npm run build
```

The Vite build writes the frontend output to `dist/`. The Python API is a separate application.

## Repository structure

```text
src/                  React interface and API client
backend/
  api/routes/         Chat, contact, and portfolio endpoints
  services/           Knowledge base, retrieval, and RAG orchestration
  db/                 PostgreSQL connection and initialization
  main.py             FastAPI entry point
api/                  Deployment entry point
vite.config.ts        Frontend tooling and development proxy
vercel.json           Deployment configuration
```

## Contact

For development, AI integration, or collaboration inquiries:

- **Email:** [getachewekubay8@gmail.com](mailto:getachewekubay8@gmail.com)
- **LinkedIn:** [linkedin.com/in/getachewekubay](https://www.linkedin.com/in/getachewekubay/)
- **GitHub:** [github.com/Gech-E](https://github.com/Gech-E)
