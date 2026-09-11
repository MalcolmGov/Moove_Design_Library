import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Settings, 
  HelpCircle,
  FolderKanban,
  Building2,
  Stethoscope,
  GraduationCap,
  Wallet,
  ShoppingBag,
  Megaphone
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';

export interface SidebarProps {
  currentDashboardId: string;
  onSelectDashboard?: (id: string) => void;
  brandName?: string;
  brandSubtitle?: string;
  brandLogoUrl?: string;
  className?: string;
}

export function Sidebar({
  currentDashboardId,
  onSelectDashboard,
  brandName = 'Moove Digital',
  brandSubtitle = 'Design Library',
  brandLogoUrl,
  className,
}: SidebarProps) {
  const { currentTheme } = useTheme();

  const dashboards = [
    { id: 'business', label: 'Business Overview', icon: LayoutDashboard },
    { id: 'finance', label: 'Finance & Portfolio', icon: Wallet },
    { id: 'hr', label: 'HR & People Ops', icon: Users },
    { id: 'crm', label: 'CRM & Pipeline', icon: Layers },
    { id: 'healthcare', label: 'Healthcare & Hospital', icon: Stethoscope },
    { id: 'project-mgmt', label: 'Project Management', icon: FolderKanban },
    { id: 'real-estate', label: 'Real Estate Portfolio', icon: Building2 },
    { id: 'ecommerce', label: 'E-Commerce & Retail', icon: ShoppingBag },
    { id: 'education', label: 'Education & LMS', icon: GraduationCap },
    { id: 'marketing', label: 'Marketing & Growth', icon: Megaphone },
  ];

  return (
    <aside
      className={cn(
        'w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none overflow-y-auto transition-colors',
        className
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
          {brandLogoUrl ? (
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-white dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700 shadow-2xs shrink-0 flex items-center justify-center">
              <img
                src={brandLogoUrl}
                alt={brandName}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs shrink-0"
              style={{ backgroundColor: currentTheme.primaryColor }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-none truncate">{brandName}</h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1 truncate">{brandSubtitle}</p>
          </div>
        </div>

        {/* Dashboards Navigation */}
        <div className="px-3 py-4">
          <p className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            10 Reference Dashboards
          </p>
          <nav className="space-y-1">
            {dashboards.map((dash) => {
              const Icon = dash.icon;
              const isActive = currentDashboardId === dash.id;
              return (
                <button
                  key={dash.id}
                  onClick={() => onSelectDashboard?.(dash.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left group',
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                  )}
                  style={
                    isActive
                      ? {
                          backgroundColor: `${currentTheme.primaryColor}18`,
                          color: currentTheme.primaryColor,
                        }
                      : {}
                  }
                >
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-colors',
                      isActive ? 'text-current' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    )}
                  />
                  <span className="truncate">{dash.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Settings Section */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
          <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
          <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          <span>Help & Support</span>
        </button>
      </div>
    </aside>
  );
}
