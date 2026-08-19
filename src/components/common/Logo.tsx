import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  variant?: "full" | "icon";
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showTagline = false,
  className = "",
  variant = "full"
}) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-brand shadow-soft overflow-hidden shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 40 40" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Interconnected Knowledge Network Nodes */}
          <path d="M12 28L20 12L28 28H23L20 21L17 28H12Z" fill="white" fillOpacity="0.95" />
          <circle cx="20" cy="12" r="3.5" fill="#19A7E8" />
          <circle cx="12" cy="28" r="3" fill="#FBBF24" />
          <circle cx="28" cy="28" r="3" fill="#EC4899" />
          <circle cx="20" cy="21" r="2.5" fill="#14B8A6" />
          {/* Connector Lines */}
          <path d="M20 12L20 21M12 28L20 21M28 28L20 21" stroke="white" strokeWidth="1.5" strokeDasharray="1 1" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {variant === "full" && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight font-extrabold font-sans">
            <span className="text-slate-900 dark:text-white font-black">Campus</span>
            <span className="bg-gradient-brand bg-clip-text text-transparent ml-0.5">Connect</span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase -mt-0.5">
              Your Campus • Your Community
            </span>
          )}
        </div>
      )}
    </div>
  );
};