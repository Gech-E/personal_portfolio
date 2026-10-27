/**
 * Public GitHub projects curated for the portfolio.
 * Excludes private and empty repositories. Use real source links only;
 * leave liveUrl unset unless the project publishes a demo URL.
 */
export type ProjectCategory = "AI & ML" | "Full Stack" | "AI Products" | "EdTech" | "HealthTech" | "Other";
export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  desc: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projectCategories: ProjectCategory[] = ["AI & ML","Full Stack","AI Products","EdTech","HealthTech","Other"];

const projects: Project[] = [
  {
    "id": "nexus-learnai",
    "title": "Nexus LearnAI",
    "category": "EdTech",
    "desc": "Offline-aware EdTech portfolio project for courses, assessments, progress tracking and AI-assisted learning; advanced features remain in development.",
    "tags": [
      "Next.js",
      "FastAPI",
      "PostgreSQL"
    ],
    "githubUrl": "https://github.com/Gech-E/NexusAI",
    "liveUrl": "https://nexus-ai-omega-ten.vercel.app/",
    "featured": true
  },
  {
    "id": "industrial-anomaly",
    "title": "Industrial Anomaly Detection",
    "category": "AI & ML",
    "desc": "Computer vision project using PatchCore-style feature extraction and anomaly heatmaps for industrial inspection.",
    "tags": [
      "Python",
      "PyTorch",
      "Computer Vision"
    ],
    "githubUrl": "https://github.com/Gech-E/Industrial-anamoly-detection",
    "featured": true
  },
  {
    "id": "devtrack",
    "title": "DevTrack",
    "category": "Full Stack",
    "desc": "Developer workspace for projects, tasks, and learning goals with a Next.js frontend and NestJS API.",
    "tags": [
      "Next.js",
      "NestJS",
      "Prisma"
    ],
    "githubUrl": "https://github.com/Gech-E/DevTrack",
    "featured": true
  },
  {
    "id": "vendor-recommendation",
    "title": "Vendor Recommendation System",
    "category": "AI & ML",
    "desc": "Hybrid recommendation approach combining collaborative and content-based filtering for vendor and product matching.",
    "tags": [
      "Python",
      "scikit-learn",
      "FastAPI"
    ],
    "githubUrl": "https://github.com/Gech-E/Vendor_recommendation_system",
    "featured": true
  },
  {
    "id": "portfolio-rag",
    "title": "Portfolio & RAG Assistant",
    "category": "Full Stack",
    "desc": "Personal portfolio with a FastAPI-powered assistant that retrieves from a curated knowledge base.",
    "tags": [
      "React",
      "TypeScript",
      "FastAPI",
      "RAG"
    ],
    "githubUrl": "https://github.com/Gech-E/personal_portfolio",
    "liveUrl": "https://getachewekubay.vercel.app/",
    "featured": true
  },
  {
    "id": "supportpilot",
    "title": "SupportPilot",
    "category": "AI Products",
    "desc": "AI customer-support SaaS prototype with tenant-aware authentication and workspaces; document ingestion and RAG features are on the roadmap.",
    "tags": [
      "Python",
      "FastAPI",
      "PostgreSQL"
    ],
    "githubUrl": "https://github.com/Gech-E/SupportPilot",
    "featured": false
  },
  {
    "id": "portfolioai",
    "title": "PortfolioAI",
    "category": "AI Products",
    "desc": "AI portfolio-builder project combining a Next.js app, NestJS API and FastAPI AI service; work in progress.",
    "tags": [
      "Next.js",
      "NestJS",
      "FastAPI"
    ],
    "githubUrl": "https://github.com/Gech-E/portfolioAi",
    "featured": false
  },
  {
    "id": "mu-innovation-hub",
    "title": "MU Innovation Hub",
    "category": "AI Products",
    "desc": "University startup-incubation platform for idea evaluation, mentoring, matchmaking, and progress tracking.",
    "tags": [
      "Next.js",
      "FastAPI",
      "PostgreSQL"
    ],
    "githubUrl": "https://github.com/Gech-E/AI-POWERED-INCUBATION-CENTER",
    "liveUrl": "https://ai-powered-incubation-center.vercel.app",
    "featured": false
  },
  {
    "id": "nexusbooks",
    "title": "NexusBooks",
    "category": "Full Stack",
    "desc": "Bookstore application exploring role-based access, backend APIs, caching and containerized deployment.",
    "tags": [
      "Next.js",
      "FastAPI",
      "Redis"
    ],
    "githubUrl": "https://github.com/Gech-E/BOOKSTORE",
    "featured": false
  },
  {
    "id": "hire-ai",
    "title": "Hire.ai",
    "category": "AI Products",
    "desc": "Recruitment platform exploring job search, candidate assessments and recruiter workflows.",
    "tags": [
      "Next.js",
      "FastAPI",
      "PostgreSQL"
    ],
    "githubUrl": "https://github.com/Gech-E/hire.ai",
    "featured": false
  },
  {
    "id": "jobmatch-ai",
    "title": "JobMatch AI",
    "category": "AI Products",
    "desc": "Job matching and candidate dashboard prototype with skills-based matching UI.",
    "tags": [
      "Next.js",
      "React",
      "JavaScript"
    ],
    "githubUrl": "https://github.com/Gech-E/JOBMATCH-AI",
    "featured": false
  },
  {
    "id": "skinvision",
    "title": "SkinVision AI",
    "category": "HealthTech",
    "desc": "Computer vision skin-image classification app with a React interface and FastAPI inference backend; research prototype, not a diagnostic tool.",
    "tags": [
      "Python",
      "PyTorch",
      "React"
    ],
    "githubUrl": "https://github.com/Gech-E/skinvision-ai",
    "featured": false
  }
];

export default projects;
