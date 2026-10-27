export function Footer() {
  return <footer className="py-9 bg-background border-t border-border"><div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center"><p className="font-semibold tracking-tight text-foreground">Getachew Ekubay<span className="text-blue-600">.</span></p><p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Getachew Ekubay · Built with care.</p><a href="mailto:getachewekubay8@gmail.com" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Let's connect</a></div></footer>;
}
