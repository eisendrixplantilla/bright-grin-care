import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, CheckCircle, XCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface OnlineAppointment {
  id: string;
  patient: string;
  service: string;
  date: string;
  preferredTime: string;
  dentist: string;
  time: string;
  phone: string;
  status: "pending" | "confirmed" | "declined";
}

const initialAppointments: OnlineAppointment[] = [
  { id: "OA001", patient: "Juan Dela Cruz", service: "Teeth Whitening", date: "2024-03-20", preferredTime: "Morning (9AM-12PM)", dentist: "Dr. Ayag", time: "10:00 AM", phone: "09171234567", status: "pending" },
  { id: "OA002", patient: "Maria Santos", service: "Root Canal", date: "2024-03-21", preferredTime: "Afternoon (1PM-5PM)", dentist: "Dr. Santos", time: "2:00 PM", phone: "09181234567", status: "pending" },
  { id: "OA003", patient: "Pedro Reyes", service: "Orthodontics (Braces)", date: "2024-03-22", preferredTime: "Morning (9AM-12PM)", dentist: "Dr. Reyes", time: "9:00 AM", phone: "09191234567", status: "confirmed" },
  { id: "OA004", patient: "Ana Garcia", service: "EXO (Bunot)", date: "2024-03-19", preferredTime: "Afternoon (1PM-5PM)", dentist: "Dr. Cruz", time: "3:30 PM", phone: "09201234567", status: "declined" },
];

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  confirmed: "bg-success/10 text-success border-success/20",
  declined: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function AdminOnlineAppointments() {
  const [appointments, setAppointments] = useState<OnlineAppointment[]>(initialAppointments);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<OnlineAppointment | null>(null);
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const openConfirmDialog = (apt: OnlineAppointment) => {
    setSelectedAppointment(apt);
    setPhoneNumber(apt.phone);
    setMessage(
      `Hi ${apt.patient}! Your appointment for ${apt.service} with ${apt.dentist} on ${apt.date} at ${apt.time} has been confirmed. Please arrive 10 minutes early. Thank you! - Ayag Dental Clinic`
    );
    setConfirmDialog(true);
  };

  const handleConfirmSend = () => {
    if (!selectedAppointment) return;
    setAppointments(prev =>
      prev.map(a => a.id === selectedAppointment.id ? { ...a, status: "confirmed" } : a)
    );
    toast.success(`Appointment confirmed! Message sent to ${phoneNumber}`);
    setConfirmDialog(false);
    setSelectedAppointment(null);
    setMessage("");
  };

  const handleDecline = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "declined" } : a));
    toast.success("Appointment declined.");
  };

  const pending = appointments.filter(a => a.status === "pending");

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
                      <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => openConfirmDialog(apt)}>
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

      {/* Confirm & Send Message Dialog */}
      <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Send className="w-5 h-5" /> Confirm Appointment & Send Reminder
            </DialogTitle>
            <DialogDescription>
              Confirm this appointment and send a reminder message to the patient.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {selectedAppointment && (
              <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1 text-sm">
                <p><span className="font-semibold text-foreground">Patient:</span> {selectedAppointment.patient}</p>
                <p><span className="font-semibold text-foreground">Service:</span> {selectedAppointment.service}</p>
                <p><span className="font-semibold text-foreground">Date:</span> {selectedAppointment.date} at {selectedAppointment.time}</p>
                <p><span className="font-semibold text-foreground">Dentist:</span> {selectedAppointment.dentist}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="phone">Patient Phone Number</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="e.g. 09171234567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Reminder Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
                placeholder="Type your reminder message here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={handleConfirmSend} disabled={!message.trim() || !phoneNumber.trim()}>
              <Send className="w-4 h-4 mr-1" /> Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
