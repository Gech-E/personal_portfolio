interface SectionHeaderProps { title: string; subtitle?: string; className?: string; alignment?: "left" | "center" | "right"; }
export function SectionHeader({ title, subtitle, className = "", alignment = "center" }: SectionHeaderProps) {
const align=alignment==="center"?"items-center text-center":alignment==="right"?"items-end text-right":"items-start text-left";
return <div className={`mb-12 flex flex-col ${align} ${className}`}><h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">{title}</h2><div aria-hidden="true" className="h-1 w-20 bg-blue-500 rounded-full mb-5"/>{subtitle&&<p className="text-muted-foreground text-base md:text-lg max-w-2xl">{subtitle}</p>}</div>;
}
