import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  id?: string;
}

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  duration = 0.6,
  id
}: AnimatedSectionProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 40, opacity: 0 };
      case "down": return { y: -40, opacity: 0 };
      case "left": return { x: 40, opacity: 0 };
      case "right": return { x: -40, opacity: 0 };
      case "none": return { opacity: 0 };
      default: return { y: 40, opacity: 0 };
    }
  };

  return (
    <motion.section
      id={id}
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
