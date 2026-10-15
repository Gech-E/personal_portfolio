/**
 * ============================================================
 * PROJECTS DATA
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
  impact?: string;
  caseStudyUrl?: string;
}

const projects: Project[] = [
  {
    id: "vendor-recommendation",
    title: "Vendor Recommendation System",
    desc: "ML-driven vendor matching using matrix factorization & ensemble models with a React frontend and FastAPI backend.",
    impact: "Automated vendor selection reduced procurement time by 40%.",
    tags: ["Python", "FastAPI", "React", "Scikit-learn", "PostgreSQL"],
    icon: "Brain",
    color: "#3b82f6", // Blue accent
    date: "2026-03",
    featured: true,
    githubUrl: "#"
  },
  {
    id: "ai-ecommerce",
    title: "AI-Powered E-commerce Platform",
    desc: "Full-stack e-commerce app with collaborative filtering recommendations. Built with Next.js + FastAPI.",
    impact: "Increased user engagement by 25% through real-time product suggestions.",
    tags: ["Next.js", "FastAPI", "TensorFlow", "PostgreSQL", "Vercel"],
    icon: "ShoppingCart",
    color: "#60a5fa", // Light blue
    date: "2026-02",
    featured: true,
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: "clinical-decision-support",
    title: "Clinical Decision Support System",
    desc: "NLP & deep learning model analyzing patient symptoms with RAG-based medical knowledge retrieval.",
    impact: "Provided evidence-backed clinical recommendations with 92% accuracy.",
    tags: ["Python", "LangChain", "RAG", "PyTorch", "FastAPI"],
    icon: "Stethoscope",
    color: "#3b82f6",
    date: "2026-01",
    featured: true,
    githubUrl: "#"
  },
  {
    id: "skin-cancer-classification",
    title: "Skin Cancer Classification",
    desc: "CNN-based dermoscopy image classifier achieving 94% accuracy. Real-time web deployment with React frontend and FastAPI inference server.",
    tags: ["PyTorch", "OpenCV", "React", "FastAPI", "Docker"],
    icon: "Eye",
    color: "#06b6d4",
    liveUrl: "https://skinvision-ai1.vercel.app/",
    date: "2025-12",
  },
  {
    id: "anomaly-detection",
    title: "Vision-Based Anomaly Detection",
    desc: "Unsupervised industrial/security video monitoring using contrastive learning. Next.js dashboard for real-time alerts and analytics.",
    tags: ["PyTorch", "OpenCV", "Next.js", "Contrastive Learning"],
    icon: "AlertTriangle",
    color: "#3b82f6",
    date: "2025-11",
  },
  {
    id: "job-matching",
    title: "AI-Powered Job Matching Platform",
    desc: "NLP + vector embeddings (LLM + RAG) matching candidates to optimal jobs. Agentic AI features for automated resume screening and ranking.",
    tags: ["LangChain", "Hugging Face", "Next.js", "Agentic AI", "RAG"],
    icon: "Search",
    color: "#60a5fa",
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
];

export default projects;

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
