import { cn } from '../../lib/utils';

export interface FunnelStage {
  label: string;
  value: number;
  countFormatted?: string;
  color?: string;
}

export interface FunnelChartProps {
  stages: FunnelStage[];
  title?: string;
  timeframe?: string;
  className?: string;
}

export function FunnelChart({
  stages,
  title = 'Hiring Funnel',
  timeframe = 'This Month',
  className,
}: FunnelChartProps) {
  const maxValue = Math.max(...stages.map((s) => s.value), 1);

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
        {timeframe && <span className="text-xs text-slate-400">{timeframe}</span>}
      </div>

      <div className="space-y-2.5">
        {stages.map((stage, idx) => {
          const widthPct = Math.max((stage.value / maxValue) * 100, 18);
          return (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-24 text-xs text-slate-500 truncate">{stage.label}</span>
              <div className="flex-1 bg-slate-100/70 h-7 rounded-xl overflow-hidden relative flex items-center">
                <div
                  className="h-full rounded-xl transition-all duration-500 flex items-center justify-end px-3"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: stage.color || '#10b981',
                    opacity: 0.85 + idx * 0.03,
                  }}
                />
              </div>
              <span className="w-12 text-right text-xs font-bold text-slate-800">
                {stage.countFormatted || stage.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
