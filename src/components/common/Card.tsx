import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  hoverEffect = false,
  padding = "md",
  children,
  className = "",
  ...props
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8"
  };

  return (
    <div
      className={`bg-campus-card dark:bg-campus-darkcard border border-campus-border dark:border-campus-darkborder rounded-2xl transition-all duration-200 shadow-soft ${
        hoverEffect ? "hover:shadow-card hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5" : ""
      } ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};