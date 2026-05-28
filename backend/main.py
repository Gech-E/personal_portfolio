"""
Portfolio RAG Backend — FastAPI + Hybrid RAG Pipeline
Run: uvicorn main:app --reload --port 8000
"""

import os
import logging
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from db.connection import init_pool, close_pool, init_db
from services.retrieval import initialize as init_retrieval
from api.routes.chat import router as chat_router
from api.routes.contact import router as contact_router
from api.routes.portfolio import router as portfolio_router
from middleware import RateLimitMiddleware, RequestSizeLimitMiddleware

# ─── Environment ────
load_dotenv()

# ─── Logging ─────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("portfolio")


# ─── Lifespan (Startup / Shutdown) ───────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Validate critical environment
    if not os.getenv("GROQ_API_KEY"):
        logger.warning("GROQ_API_KEY not set — chatbot LLM generation will be unavailable")

    # Database pool initialization
    try:
        init_pool()
        init_db()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.warning("DB init skipped (chat works without persistence): %s", e)

    # RAG retrieval engine initialization
    try:
        init_retrieval()
        logger.info("RAG retrieval engine ready")
    except Exception as e:
        logger.warning("RAG init failed (will use BM25 only): %s", e)

    yield

    # Shutdown: close DB pool
    close_pool()
    logger.info("Application shutdown complete")


# ─── Application ────
app = FastAPI(
    title="Portfolio RAG API",
    version="2.1.0",
    lifespan=lifespan,
)

# ─── Middleware (order matters: outermost runs first) ────
app.add_middleware(RequestSizeLimitMiddleware, max_bytes=10_240)
app.add_middleware(RateLimitMiddleware, max_requests=20, window_seconds=60)
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


# ─── Global Exception Handler ────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception on %s %s: %s", request.method, request.url.path, exc, exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred. Please try again later."},
    )


# ─── Request Logging ─────────────────────────────────────────────────────────
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration_ms = (time.time() - start) * 1000

    # Only log API routes (skip static/docs)
    if request.url.path.startswith("/api"):
        logger.info(
            "%s %s → %d (%.0fms)",
            request.method, request.url.path, response.status_code, duration_ms,
        )

    return response


# ─── Root ────
@app.get("/")
def root():
    return {
        "service": "Portfolio RAG API",
        "version": "2.1.0",
        "docs": "/docs",
        "health": "/api/health",
    }

# ─── Routers 
app.include_router(chat_router)
app.include_router(contact_router)
app.include_router(portfolio_router)

# ─── Dev Entry Point 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
