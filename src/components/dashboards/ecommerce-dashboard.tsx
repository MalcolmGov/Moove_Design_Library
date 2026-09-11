import { ShoppingBag, DollarSign, Users, TrendingUp } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { DonutChart } from '../charts/donut-chart';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function EcommerceDashboard() {
  const salesTrend = [
    { label: 'Jan', value: 24000 },
    { label: 'Feb', value: 29000 },
    { label: 'Mar', value: 27500 },
    { label: 'Apr', value: 34000 },
    { label: 'May', value: 38000 },
    { label: 'Jun', value: 48920 },
  ];

  const trafficSources = [
    { label: 'Direct', value: 320, color: '#3b82f6' },
    { label: 'Organic Search', value: 240, color: '#10b981' },
    { label: 'Social Media', value: 180, color: '#ec4899' },
    { label: 'Paid Ads', value: 140, color: '#f59e0b' },
    { label: 'Email', value: 80, color: '#8b5cf6' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', category: 'Electronics', revenue: '$12,430', units: '320 sold', growth: '+24%' },
    { name: 'Minimal Backpack', category: 'Accessories', revenue: '$8,920', units: '210 sold', growth: '+18%' },
    { name: 'Smart Watch', category: 'Wearables', revenue: '$8,450', units: '184 sold', growth: '+16%' },
    { name: 'Running Shoes', category: 'Footwear', revenue: '$6,980', units: '160 sold', growth: '+12%' },
    { name: 'Leather Wallet', category: 'Accessories', revenue: '$4,320', units: '122 sold', growth: '+8%' },
  ];

  const recentOrders = [
    { id: '#10421', customer: 'Sarah Khan', product: 'Wireless Headphones', amount: '$129.00', status: 'Delivered', date: 'Jun 30, 2025' },
    { id: '#10420', customer: 'James Lee', product: 'Smart Watch', amount: '$249.00', status: 'Shipped', date: 'Jun 30, 2025' },
    { id: '#10419', customer: 'Priya Sharma', product: 'Minimal Backpack', amount: '$89.00', status: 'Processing', date: 'Jun 29, 2025' },
    { id: '#10418', customer: 'Daniel Kim', product: 'Running Shoes', amount: '$120.00', status: 'Delivered', date: 'Jun 29, 2025' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's what's happening with your store"
        description="Track your sales, orders, customers and growth in real-time."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$48,920"
          change="+18.4%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 dark:from-emerald-950/60 dark:to-emerald-900/30 dark:border-emerald-800/80"
          glowColor="from-emerald-500/20 dark:from-emerald-500/25"
          sparklineData={[32, 36, 40, 44, 48.9]}
        />
        <StatCard
          title="Total Orders"
          value="1,245"
          change="+12.8%"
          trend="up"
          timeframe="vs last month"
          icon={<ShoppingBag className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200/80 dark:from-blue-950/60 dark:to-blue-900/30 dark:border-blue-800/80"
          glowColor="from-blue-500/20 dark:from-blue-500/25"
          sparklineData={[980, 1040, 1120, 1190, 1245]}
        />
        <StatCard
          title="Customers"
          value="892"
          change="+16.9%"
          trend="up"
          timeframe="vs last month"
          icon={<Users className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-gradient-to-br from-purple-50 to-purple-100/70 border-purple-200/80 dark:from-purple-950/60 dark:to-purple-900/30 dark:border-purple-800/80"
          glowColor="from-purple-500/20 dark:from-purple-500/25"
          sparklineData={[700, 740, 800, 850, 892]}
        />
        <StatCard
          title="Conversion Rate"
          value="3.6%"
          change="+0.7%"
          trend="up"
          timeframe="vs last month"
          icon={<TrendingUp className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-gradient-to-br from-indigo-50 to-indigo-100/70 border-indigo-200/80 dark:from-indigo-950/60 dark:to-indigo-900/30 dark:border-indigo-800/80"
          glowColor="from-indigo-500/20 dark:from-indigo-500/25"
          sparklineData={[2.9, 3.1, 3.2, 3.4, 3.6]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Sales Trend</CardTitle>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">+18.4% compared to May</p>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Monthly ▾</span>
          </CardHeader>
          <AreaSplineChart
            data={salesTrend}
            color="#3b82f6"
            gradientId="ecomSpline"
            filterOptions={[]}
          />
        </Card>

        <Card>
          <DonutChart
            data={trafficSources}
            centerValue="1,245"
            centerLabel="Total Visits"
            title="Traffic Sources"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Top Products</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Catalog →</span>
          </CardHeader>
          <div className="space-y-3">
            {topProducts.map((prod, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 font-extrabold text-xs border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">{prod.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{prod.category} • {prod.units}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-slate-900 dark:text-white block">{prod.revenue}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{prod.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Recent Orders</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">All orders →</span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800/80">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">{ord.customer}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400 font-medium">{ord.product}</td>
                    <td className="py-2.5 font-extrabold text-slate-900 dark:text-white">{ord.amount}</td>
                    <td className="py-2.5 text-right">
                      <Badge variant={ord.status === 'Delivered' ? 'success' : ord.status === 'Shipped' ? 'info' : 'warning'} size="sm" dot>
                        {ord.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
