import { ArrowUpRight, Download, FileText } from "lucide-react";

export function ResumeSection() {
  return (
    <section id="resume" className="py-20 md:py-24 bg-background" aria-labelledby="resume-heading">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl border border-border bg-card p-7 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">RESUME</p>
            <h2 id="resume-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Experience, skills & selected projects.</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">A concise, one-page resume focused on full-stack engineering, applied AI/ML, teaching, and projects you can explore on GitHub.</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><FileText size={17}/> PDF resume · Updated October 2026</div>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a href="/Getachew_Ekubay_AI_Engineer_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3"><Download size={17}/> View or download CV</a>
            <a href="https://github.com/Gech-E?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">Explore source projects <ArrowUpRight size={17}/></a>
          </div>
        </div>
      </div>
    </section>
  );
}
