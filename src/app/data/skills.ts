export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Machine Learning" },
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "RAG (Retrieval-Augmented Gen)" },
      { name: "AI Agents" },
      { name: "LangChain" },
      { name: "Computer Vision" },
      { name: "Natural Language Processing (NLP)" },
      { name: "Speech Recognition" },
      { name: "Recommendation Systems" },
      { name: "Chatbots & Conversational AI" }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Nest.js" },
      { name: "Python" },
      { name: "TypeScript" }
    ]
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML & CSS" }
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Google Cloud" },
      { name: "Azure" }
    ]
  },
  {
    title: "Databases & Caching",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "MySQL" }
    ]
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Linux" },
      { name: "Figma" }
    ]
  }
];
