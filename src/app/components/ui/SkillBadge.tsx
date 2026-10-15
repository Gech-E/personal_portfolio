import React from "react";
import { motion } from "motion/react";

interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SkillBadge({ name, icon, className = "" }: SkillBadgeProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${className}`}
    >
      {icon && <span className="text-blue-500 shrink-0">{icon}</span>}
      <span>{name}</span>
    </motion.div>
  );
}
