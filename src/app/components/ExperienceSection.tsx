import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { SkillBadge } from "./ui/SkillBadge";
import { experienceData } from "../data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-surface-alt relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader 
          title="Professional Experience" 
          subtitle="My journey in building and scaling technology solutions."
        />

        <div className="mt-16 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <AnimatedSection 
                  key={exp.id} 
                  direction={isEven ? "right" : "left"}
                  className={`relative flex flex-col sm:flex-row items-center justify-between w-full ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 sm:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-background transform sm:-translate-x-1/2 z-10 hidden sm:block shadow-sm shadow-blue-500/50" />

                  {/* Empty space for alternating layout */}
                  <div className="hidden sm:block w-5/12" />

                  {/* Content Card */}
                  <div className="w-full sm:w-5/12 ml-6 sm:ml-0">
                    <div className="glass-card p-6 md:p-8 rounded-2xl relative border-l-4 border-l-blue-500 sm:border-l sm:border-border hover:border-blue-500 transition-colors">
                      
                      <div className="flex flex-col gap-1 mb-4">
                        <span className="text-sm font-semibold text-blue-500 tracking-wider uppercase">
                          {exp.startDate} — {exp.endDate}
                        </span>
                        <h3 className="text-xl font-bold text-foreground font-['Space_Grotesk']">{exp.role}</h3>
                        <div className="text-lg font-medium text-slate-700 dark:text-slate-300">{exp.company}</div>
                        <div className="text-sm text-muted-foreground">{exp.location}</div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                            <span className="text-blue-500 mt-1">▹</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        {exp.technologies.map(tech => (
                          <SkillBadge key={tech} name={tech} />
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
