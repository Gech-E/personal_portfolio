"""
Script to initialize the database with sample data
"""
from database import SessionLocal, engine, Base
from models import Project, Skill
import json

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Sample projects
sample_projects = [
    {
        "title": "AI-Powered E-Commerce Platform",
        "description": "Full-stack e-commerce solution with ML-based recommendation system, computer vision for product search, and real-time inventory management.",
        "technologies": ["Next.js", "FastAPI", "PostgreSQL", "ML", "CV"],
        "github_url": "https://github.com",
        "demo_url": "https://demo.com",
    },
    {
        "title": "NLP Sentiment Analysis API",
        "description": "RESTful API for real-time sentiment analysis using deep learning models. Processes text data and provides sentiment scores with high accuracy.",
        "technologies": ["FastAPI", "Python", "NLP", "Deep Learning", "Docker"],
        "github_url": "https://github.com",
        "demo_url": "https://demo.com",
    },
    {
        "title": "Computer Vision Object Detection",
        "description": "Real-time object detection system using YOLO and custom deep learning models. Web interface for uploading and analyzing images.",
        "technologies": ["React", "Flask", "CV", "Deep Learning", "OpenCV"],
        "github_url": "https://github.com",
        "demo_url": "https://demo.com",
    },
    {
        "title": "ML Model Deployment Platform",
        "description": "Platform for deploying and managing machine learning models with versioning, A/B testing, and monitoring capabilities.",
        "technologies": ["Next.js", "FastAPI", "PostgreSQL", "ML", "Docker"],
        "github_url": "https://github.com",
        "demo_url": "https://demo.com",
    },
]

# Sample skills
sample_skills = [
    # Frontend
    {"name": "React", "category": "Frontend", "level": 90},
    {"name": "Next.js", "category": "Frontend", "level": 85},
    {"name": "TypeScript", "category": "Frontend", "level": 80},
    {"name": "Tailwind CSS", "category": "Frontend", "level": 85},
    # Backend
    {"name": "Python", "category": "Backend", "level": 95},
    {"name": "FastAPI", "category": "Backend", "level": 90},
    {"name": "Flask", "category": "Backend", "level": 85},
    {"name": "RESTful APIs", "category": "Backend", "level": 90},
    # AI/ML
    {"name": "Machine Learning", "category": "AI/ML", "level": 90},
    {"name": "Deep Learning", "category": "AI/ML", "level": 85},
    {"name": "Computer Vision", "category": "AI/ML", "level": 85},
    {"name": "NLP", "category": "AI/ML", "level": 80},
    # Database & Tools
    {"name": "PostgreSQL", "category": "Database & Tools", "level": 85},
    {"name": "MongoDB", "category": "Database & Tools", "level": 75},
    {"name": "Docker", "category": "Database & Tools", "level": 80},
    {"name": "Git", "category": "Database & Tools", "level": 90},
]

try:
    # Add projects
    for project_data in sample_projects:
        existing = db.query(Project).filter(Project.title == project_data["title"]).first()
        if not existing:
            project = Project(**project_data)
            db.add(project)
    
    # Add skills
    for skill_data in sample_skills:
        existing = db.query(Skill).filter(Skill.name == skill_data["name"]).first()
        if not existing:
            skill = Skill(**skill_data)
            db.add(skill)
    
    db.commit()
    print("Database initialized successfully!")
except Exception as e:
    print(f"Error initializing database: {e}")
    db.rollback()
finally:
    db.close()
