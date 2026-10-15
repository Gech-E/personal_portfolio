import { AnimatedSection } from "./ui/AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";
import blogPosts, { getCategoryColor, getCategoryIcon } from "../data/blog-posts";
import { ExternalLink, ArrowRight } from "lucide-react";

export function BlogSection() {
  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];
  const recentPosts = blogPosts.filter(p => p.id !== featuredPost.id).slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-surface-alt border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <SectionHeader 
            title="Writing & Insights" 
            subtitle="Thoughts on AI, software engineering, and building tech products."
            className="mb-0"
            alignment="left"
          />
          <a 
            href="#blog" 
            aria-label="View all writing and insights articles"
            className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 transition-colors mt-6 md:mt-0"
          >
            View All Articles <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mt-12">
          
          {/* Featured Post */}
          <AnimatedSection direction="up" className="lg:col-span-3">
            <a 
              href={featuredPost.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`Read featured article: ${featuredPost.title}`}
              className="block h-full group"
            >
              <div className="glass-card h-full p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
                    <ExternalLink size={24} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md" style={{ backgroundColor: `${getCategoryColor(featuredPost.category)}20`, color: getCategoryColor(featuredPost.category) }}>
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{featuredPost.date} • {featuredPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-foreground mb-4 font-['Space_Grotesk'] group-hover:text-blue-500 transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {featuredPost.tags.map(tag => (
                    <span key={tag} className="text-sm font-medium text-slate-500 dark:text-slate-400 before:content-['#'] before:mr-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </AnimatedSection>

          {/* Recent Posts List */}
          <div className="lg:col-span-2 space-y-6">
            {recentPosts.map((post, idx) => {
              const Icon = getCategoryIcon(post.category);
              return (
                <AnimatedSection key={post.id} direction="left" delay={idx * 0.1}>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`Read article: ${post.title}`}
                    className="block group"
                  >
                    <div className="glass-card p-6 rounded-2xl flex gap-4 items-start">
                      <div className="p-3 rounded-xl shrink-0 mt-1" style={{ backgroundColor: `${getCategoryColor(post.category)}15`, color: getCategoryColor(post.category) }}>
                        {Icon && <Icon size={20} />}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-blue-500 transition-colors leading-snug">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read article <ExternalLink size={14} />
                        </div>
                      </div>
                    </div>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>

        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a 
            href="#blog" 
            aria-label="View all writing and insights articles"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
          >
            View All Articles <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}