"""
RAG Pipeline Orchestrator.
Wires together: Intent Classification → Hybrid Retrieval → Answerability Check → Grounded Generation.
"""

import os
import time
import logging
from typing import List, Optional
from dataclasses import dataclass

from openai import OpenAI, APITimeoutError, RateLimitError, APIConnectionError, APIStatusError

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

logger = logging.getLogger("portfolio.rag")

# ─── Configuration ───────────────────────────────────────────────────────────
GROQ_MODEL = "llama-3.3-70b-versatile"
GROQ_TIMEOUT = 15          # seconds per API call
GROQ_MAX_RETRIES = 1       # retry once on transient errors
MAX_CONTEXT_CHARS = 6000   # truncate context to prevent token overflow

# Transient error types that warrant a retry
_RETRYABLE_ERRORS = (APITimeoutError, RateLimitError, APIConnectionError)

# ─── Groq Client (lazy singleton) ────────────────────────────────────────────
_client: Optional[OpenAI] = None


def _get_client() -> Optional[OpenAI]:
    """Lazy-initialize the Groq OpenAI client."""
    global _client
    if _client is None:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            logger.warning("GROQ_API_KEY not set — LLM generation disabled")
            return None
        _client = OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1",
            timeout=GROQ_TIMEOUT,
        )
    return _client


# ─── Data Structures ────────────────────────────────────────────────────────

@dataclass
class RAGResult:
    """Result of the RAG pipeline."""
    reply: str
    sources: List[str]
    intent: str
    confidence: float


# ─── Helpers ─────────────────────────────────────────────────────────────────

FALLBACK_UNAVAILABLE = (
    "I'm having trouble connecting to my AI engine right now. "
    "Please try again in a moment, or feel free to reach out directly "
    "at **getachewekubay8@gmail.com**."
)


def _build_context(chunks: list) -> str:
    """Format retrieved chunks into a context string for the LLM."""
    parts = []
    for chunk, score in chunks:
        section = chunk["category"].upper()
        sub = chunk.get("subcategory", "").replace("_", " ").title()
        parts.append(f"[{section} — {sub}]\n{chunk['content']}")
    context = "\n\n".join(parts)

    # Truncate to prevent token overflow
    if len(context) > MAX_CONTEXT_CHARS:
        context = context[:MAX_CONTEXT_CHARS] + "\n\n[...context truncated]"
        logger.info("Context truncated to %d chars", MAX_CONTEXT_CHARS)

    return context


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


def _call_groq(messages: list[dict]) -> Optional[str]:
    """
    Call Groq API with timeout and retry logic.
    Returns the response text, or None if all attempts fail.
    """
    client = _get_client()
    if client is None:
        return None

    last_error = None
    for attempt in range(1 + GROQ_MAX_RETRIES):
        try:
            start = time.time()
            response = client.chat.completions.create(
                model=GROQ_MODEL,
                messages=messages,
            )
            elapsed = time.time() - start
            logger.info("Groq response in %.1fs (attempt %d)", elapsed, attempt + 1)
            return response.choices[0].message.content

        except _RETRYABLE_ERRORS as e:
            last_error = e
            logger.warning(
                "Groq transient error (attempt %d/%d): %s",
                attempt + 1, 1 + GROQ_MAX_RETRIES, e,
            )
            if attempt < GROQ_MAX_RETRIES:
                # Brief pause before retry (0.5s)
                time.sleep(0.5)

        except APIStatusError as e:
            # Non-retryable API error (4xx client errors, etc.)
            logger.error("Groq API error (non-retryable): %s", e)
            return None

        except Exception as e:
            logger.error("Unexpected Groq error: %s", e, exc_info=True)
            return None

    logger.error("Groq failed after %d attempts: %s", 1 + GROQ_MAX_RETRIES, last_error)
    return None


# ─── Pipeline ────────────────────────────────────────────────────────────────

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
    logger.info("Intent: %s (confidence: %.2f) for query: '%.80s'", intent, confidence, query)

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

    # ── Step 2: Hybrid Retrieval 
    retrieved_chunks = retrieve(query, intent=intent, top_k=5)

    # ── Step 3: Answerability Check 
    if not _check_answerability(retrieved_chunks, intent):
        return RAGResult(
            reply=NO_CONTEXT_RESPONSE,
            sources=[],
            intent=intent,
            confidence=confidence,
        )

    # ── Step 4: Grounded Generation (Groq via OpenAI-compatible API)
    context = _build_context(retrieved_chunks)
    sources = list(set(c["category"] for c, _ in retrieved_chunks))
    system_prompt = SYSTEM_PROMPT.format(context=context)

    # Build messages in OpenAI format
    messages = [{"role": "system", "content": system_prompt}]
    if message_history:
        for m in message_history:
            role = "user" if m["role"] == "user" else "assistant"
            messages.append({"role": role, "content": m["content"]})
    else:
        messages.append({"role": "user", "content": query})

    # Call Groq with retry
    reply = _call_groq(messages)

    if reply is None:
        # Graceful degradation: return friendly message, not raw context
        reply = FALLBACK_UNAVAILABLE

    return RAGResult(
        reply=reply,
        sources=sources,
        intent=intent,
        confidence=confidence,
    )
