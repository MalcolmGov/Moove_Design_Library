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
            className="h-full flex flex-col justify-between min-h-[220px]"
          />
        </div>

        <Card className="flex flex-col justify-between">
          <CardHeader className="mb-2">
            <CardTitle>Goal Progress</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">View all</span>
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
              <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">House Down Payment</h5>
              <p className="text-xs text-slate-500 font-medium mt-0.5">$27,200 / $40,000</p>
              <span className="inline-block mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
                On track • 18 months left
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 2: 4 Polished Cash & Asset Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Cash Balance"
          value="$8,240"
          change="+2.4%"
          trend="up"
          timeframe="vs last month"
          icon={<DollarSign className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200/80 dark:from-blue-950/60 dark:to-blue-900/30 dark:border-blue-800/80"
          glowColor="from-blue-500/20 dark:from-blue-500/25"
          sparklineData={[7.8, 8.0, 7.9, 8.1, 8.24]}
        />
        <StatCard
          title="Total Invested"
          value="$95,000"
          change="+10.3%"
          trend="up"
          timeframe="vs last month"
          icon={<Wallet className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-gradient-to-br from-indigo-50 to-indigo-100/70 border-indigo-200/80 dark:from-indigo-950/60 dark:to-indigo-900/30 dark:border-indigo-800/80"
          glowColor="from-indigo-500/20 dark:from-indigo-500/25"
          sparklineData={[80, 84, 88, 92, 95]}
        />
        <StatCard
          title="Total Returns"
          value="$30,430"
          change="+47.2%"
          trend="up"
          timeframe="lifetime"
          icon={<PiggyBank className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 dark:from-emerald-950/60 dark:to-emerald-900/30 dark:border-emerald-800/80"
          glowColor="from-emerald-500/20 dark:from-emerald-500/25"
          sparklineData={[20, 23, 26, 28, 30.4]}
        />
        <StatCard
          title="Day Change"
          value="+$1,245"
          change="+1.0%"
          trend="up"
          timeframe="today"
          icon={<TrendingUp className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-teal-600 dark:text-teal-400"
          iconBg="bg-gradient-to-br from-teal-50 to-teal-100/70 border-teal-200/80 dark:from-teal-950/60 dark:to-teal-900/30 dark:border-teal-800/80"
          glowColor="from-teal-500/20 dark:from-teal-500/25"
          sparklineData={[800, 950, 1100, 1050, 1245]}
        />
      </div>

      {/* Row 3: Portfolio Performance & Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Portfolio Performance</h3>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
                  +$30,430 (+32.1%)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Asset appreciation over the past 12 months</p>
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

        <Card>
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
        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Watchlist</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Market movers →</span>
          </CardHeader>
          <div className="space-y-3">
            {watchlist.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-extrabold text-xs text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                    {item.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 dark:text-white">{item.symbol}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{item.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Sparkline data={item.data} isPositive={item.up} width={50} height={20} />
                  <div className="text-right">
                    <p className="font-extrabold text-slate-900 dark:text-white">{item.price}</p>
                    <span className={`text-[10px] font-bold ${item.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Recent Transactions</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Statement →</span>
          </CardHeader>
          <div className="space-y-3">
            {recentTransactions.map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                    {tx.amount.startsWith('+') ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-slate-600 dark:text-slate-400 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">{tx.type}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{tx.shares}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-extrabold ${tx.amount.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    {tx.amount}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">{tx.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
