import React, { useState, useMemo } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T | ((item: T) => string);
  filterTabs?: { label: string; value: string; filterFn: (item: T) => boolean }[];
  pageSize?: number;
  className?: string;
  onRowClick?: (item: T) => void;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  enableExport?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  filterTabs,
  pageSize = 5,
  className,
  onRowClick,
  title,
  description,
  actions,
  enableExport = true,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>(filterTabs?.[0]?.value || 'all');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleExportCSV = () => {
    const visibleColumns = columns.filter((c) => c.key);
    const headers = visibleColumns.map((c) => `"${c.header.replace(/"/g, '""')}"`).join(',');

    const rows = sortedData.map((row) =>
      visibleColumns
        .map((col) => {
          const val = row[col.key];
          const cleanVal = val === null || val === undefined ? '' : String(val);
          return `"${cleanVal.replace(/"/g, '""')}"`;
        })
        .join(',')
    );

    const csvString = [headers, ...rows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${(title || 'export').toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 1. Filter by Tab
  const tabFilteredData = useMemo(() => {
    if (!filterTabs || filterTabs.length === 0 || activeTab === 'all') {
      return data;
    }
    const currentTabObj = filterTabs.find((t) => t.value === activeTab);
    return currentTabObj ? data.filter(currentTabObj.filterFn) : data;
  }, [data, filterTabs, activeTab]);

  // 2. Filter by Search Query
  const searchFilteredData = useMemo(() => {
    if (!query.trim()) return tabFilteredData;
    const lower = query.toLowerCase();

    return tabFilteredData.filter((item) => {
      if (typeof searchKey === 'function') {
        return searchKey(item).toLowerCase().includes(lower);
      }
      if (typeof searchKey === 'string' && item[searchKey] !== undefined) {
        return String(item[searchKey]).toLowerCase().includes(lower);
      }
      // Search all primitive values in the row
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(lower)
      );
    });
  }, [tabFilteredData, query, searchKey]);

  // 3. Sort Data
  const sortedData = useMemo(() => {
    if (!sortKey) return searchFilteredData;

    return [...searchFilteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      let comparison = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else {
        comparison = String(valA).localeCompare(String(valB));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [searchFilteredData, sortKey, sortDirection]);

  // 4. Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div className={cn('bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xs transition-colors', className)}>
      {/* Top Header & Search/Filter Bar */}
      <div className="p-4 md:p-5 border-b border-slate-100 dark:border-slate-800/80 space-y-3">
        {(title || actions || enableExport) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              {title && <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>}
              {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {enableExport && (
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
                  title="Download CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Export CSV</span>
                </button>
              )}
              {actions}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status/Category Filter Tabs */}
          {filterTabs && filterTabs.length > 0 ? (
            <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer',
                    activeTab === tab.value
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : <div />}

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50/60 dark:bg-slate-800/40 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100 dark:border-slate-800">
            <tr>
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key, col.sortable)}
                    className={cn(
                      'py-3.5 px-4 select-none',
                      col.sortable && 'cursor-pointer hover:text-slate-800 dark:hover:text-slate-100 transition-colors',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right',
                      col.className
                    )}
                  >
                    <div className={cn(
                      'inline-flex items-center gap-1.5',
                      col.align === 'right' && 'justify-end',
                      col.align === 'center' && 'justify-center'
                    )}>
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                              <ChevronDown className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'py-3 px-4',
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right',
                        col.className
                      )}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Filter className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">No records found</p>
                    <p className="text-[11px] text-slate-400">Try adjusting your filters or search keywords</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3.5 px-4 bg-slate-50/60 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing{' '}
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </span>{' '}
          of{' '}
          <span className="font-bold text-slate-800 dark:text-slate-200">{sortedData.length}</span> results
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-semibold text-[11px] text-slate-700 dark:text-slate-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
