import { useState } from 'react';
import { 
  MoreHorizontal, 
  Plus, 
  Calendar, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { Avatar } from './avatar';
import { Badge } from './badge';
import { cn } from '../../lib/utils';

export interface KanbanTask {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignee: { name: string; avatar?: string };
  status: 'backlog' | 'in_progress' | 'review' | 'completed';
  progress?: number;
}

export interface KanbanColumn {
  id: 'backlog' | 'in_progress' | 'review' | 'completed';
  title: string;
  colorDot: string;
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  { id: 'backlog', title: 'To Do / Backlog', colorDot: 'bg-slate-400' },
  { id: 'in_progress', title: 'In Progress', colorDot: 'bg-amber-400' },
  { id: 'review', title: 'Code Review & QA', colorDot: 'bg-indigo-500' },
  { id: 'completed', title: 'Done / Deployed', colorDot: 'bg-emerald-500' },
];

const INITIAL_TASKS: KanbanTask[] = [
  {
    id: 'T-101',
    title: 'Migrate Tailwind CSS to v4 engine',
    category: 'Architecture',
    priority: 'high',
    dueDate: 'Today',
    assignee: { name: 'Alex Mercer' },
    status: 'completed',
    progress: 100,
  },
  {
    id: 'T-102',
    title: 'Design Dark Mode tokens & ambient depth layers',
    category: 'Design System',
    priority: 'urgent',
    dueDate: 'Tomorrow',
    assignee: { name: 'Sarah Chen' },
    status: 'review',
    progress: 85,
  },
  {
    id: 'T-103',
    title: 'Build Interactive Reusable Data Table component',
    category: 'Components',
    priority: 'high',
    dueDate: 'Jun 14',
    assignee: { name: 'Marcus Bell' },
    status: 'in_progress',
    progress: 60,
  },
  {
    id: 'T-104',
    title: 'Implement ⌘K Command Palette navigation',
    category: 'Navigation',
    priority: 'medium',
    dueDate: 'Jun 16',
    assignee: { name: 'Emma Wilson' },
    status: 'in_progress',
    progress: 40,
  },
  {
    id: 'T-105',
    title: 'Client Pitch Studio CSS export & White-labeling',
    category: 'White-Label',
    priority: 'medium',
    dueDate: 'Jun 18',
    assignee: { name: 'Alex Mercer' },
    status: 'backlog',
    progress: 10,
  },
  {
    id: 'T-106',
    title: 'Generate Interactive Component Code Copy Drawer',
    category: 'DevEx',
    priority: 'low',
    dueDate: 'Jun 22',
    assignee: { name: 'Sarah Chen' },
    status: 'backlog',
    progress: 0,
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);

  const moveTask = (taskId: string, direction: 'forward' | 'backward') => {
    const order: KanbanTask['status'][] = ['backlog', 'in_progress', 'review', 'completed'];
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const currentIndex = order.indexOf(task.status);
        const nextIndex =
          direction === 'forward'
            ? Math.min(order.length - 1, currentIndex + 1)
            : Math.max(0, currentIndex - 1);
        return { ...task, status: order[nextIndex] };
      })
    );
  };

  const getPriorityBadge = (priority: KanbanTask['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger" size="sm">Urgent</Badge>;
      case 'high':
        return <Badge variant="warning" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="info" size="sm">Medium</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Low</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Sprint Board</h3>
          <p className="text-xs text-slate-400">Sprint 14 • Q2 Core Deliverables</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEFAULT_COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className="bg-slate-50/70 dark:bg-slate-900/60 rounded-2xl p-3.5 border border-slate-200/70 dark:border-slate-800 flex flex-col gap-3 min-h-[420px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2.5 h-2.5 rounded-full', col.colorDot)} />
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{col.title}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {colTasks.length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards List */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white dark:bg-slate-800/90 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                        {task.category}
                      </span>
                      {getPriorityBadge(task.priority)}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {task.title}
                    </h4>

                    {task.progress !== undefined && (
                      <div className="mt-2.5 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Progress</span>
                          <span className="font-bold">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              task.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                            )}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {col.id !== 'backlog' && (
                          <button
                            onClick={() => moveTask(task.id, 'backward')}
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                            title="Move back"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        <Avatar name={task.assignee.name} size="xs" />
                        {col.id !== 'completed' && (
                          <button
                            onClick={() => moveTask(task.id, 'forward')}
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                            title="Advance to next step"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
