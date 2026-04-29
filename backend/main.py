from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import os
from datetime import datetime

from database import SessionLocal, engine, Base
from models import Project, ContactMessage, Skill

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Portfolio API",
    description="Backend API for personal portfolio",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ─── Pydantic models ─────────────────────────────────────────────────

class ProjectCreate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    icon_name: Optional[str] = None
    color: Optional[str] = None
    category: Optional[str] = None

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str]
    demo_url: Optional[str]
    image_url: Optional[str]
    icon_name: Optional[str]
    color: Optional[str]
    category: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: Optional[str]
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

class SkillResponse(BaseModel):
    id: int
    name: str
    category: str
    level: int

    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    query: str

class ChatResponseModel(BaseModel):
    response: str
    chunks_used: int


# ─── RAG Knowledge Base (for chat) ───────────────────────────────────

knowledge_base = [
    {
        "id": "bio-1",
        "category": "bio",
        "keywords": ["who", "about", "introduce", "getachew", "name", "background", "tell me", "yourself", "him", "overview", "summary"],
        "content": "Getachew Ekubay is a builder at heart, specializing in the intersection of AI/ML Engineering, Full-Stack Development, and Robotics. Based in Mekelle, Ethiopia, he is pursuing a B.Sc. in Electrical & Computer Engineering at Mekelle University (CGPA 3.93/4.0). He focuses on designing and deploying intelligent, scalable systems that bridge the gap between complex research and production-ready applications.",
    },
    {
        "id": "contact-1",
        "category": "contact",
        "keywords": ["contact", "email", "phone", "reach", "location", "where", "address", "call", "message", "hire", "connect"],
        "content": "You can reach Getachew via email at getachewekubay8@gmail.com or by phone at +251 994 659 621. He is based in Mekelle, Ethiopia. His portfolio website is getachewekubay.vercel.app. You can also find him on GitHub (github.com/Gech-E) and LinkedIn (linkedin.com/in/getachewekubay).",
    },
    {
        "id": "skills-languages",
        "category": "skills",
        "keywords": ["skills", "languages", "programming", "code", "python", "javascript", "typescript", "c++", "sql", "tech", "stack", "technologies", "tools"],
        "content": "Getachew is proficient in Python, JavaScript, C++, SQL, and TypeScript. For frontend development, he uses React, Next.js, and Tailwind CSS. On the backend, he works with FastAPI, Flask, MLOps, and System Architecture. His database expertise includes PostgreSQL, MySQL, and MongoDB. He also uses Docker and Git for DevOps.",
    },
    {
        "id": "skills-ai",
        "category": "skills",
        "keywords": ["ai", "ml", "machine learning", "deep learning", "artificial intelligence", "nlp", "natural language", "computer vision", "rag", "agentic", "llm", "model", "neural", "transformer", "vit", "contrastive"],
        "content": "Getachew specializes in AI/ML including Machine Learning, Deep Learning, Computer Vision, NLP, RAG (Retrieval-Augmented Generation), Agentic AI, LLM Integration, Vision Transformers (ViT), and Contrastive Learning. He works with PyTorch, TensorFlow, Scikit-learn, LangChain, Hugging Face, and OpenCV.",
    },
    {
        "id": "skills-frontend",
        "category": "skills",
        "keywords": ["frontend", "front-end", "react", "nextjs", "next.js", "tailwind", "web", "ui", "ux", "design", "interface"],
        "content": "For frontend development, Getachew is highly proficient with React and Next.js, combined with Tailwind CSS for styling. He builds responsive, performant, and accessible user interfaces.",
    },
    {
        "id": "skills-backend",
        "category": "skills",
        "keywords": ["backend", "back-end", "api", "fastapi", "flask", "server", "rest", "database", "postgresql", "mongodb", "mysql", "docker", "mlops", "architecture"],
        "content": "On the backend, Getachew works primarily with FastAPI and Flask to build RESTful APIs. He uses PostgreSQL, MySQL, and MongoDB for databases. He has expertise in MLOps, System Architecture, and containerizes applications with Docker.",
    },
    {
        "id": "exp-memi",
        "category": "experience",
        "keywords": ["experience", "work", "job", "intern", "memi", "trading", "internship", "current", "working"],
        "content": "Getachew currently works as an AI/ML Intern at Memi Trading PLC (Jun 2025 – Present). He designed and deployed 3 AI-powered applications using FastAPI + Next.js, reducing manual processing time by 65%.",
    },
    {
        "id": "exp-gemed",
        "category": "experience",
        "keywords": ["experience", "cto", "co-founder", "gemed", "solutions", "startup", "leadership", "lead", "founder", "company"],
        "content": "Getachew is the CTO & Co-Founder of Gemed Solutions (Dec 2025 – Present). He leads a team of 4 developers building an end-to-end AI incubation platform, securing 2 pilot clients in 3 months.",
    },
    {
        "id": "exp-btwc",
        "category": "experience",
        "keywords": ["club", "born to win", "workshop", "event", "coordinator", "community", "teach", "mentor", "organize"],
        "content": "Getachew serves as Program & Event Coordinator at Born to Win Tech Club (Sep 2025 – Present). He organized 12 workshops on Generative AI and Agentic Systems, growing club membership from 45 to 180+ members.",
    },
    {
        "id": "proj-vendor",
        "category": "projects",
        "keywords": ["vendor", "recommendation", "matching", "procurement", "project"],
        "content": "The Vendor Recommendation System is an ML-driven platform using matrix factorization and ensemble models for intelligent vendor matching. It features a React frontend and FastAPI backend.",
    },
    {
        "id": "proj-ecommerce",
        "category": "projects",
        "keywords": ["ecommerce", "e-commerce", "shop", "store", "product", "collaborative filtering", "recommendation"],
        "content": "The AI-Powered E-commerce Platform is a full-stack app with collaborative filtering recommendations. Built with Next.js + FastAPI and deployed on Vercel.",
    },
    {
        "id": "proj-clinical",
        "category": "projects",
        "keywords": ["clinical", "medical", "health", "healthcare", "doctor", "patient", "symptom", "diagnosis", "decision support"],
        "content": "The Clinical Decision Support System uses NLP and deep learning to analyze patient symptoms, with RAG-based medical knowledge retrieval for evidence-backed clinical recommendations.",
    },
    {
        "id": "proj-skin",
        "category": "projects",
        "keywords": ["skin", "cancer", "classification", "dermoscopy", "cnn", "image", "medical imaging"],
        "content": "The Skin Cancer Classification project is a CNN-based dermoscopy image classifier achieving 94% accuracy with real-time web deployment.",
    },
    {
        "id": "proj-anomaly",
        "category": "projects",
        "keywords": ["anomaly", "detection", "security", "video", "monitoring", "industrial", "surveillance", "vision"],
        "content": "The Vision-Based Anomaly Detection system uses unsupervised contrastive learning for industrial and security video monitoring with a Next.js dashboard.",
    },
    {
        "id": "proj-job",
        "category": "projects",
        "keywords": ["job", "matching", "resume", "screening", "hiring", "recruitment", "career", "candidate"],
        "content": "The AI-Powered Job Matching Platform uses NLP and vector embeddings (LLM + RAG) to match candidates to optimal jobs with Agentic AI for automated resume screening.",
    },
    {
        "id": "edu-1",
        "category": "education",
        "keywords": ["education", "university", "degree", "school", "study", "academic", "cgpa", "gpa", "grade", "course", "mekelle", "graduate", "graduation"],
        "content": "Getachew is pursuing a B.Sc. in Electrical & Computer Engineering at Mekelle University, expected graduation July 2026. CGPA: 3.93/4.0. Top performer and startup competition winner.",
    },
    {
        "id": "cert-1",
        "category": "certifications",
        "keywords": ["certification", "certificate", "coursera", "stanford", "udacity", "credential", "course", "online"],
        "content": "Getachew holds a Machine Learning Specialization from Coursera & Stanford University (March 2025) and a Full-Stack Developer Certificate from Udacity (January 2025).",
    },
    {
        "id": "projects-overview",
        "category": "projects",
        "keywords": ["projects", "portfolio", "built", "build", "work", "all projects", "what have you built", "show"],
        "content": "Getachew has built 6+ notable projects: (1) Vendor Recommendation System, (2) AI-Powered E-commerce Platform, (3) Clinical Decision Support System, (4) Skin Cancer Classification, (5) Vision-Based Anomaly Detection, and (6) AI-Powered Job Matching Platform.",
    },
    {
        "id": "strengths",
        "category": "strengths",
        "keywords": ["strength", "strong", "good at", "best", "specialize", "expertise", "capable", "ability", "what can", "why hire", "hire", "stand out", "unique"],
        "content": "Getachew's key strengths include: (1) Strong academic foundation with 3.93 CGPA, (2) Production-grade AI/ML experience, (3) Full-stack proficiency, (4) Leadership as CTO of Gemed Solutions, (5) Community impact through 12+ workshops.",
    },
    {
        "id": "availability",
        "category": "availability",
        "keywords": ["available", "hire", "open", "looking", "opportunity", "freelance", "remote", "full-time", "part-time", "collaborate", "position", "role"],
        "content": "Getachew is currently open to new opportunities in AI/ML Engineering and Full-Stack Development roles. He is available for full-time positions, internships, and collaborative projects. Contact: getachewekubay8@gmail.com.",
    },
    {
        "id": "robotics-1",
        "category": "skills",
        "keywords": ["robotics", "robot", "automation", "control", "control systems", "intelligent", "industrial", "hardware", "embedded"],
        "content": "Getachew has expertise in Robotics and Intelligent Control Systems & Automation, bridging AI/ML with embedded and industrial systems.",
    },
    {
        "id": "approach-1",
        "category": "bio",
        "keywords": ["approach", "methodology", "how", "process", "end-to-end", "philosophy", "style", "work style", "method"],
        "content": "Getachew's approach is end-to-end: he doesn't just train models — he builds the robust full-stack architectures required to integrate them into real-world industrial environments.",
    },
]


def tokenize(text: str) -> list[str]:
    import re
    return [t for t in re.sub(r"[^a-z0-9\s+#.]", " ", text.lower()).split() if len(t) > 1]


def retrieve_chunks(query: str, top_k: int = 3) -> list[dict]:
    query_tokens = tokenize(query)
    scored = []

    for chunk in knowledge_base:
        score = 0
        for kw in chunk["keywords"]:
            kw_tokens = tokenize(kw)
            for qt in query_tokens:
                for kt in kw_tokens:
                    if kt == qt:
                        score += 10
                    elif kt in qt or qt in kt:
                        score += 5

        content_tokens = tokenize(chunk["content"])
        for qt in query_tokens:
            for ct in content_tokens:
                if ct == qt:
                    score += 2
                elif qt in ct and len(qt) > 3:
                    score += 1

        for qt in query_tokens:
            if qt in chunk["category"]:
                score += 8

        if score > 0:
            scored.append({"chunk": chunk, "score": score})

    scored.sort(key=lambda x: x["score"], reverse=True)
    return [s["chunk"] for s in scored[:top_k]]


def generate_chat_response(query: str) -> tuple[str, int]:
    import re
    q = query.lower().strip()

    if re.match(r"^(hi|hello|hey|howdy|sup|greetings|good (morning|afternoon|evening))", q):
        return "Hey there! 👋 I'm Getachew's AI assistant, powered by his resume data. I can answer questions about his skills, projects, experience, education, and more. What would you like to know?", 0

    if re.match(r"^(thanks|thank you|thx|ty|appreciate)", q):
        return "You're welcome! Feel free to ask anything else about Getachew's background, or scroll down to the Contact section to reach out directly. 😊", 0

    chunks = retrieve_chunks(query)

    if not chunks:
        return "I'm specifically trained on Getachew's resume and professional background. I can help with questions about his **skills**, **projects**, **experience**, **education**, **certifications**, or **contact info**. Could you rephrase your question?", 0

    categories = list(set(c["category"] for c in chunks))

    if "projects" in categories and len(chunks) > 1:
        project_chunks = [c for c in chunks if c["category"] == "projects"]
        if project_chunks:
            response = "\n\n".join(c["content"] for c in project_chunks)
            return response, len(project_chunks)

    if "skills" in categories and len(chunks) >= 2:
        response = "\n\n".join(c["content"] for c in chunks)
        return response, len(chunks)

    top_chunk = chunks[0]
    response = top_chunk["content"]

    all_categories = {
        "bio": "his background",
        "skills": "his technical skills",
        "experience": "his work experience",
        "projects": "his projects",
        "education": "his education",
        "certifications": "his certifications",
        "contact": "how to contact him",
    }
    available = [val for key, val in all_categories.items() if key not in categories][:2]
    if available:
        response += f"\n\n💡 *You can also ask about {' or '.join(available)}.*"

    return response, len(chunks)


# ─── Routes ──────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}

@app.get("/api/projects", response_model=List[ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return projects

@app.post("/api/projects", response_model=ProjectResponse)
async def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.get("/api/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.post("/api/contact", response_model=ContactResponse)
async def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    db_contact = ContactMessage(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@app.get("/api/contact", response_model=List[ContactResponse])
async def get_contacts(db: Session = Depends(get_db)):
    contacts = db.query(ContactMessage).all()
    return contacts

@app.get("/api/skills", response_model=List[SkillResponse])
async def get_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).all()
    return skills

@app.post("/api/chat", response_model=ChatResponseModel)
async def chat(request: ChatRequest):
    response, chunks_used = generate_chat_response(request.query)
    return ChatResponseModel(response=response, chunks_used=chunks_used)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
