import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface OnlineAppointment {
  id: string;
  patient: string;
  service: string;
  date: string;
  preferredTime: string;
  dentist: string;
  time: string;
  status: "pending" | "confirmed" | "declined";
}

const initialAppointments: OnlineAppointment[] = [
  { id: "OA001", patient: "Juan Dela Cruz", service: "Teeth Whitening", date: "2024-03-20", preferredTime: "Morning (9AM-12PM)", dentist: "Dr. Ayag", time: "10:00 AM", status: "pending" },
  { id: "OA002", patient: "Maria Santos", service: "Root Canal", date: "2024-03-21", preferredTime: "Afternoon (1PM-5PM)", dentist: "Dr. Santos", time: "2:00 PM", status: "pending" },
  { id: "OA003", patient: "Pedro Reyes", service: "Orthodontics (Braces)", date: "2024-03-22", preferredTime: "Morning (9AM-12PM)", dentist: "Dr. Reyes", time: "9:00 AM", status: "confirmed" },
  { id: "OA004", patient: "Ana Garcia", service: "EXO (Bunot)", date: "2024-03-19", preferredTime: "Afternoon (1PM-5PM)", dentist: "Dr. Cruz", time: "3:30 PM", status: "declined" },
];

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-success/10 text-success border-success/20",
  declined: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function AdminOnlineAppointments() {
  const [appointments, setAppointments] = useState<OnlineAppointment[]>(initialAppointments);

  const handleConfirm = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "confirmed" } : a));
    toast.success("Appointment confirmed!");
  };

  const handleDecline = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "declined" } : a));
    toast.success("Appointment declined.");
  };

  const pending = appointments.filter(a => a.status === "pending");
  const others = appointments.filter(a => a.status !== "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Online Appointments</h1>
        <p className="text-muted-foreground">Review and confirm patient online bookings</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Pending Appointments ({pending.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Preferred Time</TableHead>
                <TableHead>Dentist</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.map(apt => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.patient}</TableCell>
                  <TableCell>{apt.service}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.preferredTime}</TableCell>
                  <TableCell>{apt.dentist}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => handleConfirm(apt.id)}>
                        <CheckCircle className="w-4 h-4 mr-1" /> Confirm
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleDecline(apt.id)}>
                        <XCircle className="w-4 h-4 mr-1" /> Decline
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {pending.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No pending appointments</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> All Online Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Dentist</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map(apt => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.patient}</TableCell>
                  <TableCell>{apt.service}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.dentist}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
