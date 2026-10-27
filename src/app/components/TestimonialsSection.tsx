import { professionalContacts } from "../data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-24 bg-background" aria-labelledby="references-heading">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">PROFESSIONAL NETWORK</p>
        <h2 id="references-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Professional References</h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed mb-9">
          Professional contacts identified by Getachew. Names and roles are shown for context; no endorsements or quotations are attributed to them.
          References and contact details are available upon request.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {professionalContacts.map((person) => (
            <article key={person.id} className="rounded-2xl border border-border bg-card p-6 flex gap-4 items-start">
              <div aria-hidden="true" className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center font-semibold">
                {person.initials}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{person.title}</p>
                {person.organization && <p className="text-sm text-muted-foreground">{person.organization}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
