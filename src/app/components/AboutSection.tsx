import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { Code2, Brain, Rocket, Users } from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "CGPA", value: "3.93/4.0", desc: "Mekelle University" },
    { label: "Projects", value: "15+", desc: "Completed" },
    { label: "AI Models", value: "8+", desc: "Deployed" },
    { label: "Mentored", value: "500+", desc: "Students" },
  ];

  const focusAreas = [
    { icon: Brain, title: "AI & Machine Learning", desc: "Recommendation Systems, Computer Vision, NLP, RAG, Speech Recognition, AI Agents, LangChain" },
    { icon: Code2, title: "Full-Stack Development", desc: "FastAPI, Node.js, Express.js, Nest.js, React, Next.js, Tailwind CSS" },
    { icon: Users, title: "Leadership & Community", desc: "CTO experience, Tech Club coordination, mentoring" },
    { icon: Rocket, title: "Intelligent Systems", desc: "Building scalable AI solutions that solve real-world problems" },
  ];

  return (
    <section id="about" className="py-24 bg-surface-alt relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader 
          title="About Me" 
          subtitle="A passionate engineer focused on the intersection of artificial intelligence and scalable software architecture."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-12">
          
          {/* Left Column: Narrative */}
          <AnimatedSection direction="right" className="space-y-6 text-lg text-muted-foreground">
            <p>
              I am an Electrical and Computer Engineer specializing in Artificial Intelligence and Full-Stack Development. My journey began with a curiosity about how hardware and software integrate, leading me to graduate with <strong className="text-foreground">Great Distinction (3.93 CGPA)</strong> from Mekelle University.
            </p>
            <p>
              As the former <strong className="text-foreground">CTO & Co-Founder of Gemed Solutions</strong>, I led technical teams to deliver custom digital solutions, bridging the gap between business needs and technical implementation. Today, my focus is on <strong className="text-foreground">Agentic AI and RAG pipelines</strong> — building systems that don't just process data, but reason and take autonomous action.
            </p>
            
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-8 italic text-foreground font-medium text-xl bg-gradient-to-r from-blue-500/10 to-transparent rounded-r-xl">
              "My mission is to build intelligent software products that solve real-world problems and bridge traditional systems with AI-powered technologies."
            </blockquote>
            
            <p>
              Beyond coding, I'm deeply committed to community building. As a Tech Club Coordinator, I've had the privilege of organizing workshops and hackathons, mentoring over 500 students in programming fundamentals and AI.
            </p>
          </AnimatedSection>

          {/* Right Column: Stats & Focus Areas */}
          <AnimatedSection direction="left" delay={0.2} className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl text-center">
                  <div className="text-3xl font-bold text-gradient mb-1 font-['Space_Grotesk']">{stat.value}</div>
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Focus Areas */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-4">Core Focus</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {focusAreas.map((area, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-border">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 shrink-0">
                      <area.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{area.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{area.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
