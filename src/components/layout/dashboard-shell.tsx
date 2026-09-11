import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { ThemeDrawer } from '../showcase/theme-drawer';
import { CommandPalette } from './command-palette';
import { NotificationFlyout } from './notification-flyout';
import { DateRangePicker } from '../ui/date-range-picker';
import { CodeDrawer } from '../showcase/code-drawer';

export interface DashboardShellProps {
  currentDashboardId: string;
  onSelectDashboard: (id: string) => void;
  onSelectTab?: (tab: 'dashboards' | 'components' | 'tokens') => void;
  children: React.ReactNode;
}

const DASHBOARD_SNIPPETS: Record<string, { title: string; description: string; snippet: string }> = {
  business: {
    title: 'Business Overview Template',
    description: 'Executive dashboard with 4 metric cards, SVG spline area chart, category donut, and interactive DataTable.',
    snippet: `import { StatCard } from '@/components/ui/stat-card';
import { AreaSplineChart } from '@/components/charts/area-spline-chart';
import { DonutChart } from '@/components/charts/donut-chart';
import { DataTable } from '@/components/ui/data-table';

export function BusinessOverviewDashboard() {
  return (
    <div className="space-y-6">
      {/* 4 Ambient Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$78,945"
          change="+12.5%"
          trend="up"
          timeframe="vs last month"
          sparklineData={[16, 21, 19, 24, 22, 28]}
        />
        {/* ... */}
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AreaSplineChart data={splineData} color="#3b82f6" className="lg:col-span-2" />
        <DonutChart data={categorySegments} centerValue="$78,945" />
      </div>

      {/* Interactive Orders DataTable */}
      <DataTable
        title="Recent Orders"
        data={ordersData}
        columns={orderColumns}
        pageSize={5}
        filterTabs={statusTabs}
      />
    </div>
  );
}`,
  },
  finance: {
    title: 'Finance & Portfolio Template',
    description: 'FinTech dashboard with hero dark card, income vs expense spline, transaction log, and asset allocation.',
    snippet: `import { StatCard } from '@/components/ui/stat-card';
import { AreaSplineChart } from '@/components/charts/area-spline-chart';
import { DonutChart } from '@/components/charts/donut-chart';

export function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard variant="dark" title="Total Balance" value="$128,450.00" change="+14.2%" />
        <StatCard title="Monthly Income" value="$34,200.00" change="+8.5%" trend="up" />
        <StatCard title="Total Expenses" value="$12,840.00" change="-3.1%" trend="down" />
        <StatCard title="Investments" value="$81,410.00" change="+18.4%" trend="up" />
      </div>
      {/* Financial Analytics Grid */}
    </div>
  );
}`,
  },
  'project-mgmt': {
    title: 'Project Management & Sprint Board',
    description: 'Workflow management with team workload progress bars, sprint metrics, and interactive multi-stage Kanban board.',
    snippet: `import { ProgressBarGroup } from '@/components/charts/progress-bar-group';
import { DonutChart } from '@/components/charts/donut-chart';
import { KanbanBoard } from '@/components/ui/kanban-board';

export function ProjectManagementDashboard() {
  return (
    <div className="space-y-6">
      {/* Metric Cards & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProgressBarGroup items={projectProgress} title="Project Progress" />
        <DonutChart data={tasksByStatus} centerValue="62" />
      </div>

      {/* Interactive Multi-Column Kanban Board */}
      <KanbanBoard />
    </div>
  );
}`,
  },
};

export function DashboardShell({
  currentDashboardId,
  onSelectDashboard,
  onSelectTab,
  children,
}: DashboardShellProps) {
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [currentDateRange, setCurrentDateRange] = useState('Jun 1, 2025 - Jun 30, 2025');
  const [brandName, setBrandName] = useState('Moove Digital');
  const [brandLogoUrl, setBrandLogoUrl] = useState<string | undefined>(undefined);

  // Code inspection drawer state
  const [codeDrawerState, setCodeDrawerState] = useState<{
    isOpen: boolean;
    title: string;
    description?: string;
    snippet: string;
  }>({
    isOpen: false,
    title: '',
    snippet: '',
  });

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenCode = () => {
    const currentConfig = DASHBOARD_SNIPPETS[currentDashboardId] || {
      title: `${currentDashboardId.toUpperCase()} Dashboard`,
      description: 'Production React component utilizing Moove UI design tokens, charts, and layout components.',
      snippet: `// Component snippet for ${currentDashboardId} dashboard\nimport { Card, CardHeader, CardTitle } from '@/components/ui/card';\nimport { StatCard } from '@/components/ui/stat-card';\n\nexport default function Dashboard() {\n  return (\n    <div className="space-y-6">\n      {/* Dashboard Archetype Content */}\n    </div>\n  );\n}`,
    };

    setCodeDrawerState({
      isOpen: true,
      title: currentConfig.title,
      description: currentConfig.description,
      snippet: currentConfig.snippet,
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-50/70 dark:bg-slate-950 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        currentDashboardId={currentDashboardId}
        onSelectDashboard={onSelectDashboard}
        brandName={brandName}
        brandSubtitle="Design Library"
        brandLogoUrl={brandLogoUrl}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onOpenThemeDrawer={() => setIsThemeDrawerOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenDateModal={() => setIsDateModalOpen(true)}
          onOpenCodeDrawer={handleOpenCode}
          currentDateRange={currentDateRange}
        />
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>

      {/* Command Palette Overlay */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectDashboard={onSelectDashboard}
        onSelectTab={onSelectTab || (() => {})}
        onOpenThemeDrawer={() => setIsThemeDrawerOpen(true)}
      />

      {/* Notifications Flyout Drawer */}
      <NotificationFlyout
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Client Theme Switcher & Pitch Studio Drawer */}
      <ThemeDrawer
        isOpen={isThemeDrawerOpen}
        onClose={() => setIsThemeDrawerOpen(false)}
        brandName={brandName}
        brandLogoUrl={brandLogoUrl}
        onUpdateCustomBrand={(newName) => setBrandName(newName)}
        onUpdateBrandLogo={(newLogo) => setBrandLogoUrl(newLogo)}
      />

      {/* Date Range Picker Popover Modal */}
      <DateRangePicker
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        currentRange={currentDateRange}
        onSelectRange={(range) => setCurrentDateRange(range)}
      />

      {/* Code Snippet Inspection Drawer */}
      <CodeDrawer
        isOpen={codeDrawerState.isOpen}
        onClose={() => setCodeDrawerState((prev) => ({ ...prev, isOpen: false }))}
        title={codeDrawerState.title}
        description={codeDrawerState.description}
        snippet={codeDrawerState.snippet}
      />
    </div>
  );
}
