export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl font-bold font-['Space_Grotesk'] tracking-tight">
          <span className="text-foreground">Getachew</span>
          <span className="text-blue-500">.</span>
        </div>
        
        <p className="text-muted-foreground text-sm">
          &copy; {year} Getachew Ekubay. All rights reserved.
        </p>
        
        <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
