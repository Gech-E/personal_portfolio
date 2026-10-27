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
    "desc": "Offline-aware learning platform exploring course delivery, assessments, progress tracking, and AI-assisted study tools.",
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
    "id": "nexus-incubation",
    "title": "Nexus AI Incubation",
    "category": "AI Products",
    "desc": "Startup incubation concept with idea evaluation, AI mentorship, matching, and progress tracking.",
    "tags": [
      "Next.js",
      "TypeScript",
      "PostgreSQL"
    ],
    "githubUrl": "https://github.com/Gech-E/NEXUS-AI",
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
    "desc": "Multi-tenant AI customer support platform; foundation includes workspaces, authentication and database tenant isolation.",
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
    "desc": "AI-powered portfolio and career tooling with a web app, API, and dedicated AI service.",
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
    "desc": "AI-powered university startup incubation with idea evaluation, mentoring and progress dashboards.",
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
    "desc": "Computer vision application exploring skin image classification and a web-based inference interface.",
    "tags": [
      "Python",
      "PyTorch",
      "React"
    ],
    "githubUrl": "https://github.com/Gech-E/skinvision-ai",
    "featured": false
  },
  {
    "id": "careconnect",
    "title": "CareConnect",
    "category": "HealthTech",
    "desc": "Telehealth software project focused on patient access, care communication and health record workflows.",
    "tags": [
      "Python",
      "HealthTech"
    ],
    "githubUrl": "https://github.com/Gech-E/CareConnect-",
    "featured": false
  },
  {
    "id": "ecommerce",
    "title": "Multi-vendor Ecommerce",
    "category": "Full Stack",
    "desc": "React-based multi-vendor shopping application and frontend experiment.",
    "tags": [
      "React",
      "JavaScript"
    ],
    "githubUrl": "https://github.com/Gech-E/Ecommerce",
    "featured": false
  },
  {
    "id": "underage-savings",
    "title": "Underage Saving Bank System",
    "category": "Other",
    "desc": "Educational banking project about savings goals and financial literacy for younger users.",
    "tags": [
      "Java",
      "Finance",
      "Education"
    ],
    "githubUrl": "https://github.com/Gech-E/Underage-Saving-Bank-System",
    "featured": false
  },
  {
    "id": "earlier-portfolio",
    "title": "Earlier Portfolio",
    "category": "Full Stack",
    "desc": "An earlier iteration of my developer portfolio and project showcase.",
    "tags": [
      "React",
      "JavaScript",
      "FastAPI"
    ],
    "githubUrl": "https://github.com/Gech-E/portfolio",
    "featured": false
  },
  {
    "id": "python-experiments",
    "title": "Personal Projects",
    "category": "Other",
    "desc": "Collection of earlier Python experiments and learning projects.",
    "tags": [
      "Python"
    ],
    "githubUrl": "https://github.com/Gech-E/personal_projects",
    "featured": false
  }
];

export default projects;
