"""Single source of truth for public portfolio facts."""
from services.retrieval import RESUME_CHUNKS
def get_chunks_by_category(category):return [c for c in RESUME_CHUNKS if c["category"]==category]
def get_all_categories():return sorted(set(c["category"] for c in RESUME_CHUNKS))
