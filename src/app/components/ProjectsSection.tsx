import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import projects, { iconMap, filterConfig, getProjectFilters } from "../data/projects";

const filterLabels = ["All", ...filterConfig.map((f) => f.label)];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => getProjectFilters(p.tags).includes(activeFilter));

  return (
    <section id="projects" className="py-20" style={{ background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-emerald-400 mb-2" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em" }}>PORTFOLIO</p>
          <h2 className="text-white mb-4" style={{ fontSize: "32px", fontWeight: 700 }}>Featured Projects</h2>
          <p className="text-slate-400 max-w-2xl mb-8" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            Production-grade AI and full-stack solutions solving real problems in healthcare, e-commerce, and beyond.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filterLabels.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeFilter === f
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700/50"
              }`}
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => {
            const Icon = iconMap[p.icon];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 hover:border-emerald-500/40 transition-all hover:-translate-y-1 ${
                  p.featured ? "ring-1 ring-emerald-500/20" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}15` }}>
                    {Icon && <Icon className="w-5.5 h-5.5" style={{ color: p.color }} />}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.githubUrl ? (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer">
                        <Github className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer">
                        <Github className="w-4 h-4" />
                      </span>
                    )}
                    {p.liveUrl ? (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer">
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-white mb-2" style={{ fontSize: "16px", fontWeight: 600 }}>{p.title}</h3>
                <p className="text-slate-400 mb-4" style={{ fontSize: "13px", lineHeight: 1.65 }}>{p.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="bg-slate-700/50 text-slate-300 px-2.5 py-0.5 rounded-md" style={{ fontSize: "11px", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
