"""
Portfolio RAG Backend — FastAPI + Hybrid RAG Pipeline
Run: uvicorn main:app --reload --port 8000
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from db.connection import init_db
from services.retrieval import initialize as init_retrieval
from api.routes.chat import router as chat_router

# ─── Environment ─────────────────────────────────────────────────────────────
load_dotenv()

# ─── Lifespan (Startup / Shutdown) ───────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Database initialization
    try:
        init_db()
        print("[SUCCESS] Database initialized")
    except Exception as e:
        print(f"[WARNING] DB init skipped: {e}")

    # RAG retrieval engine initialization (embeds all chunks)
    try:
        init_retrieval()
        print("[SUCCESS] RAG retrieval engine ready")
    except Exception as e:
        print(f"[WARNING] RAG init failed (will use BM25 only): {e}")

    yield

# ─── Application ─────────────────────────────────────────────────────────────
app = FastAPI(title="Portfolio RAG API", version="2.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://getachewekubay.vercel.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Routers ─────────────────────────────────────────────────────────────────
app.include_router(chat_router)

# ─── Dev Entry Point ─────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
