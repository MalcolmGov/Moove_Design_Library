import { cn } from '../../lib/utils';

export interface CircularGaugeProps {
  percentage: number;
  label?: string;
  subLabel?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  secondaryStats?: { label: string; value: string; color: string }[];
  className?: string;
}

export function CircularGauge({
  percentage,
  label = 'Present Rate',
  subLabel,
  size = 140,
  strokeWidth = 14,
  color = '#10b981',
  secondaryStats,
  className,
}: CircularGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{percentage}%</span>
          {label && <span className="text-[10px] text-slate-400 font-medium">{label}</span>}
        </div>
      </div>

      {subLabel && <p className="text-xs text-slate-500 mt-2">{subLabel}</p>}

      {secondaryStats && secondaryStats.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-100 w-full">
          {secondaryStats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs font-bold" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[10px] text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
