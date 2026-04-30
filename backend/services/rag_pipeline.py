"""
RAG Pipeline Orchestrator.
Wires together: Intent Classification → Hybrid Retrieval → Answerability Check → Grounded Generation.
"""

import os
import re
from typing import List, Optional
from dataclasses import dataclass

from google import genai

from services.intent_classifier import classify_intent
from services.retrieval import retrieve
from services.prompts import (
    SYSTEM_PROMPT,
    GREETING_RESPONSE,
    THANKS_RESPONSE,
    PERSONAL_REJECTION,
    UNKNOWN_RESPONSE,
    NO_CONTEXT_RESPONSE,
)


@dataclass
class RAGResult:
    """Result of the RAG pipeline."""
    reply: str
    sources: List[str]
    intent: str
    confidence: float


def _build_context(chunks: list) -> str:
    """Format retrieved chunks into a context string for the LLM."""
    parts = []
    for chunk, score in chunks:
        section = chunk["category"].upper()
        sub = chunk.get("subcategory", "").replace("_", " ").title()
        parts.append(f"[{section} — {sub}]\n{chunk['content']}")
    return "\n\n".join(parts)


def _check_answerability(chunks: list, intent: str) -> bool:
    """
    Determine if retrieved chunks are relevant enough to answer the query.

    Checks:
    1. At least one chunk must match the classified intent
    2. The top retrieval score must be above a minimum threshold
    """
    if not chunks:
        return False

    # Check if any chunk matches the intent
    intent_match = any(c["category"] == intent for c, _ in chunks)

    # Check minimum score threshold
    top_score = chunks[0][1] if chunks else 0.0
    min_threshold = 0.01  # RRF scores are small by nature

    return intent_match or top_score > min_threshold


def process_query(
    query: str,
    message_history: Optional[List[dict]] = None,
) -> RAGResult:
    """
    Full RAG pipeline execution.

    Args:
        query: The user's question
        message_history: List of {"role": str, "content": str} dicts

    Returns:
        RAGResult with reply, sources, intent, and confidence
    """

    # ── Step 1: Intent Classification ────────────────────────────────────
    intent, confidence = classify_intent(query)

    # Handle special intents that don't need retrieval
    if intent == "greeting":
        return RAGResult(
            reply=GREETING_RESPONSE,
            sources=[],
            intent=intent,
            confidence=confidence,
        )

    if intent == "thanks":
        return RAGResult(
            reply=THANKS_RESPONSE,
            sources=[],
            intent=intent,
            confidence=confidence,
        )

    if intent == "personal":
        return RAGResult(
            reply=PERSONAL_REJECTION,
            sources=[],
            intent=intent,
            confidence=confidence,
        )

    if intent == "unknown" and confidence < 0.1:
        return RAGResult(
            reply=UNKNOWN_RESPONSE,
            sources=[],
            intent=intent,
            confidence=confidence,
        )

    # ── Step 2: Hybrid Retrieval ─────────────────────────────────────────
    retrieved_chunks = retrieve(query, intent=intent, top_k=5)

    # ── Step 3: Answerability Check ──────────────────────────────────────
    if not _check_answerability(retrieved_chunks, intent):
        return RAGResult(
            reply=NO_CONTEXT_RESPONSE,
            sources=[],
            intent=intent,
            confidence=confidence,
        )

    # ── Step 4: Grounded Generation ──────────────────────────────────────
    context = _build_context(retrieved_chunks)
    sources = list(set(c["category"] for c, _ in retrieved_chunks))
    system_prompt = SYSTEM_PROMPT.format(context=context)

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return RAGResult(
            reply=NO_CONTEXT_RESPONSE,
            sources=sources,
            intent=intent,
            confidence=confidence,
        )

    try:
        client = genai.Client(api_key=api_key)

        # Format message history for Gemini
        formatted_messages = []
        if message_history:
            for m in message_history:
                role = "user" if m["role"] == "user" else "model"
                formatted_messages.append(
                    {"role": role, "parts": [{"text": m["content"]}]}
                )
        else:
            formatted_messages.append(
                {"role": "user", "parts": [{"text": query}]}
            )

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=formatted_messages,
            config={"system_instruction": system_prompt},
        )
        reply = response.text

    except Exception as e:
        print(f"[RAG] Generation error: {e}")
        # Fallback: return the raw context instead of erroring
        reply = context if context else NO_CONTEXT_RESPONSE

    return RAGResult(
        reply=reply,
        sources=sources,
        intent=intent,
        confidence=confidence,
    )
