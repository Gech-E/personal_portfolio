import { ArrowDown, Github, Linkedin, Mail, Globe } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)" }}
    >
      {/* Animated grid bg */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400" style={{ fontSize: "13px", fontWeight: 500 }}>Available for opportunities</span>
          </div>

          <h1 className="text-white mb-2" style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, fontFamily: "'Inter', sans-serif" }}>
            Hi, I'm <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #34d399, #3b82f6)" }}>Getachew Ekubay</span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto mt-4 mb-8" style={{ fontSize: "18px", lineHeight: 1.7, fontWeight: 400 }}>
            Full-Stack Developer & AI/ML Engineer building intelligent systems
            that solve real-world problems. Specializing in Next.js, FastAPI, RAG pipelines, and Agentic AI.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-lg transition-colors"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="border border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 px-7 py-3 rounded-lg transition-colors"
              style={{ fontSize: "15px", fontWeight: 500 }}
            >
              Get in Touch
            </a>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-4">
            {[
              { icon: Github, href: "https://github.com/Gech-E", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/getachewekubay", label: "LinkedIn" },
              { icon: Mail, href: "mailto:getachewekubay8@gmail.com", label: "Email" },
              { icon: Globe, href: "https://getachewekubay.vercel.app", label: "Website" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors"
              >
                <s.icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </div>
    </section>
  );
}
