import { Briefcase, GraduationCap, Award } from "lucide-react";
import { motion } from "motion/react";

const experience = [
  {
    type: "work",
    role: "AI/ML Intern",
    org: "Memi Trading PLC",
    period: "Jun 2025 – Present",
    bullets: [
      "Designed and deployed 3 AI-powered applications using FastAPI + Next.js, reducing manual processing time by 65%.",
      "Integrated RAG-based medical knowledge retrieval into a clinical decision support system.",
    ],
  },
  {
    type: "work",
    role: "CTO & Co-Founder",
    org: "Gemed Solutions",
    period: "Dec 2025 – Present",
    bullets: [
      "Lead a team of 4 building an end-to-end AI incubation platform; secured 2 pilot clients in 3 months.",
      "Architected full-stack system (React + FastAPI + PostgreSQL + Docker) for 15+ startups.",
    ],
  },
  {
    type: "work",
    role: "Program & Event Coordinator",
    org: "Born to Win Tech Club",
    period: "Sep 2025 – Present",
    bullets: [
      "Organized 12 workshops on Generative AI and Agentic Systems, growing membership from 45 to 180+.",
    ],
  },
];

const education = {
  degree: "B.Sc. in Electrical & Computer Engineering",
  school: "Mekelle University",
  period: "Expected Graduation: July 2026",
  cgpa: "3.93 / 4.0",
  courses: "AI, Data Structures & Algorithms, Computer Networks, Computer Security, Software Engineering, Database Systems",
  achievements: "Top performer and honorable graduate of 2026; startup competition winner at Mekelle Incubation Center.",
};

const certifications = [
  { title: "Machine Learning Specialization", org: "Coursera & Stanford University", date: "March 2025" },
  { title: "Full-Stack Developer Certificate", org: "Udacity", date: "January 2025" },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-emerald-400 mb-2" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>EXPERIENCE & EDUCATION</p>
          <h2 className="text-white mb-12" style={{ fontSize: "32px", fontWeight: 700 }}>My Journey</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience timeline */}
          <div className="lg:col-span-2 space-y-0">
            <h3 className="text-white flex items-center gap-2 mb-6" style={{ fontSize: "18px", fontWeight: 600 }}>
              <Briefcase className="w-5 h-5 text-emerald-400" /> Work Experience
            </h3>
            <div className="relative border-l-2 border-slate-700 pl-6 space-y-8 ml-2">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-950" />
                  <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-2 justify-between mb-2">
                      <h4 className="text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{exp.role}</h4>
                      <span className="text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full" style={{ fontSize: "11px", fontWeight: 500 }}>{exp.period}</span>
                    </div>
                    <p className="text-slate-400 mb-3" style={{ fontSize: "13px", fontWeight: 500 }}>{exp.org}</p>
                    <ul className="space-y-1.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-slate-400 flex gap-2" style={{ fontSize: "13px", lineHeight: 1.65 }}>
                          <span className="text-emerald-400 mt-1.5 shrink-0">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education + Certs */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white flex items-center gap-2 mb-6" style={{ fontSize: "18px", fontWeight: 600 }}>
                <GraduationCap className="w-5 h-5 text-emerald-400" /> Education
              </h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5"
              >
                <h4 className="text-white mb-1" style={{ fontSize: "14px", fontWeight: 600 }}>{education.degree}</h4>
                <p className="text-emerald-400 mb-1" style={{ fontSize: "13px", fontWeight: 500 }}>{education.school}</p>
                <p className="text-slate-400 mb-3" style={{ fontSize: "12px" }}>{education.period}</p>
                <div className="bg-emerald-500/10 rounded-lg px-4 py-2 mb-3">
                  <span className="text-emerald-400" style={{ fontSize: "22px", fontWeight: 700 }}>{education.cgpa}</span>
                  <span className="text-slate-400 ml-2" style={{ fontSize: "12px" }}>CGPA</span>
                </div>
                <p className="text-slate-400 mb-2" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                  <span className="text-slate-300" style={{ fontWeight: 600 }}>Courses: </span>{education.courses}
                </p>
                <p className="text-slate-400" style={{ fontSize: "12px", lineHeight: 1.6 }}>
                  <span className="text-slate-300" style={{ fontWeight: 600 }}>Achievements: </span>{education.achievements}
                </p>
              </motion.div>
            </div>

            <div>
              <h3 className="text-white flex items-center gap-2 mb-6" style={{ fontSize: "18px", fontWeight: 600 }}>
                <Award className="w-5 h-5 text-emerald-400" /> Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4"
                  >
                    <h4 className="text-white mb-1" style={{ fontSize: "13px", fontWeight: 600 }}>{c.title}</h4>
                    <p className="text-slate-400" style={{ fontSize: "12px" }}>{c.org}</p>
                    <p className="text-emerald-400 mt-1" style={{ fontSize: "11px", fontWeight: 500 }}>{c.date}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
