import { cn } from '../../lib/utils';

export interface ProgressItem {
  label: string;
  value: number;
  max?: number;
  color?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export interface ProgressBarGroupProps {
  items: ProgressItem[];
  title?: string;
  viewAllLink?: boolean;
  className?: string;
}

export function ProgressBarGroup({
  items,
  title,
  viewAllLink = true,
  className,
}: ProgressBarGroupProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          {viewAllLink && (
            <span className="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
              View all
            </span>
          )}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, idx) => {
          const max = item.max || 100;
          const pct = Math.min(Math.round((item.value / max) * 100), 100);

          return (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {item.icon && <span className="text-slate-500">{item.icon}</span>}
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <span className="font-semibold text-slate-800">{pct}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: item.color || '#6366f1',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
