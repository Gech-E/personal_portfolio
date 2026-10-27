import { lazy, Suspense, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ui/ScrollToTop";

// Code-split below-the-fold and interactive components to minimize initial JS payload & TBT
const EducationSection = lazy(() =>
  import("./components/EducationSection").then((m) => ({ default: m.EducationSection }))
);
const AchievementsSection = lazy(() =>
  import("./components/AchievementsSection").then((m) => ({ default: m.AchievementsSection }))
);
const TestimonialsSection = lazy(() =>
  import("./components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection }))
);
const BlogSection = lazy(() =>
  import("./components/BlogSection").then((m) => ({ default: m.BlogSection }))
);
const ResumeSection = lazy(() =>
  import("./components/ResumeSection").then((m) => ({ default: m.ResumeSection }))
);
const ContactSection = lazy(() =>
  import("./components/ContactSection").then((m) => ({ default: m.ContactSection }))
);
const ChatBot = lazy(() =>
  import("./components/ChatBot").then((m) => ({ default: m.ChatBot }))
);

export default function App() {
  const [chatRequested, setChatRequested] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden font-sans bg-background text-foreground selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-300">
      {/* Skip to Content for Screen Readers & Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none font-semibold text-sm"
      >
        Skip to main content
      </a>

      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        
        <Suspense fallback={<div className="py-12 flex justify-center text-muted-foreground text-sm" />}>
          <EducationSection />
          <AchievementsSection />
          <TestimonialsSection />
          <BlogSection />
          <ResumeSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      
      {chatRequested ? (
        <Suspense fallback={null}><ChatBot startOpen /></Suspense>
      ) : (
        <button type="button" aria-label="Open AI portfolio assistant" onClick={() => setChatRequested(true)} className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"><MessageCircle size={24} /></button>
      )}
      <ScrollToTop />
    </div>
  );
}