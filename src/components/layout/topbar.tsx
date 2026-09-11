import { Bell, ChevronDown, Calendar, Palette, Moon, Sun, Code2, Menu } from 'lucide-react';
import { SearchInput } from '../ui/input';
import { Avatar } from '../ui/avatar';
import { useTheme } from '../../lib/theme-context';

export interface TopbarProps {
  onOpenThemeDrawer?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenNotifications?: () => void;
  onOpenDateModal?: () => void;
  onOpenCodeDrawer?: () => void;
  onOpenMobileSidebar?: () => void;
  userName?: string;
  userRole?: string;
  currentDateRange?: string;
}

export function Topbar({
  onOpenThemeDrawer,
  onOpenCommandPalette,
  onOpenNotifications,
  onOpenDateModal,
  onOpenCodeDrawer,
  onOpenMobileSidebar,
  userName = 'Alex Mercer',
  userRole = 'Product Director',
  currentDateRange = 'Jun 1, 2025 - Jun 30, 2025',
}: TopbarProps) {
  const { currentTheme, isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 transition-colors">
      <div className="flex items-center gap-3 w-full max-w-md">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
          title="Open Dashboards Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Search Bar - Clicking triggers Command Palette */}
        <div className="w-full cursor-pointer" onClick={onOpenCommandPalette}>
          <SearchInput
            placeholder="Search... (⌘K)"
            readOnly
            onClick={onOpenCommandPalette}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Date Filter Pill - Clicking triggers Date Range Picker Popover */}
        <button
          onClick={onOpenDateModal}
          className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentDateRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* View Code Snippet Button */}
        {onOpenCodeDrawer && (
          <button
            onClick={onOpenCodeDrawer}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            title="Inspect & Copy React Code"
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Code</span>
          </button>
        )}

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme mode"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Client Theme Switcher Button */}
        <button
          onClick={onOpenThemeDrawer}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="Switch Client Theme"
        >
          <Palette className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="hidden sm:inline">{currentTheme.name}</span>
          <span
            className="w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-900"
            style={{ backgroundColor: currentTheme.primaryColor }}
          />
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
          <Avatar
            name={userName}
            size="sm"
            status="online"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Hi, {userName.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">{userRole}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
        </div>
      </div>
    </header>
  );
}
