import { useState } from 'react';
import { Calendar as CalendarIcon, X, Check, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DateRangePickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentRange: string;
  onSelectRange: (range: string) => void;
}

const PRESETS = [
  { id: 'today', label: 'Today', range: 'Jun 11, 2025' },
  { id: 'last-7', label: 'Last 7 Days', range: 'Jun 4, 2025 - Jun 11, 2025' },
  { id: 'this-month', label: 'This Month', range: 'Jun 1, 2025 - Jun 30, 2025' },
  { id: 'last-30', label: 'Last 30 Days', range: 'May 12, 2025 - Jun 11, 2025' },
  { id: 'q2', label: 'Q2 2025', range: 'Apr 1, 2025 - Jun 30, 2025' },
  { id: 'ytd', label: 'Year to Date', range: 'Jan 1, 2025 - Jun 11, 2025' },
];

export function DateRangePicker({
  isOpen,
  onClose,
  currentRange,
  onSelectRange,
}: DateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState(currentRange);

  if (!isOpen) return null;

  const handleApply = () => {
    onSelectRange(selectedRange);
    onClose();
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Filter Date Range</h3>
              <p className="text-[11px] text-slate-400">Select reporting period for all analytics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body: Presets & Calendar Preview */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Presets */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2.5">
              Quick Presets
            </label>
            <div className="space-y-1.5">
              {PRESETS.map((preset) => {
                const isSelected = selectedRange === preset.range;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedRange(preset.range)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer',
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 shadow-2xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
                    )}
                  >
                    <span>{preset.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini Calendar View for June 2025 */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div className="text-center font-bold text-xs text-slate-800 dark:text-slate-200 mb-2">
              June 2025
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 mb-1">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {daysInMonth.map((day) => {
                const isCurrent = day >= 1 && day <= 30;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedRange(`Jun ${day}, 2025 - Jun 30, 2025`)}
                    className={cn(
                      'h-7 rounded-lg flex items-center justify-center font-medium transition-colors cursor-pointer text-[11px]',
                      isCurrent
                        ? 'text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-indigo-950'
                        : 'text-slate-300 dark:text-slate-600',
                      day === 11 && 'bg-indigo-600 text-white font-bold hover:bg-indigo-700'
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">
              Highlighted: Today (Jun 11)
            </div>
          </div>
        </div>

        {/* Selected preview & Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-slate-400 font-medium">Selected: </span>
            <span className="font-bold text-slate-900 dark:text-white">{selectedRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              <span>Apply Filter</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
