import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import { 
  Code2, 
  Brain, 
  Rocket, 
  Users, 
  Sparkles, 
  Bot, 
  Eye, 
  Layers, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "CGPA", value: "3.93/4.0", desc: "Great Distinction, Mekelle Univ." },
    { label: "Production Apps", value: "15+", desc: "Full-Stack & AI Systems" },
    { label: "AI Models", value: "8+", desc: "Vision, NLP & RAG Deployed" },
    { label: "Developers Mentored", value: "500+", desc: "Workshops & Tech Club" },
  ];

  const valuePillars = [
    {
      icon: Brain,
      title: "Agentic AI & RAG Architecture",
      desc: "Specialized in autonomous AI agents, LangChain orchestration, and hybrid dense-sparse RAG pipelines that ground LLMs in authoritative knowledge.",
      tags: ["AI Agents", "LangChain", "RAG Pipelines", "Chatbots"]
    },
    {
      icon: Code2,
      title: "Scalable Full-Stack Engineering",
      desc: "Architecting end-to-end web applications with FastAPI, Node.js, Express.js, and Nest.js backends connected to reactive Next.js, React, and Tailwind CSS interfaces.",
      tags: ["FastAPI", "Nest.js", "Next.js", "Node.js", "React"]
    },
    {
      icon: Eye,
      title: "Computer Vision, NLP & Speech",
      desc: "Developing production neural network models using PyTorch and TensorFlow for image classification, contrastive anomaly detection, text analysis, and speech processing.",
      tags: ["Computer Vision", "NLP", "PyTorch", "TensorFlow", "Speech"]
    },
    {
      icon: Sparkles,
      title: "Recommendation & Predictive Engines",
      desc: "Engineering predictive intelligence platforms, personalized recommendation engines via collaborative filtering, and data-driven startup incubation systems.",
      tags: ["Recommendation Systems", "Machine Learning", "PostgreSQL", "Docker"]
    }
  ];

  const highlights = [
    "Graduated with Great Distinction (3.93/4.0 CGPA) in Electrical & Computer Engineering",
    "Former CTO & Co-Founder at Gemed Solutions, deploying predictive platforms for 15+ startups",
    "AI/ML Engineer Intern at Memi Trading PLC, reducing inventory processing latency by 65%",
    "Stanford & DeepLearning.AI Machine Learning and Udacity Full-Stack certified",
    "Coordinated 12 technical hackathons & workshops mentoring over 500 emerging engineers"
  ];

  return (
    <section id="about" className="py-24 bg-surface-alt relative overflow-hidden" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader 
          id="about-heading"
          title="About Getachew Ekubay" 
          subtitle="Full-Stack Developer & AI/ML Engineer architecting scalable web platforms and intelligent systems."
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column: Narrative & Professional Bio (7 cols) */}
          <AnimatedSection direction="right" className="lg:col-span-7 space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            <article className="space-y-5">
              <p>
                I am an <strong className="text-foreground font-semibold">Electrical &amp; Computer Engineer</strong>, 
                <strong className="text-foreground font-semibold"> Full-Stack Developer</strong>, and 
                <strong className="text-foreground font-semibold"> AI/ML Specialist</strong> who graduated with 
                <strong className="text-foreground font-semibold"> Great Distinction (3.93/4.0 CGPA)</strong> from Mekelle University. 
                My work focuses on bridging robust enterprise software architecture with cutting-edge artificial intelligence to deliver high-impact real-world solutions.
              </p>

              <p>
                As the former <strong className="text-foreground font-semibold">CTO &amp; Co-Founder of Gemed Solutions</strong>, 
                I led a team of 4 engineers and researchers to design and deploy an end-to-end AI incubation and predictive analytics platform, 
                securing enterprise pilot clients and serving 15+ startups. At <strong className="text-foreground font-semibold">Memi Trading PLC</strong>, 
                I architected production AI microservices that reduced manual vendor-matching and inventory processing time by 
                <strong className="text-foreground font-semibold"> 65%</strong>.
              </p>

              <blockquote className="border-l-4 border-blue-500 pl-6 py-3 my-6 italic text-foreground font-medium text-lg md:text-xl bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent rounded-r-2xl">
                "My mission is to architect resilient, scalable digital systems where autonomous AI agents, retrieval-augmented intelligence, and seamless web experiences empower users and drive measurable outcomes."
              </blockquote>

              <p>
                On the backend and full-stack side, my toolkit centers on <strong className="text-foreground font-semibold">FastAPI, Node.js, Express.js, Nest.js, React, Tailwind CSS, and Next.js</strong>. 
                In AI and machine learning, I engineer solutions across <strong className="text-foreground font-semibold">Recommendation Systems, Computer Vision, Natural Language Processing (NLP), RAG pipelines, Speech Recognition, LangChain, AI Agents, Chatbots, PyTorch, and TensorFlow</strong>.
              </p>

              {/* Key Credentials / Proof Points */}
              <div className="pt-4 space-y-2.5">
                <h3 className="text-sm uppercase tracking-wider font-bold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  Key Achievements &amp; Capabilities
                </h3>
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="text-blue-500 font-bold mt-0.5">▹</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a 
                  href="#projects" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Explore Featured Projects <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="/Getachew_Ekubay_AI_Engineer_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  View ATS-Formatted Resume (PDF) <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          </AnimatedSection>

          {/* Right Column: Key Stats & Value Pillars (5 cols) */}
          <AnimatedSection direction="left" delay={0.2} className="lg:col-span-5 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                  <div className="text-2xl lg:text-3xl font-extrabold text-gradient mb-1 font-['Space_Grotesk']">{stat.value}</div>
                  <div className="font-semibold text-foreground text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Core Capability Pillars */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-foreground font-['Space_Grotesk'] flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-500" />
                Core Technical Domains
              </h3>
              
              <div className="space-y-3">
                {valuePillars.map((pillar, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-border/70 hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                        <pillar.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground text-sm">{pillar.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {pillar.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
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
