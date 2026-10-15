/**
 * ============================================================
 * BLOG POSTS DATA
 * ============================================================
 */

export type BlogCategory = "AI/ML" | "SWE" | "Career" | "Tutorial";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  date: string;
  readTime: string;
  featured?: boolean;
  url: string; // Links to external blog post
}

const blogPosts: BlogPost[] = [
  {
    id: "rag-pipelines",
    title: "Building Production-Ready RAG Pipelines: Lessons from the Trenches",
    excerpt: "After deploying RAG systems for healthcare and recruitment, here are the key architectural decisions that made or broke performance.",
    category: "AI/ML",
    tags: ["RAG", "LLM", "LangChain", "Production ML"],
    date: "Apr 10, 2026",
    readTime: "6 min read",
    featured: true,
    url: "#" // Link placeholder
  },
  {
    id: "fastapi-vs-express",
    title: "Why I Chose FastAPI Over Express for ML-Powered Backends",
    excerpt: "A practical comparison of building ML-serving backends with FastAPI vs Express.js — covering type safety, async performance, and ML library integration.",
    category: "SWE",
    tags: ["FastAPI", "Python", "Backend", "System Design"],
    date: "Mar 28, 2026",
    readTime: "5 min read",
    url: "#"
  },
  {
    id: "vit-vs-cnn",
    title: "Vision Transformers vs CNNs: When to Use What in 2026",
    excerpt: "Breaking down when Vision Transformers (ViT) outperform traditional CNNs, and the surprising cases where CNNs still win.",
    category: "AI/ML",
    tags: ["Computer Vision", "ViT", "CNN", "Deep Learning"],
    date: "Mar 15, 2026",
    readTime: "7 min read",
    url: "#"
  },
  {
    id: "cgpa-to-cto",
    title: "From 3.93 CGPA to CTO: What University Won't Teach You About Building Startups",
    excerpt: "Lessons from co-founding Gemed Solutions while pursuing my engineering degree — balancing academics, leadership, and shipping real products.",
    category: "Career",
    tags: ["Startup", "Leadership", "Career Advice", "Entrepreneurship"],
    date: "Feb 20, 2026",
    readTime: "5 min read",
    url: "#"
  },
  {
    id: "agentic-ai-job-matching",
    title: "Agentic AI in Practice: Building an Autonomous Job Matching System",
    excerpt: "How I designed an Agentic AI pipeline that autonomously screens resumes, matches candidates, and ranks results.",
    category: "AI/ML",
    tags: ["Agentic AI", "LLM", "NLP", "Automation"],
    date: "Feb 5, 2026",
    readTime: "8 min read",
    featured: true,
    url: "#"
  },
  {
    id: "docker-ml-deployment",
    title: "Deploying ML Models with Docker: A No-Nonsense Guide",
    excerpt: "Step-by-step walkthrough of containerizing a PyTorch model with FastAPI, optimizing image size, and deploying to Railway.",
    category: "Tutorial",
    tags: ["Docker", "MLOps", "Deployment", "FastAPI"],
    date: "Jan 18, 2026",
    readTime: "6 min read",
    url: "#"
  },
];

export default blogPosts;

import { Brain, Code, Layers, Cpu, type LucideIcon } from "lucide-react";

export const categoryConfig: {
  label: BlogCategory | "All";
  icon?: string;
  color?: string;
}[] = [
  { label: "All" },
  { label: "AI/ML", icon: "Brain", color: "#3b82f6" },
  { label: "SWE", icon: "Code", color: "#06b6d4" },
  { label: "Career", icon: "Layers", color: "#8b5cf6" },
  { label: "Tutorial", icon: "Cpu", color: "#10b981" },
];

export const blogIconMap: Record<string, LucideIcon> = {
  Brain,
  Code,
  Layers,
  Cpu,
};

export function getCategoryColor(category: string): string {
  const entry = categoryConfig.find((c) => c.label === category);
  return entry?.color || "#3b82f6";
}

export function getCategoryIcon(category: string): LucideIcon | null {
  const entry = categoryConfig.find((c) => c.label === category);
  if (!entry?.icon) return null;
  return blogIconMap[entry.icon] || null;
}
