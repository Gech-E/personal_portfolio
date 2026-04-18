import { motion } from "motion/react";

const skillCategories = [
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
      { name: "OpenCV", level: 80 },
      { name: "Vision Transformers", level: 82 },
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

export function SkillsSection() {
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
              <div className="space-y-4">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-slate-300" style={{ fontSize: "13px", fontWeight: 500 }}>{s.name}</span>
                      <span className="text-slate-500" style={{ fontSize: "12px" }}>{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundImage: "linear-gradient(90deg, #34d399, #3b82f6)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}