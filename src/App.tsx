import { useState } from 'react';
import { ThemeProvider } from './lib/theme-context';
import { DashboardShell } from './components/layout/dashboard-shell';
import { BusinessOverviewDashboard } from './components/dashboards/business-overview';
import { FinanceDashboard } from './components/dashboards/finance-dashboard';
import { HRDashboard } from './components/dashboards/hr-dashboard';
import { CRMDashboard } from './components/dashboards/crm-dashboard';
import { HealthcareDashboard } from './components/dashboards/healthcare-dashboard';
import { ProjectManagementDashboard } from './components/dashboards/project-mgmt-dashboard';
import { RealEstateDashboard } from './components/dashboards/real-estate-dashboard';
import { EcommerceDashboard } from './components/dashboards/ecommerce-dashboard';
import { EducationDashboard } from './components/dashboards/education-dashboard';
import { MarketingDashboard } from './components/dashboards/marketing-dashboard';
import { ComponentGallery } from './components/showcase/component-gallery';
import { TokenGuide } from './components/showcase/token-guide';
import { LayoutDashboard, Sparkles, BookOpen } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboards' | 'components' | 'tokens'>('dashboards');
  const [currentDashboardId, setCurrentDashboardId] = useState<string>('business');

  const renderDashboard = () => {
    switch (currentDashboardId) {
      case 'business':
        return <BusinessOverviewDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'hr':
        return <HRDashboard />;
      case 'crm':
        return <CRMDashboard />;
      case 'healthcare':
        return <HealthcareDashboard />;
      case 'project-mgmt':
        return <ProjectManagementDashboard />;
      case 'real-estate':
        return <RealEstateDashboard />;
      case 'ecommerce':
        return <EcommerceDashboard />;
      case 'education':
        return <EducationDashboard />;
      case 'marketing':
        return <MarketingDashboard />;
      default:
        return <BusinessOverviewDashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        {/* Top App Mode Navigation Bar */}
        <div className="bg-slate-900 text-white px-6 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs select-none sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white text-xs">
              M
            </div>
            <span className="font-bold tracking-tight text-slate-100">Moove Digital Design Library</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">10 Reference Dashboards & Component System</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('dashboards')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'dashboards'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>10 Dashboards</span>
            </button>

            <button
              onClick={() => setActiveTab('components')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'components'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Components</span>
            </button>

            <button
              onClick={() => setActiveTab('tokens')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'tokens'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tokens & Architecture</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content Views */}
        {activeTab === 'dashboards' ? (
          <DashboardShell
            currentDashboardId={currentDashboardId}
            onSelectDashboard={(id) => setCurrentDashboardId(id)}
          >
            {renderDashboard()}
          </DashboardShell>
        ) : (
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            {activeTab === 'components' ? <ComponentGallery /> : <TokenGuide />}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
