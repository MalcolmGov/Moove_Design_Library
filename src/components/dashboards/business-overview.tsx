import { DollarSign, Users, ShoppingBag, BarChart3, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { DonutChart } from '../charts/donut-chart';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { Card, CardHeader, CardTitle } from '../ui/card';

export function BusinessOverviewDashboard() {
  const splineData = [
    { label: 'Jan', value: 16000 },
    { label: 'Feb', value: 21000 },
    { label: 'Mar', value: 19500 },
    { label: 'Apr', value: 24000 },
    { label: 'May', value: 22000 },
    { label: 'Jun', value: 28430 },
    { label: 'Jul', value: 23000 },
    { label: 'Aug', value: 25000 },
    { label: 'Sep', value: 22500 },
    { label: 'Oct', value: 27000 },
    { label: 'Nov', value: 26000 },
    { label: 'Dec', value: 31000 },
  ];

  const categorySegments = [
    { label: 'Electronics', value: 30000, color: '#3b82f6' },
    { label: 'Fashion', value: 18945, color: '#06b6d4' },
    { label: 'Home & Living', value: 12630, color: '#10b981' },
    { label: 'Beauty', value: 17370, color: '#8b5cf6' },
  ];

  const recentOrders = [
    {
      id: '#10421',
      customer: 'Sarah Khan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
      product: 'Wireless Headphones',
      amount: '$129.00',
      status: 'Delivered' as const,
    },
    {
      id: '#10420',
      customer: 'James Lee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      product: 'Smart Watch',
      amount: '$249.00',
      status: 'Shipped' as const,
    },
    {
      id: '#10419',
      customer: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      product: 'Minimal Backpack',
      amount: '$89.00',
      status: 'Processing' as const,
    },
    {
      id: '#10418',
      customer: 'Daniel Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
      product: 'Running Shoes',
      amount: '$120.00',
      status: 'Delivered' as const,
    },
    {
      id: '#10417',
      customer: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
      product: 'Leather Wallet',
      amount: '$59.00',
      status: 'Shipped' as const,
    },
  ];

  const topMarkets = [
    { country: 'United States', code: 'US', revenue: '$28,430', growth: '+14.2%' },
    { country: 'United Kingdom', code: 'UK', revenue: '$12,940', growth: '+9.5%' },
    { country: 'Canada', code: 'CA', revenue: '$8,420', growth: '+5.1%' },
    { country: 'Australia', code: 'AU', revenue: '$6,890', growth: '+7.8%' },
    { country: 'Germany', code: 'DE', revenue: '$5,230', growth: '+4.3%' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's your business overview"
        description="Track your sales, users and growth in real-time."
      />

      {/* Row 1: 4 Polished Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$78,945"
          change="+12.5%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 dark:from-emerald-950/60 dark:to-emerald-900/30 dark:border-emerald-800/80"
          glowColor="from-emerald-500/20 dark:from-emerald-500/25"
          sparklineData={[16, 21, 19, 24, 22, 28]}
        />
        <StatCard
          title="Total Customers"
          value="12,480"
          change="+8.2%"
          trend="up"
          timeframe="vs last month"
          icon={<Users className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200/80 dark:from-blue-950/60 dark:to-blue-900/30 dark:border-blue-800/80"
          glowColor="from-blue-500/20 dark:from-blue-500/25"
          sparklineData={[8, 10, 9, 11, 11.5, 12.4]}
        />
        <StatCard
          title="Total Orders"
          value="2,941"
          change="+14.6%"
          trend="up"
          timeframe="vs last month"
          icon={<ShoppingBag className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-gradient-to-br from-amber-50 to-amber-100/70 border-amber-200/80 dark:from-amber-950/60 dark:to-amber-900/30 dark:border-amber-800/80"
          glowColor="from-amber-500/20 dark:from-amber-500/25"
          sparklineData={[18, 20, 22, 25, 27, 29]}
        />
        <StatCard
          title="Conversion Rate"
          value="4.8%"
          change="+0.9%"
          trend="up"
          timeframe="vs last month"
          icon={<BarChart3 className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-gradient-to-br from-purple-50 to-purple-100/70 border-purple-200/80 dark:from-purple-950/60 dark:to-purple-900/30 dark:border-purple-800/80"
          glowColor="from-purple-500/20 dark:from-purple-500/25"
          sparklineData={[3.8, 4.0, 4.2, 4.1, 4.5, 4.8]}
        />
      </div>

      {/* Row 2: Revenue Chart & Category Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Revenue Overview</h3>
                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" /> +28.4%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Monthly revenue trends across all channels</p>
            </div>
          </div>
          <AreaSplineChart data={splineData} color="#3b82f6" gradientId="bizSpline" />
        </Card>

        <Card>
          <DonutChart
            data={categorySegments}
            centerValue="$78,945"
            centerLabel="Total Sales"
            title="Sales by Category"
          />
        </Card>
      </div>

      {/* Row 3: Recent Orders Table & Top Markets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="mb-3">
            <CardTitle>Recent Orders</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-bold">
              View all orders →
            </span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800/80">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 font-semibold text-slate-700 dark:text-slate-300">{order.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={order.avatar} name={order.customer} size="xs" />
                        <span className="font-bold text-slate-900 dark:text-white">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-400 font-medium">{order.product}</td>
                    <td className="py-3 font-extrabold text-slate-900 dark:text-white">{order.amount}</td>
                    <td className="py-3 text-right">
                      <Badge
                        variant={
                          order.status === 'Delivered'
                            ? 'success'
                            : order.status === 'Shipped'
                            ? 'info'
                            : 'warning'
                        }
                        size="sm"
                        dot
                      >
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Markets */}
        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Top Markets</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-bold">
              Details
            </span>
          </CardHeader>
          <div className="space-y-3.5">
            {topMarkets.map((market, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-[10px] flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                    {market.code}
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{market.country}</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{market.growth}</p>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 dark:text-white">{market.revenue}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
