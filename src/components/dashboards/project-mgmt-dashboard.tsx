import { FolderKanban, CheckCircle2, ListTodo, Clock } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { DonutChart } from '../charts/donut-chart';
import { ProgressBarGroup } from '../charts/progress-bar-group';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { KanbanBoard } from '../ui/kanban-board';

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
          icon={<FolderKanban className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-orange-600 dark:text-orange-400"
          iconBg="bg-gradient-to-br from-orange-50 to-orange-100/70 border-orange-200/80 dark:from-orange-950/60 dark:to-orange-900/30 dark:border-orange-800/80"
          glowColor="from-orange-500/20 dark:from-orange-500/25"
          sparklineData={[8, 9, 10, 11, 12]}
        />
        <StatCard
          title="Active Tasks"
          value="48"
          change="+12%"
          trend="up"
          timeframe="vs last month"
          icon={<ListTodo className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200/80 dark:from-blue-950/60 dark:to-blue-900/30 dark:border-blue-800/80"
          glowColor="from-blue-500/20 dark:from-blue-500/25"
          sparklineData={[38, 42, 44, 46, 48]}
        />
        <StatCard
          title="Completed Tasks"
          value="36"
          change="+28%"
          trend="up"
          timeframe="vs last month"
          icon={<CheckCircle2 className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 dark:from-emerald-950/60 dark:to-emerald-900/30 dark:border-emerald-800/80"
          glowColor="from-emerald-500/20 dark:from-emerald-500/25"
          sparklineData={[24, 28, 30, 33, 36]}
        />
        <StatCard
          title="Upcoming Deadlines"
          value="5"
          change="-17%"
          trend="down"
          timeframe="vs last month"
          icon={<Clock className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-rose-600 dark:text-rose-400"
          iconBg="bg-gradient-to-br from-rose-50 to-rose-100/70 border-rose-200/80 dark:from-rose-950/60 dark:to-rose-900/30 dark:border-rose-800/80"
          glowColor="from-rose-500/20 dark:from-rose-500/25"
          sparklineData={[8, 7, 6, 6, 5]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <ProgressBarGroup items={projectProgress} title="Project Progress" />
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader className="mb-2">
              <CardTitle>Sprint Overview</CardTitle>
              <span className="text-xs text-slate-400 font-semibold">Sprint 14 ▾</span>
            </CardHeader>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Jun 10, 2025 - Jun 24, 2025</span>
              <span className="font-extrabold text-indigo-600 dark:text-indigo-400">8 days left</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden mb-4 border border-slate-200/50 dark:border-slate-700/50">
              <div className="h-full rounded-full bg-indigo-600 shadow-sm" style={{ width: '68%' }} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">To Do</span>
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">18</span>
            </div>
            <div className="bg-blue-50/70 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200/60 dark:border-blue-800/60">
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block uppercase">Active</span>
              <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300">14</span>
            </div>
            <div className="bg-amber-50/70 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-800/60">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block uppercase">Review</span>
              <span className="text-sm font-extrabold text-amber-700 dark:text-amber-300">8</span>
            </div>
            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block uppercase">Done</span>
              <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">22</span>
            </div>
          </div>
        </Card>

        <Card>
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
        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Team Workload</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Capacity →</span>
          </CardHeader>
          <div className="space-y-4">
            {teamWorkload.map((member, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Avatar src={member.avatar} name={member.name} size="xs" />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white">{member.capacity}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-200/40 dark:border-slate-700/40">
                  <div
                    className="h-full rounded-full transition-all duration-500 shadow-xs"
                    style={{ width: member.capacity, backgroundColor: member.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Upcoming Deadlines</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Calendar view →</span>
          </CardHeader>
          <div className="space-y-3">
            {upcomingDeadlines.map((dl, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                    <span className="text-[9px] text-slate-400 font-bold uppercase leading-none">{dl.date.split(' ')[0]}</span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{dl.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">{dl.title}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{dl.project}</p>
                  </div>
                </div>
                <Badge variant="warning" size="sm" dot>
                  {dl.daysLeft}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 4: Interactive Kanban Board */}
      <div className="pt-2">
        <KanbanBoard />
      </div>
    </div>
  );
}
