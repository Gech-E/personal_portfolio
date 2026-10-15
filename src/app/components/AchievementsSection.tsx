import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { achievementsData } from "../data/achievements";
import { Trophy, Star, Target, Users } from "lucide-react";

export function AchievementsSection() {
  const getIcon = (category: string) => {
    switch (category) {
      case "academic": return <Trophy className="w-8 h-8 text-amber-500" />;
      case "project": return <Target className="w-8 h-8 text-emerald-500" />;
      case "professional": return <Users className="w-8 h-8 text-blue-500" />;
      default: return <Star className="w-8 h-8 text-purple-500" />;
    }
  };

  return (
    <section id="achievements" className="py-24 bg-surface-alt relative border-y border-border">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader 
          title="Milestones & Impact" 
          subtitle="Measurable results from my academic and professional journey."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {achievementsData.map((achievement, idx) => (
            <AnimatedSection 
              key={achievement.id} 
              direction="up" 
              delay={idx * 0.1}
              className="glass-card p-6 rounded-2xl text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-md border border-border group-hover:scale-110 transition-transform">
                {getIcon(achievement.category)}
              </div>
              
              <div className="text-4xl font-black text-foreground font-['Space_Grotesk'] mb-2 tracking-tight">
                {achievement.metric}
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-3">{achievement.title}</h4>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {achievement.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
