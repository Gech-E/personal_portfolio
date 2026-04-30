"""Quick test for the RAG pipeline."""
import requests
import json

API = "http://127.0.0.1:8000/api/chat"

tests = [
    "Where does he live?",
    "What are his skills?",
    "Tell me about the anomaly detection project",
    "What is his favorite color?",
    "hello",
    "Does he know Java?",
    "What's his GPA?",
]

for q in tests:
    r = requests.post(API, json={"session_id": "test", "messages": [{"role": "user", "content": q}]})
    d = r.json()
    print(f"Q: {q}")
    print(f"   Intent: {d['intent']} (confidence: {d['confidence']})")
    print(f"   Sources: {d['sources']}")
    reply_clean = d['reply'][:120].encode('ascii', 'replace').decode()
    print(f"   Reply: {reply_clean}...")
    print()
