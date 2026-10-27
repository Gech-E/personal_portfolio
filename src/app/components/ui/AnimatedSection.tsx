import type { ReactNode } from "react";
interface AnimatedSectionProps { children: ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right" | "none"; duration?: number; id?: string; }
export function AnimatedSection({ children, className = "", id }: AnimatedSectionProps) { return <div id={id} className={className}>{children}</div>; }
