export function ContactSection() {
  return <section id="contact" className="py-20 md:py-24 border-t border-border bg-slate-50 dark:bg-slate-900/30" aria-labelledby="contact-heading">
    <div className="max-w-6xl mx-auto px-6">
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">CONTACT</p>
      <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Let's build something useful.</h2>
      <p className="text-muted-foreground max-w-xl mb-8 leading-relaxed">Interested in AI/ML, full-stack development, or a collaboration? Reach me directly.</p>
      <a href="mailto:getachewekubay8@gmail.com" className="inline-flex rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-sm font-semibold">Email Getachew</a>
      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm">
        <a href="https://github.com/Gech-E" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub</a>
        <a href="https://www.linkedin.com/in/getachewekubay/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn</a>
        <span className="text-muted-foreground">Addis Ababa, Ethiopia</span>
      </div>
    </div>
  </section>;
}
