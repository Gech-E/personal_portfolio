import { useMemo, useState } from "react";
import { ArrowUpRight, Github, Search } from "lucide-react";
import projects, { projectCategories } from "../data/projects";

export function ProjectsSection() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const filtered = useMemo(() => projects.filter((project) => {
    const categoryMatch = category === "All" || project.category === category;
    const searchText = [project.title, project.desc, project.category, ...project.tags].join(" ").toLowerCase();
    return categoryMatch && searchText.includes(query.trim().toLowerCase());
  }), [category, query]);
  const visible = showAll || category !== "All" || query.trim() ? filtered : filtered.slice(0, 9);
  return (
    <section id="projects" className="py-20 md:py-28 bg-background" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-9">
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">SELECTED WORK</p>
            <h2 id="projects-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">Projects & experiments</h2>
            <p className="max-w-2xl text-muted-foreground">Explore {projects.length} public projects across AI, full-stack engineering, EdTech and more. Source links point directly to GitHub.</p>
          </div>
          <a href="https://github.com/Gech-E?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">All GitHub repositories <ArrowUpRight size={16}/></a>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-sm">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true"/>
            <input aria-label="Search projects" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search projects or technologies" className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter projects by category">
            {["All",...projectCategories].map((item)=>(
              <button key={item} type="button" aria-pressed={category===item} onClick={()=>{setCategory(item);setShowAll(false)}} className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${category===item?"bg-blue-600 border-blue-600 text-white":"bg-card border-border text-muted-foreground hover:border-blue-400 hover:text-foreground"}`}>{item}</button>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-5" role="status">{filtered.length} {filtered.length===1?"project":"projects"} found</p>
        {filtered.length===0 ? <div className="rounded-2xl border border-border p-10 text-center text-muted-foreground">No projects match this search. Try another category or keyword.</div> :
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((project)=>(
            <article key={project.id} className="group flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all">
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 rounded-full px-3 py-1">{project.category}</span>
                {project.featured && <span className="text-xs text-muted-foreground">Selected</span>}
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3 text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">{project.tags.map((tag)=><span key={tag} className="text-xs rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-slate-600 dark:text-slate-300">{tag}</span>)}</div>
              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-5">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-blue-600"><Github size={16}/> Code <ArrowUpRight size={13}/></a>
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Demo <ArrowUpRight size={15}/></a>}
                {project.referenceUrl && <a href={project.referenceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">E-commerce reference <ArrowUpRight size={15}/></a>}
              </div>
            </article>
          ))}
        </div>}
        {category==="All" && !query.trim() && filtered.length>9 && <div className="flex justify-center mt-10"><button type="button" onClick={()=>setShowAll(v=>!v)} className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-slate-100 dark:hover:bg-slate-800">{showAll?"Show fewer projects":`Show all ${projects.length} projects`}</button></div>}
      </div>
    </section>
  );
}
