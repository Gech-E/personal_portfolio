/**
 * Client-side RAG fallback — used when the backend /api/chat is unreachable.
 * Contains a local knowledge base and retrieval logic so the chatbot
 * can still provide useful answers in offline / error scenarios.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export interface KnowledgeChunk {
  id: string;
  category: string;
  keywords: string[];
  content: string;
}

// ─── Knowledge Base ─────────────────────────────────────────────────────────

const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "bio-1",
    category: "bio",
    keywords: ["who", "about", "introduce", "getachew", "name", "background", "tell me", "yourself", "him", "overview", "summary"],
    content: "Getachew Ekubay is a builder at heart, specializing in the intersection of AI/ML Engineering, Full-Stack Development, and Robotics. Based in Mekelle, Ethiopia, he is pursuing a B.Sc. in Electrical & Computer Engineering at Mekelle University (CGPA 3.93/4.0). He focuses on designing and deploying intelligent, scalable systems that bridge the gap between complex research and production-ready applications.",
  },
  {
    id: "contact-1",
    category: "contact",
    keywords: ["contact", "email", "phone", "reach", "location", "where", "address", "call", "message", "hire", "connect"],
    content: "You can reach Getachew via email at getachewekubay8@gmail.com or by phone at +251 994 659 621. He is based in Mekelle, Ethiopia. His portfolio website is getachewekubay.vercel.app. You can also find him on GitHub (github.com/Gech-E) and LinkedIn (linkedin.com/in/getachewekubay).",
  },
  {
    id: "skills-languages",
    category: "skills",
    keywords: ["skills", "languages", "programming", "code", "python", "javascript", "typescript", "html", "css", "c++", "sql", "tech", "stack", "technologies", "tools"],
    content: "Getachew is proficient in Python, JavaScript, C++, SQL, and TypeScript. For frontend development, he uses React, Next.js, and Tailwind CSS. On the backend, he works with FastAPI, Flask, MLOps, and System Architecture. His database expertise includes PostgreSQL, MySQL, and MongoDB. He also uses Docker and Git for DevOps.",
  },
  {
    id: "skills-ai",
    category: "skills",
    keywords: ["ai", "ml", "machine learning", "deep learning", "artificial intelligence", "nlp", "natural language", "computer vision", "rag", "agentic", "llm", "model", "neural", "transformer", "vit", "contrastive"],
    content: "Getachew specializes in AI/ML including Machine Learning, Deep Learning, Computer Vision, NLP, RAG (Retrieval-Augmented Generation), Agentic AI, LLM Integration, Vision Transformers (ViT), and Contrastive Learning. He works with PyTorch, TensorFlow, Scikit-learn, LangChain, Hugging Face, and OpenCV.",
  },
  {
    id: "exp-memi",
    category: "experience",
    keywords: ["experience", "work", "job", "intern", "memi", "trading", "internship", "current", "working"],
    content: "Getachew currently works as an AI/ML Intern at Memi Trading PLC (Jun 2025 – Present). He designed and deployed 3 AI-powered applications using FastAPI + Next.js, reducing manual processing time by 65%.",
  },
  {
    id: "exp-gemed",
    category: "experience",
    keywords: ["experience", "cto", "co-founder", "gemed", "solutions", "startup", "leadership", "lead", "founder", "company"],
    content: "Getachew is the CTO & Co-Founder of Gemed Solutions (Dec 2025 – Present). He leads a team of 4 developers and researchers building an end-to-end AI incubation platform, securing the first 2 pilot clients within 3 months.",
  },
  {
    id: "projects-overview",
    category: "projects",
    keywords: ["projects", "portfolio", "built", "build", "work", "all projects", "what have you built", "show"],
    content: "Getachew has built 6+ notable projects: (1) Vendor Recommendation System — ML-driven vendor matching, (2) AI-Powered E-commerce Platform — collaborative filtering recommendations, (3) Clinical Decision Support System — NLP + RAG for medical knowledge, (4) Skin Cancer Classification — CNN with 94% accuracy, (5) Vision-Based Anomaly Detection — contrastive learning for video monitoring, and (6) AI-Powered Job Matching Platform — LLM + RAG + Agentic AI for recruitment.",
  },
  {
    id: "edu-1",
    category: "education",
    keywords: ["education", "university", "degree", "school", "study", "academic", "cgpa", "gpa", "grade", "course", "mekelle", "graduate", "graduation"],
    content: "Getachew is pursuing a B.Sc. in Electrical & Computer Engineering at Mekelle University, with an expected graduation in July 2026. He has a CGPA of 3.93/4.0, making him a top performer. He won a startup competition at Mekelle Incubation Center.",
  },
  {
    id: "availability",
    category: "availability",
    keywords: ["available", "hire", "open", "looking", "opportunity", "freelance", "remote", "full-time", "part-time", "collaborate", "position", "role"],
    content: "Getachew is currently open to new opportunities in AI/ML Engineering and Full-Stack Development roles. He is available for full-time positions, internships, and collaborative projects. You can reach out via email at getachewekubay8@gmail.com.",
  },
];

// ─── Retrieval Helpers ──────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

export function retrieveChunks(query: string, topK = 3): KnowledgeChunk[] {
  const queryTokens = tokenize(query);

  const scored = knowledgeBase.map((chunk) => {
    let score = 0;

    // Keyword matching
    for (const kw of chunk.keywords) {
      const kwTokens = tokenize(kw);
      for (const qt of queryTokens) {
        for (const kt of kwTokens) {
          if (kt === qt) score += 10;
          else if (kt.includes(qt) || qt.includes(kt)) score += 5;
        }
      }
    }

    // Content matching
    const contentTokens = tokenize(chunk.content);
    for (const qt of queryTokens) {
      for (const ct of contentTokens) {
        if (ct === qt) score += 2;
        else if (ct.includes(qt) && qt.length > 3) score += 1;
      }
    }

    // Category matching
    for (const qt of queryTokens) {
      if (chunk.category.includes(qt)) score += 8;
    }

    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}

// ─── Response Generation ────────────────────────────────────────────────────

export function generateLocalResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (/^(hi|hello|hey|howdy|sup|greetings|good (morning|afternoon|evening))/.test(q)) {
    return "Hey there! 👋 I'm Getachew's AI assistant, powered by his resume data. I can answer questions about his skills, projects, experience, education, and more. What would you like to know?";
  }

  if (/^(thanks|thank you|thx|ty|appreciate)/.test(q)) {
    return "You're welcome! Feel free to ask anything else about Getachew's background, or scroll down to the Contact section to reach out directly. 😊";
  }

  const chunks = retrieveChunks(query);

  if (chunks.length === 0) {
    return "I'm specifically trained on Getachew's resume and professional background. I can help with questions about his **skills**, **projects**, **experience**, **education**, **certifications**, or **contact info**. Could you rephrase your question?";
  }

  const categories = [...new Set(chunks.map((c) => c.category))];

  if (categories.includes("projects") && chunks.length > 1) {
    return chunks.filter((c) => c.category === "projects").map((c) => c.content).join("\n\n");
  }

  if (categories.includes("skills") && chunks.length >= 2) {
    return chunks.map((c) => c.content).join("\n\n");
  }

  const topChunk = chunks[0];
  let response = topChunk.content;

  const allCategories: Record<string, string> = {
    bio: "his background",
    skills: "his technical skills",
    experience: "his work experience",
    projects: "his projects",
    education: "his education",
    contact: "how to contact him",
  };

  const available = Object.entries(allCategories)
    .filter(([key]) => !categories.includes(key))
    .slice(0, 2)
    .map(([, val]) => val);

  if (available.length) {
    response += `\n\n💡 *You can also ask about ${available.join(" or ")}.*`;
  }

  return response;
}
