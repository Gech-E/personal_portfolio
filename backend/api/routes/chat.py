"""Chat API routes — /api/chat endpoints."""

import re
import json
import logging
from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator

from db.connection import get_db, is_available as db_available
from services.rag_pipeline import process_query
from services.knowledge_base import RESUME_CHUNKS

logger = logging.getLogger("portfolio.chat")

router = APIRouter(prefix="/api", tags=["chat"])

# ─── Constants ─────────────────────────────────────────────────────────────
MAX_MESSAGE_LENGTH = 1000
MAX_HISTORY_DEPTH = 20
MAX_SESSION_ID_LENGTH = 64


# ─── Input Sanitization ─────────────────────────────────────────────────────

def sanitize_text(text: str) -> str:
    """Strip control characters and normalize whitespace."""
    # Remove control characters (except newline/tab)
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]", "", text)
    # Collapse excessive whitespace
    text = re.sub(r"\s{3,}", "  ", text)
    return text.strip()


# ─── Request / Response Schemas ──────────────────────────────────────────────

class MessagePayload(BaseModel):
    role: str
    content: str

    @field_validator("role")
    @classmethod
    def validate_role(cls, v: str) -> str:
        if v not in ("user", "assistant"):
            raise ValueError("role must be 'user' or 'assistant'")
        return v

    @field_validator("content")
    @classmethod
    def validate_content(cls, v: str) -> str:
        v = sanitize_text(v)
        if len(v) > MAX_MESSAGE_LENGTH:
            raise ValueError(f"Message too long (max {MAX_MESSAGE_LENGTH} characters)")
        return v


class ChatRequest(BaseModel):
    session_id: str
    messages: List[MessagePayload]

    @field_validator("session_id")
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        v = v.strip()
        if not v or len(v) > MAX_SESSION_ID_LENGTH:
            raise ValueError(f"session_id must be 1-{MAX_SESSION_ID_LENGTH} characters")
        # Only allow alphanumeric, hyphens, underscores
        if not re.match(r"^[a-zA-Z0-9_-]+$", v):
            raise ValueError("session_id contains invalid characters")
        return v

    @field_validator("messages")
    @classmethod
    def validate_messages(cls, v: list) -> list:
        if not v:
            raise ValueError("At least one message is required")
        if len(v) > MAX_HISTORY_DEPTH:
            # Truncate to most recent messages instead of rejecting
            v = v[-MAX_HISTORY_DEPTH:]
        return v


class ChatResponse(BaseModel):
    reply: str
    sources: List[str]
    intent: str
    confidence: float


# ─── Helpers ─────────────────────────────────────────────────────────────────

def _save_chat_async(session_id: str, role: str, content: str):
    """
    Persist a single chat turn to the database.
    Fire-and-forget: failures are logged but never block the response.
    """
    if not db_available():
        return

    try:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO chat_history (session_id, role, content) VALUES (%s, %s, %s)",
                (session_id, role, content[:5000]),  # Truncate for DB safety
            )
            conn.commit()
            cur.close()
    except Exception as e:
        logger.warning("Could not save chat turn: %s", e)


# ─── Endpoints ───────────────────────────────────────────────────────────────

@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Portfolio RAG API",
        "db_available": db_available(),
    }


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    user_query = req.messages[-1].content.strip()

    if not user_query or not re.search(r"[a-zA-Z0-9]", user_query):
        raise HTTPException(
            status_code=400,
            detail="Invalid message: please use words or numbers in your query.",
        )

    # Save user message (non-blocking, won't fail the request)
    _save_chat_async(req.session_id, "user", user_query)

    # Build message history for the pipeline
    message_history = [
        {"role": m.role, "content": m.content}
        for m in req.messages
    ]

    # Run the RAG pipeline
    try:
        result = process_query(
            query=user_query,
            message_history=message_history,
        )
    except Exception as e:
        logger.error("RAG pipeline error: %s", e, exc_info=True)
        raise HTTPException(
            status_code=503,
            detail="The AI assistant is temporarily unavailable. Please try again shortly.",
        )

    # Save assistant response (non-blocking)
    if result.reply:
        _save_chat_async(req.session_id, "assistant", result.reply)

    return ChatResponse(
        reply=result.reply,
        sources=result.sources,
        intent=result.intent,
        confidence=result.confidence,
    )


@router.get("/chat/history/{session_id}")
def get_history(session_id: str):
    if not db_available():
        return []

    # Validate session_id
    if not re.match(r"^[a-zA-Z0-9_-]+$", session_id):
        raise HTTPException(status_code=400, detail="Invalid session ID")

    try:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute(
                "SELECT role, content, created_at FROM chat_history WHERE session_id=%s ORDER BY created_at",
                (session_id,),
            )
            rows = cur.fetchall()
            cur.close()
            return [{"role": r[0], "content": r[1], "created_at": str(r[2])} for r in rows]
    except Exception as e:
        logger.error("Chat history retrieval failed: %s", e)
        raise HTTPException(status_code=500, detail="Could not retrieve chat history.")


@router.post("/seed")
def seed_database():
    """Seed resume chunks into the database (run once)."""
    if not db_available():
        raise HTTPException(status_code=503, detail="Database not available")

    try:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute("DELETE FROM resume_chunks;")
            for chunk in RESUME_CHUNKS:
                cur.execute(
                    "INSERT INTO resume_chunks (section, content, metadata) VALUES (%s, %s, %s)",
                    (chunk["category"], chunk["content"], json.dumps({"id": chunk["id"], "subcategory": chunk["subcategory"]})),
                )
            conn.commit()
            cur.close()
            return {"seeded": len(RESUME_CHUNKS), "status": "ok"}
    except Exception as e:
        logger.error("Seed failed: %s", e)
        raise HTTPException(status_code=500, detail="Database seeding failed.")
