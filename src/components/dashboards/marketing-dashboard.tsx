import { Megaphone, DollarSign, Eye, MousePointerClick, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { DonutChart } from '../charts/donut-chart';
import { CircularGauge } from '../charts/circular-gauge';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function MarketingDashboard() {
  const performanceTrend = [
    { label: 'Jun 1', value: 18000 },
    { label: 'Jun 5', value: 24000 },
    { label: 'Jun 10', value: 22000 },
    { label: 'Jun 15', value: 48320 },
    { label: 'Jun 20', value: 36000 },
    { label: 'Jun 25', value: 42000 },
    { label: 'Jun 30', value: 46000 },
  ];

  const trafficSources = [
    { label: 'Organic Search', value: 32, color: '#6366f1' },
    { label: 'Social Media', value: 24, color: '#ec4899' },
    { label: 'Paid Ads', value: 20, color: '#f59e0b' },
    { label: 'Direct', value: 12, color: '#10b981' },
    { label: 'Referral', value: 8, color: '#06b6d4' },
    { label: 'Email', value: 4, color: '#8b5cf6' },
  ];

  const channels = [
    { name: 'Instagram', followers: '42,320', growth: '+22%', color: '#ec4899' },
    { name: 'Facebook', followers: '28,450', growth: '+16%', color: '#3b82f6' },
    { name: 'TikTok', followers: '18,920', growth: '+35%', color: '#000000' },
    { name: 'LinkedIn', followers: '9,840', growth: '+12%', color: '#0077b5' },
    { name: 'YouTube', followers: '7,230', growth: '+9%', color: '#ff0000' },
    { name: 'X (Twitter)', followers: '4,890', growth: '+6%', color: '#475569' },
  ];

  const contentCalendar = [
    { day: 'Mon', date: 'Jun 16', title: 'Product Launch Carousel', channel: 'Instagram', status: 'Scheduled' },
    { day: 'Tue', date: 'Jun 17', title: 'Behind the Scenes Video', channel: 'TikTok', status: 'In Progress' },
    { day: 'Wed', date: 'Jun 18', title: 'Industry Insights Article', channel: 'LinkedIn', status: 'Scheduled' },
    { day: 'Thu', date: 'Jun 19', title: 'Customer Story Video', channel: 'YouTube', status: 'Draft' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's how your marketing is performing."
        description="Track campaigns, audience growth and ROI — all in one place."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Campaigns"
          value="24"
          change="+33%"
          trend="up"
          timeframe="vs last month"
          icon={<Megaphone className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-pink-600 dark:text-pink-400"
          iconBg="bg-gradient-to-br from-pink-50 to-pink-100/70 border-pink-200/80 dark:from-pink-950/60 dark:to-pink-900/30 dark:border-pink-800/80"
          glowColor="from-pink-500/20 dark:from-pink-500/25"
          sparklineData={[16, 18, 20, 22, 24]}
        />
        <StatCard
          title="Ad Spend"
          value="$4,850"
          change="+12.5%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-gradient-to-br from-indigo-50 to-indigo-100/70 border-indigo-200/80 dark:from-indigo-950/60 dark:to-indigo-900/30 dark:border-indigo-800/80"
          glowColor="from-indigo-500/20 dark:from-indigo-500/25"
          sparklineData={[4100, 4300, 4500, 4700, 4850]}
        />
        <StatCard
          title="Impressions"
          value="287,430"
          change="+28.1%"
          trend="up"
          timeframe="vs last month"
          icon={<Eye className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200/80 dark:from-blue-950/60 dark:to-blue-900/30 dark:border-blue-800/80"
          glowColor="from-blue-500/20 dark:from-blue-500/25"
          sparklineData={[210, 230, 250, 270, 287.4]}
        />
        <StatCard
          title="Click-Through Rate"
          value="3.6%"
          change="+0.8%"
          trend="up"
          timeframe="vs last month"
          icon={<MousePointerClick className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-gradient-to-br from-purple-50 to-purple-100/70 border-purple-200/80 dark:from-purple-950/60 dark:to-purple-900/30 dark:border-purple-800/80"
          glowColor="from-purple-500/20 dark:from-purple-500/25"
          sparklineData={[2.7, 2.9, 3.1, 3.4, 3.6]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Performance Overview</CardTitle>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
                  <ArrowUpRight className="inline w-3.5 h-3.5 stroke-[2.5]" /> +28.1% Reach
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Clicks, impressions and conversion trends</p>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Last 30 Days ▾</span>
          </CardHeader>
          <AreaSplineChart
            data={performanceTrend}
            color="#ec4899"
            gradientId="mktSpline"
            valuePrefix=""
            valueSuffix=" views"
            filterOptions={[]}
          />
        </Card>

        <Card>
          <DonutChart
            data={trafficSources}
            centerValue="287,430"
            centerLabel="Total Visitors"
            title="Traffic Sources"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Channel Comparison</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Channels →</span>
          </CardHeader>
          <div className="space-y-3">
            {channels.map((ch, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 shadow-xs" style={{ backgroundColor: ch.color }} />
                  <span className="font-bold text-slate-900 dark:text-white">{ch.name}</span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 dark:text-white">{ch.followers}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{ch.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader className="mb-2">
            <CardTitle>ROI Overview</CardTitle>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
              +62% Higher ROI
            </span>
          </CardHeader>
          <div className="flex flex-col items-center">
            <CircularGauge
              percentage={320}
              label="Return on Ad Spend"
              color="#ec4899"
              size={130}
              strokeWidth={12}
            />
            <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 w-full text-center">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Spend</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">$4,850</span>
              </div>
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block uppercase">Revenue</span>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">$20,320</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Content Calendar</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Planner →</span>
          </CardHeader>
          <div className="space-y-3">
            {contentCalendar.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-100">{item.title}</h5>
                  <p className="text-[10px] text-slate-400 font-medium">{item.day} {item.date} • {item.channel}</p>
                </div>
                <Badge variant={item.status === 'Scheduled' ? 'success' : item.status === 'In Progress' ? 'info' : 'neutral'} size="sm" dot>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
