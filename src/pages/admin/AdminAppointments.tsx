import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Plus, Search, Edit, X } from "lucide-react";
import { toast } from "sonner";

const mockAppointments = [
  { id: "A001", patient: "Maria Garcia", service: "Dental Cleaning", date: "2024-03-15", time: "9:00 AM", status: "confirmed" },
  { id: "A002", patient: "James Wilson", service: "Tooth Extraction", date: "2024-03-15", time: "10:30 AM", status: "confirmed" },
  { id: "A003", patient: "Emma Davis", service: "Root Canal", date: "2024-03-15", time: "11:00 AM", status: "pending" },
  { id: "A004", patient: "Robert Brown", service: "Check-up", date: "2024-03-16", time: "9:00 AM", status: "confirmed" },
  { id: "A005", patient: "Lisa Anderson", service: "Filling", date: "2024-03-16", time: "2:30 PM", status: "cancelled" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  completed: "bg-secondary text-secondary-foreground",
};

export default function AdminAppointments() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const filtered = mockAppointments.filter(a => a.patient.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Manage clinic appointments</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />New Appointment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-heading">Create Appointment</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Patient</Label><Select><SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger><SelectContent><SelectItem value="p1">Maria Garcia</SelectItem><SelectItem value="p2">James Wilson</SelectItem><SelectItem value="p3">Emma Davis</SelectItem></SelectContent></Select></div>
              <div><Label>Service</Label><Select><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger><SelectContent><SelectItem value="cleaning">Dental Cleaning</SelectItem><SelectItem value="extraction">Tooth Extraction</SelectItem><SelectItem value="filling">Filling</SelectItem><SelectItem value="rootcanal">Root Canal</SelectItem><SelectItem value="checkup">Check-up</SelectItem></SelectContent></Select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Date</Label><Input type="date" /></div>
                <div><Label>Time</Label><Input type="time" /></div>
              </div>
              <Button className="w-full gradient-primary text-primary-foreground" onClick={() => { toast.success("Appointment created"); setShowAdd(false); }}>Create Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search appointments..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-sm">{a.id}</TableCell>
                  <TableCell className="font-medium">{a.patient}</TableCell>
                  <TableCell>{a.service}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.time}</TableCell>
                  <TableCell><Badge variant="outline" className={statusColors[a.status]}>{a.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><X className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
