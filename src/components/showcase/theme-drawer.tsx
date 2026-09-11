import { X, Check, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme, THEMES } from '../../lib/theme-context';
import { ThemeId } from '../../types';
import { cn } from '../../lib/utils';

export interface ThemeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeDrawer({ isOpen, onClose }: ThemeDrawerProps) {
  const { currentTheme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">White-Label Theming</h3>
                <p className="text-xs text-slate-400">Instant client brand switching</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dark Mode Switcher Option in Drawer */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-2xs hover:bg-slate-100"
            >
              Switch to {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>

          <div className="mt-6">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Client Brand Presets
            </label>
            <div className="mt-3 space-y-2.5">
              {Object.values(THEMES).map((theme) => {
                const isSelected = currentTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setTheme(theme.id as ThemeId)}
                    className={cn(
                      'p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between',
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 shadow-xs'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{theme.name}</h4>
                        <p className="text-[10px] text-slate-400">{theme.category}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Active Brand Tokens
            </label>
            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Primary Color</span>
                <span className="font-mono font-semibold" style={{ color: currentTheme.primaryColor }}>
                  {currentTheme.primaryColor}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Accent Color</span>
                <span className="font-mono font-semibold" style={{ color: currentTheme.accentColor }}>
                  {currentTheme.accentColor}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Border Radius</span>
                <span className="font-mono">{currentTheme.borderRadius}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors shadow-xs"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
