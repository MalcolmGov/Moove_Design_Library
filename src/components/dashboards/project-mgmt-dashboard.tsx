import { FolderKanban, CheckCircle2, ListTodo, Clock } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { DonutChart } from '../charts/donut-chart';
import { ProgressBarGroup } from '../charts/progress-bar-group';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function ProjectManagementDashboard() {
  const projectProgress = [
    { label: 'Website Redesign', value: 78, color: '#3b82f6' },
    { label: 'Mobile App v2.0', value: 62, color: '#f59e0b' },
    { label: 'Brand Campaign', value: 45, color: '#ec4899' },
    { label: 'Internal Tools', value: 88, color: '#10b981' },
  ];

  const tasksByStatus = [
    { label: 'To Do', value: 18, color: '#94a3b8' },
    { label: 'In Progress', value: 14, color: '#3b82f6' },
    { label: 'Review', value: 8, color: '#f59e0b' },
    { label: 'Completed', value: 22, color: '#10b981' },
  ];

  const teamWorkload = [
    { name: 'Sarah Khan', role: 'UI/UX Designer', capacity: '85%', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80', color: '#f59e0b' },
    { name: 'James Lee', role: 'Frontend Lead', capacity: '72%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80', color: '#3b82f6' },
    { name: 'Priya Sharma', role: 'Product Manager', capacity: '52%', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80', color: '#10b981' },
    { name: 'Daniel Kim', role: 'Backend Engineer', capacity: '76%', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80', color: '#8b5cf6' },
  ];

  const upcomingDeadlines = [
    { title: 'Homepage Design', project: 'Website Redesign', daysLeft: '3 days left', date: 'Jun 12' },
    { title: 'API Integration', project: 'Mobile App v2.0', daysLeft: '6 days left', date: 'Jun 15' },
    { title: 'Brand Assets Delivery', project: 'Brand Campaign', daysLeft: '9 days left', date: 'Jun 18' },
    { title: 'User Testing Report', project: 'Internal Tools', daysLeft: '15 days left', date: 'Jun 24' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's what's happening with your projects."
        description="Stay on track, meet deadlines, and build amazing things together."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Projects"
          value="12"
          change="+20%"
          trend="up"
          timeframe="vs last month"
          icon={<FolderKanban className="w-5 h-5" />}
          iconColor="text-orange-600 dark:text-orange-400"
          iconBg="bg-orange-50 dark:bg-orange-950/50"
        />
        <StatCard
          title="Active Tasks"
          value="48"
          change="+12%"
          trend="up"
          timeframe="vs last month"
          icon={<ListTodo className="w-5 h-5" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/50"
        />
        <StatCard
          title="Completed Tasks"
          value="36"
          change="+28%"
          trend="up"
          timeframe="vs last month"
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
        />
        <StatCard
          title="Upcoming Deadlines"
          value="5"
          change="-17%"
          trend="down"
          timeframe="vs last month"
          icon={<Clock className="w-5 h-5" />}
          iconColor="text-rose-600 dark:text-rose-400"
          iconBg="bg-rose-50 dark:bg-rose-950/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <ProgressBarGroup items={projectProgress} title="Project Progress" />
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <CardHeader className="mb-2">
              <CardTitle>Sprint Overview</CardTitle>
              <span className="text-xs text-slate-400">Sprint 12 ▾</span>
            </CardHeader>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Jun 10, 2025 - Jun 24, 2025</span>
              <span className="font-bold text-indigo-600">8 days left</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden mb-4">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: '68%' }} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block">To Do</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100">18</span>
            </div>
            <div className="bg-blue-50/70 dark:bg-blue-950/40 p-2 rounded-xl">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 block">In Progress</span>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300">14</span>
            </div>
            <div className="bg-amber-50/70 dark:bg-amber-950/40 p-2 rounded-xl">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 block">Review</span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-300">8</span>
            </div>
            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-2 rounded-xl">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Done</span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">22</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <DonutChart
            data={tasksByStatus}
            centerValue="62"
            centerLabel="Total Tasks"
            title="Tasks by Status"
            legendPosition="bottom"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Team Workload</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-4">
            {teamWorkload.map((member, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={member.avatar} name={member.name} size="xs" />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{member.name}</p>
                      <p className="text-[10px] text-slate-400">{member.role}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{member.capacity}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: member.capacity, backgroundColor: member.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {upcomingDeadlines.map((dl, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[9px] text-slate-400 uppercase leading-none">{dl.date.split(' ')[0]}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{dl.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-100">{dl.title}</h5>
                    <p className="text-[10px] text-slate-400">{dl.project}</p>
                  </div>
                </div>
                <Badge variant="warning" size="sm">
                  {dl.daysLeft}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
