import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { testimonialsData } from "../data/testimonials";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="What People Say" 
          subtitle="Feedback from colleagues, managers, and collaborators."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {testimonialsData.map((testimonial, idx) => (
            <AnimatedSection 
              key={testimonial.id} 
              direction="up" 
              delay={idx * 0.15}
              className="glass-card p-8 rounded-3xl relative h-full flex flex-col"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-500/10 dark:text-blue-400/10 rotate-180" />
              
              <div className="flex gap-4 items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {testimonial.avatarPlaceholder}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400">{testimonial.title}, {testimonial.company}</div>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed italic relative z-10 flex-grow">
                "{testimonial.quote}"
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
