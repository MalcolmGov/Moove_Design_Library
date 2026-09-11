import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { ThemeDrawer } from '../showcase/theme-drawer';

export interface DashboardShellProps {
  currentDashboardId: string;
  onSelectDashboard: (id: string) => void;
  children: React.ReactNode;
}

export function DashboardShell({
  currentDashboardId,
  onSelectDashboard,
  children,
}: DashboardShellProps) {
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50/70 dark:bg-slate-950 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        currentDashboardId={currentDashboardId}
        onSelectDashboard={onSelectDashboard}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenThemeDrawer={() => setIsThemeDrawerOpen(true)} />
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>

      {/* Client Theme Switcher Drawer */}
      <ThemeDrawer
        isOpen={isThemeDrawerOpen}
        onClose={() => setIsThemeDrawerOpen(false)}
      />
    </div>
  );
}
