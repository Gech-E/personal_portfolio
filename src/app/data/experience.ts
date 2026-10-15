export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies: string[];
}

export const experienceData: Experience[] = [
  {
    id: "memi-trading",
    role: "AI/ML Intern",
    company: "Memi Trading PLC",
    startDate: "Oct 2025",
    endDate: "Jan 2026",
    location: "Addis Ababa, Ethiopia",
    description: [
      "Developed a custom Vision-Based Anomaly Detection model leveraging Self-Supervised Contrastive Learning (SimCLR).",
      "Achieved a 95% true positive rate in defect identification without requiring extensive labeled datasets.",
      "Engineered an automated data pipeline using FastAPI and deployed the model endpoint."
    ],
    technologies: ["PyTorch", "OpenCV", "Python", "FastAPI", "React"]
  },
  {
    id: "gemed-solutions",
    role: "CTO & Co-Founder",
    company: "Gemed Solutions",
    startDate: "May 2024",
    endDate: "Aug 2025",
    location: "Mekelle, Ethiopia",
    description: [
      "Led the technical development of a digital agency focusing on custom web and mobile solutions.",
      "Architected scalable backends using Node.js and PostgreSQL and modernized legacy codebases.",
      "Managed a team of 5 developers to deliver a comprehensive e-commerce platform for local businesses."
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"]
  },
  {
    id: "born-to-win",
    role: "Program & Event Coordinator",
    company: "Born to Win Tech Club",
    startDate: "Sep 2022",
    endDate: "Jun 2024",
    location: "Mekelle University",
    description: [
      "Organized 12+ tech workshops and hackathons for 500+ students on AI, ML, and Web Development.",
      "Fostered a community of tech enthusiasts and mentored junior students in programming fundamentals."
    ],
    technologies: ["Leadership", "Event Management", "Public Speaking", "Mentoring"]
  }
];
