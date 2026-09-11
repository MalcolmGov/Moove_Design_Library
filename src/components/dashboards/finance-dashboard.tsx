import { Wallet, TrendingUp, DollarSign, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { DonutChart } from '../charts/donut-chart';
import { CircularGauge } from '../charts/circular-gauge';
import { Sparkline } from '../charts/sparkline';
import { Card, CardHeader, CardTitle } from '../ui/card';

export function FinanceDashboard() {
  const portfolioHistory = [
    { label: 'Jan', value: 85000 },
    { label: 'Feb', value: 91000 },
    { label: 'Mar', value: 89000 },
    { label: 'Apr', value: 98000 },
    { label: 'May', value: 104000 },
    { label: 'Jun', value: 112420 },
    { label: 'Jul', value: 108000 },
    { label: 'Aug', value: 119000 },
    { label: 'Sep', value: 115000 },
    { label: 'Oct', value: 122000 },
    { label: 'Nov', value: 120000 },
    { label: 'Dec', value: 125430 },
  ];

  const assetAllocation = [
    { label: 'Stocks', value: 52680, color: '#6366f1' },
    { label: 'ETFs', value: 30103, color: '#06b6d4' },
    { label: 'Bonds', value: 22577, color: '#10b981' },
    { label: 'Crypto', value: 12543, color: '#f59e0b' },
    { label: 'Cash', value: 7527, color: '#94a3b8' },
  ];

  const watchlist = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$189.32', change: '+2.4%', up: true, data: [180, 182, 181, 185, 189] },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.17', change: '-1.2%', up: false, data: [255, 252, 250, 246, 248] },
    { symbol: 'NVDA', name: 'Nvidia Corp.', price: '$875.21', change: '+3.6%', up: true, data: [840, 850, 845, 868, 875] },
    { symbol: 'BTC', name: 'Bitcoin', price: '$67,420', change: '+0.8%', up: true, data: [65000, 66200, 65800, 67100, 67420] },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,240', change: '-0.5%', up: false, data: [3300, 3280, 3260, 3220, 3240] },
  ];

  const recentTransactions = [
    { type: 'Buy AAPL', shares: '10 shares • $189.32', amount: '-$1,893.20', date: 'Jun 28, 2025' },
    { type: 'Buy TSLA', shares: '5 shares • $248.17', amount: '-$1,240.85', date: 'Jun 25, 2025' },
    { type: 'Dividend Received', shares: 'From VOO', amount: '+$56.20', date: 'Jun 18, 2025' },
    { type: 'Deposit', shares: 'Via Bank Transfer', amount: '+$2,000.00', date: 'Jun 10, 2025' },
    { type: 'Buy ETH', shares: '2.5 ETH • $3,240', amount: '-$8,100.00', date: 'Jun 5, 2025' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Welcome Back,"
        title="Finance & Investment Portfolio"
        description="Monitor assets, cashflow, and market movements in real-time."
      />

      {/* Row 1: Hero Dark Card + Goal Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StatCard
            variant="dark"
            title="Total Portfolio Value"
            value="$125,430"
            change="+12.6% +$14,050 this month"
            subtitle="All linked brokerage, crypto and banking accounts"
            sparklineData={[80, 85, 82, 90, 95, 110, 105, 115, 120, 125]}
            className="h-full flex flex-col justify-between"
          />
        </div>

        <Card className="p-6 flex flex-col justify-between">
          <CardHeader className="mb-2">
            <CardTitle>Goal Progress</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="flex flex-col items-center">
            <CircularGauge
              percentage={68}
              label="Completed"
              color="#6366f1"
              size={130}
              strokeWidth={12}
            />
            <div className="text-center mt-3">
              <h5 className="text-xs font-bold text-slate-800">House Down Payment</h5>
              <p className="text-xs text-slate-500 font-medium mt-0.5">$27,200 / $40,000</p>
              <span className="inline-block mt-2 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                On track • 18 months left
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: 4 Cash & Asset Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Cash Balance"
          value="$8,240"
          change="+2.4%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Total Invested"
          value="$95,000"
          change="+10.3%"
          trend="up"
          timeframe="vs last month"
          icon={<Wallet className="w-5 h-5" />}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="Total Returns"
          value="$30,430"
          change="+47.2%"
          trend="up"
          timeframe="lifetime"
          icon={<PiggyBank className="w-5 h-5" />}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Day Change"
          value="+$1,245"
          change="+1.0%"
          trend="up"
          timeframe="today"
          icon={<TrendingUp className="w-5 h-5" />}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      {/* Row 3: Portfolio Performance & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-slate-900">Portfolio Performance</h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +$30,430 (+32.1%)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Asset appreciation over the past 12 months</p>
            </div>
          </div>
          <AreaSplineChart
            data={portfolioHistory}
            color="#6366f1"
            gradientId="financeSpline"
            filterOptions={['1D', '1W', '1M', '1Y', 'ALL']}
            activeFilter="1Y"
          />
        </Card>

        <Card className="p-6">
          <DonutChart
            data={assetAllocation}
            centerValue="$125,430"
            centerLabel="Total Value"
            title="Asset Allocation"
          />
        </Card>
      </div>

      {/* Row 4: Watchlist & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Watchlist</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {watchlist.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-[11px] text-slate-700">
                    {item.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{item.symbol}</h5>
                    <p className="text-[10px] text-slate-400">{item.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Sparkline data={item.data} isPositive={item.up} width={50} height={20} />
                  <div className="text-right">
                    <p className="font-bold text-slate-800">{item.price}</p>
                    <span className={`text-[10px] font-semibold ${item.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Recent Transactions</CardTitle>
            <span className="text-xs text-indigo-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {recentTransactions.map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
                    {tx.amount.startsWith('+') ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800">{tx.type}</h5>
                    <p className="text-[10px] text-slate-400">{tx.shares}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {tx.amount}
                  </p>
                  <span className="text-[10px] text-slate-400">{tx.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
