import { UserCheck, Users, Target, DollarSign } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { DonutChart } from '../charts/donut-chart';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Avatar } from '../ui/avatar';

export function CRMDashboard() {
  const pipelineStages = [
    { label: 'New Leads', count: 1240, width: '100%', color: '#34d399' },
    { label: 'Qualified', count: 892, width: '72%', color: '#10b981' },
    { label: 'Proposal', count: 540, width: '45%', color: '#059669' },
    { label: 'Negotiation', count: 310, width: '28%', color: '#047857' },
    { label: 'Closed Won', count: 208, width: '18%', color: '#064e3b' },
  ];

  const dealSegments = [
    { label: 'New Leads', value: 28, color: '#10b981' },
    { label: 'Qualified', value: 25, color: '#34d399' },
    { label: 'Proposal', value: 20, color: '#3b82f6' },
    { label: 'Negotiation', value: 15, color: '#f59e0b' },
    { label: 'Closed Won', value: 12, color: '#047857' },
  ];

  const customerAcquisition = [
    { label: 'Jan', value: 250 },
    { label: 'Feb', value: 380 },
    { label: 'Mar', value: 320 },
    { label: 'Apr', value: 500 },
    { label: 'May', value: 480 },
    { label: 'Jun', value: 720 },
  ];

  const upcomingTasks = [
    { title: 'Follow up with Sarah Khan', company: 'Acme Inc.', time: '10:00 AM', date: '10 Jun' },
    { title: 'Product demo with BetaTech', company: 'Online Meeting', time: '02:00 PM', date: '11 Jun' },
    { title: 'Send proposal to James Lee', company: 'Nova Solutions', time: '11:30 AM', date: '12 Jun' },
    { title: 'Call with marketing team', company: 'Internal', time: '04:00 PM', date: '13 Jun' },
  ];

  const recentMessages = [
    { sender: 'Sarah Khan', text: 'Thanks for the demo! Can you share...', time: '10:24 AM', online: true },
    { sender: 'James Lee', text: 'Looks good. Let’s move to the next...', time: 'Yesterday', online: true },
    { sender: 'Priya Sharma', text: 'When can we schedule the final call?', time: 'Yesterday', online: false },
    { sender: 'Daniel Kim', text: 'Great! Looking forward to it.', time: 'Jun 8', online: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's your CRM overview"
        description="Manage your leads, track deals and build lasting customer relationships."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Leads"
          value="4,320"
          change="+18.3%"
          trend="up"
          timeframe="vs last month"
          icon={<Target className="w-5 h-5" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
        />
        <StatCard
          title="Total Contacts"
          value="2,856"
          change="+12.6%"
          trend="up"
          timeframe="vs last month"
          icon={<Users className="w-5 h-5" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/50"
        />
        <StatCard
          title="Total Customers"
          value="1,024"
          change="+20.1%"
          trend="up"
          timeframe="vs last month"
          icon={<UserCheck className="w-5 h-5" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-950/50"
        />
        <StatCard
          title="Total Revenue"
          value="$98,430"
          change="+27.4%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <span className="text-xs text-slate-400 font-medium">This Month ▾</span>
          </CardHeader>
          <div className="space-y-3 mt-4">
            {pipelineStages.map((stage, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-24 text-xs font-medium text-slate-600 dark:text-slate-400">{stage.label}</span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-6 rounded-xl overflow-hidden relative">
                  <div
                    className="h-full rounded-xl transition-all duration-500"
                    style={{ width: stage.width, backgroundColor: stage.color }}
                  />
                </div>
                <span className="w-14 text-right text-xs font-bold text-slate-800 dark:text-slate-100">
                  {stage.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <DonutChart
            data={dealSegments}
            centerValue="540"
            centerLabel="Active Deals"
            title="Deal Stages"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Customer Acquisition</CardTitle>
            <span className="text-xs text-slate-400 font-medium">This Month ▾</span>
          </CardHeader>
          <AreaSplineChart
            data={customerAcquisition}
            color="#10b981"
            gradientId="crmSpline"
            valuePrefix=""
            valueSuffix=" leads"
            filterOptions={[]}
          />
        </Card>

        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Upcoming Tasks & Calendar</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {upcomingTasks.map((task, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs py-1 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none">{task.date.split(' ')[0]}</span>
                  <span className="text-[9px] text-slate-400 uppercase">{task.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{task.title}</p>
                  <p className="text-[10px] text-slate-400">{task.company}</p>
                </div>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 shrink-0">{task.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Recent Messages</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {recentMessages.map((msg, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs py-1.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <Avatar name={msg.sender} size="xs" status={msg.online ? 'online' : 'offline'} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">{msg.sender}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">{msg.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
