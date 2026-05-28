"""
Database connection management with connection pooling.
Gracefully degrades if the database is unavailable — chat still works.
"""

import os
import logging
from contextlib import contextmanager
from typing import Optional

import psycopg2
from psycopg2 import pool, OperationalError

logger = logging.getLogger("portfolio.db")


# ─── Connection Pool ─────────────────────────────────────────────────────────

_pool: Optional[pool.SimpleConnectionPool] = None


def _get_database_url() -> str:
    """Get the database URL from environment."""
    url = os.getenv("DATABASE_URL")
    if not url:
        raise RuntimeError("Missing required environment variable: DATABASE_URL")
    return url


def init_pool(min_conn: int = 1, max_conn: int = 5):
    """
    Initialize the connection pool. Call once at startup.
    Fails gracefully so the app can still serve chatbot requests without DB.
    """
    global _pool
    try:
        _pool = pool.SimpleConnectionPool(
            min_conn,
            max_conn,
            _get_database_url(),
            connect_timeout=5,
        )
        logger.info("Database connection pool initialized (min=%d, max=%d)", min_conn, max_conn)
    except (OperationalError, RuntimeError) as e:
        logger.warning("Database pool init failed (chat will work without persistence): %s", e)
        _pool = None


def close_pool():
    """Close all connections in the pool. Call at shutdown."""
    global _pool
    if _pool:
        _pool.closeall()
        _pool = None
        logger.info("Database connection pool closed")


@contextmanager
def get_db():
    """
    Context-managed database connection from the pool.
    
    Usage:
        with get_db() as conn:
            cur = conn.cursor()
            cur.execute(...)
            conn.commit()
    
    Automatically returns connection to the pool.
    Raises RuntimeError if no pool is available.
    """
    if _pool is None:
        raise RuntimeError("Database pool not initialized")

    conn = None
    try:
        conn = _pool.getconn()
        # Health check — verify connection is alive
        try:
            conn.cursor().execute("SELECT 1")
        except OperationalError:
            logger.warning("Stale connection detected, reconnecting")
            conn.close()
            conn = _pool.getconn()
        yield conn
    except Exception:
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            _pool.putconn(conn)


def is_available() -> bool:
    """Check if the database is available."""
    return _pool is not None


# ─── Schema Initialization ──────────────────────────────────────────────────

def init_db():
    """Initialize database tables. Call once at startup after pool init."""
    if not is_available():
        logger.warning("Skipping DB init — pool not available")
        return

    with get_db() as conn:
        cur = conn.cursor()

        # Chat history table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS chat_history (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(100),
                role VARCHAR(20),
                content TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            );
        """)

        # Contact messages table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100),
                subject VARCHAR(200),
                message TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            );
        """)
        conn.commit()
        logger.info("Database tables initialized")

        # Try creating vector extension and resume_chunks (optional)
        try:
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
            cur.execute("""
                CREATE TABLE IF NOT EXISTS resume_chunks (
                    id SERIAL PRIMARY KEY,
                    section VARCHAR(100),
                    content TEXT,
                    embedding vector(1536),
                    metadata JSONB,
                    created_at TIMESTAMP DEFAULT NOW()
                );
            """)
            conn.commit()
        except Exception as e:
            logger.info("pgvector extension not available (optional): %s", e)
            conn.rollback()

        cur.close()
