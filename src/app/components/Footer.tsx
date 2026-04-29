import { Heart, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500" style={{ fontSize: "13px" }}>
          © 2026 Getachew Ekubay. Built with <Heart className="w-3.5 h-3.5 inline text-emerald-400 mx-0.5" /> using React & Tailwind.
        </p>
        <div className="flex gap-4">
          {[
            { icon: Github, href: "https://github.com/Gech-E" },
            { icon: Linkedin, href: "https://linkedin.com/in/getachewekubay" },
            { icon: Mail, href: "mailto:getachewekubay8@gmail.com" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors">
              <s.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
