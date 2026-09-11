import { useState } from 'react';
import { cn } from '../../lib/utils';
import { DonutSegment } from '../../types';

export interface DonutChartProps {
  data: DonutSegment[];
  centerLabel?: string;
  centerValue?: string | number;
  size?: number;
  thickness?: number;
  showLegend?: boolean;
  legendPosition?: 'right' | 'bottom';
  className?: string;
  title?: string;
}

export function DonutChart({
  data,
  centerLabel = 'Total Sales',
  centerValue = '$78,945',
  size = 180,
  thickness = 22,
  showLegend = true,
  legendPosition = 'right',
  className,
  title,
}: DonutChartProps) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;
  const segmentsWithAngles = data.map((seg) => {
    const percentage = total > 0 ? (seg.value / total) * 100 : 0;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset;
    currentOffset += (percentage / 100) * circumference;
    return {
      ...seg,
      percentage: Math.round(percentage),
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className={cn('flex flex-col', className)}>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{title}</h4>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 cursor-pointer font-medium">View all</span>
        </div>
      )}

      <div
        className={cn(
          'flex items-center justify-center gap-6',
          legendPosition === 'bottom' ? 'flex-col' : 'flex-row'
        )}
      >
        <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              className="dark:stroke-slate-800"
              strokeWidth={thickness}
            />

            {segmentsWithAngles.map((seg, idx) => (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={activeSegment === idx ? thickness + 4 : thickness}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setActiveSegment(idx)}
                onMouseLeave={() => setActiveSegment(null)}
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {activeSegment !== null ? segmentsWithAngles[activeSegment].value : centerValue}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
              {activeSegment !== null ? segmentsWithAngles[activeSegment].label : centerLabel}
            </span>
          </div>
        </div>

        {showLegend && (
          <div className="flex flex-col gap-2 w-full max-w-[170px]">
            {segmentsWithAngles.map((seg, idx) => (
              <div
                key={idx}
                className={cn(
                  'flex items-center justify-between text-xs py-1 px-1.5 rounded-lg cursor-pointer transition-colors',
                  activeSegment === idx ? 'bg-slate-100 dark:bg-slate-800 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                )}
                onMouseEnter={() => setActiveSegment(idx)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="truncate">{seg.label}</span>
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-semibold ml-2">{seg.percentage}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
