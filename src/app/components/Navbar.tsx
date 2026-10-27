import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useActiveSection } from "../../hooks/useActiveSection";
import { GradientButton } from "./ui/GradientButton";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "experience",
  "education",
  "projects",
  "achievements",
  "contact",
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          className="text-xl font-bold font-['Space_Grotesk'] tracking-tight cursor-pointer bg-transparent border-none p-0 flex items-center"
          onClick={() => scrollTo("home")}
          aria-label="Getachew Ekubay - Back to top"
        >
          <span className="text-foreground">Getachew</span>
          <span className="text-blue-500">.</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                activeSection === link.id ? "text-blue-500" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </button>
          ))}
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <GradientButton 
              onClick={() => window.open('/Getachew_Ekubay_AI_Engineer_Resume.pdf', '_blank')}
              className="!py-2 !px-4 text-sm"
              aria-label="Download resume PDF"
            >
              Resume
            </GradientButton>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
          <div className="md:hidden glass border-t border-border/50 mt-4 overflow-hidden">
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left py-2 text-lg font-medium ${
                    activeSection === link.id ? "text-blue-500" : "text-foreground"
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-border/50">
                <GradientButton 
                  onClick={() => window.open('/Getachew_Ekubay_AI_Engineer_Resume.pdf', '_blank')}
                  className="w-full justify-center"
                >
                  Download Resume
                </GradientButton>
              </div>
            </div>
          </div>
      )}
    </header>
  );
}