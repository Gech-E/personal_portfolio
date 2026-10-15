import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { motion } from "motion/react";
import { GradientButton } from "./ui/GradientButton";

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const titles = ["AI/ML Engineer", "Full-Stack Developer", "System Architect"];
  
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const i = textIndex % titles.length;
    const fullText = titles[i];

    const handleTyping = () => {
      setDisplayText(
        isDeleting 
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex(textIndex + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, typingSpeed, titles]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cyan-400/20 dark:bg-cyan-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12 pt-20">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass border border-blue-500/20 text-sm font-medium text-blue-600 dark:text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for opportunities
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-foreground">
              Hi, I'm <br className="hidden md:block" />
              <span className="text-gradient">Getachew Ekubay</span>
            </h1>

            <div className="h-8 md:h-10 mb-6">
              <p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300">
                <span className="text-blue-500 dark:text-blue-400">{"> "}</span>
                {displayText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto md:mx-0">
              Building intelligent software that bridges innovation and impact. Specializing in AI Agents, RAG pipelines, Computer Vision, Recommendation Systems, FastAPI, Node.js, and Next.js.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-10">
              <GradientButton 
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto"
              >
                View Projects
              </GradientButton>
              
              <GradientButton 
                variant="outline"
                onClick={() => window.open('/Getachew_Ekubay_AI_Engineer_Resume.pdf', '_blank')}
                className="w-full sm:w-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </GradientButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 justify-center md:justify-start">
              {[
                { icon: Github, href: "https://github.com/Gech-E", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/getachewekubay", label: "LinkedIn" },
                { icon: Mail, href: "mailto:getachewekubay8@gmail.com", label: "Email" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Profile Image / Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 hidden md:flex justify-center relative"
        >
          <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 blur-2xl opacity-20 dark:opacity-30 animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-1">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 overflow-hidden flex items-center justify-center relative">
                {/* Placeholder for actual image */}
                <div className="text-8xl font-bold text-slate-200 dark:text-slate-800">GE</div>
                {/* Replace the div above with this img tag when ready: */}
                {/* <img src="/profile.jpg" alt="Getachew Ekubay" className="w-full h-full object-cover" /> */}
              </div>
            </div>
            
            {/* Floating tech icons */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-4 right-10 glass-card p-3 rounded-2xl text-blue-500"
            >
              <Bot size={24} />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute bottom-10 -left-6 glass-card p-3 rounded-2xl text-cyan-500"
            >
              <Code size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20 bg-transparent border-none"
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to about section"
      >
        <div className="p-2 rounded-full glass text-muted-foreground hover:text-blue-500 transition-colors">
          <ArrowDown className="w-5 h-5" />
        </div>
      </motion.button>
    </section>
  );
}

import { Bot, Code } from "lucide-react";
