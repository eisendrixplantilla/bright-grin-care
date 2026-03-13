import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarPlus, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const services = ["Dental Cleaning", "Tooth Extraction", "Filling", "Root Canal", "Check-up", "Teeth Whitening", "Braces Consultation"];
const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

export default function PatientBook() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground">Appointment Booked!</h2>
          <p className="text-muted-foreground mt-2">{service} on {date} at {time}</p>
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
          <div>
            <Label>Preferred Date</Label>
            <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <Label>Available Time Slot</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
              {timeSlots.map(slot => (
                <Button key={slot} variant={time === slot ? "default" : "outline"} size="sm"
                  className={time === slot ? "gradient-primary text-primary-foreground" : ""}
                  onClick={() => setTime(slot)}>{slot}</Button>
              ))}
            </div>
          </div>
          <Button className="w-full gradient-primary text-primary-foreground" disabled={!service || !date || !time}
            onClick={() => { setSubmitted(true); toast.success("Appointment booked!"); }}>
            <CalendarPlus className="w-4 h-4 mr-2" />Confirm Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
