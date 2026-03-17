import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarDays, DollarSign, BarChart3, TrendingUp, UserCog } from "lucide-react";

const staffOverview = [
  { name: "Dr. Sarah Chen", role: "Dentist", status: "active", patientsToday: 5 },
  { name: "Dr. Mike Johnson", role: "Dentist", status: "active", patientsToday: 3 },
  { name: "Nurse Amy Lee", role: "Staff", status: "active", patientsToday: 0 },
  { name: "Receptionist Jen", role: "Staff", status: "on-leave", patientsToday: 0 },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={248} icon={Users} trend="+12 this month" trendUp delay={0} />
        <StatCard title="Today's Appointments" value={14} icon={CalendarDays} trend="+5 vs yesterday" trendUp delay={0.1} />
        <StatCard title="Monthly Revenue" value="₱285,000" icon={DollarSign} trend="+15% vs last month" trendUp delay={0.2} />
        <StatCard title="Active Staff" value={3} icon={UserCog} trend="1 on leave" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <UserCog className="w-5 h-5 text-primary" /> Staff Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {staffOverview.map((staff, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm text-foreground">{staff.name}</p>
                    <p className="text-xs text-muted-foreground">{staff.role} • {staff.patientsToday} patients today</p>
                  </div>
                  <Badge variant="outline" className={staff.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                    {staff.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Patient Satisfaction", value: "94%", bar: 94 },
                { label: "Appointment Completion", value: "88%", bar: 88 },
                { label: "Average Wait Time", value: "12 min", bar: 70 },
                { label: "Revenue Target", value: "78%", bar: 78 },
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-foreground">{metric.label}</p>
                    <p className="text-sm font-semibold text-foreground">{metric.value}</p>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full">
                    <div className="h-2 rounded-full gradient-primary" style={{ width: `${metric.bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
