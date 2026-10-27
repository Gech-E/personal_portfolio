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
    id: "march-ai",
    role: "Lead Machine Learning Engineer",
    company: "MARCH AI (Ayder Referral Hospital)",
    startDate: "Feb 2026",
    endDate: "May 2026",
    location: "Mekelle, Ethiopia",
    description: [
      "Worked on machine learning research for clinical decision-support workflows in collaboration with healthcare professionals.",
      "Developed and explored interpretable biomedical ML pipelines, with attention to data preparation and model evaluation."
    ],
    technologies: ["Python", "Machine Learning", "Healthcare AI", "Model Interpretability"]
  },
  {
    id: "qubos-llc",
    role: "IT Support Specialist",
    company: "QUBOS LLC",
    startDate: "Jun 2026",
    endDate: "Sep 2026",
    location: "Remote",
    description: [
      "Troubleshot software, hardware, and system issues and supported users remotely.",
      "Explained technical resolutions clearly to nontechnical users and helped maintain reliable day-to-day IT workflows."
    ],
    technologies: ["IT Support", "Troubleshooting", "Technical Support", "Remote Support"]
  },
  {
    id: "memi-trading",
    role: "AI/ML Intern",
    company: "Memi Trading PLC",
    startDate: "Jun 2025",
    endDate: "Oct 2025",
    location: "Addis Ababa, Ethiopia",
    description: [
      "Built a vendor recommendation system to support supplier matching and ranking with machine learning.",
      "Prepared procurement data, engineered relevant features, and developed recommendation logic with Python.",
      "Collaborated on API workflows, testing, iteration, and code reviews."
    ],
    technologies: ["Python", "scikit-learn", "FastAPI", "Recommendation Systems"]
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
