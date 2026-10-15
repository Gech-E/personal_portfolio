import React from "react";
import { motion } from "motion/react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
}

export function GradientButton({ 
  children, 
  href, 
  variant = "primary", 
  className = "",
  ...props 
}: GradientButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transition-all overflow-hidden group";
  
  const primaryStyles = "text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25";
  
  const outlineStyles = "text-foreground bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500";
  
  const styles = `${baseStyles} ${variant === "primary" ? primaryStyles : outlineStyles} ${className}`;

  const Inner = () => (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      {variant === "outline" && (
        <div className="absolute inset-0 h-full w-full bg-blue-50 dark:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a 
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={styles}
      >
        <Inner />
      </motion.a>
    );
  }

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={styles}
      {...props}
    >
      <Inner />
    </motion.button>
  );
}
