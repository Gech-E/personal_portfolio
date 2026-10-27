export function HeroSection() {
  return (
    <section id="home" className="relative bg-background pt-36 pb-20 md:pt-48 md:pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground mb-8"><span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"/> Based in Addis Ababa, Ethiopia</div>
          <p className="text-blue-600 dark:text-blue-400 text-sm md:text-base font-semibold tracking-wide mb-4">AI/ML ENGINEER · FULL-STACK DEVELOPER</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.06] mb-7 text-foreground">Building useful software.<br/><span className="text-blue-600 dark:text-blue-400">I'm Getachew Ekubay.</span></h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-9">I create thoughtful web applications and practical AI systems—from computer vision and recommendation engines to developer tools and learning platforms.</p>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a href="#projects" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">Explore my work</a>
            <a href="/Getachew_Ekubay_AI_Engineer_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card hover:bg-slate-100 dark:hover:bg-slate-800 text-foreground px-6 py-3 font-semibold text-sm transition-colors">Resume</a>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="https://github.com/Gech-E" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blue-600">GitHub</a>
            <a href="https://www.linkedin.com/in/getachewekubay/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blue-600">LinkedIn</a>
            <a href="mailto:getachewekubay8@gmail.com" className="inline-flex items-center gap-2 hover:text-blue-600">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}
