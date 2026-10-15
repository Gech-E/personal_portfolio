import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import projectsData, { iconMap, getProjectFilters, filterConfig } from "../data/projects";
import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { SkillBadge } from "./ui/SkillBadge";
import { GradientButton } from "./ui/GradientButton";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", ...filterConfig.map(f => f.label)];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    const projectCategories = getProjectFilters(project.tags);
    return projectCategories.includes(activeFilter);
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Featured Work" 
          subtitle="A selection of my recent software and AI engineering projects."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {/* Featured Projects */}
          <div className="space-y-12 mb-16">
            {featuredProjects.map((project, idx) => {
              const Icon = iconMap[project.icon] || iconMap["Bot"];
              const isEven = idx % 2 === 0;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className={`glass-card rounded-3xl overflow-hidden flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Image/Visual Area */}
                  <div className="lg:w-1/2 min-h-[300px] relative p-8 flex items-center justify-center bg-slate-50 dark:bg-slate-900/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5" />
                    <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-white dark:bg-slate-800 flex items-center justify-center group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-6">
                         <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                           {project.githubUrl && (
                             <a 
                               href={project.githubUrl} 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               aria-label={`View ${project.title} source code on GitHub`}
                               className="p-2 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 text-white transition-colors"
                             >
                               <Github size={20} />
                             </a>
                           )}
                           {project.liveUrl && (
                             <a 
                               href={project.liveUrl} 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               aria-label={`View live demo for ${project.title}`}
                               className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg"
                             >
                               <ExternalLink size={20} />
                             </a>
                           )}
                         </div>
                      </div>
                      <Icon size={80} style={{ color: project.color }} className="opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20" style={{ color: project.color }}>
                        <Icon size={20} />
                      </div>
                      <span className="text-sm font-bold text-blue-500 tracking-wider uppercase">Featured Project</span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-['Space_Grotesk']">{project.title}</h3>
                    
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-border mb-6">
                      <p className="text-muted-foreground leading-relaxed mb-3">{project.desc}</p>
                      {project.impact && (
                        <p className="text-sm font-medium text-foreground flex gap-2">
                          <span className="text-emerald-500">↑</span> {project.impact}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => <SkillBadge key={tag} name={tag} />)}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-auto">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold hover:text-blue-500 transition-colors">
                          <Github size={18} /> Source Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
                          <ExternalLink size={18} /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Other Projects Grid */}
          {otherProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => {
                const Icon = iconMap[project.icon] || iconMap["Bot"];
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-6 rounded-2xl flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800" style={{ color: project.color }}>
                        <Icon size={24} />
                      </div>
                      <div className="flex gap-3 text-muted-foreground">
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`View ${project.title} source code on GitHub`}
                            className="hover:text-foreground transition-colors p-1"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={`View live demo for ${project.title}`}
                            className="hover:text-blue-500 transition-colors p-1"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors">{project.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{project.desc}</p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-medium text-slate-500 dark:text-slate-400">{tag}</span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs font-medium text-slate-400">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
