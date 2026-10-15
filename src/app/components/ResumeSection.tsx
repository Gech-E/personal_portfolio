import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { GradientButton } from "./ui/GradientButton";
import { Download, FileText, Briefcase, GraduationCap, Code2 } from "lucide-react";

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/5 dark:to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <AnimatedSection direction="right">
            <SectionHeader 
              title="Resume & Credentials" 
              subtitle="Get a comprehensive overview of my experience, skills, and qualifications."
              alignment="left"
              className="mb-8"
            />
            
            <p className="text-lg text-muted-foreground mb-8">
              I'm actively seeking opportunities where I can leverage my expertise in AI engineering and full-stack development to build impactful products. My resume details my work history, technical proficiencies, and educational background.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <GradientButton 
                onClick={() => window.open('/Getachew_Ekubay_AI_Engineer_Resume.pdf', '_blank')}
                className="w-full sm:w-auto shadow-lg shadow-blue-500/20"
              >
                <Download className="w-5 h-5 mr-2" /> Download ATS Resume
              </GradientButton>
              <GradientButton 
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto"
              >
                Contact Me
              </GradientButton>
            </div>
          </AnimatedSection>
          
          {/* Visual Resume Highlights for Recruiters */}
          <AnimatedSection direction="left" delay={0.2}>
            <div className="glass p-8 rounded-3xl border border-border shadow-xl relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
              
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" /> Quick Snapshot
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg h-fit">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Experience Highlights</h4>
                    <p className="text-sm text-muted-foreground mt-1">CTO & Co-Founder at Gemed Solutions, AI/ML Intern at Memi Trading. Proven track record of delivering production-ready AI models and scalable web applications.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500 rounded-lg h-fit">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Core Competencies</h4>
                    <p className="text-sm text-muted-foreground mt-1">FastAPI, Node.js, Express.js, Nest.js, React, Tailwind CSS, Next.js, PyTorch, TensorFlow. Expertise in RAG, LangChain, AI Agents, Chatbots, Computer Vision, NLP, Speech Recognition, and Recommendation Systems.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-lg h-fit">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Education</h4>
                    <p className="text-sm text-muted-foreground mt-1">B.Sc. Electrical & Computer Engineering (Great Distinction, 3.93 CGPA). Machine Learning & Cloud Certifications.</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </div>
    </section>
  );
}
