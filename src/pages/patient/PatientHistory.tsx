import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, FileText } from "lucide-react";

const history = [
  { date: "Feb 10, 2024", service: "Filling", dentist: "Dr. Sarah Chen", notes: "Composite filling on tooth #14. No complications.", tooth: "#14" },
  { date: "Jan 15, 2024", service: "Tooth Extraction", dentist: "Dr. Mike Johnson", notes: "Wisdom tooth extraction (lower right). Post-op care instructions given.", tooth: "#48" },
  { date: "Dec 5, 2023", service: "Dental Cleaning", dentist: "Dr. Sarah Chen", notes: "Routine cleaning. Minor plaque buildup. Recommended flossing daily.", tooth: "Full" },
  { date: "Oct 20, 2023", service: "Check-up", dentist: "Dr. Sarah Chen", notes: "General check-up. All clear. Next visit in 3 months.", tooth: "Full" },
];

export default function PatientHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Dental History</h1>
        <p className="text-muted-foreground">Your previous treatments and records</p>
      </div>

      <div className="space-y-4">
        {history.map((record, i) => (
          <Card key={i} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{record.service}</p>
                    <p className="text-sm text-muted-foreground">{record.date} • {record.dentist}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-secondary text-secondary-foreground">Tooth {record.tooth}</Badge>
              </div>
              <p className="text-sm text-muted-foreground pl-[52px]">{record.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
