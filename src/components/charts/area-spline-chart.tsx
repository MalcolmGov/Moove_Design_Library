import { useState } from 'react';
import { cn } from '../../lib/utils';

export interface SplinePoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface AreaSplineChartProps {
  data: SplinePoint[];
  height?: number;
  color?: string;
  gradientId?: string;
  showGrid?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  filterOptions?: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export function AreaSplineChart({
  data,
  height = 220,
  color = '#6366f1',
  gradientId = 'splineGradient',
  showGrid = true,
  valuePrefix = '$',
  valueSuffix = '',
  className,
  title,
  subtitle,
  filterOptions = ['Monthly', 'Weekly', 'Daily'],
  activeFilter = 'Monthly',
  onFilterChange,
}: AreaSplineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 1) * 1.18;
  const minVal = 0;

  const width = 600;
  const chartHeight = 180;
  const paddingX = 25;
  const paddingY = 22;

  const points = data.map((item, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
    const y = chartHeight - paddingY - ((item.value - minVal) / (maxVal - minVal)) * (chartHeight - paddingY * 2);
    return { x, y, item };
  });

  function createSplinePath(pts: { x: number; y: number }[]): string {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  const linePath = createSplinePath(points);
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || width} ${chartHeight - paddingY} L ${points[0]?.x || 0} ${chartHeight - paddingY} Z`;

  return (
    <div className={cn('w-full flex flex-col', className)}>
      {(title || filterOptions.length > 0) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{title}</h4>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {filterOptions.length > 0 && (
            <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onFilterChange?.(opt)}
                  className={cn(
                    'text-xs font-semibold px-3 py-1 rounded-lg transition-all',
                    activeFilter === opt
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="relative w-full overflow-hidden" style={{ height }}>
        <svg
          viewBox={`0 0 ${width} ${chartHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.38" />
              <stop offset="50%" stopColor={color} stopOpacity="0.12" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>

            <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={color} floodOpacity="0.3" />
            </filter>
          </defs>

          {showGrid && (
            <g className="opacity-40 dark:opacity-20">
              {[0.25, 0.5, 0.75, 1].map((pct, i) => {
                const y = chartHeight - paddingY - pct * (chartHeight - paddingY * 2);
                return (
                  <line
                    key={i}
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}
            </g>
          )}

          {/* Area fill */}
          <path d={areaPath} fill={`url(#${gradientId})`} />

          {/* Main glowing spline curve */}
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#glow-${gradientId})`}
          />

          {/* Data points */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === idx ? 6.5 : 3.5}
                fill="#ffffff"
                stroke={color}
                strokeWidth={hoveredIndex === idx ? 3.5 : 2}
                className="transition-all duration-150 cursor-pointer shadow-md"
                onMouseEnter={() => setHoveredIndex(idx)}
              />
              <rect
                x={pt.x - 18}
                y={0}
                width={36}
                height={chartHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              />
            </g>
          ))}

          {/* Crosshair */}
          {hoveredIndex !== null && points[hoveredIndex] && (
            <g>
              <line
                x1={points[hoveredIndex].x}
                y1={paddingY}
                x2={points[hoveredIndex].x}
                y2={chartHeight - paddingY}
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.8"
              />
            </g>
          )}
        </svg>

        {/* Floating Tooltip Pill */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div
            className="absolute -top-2 pointer-events-none transform -translate-x-1/2 bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 text-xs px-3 py-1.5 rounded-xl shadow-xl flex flex-col items-center border border-slate-700/50 dark:border-slate-200 z-20 animate-fade-in backdrop-blur-md"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
            }}
          >
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              {points[hoveredIndex].item.label}
            </span>
            <span className="font-extrabold text-white dark:text-slate-900 tracking-tight">
              {valuePrefix}
              {points[hoveredIndex].item.value.toLocaleString()}
              {valueSuffix}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-2 px-4">
        {data.map((item, idx) => (
          <span
            key={idx}
            className={cn(
              'transition-colors',
              hoveredIndex === idx ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
