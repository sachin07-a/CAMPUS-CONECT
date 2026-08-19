import React from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  shortcutBadge?: boolean;
  onShortcutClick?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search notes, events, notices...",
  onClear,
  className = "",
  shortcutBadge = false,
  onShortcutClick
}) => {
  return (
    <div
      onClick={onShortcutClick}
      className={`relative flex items-center w-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 focus-within:border-brand-royalblue dark:focus-within:border-brand-royalblue focus-within:ring-2 focus-within:ring-brand-royalblue/20 rounded-xl px-3.5 py-2 transition-all cursor-text ${className}`}
    >
      <Search className="w-4 h-4 text-slate-400 dark:text-slate-400 shrink-0 mr-2.5" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
      />
      {value ? (
        <button
          onClick={e => {
            e.stopPropagation();
            onChange("");
            onClear?.();
          }}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : (
        shortcutBadge && (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded shadow-xs shrink-0 select-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        )
      )}
    </div>
  );
};