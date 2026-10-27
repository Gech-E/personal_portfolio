export function AboutSection() {
  return <section id="about" className="py-20 md:py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-border" aria-labelledby="about-heading">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-16">
      <div><p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">ABOUT</p><h2 id="about-heading" className="text-3xl md:text-4xl font-bold tracking-tight">A developer focused on useful, accessible technology.</h2></div>
      <div className="space-y-5 text-muted-foreground leading-relaxed">
        <p>I'm Getachew Ekubay, a full-stack developer and AI/ML practitioner based in Ethiopia. I enjoy turning complex problems into clear, usable applications.</p>
        <p>My work spans Python and TypeScript applications, API design, computer vision, recommendation systems, and retrieval-augmented AI tools. I also enjoy helping beginners learn software development and AI through practical projects.</p>
        <div className="flex flex-wrap gap-2 pt-2">{["Python","TypeScript","React","Next.js","FastAPI","NestJS","PostgreSQL","Machine Learning","RAG"].map(x=><span key={x} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground">{x}</span>)}</div>
        <a href="#projects" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline pt-2">See my projects</a>
      </div>
    </div>
  </section>;
}
