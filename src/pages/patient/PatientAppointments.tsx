import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const upcoming = [
  { service: "Dental Cleaning", date: "Mar 20, 2024", time: "10:00 AM", dentist: "Dr. Sarah Chen", status: "confirmed" },
  { service: "Check-up", date: "Apr 5, 2024", time: "2:00 PM", dentist: "Dr. Sarah Chen", status: "pending" },
];
const past = [
  { service: "Filling", date: "Feb 10, 2024", time: "9:00 AM", dentist: "Dr. Sarah Chen", status: "completed" },
  { service: "Tooth Extraction", date: "Jan 15, 2024", time: "11:00 AM", dentist: "Dr. Mike Johnson", status: "completed" },
  { service: "Dental Cleaning", date: "Dec 5, 2023", time: "10:00 AM", dentist: "Dr. Sarah Chen", status: "completed" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-secondary text-secondary-foreground",
};

function AppointmentList({ items }: { items: typeof upcoming }) {
  return (
    <div className="space-y-3">
      {items.map((apt, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div>
            <p className="font-medium text-foreground">{apt.service}</p>
            <p className="text-sm text-muted-foreground">{apt.date} at {apt.time} • {apt.dentist}</p>
          </div>
          <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
        </div>
      ))}
    </div>
  );
}

export default function PatientAppointments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">My Appointments</h1>
        <p className="text-muted-foreground">View your upcoming and past appointments</p>
      </div>
      <Card className="shadow-card">
        <CardContent className="p-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming"><AppointmentList items={upcoming} /></TabsContent>
            <TabsContent value="past"><AppointmentList items={past} /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
