import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, shortcut = '⌘K', ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          className={cn(
            'w-full bg-slate-50/80 dark:bg-slate-900/90 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs sm:text-sm pl-10 pr-12 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none',
            className
          )}
          {...props}
        />
        {shortcut && (
          <kbd className="absolute right-3 hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';
