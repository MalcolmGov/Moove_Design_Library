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
          icon={<DollarSign className="w-5 h-5" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
        />
        <StatCard
          title="Total Orders"
          value="1,245"
          change="+12.8%"
          trend="up"
          timeframe="vs last month"
          icon={<ShoppingBag className="w-5 h-5" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/50"
        />
        <StatCard
          title="Customers"
          value="892"
          change="+16.9%"
          trend="up"
          timeframe="vs last month"
          icon={<Users className="w-5 h-5" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-950/50"
        />
        <StatCard
          title="Conversion Rate"
          value="3.6%"
          change="+0.7%"
          trend="up"
          timeframe="vs last month"
          icon={<TrendingUp className="w-5 h-5" />}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-950/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader>
            <div>
              <CardTitle>Sales Trend</CardTitle>
              <p className="text-xs text-emerald-600 font-semibold mt-0.5">+18.4% compared to May</p>
            </div>
            <span className="text-xs text-slate-400">Monthly ▾</span>
          </CardHeader>
          <AreaSplineChart
            data={salesTrend}
            color="#3b82f6"
            gradientId="ecomSpline"
            filterOptions={[]}
          />
        </Card>

        <Card className="p-6">
          <DonutChart
            data={trafficSources}
            centerValue="1,245"
            centerLabel="Total Visits"
            title="Traffic Sources"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Top Products</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {topProducts.map((prod, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-100">{prod.name}</h5>
                    <p className="text-[10px] text-slate-400">{prod.category} • {prod.units}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-white block">{prod.revenue}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{prod.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Recent Orders</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                  <th className="pb-2.5">Customer</th>
                  <th className="pb-2.5">Product</th>
                  <th className="pb-2.5">Amount</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {recentOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-100">{ord.customer}</td>
                    <td className="py-2.5 text-slate-500">{ord.product}</td>
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">{ord.amount}</td>
                    <td className="py-2.5 text-right">
                      <Badge variant={ord.status === 'Delivered' ? 'success' : ord.status === 'Shipped' ? 'info' : 'warning'} size="sm">
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
