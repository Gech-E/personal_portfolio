import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { SkillBadge } from "./ui/SkillBadge";
import { skillCategories } from "../data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Technical Expertise" 
          subtitle="A comprehensive toolkit spanning artificial intelligence, full-stack development, and cloud infrastructure."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {skillCategories.map((category, idx) => (
            <AnimatedSection 
              key={category.title} 
              direction="up" 
              delay={idx * 0.1}
              className="glass-card p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm">
                  {idx + 1}
                </span>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <SkillBadge 
                    key={skill.name} 
                    name={skill.name} 
                    icon={<skill.icon size={16} />} 
                  />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}