import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ─── Knowledge Base (RAG Context Chunks) ───────────────────────────────────────
// Each chunk represents a "document" in our retrieval system. The chatbot
// retrieves the most relevant chunks based on keyword matching, then generates
// a response grounded in that context.

interface KnowledgeChunk {
  id: string;
  category: string;
  keywords: string[];
  content: string;
}

const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "bio-1",
    category: "bio",
    keywords: ["who", "about", "introduce", "getachew", "name", "background", "tell me", "yourself", "him", "overview", "summary"],
    content:
      "I'm Getachew Ekubay — a builder at heart, specializing in the intersection of AI/ML Engineering, Full-Stack Development, and Robotics. Based in Mekelle, Ethiopia, I'm pursuing a B.Sc. in Electrical & Computer Engineering at Mekelle University (CGPA 3.93/4.0). I focus on designing and deploying intelligent, scalable systems that bridge the gap between complex research and production-ready applications. My approach is end-to-end: I don't just train models — I build the robust full-stack architectures required to integrate them into real-world industrial environments.",
  },
  {
    id: "contact-1",
    category: "contact",
    keywords: ["contact", "email", "phone", "reach", "location", "where", "address", "call", "message", "hire", "connect"],
    content:
      "You can reach me via email at getachewekubay8@gmail.com or by phone at +251 994 659 621. I'm based in Mekelle, Ethiopia. My portfolio website is getachewekubay.vercel.app. You can also find me on GitHub (github.com/Gech-E) and LinkedIn (linkedin.com/in/getachewekubay).",
  },
  {
    id: "skills-languages",
    category: "skills",
    keywords: ["skills", "languages", "programming", "code", "python", "javascript", "typescript", "html", "css", "c++", "sql", "tech", "stack", "technologies", "tools"],
    content:
      "I'm proficient in Python, JavaScript, C++, SQL, and TypeScript. For frontend development, I use React, Next.js, and Tailwind CSS. On the backend, I work with FastAPI, Flask, MLOps, and System Architecture. My database expertise includes PostgreSQL, MySQL, and MongoDB. I also use Docker and Git for DevOps.",
  },
  {
    id: "skills-ai",
    category: "skills",
    keywords: ["ai", "ml", "machine learning", "deep learning", "artificial intelligence", "nlp", "natural language", "computer vision", "rag", "agentic", "llm", "model", "neural", "transformer", "vit", "contrastive"],
    content:
      "I specialize in AI/ML including Machine Learning, Deep Learning, Computer Vision, NLP, RAG (Retrieval-Augmented Generation), Agentic AI, LLM Integration, Vision Transformers (ViT), and Contrastive Learning. I work with PyTorch, TensorFlow, Scikit-learn, LangChain, Hugging Face, and OpenCV. I've built production-grade AI systems for healthcare, e-commerce, industrial automation, and startup incubation.",
  },
  {
    id: "skills-frontend",
    category: "skills",
    keywords: ["frontend", "front-end", "react", "nextjs", "next.js", "tailwind", "web", "ui", "ux", "design", "interface"],
    content:
      "For frontend development, I'm highly proficient with React and Next.js, combined with Tailwind CSS for styling. I build responsive, performant, and accessible user interfaces. I deploy frontend applications on Vercel and have experience with modern component architectures.",
  },
  {
    id: "skills-backend",
    category: "skills",
    keywords: ["backend", "back-end", "api", "fastapi", "flask", "server", "rest", "database", "postgresql", "mongodb", "mysql", "docker", "mlops", "architecture"],
    content:
      "On the backend, I work primarily with FastAPI and Flask to build RESTful APIs. I use PostgreSQL, MySQL, and MongoDB for databases. I have expertise in MLOps, System Architecture, and containerize applications with Docker. I follow best practices for scalable, maintainable backend architecture.",
  },
  {
    id: "exp-memi",
    category: "experience",
    keywords: ["experience", "work", "job", "intern", "memi", "trading", "internship", "current", "working"],
    content:
      "I currently work as an AI/ML Intern at Memi Trading PLC (Jun 2025 – Present). I designed and deployed 3 AI-powered applications using FastAPI + Next.js, reducing manual processing time by 65% for inventory and vendor matching. I also collaborated with cross-functional teams to integrate RAG-based medical knowledge retrieval into a clinical decision support system.",
  },
  {
    id: "exp-gemed",
    category: "experience",
    keywords: ["experience", "cto", "co-founder", "gemed", "solutions", "startup", "leadership", "lead", "founder", "company"],
    content:
      "I'm the CTO & Co-Founder of Gemed Solutions (Dec 2025 – Present). I lead a team of 4 developers and researchers building an end-to-end AI incubation platform, and we secured our first 2 pilot clients within 3 months. I architected the full-stack system using React + FastAPI + PostgreSQL + Docker, supporting predictive analytics for 15+ startups.",
  },
  {
    id: "exp-btwc",
    category: "experience",
    keywords: ["club", "born to win", "workshop", "event", "coordinator", "community", "teach", "mentor", "organize"],
    content:
      "I serve as Program & Event Coordinator at Born to Win Tech Club (Sep 2025 – Present). I organized 12 workshops on Generative AI and Agentic Systems, growing club membership from 45 to 180+ members. I actively mentor peers in AI/ML and software engineering.",
  },
  {
    id: "proj-vendor",
    category: "projects",
    keywords: ["vendor", "recommendation", "matching", "procurement", "project"],
    content:
      "My Vendor Recommendation System is an ML-driven platform using matrix factorization and ensemble models for intelligent vendor matching. It features a React frontend and FastAPI backend, and automated vendor selection reduced procurement time by 40%.",
  },
  {
    id: "proj-ecommerce",
    category: "projects",
    keywords: ["ecommerce", "e-commerce", "shop", "store", "product", "collaborative filtering", "recommendation"],
    content:
      "My AI-Powered E-commerce Platform is a full-stack app with collaborative filtering recommendations. Built with Next.js + FastAPI and deployed on Vercel, it provides real-time product suggestions to users based on their behavior patterns.",
  },
  {
    id: "proj-clinical",
    category: "projects",
    keywords: ["clinical", "medical", "health", "healthcare", "doctor", "patient", "symptom", "diagnosis", "decision support"],
    content:
      "My Clinical Decision Support System uses NLP and deep learning to analyze patient symptoms, with RAG-based medical knowledge retrieval for evidence-backed clinical recommendations. It helps healthcare providers make more informed decisions.",
  },
  {
    id: "proj-skin",
    category: "projects",
    keywords: ["skin", "cancer", "classification", "dermoscopy", "cnn", "image", "medical imaging"],
    content:
      "My Skin Cancer Classification project is a CNN-based dermoscopy image classifier achieving 94% accuracy. It features real-time web deployment with a React frontend and FastAPI inference server. You can check it out live at skinvision-ai1.vercel.app.",
  },
  {
    id: "proj-anomaly",
    category: "projects",
    keywords: ["anomaly", "detection", "security", "video", "monitoring", "industrial", "surveillance", "vision"],
    content:
      "My Vision-Based Anomaly Detection system uses unsupervised contrastive learning for industrial and security video monitoring. It includes a Next.js dashboard for real-time alerts and analytics, detecting unusual patterns without labeled data.",
  },
  {
    id: "proj-job",
    category: "projects",
    keywords: ["job", "matching", "resume", "screening", "hiring", "recruitment", "career", "candidate"],
    content:
      "My AI-Powered Job Matching Platform uses NLP and vector embeddings (LLM + RAG) to match candidates to optimal jobs. It features Agentic AI capabilities for automated resume screening and ranking, streamlining the recruitment process.",
  },
  {
    id: "proj-incubation",
    category: "projects",
    keywords: ["incubation", "incubator", "startup", "mentorship", "gemed", "venture", "accelerator"],
    content:
      "My AI-Powered Incubation Center is an intelligent platform leveraging AI to streamline startup mentorship, resource allocation, and progress tracking for emerging ventures. You can check it out live at ai-powered-incubation-center-msuq.vercel.app.",
  },
  {
    id: "edu-1",
    category: "education",
    keywords: ["education", "university", "degree", "school", "study", "academic", "cgpa", "gpa", "grade", "course", "mekelle", "graduate", "graduation"],
    content:
      "I'm pursuing a B.Sc. in Electrical & Computer Engineering at Mekelle University, with an expected graduation in July 2026. I have a CGPA of 3.93/4.0, making me a top performer. Relevant courses include AI, Data Structures & Algorithms, Computer Networks, Computer Security, Software Engineering, and Database Systems. I'm recognized as an honorable graduate of 2026 and won a startup competition at Mekelle Incubation Center.",
  },
  {
    id: "cert-1",
    category: "certifications",
    keywords: ["certification", "certificate", "coursera", "stanford", "udacity", "credential", "course", "online"],
    content:
      "I hold a Machine Learning Specialization from Coursera & Stanford University (March 2025) and a Full-Stack Developer Certificate from Udacity (January 2025). These certifications demonstrate my commitment to continuous learning.",
  },
  {
    id: "lang-1",
    category: "languages",
    keywords: ["language", "speak", "english", "amharic", "tigrinya", "fluent", "native", "communication"],
    content:
      "I speak three languages: Tigrinya (Native), Amharic (Fluent), and English (Fluent). This multilingual ability helps me collaborate effectively in diverse teams.",
  },
  {
    id: "projects-overview",
    category: "projects",
    keywords: ["projects", "portfolio", "built", "build", "work", "all projects", "what have you built", "show"],
    content:
      "I've built 7+ notable projects: (1) Vendor Recommendation System — ML-driven vendor matching, (2) AI-Powered E-commerce Platform — collaborative filtering recommendations, (3) Clinical Decision Support System — NLP + RAG for medical knowledge, (4) Skin Cancer Classification — CNN with 94% accuracy, (5) Vision-Based Anomaly Detection — contrastive learning for video monitoring, (6) AI-Powered Job Matching Platform — LLM + RAG + Agentic AI for recruitment, and (7) AI-Powered Incubation Center — intelligent startup mentorship platform.",
  },
  {
    id: "strengths",
    category: "strengths",
    keywords: ["strength", "strong", "good at", "best", "specialize", "expertise", "capable", "ability", "what can", "why hire", "hire", "stand out", "unique", "different"],
    content:
      "My key strengths include: (1) Strong academic foundation with 3.93 CGPA, (2) Production-grade AI/ML experience across healthcare, e-commerce, and startups, (3) Full-stack proficiency from React/Next.js to FastAPI/PostgreSQL, (4) Leadership as CTO of Gemed Solutions managing a team of 4, (5) Community impact through 12+ workshops reaching 180+ members, and (6) Expertise in cutting-edge AI: RAG pipelines, Agentic AI, and LLM integration.",
  },
  {
    id: "availability",
    category: "availability",
    keywords: ["available", "hire", "open", "looking", "opportunity", "freelance", "remote", "full-time", "part-time", "collaborate", "position", "role"],
    content:
      "I'm currently open to new opportunities in AI/ML Engineering and Full-Stack Development roles. I'm available for full-time positions, internships, and collaborative projects. I'm particularly interested in roles involving RAG systems, Agentic AI, computer vision, and full-stack web application development. Feel free to reach out via email at getachewekubay8@gmail.com.",
  },
  {
    id: "robotics-1",
    category: "skills",
    keywords: ["robotics", "robot", "automation", "control", "control systems", "intelligent", "industrial", "hardware", "embedded", "c++"],
    content:
      "I have expertise in Robotics and Intelligent Control Systems & Automation. I work at the intersection of software intelligence and physical-world applications, bridging AI/ML with embedded and industrial systems. I'm proficient in C++ for systems-level programming and have experience designing automation pipelines for industrial environments.",
  },
  {
    id: "approach-1",
    category: "bio",
    keywords: ["approach", "methodology", "how", "process", "end-to-end", "philosophy", "style", "work style", "method"],
    content:
      "My approach is end-to-end: I don't just train models — I build the robust full-stack architectures required to integrate them into real-world industrial environments. Whether it's researching vision-based anomaly detection using contrastive learning or engineering digital automation platforms, I thrive on turning complex data into actionable, high-impact systems. I'm driven by continuous learning and building systems that are not only functional but also scalable and intelligent.",
  },
];

// ─── RAG Retrieval Engine ───────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "to", "of", "in", "for",
  "on", "with", "at", "by", "from", "as", "into", "through", "during",
  "before", "after", "above", "below", "between", "out", "off", "over",
  "under", "again", "further", "then", "once", "here", "there", "when",
  "where", "why", "how", "all", "each", "every", "both", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own",
  "same", "so", "than", "too", "very", "just", "because", "but", "and",
  "or", "if", "while", "about", "up", "it", "its", "he", "she", "they",
  "them", "this", "that", "these", "those", "am", "me", "my", "we", "our",
  "you", "your", "him", "her", "his", "what", "which", "whom",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#.]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function retrieveChunks(query: string, topK = 3): KnowledgeChunk[] {
  const queryTokens = tokenize(query);
  const queryLower = query.toLowerCase().trim();

  // Intent detection: boost specific categories based on query patterns
  let categoryBoost = "";
  if (/who\s+(are|is)|about\s+(you|yourself)|introduce|tell\s+me\s+about\s+(you|yourself)|background/i.test(queryLower)) {
    categoryBoost = "bio";
  } else if (/contact|email|phone|reach|hire|connect/i.test(queryLower)) {
    categoryBoost = "contact";
  } else if (/education|university|degree|school|study|cgpa|gpa|grade|mekelle/i.test(queryLower)) {
    categoryBoost = "education";
  } else if (/experience|work\s+(at|for|experience)|job|intern|company|role/i.test(queryLower)) {
    categoryBoost = "experience";
  } else if (/certif|credential|course|coursera|stanford|udacity/i.test(queryLower)) {
    categoryBoost = "certifications";
  } else if (/available|open\s+to|looking\s+for|freelance|remote|full.time|opportunity|position/i.test(queryLower)) {
    categoryBoost = "availability";
  } else if (/language|speak|english|amharic|tigrinya/i.test(queryLower)) {
    categoryBoost = "languages";
  } else if (/approach|methodology|process|end.to.end|philosophy|style|method/i.test(queryLower)) {
    categoryBoost = "bio";
  }

  const scored = knowledgeBase.map((chunk) => {
    let score = 0;

    // Category boost from intent detection
    if (categoryBoost && chunk.category === categoryBoost) {
      score += 25;
    }

    // Keyword matching (primary signal)
    for (const kw of chunk.keywords) {
      const kwLower = kw.toLowerCase();
      // Check if entire keyword phrase appears in query
      if (queryLower.includes(kwLower)) {
        score += 15;
      } else {
        // Token-level matching
        const kwTokens = tokenize(kw);
        for (const qt of queryTokens) {
          for (const kt of kwTokens) {
            if (kt === qt) score += 10;
            else if (qt.length > 3 && (kt.includes(qt) || qt.includes(kt))) score += 4;
          }
        }
      }
    }

    // Content matching (secondary signal, normalized by chunk length)
    if (queryTokens.length > 0) {
      const contentTokens = tokenize(chunk.content);
      let contentMatches = 0;
      for (const qt of queryTokens) {
        if (qt.length < 3) continue; // Skip very short tokens for content matching
        for (const ct of contentTokens) {
          if (ct === qt) { contentMatches += 2; break; } // Only count first match per query token
          else if (ct.includes(qt) && qt.length > 4) { contentMatches += 1; break; }
        }
      }
      // Normalize: don't let long chunks dominate
      score += Math.min(contentMatches, 6);
    }

    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}

// ─── Response Generation ────────────────────────────────────────────────────────

function generateResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|howdy|sup|greetings|good (morning|afternoon|evening))/.test(q)) {
    return "Hey there! 👋 I'm Getachew's portfolio assistant. Ask me anything about my skills, projects, experience, education, or background — I'll pull the answer straight from my resume!";
  }

  // Thanks
  if (/^(thanks|thank you|thx|ty|appreciate)/.test(q)) {
    return "You're welcome! Feel free to ask anything else, or scroll down to the Contact section to get in touch with me directly. 😊";
  }

  // Retrieve relevant chunks
  const chunks = retrieveChunks(query);

  if (chunks.length === 0) {
    return "I can answer questions about my **skills**, **projects**, **experience**, **education**, **certifications**, or **contact info**. Could you rephrase your question?";
  }

  // Build context-grounded response
  const context = chunks.map((c) => c.content).join("\n\n");
  const categories = [...new Set(chunks.map((c) => c.category))];

  // Format response based on retrieved categories
  if (categories.includes("projects") && chunks.length > 1) {
    return formatProjectResponse(chunks);
  }

  if (categories.includes("skills") && chunks.length >= 2) {
    return formatSkillsResponse(chunks);
  }

  // Default: use the top chunk's content with a conversational wrapper
  const topChunk = chunks[0];
  let response = topChunk.content;

  // Add a follow-up suggestion
  const suggestions = getSuggestions(categories);
  if (suggestions) {
    response += `\n\n💡 *You can also ask about ${suggestions}.*`;
  }

  return response;
}

function formatProjectResponse(chunks: KnowledgeChunk[]): string {
  const projectChunks = chunks.filter((c) => c.category === "projects");
  if (projectChunks.length === 0) return chunks[0].content;

  let response = "";
  for (const chunk of projectChunks) {
    response += chunk.content + "\n\n";
  }
  return response.trim();
}

function formatSkillsResponse(chunks: KnowledgeChunk[]): string {
  return chunks.map((c) => c.content).join("\n\n");
}

function getSuggestions(currentCategories: string[]): string {
  const allCategories: Record<string, string> = {
    bio: "my background",
    skills: "my technical skills",
    experience: "my work experience",
    projects: "my projects",
    education: "my education",
    certifications: "my certifications",
    contact: "how to contact me",
  };

  const available = Object.entries(allCategories)
    .filter(([key]) => !currentCategories.includes(key))
    .slice(0, 2)
    .map(([, val]) => val);

  return available.join(" or ");
}

// ─── Suggested Questions ────────────────────────────────────────────────────────

const suggestedQuestions = [
  "Who are you?",
  "What are your AI/ML skills?",
  "Tell me about your projects",
  "What's your work experience?",
  "How can I contact you?",
  "What's your education?",
];

// ─── Chat Message Type ──────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Component ───────────────────────────────────────��──────────────────────────

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm Getachew — welcome to my portfolio! Ask me anything about my **skills**, **projects**, **experience**, or **background**. I use RAG (Retrieval-Augmented Generation) to pull the most relevant answers from my resume.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate retrieval + generation delay
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = generateResponse(msg);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-like bold rendering
  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-emerald-400" style={{ fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="text-slate-400">
            {part.slice(1, -1)}
          </em>
        );
      }
      // Handle newlines
      return part.split("\n").map((line, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <br />}
          {line}
        </span>
      ));
    });
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 flex items-center justify-center cursor-pointer transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-800/80 backdrop-blur-sm px-5 py-4 flex items-center justify-between border-b border-slate-700/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>RAG Assistant</h3>
                  <p className="text-emerald-400 flex items-center gap-1" style={{ fontSize: "11px" }}>
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Powered by resume knowledge base
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-emerald-500 text-white rounded-br-md"
                        : "bg-slate-800/70 text-slate-200 rounded-bl-md border border-slate-700/40"
                    }`}
                    style={{ fontSize: "13px", lineHeight: 1.65 }}
                  >
                    {renderContent(msg.content)}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="bg-slate-800/70 border border-slate-700/40 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions (only show when few messages) */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 shrink-0">
                <div className="flex items-center gap-1.5 mb-2">
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-500" style={{ fontSize: "11px", fontWeight: 500 }}>Suggested questions</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="bg-slate-800/60 border border-slate-700/40 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                      style={{ fontSize: "11.5px", fontWeight: 500 }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-700/50 shrink-0">
              <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-2 focus-within:border-emerald-500/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects, experience..."
                  className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
                  style={{ fontSize: "13px" }}
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-500 text-white flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-center text-slate-600 mt-2" style={{ fontSize: "10px" }}>
                RAG-powered · Retrieves from 20+ knowledge chunks
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}