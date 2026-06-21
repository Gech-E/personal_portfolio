"""Integration tests for production hardening."""
import requests

API = "http://127.0.0.1:8000/api/chat"

def test_normal_chat():
    print("=== Test 1: Normal chat ===")
    r = requests.post(API, json={"session_id": "test-123", "messages": [{"role": "user", "content": "What are his skills?"}]})
    print(f"Status: {r.status_code}")
    d = r.json()
    print(f"Intent: {d.get('intent')}, Reply preview: {d.get('reply', '')[:80]}...")
    assert r.status_code == 200, f"Expected 200, got {r.status_code}"
    print("PASS\n")

def test_oversized_message():
    print("=== Test 2: Oversized message (>1000 chars) ===")
    long_msg = "a" * 1200
    r = requests.post(API, json={"session_id": "test-123", "messages": [{"role": "user", "content": long_msg}]})
    print(f"Status: {r.status_code} (expected 422)")
    assert r.status_code == 422, f"Expected 422, got {r.status_code}"
    print("PASS\n")

def test_invalid_session_id():
    print("=== Test 3: Invalid session_id ===")
    r = requests.post(API, json={"session_id": "test@bad!", "messages": [{"role": "user", "content": "hello"}]})
    print(f"Status: {r.status_code} (expected 422)")
    assert r.status_code == 422, f"Expected 422, got {r.status_code}"
    print("PASS\n")

def test_empty_messages():
    print("=== Test 4: Empty messages ===")
    r = requests.post(API, json={"session_id": "test-123", "messages": []})
    print(f"Status: {r.status_code} (expected 422)")
    assert r.status_code == 422, f"Expected 422, got {r.status_code}"
    print("PASS\n")

def test_invalid_role():
    print("=== Test 5: Invalid role ===")
    r = requests.post(API, json={"session_id": "test-123", "messages": [{"role": "hacker", "content": "test"}]})
    print(f"Status: {r.status_code} (expected 422)")
    assert r.status_code == 422, f"Expected 422, got {r.status_code}"
    print("PASS\n")

def test_greeting():
    print("=== Test 6: Greeting (fast path, no LLM) ===")
    r = requests.post(API, json={"session_id": "test-123", "messages": [{"role": "user", "content": "hello!"}]})
    print(f"Status: {r.status_code}")
    d = r.json()
    print(f"Intent: {d.get('intent')}, Reply: {d.get('reply', '')[:80]}...")
    assert r.status_code == 200
    assert d.get("intent") == "greeting"
    print("PASS\n")

def test_punctuation_only():
    print("=== Test 7: Punctuation-only message ===")
    r = requests.post(API, json={"session_id": "test-123", "messages": [{"role": "user", "content": "!!!???"}]})
    print(f"Status: {r.status_code} (expected 400)")
    assert r.status_code == 400, f"Expected 400, got {r.status_code}"
    print("PASS\n")

if __name__ == "__main__":
    tests = [
        test_normal_chat,
        test_oversized_message,
        test_invalid_session_id,
        test_empty_messages,
        test_invalid_role,
        test_greeting,
        test_punctuation_only,
    ]
    passed = 0
    failed = 0
    for test in tests:
        try:
            test()
            passed += 1
        except AssertionError as e:
            print(f"FAIL: {e}\n")
            failed += 1
        except Exception as e:
            print(f"ERROR: {e}\n")
            failed += 1

    print(f"Results: {passed}/{len(tests)} passed, {failed} failed")
