import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarDays, CalendarPlus, DollarSign, Clock, UserPlus } from "lucide-react";

const todayAppointments = [
  { id: 1, patient: "Maria Garcia", service: "Tooth Extraction", time: "9:00 AM", status: "completed" },
  { id: 2, patient: "James Wilson", service: "Dental Cleaning", time: "10:30 AM", status: "in-progress" },
  { id: 3, patient: "Emma Davis", service: "Root Canal", time: "11:00 AM", status: "waiting" },
  { id: 4, patient: "Robert Brown", service: "Check-up", time: "1:00 PM", status: "scheduled" },
  { id: 5, patient: "Lisa Anderson", service: "Filling", time: "2:30 PM", status: "scheduled" },
];

const walkInPatients = [
  { name: "Carlo Reyes", service: "Tooth Extraction", queueNo: 6, assignedBy: "Dr. Sarah Chen" },
  { name: "Ana Santos", service: "Check-up", queueNo: 7, assignedBy: "Dr. Sarah Chen" },
];

const onlineAppointments = [
  { id: 1, patient: "Juan Dela Cruz", service: "Teeth Whitening", date: "2024-03-20", time: "10:00 AM", status: "pending" },
  { id: 2, patient: "Maria Santos", service: "Root Canal", date: "2024-03-21", time: "2:00 PM", status: "pending" },
  { id: 3, patient: "Pedro Reyes", service: "Orthodontics (Braces)", date: "2024-03-22", time: "9:00 AM", status: "confirmed" },
  { id: 4, patient: "Ana Garcia", service: "EXO (Bunot)", date: "2024-03-19", time: "3:30 PM", status: "declined" },
];

const statusColors: Record<string, string> = {
  completed: "bg-success/10 text-success border-success/20",
  "in-progress": "bg-accent/10 text-accent border-accent/20",
  waiting: "bg-warning/10 text-warning border-warning/20",
  scheduled: "bg-secondary text-secondary-foreground",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Sarah Chen</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Appointments" value={14} icon={CalendarDays} trend="3 remaining" trendUp delay={0} />
        <StatCard title="Walk-in Patients" value={2} icon={UserPlus} trend="Today" delay={0.1} />
        <StatCard title="Daily Earnings" value="₱24,500" icon={DollarSign} trend="+18% vs yesterday" trendUp delay={0.2} />
        <StatCard title="Next Open Slot" value="04" icon={Clock} trend="Robert Brown • Check-up" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm text-foreground">{apt.patient}</p>
                    <p className="text-xs text-muted-foreground">{apt.service} • {apt.time}</p>
                  </div>
                  <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" /> Walk-in Patients Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {walkInPatients.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.service} • Assigned by {p.assignedBy}</p>
                    </div>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">Assigned</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-primary" /> Online Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {onlineAppointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{apt.patient}</p>
                  <p className="text-xs text-muted-foreground">{apt.service} • {apt.date} at {apt.time}</p>
                </div>
                <Badge variant="outline" className={statusColors[apt.status] || "bg-warning/10 text-warning border-warning/20"}>{apt.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  );
}
