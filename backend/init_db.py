"""
Script to initialize the database with sample data matching the frontend
"""
from database import SessionLocal, engine, Base
from models import Project, Skill, ContactMessage
from sqlalchemy import text

# Drop and recreate tables to pick up new columns
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Projects matching the frontend exactly
sample_projects = [
    {
        "title": "Vendor Recommendation System",
        "description": "ML-driven vendor matching using matrix factorization & ensemble models with a React frontend and FastAPI backend. Automated vendor selection reduced procurement time by 40%.",
        "technologies": ["Python", "FastAPI", "React", "Scikit-learn", "PostgreSQL"],
        "icon_name": "Brain",
        "color": "#34d399",
        "category": "AI/ML,Full-Stack",
        "github_url": "https://github.com/Gech-E",
    },
    {
        "title": "AI-Powered E-commerce Platform",
        "description": "Full-stack e-commerce app with collaborative filtering recommendations. Built with Next.js + FastAPI, deployed on Vercel with real-time product suggestions.",
        "technologies": ["Next.js", "FastAPI", "TensorFlow", "PostgreSQL", "Vercel"],
        "icon_name": "ShoppingCart",
        "color": "#3b82f6",
        "category": "AI/ML,Full-Stack",
        "github_url": "https://github.com/Gech-E",
    },
    {
        "title": "Clinical Decision Support System",
        "description": "NLP & deep learning model analyzing patient symptoms with RAG-based medical knowledge retrieval for evidence-backed clinical recommendations.",
        "technologies": ["Python", "LangChain", "RAG", "PyTorch", "FastAPI"],
        "icon_name": "Stethoscope",
        "color": "#f472b6",
        "category": "AI/ML,Full-Stack",
        "github_url": "https://github.com/Gech-E",
    },
    {
        "title": "Skin Cancer Classification",
        "description": "CNN-based dermoscopy image classifier achieving 94% accuracy. Real-time web deployment with React frontend and FastAPI inference server.",
        "technologies": ["PyTorch", "OpenCV", "React", "FastAPI", "Docker"],
        "icon_name": "Eye",
        "color": "#fbbf24",
        "category": "AI/ML,Computer Vision,Full-Stack",
        "github_url": "https://github.com/Gech-E",
    },
    {
        "title": "Vision-Based Anomaly Detection",
        "description": "Unsupervised industrial/security video monitoring using contrastive learning. Next.js dashboard for real-time alerts and analytics.",
        "technologies": ["PyTorch", "OpenCV", "Next.js", "Contrastive Learning"],
        "icon_name": "AlertTriangle",
        "color": "#f97316",
        "category": "AI/ML,Computer Vision",
        "github_url": "https://github.com/Gech-E",
    },
    {
        "title": "AI-Powered Job Matching Platform",
        "description": "NLP + vector embeddings (LLM + RAG) matching candidates to optimal jobs. Agentic AI features for automated resume screening and ranking.",
        "technologies": ["LangChain", "Hugging Face", "Next.js", "Agentic AI", "RAG"],
        "icon_name": "Search",
        "color": "#8b5cf6",
        "category": "AI/ML,Full-Stack",
        "github_url": "https://github.com/Gech-E",
    },
]

# Skills matching the frontend exactly
sample_skills = [
    # Languages
    {"name": "Python", "category": "Languages", "level": 95},
    {"name": "JavaScript", "category": "Languages", "level": 90},
    {"name": "TypeScript", "category": "Languages", "level": 88},
    {"name": "C++", "category": "Languages", "level": 82},
    {"name": "SQL", "category": "Languages", "level": 85},
    # Frontend
    {"name": "React", "category": "Frontend", "level": 92},
    {"name": "Next.js", "category": "Frontend", "level": 90},
    {"name": "Tailwind CSS", "category": "Frontend", "level": 93},
    # Backend & Databases
    {"name": "FastAPI", "category": "Backend & Databases", "level": 90},
    {"name": "Flask", "category": "Backend & Databases", "level": 82},
    {"name": "PostgreSQL", "category": "Backend & Databases", "level": 85},
    {"name": "MLOps", "category": "Backend & Databases", "level": 80},
    # AI / ML
    {"name": "PyTorch", "category": "AI / ML", "level": 88},
    {"name": "TensorFlow", "category": "AI / ML", "level": 85},
    {"name": "LangChain", "category": "AI / ML", "level": 86},
    {"name": "Hugging Face", "category": "AI / ML", "level": 84},
    {"name": "OpenCV", "category": "AI / ML", "level": 80},
    {"name": "Vision Transformers", "category": "AI / ML", "level": 82},
    # DevOps & Tools
    {"name": "Docker", "category": "DevOps & Tools", "level": 80},
    {"name": "Git", "category": "DevOps & Tools", "level": 90},
    {"name": "System Architecture", "category": "DevOps & Tools", "level": 85},
    {"name": "Robotics & Automation", "category": "DevOps & Tools", "level": 78},
]

try:
    # Add projects
    for project_data in sample_projects:
        project = Project(**project_data)
        db.add(project)

    # Add skills
    for skill_data in sample_skills:
        skill = Skill(**skill_data)
        db.add(skill)

    db.commit()
    print("Database initialized successfully!")
    print(f"  - {len(sample_projects)} projects added")
    print(f"  - {len(sample_skills)} skills added")
except Exception as e:
    print(f"Error initializing database: {e}")
    db.rollback()
finally:
    db.close()
