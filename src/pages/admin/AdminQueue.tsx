import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListOrdered, Play, SkipForward, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const queueData = [
  { number: 1, patient: "Maria Garcia", service: "Dental Cleaning", status: "completed" },
  { number: 2, patient: "James Wilson", service: "Tooth Extraction", status: "completed" },
  { number: 3, patient: "Emma Davis", service: "Root Canal", status: "serving" },
  { number: 4, patient: "Robert Brown", service: "Check-up", status: "waiting" },
  { number: 5, patient: "Lisa Anderson", service: "Filling", status: "waiting" },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  completed: { color: "bg-success/10 text-success border-success/20", label: "Completed" },
  serving: { color: "bg-accent/10 text-accent border-accent/20", label: "Now Serving" },
  waiting: { color: "bg-warning/10 text-warning border-warning/20", label: "Waiting" },
};

export default function AdminQueue() {
  const serving = queueData.find(q => q.status === "serving");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Queue Monitoring</h1>
        <p className="text-muted-foreground">Real-time patient queue management</p>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="shadow-elevated border-primary/20">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Now Serving</p>
            <p className="text-8xl font-bold font-heading text-primary my-4">
              {String(serving?.number || 0).padStart(2, "0")}
            </p>
            <p className="text-xl font-semibold text-foreground">{serving?.patient}</p>
            <p className="text-muted-foreground">{serving?.service}</p>
            <div className="flex justify-center gap-3 mt-6">
              <Button className="gradient-primary text-primary-foreground"><CheckCircle className="w-4 h-4 mr-2" />Complete</Button>
              <Button variant="outline"><SkipForward className="w-4 h-4 mr-2" />Next Patient</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Queue List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {queueData.map(q => (
              <div key={q.number} className={`flex items-center gap-4 p-4 rounded-lg ${q.status === "serving" ? "bg-primary/5 border border-primary/20" : "bg-muted/50"}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-heading text-lg ${q.status === "serving" ? "gradient-primary text-primary-foreground" : q.status === "completed" ? "bg-success/10 text-success" : "bg-secondary text-secondary-foreground"}`}>
                  {String(q.number).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{q.patient}</p>
                  <p className="text-sm text-muted-foreground">{q.service}</p>
                </div>
                <Badge variant="outline" className={statusConfig[q.status].color}>
                  {statusConfig[q.status].label}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
