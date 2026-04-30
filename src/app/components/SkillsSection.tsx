import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { portfolioAPI, type SkillFromAPI } from "@/lib/api";

// Hardcoded fallback
const fallbackSkillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "C++", level: 82 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 93 },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "Flask", level: 82 },
      { name: "PostgreSQL", level: 85 },
      { name: "MLOps", level: 80 },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "PyTorch", level: 88 },
      { name: "TensorFlow", level: 85 },
      { name: "LangChain", level: 86 },
      { name: "Hugging Face", level: 84 },
      { name: "MULTI AGENT RAG ", level: 80 },
      { name: "AI Agents", level: 82 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Git", level: 90 },
      { name: "System Architecture", level: 85 },
      { name: "Robotics & Automation", level: 78 },
    ],
  },
];

const coreDomains = [
  "Machine Learning", "Deep Learning", "Computer Vision", "NLP",
  "RAG Pipelines", "Agentic AI", "LLM Integration", "Full-Stack Web Apps",
  "Predictive Analytics", "Recommendation Systems", "Vision Transformers",
  "Contrastive Learning", "Robotics & Automation",
];

interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}

function groupSkills(apiSkills: SkillFromAPI[]): SkillCategory[] {
  const groups: Record<string, { name: string; level: number }[]> = {};
  for (const s of apiSkills) {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push({ name: s.name, level: s.level });
  }
  return Object.entries(groups).map(([title, skills]) => ({ title, skills }));
}

export function SkillsSection() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(fallbackSkillCategories);

  useEffect(() => {
    portfolioAPI
      .getSkills()
      .then((data) => {
        if (data.length > 0) {
          setSkillCategories(groupSkills(data));
        }
      })
      .catch((err) => {
        console.warn("Using fallback skills:", err.message);
      });
  }, []);

  return (
    <section id="skills" className="py-20" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-emerald-400 mb-2" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>SKILLS & EXPERTISE</p>
          <h2 className="text-white mb-4" style={{ fontSize: "32px", fontWeight: 700 }}>Technical Proficiency</h2>
          <p className="text-slate-400 max-w-2xl mb-12" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            A comprehensive toolkit spanning full-stack development, AI/ML, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Core domains tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2.5 mb-12"
        >
          {coreDomains.map((d) => (
            <span key={d} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full" style={{ fontSize: "13px", fontWeight: 500 }}>
              {d}
            </span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-6"
            >
              <h3 className="text-white mb-5" style={{ fontSize: "16px", fontWeight: 600 }}>{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className="bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-md border border-slate-600/50"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}