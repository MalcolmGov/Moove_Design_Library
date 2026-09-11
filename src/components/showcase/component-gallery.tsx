import { useState } from 'react';
import { 
  DollarSign, 
  Check, 
  Copy, 
  Sparkles,
  Layers,
  BarChart3,
  Users
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { StatCard } from '../ui/stat-card';
import { SearchInput } from '../ui/input';
import { Avatar, AvatarGroup } from '../ui/avatar';
import { CircularGauge } from '../charts/circular-gauge';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { DonutChart } from '../charts/donut-chart';

export function ComponentGallery() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copySnippet = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(name);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Moove Component Library
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore production-ready atoms, molecules, metric cards, and data visualization primitives.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Stat & KPI Metric Cards
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">High-impact summary cards with trend pills and sparklines</p>
          </div>
          <button
            onClick={() => copySnippet('stat-card', `<StatCard\n  title="Total Revenue"\n  value="$78,945"\n  change="+12.5%"\n  trend="up"\n  timeframe="vs last month"\n  icon={<DollarSign className="w-5 h-5" />}\n/>`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {copiedSection === 'stat-card' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSection === 'stat-card' ? 'Copied Code!' : 'Copy React Code'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard
            title="Total Revenue"
            value="$78,945"
            change="+12.5%"
            trend="up"
            timeframe="vs last month"
            icon={<DollarSign className="w-5 h-5" />}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50 dark:bg-emerald-950/50"
          />
          <StatCard
            title="Total Customers"
            value="12,480"
            change="+8.2%"
            trend="up"
            timeframe="vs last month"
            icon={<Users className="w-5 h-5" />}
            iconColor="text-blue-600"
            iconBg="bg-blue-50 dark:bg-blue-950/50"
          />
          <StatCard
            variant="dark"
            title="Portfolio Value"
            value="$125,430"
            change="+12.6%"
            subtitle="Hero Dark Mode card variant"
            sparklineData={[30, 45, 40, 60, 55, 75, 80]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Buttons & Action Controls
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Accessible button variants with micro-interactions and loading states</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="soft">Soft Tinted</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Destructive Action</Button>
            <Button variant="primary" isLoading>Loading</Button>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Status Badges & Chips</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Pill badges with soft background tints for orders, tickets, and tasks</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success" dot>Delivered</Badge>
            <Badge variant="info" dot>Shipped</Badge>
            <Badge variant="warning" dot>In Progress</Badge>
            <Badge variant="danger" dot>Action Required</Badge>
            <Badge variant="purple" dot>Pro Member</Badge>
            <Badge variant="primary" dot>Moove Certified</Badge>
            <Badge variant="neutral">Draft</Badge>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Chart & Data Viz Primitives
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Custom high-performance SVG spline curves, donut charts, and gauges</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <AreaSplineChart
              title="Spline Area Trend"
              data={[
                { label: 'Jan', value: 20 },
                { label: 'Feb', value: 35 },
                { label: 'Mar', value: 30 },
                { label: 'Apr', value: 55 },
                { label: 'May', value: 65 },
                { label: 'Jun', value: 85 },
              ]}
              color="#6366f1"
              gradientId="demoSpline"
              height={160}
              filterOptions={[]}
            />
          </Card>

          <Card className="p-6">
            <DonutChart
              title="Donut Breakdown"
              data={[
                { label: 'Electronics', value: 45, color: '#3b82f6' },
                { label: 'Fashion', value: 30, color: '#10b981' },
                { label: 'Home', value: 25, color: '#f59e0b' },
              ]}
              centerValue="$78,945"
              centerLabel="Total"
              size={140}
              thickness={18}
              legendPosition="bottom"
            />
          </Card>

          <Card className="p-6 flex flex-col justify-between">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Circular Gauge</h4>
            <CircularGauge
              percentage={92}
              label="Present Rate"
              color="#10b981"
              size={120}
              strokeWidth={12}
            />
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Inputs & Avatars</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Form controls, command shortcuts, and avatar stack groupings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Search & Command Inputs</h4>
            <SearchInput placeholder="Quick search products, orders, customers..." />
            <SearchInput placeholder="Search teams or projects..." shortcut="⌘F" />
          </Card>

          <Card className="p-6 space-y-4">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Avatar Stack</h4>
            <div className="flex items-center gap-6">
              <AvatarGroup max={4}>
                <Avatar name="Sarah Khan" status="online" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" />
                <Avatar name="James Lee" status="online" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" />
                <Avatar name="Priya Sharma" status="busy" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" />
                <Avatar name="Daniel Kim" status="offline" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" />
              </AvatarGroup>
              <span className="text-xs text-slate-500 dark:text-slate-400">Active Collaborators</span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
