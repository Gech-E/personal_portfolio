import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}
