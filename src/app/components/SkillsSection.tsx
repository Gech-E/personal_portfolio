import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { SkillBadge } from "./ui/SkillBadge";
import { skillCategories } from "../data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Technical Expertise" 
          subtitle="A comprehensive toolkit spanning artificial intelligence, full-stack development, and cloud infrastructure."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {skillCategories.map((category) => (
            <AnimatedSection 
              key={category.title} 
              direction="up" 
              className="border border-border bg-card p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">{category.title}</h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <SkillBadge 
                    key={skill.name} 
                    name={skill.name} 
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