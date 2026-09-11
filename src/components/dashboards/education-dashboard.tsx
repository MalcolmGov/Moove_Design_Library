import { GraduationCap, BookOpen, Clock, Award } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { ProgressBarGroup } from '../charts/progress-bar-group';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';

export function EducationDashboard() {
  const learningProgress = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 58 },
    { label: 'Apr', value: 68 },
    { label: 'May', value: 75 },
    { label: 'Jun', value: 82 },
  ];

  const subjectPerformance = [
    { label: 'Mathematics', value: 88, color: '#3b82f6' },
    { label: 'Computer Science', value: 76, color: '#ec4899' },
    { label: 'English Literature', value: 92, color: '#10b981' },
    { label: 'Physics', value: 70, color: '#f59e0b' },
    { label: 'Chemistry', value: 84, color: '#06b6d4' },
    { label: 'Business Studies', value: 78, color: '#8b5cf6' },
  ];

  const upcomingClasses = [
    { name: 'Data Structures & Algorithms', time: '10:00 AM - 11:30 AM', date: 'Jun 10', mode: 'Online' },
    { name: 'Modern Web Development', time: '01:00 PM - 02:30 PM', date: 'Jun 11', mode: 'Room A2' },
    { name: 'Business Communication', time: '11:00 AM - 12:30 PM', date: 'Jun 12', mode: 'Room B1' },
    { name: 'Physics for Engineers', time: '03:00 PM - 04:30 PM', date: 'Jun 13', mode: 'Online' },
  ];

  const instructors = [
    { name: 'Dr. Sophia Carter', dept: 'Computer Science', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' },
    { name: 'Prof. James Miller', dept: 'Mathematics', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
    { name: 'Dr. Emily Chen', dept: 'Physics', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80' },
    { name: 'Prof. Michael Brown', dept: 'Business Studies', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Keep Learning, Keep Growing"
        description="Here's your academic progress and upcoming activities."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Enrolled Courses"
          value="6"
          change="+20%"
          trend="up"
          timeframe="vs last semester"
          icon={<BookOpen className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200/80 dark:from-blue-950/60 dark:to-blue-900/30 dark:border-blue-800/80"
          glowColor="from-blue-500/20 dark:from-blue-500/25"
          sparklineData={[4, 5, 5, 6, 6]}
        />
        <StatCard
          title="Course Progress"
          value="68%"
          change="+12%"
          trend="up"
          timeframe="vs last month"
          icon={<GraduationCap className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-gradient-to-br from-indigo-50 to-indigo-100/70 border-indigo-200/80 dark:from-indigo-950/60 dark:to-indigo-900/30 dark:border-indigo-800/80"
          glowColor="from-indigo-500/20 dark:from-indigo-500/25"
          sparklineData={[50, 56, 60, 64, 68]}
        />
        <StatCard
          title="Attendance Rate"
          value="94%"
          change="+6%"
          trend="up"
          timeframe="vs last month"
          icon={<Clock className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 dark:from-emerald-950/60 dark:to-emerald-900/30 dark:border-emerald-800/80"
          glowColor="from-emerald-500/20 dark:from-emerald-500/25"
          sparklineData={[86, 88, 90, 92, 94]}
        />
        <StatCard
          title="Assignments Completed"
          value="18/24"
          change="+25%"
          trend="up"
          timeframe="vs last month"
          icon={<Award className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-gradient-to-br from-purple-50 to-purple-100/70 border-purple-200/80 dark:from-purple-950/60 dark:to-purple-900/30 dark:border-purple-800/80"
          glowColor="from-purple-500/20 dark:from-purple-500/25"
          sparklineData={[12, 14, 15, 17, 18]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Learning Progress</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Average score progression over the last 6 months</p>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Last 6 Months ▾</span>
          </CardHeader>
          <AreaSplineChart
            data={learningProgress}
            color="#6366f1"
            gradientId="eduSpline"
            valuePrefix=""
            valueSuffix="%"
            filterOptions={[]}
          />
        </Card>

        <Card>
          <ProgressBarGroup items={subjectPerformance} title="Performance by Subject" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Upcoming Classes</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Timetable →</span>
          </CardHeader>
          <div className="space-y-3">
            {upcomingClasses.map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                    <span className="text-[9px] text-slate-400 font-bold uppercase leading-none">{cls.date.split(' ')[0]}</span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">{cls.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">{cls.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{cls.time}</p>
                  </div>
                </div>
                <Badge variant="info" size="sm" dot>
                  {cls.mode}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Instructors</CardTitle>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer">Faculty directory →</span>
          </CardHeader>
          <div className="space-y-3">
            {instructors.map((ins, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 rounded-xl px-2 transition-colors">
                <div className="flex items-center gap-2.5">
                  <Avatar src={ins.avatar} name={ins.name} size="xs" />
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">{ins.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{ins.dept}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
