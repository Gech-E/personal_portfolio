import { ExternalLink, Github, Brain, ShoppingCart, Stethoscope, Eye, Search, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const projects = [
  {
    title: "Vendor Recommendation System",
    desc: "ML-driven vendor matching using matrix factorization & ensemble models with a React frontend and FastAPI backend. Automated vendor selection reduced procurement time by 40%.",
    tags: ["Python", "FastAPI", "React", "Scikit-learn", "PostgreSQL"],
    icon: Brain,
    color: "#34d399",
  },
  {
    title: "AI-Powered E-commerce Platform",
    desc: "Full-stack e-commerce app with collaborative filtering recommendations. Built with Next.js + FastAPI, deployed on Vercel with real-time product suggestions.",
    tags: ["Next.js", "FastAPI", "TensorFlow", "PostgreSQL", "Vercel"],
    icon: ShoppingCart,
    color: "#3b82f6",
  },
  {
    title: "Clinical Decision Support System",
    desc: "NLP & deep learning model analyzing patient symptoms with RAG-based medical knowledge retrieval for evidence-backed clinical recommendations.",
    tags: ["Python", "LangChain", "RAG", "PyTorch", "FastAPI"],
    icon: Stethoscope,
    color: "#f472b6",
  },
  {
    title: "Skin Cancer Classification",
    desc: "CNN-based dermoscopy image classifier achieving 94% accuracy. Real-time web deployment with React frontend and FastAPI inference server.",
    tags: ["PyTorch", "OpenCV", "React", "FastAPI", "Docker"],
    icon: Eye,
    color: "#fbbf24",
  },
  {
    title: "Vision-Based Anomaly Detection",
    desc: "Unsupervised industrial/security video monitoring using contrastive learning. Next.js dashboard for real-time alerts and analytics.",
    tags: ["PyTorch", "OpenCV", "Next.js", "Contrastive Learning"],
    icon: AlertTriangle,
    color: "#f97316",
  },
  {
    title: "AI-Powered Job Matching Platform",
    desc: "NLP + vector embeddings (LLM + RAG) matching candidates to optimal jobs. Agentic AI features for automated resume screening and ranking.",
    tags: ["LangChain", "Hugging Face", "Next.js", "Agentic AI", "RAG"],
    icon: Search,
    color: "#8b5cf6",
  },
];

const filters = ["All", "AI/ML", "Full-Stack", "Computer Vision"];

function getFilter(tags: string[]): string[] {
  const cats: string[] = ["All"];
  const ml = ["Scikit-learn", "TensorFlow", "PyTorch", "LangChain", "RAG", "Hugging Face", "Agentic AI", "Contrastive Learning"];
  const cv = ["OpenCV"];
  const fs = ["Next.js", "React", "FastAPI", "PostgreSQL", "Vercel", "Docker"];
  if (tags.some((t) => ml.includes(t))) cats.push("AI/ML");
  if (tags.some((t) => cv.includes(t))) cats.push("Computer Vision");
  if (tags.some((t) => fs.includes(t))) cats.push("Full-Stack");
  return cats;
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => getFilter(p.tags).includes(activeFilter));

  return (
    <section id="projects" className="py-20" style={{ background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-emerald-400 mb-2" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>PORTFOLIO</p>
          <h2 className="text-white mb-4" style={{ fontSize: "32px", fontWeight: 700 }}>Featured Projects</h2>
          <p className="text-slate-400 max-w-2xl mb-8" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            Production-grade AI and full-stack solutions solving real problems in healthcare, e-commerce, and beyond.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeFilter === f
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50"
              }`}
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 hover:border-emerald-500/40 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}15` }}>
                  <p.icon className="w-5.5 h-5.5" style={{ color: p.color }} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer">
                    <Github className="w-4 h-4" />
                  </span>
                  <span className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <h3 className="text-white mb-2" style={{ fontSize: "16px", fontWeight: 600 }}>{p.title}</h3>
              <p className="text-slate-400 mb-4" style={{ fontSize: "13px", lineHeight: 1.65 }}>{p.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="bg-slate-700/50 text-slate-300 px-2.5 py-0.5 rounded-md" style={{ fontSize: "11px", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
