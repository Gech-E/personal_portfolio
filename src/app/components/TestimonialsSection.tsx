import { professionalContacts } from "../data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-24 bg-background" aria-labelledby="references-heading">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">PROFESSIONAL RECOGNITION</p>
        <h2 id="references-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Recognition & professional references</h2>
        <p className="text-muted-foreground max-w-3xl leading-relaxed mb-9">
          Colleagues and professional contacts at Memi Trading PLC, alongside a submitted contribution certificate. The researcher profiles are listed as contacts, not attributed testimonials.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {professionalContacts.map((person) => (
            <article key={person.id} className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
              <div className="flex gap-3 items-center">
                <div aria-hidden="true" className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-semibold">{person.initials}</div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.title}</p>
                  <p className="text-sm text-muted-foreground">{person.organization}</p>
                </div>
              </div>
              {person.recognition ? (
                <>
                  <p className="text-sm leading-relaxed text-foreground">{person.recognition}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground border-t border-border pt-3">{person.evidenceNote}</p>
                </>
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground border-t border-border pt-3">Professional contact. No testimonial quote has been provided or approved.</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
