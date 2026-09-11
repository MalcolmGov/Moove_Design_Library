import { Users, Calendar, Stethoscope, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { CircularGauge } from '../charts/circular-gauge';
import { DonutChart } from '../charts/donut-chart';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { DataTable, Column } from '../ui/data-table';

interface AdmissionRecord {
  id: string;
  name: string;
  age: number;
  dept: string;
  date: string;
  status: 'Stable' | 'Under Care' | 'Recovering' | 'Critical';
  avatar: string;
}

export function HealthcareDashboard() {
  const patientVisits = [
    { label: 'Jan', value: 1100 },
    { label: 'Feb', value: 1250 },
    { label: 'Mar', value: 1400 },
    { label: 'Apr', value: 1350 },
    { label: 'May', value: 1600 },
    { label: 'Jun', value: 1842 },
  ];

  const departmentPerformance = [
    { dept: 'General Medicine', patients: '3,420', waitTime: '18 min', satisfaction: '92%' },
    { dept: 'Cardiology', patients: '1,240', waitTime: '22 min', satisfaction: '89%' },
    { dept: 'Orthopedics', patients: '980', waitTime: '20 min', satisfaction: '87%' },
    { dept: 'Pediatrics', patients: '1,860', waitTime: '15 min', satisfaction: '94%' },
    { dept: 'Emergency', patients: '2,120', waitTime: '12 min', satisfaction: '90%' },
  ];

  const treatmentSegments = [
    { label: 'Successful', value: 94, color: '#10b981' },
    { label: 'Under Treatment', value: 5, color: '#06b6d4' },
    { label: 'Complications', value: 1, color: '#ef4444' },
  ];

  const recentAdmissions: AdmissionRecord[] = [
    { id: 'ADM-101', name: 'Sarah Ali', age: 34, dept: 'General Medicine', date: 'Jun 28, 2025', status: 'Stable', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
    { id: 'ADM-102', name: 'Mohammed Raza', age: 67, dept: 'Cardiology', date: 'Jun 28, 2025', status: 'Under Care', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
    { id: 'ADM-103', name: 'Ayesha Khan', age: 12, dept: 'Pediatrics', date: 'Jun 27, 2025', status: 'Stable', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' },
    { id: 'ADM-104', name: 'Daniel Smith', age: 45, dept: 'Orthopedics', date: 'Jun 27, 2025', status: 'Recovering', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
    { id: 'ADM-105', name: 'Elena Rostova', age: 29, dept: 'Emergency', date: 'Jun 26, 2025', status: 'Under Care', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80' },
    { id: 'ADM-106', name: 'Kenji Sato', age: 52, dept: 'Cardiology', date: 'Jun 26, 2025', status: 'Recovering', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80' },
  ];

  const admissionColumns: Column<AdmissionRecord>[] = [
    {
      key: 'name',
      header: 'Patient Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <Avatar src={row.avatar} name={row.name} size="xs" />
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">{row.name}</span>
            <span className="text-[10px] text-slate-400">ID: {row.id}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'age',
      header: 'Age',
      sortable: true,
      render: (row) => <span className="font-semibold text-slate-700 dark:text-slate-300">{row.age} yrs</span>,
    },
    {
      key: 'dept',
      header: 'Department',
      sortable: true,
      render: (row) => <span className="text-slate-600 dark:text-slate-400 font-medium">{row.dept}</span>,
    },
    {
      key: 'date',
      header: 'Admission Date',
      sortable: true,
      render: (row) => <span className="text-slate-500 dark:text-slate-400 text-[11px]">{row.date}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'right',
      render: (row) => (
        <Badge
          variant={
            row.status === 'Stable'
              ? 'success'
              : row.status === 'Recovering'
              ? 'info'
              : 'warning'
          }
          size="sm"
          dot
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  const doctorSchedule = [
    { time: '09:00 AM', doctor: 'Dr. Sarah Khan', dept: 'Pediatrics', type: 'Follow-up' },
    { time: '10:30 AM', doctor: 'Dr. Ahmed Raza', dept: 'Cardiology', type: 'Consultation' },
    { time: '12:00 PM', doctor: 'Dr. Priya Mehta', dept: 'General Medicine', type: 'Follow-up' },
    { time: '02:00 PM', doctor: 'Dr. James Lee', dept: 'Orthopedics', type: 'Surgery' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        greeting="Good Morning,"
        title="Here's your hospital overview"
        description="Track patient care, operations and performance in real-time."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Patients"
          value="12,480"
          change="+12.5%"
          trend="up"
          timeframe="vs last month"
          icon={<Users className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-sky-600 dark:text-sky-400"
          iconBg="bg-gradient-to-br from-sky-50 to-sky-100/70 border-sky-200/80 dark:from-sky-950/60 dark:to-sky-900/30 dark:border-sky-800/80"
          glowColor="from-sky-500/20 dark:from-sky-500/25"
          sparklineData={[10, 11, 11.5, 11.8, 12.1, 12.4]}
        />
        <StatCard
          title="Appointments"
          value="2,941"
          change="+8.3%"
          trend="up"
          timeframe="vs last month"
          icon={<Calendar className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-teal-600 dark:text-teal-400"
          iconBg="bg-gradient-to-br from-teal-50 to-teal-100/70 border-teal-200/80 dark:from-teal-950/60 dark:to-teal-900/30 dark:border-teal-800/80"
          glowColor="from-teal-500/20 dark:from-teal-500/25"
          sparklineData={[2.4, 2.5, 2.7, 2.6, 2.8, 2.9]}
        />
        <StatCard
          title="Active Doctors"
          value="186"
          change="+6.1%"
          trend="up"
          timeframe="vs last month"
          icon={<Stethoscope className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-gradient-to-br from-emerald-50 to-emerald-100/70 border-emerald-200/80 dark:from-emerald-950/60 dark:to-emerald-900/30 dark:border-emerald-800/80"
          glowColor="from-emerald-500/20 dark:from-emerald-500/25"
          sparklineData={[170, 175, 178, 180, 184, 186]}
        />
        <StatCard
          title="Treatments Completed"
          value="4,320"
          change="+14.8%"
          trend="up"
          timeframe="vs last month"
          icon={<CheckCircle2 className="w-5 h-5 stroke-[2.5]" />}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-gradient-to-br from-indigo-50 to-indigo-100/70 border-indigo-200/80 dark:from-indigo-950/60 dark:to-indigo-900/30 dark:border-indigo-800/80"
          glowColor="from-indigo-500/20 dark:from-indigo-500/25"
          sparklineData={[3.6, 3.8, 3.9, 4.0, 4.1, 4.3]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Patient Visits</CardTitle>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                +18.4% growth
              </span>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Monthly ▾</span>
          </CardHeader>
          <AreaSplineChart
            data={patientVisits}
            color="#0284c7"
            gradientId="healthSpline"
            valuePrefix=""
            valueSuffix=" patients"
            filterOptions={[]}
          />
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader className="mb-2">
            <CardTitle>Bed Occupancy</CardTitle>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline cursor-pointer">
              View Details →
            </span>
          </CardHeader>
          <CircularGauge
            percentage={78}
            label="Occupied"
            color="#0284c7"
            subLabel="312 / 400 Beds in Use"
            secondaryStats={[
              { label: 'Occupied', value: '78%', color: '#0284c7' },
              { label: 'Available', value: '22%', color: '#10b981' },
            ]}
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="mb-3">
            <CardTitle>Department Performance</CardTitle>
            <span className="text-xs text-sky-600 dark:text-sky-400 hover:underline cursor-pointer font-bold">
              View all
            </span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Patients</th>
                  <th className="pb-3">Avg. Wait Time</th>
                  <th className="pb-3 text-right">Satisfaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 dark:divide-slate-800/80">
                {departmentPerformance.map((dept, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-2.5 font-bold text-slate-800 dark:text-slate-100">{dept.dept}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400 font-medium">{dept.patients}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400 font-medium">{dept.waitTime}</td>
                    <td className="py-2.5 text-right font-extrabold text-emerald-600 dark:text-emerald-400">{dept.satisfaction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <DonutChart
            data={treatmentSegments}
            centerValue="94%"
            centerLabel="Success Rate"
            title="Treatment Outcomes"
            legendPosition="bottom"
          />
        </Card>
      </div>

      {/* Row 4: Interactive Admissions DataTable & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable<AdmissionRecord>
            title="Recent Admissions"
            description="Patient admissions with clinical status filter"
            data={recentAdmissions}
            columns={admissionColumns}
            pageSize={4}
            filterTabs={[
              { label: 'All Patients', value: 'all', filterFn: () => true },
              { label: 'Stable', value: 'Stable', filterFn: (p) => p.status === 'Stable' },
              { label: 'Under Care', value: 'Under Care', filterFn: (p) => p.status === 'Under Care' },
              { label: 'Recovering', value: 'Recovering', filterFn: (p) => p.status === 'Recovering' },
            ]}
          />
        </div>

        <Card>
          <CardHeader className="mb-3">
            <CardTitle>Today's Doctor Schedule</CardTitle>
            <span className="text-xs text-sky-600 dark:text-sky-400 hover:underline cursor-pointer font-bold">
              Full Roster →
            </span>
          </CardHeader>
          <div className="space-y-3">
            {doctorSchedule.map((doc, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-100/80 dark:border-slate-800/80 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-16 text-[10px] font-extrabold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 py-1.5 px-2 rounded-lg text-center border border-sky-200/60 dark:border-sky-800/60 shadow-2xs">
                    {doc.time}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100">{doc.doctor}</h5>
                    <p className="text-[10px] text-slate-400">{doc.dept}</p>
                  </div>
                </div>
                <Badge variant={doc.type === 'Surgery' ? 'danger' : 'neutral'} size="sm">
                  {doc.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
