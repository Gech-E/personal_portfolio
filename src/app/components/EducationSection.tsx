import { educationData } from "../data/education";
export function EducationSection() {
  return <section id="education" className="py-16 md:py-20 bg-background border-t border-border" aria-labelledby="education-heading">
    <div className="max-w-6xl mx-auto px-6">
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">BACKGROUND</p>
      <h2 id="education-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Education</h2>
      <div className="grid gap-4">{educationData.map(edu=><article key={edu.id} className="rounded-2xl border border-border bg-card px-6 py-5">
        <div className="flex flex-col sm:flex-row justify-between gap-2"><div><h3 className="text-xl font-semibold">{edu.degree}</h3><p className="text-muted-foreground mt-1">{edu.institution}</p></div><span className="text-sm text-muted-foreground shrink-0">{edu.startDate}–{edu.endDate}</span></div>
        <p className="mt-3 text-sm text-muted-foreground">{edu.score}</p>
      </article>)}</div>
    </div>
  </section>;
}
