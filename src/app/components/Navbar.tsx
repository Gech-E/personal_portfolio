import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("#home")} className="text-white cursor-pointer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700 }}>
          GE<span className="text-emerald-400">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                active === l.href.slice(1) ? "text-emerald-400" : "text-slate-300 hover:text-white"
              }`}
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#resume")}
            className="ml-3 flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white cursor-pointer">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-700/50 px-6 py-4 space-y-1">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`block w-full text-left px-3 py-2 rounded-md cursor-pointer ${
                active === l.href.slice(1) ? "text-emerald-400 bg-slate-800" : "text-slate-300"
              }`}
              style={{ fontSize: "14px" }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#resume")}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-lg cursor-pointer"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            <Download className="w-4 h-4" />
            Resume
          </button>
        </div>
      )}
    </nav>
  );
}
