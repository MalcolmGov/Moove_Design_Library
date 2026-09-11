import { Users, Briefcase, UserPlus, Zap } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { FunnelChart } from '../charts/funnel-chart';
import { CircularGauge } from '../charts/circular-gauge';
import { DonutChart } from '../charts/donut-chart';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function HRDashboard() {
  const hiringFunnel = [
    { label: 'Applications', value: 1240, color: '#34d399' },
    { label: 'Screened', value: 420, color: '#10b981' },
    { label: 'Interviews', value: 128, color: '#059669' },
    { label: 'Offers', value: 36, color: '#047857' },
    { label: 'Hired', value: 12, color: '#064e3b' },
  ];

  const departmentSegments = [
    { label: 'Engineering', value: 70, color: '#6366f1' },
    { label: 'Marketing', value: 45, color: '#ec4899' },
    { label: 'Product', value: 40, color: '#06b6d4' },
    { label: 'Sales', value: 35, color: '#10b981' },
    { label: 'HR & Ops', value: 58, color: '#f59e0b' },
  ];

  const upcomingInterviews = [
    { name: 'Ayesha Malik', role: 'Frontend Developer', date: 'Jun 3, 2025 • 10:00 AM', status: 'Interview', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' },
    { name: 'Daniel Park', role: 'Product Designer', date: 'Jun 3, 2025 • 02:00 PM', status: 'Interview', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
    { name: 'Priya Mehta', role: 'Marketing Specialist', date: 'Jun 4, 2025 • 11:30 AM', status: 'Screening', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
    { name: 'Liam Carter', role: 'Data Analyst', date: 'Jun 4, 2025 • 03:00 PM', status: 'Interview', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
  ];

  const onboardingTracker = [
    { name: 'Noah Wilson', role: 'UX Designer', progress: 85, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80' },
    { name: 'Zara Ali', role: 'HR Associate', progress: 70, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80' },
    { name: 'Ethan Brooks', role: 'DevOps Engineer', progress: 40, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80' },
    { name: 'Maya Singh', role: 'Content Writer', progress: 20, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80' },
  ];

  const workforceTrend = [
    { label: 'Jan', value: 200 },
    { label: 'Feb', value: 210 },
    { label: 'Mar', value: 215 },
    { label: 'Apr', value: 228 },
    { label: 'May', value: 236 },
    { label: 'Jun', value: 248 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's your HR overview"
        description="Build amazing teams, track hiring pipeline, and create better workplaces."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Employees"
          value="248"
          change="+6.4%"
          trend="up"
          timeframe="vs last month"
          icon={<Users className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 dark:from-emerald-950/60 dark:to-emerald-900/30 dark:border-emerald-800/80"
          glowColor="from-emerald-500/20 dark:from-emerald-500/25"
          sparklineData={[220, 228, 234, 240, 248]}
        />
        <StatCard
          title="Open Roles"
          value="18"
          change="+28.6%"
          trend="up"
          timeframe="vs last month"
          icon={<Briefcase className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200/80 dark:from-blue-950/60 dark:to-blue-900/30 dark:border-blue-800/80"
          glowColor="from-blue-500/20 dark:from-blue-500/25"
          sparklineData={[12, 14, 15, 16, 18]}
        />
        <StatCard
          title="New Hires"
          value="12"
          change="+33.3%"
          trend="up"
          timeframe="vs last month"
          icon={<UserPlus className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-teal-600 dark:text-teal-400"
          iconBg="bg-gradient-to-br from-teal-50 to-teal-100/70 border-teal-200/80 dark:from-teal-950/60 dark:to-teal-900/30 dark:border-teal-800/80"
          glowColor="from-teal-500/20 dark:from-teal-500/25"
          sparklineData={[6, 8, 9, 10, 12]}
        />
        <StatCard
          title="Engagement Score"
          value="8.6"
          change="+4.9%"
          trend="up"
          timeframe="vs last quarter"
          icon={<Zap className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-gradient-to-br from-purple-50 to-purple-100/70 border-purple-200/80 dark:from-purple-950/60 dark:to-purple-900/30 dark:border-purple-800/80"
          glowColor="from-purple-500/20 dark:from-purple-500/25"
          sparklineData={[8.0, 8.2, 8.3, 8.5, 8.6]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <FunnelChart stages={hiringFunnel} title="Hiring Funnel" />
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader className="mb-2">
            <CardTitle>Attendance Summary</CardTitle>
            <span className="text-xs text-slate-400 font-semibold">This Month</span>
          </CardHeader>
          <CircularGauge
            percentage={92}
            label="Present Rate"
            color="#10b981"
            secondaryStats={[
              { label: 'Present', value: '92%', color: '#10b981' },
              { label: 'Late', value: '5%', color: '#f59e0b' },
              { label: 'Absent', value: '3%', color: '#ef4444' },
            ]}
          />
        </Card>

        <Card>
          <DonutChart
            data={departmentSegments}
            centerValue="248"
            centerLabel="Employees"
            title="Employees by Department"
            legendPosition="bottom"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Upcoming Interviews</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {upcomingInterviews.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Avatar src={item.avatar} name={item.name} size="xs" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={item.status === 'Interview' ? 'info' : 'primary'} size="sm">
                    {item.status}
                  </Badge>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{item.date.split('•')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Onboarding Tracker</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Cohort view →</span>
          </CardHeader>
          <div className="space-y-3.5">
            {onboardingTracker.map((person, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar src={person.avatar} name={person.name} size="xs" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">{person.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{person.role}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white">{person.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${person.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Workforce Analytics</h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">+18% Employee Growth</p>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Last 6 Months</span>
          </div>
          <AreaSplineChart
            data={workforceTrend}
            color="#10b981"
            gradientId="hrSpline"
            valuePrefix=""
            valueSuffix=" staff"
            filterOptions={[]}
          />
        </Card>
      </div>
    </div>
  );
}
