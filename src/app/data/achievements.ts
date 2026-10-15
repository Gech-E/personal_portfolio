export interface Achievement {
  id: string;
  title: string;
  metric: string;
  description: string;
  category: "academic" | "professional" | "project";
}

export const achievementsData: Achievement[] = [
  {
    id: "cgpa",
    title: "Great Distinction Graduate",
    metric: "3.93",
    description: "CGPA in Electrical and Computer Engineering from Mekelle University.",
    category: "academic"
  },
  {
    id: "projects",
    title: "Successful Projects",
    metric: "15+",
    description: "Shipped intelligent software solutions ranging from RAG pipelines to E-commerce platforms.",
    category: "project"
  },
  {
    id: "models",
    title: "AI Models Deployed",
    metric: "8+",
    description: "Productionized computer vision and NLP models using FastAPI and Docker.",
    category: "professional"
  },
  {
    id: "community",
    title: "Developers Mentored",
    metric: "500+",
    description: "Impacted students through workshops and hackathons as a Tech Club Coordinator.",
    category: "professional"
  }
];
