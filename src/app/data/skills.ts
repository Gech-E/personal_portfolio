import {
  SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiNestjs, SiFastapi,
  SiTensorflow, SiPytorch, SiScikitlearn,
  SiGooglecloud, SiDocker, SiKubernetes,
  SiPostgresql, SiMysql, SiMongodb, SiRedis,
  SiGit, SiGithub, SiFigma, SiLinux
} from 'react-icons/si';
import { VscVscode, VscAzure } from 'react-icons/vsc';
import { FaJava, FaAws } from 'react-icons/fa';
import {
  Brain,
  Bot,
  Eye,
  Mic,
  Workflow,
  Sparkles,
  MessageSquare,
  Cpu,
  Layers,
  Network
} from 'lucide-react';

export interface Skill {
  name: string;
  icon: any;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Machine Learning", icon: Brain },
      { name: "PyTorch", icon: SiPytorch },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "RAG (Retrieval-Augmented Gen)", icon: Network },
      { name: "AI Agents", icon: Bot },
      { name: "LangChain", icon: Workflow },
      { name: "Computer Vision", icon: Eye },
      { name: "Natural Language Processing (NLP)", icon: Layers },
      { name: "Speech Recognition", icon: Mic },
      { name: "Recommendation Systems", icon: Sparkles },
      { name: "Chatbots & Conversational AI", icon: MessageSquare }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Nest.js", icon: SiNestjs },
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript }
    ]
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML & CSS", icon: SiHtml5 }
    ]
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "Google Cloud", icon: SiGooglecloud },
      { name: "Azure", icon: VscAzure }
    ]
  },
  {
    title: "Databases & Caching",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "MySQL", icon: SiMysql }
    ]
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Linux", icon: SiLinux },
      { name: "Figma", icon: SiFigma }
    ]
  }
];
