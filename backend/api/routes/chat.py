"""Chat API routes — /api/chat endpoints."""

import re
import json
from typing import List

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from db.connection import get_db
from services.rag_pipeline import process_query
from services.knowledge_base import RESUME_CHUNKS

router = APIRouter(prefix="/api", tags=["chat"])


# ─── Request / Response Schemas 

class MessagePayload(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    session_id: str
    messages: List[MessagePayload]

class ChatResponse(BaseModel):
    reply: str
    sources: List[str]
    intent: str
    confidence: float


# ─── Helpers ──

def save_chat(session_id: str, role: str, content: str):
    """Persist a single chat turn to the database."""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO chat_history (session_id, role, content) VALUES (%s, %s, %s)",
            (session_id, role, content),
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"[DB] Could not save chat: {e}")


# ─── Endpoints 

@router.get("/health")
def health():
    return {"status": "ok", "service": "Portfolio RAG API"}


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="No messages provided")

    user_query = req.messages[-1].content.strip()

    if not user_query or not re.search(r"[a-zA-Z0-9]", user_query):
        raise HTTPException(
            status_code=400,
            detail="Invalid message format: please use words/numbers in your query",
        )

    # Save user message
    save_chat(req.session_id, "user", user_query)

    # Build message history for the pipeline
    message_history = [
        {"role": m.role, "content": m.content}
        for m in req.messages
    ]

    # Run the RAG pipeline
    result = process_query(
        query=user_query,
        message_history=message_history,
    )

    # Save assistant response
    if result.reply:
        save_chat(req.session_id, "assistant", result.reply)

    return ChatResponse(
        reply=result.reply,
        sources=result.sources,
        intent=result.intent,
        confidence=result.confidence,
    )


@router.get("/chat/history/{session_id}")
def get_history(session_id: str):
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "SELECT role, content, created_at FROM chat_history WHERE session_id=%s ORDER BY created_at",
            (session_id,),
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return [{"role": r[0], "content": r[1], "created_at": str(r[2])} for r in rows]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/seed")
def seed_database():
    """Seed resume chunks into the database (run once)."""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("DELETE FROM resume_chunks;")
        for chunk in RESUME_CHUNKS:
            cur.execute(
                "INSERT INTO resume_chunks (section, content, metadata) VALUES (%s, %s, %s)",
                (chunk["category"], chunk["content"], json.dumps({"id": chunk["id"], "subcategory": chunk["subcategory"]})),
            )
        conn.commit()
        cur.close()
        conn.close()
        return {"seeded": len(RESUME_CHUNKS), "status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
