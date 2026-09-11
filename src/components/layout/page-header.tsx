import { Calendar, ChevronDown } from 'lucide-react';

export interface PageHeaderProps {
  greeting?: string;
  title: string;
  description: string;
  dateRange?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  greeting = 'Good Morning,',
  title,
  description,
  dateRange = 'Jun 1, 2025 - Jun 30, 2025',
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <p className="text-xs font-medium text-slate-500">{greeting}</p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        {dateRange && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
