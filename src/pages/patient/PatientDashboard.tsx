import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, History, Bell } from "lucide-react";

const upcomingAppointments = [
  { service: "Dental Cleaning", date: "Mar 20, 2024", time: "10:00 AM", status: "confirmed" },
  { service: "Check-up", date: "Apr 5, 2024", time: "2:00 PM", status: "pending" },
];

const reminders = [
  { message: "Your dental cleaning appointment is tomorrow at 10:00 AM", type: "appointment" },
  { message: "Time for your 6-month check-up. Book now!", type: "checkup" },
  { message: "Don't forget to take your prescribed medication", type: "medication" },
];

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John Smith</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Upcoming Appointments" value={2} icon={CalendarDays} delay={0} />
        <StatCard title="Queue Number" value="#05" icon={Clock} trend="3 ahead of you" delay={0.1} />
        <StatCard title="Total Visits" value={12} icon={History} delay={0.2} />
        <StatCard title="Next Appointment" value="Mar 20" icon={CalendarDays} trend="Dental Cleaning" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{apt.service}</p>
                    <p className="text-sm text-muted-foreground">{apt.date} at {apt.time}</p>
                  </div>
                  <Badge variant="outline" className={apt.status === "confirmed" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>{apt.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reminders.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-foreground">{r.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
