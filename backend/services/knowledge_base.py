"""
Structured resume knowledge base with fine-grained chunking.
Each chunk is tagged with category, subcategory, and keywords
for precise intent-filtered retrieval.
"""

from typing import List, TypedDict


class ResumeChunk(TypedDict):
    id: str
    category: str
    subcategory: str
    content: str
    keywords: list[str]


RESUME_CHUNKS: List[ResumeChunk] = [
    # ── Summary ──────────────────────────────────────────────────────────
    {
        "id": "summary-1",
        "category": "summary",
        "subcategory": "overview",
        "content": "Getachew Ekubay is a Full-Stack Developer and AI/ML Engineer pursuing a B.Sc. in Electrical & Computer Engineering at Mekelle University (CGPA 3.93/4.0). He specializes in designing and deploying intelligent, scalable systems that bridge the gap between complex research and production-ready applications. His expertise spans Next.js + FastAPI stacks, RAG pipelines, Agentic AI, and computer vision.",
        "keywords": ["who", "about", "getachew", "background", "overview", "summary", "introduce", "himself"],
    },

    # ── Skills ───────────────────────────────────────────────────────────
    {
        "id": "skills-languages",
        "category": "skills",
        "subcategory": "programming_languages",
        "content": "Programming Languages: Python, JavaScript, TypeScript, C++, SQL.",
        "keywords": ["language", "python", "javascript", "typescript", "c++", "sql", "programming", "code"],
    },
    {
        "id": "skills-frontend",
        "category": "skills",
        "subcategory": "frontend",
        "content": "Frontend Technologies: React, Next.js, Tailwind CSS.",
        "keywords": ["frontend", "react", "next.js", "tailwind", "css", "ui", "web"],
    },
    {
        "id": "skills-backend",
        "category": "skills",
        "subcategory": "backend",
        "content": "Backend Technologies: FastAPI, Flask, RESTful APIs, System Architecture.",
        "keywords": ["backend", "fastapi", "flask", "api", "server", "rest"],
    },
    {
        "id": "skills-aiml",
        "category": "skills",
        "subcategory": "ai_ml",
        "content": "AI/ML Skills: Machine Learning, Deep Learning, Computer Vision, NLP, RAG (Retrieval-Augmented Generation), Agentic AI, LLM Integration. Frameworks: PyTorch, TensorFlow, Scikit-learn, LangChain, Hugging Face, OpenCV.",
        "keywords": ["ai", "ml", "machine learning", "deep learning", "nlp", "computer vision", "rag", "agentic", "llm", "pytorch", "tensorflow", "langchain", "hugging face", "opencv", "model"],
    },
    {
        "id": "skills-databases",
        "category": "skills",
        "subcategory": "databases",
        "content": "Databases: PostgreSQL, MySQL, MongoDB.",
        "keywords": ["database", "postgresql", "mysql", "mongodb", "db", "sql"],
    },
    {
        "id": "skills-devops",
        "category": "skills",
        "subcategory": "devops",
        "content": "DevOps & Tools: Docker, Git, MLOps.",
        "keywords": ["devops", "docker", "git", "mlops", "deployment", "ci", "cd"],
    },

    # ── Experience ───────────────────────────────────────────────────────
    {
        "id": "exp-memi-1",
        "category": "experience",
        "subcategory": "memi_trading",
        "content": "AI/ML Intern at Memi Trading PLC (Jun 2025 – Present). Designed and deployed 3 AI-powered applications using FastAPI + Next.js, reducing manual processing time by 65%. Integrated RAG-based medical knowledge retrieval into a clinical decision support system.",
        "keywords": ["intern", "memi", "trading", "work", "job", "current", "experience"],
    },
    {
        "id": "exp-gemed-1",
        "category": "experience",
        "subcategory": "gemed_solutions",
        "content": "CTO & Co-Founder at Gemed Solutions (Dec 2025 – Present). Led a team of 4 developers and researchers to build an end-to-end AI incubation platform. Secured 2 pilot clients in 3 months. Architected a full-stack system (React + FastAPI + PostgreSQL + Docker) serving 15+ startups.",
        "keywords": ["cto", "co-founder", "gemed", "startup", "founder", "leadership", "lead", "company"],
    },
    {
        "id": "exp-borntowin-1",
        "category": "experience",
        "subcategory": "born_to_win",
        "content": "Program & Event Coordinator at Born to Win Tech Club (Sep 2025 – Present). Organized 12 workshops on Generative AI and Agentic Systems. Grew club membership from 45 to 180+ members.",
        "keywords": ["born to win", "club", "workshop", "coordinator", "event", "community", "volunteer"],
    },

    # ── Projects ─────────────────────────────────────────────────────────
    {
        "id": "proj-vendor",
        "category": "projects",
        "subcategory": "vendor_recommendation",
        "content": "Vendor Recommendation System: ML-driven vendor matching using matrix factorization and ensemble models. Built with React frontend and FastAPI backend. Automated vendor selection reduced procurement time by 40%.",
        "keywords": ["vendor", "recommendation", "matching", "procurement"],
    },
    {
        "id": "proj-ecommerce",
        "category": "projects",
        "subcategory": "ecommerce",
        "content": "AI-Powered E-commerce Platform: Full-stack e-commerce app with collaborative filtering recommendations. Built with Next.js + FastAPI, deployed on Vercel with real-time product suggestions.",
        "keywords": ["e-commerce", "ecommerce", "shopping", "collaborative filtering", "recommendation"],
    },
    {
        "id": "proj-clinical",
        "category": "projects",
        "subcategory": "clinical_decision",
        "content": "Clinical Decision Support System: NLP and deep learning model analyzing patient symptoms with RAG-based medical knowledge retrieval for evidence-backed clinical recommendations.",
        "keywords": ["clinical", "medical", "health", "patient", "decision support", "nlp"],
    },
    {
        "id": "proj-skin-cancer",
        "category": "projects",
        "subcategory": "skin_cancer",
        "content": "Skin Cancer Classification: CNN-based dermoscopy image classifier achieving 94% accuracy. Features real-time web deployment with React frontend and FastAPI inference server.",
        "keywords": ["skin cancer", "classification", "cnn", "dermoscopy", "image", "accuracy"],
    },
    {
        "id": "proj-anomaly",
        "category": "projects",
        "subcategory": "anomaly_detection",
        "content": "Vision-Based Anomaly Detection: Unsupervised industrial/security video monitoring using contrastive learning. Includes a Next.js dashboard for real-time alerts and analytics.",
        "keywords": ["anomaly", "detection", "vision", "contrastive", "industrial", "security", "monitoring"],
    },
    {
        "id": "proj-job-matching",
        "category": "projects",
        "subcategory": "job_matching",
        "content": "AI-Powered Job Matching Platform: NLP + vector embeddings (LLM + RAG) matching candidates to optimal jobs. Features Agentic AI for automated resume screening and ranking.",
        "keywords": ["job", "matching", "resume", "screening", "recruitment", "hiring", "agentic"],
    },

    # ── Education ────────────────────────────────────────────────────────
    {
        "id": "edu-1",
        "category": "education",
        "subcategory": "university",
        "content": "B.Sc. in Electrical & Computer Engineering at Mekelle University. Expected graduation: July 2026. CGPA: 3.93/4.0. Achievements: Top performer, startup competition winner at Mekelle Incubation Center.",
        "keywords": ["education", "university", "degree", "school", "cgpa", "gpa", "study", "mekelle", "graduate"],
    },

    # ── Certifications ───────────────────────────────────────────────────
    {
        "id": "cert-ml",
        "category": "certifications",
        "subcategory": "ml_specialization",
        "content": "Machine Learning Specialization — Coursera & Stanford Online (March 2025).",
        "keywords": ["certification", "coursera", "stanford", "machine learning", "certificate"],
    },
    {
        "id": "cert-fullstack",
        "category": "certifications",
        "subcategory": "fullstack",
        "content": "Full-Stack Developer Certificate — Udacity (January 2025).",
        "keywords": ["certification", "udacity", "full-stack", "certificate"],
    },

    # ── Contact ──────────────────────────────────────────────────────────
    {
        "id": "contact-email",
        "category": "contact",
        "subcategory": "email",
        "content": "Email: getachewekubay8@gmail.com",
        "keywords": ["email", "mail", "contact"],
    },
    {
        "id": "contact-phone",
        "category": "contact",
        "subcategory": "phone",
        "content": "Phone: +251 994 659 621",
        "keywords": ["phone", "call", "number"],
    },
    {
        "id": "contact-location",
        "category": "contact",
        "subcategory": "location",
        "content": "Location: Mekelle, Ethiopia.",
        "keywords": ["location", "where", "live", "city", "country", "address", "based"],
    },
    {
        "id": "contact-links",
        "category": "contact",
        "subcategory": "links",
        "content": "Portfolio: getachewekubay.vercel.app. GitHub: github.com/Gech-E. LinkedIn: linkedin.com/in/getachewekubay.",
        "keywords": ["portfolio", "github", "linkedin", "website", "link", "social"],
    },
]


def get_chunks_by_category(category: str) -> List[ResumeChunk]:
    """Return all chunks matching a specific category."""
    return [c for c in RESUME_CHUNKS if c["category"] == category]


def get_all_categories() -> List[str]:
    """Return unique category names."""
    return list(set(c["category"] for c in RESUME_CHUNKS))
