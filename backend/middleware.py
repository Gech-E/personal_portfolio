"""
Production middleware — rate limiting and request size enforcement.
Lightweight, in-memory (no Redis needed for a portfolio site).
"""

import time
import logging
from collections import defaultdict
from typing import Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("portfolio.middleware")


# ─── Rate Limiter ────────────────────────────────────────────────────────────

class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    Sliding-window rate limiter per client IP.
    Only applies to POST /api/chat to protect LLM costs.
    """

    def __init__(
        self,
        app,
        max_requests: int = 20,
        window_seconds: int = 60,
    ):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        # {ip: [timestamp, ...]}
        self._requests: dict[str, list[float]] = defaultdict(list)

    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP, respecting proxy headers."""
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"

    def _cleanup(self, ip: str, now: float):
        """Remove expired timestamps from the window."""
        cutoff = now - self.window_seconds
        self._requests[ip] = [
            ts for ts in self._requests[ip] if ts > cutoff
        ]

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # Only rate-limit the chat endpoint
        if request.url.path != "/api/chat" or request.method != "POST":
            return await call_next(request)

        ip = self._get_client_ip(request)
        now = time.time()
        self._cleanup(ip, now)

        if len(self._requests[ip]) >= self.max_requests:
            logger.warning(
                "Rate limit exceeded for IP %s (%d/%d in %ds)",
                ip, len(self._requests[ip]), self.max_requests, self.window_seconds,
            )
            return JSONResponse(
                status_code=429,
                content={
                    "detail": "Too many requests. Please wait a moment before trying again.",
                    "retry_after": self.window_seconds,
                },
            )

        self._requests[ip].append(now)
        return await call_next(request)


# ─── Request Size Limiter ────────────────────────────────────────────────────

class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    """Reject request bodies exceeding a size threshold."""

    def __init__(self, app, max_bytes: int = 10_240):  # 10 KB
        super().__init__(app)
        self.max_bytes = max_bytes

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        if request.method in ("POST", "PUT", "PATCH"):
            content_length = request.headers.get("content-length")
            if content_length and int(content_length) > self.max_bytes:
                logger.warning(
                    "Request body too large: %s bytes (max %s)",
                    content_length, self.max_bytes,
                )
                return JSONResponse(
                    status_code=413,
                    content={"detail": "Request body too large."},
                )
        return await call_next(request)
