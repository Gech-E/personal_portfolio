import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { educationData, certificationsData } from "../data/education";
import { GraduationCap, Award } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="py-24 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader 
          title="Education & Certifications" 
          subtitle="Academic background and continuous learning."
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          
          {/* Education Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground mb-8">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><GraduationCap size={24} /></span>
              Academic Background
            </h3>
            
            {educationData.map((edu) => (
              <AnimatedSection key={edu.id} direction="right" className="glass-card p-8 rounded-2xl border-t-4 border-t-blue-500">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                  <div>
                    <h4 className="text-xl font-bold text-foreground font-['Space_Grotesk']">{edu.degree}</h4>
                    <div className="text-lg text-slate-600 dark:text-slate-300 font-medium">{edu.institution}</div>
                  </div>
                  <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full shrink-0">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>
                
                <div className="mb-6 inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium text-sm rounded-md border border-emerald-200 dark:border-emerald-800">
                  {edu.score}
                </div>

                <ul className="space-y-3">
                  {edu.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground text-sm">
                      <span className="text-blue-500 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>

          {/* Certifications Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground mb-8">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><Award size={24} /></span>
              Certifications
            </h3>
            
            <div className="grid gap-4">
              {certificationsData.map((cert, idx) => (
                <AnimatedSection 
                  key={cert.id} 
                  direction="left" 
                  delay={idx * 0.1}
                  className="glass-card p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-foreground group-hover:text-blue-500 transition-colors">{cert.name}</h4>
                    <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                  </div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md shrink-0">
                    {cert.date}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
