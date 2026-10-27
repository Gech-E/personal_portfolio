import { testimonialsData } from "../data/testimonials";
import { Quote, Award, ShieldCheck } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-24 bg-background" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-3">What People Say</p>
        <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Recognition & professional perspectives</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed mb-9">
          Recognition of my work on the Zemen Bazaar recommendation system and professional contacts at Memi Trading PLC. Only documented statements are quoted.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonialsData.map((person) => (
            <article key={person.id} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold" aria-hidden="true">{person.initials}</div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{person.role}</p>
                  <p className="text-sm text-muted-foreground">{person.organization}</p>
                </div>
              </div>
              {person.certificateExcerpt && (
                <blockquote className="border-l-2 border-blue-500 pl-3 text-foreground font-medium italic text-sm leading-relaxed">
                  <Quote size={17} className="inline mr-1 text-blue-500" aria-hidden="true" />
                  “{person.certificateExcerpt}”
                </blockquote>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">{person.context}</p>
              <div className="pt-4 border-t border-border mt-auto">
                <p className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-300">
                  {person.sourceType === "certificate" ? <Award size={15} aria-hidden="true" /> : <ShieldCheck size={15} aria-hidden="true" />}
                  {person.sourceType === "certificate" ? "Certificate wording (submitted)" : "Professional contact · quote pending approval"}
                </p>
                {person.documentStatus && <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{person.documentStatus}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
