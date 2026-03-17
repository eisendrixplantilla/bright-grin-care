import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Edit, X } from "lucide-react";
import { toast } from "sonner";

const upcoming = [
  { id: 1, service: "Dental Cleaning", date: "Mar 20, 2024", time: "10:00 AM", dentist: "Dr. Sarah Chen", status: "confirmed" },
  { id: 2, service: "Check-up", date: "Apr 5, 2024", time: "2:00 PM", dentist: "Dr. Sarah Chen", status: "pending" },
];
const past = [
  { id: 3, service: "Filling", date: "Feb 10, 2024", time: "9:00 AM", dentist: "Dr. Sarah Chen", status: "completed" },
  { id: 4, service: "Tooth Extraction", date: "Jan 15, 2024", time: "11:00 AM", dentist: "Dr. Mike Johnson", status: "completed" },
  { id: 5, service: "Dental Cleaning", date: "Dec 5, 2023", time: "10:00 AM", dentist: "Dr. Sarah Chen", status: "completed" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  completed: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function PatientAppointments() {
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState<typeof upcoming[0] | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">My Appointments</h1>
        <p className="text-muted-foreground">View, reschedule, or cancel appointments</p>
      </div>
      <Card className="shadow-card">
        <CardContent className="p-6">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="space-y-3">
                {upcoming.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{apt.service}</p>
                      <p className="text-sm text-muted-foreground">{apt.date} at {apt.time} • {apt.dentist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedApt(apt); setRescheduleOpen(true); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => toast.success("Appointment cancelled")}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="space-y-3">
                {past.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-foreground">{apt.service}</p>
                      <p className="text-sm text-muted-foreground">{apt.date} at {apt.time} • {apt.dentist}</p>
                    </div>
                    <Badge variant="outline" className={statusColors[apt.status]}>{apt.status}</Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-heading">Reschedule Appointment</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Rescheduling: {selectedApt?.service}</p>
            <div><Label>New Date</Label><Input type="date" /></div>
            <div><Label>New Time</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                <SelectContent>
                  {["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full gradient-primary text-primary-foreground" onClick={() => { toast.success("Appointment rescheduled"); setRescheduleOpen(false); }}>Confirm Reschedule</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
