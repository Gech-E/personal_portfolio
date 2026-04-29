import { Code, Brain, Cpu, Users, Wrench, Layers, Zap, Target } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "CGPA", value: "3.93/4.0" },
  { label: "Projects Built", value: "10+" },
  { label: "AI Models Deployed", value: "6+" },
  { label: "Workshops Led", value: "12+" },
];

const whatIBring = [
  {
    icon: Brain,
    title: "AI/ML & Research",
    desc: "Implementing advanced architectures — including Vision Transformers (ViT) and Deep Learning models — to solve industrial automation and computer vision challenges.",
  },
  {
    icon: Code,
    title: "Full-Stack Engineering",
    desc: "Developing scalable web applications and software systems that are architecturally sound, secure, and user-centric.",
  },
  {
    icon: Users,
    title: "Leadership & Innovation",
    desc: "Deep passion for technical mentorship and community impact. Translating complex technical roadmaps into clear, executable strategies for collaborative teams.",
  },
  {
    icon: Cpu,
    title: "Robotics & Automation",
    desc: "Intelligent control systems and automation — bridging the gap between software intelligence and physical-world applications.",
  },
];

const techStack = [
  { label: "Languages", items: ["Python", "JavaScript", "C++", "SQL", "TypeScript"] },
  { label: "AI/ML", items: ["PyTorch", "TensorFlow", "Computer Vision", "Contrastive Learning", "Vision Transformers"] },
  { label: "Full-Stack", items: ["React", "Next.js", "FastAPI", "Flask", "MLOps", "System Architecture"] },
  { label: "Robotics", items: ["Intelligent Control Systems", "Automation"] },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-emerald-400 mb-2" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>ABOUT ME</p>
          <h2 className="text-white mb-4" style={{ fontSize: "32px", fontWeight: 700 }}>A Builder at Heart</h2>
          <p className="text-slate-400 max-w-3xl mb-6" style={{ fontSize: "17px", lineHeight: 1.8 }}>
            Specializing in the intersection of <span className="text-emerald-400" style={{ fontWeight: 600 }}>AI/ML Engineering</span>,{" "}
            <span className="text-emerald-400" style={{ fontWeight: 600 }}>Full-Stack Development</span>, and{" "}
            <span className="text-emerald-400" style={{ fontWeight: 600 }}>Robotics</span>.
          </p>
        </motion.div>

        {/* Main bio content — replaces image */}
        <div className="grid lg:grid-cols-5 gap-10 mb-16">
          {/* Left: narrative block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-2xl p-8 space-y-5 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-white" style={{ fontSize: "18px", fontWeight: 600 }}>My Approach</h3>
                </div>

                <p className="text-slate-300" style={{ fontSize: "14.5px", lineHeight: 1.85 }}>
                  I focus on designing and deploying intelligent, scalable systems that bridge the gap between{" "}
                  <span className="text-white" style={{ fontWeight: 500 }}>complex research</span> and{" "}
                  <span className="text-white" style={{ fontWeight: 500 }}>production-ready applications</span>.
                </p>

                <p className="text-slate-400" style={{ fontSize: "14.5px", lineHeight: 1.85 }}>
                  My approach is end-to-end: I don't just train models — I build the{" "}
                  <span className="text-slate-200" style={{ fontWeight: 500 }}>robust full-stack architectures</span> required to integrate them into real-world industrial environments.
                  Whether it's researching vision-based anomaly detection using contrastive learning or engineering digital automation platforms,
                  I thrive on turning complex data into actionable, high-impact systems.
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-white" style={{ fontSize: "18px", fontWeight: 600 }}>What Drives Me</h3>
                </div>

                <p className="text-slate-400" style={{ fontSize: "14.5px", lineHeight: 1.85 }}>
                  I'm driven by continuous learning and the challenge of building systems that are not only functional but also{" "}
                  <span className="text-slate-200" style={{ fontWeight: 500 }}>scalable and intelligent</span>.
                  If you're building something ambitious in the realm of AI, Robotics, or Software Engineering — let's connect.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: stats + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 text-center">
                  <p className="text-emerald-400" style={{ fontSize: "26px", fontWeight: 700 }}>{s.value}</p>
                  <p className="text-slate-400 mt-1" style={{ fontSize: "12px", fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tech stack tags */}
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-5 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <h4 className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>Technical Stack</h4>
              </div>
              <div className="space-y-4">
                {techStack.map((cat) => (
                  <div key={cat.label}>
                    <p className="text-slate-500 mb-1.5" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{cat.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span key={item} className="bg-slate-700/50 text-slate-300 px-2.5 py-1 rounded-md" style={{ fontSize: "11.5px", fontWeight: 500 }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* What I Bring — 4 cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="text-white" style={{ fontSize: "20px", fontWeight: 600 }}>What I Bring to the Table</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatIBring.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 hover:border-emerald-500/40 transition-all hover:-translate-y-1 group"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <h.icon className="w-5.5 h-5.5 text-emerald-400" />
                </div>
                <h4 className="text-white mb-2" style={{ fontSize: "15px", fontWeight: 600 }}>{h.title}</h4>
                <p className="text-slate-400" style={{ fontSize: "13px", lineHeight: 1.65 }}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
