"""
Rule-based intent classifier for portfolio queries.
Classifies user queries into predefined categories to guide retrieval filtering.
Zero latency, deterministic, no API calls.
"""

from typing import Tuple

# Valid intents that map to knowledge base categories
VALID_INTENTS = [
    "skills", "projects", "education", "experience",
    "contact", "summary", "certifications",
]

# Intent keyword patterns — weighted by specificity
INTENT_PATTERNS: dict[str, list[tuple[str, int]]] = {
    "skills": [
        ("skill", 10), ("tech stack", 10), ("technology", 8), ("framework", 8),
        ("language", 6), ("programming", 8), ("python", 5), ("javascript", 5),
        ("react", 5), ("fastapi", 5), ("pytorch", 5), ("tensorflow", 5),
        ("tool", 5), ("know", 4), ("use", 3), ("proficient", 8), ("expertise", 8),
        ("ai/ml", 8), ("machine learning", 8), ("deep learning", 8),
        ("frontend", 6), ("backend", 6), ("database", 5), ("devops", 5),
        ("docker", 5), ("langchain", 5), ("opencv", 5),
    ],
    "projects": [
        ("project", 10), ("built", 8), ("build", 7), ("portfolio", 6),
        ("vendor", 8), ("e-commerce", 8), ("ecommerce", 8), ("clinical", 8),
        ("skin cancer", 10), ("anomaly", 8), ("job matching", 8),
        ("recommendation", 6), ("system", 3), ("application", 4), ("app", 3),
    ],
    "education": [
        ("education", 10), ("university", 10), ("degree", 10), ("school", 8),
        ("study", 7), ("cgpa", 10), ("gpa", 10), ("graduate", 8),
        ("graduation", 8), ("mekelle", 6), ("academic", 8), ("course", 5),
    ],
    "experience": [
        ("experience", 10), ("work", 7), ("job", 7), ("intern", 10),
        ("internship", 10), ("company", 7), ("role", 6), ("position", 6),
        ("memi", 10), ("gemed", 10), ("born to win", 10),
        ("cto", 10), ("co-founder", 10), ("founder", 8), ("coordinator", 8),
        ("career", 7), ("professional", 5), ("working", 5),
    ],
    "contact": [
        ("contact", 10), ("email", 10), ("phone", 10), ("reach", 8),
        ("hire", 8), ("location", 10), ("where", 7), ("live", 8),
        ("address", 10), ("github", 8), ("linkedin", 8),
        ("website", 6), ("portfolio site", 8), ("connect", 6), ("call", 7),
    ],
    "summary": [
        ("who is", 10), ("about", 7), ("introduce", 8), ("tell me about him", 10),
        ("overview", 8), ("summary", 10), ("background", 7), ("himself", 6),
        ("getachew", 5),
    ],
    "certifications": [
        ("certification", 10), ("certificate", 10), ("coursera", 10),
        ("stanford", 8), ("udacity", 10), ("certified", 8), ("credential", 8),
    ],
}

# Patterns that indicate personal/off-topic queries (should be rejected)
PERSONAL_PATTERNS = [
    "favorite", "colour", "color", "hobby", "hobbies", "friend",
    "girlfriend", "boyfriend", "married", "wife", "husband", "family",
    "religion", "political", "age", "old", "birthday", "born",
    "zodiac", "height", "weight", "salary", "money", "income",
    "personal life", "private", "secret", "love", "hate", "feel",
    "opinion", "believe", "think about",
]

# Greetings
GREETING_PATTERNS = [
    "hi", "hello", "hey", "howdy", "greetings",
    "good morning", "good afternoon", "good evening",
    "sup", "what's up", "yo",
]

THANK_PATTERNS = [
    "thanks", "thank you", "thx", "ty", "appreciate",
]


def classify_intent(query: str) -> Tuple[str, float]:
    """
    Classify a user query into an intent category.

    Returns:
        Tuple of (intent, confidence) where intent is one of:
        - A valid category name (skills, projects, etc.)
        - "greeting" for hello messages
        - "thanks" for thank-you messages
        - "personal" for off-topic personal questions
        - "unknown" for unclassifiable queries
    """
    q = query.lower().strip()

    # Check greetings first
    for pattern in GREETING_PATTERNS:
        if q.startswith(pattern) or q == pattern:
            return "greeting", 1.0

    # Check thanks
    for pattern in THANK_PATTERNS:
        if q.startswith(pattern) or q == pattern:
            return "thanks", 1.0

    # Check personal/off-topic
    for pattern in PERSONAL_PATTERNS:
        if pattern in q:
            return "personal", 0.9

    # Score each intent
    scores: dict[str, float] = {}
    for intent, patterns in INTENT_PATTERNS.items():
        score = 0.0
        for keyword, weight in patterns:
            if keyword in q:
                score += weight
        scores[intent] = score

    # Find the best intent
    if not scores or max(scores.values()) == 0:
        return "unknown", 0.0

    best_intent = max(scores, key=lambda k: scores[k])
    best_score = scores[best_intent]

    # Normalize confidence (0-1 range)
    confidence = min(best_score / 20.0, 1.0)

    # If confidence is too low, mark as unknown
    if confidence < 0.15:
        return "unknown", confidence

    return best_intent, confidence
