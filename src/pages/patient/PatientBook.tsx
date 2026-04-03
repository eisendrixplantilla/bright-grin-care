import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarPlus, CheckCircle, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const services = [
  "Orthodontics (Braces)",
  "EXO (Bunot)",
  "Restoration",
  "Oral",
  "Venners",
  "Denture (Pustiso)",
  "Implant",
  "Surgery",
  "TMJ",
  "Root Canal",
  "Teeth Whitening",
  "Fixed Bridge",
];

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

const dentists = ["Dr. Ayag", "Dr. Santos", "Dr. Reyes", "Dr. Cruz"];

const preferredTimes = ["Morning (9AM-12PM)", "Afternoon (1PM-5PM)"];

// Mock dentist availability per time slot
const dentistAvailability: Record<string, string[]> = {
  "Dr. Ayag": ["9:00 AM", "9:30 AM", "10:00 AM", "1:00 PM", "1:30 PM", "2:00 PM"],
  "Dr. Santos": ["10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM"],
  "Dr. Reyes": ["9:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "3:00 PM", "3:30 PM", "4:00 PM"],
  "Dr. Cruz": ["9:30 AM", "10:00 AM", "11:00 AM", "1:30 PM", "2:30 PM", "3:30 PM", "4:00 PM"],
};

export default function PatientBook() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [dentist, setDentist] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground">Appointment Booked!</h2>
          <p className="text-muted-foreground mt-2">{service} on {date ? format(date, "PPP") : ""} at {time} with {dentist}</p>
          <Button className="mt-6 gradient-primary text-primary-foreground" onClick={() => setSubmitted(false)}>Book Another</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Book Appointment</h1>
        <p className="text-muted-foreground">Schedule your next dental visit</p>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6 space-y-5">
          <div>
            <Label>Select Service</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger><SelectValue placeholder="Choose a service" /></SelectTrigger>
              <SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
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
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3 pointer-events-auto" disabled={(d) => d < new Date()} />
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
            <Label>Available Dentist</Label>
            <Select value={dentist} onValueChange={setDentist}>
              <SelectTrigger><SelectValue placeholder="Choose a dentist" /></SelectTrigger>
              <SelectContent>{dentists.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div>
            <Label>Available Time Slot</Label>
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

          <Button className="w-full gradient-primary text-primary-foreground" disabled={!service || !date || !time || !dentist}
            onClick={() => { setSubmitted(true); toast.success("Appointment booked!"); }}>
            <CalendarPlus className="w-4 h-4 mr-2" />Confirm Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
