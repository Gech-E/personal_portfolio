import os
import psycopg2

def get_env_var(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value

def get_db():
    DATABASE_URL = get_env_var("DATABASE_URL")
    return psycopg2.connect(DATABASE_URL)

def init_db():
    """Initialize pgvector tables for RAG."""
    conn = get_db()
    cur = conn.cursor()
    # 1. Safely create chat_history (does not depend on pgvector)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS chat_history (
            id SERIAL PRIMARY KEY,
            session_id VARCHAR(100),
            role VARCHAR(20),
            content TEXT,
            created_at TIMESTAMP DEFAULT NOW()
        );
    """)

    # Create contact_messages table
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

    # 2. Try creating vector extension and resume_chunks
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
        print(f"[WARNING] Could not initialize pgvector (skipping resume_chunks): {e}")
        conn.rollback()

    cur.close()
    conn.close()
