import { useState } from 'react';
import { X, Check, Sparkles, Sun, Moon, Copy, Sliders, Palette, CheckCheck } from 'lucide-react';
import { useTheme, THEMES } from '../../lib/theme-context';
import { ThemeId } from '../../types';
import { cn } from '../../lib/utils';

export interface ThemeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCustomBrand?: (name: string) => void;
  brandName?: string;
}

export function ThemeDrawer({ 
  isOpen, 
  onClose,
  onUpdateCustomBrand,
  brandName = 'Moove Digital'
}: ThemeDrawerProps) {
  const { currentTheme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  
  // Custom theme controls
  const [clientName, setClientName] = useState(brandName);
  const [customPrimary, setCustomPrimary] = useState(currentTheme.primaryColor);
  const [customAccent, setCustomAccent] = useState(currentTheme.accentColor);
  const [customRadius, setCustomRadius] = useState(currentTheme.borderRadius);
  const [copiedConfig, setCopiedConfig] = useState(false);

  if (!isOpen) return null;

  const applyCustomBrand = () => {
    document.documentElement.style.setProperty('--color-primary', customPrimary);
    document.documentElement.style.setProperty('--color-accent', customAccent);
    document.documentElement.style.setProperty('--radius-card', customRadius);
    if (onUpdateCustomBrand) {
      onUpdateCustomBrand(clientName);
    }
  };

  const copyThemeExport = () => {
    const configSnippet = `/* Moove UI White-Label Configuration for: ${clientName} */
:root {
  --color-primary: ${customPrimary};
  --color-accent: ${customAccent};
  --radius-card: ${customRadius};
  --font-sans: 'Plus Jakarta Sans', sans-serif;
}

/* Tailwind Config Extends:
theme: {
  extend: {
    colors: {
      primary: '${customPrimary}',
      accent: '${customAccent}',
    },
    borderRadius: {
      card: '${customRadius}',
    }
  }
}
*/`;
    navigator.clipboard.writeText(configSnippet);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-slate-200 dark:border-slate-800">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">White-Label Brand Studio</h3>
                <p className="text-[11px] text-slate-400">Transform the dashboard for any client</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher Banner */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600 shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              Toggle
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl my-5 border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('presets')}
              className={cn(
                'flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all',
                activeTab === 'presets'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              )}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Presets</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={cn(
                'flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all',
                activeTab === 'custom'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              )}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Client Pitch Studio</span>
            </button>
          </div>

          {/* Presets Tab */}
          {activeTab === 'presets' ? (
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Select Industry Preset
              </label>
              {Object.values(THEMES).map((theme) => {
                const isSelected = currentTheme.id === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setTheme(theme.id as ThemeId)}
                    className={cn(
                      'p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between',
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{theme.name}</h4>
                        <p className="text-[10px] text-slate-400">{theme.category}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Custom Pitch Studio Tab */
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme Health, Stripe Capital"
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Primary Brand Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customPrimary}
                      onChange={(e) => setCustomPrimary(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={customPrimary}
                      onChange={(e) => setCustomPrimary(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customAccent}
                      onChange={(e) => setCustomAccent(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={customAccent}
                      onChange={(e) => setCustomAccent(e.target.value)}
                      className="w-full text-xs font-mono font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Border Radius ({customRadius})
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Subtle', val: '0.5rem' },
                    { label: 'Modern', val: '1rem' },
                    { label: 'Pill/Soft', val: '1.25rem' },
                    { label: 'Organic', val: '1.75rem' },
                  ].map((r) => (
                    <button
                      key={r.val}
                      onClick={() => setCustomRadius(r.val)}
                      className={cn(
                        'py-1.5 text-[11px] font-bold rounded-xl border transition-all',
                        customRadius === r.val
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={applyCustomBrand}
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Live Apply Brand
                </button>

                <button
                  onClick={copyThemeExport}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                  title="Copy Theme Config"
                >
                  {copiedConfig ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedConfig ? 'Copied!' : 'Export'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors shadow-xs"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
