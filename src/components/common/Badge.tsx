import React from "react";

export type BadgeVariant =
  | "blue" // Academic
  | "gold" // Important / Exam
  | "purple" // Community / Scholarship
  | "pink" // Event / Hackathon
  | "teal" // Success / Placement / Verified
  | "slate" // Neutral / General
  | "red" // Urgent / Emergency
  | "gradient";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "blue",
  size = "sm",
  dot = false,
  children,
  className = ""
}) => {
  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 gap-1 font-medium",
    md: "text-xs px-2.5 py-1 gap-1.5 font-semibold"
  };

  const variantClasses = {
    blue: "bg-blue-50 dark:bg-blue-950/50 text-brand-royalblue dark:text-blue-400 border border-blue-200 dark:border-blue-800/60",
    gold: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60",
    purple: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60",
    pink: "bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60",
    teal: "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60",
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    red: "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60",
    gradient: "bg-gradient-brand text-white border-0 shadow-sm"
  };

  const dotColors = {
    blue: "bg-brand-royalblue",
    gold: "bg-amber-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    teal: "bg-teal-500",
    slate: "bg-slate-400",
    red: "bg-red-500",
    gradient: "bg-white"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wide shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};