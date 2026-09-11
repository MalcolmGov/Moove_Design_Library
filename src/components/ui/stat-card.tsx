import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  timeframe?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
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
  iconBg = 'bg-indigo-50 dark:bg-indigo-950/50',
  sparklineData,
  variant = 'default',
  className,
  subtitle,
}: StatCardProps) {
  if (variant === 'dark') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 shadow-lg border border-slate-800',
          className
        )}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">{title}</span>
          {change && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <TrendingUp className="w-3 h-3" />
              {change}
            </span>
          )}
        </div>
        <div className="text-3xl font-extrabold tracking-tight text-white mb-2">{value}</div>
        {subtitle && <p className="text-xs text-slate-400 mb-3">{subtitle}</p>}
        {sparklineData && (
          <div className="h-10 w-full mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dark-spark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
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
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 rounded-2xl border border-slate-100/90 dark:border-slate-800/80 shadow-xs hover:shadow-sm dark:shadow-none transition-all duration-200 p-5 flex flex-col justify-between',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h4 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h4>
        </div>
        {icon && (
          <div className={cn('p-2.5 rounded-xl shrink-0 flex items-center justify-center', iconBg, iconColor)}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 pt-1 border-t border-slate-50 dark:border-slate-800">
        {change && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-semibold',
              trend === 'up' && 'text-emerald-600 dark:text-emerald-400',
              trend === 'down' && 'text-rose-600 dark:text-rose-400',
              trend === 'neutral' && 'text-slate-600 dark:text-slate-400'
            )}
          >
            {trend === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : null}
            {change}
          </span>
        )}
        {timeframe && <span className="text-[11px] text-slate-400 dark:text-slate-500">{timeframe}</span>}
      </div>
    </div>
  );
}
