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

      {/* Row 1: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$78,945"
          change="+12.5%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Total Customers"
          value="12,480"
          change="+8.2%"
          trend="up"
          timeframe="vs last month"
          icon={<Users className="w-5 h-5" />}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Total Orders"
          value="2,941"
          change="+14.6%"
          trend="up"
          timeframe="vs last month"
          icon={<ShoppingBag className="w-5 h-5" />}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Conversion Rate"
          value="4.8%"
          change="+0.9%"
          trend="up"
          timeframe="vs last month"
          icon={<BarChart3 className="w-5 h-5" />}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
      </div>

      {/* Row 2: Revenue Chart & Category Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">Revenue Overview</h3>
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" /> +28.4%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Monthly revenue trends across all channels</p>
            </div>
          </div>
          <AreaSplineChart data={splineData} color="#3b82f6" gradientId="bizSpline" />
        </Card>

        <Card className="p-6">
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
        <Card className="lg:col-span-2 p-6">
          <CardHeader className="mb-3">
            <CardTitle>Recent Orders</CardTitle>
            <span className="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
              View all
            </span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Product</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 font-medium text-slate-600">{order.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar src={order.avatar} name={order.customer} size="xs" />
                        <span className="font-semibold text-slate-800">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-600">{order.product}</td>
                    <td className="py-3 font-bold text-slate-800">{order.amount}</td>
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
        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Top Markets</CardTitle>
            <span className="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
              Details
            </span>
          </CardHeader>
          <div className="space-y-3.5">
            {topMarkets.map((market, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                    {market.code}
                  </span>
                  <div>
                    <p className="font-medium text-slate-800">{market.country}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">{market.growth}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-900">{market.revenue}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
