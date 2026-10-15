import React from "react";
import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  alignment?: "left" | "center" | "right";
}

export function SectionHeader({ title, subtitle, className = "", alignment = "center" }: SectionHeaderProps) {
  const alignmentClass = alignment === "center" ? "mx-auto text-center" : alignment === "right" ? "ml-auto text-right" : "text-left";
  const itemAlignment = alignment === "center" ? "items-center" : alignment === "right" ? "items-end" : "items-start";

  return (
    <div className={`mb-12 flex flex-col ${itemAlignment} ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`text-3xl md:text-4xl font-bold mb-4 ${alignmentClass}`}
      >
        {title}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-6"
      />
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className={`text-muted-foreground text-lg max-w-2xl ${alignmentClass}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
