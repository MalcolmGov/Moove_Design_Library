import { Users, Calendar, Stethoscope, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../layout/page-header';
import { StatCard } from '../ui/stat-card';
import { AreaSplineChart } from '../charts/area-spline-chart';
import { CircularGauge } from '../charts/circular-gauge';
import { DonutChart } from '../charts/donut-chart';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';

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

  const recentAdmissions = [
    { name: 'Sarah Ali', age: 34, dept: 'General Medicine', date: 'Jun 28, 2025', status: 'Stable', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
    { name: 'Mohammed Raza', age: 67, dept: 'Cardiology', date: 'Jun 28, 2025', status: 'Under Care', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
    { name: 'Ayesha Khan', age: 12, dept: 'Pediatrics', date: 'Jun 27, 2025', status: 'Stable', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' },
    { name: 'Daniel Smith', age: 45, dept: 'Orthopedics', date: 'Jun 27, 2025', status: 'Recovering', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
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
          icon={<Users className="w-5 h-5" />}
          iconColor="text-sky-600 dark:text-sky-400"
          iconBg="bg-sky-50 dark:bg-sky-950/50"
        />
        <StatCard
          title="Appointments"
          value="2,941"
          change="+8.3%"
          trend="up"
          timeframe="vs last month"
          icon={<Calendar className="w-5 h-5" />}
          iconColor="text-teal-600 dark:text-teal-400"
          iconBg="bg-teal-50 dark:bg-teal-950/50"
        />
        <StatCard
          title="Active Doctors"
          value="186"
          change="+6.1%"
          trend="up"
          timeframe="vs last month"
          icon={<Stethoscope className="w-5 h-5" />}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
        />
        <StatCard
          title="Treatments Completed"
          value="4,320"
          change="+14.8%"
          trend="up"
          timeframe="vs last month"
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-950/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <CardHeader>
            <div>
              <CardTitle>Patient Visits</CardTitle>
              <span className="text-xs text-emerald-600 font-semibold">+18.4% growth</span>
            </div>
            <span className="text-xs text-slate-400">Monthly ▾</span>
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

        <Card className="p-6 flex flex-col justify-between">
          <CardHeader className="mb-2">
            <CardTitle>Bed Occupancy</CardTitle>
            <span className="text-xs text-sky-600 font-medium cursor-pointer">View Details →</span>
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
        <Card className="lg:col-span-2 p-6">
          <CardHeader className="mb-3">
            <CardTitle>Department Performance</CardTitle>
            <span className="text-xs text-sky-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Patients</th>
                  <th className="pb-3">Avg. Wait Time</th>
                  <th className="pb-3 text-right">Satisfaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {departmentPerformance.map((dept, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 font-semibold text-slate-800 dark:text-slate-100">{dept.dept}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{dept.patients}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-400">{dept.waitTime}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-600">{dept.satisfaction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <DonutChart
            data={treatmentSegments}
            centerValue="94%"
            centerLabel="Success Rate"
            title="Treatment Outcomes"
            legendPosition="bottom"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Recent Admissions</CardTitle>
            <span className="text-xs text-sky-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {recentAdmissions.map((patient, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <div className="flex items-center gap-2.5">
                  <Avatar src={patient.avatar} name={patient.name} size="xs" />
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-100">{patient.name}</h5>
                    <p className="text-[10px] text-slate-400">{patient.age} yrs • {patient.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={patient.status === 'Stable' ? 'success' : patient.status === 'Recovering' ? 'info' : 'warning'} size="sm">
                    {patient.status}
                  </Badge>
                  <p className="text-[10px] text-slate-400 mt-0.5">{patient.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="mb-3">
            <CardTitle>Today's Doctor Schedule</CardTitle>
            <span className="text-xs text-sky-600 font-medium cursor-pointer">View all</span>
          </CardHeader>
          <div className="space-y-3">
            {doctorSchedule.map((doc, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-14 text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 py-1 px-1.5 rounded-md text-center">
                    {doc.time}
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-100">{doc.doctor}</h5>
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
