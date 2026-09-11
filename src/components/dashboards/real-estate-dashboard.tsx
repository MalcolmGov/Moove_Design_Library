import { Building2, DollarSign, Home, Key, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { DonutChart } from '../charts/donut-chart';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function RealEstateDashboard() {
  const rentalRevenue = [
    { label: 'Jan', value: 85000 },
    { label: 'Feb', value: 92000 },
    { label: 'Mar', value: 98000 },
    { label: 'Apr', value: 110000 },
    { label: 'May', value: 119000 },
    { label: 'Jun', value: 128430 },
  ];

  const expenseBreakdown = [
    { label: 'Property Maintenance', value: 19292, color: '#3b82f6' },
    { label: 'Utilities', value: 10625, color: '#f59e0b' },
    { label: 'Property Management', value: 8681, color: '#10b981' },
    { label: 'Insurance', value: 5788, color: '#8b5cf6' },
    { label: 'Other Expenses', value: 3844, color: '#94a3b8' },
  ];

  const maintenanceRequests = [
    { title: 'Leaky Kitchen Faucet', unit: '#MR-1042 • Maple Apartments', status: 'Pending', urgent: false },
    { title: 'AC Not Cooling', unit: '#MR-1038 • Lakeview Homes', status: 'Urgent', urgent: true },
    { title: 'Light Fixture Replacement', unit: '#MR-1031 • Sunset Villas', status: 'In Progress', urgent: false },
    { title: 'Paint Touch-up', unit: '#MR-1028 • Riverside Court', status: 'Resolved', urgent: false },
  ];

  const propertyListings = [
    { name: 'Maple Apartments', location: 'New York, NY', units: '24 Units', occupied: '96%', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&auto=format&fit=crop&q=80' },
    { name: 'Sunset Villas', location: 'Austin, TX', units: '12 Units', occupied: '92%', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=200&auto=format&fit=crop&q=80' },
    { name: 'Riverside Court', location: 'Chicago, IL', units: '18 Units', occupied: '88%', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&auto=format&fit=crop&q=80' },
    { name: 'Lakeview Homes', location: 'Seattle, WA', units: '8 Units', occupied: '100%', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's your property portfolio at a glance."
        description="Track performance, manage properties, and create better living experiences."
      />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Occupancy Rate"
          value="92.4%"
          change="+4.2%"
          trend="up"
          timeframe="vs last month"
          icon={<Home className="w-5 h-5" />}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/50"
        />
        <StatCard
          title="Rental Income"
          value="$128,430"
          change="+12.6%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
        />
        <StatCard
          title="Total Properties"
          value="36"
          change="+2"
          trend="up"
          timeframe="vs last month"
          icon={<Building2 className="w-5 h-5" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/50"
        />
        <StatCard
          title="Active Tenants"
          value="284"
          change="+5.6%"
          trend="up"
          timeframe="vs last month"
          icon={<Key className="w-5 h-5" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-950/50"
        />
      </div>

      {/* Row 2: Rental Revenue & Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Monthly Rental Revenue</CardTitle>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="inline w-3 h-3" /> +14.8%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Rental collections across 36 properties</p>
            </div>
            <span className="text-xs text-slate-400">Last 6 Months ▾</span>
          </CardHeader>
          <AreaSplineChart
            data={rentalRevenue}
            color="#d97706"
            gradientId="realEstateSpline"
            filterOptions={[]}
          />
        </Card>

        <Card className="p-6">
          <DonutChart
            data={expenseBreakdown}
            centerValue="$48,230"
            centerLabel="Total Expenses"
            title="Expense Summary"
          />
        </Card>
      </div>

      {/* Row 3: Maintenance Requests & Property Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Maintenance Requests</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {maintenanceRequests.map((req, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-100">{req.title}</h5>
                  <p className="text-[10px] text-slate-400">{req.unit}</p>
                </div>
                <Badge variant={req.urgent ? 'danger' : req.status === 'Resolved' ? 'success' : 'neutral'} size="sm">
                  {req.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Property Listings</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3">
            {propertyListings.map((prop, idx) => (
              <div key={idx} className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden group hover:border-slate-200 transition-all">
                <div className="h-20 w-full overflow-hidden">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-2.5">
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{prop.name}</h5>
                  <p className="text-[10px] text-slate-400">{prop.location}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 dark:border-slate-800 text-[10px]">
                    <span className="text-slate-500">{prop.units}</span>
                    <span className="font-bold text-emerald-600">{prop.occupied} Occupied</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
