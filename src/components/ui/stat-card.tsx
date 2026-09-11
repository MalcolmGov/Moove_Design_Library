import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Sparkline } from '../charts/sparkline';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  timeframe?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  glowColor?: string;
  sparklineData?: number[];
  variant?: 'default' | 'dark' | 'gradient';
  className?: string;
  subtitle?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = 'up',
  timeframe = 'vs last month',
  icon,
  iconColor = 'text-indigo-600 dark:text-indigo-400',
  iconBg = 'bg-indigo-50 border-indigo-100 dark:bg-indigo-950/60 dark:border-indigo-800/60',
  glowColor = 'from-indigo-500/10 dark:from-indigo-500/15',
  sparklineData,
  variant = 'default',
  className,
  subtitle,
}: StatCardProps) {
  if (variant === 'dark') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/90 to-slate-900 text-white p-6 shadow-xl shadow-slate-950/30 border border-slate-700/80 hover:border-slate-600 transition-all duration-300 hover:-translate-y-0.5',
          className
        )}
      >
        {/* Subtle decorative glow overlay */}
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
          <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">{title}</span>
          {change && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-xs">
              <TrendingUp className="w-3.5 h-3.5" />
              {change}
            </span>
          )}
        </div>

        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 relative z-10">
          {value}
        </div>
        {subtitle && <p className="text-xs text-slate-400 mb-3 relative z-10">{subtitle}</p>}

        {sparklineData && (
          <div className="h-12 w-full mt-2 relative z-10">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dark-spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 25 Q 25 5, 50 18 T 100 5 L 100 30 L 0 30 Z"
                fill="url(#dark-spark)"
              />
              <path
                d="M 0 25 Q 25 5, 50 18 T 100 5"
                fill="none"
                stroke="#a5b4fc"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }

  // Auto detect glow and pill styling based on iconBg or trend
  const isPositive = trend === 'up';

  return (
    <div
      className={cn(
        'card-depth rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-300',
        className
      )}
    >
      {/* Top right ambient color glow */}
      <div
        className={cn(
          'absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none bg-gradient-to-br to-transparent opacity-80',
          glowColor
        )}
      />

      {/* Top subtle highlight rim */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/80 dark:via-slate-700/60 to-transparent pointer-events-none" />

      {/* Header with Title and Icon */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            {title}
          </p>
          <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h4>
        </div>

        {icon && (
          <div
            className={cn(
              'w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center border shadow-xs transition-transform duration-200 group-hover:scale-105',
              iconBg,
              iconColor
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Footer Trend & Details */}
      <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
        <div className="flex items-center gap-2">
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border shadow-2xs',
                isPositive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60'
                  : 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60'
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
              {change}
            </span>
          )}
          {timeframe && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              {timeframe}
            </span>
          )}
        </div>

        {sparklineData && (
          <div className="hidden sm:block">
            <Sparkline data={sparklineData} isPositive={isPositive} width={48} height={18} />
          </div>
        )}
      </div>
    </div>
  );
}
