import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Plus, UserPlus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const services = [
  "Orthodontics (Braces)", "EXO (Bunot)", "Restoration", "Oral", "Venners",
  "Denture (Pustiso)", "Implant", "Surgery", "TMJ", "Root Canal",
  "Teeth Whitening", "Fixed Bridge",
];

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

const dentists = ["Dr. Ayag", "Dr. Santos", "Dr. Reyes", "Dr. Cruz"];

const preferredTimes = ["Morning (9AM-12PM)", "Afternoon (1PM-5PM)"];

const dentistAvailability: Record<string, string[]> = {
  "Dr. Ayag": ["9:00 AM", "9:30 AM", "10:00 AM", "1:00 PM", "1:30 PM", "2:00 PM"],
  "Dr. Santos": ["10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM"],
  "Dr. Reyes": ["9:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  "Dr. Cruz": ["9:30 AM", "10:00 AM", "11:00 AM", "1:30 PM", "2:30 PM", "3:30 PM", "4:00 PM"],
};

interface WalkInEntry {
  id: string;
  patient: string;
  service: string;
  date: string;
  preferredTime: string;
  dentist: string;
  time: string;
}

const initialWalkIns: WalkInEntry[] = [
  { id: "W001", patient: "Carlo Reyes", service: "Tooth Extraction", date: "2024-03-15", preferredTime: "Morning", dentist: "Dr. Ayag", time: "9:00 AM" },
  { id: "W002", patient: "Ana Santos", service: "Check-up", date: "2024-03-15", preferredTime: "Afternoon", dentist: "Dr. Santos", time: "2:00 PM" },
];

export default function AdminAppointments() {
  const [patientName, setPatientName] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date>();
  const [preferredTime, setPreferredTime] = useState("");
  const [dentist, setDentist] = useState("");
  const [time, setTime] = useState("");
  const [walkIns, setWalkIns] = useState<WalkInEntry[]>(initialWalkIns);

  const handleAdd = () => {
    if (!patientName || !service || !date || !dentist || !time) {
      toast.error("Please fill in all required fields");
      return;
    }
    const entry: WalkInEntry = {
      id: `W${String(walkIns.length + 1).padStart(3, "0")}`,
      patient: patientName,
      service,
      date: format(date, "yyyy-MM-dd"),
      preferredTime,
      dentist,
      time,
    };
    setWalkIns(prev => [...prev, entry]);
    setPatientName(""); setService(""); setDate(undefined); setPreferredTime(""); setDentist(""); setTime("");
    toast.success("Walk-in appointment added!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Walk-in Appointments</h1>
        <p className="text-muted-foreground">Register and manage walk-in patients</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> New Walk-in Appointment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Patient Name</Label>
              <Input placeholder="Enter patient name" value={patientName} onChange={e => setPatientName(e.target.value)} />
            </div>
            <div>
              <Label>Service</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
                <SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Preferred Time</Label>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger><SelectValue placeholder="Select preferred time" /></SelectTrigger>
                <SelectContent>{preferredTimes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Assign Dentist</Label>
            <Select value={dentist} onValueChange={(val) => { setDentist(val); setTime(""); }}>
              <SelectTrigger><SelectValue placeholder="Select dentist" /></SelectTrigger>
              <SelectContent>{dentists.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <Label>Available Time Slots</Label>
            {dentist && (
              <p className="text-xs text-muted-foreground mt-1 mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1 align-middle"></span> Available for {dentist}
              </p>
            )}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
              {timeSlots.map(slot => {
                const isAvailable = dentist ? dentistAvailability[dentist]?.includes(slot) : true;
                const isSelected = time === slot;
                return (
                  <Button key={slot} variant={isSelected ? "default" : "outline"} size="sm"
                    disabled={dentist ? !isAvailable : false}
                    className={cn(
                      isSelected ? "gradient-primary text-primary-foreground" : "",
                      dentist && isAvailable && !isSelected ? "border-primary/50 bg-primary/5 text-primary hover:bg-primary/10" : "",
                      dentist && !isAvailable ? "opacity-40" : ""
                    )}
                    onClick={() => setTime(slot)}>{slot}</Button>
                );
              })}
            </div>
          </div>

          <Button className="w-full gradient-primary text-primary-foreground" disabled={!patientName || !service || !date || !dentist || !time} onClick={handleAdd}>
            <UserPlus className="w-4 h-4 mr-2" /> Add Walk-in Appointment
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Today's Walk-in Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Dentist</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {walkIns.map(w => (
                <TableRow key={w.id}>
                  <TableCell className="font-medium">{w.patient}</TableCell>
                  <TableCell>{w.service}</TableCell>
                  <TableCell>{w.dentist}</TableCell>
                  <TableCell>{w.time}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-success/10 text-success border-success/20">Assigned</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { setWalkIns(prev => prev.filter(x => x.id !== w.id)); toast.success("Removed"); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {walkIns.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No walk-in appointments yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
