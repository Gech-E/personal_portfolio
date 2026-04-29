/**
 * ============================================================
 * PROJECTS DATA
 * ============================================================
 * To add a new project, simply append an object to the array below.
 *
 * Required fields:
 *   - id          Unique string identifier (e.g. "my-new-project")
 *   - title       Project name
 *   - desc        One or two sentence description
 *   - tags        Array of tech tags (also used for filtering)
 *   - icon        Icon name from lucide-react (must match iconMap below)
 *   - color       Hex color for the icon badge
 *
 * Optional fields:
 *   - liveUrl     Link to live demo
 *   - githubUrl   Link to GitHub repo
 *   - featured    Set true to visually highlight
 *   - date        Date string for sorting (e.g. "2026-04")
 *
 * After adding a project, if you used a new icon name,
 * add it to the `iconMap` at the bottom of this file.
 * ============================================================
 */

export interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  icon: string;
  color: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  date?: string;
}

const projects: Project[] = [
  {
    id: "vendor-recommendation",
    title: "Vendor Recommendation System",
    desc: "ML-driven vendor matching using matrix factorization & ensemble models with a React frontend and FastAPI backend. Automated vendor selection reduced procurement time by 40%.",
    tags: ["Python", "FastAPI", "React", "Scikit-learn", "PostgreSQL"],
    icon: "Brain",
    color: "#34d399",
    date: "2026-03",
  },
  {
    id: "ai-ecommerce",
    title: "AI-Powered E-commerce Platform",
    desc: "Full-stack e-commerce app with collaborative filtering recommendations. Built with Next.js + FastAPI, deployed on Vercel with real-time product suggestions.",
    tags: ["Next.js", "FastAPI", "TensorFlow", "PostgreSQL", "Vercel"],
    icon: "ShoppingCart",
    color: "#3b82f6",
    date: "2026-02",
  },
  {
    id: "clinical-decision-support",
    title: "Clinical Decision Support System",
    desc: "NLP & deep learning model analyzing patient symptoms with RAG-based medical knowledge retrieval for evidence-backed clinical recommendations.",
    tags: ["Python", "LangChain", "RAG", "PyTorch", "FastAPI"],
    icon: "Stethoscope",
    color: "#f472b6",
    date: "2026-01",
  },
  {
    id: "skin-cancer-classification",
    title: "Skin Cancer Classification",
    desc: "CNN-based dermoscopy image classifier achieving 94% accuracy. Real-time web deployment with React frontend and FastAPI inference server.",
    tags: ["PyTorch", "OpenCV", "React", "FastAPI", "Docker"],
    icon: "Eye",
    color: "#fbbf24",
    liveUrl: "https://skinvision-ai1.vercel.app/",
    date: "2025-12",
  },
  {
    id: "anomaly-detection",
    title: "Vision-Based Anomaly Detection",
    desc: "Unsupervised industrial/security video monitoring using contrastive learning. Next.js dashboard for real-time alerts and analytics.",
    tags: ["PyTorch", "OpenCV", "Next.js", "Contrastive Learning"],
    icon: "AlertTriangle",
    color: "#f97316",
    date: "2025-11",
  },
  {
    id: "job-matching",
    title: "AI-Powered Job Matching Platform",
    desc: "NLP + vector embeddings (LLM + RAG) matching candidates to optimal jobs. Agentic AI features for automated resume screening and ranking.",
    tags: ["LangChain", "Hugging Face", "Next.js", "Agentic AI", "RAG"],
    icon: "Search",
    color: "#8b5cf6",
    date: "2025-10",
  },
  {
    id: "incubation-center",
    title: "AI-Powered Incubation Center",
    desc: "Intelligent incubation platform leveraging AI to streamline startup mentorship, resource allocation, and progress tracking for emerging ventures.",
    tags: ["Next.js", "AI", "React", "Full-Stack"],
    icon: "Lightbulb",
    color: "#06b6d4",
    liveUrl: "https://ai-powered-incubation-center-msuq.vercel.app/",
    date: "2025-09",
  },

  // -------------------------------------------------------
  // ADD NEW PROJECTS BELOW THIS LINE
  // -------------------------------------------------------
  // {
  //   id: "my-new-project",
  //   title: "My New Project",
  //   desc: "A brief description of the project.",
  //   tags: ["React", "Python", "LLM"],
  //   icon: "Rocket",          // must exist in iconMap
  //   color: "#10b981",
  //   githubUrl: "https://github.com/...",
  //   liveUrl: "https://...",
  //   featured: true,
  //   date: "2026-05",
  // },
];

export default projects;

// ============================================================
// ICON MAP — maps string names to lucide-react components.
// When you use a new icon name above, import it here and add
// it to the map so the component can resolve it.
// ============================================================
import {
  Brain,
  ShoppingCart,
  Stethoscope,
  Eye,
  AlertTriangle,
  Search,
  Lightbulb,
  Rocket,
  Bot,
  Layers,
  Globe,
  Cpu,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Brain,
  ShoppingCart,
  Stethoscope,
  Eye,
  AlertTriangle,
  Search,
  Lightbulb,
  Rocket,
  Bot,
  Layers,
  Globe,
  Cpu,
};

// ============================================================
// FILTER CONFIG — controls which filter tabs appear and which
// tags map to each filter. To add a new filter category, add
// an entry here with the tags that belong to it.
// ============================================================
export const filterConfig: { label: string; tags: string[] }[] = [
  { label: "AI/ML", tags: ["Scikit-learn", "TensorFlow", "PyTorch", "LangChain", "RAG", "Hugging Face", "Agentic AI", "Contrastive Learning", "AI", "LLM"] },
  { label: "Computer Vision", tags: ["OpenCV", "Vision Transformer", "YOLO"] },
  { label: "Full-Stack", tags: ["Next.js", "React", "FastAPI", "PostgreSQL", "Vercel", "Docker", "Full-Stack"] },
];

export function getProjectFilters(tags: string[]): string[] {
  const cats: string[] = ["All"];
  for (const f of filterConfig) {
    if (tags.some((t) => f.tags.includes(t))) cats.push(f.label);
  }
  return cats;
}
