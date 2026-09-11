import { useState, useEffect } from 'react';
import { 
  Search, 
  LayoutDashboard, 
  Palette, 
  Moon, 
  Sun, 
  Sparkles, 
  BookOpen, 
  X, 
  ArrowRight,
  Wallet,
  Users,
  Layers,
  Stethoscope,
  FolderKanban,
  Building2,
  ShoppingBag,
  GraduationCap,
  Megaphone,
  Globe
} from 'lucide-react';
import { useTheme, THEMES } from '../../lib/theme-context';
import { ThemeId } from '../../types';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDashboard: (id: string) => void;
  onSelectTab: (tab: 'dashboards' | 'components' | 'tokens') => void;
  onOpenThemeDrawer: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectDashboard,
  onSelectTab,
  onOpenThemeDrawer,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const { setTheme, isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // If we had external trigger state, but here handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dashboards = [
    { id: 'business', label: 'Business Overview', icon: LayoutDashboard, category: 'Executive' },
    { id: 'finance', label: 'Finance & Portfolio', icon: Wallet, category: 'FinTech' },
    { id: 'hr', label: 'HR & People Ops', icon: Users, category: 'People' },
    { id: 'crm', label: 'CRM & Pipeline', icon: Layers, category: 'Sales' },
    { id: 'healthcare', label: 'Healthcare & Hospital', icon: Stethoscope, category: 'Health' },
    { id: 'project-mgmt', label: 'Project Management', icon: FolderKanban, category: 'Operations' },
    { id: 'real-estate', label: 'Real Estate Portfolio', icon: Building2, category: 'PropTech' },
    { id: 'ecommerce', label: 'E-Commerce & Retail', icon: ShoppingBag, category: 'Retail' },
    { id: 'education', label: 'Education & LMS', icon: GraduationCap, category: 'EdTech' },
    { id: 'marketing', label: 'Marketing & Growth', icon: Megaphone, category: 'Growth' },
  ];

  const filteredDashboards = dashboards.filter((d) =>
    d.label.toLowerCase().includes(query.toLowerCase()) ||
    d.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredThemes = Object.values(THEMES).filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search dashboards, themes, components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 px-3 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none"
          />
          {query ? (
            <button onClick={() => setQuery('')} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4">
          {/* Quick Actions */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Quick Actions
            </p>
            <div className="space-y-1">
              <button
                onClick={() => {
                  toggleDarkMode();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>Switch to {isDarkMode ? 'Light' : 'Dark'} Mode</span>
                </div>
                <span className="text-[10px] text-slate-400 group-hover:text-indigo-500 font-normal">Toggle</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('components');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Browse UI Component Catalog</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
              </button>

              <button
                onClick={() => {
                  onSelectTab('tokens');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-teal-500" />
                  <span>View Design Tokens & Architecture</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
              </button>

              <button
                onClick={() => {
                  onOpenThemeDrawer();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <span>Auto-Brand from Website URL...</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
              </button>

              <button
                onClick={() => {
                  onOpenThemeDrawer();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-pink-500" />
                  <span>Open Client Brand Customizer</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
              </button>
            </div>
          </div>

          {/* Dashboards */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              10 Industry Dashboards ({filteredDashboards.length})
            </p>
            <div className="space-y-1">
              {filteredDashboards.map((dash) => {
                const Icon = dash.icon;
                return (
                  <button
                    key={dash.id}
                    onClick={() => {
                      onSelectTab('dashboards');
                      onSelectDashboard(dash.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                      <span>{dash.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium">
                      {dash.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Client Theme Presets */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
              Switch Client Theme ({filteredThemes.length})
            </p>
            <div className="space-y-1">
              {filteredThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setTheme(theme.id as ThemeId);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: theme.primaryColor }} />
                    <span>{theme.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{theme.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">↓</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px]">↵</kbd>
          </div>
          <span>Moove UI Command Center</span>
        </div>
      </div>
    </div>
  );
}
