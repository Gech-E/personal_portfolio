"""
Script to manually initialize the database tables.
This runs the same init_db() that the server runs on startup.

Usage: python init_db.py
"""
import os
from dotenv import load_dotenv

load_dotenv()

from db.connection import init_db

if __name__ == "__main__":
    try:
        init_db()
        print("[SUCCESS] Database tables created successfully!")
        print("  - chat_history table ready")
        print("  - resume_chunks table ready (if pgvector is available)")
    except Exception as e:
        print(f"[ERROR] Database initialization failed: {e}")
