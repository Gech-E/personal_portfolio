import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { GradientButton } from "./ui/GradientButton";
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-surface-alt relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Get In Touch" 
          subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
        />

        <div className="grid lg:grid-cols-2 gap-16 mt-16 max-w-5xl mx-auto">
          
          <AnimatedSection direction="right" className="space-y-8">
            <h3 className="text-3xl font-bold text-foreground font-['Space_Grotesk'] mb-2">Let's build something <span className="text-blue-500">great together.</span></h3>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <a href="mailto:getachewekubay8@gmail.com" className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-blue-500 transition-colors group">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Email</div>
                  <div className="text-foreground font-semibold group-hover:text-blue-500 transition-colors">getachewekubay8@gmail.com</div>
                </div>
              </a>
              
              <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Location</div>
                  <div className="text-foreground font-semibold">Addis Ababa, Ethiopia</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground font-medium mb-1">Phone</div>
                  <div className="text-foreground font-semibold">+251 92 654 3530</div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex gap-4">
              <a 
                href="https://linkedin.com/in/getachewekubay" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit LinkedIn profile"
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/Gech-E" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit GitHub profile"
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="left" delay={0.2}>
            <form className="glass-card p-8 rounded-3xl space-y-6" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Send a Message</h3>
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none text-foreground"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              
              <GradientButton type="submit" className="w-full">
                Send Message
              </GradientButton>
            </form>
          </AnimatedSection>
          
        </div>
      </div>
    </section>
  );
}