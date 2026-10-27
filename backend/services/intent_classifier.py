"""Query routing, not a source of factual answers."""
import re
from typing import Tuple

RULES = {
    "contact": r"\b(email|contact|reach|hire|linkedin|phone|address|location|located|based|reside|resides|live|lives|city|country)\b",
    "education": r"\b(degree|education|university|college|graduat(?:e|ed|ion)|cgpa|gpa|school|study|studied)\b",
    "experience": r"\b(experience|career|employ(?:ed|ment|er)|work(?:ed|ing)?|intern(?:ship)?|qubos|memi|march|ayder|instructor|cto)\b",
    "projects": r"\b(projects?|repos?|repositories|devtrack|nexus|recommendation|vendor|supportpilot|portfolioai|skinvision|anomaly|built|build|github)\b",
    "skills": r"\b(skills?|technologies|tech stack|frameworks?|languages?|python|typescript|javascript|react|nestjs|fastapi|pytorch|machine learning|ai/ml|rag|llms?)\b",
    "summary": r"\b(who|introduce|overview|background|profile|about getachew|hello|hi|hey|thanks)\b",
}

def classify_intent(query: str) -> Tuple[str, float]:
    q = query.lower().strip()
    if re.search(r"\b(where|what|which)\b", q) and re.search(
        r"\b(live|lives|based|located|from|reside|city|country|address)\b", q
    ):
        return "contact", 1.0
    if re.search(r"\bwhere\b", q) and re.search(r"\bwork(?:s|ed)?\b", q):
        return "experience", 0.95
    scores = {name: len(re.findall(pat, q)) for name, pat in RULES.items()}
    best = max(scores, key=scores.get)
    if not scores[best]:
        return "unknown", 0.0
    return best, min(0.95, 0.5 + 0.15 * scores[best])
