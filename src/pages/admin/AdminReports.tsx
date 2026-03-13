import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Users, CalendarDays, Package, DollarSign } from "lucide-react";
import { toast } from "sonner";

const reports = [
  { title: "Patient Records Report", description: "Complete list of all patients and their information", icon: Users, color: "text-primary" },
  { title: "Appointment History", description: "Detailed appointment logs with status tracking", icon: CalendarDays, color: "text-accent" },
  { title: "Inventory Usage Report", description: "Stock levels, usage trends, and reorder alerts", icon: Package, color: "text-warning" },
  { title: "Sales & Revenue Report", description: "Financial transactions and revenue analysis", icon: DollarSign, color: "text-success" },
];

export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Reports</h1>
        <p className="text-muted-foreground">Generate and export clinic reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, i) => (
          <Card key={i} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <report.icon className={`w-6 h-6 ${report.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => toast.success("PDF generated")}>
                      <Download className="w-3 h-3 mr-1" /> PDF
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("CSV exported")}>
                      <Download className="w-3 h-3 mr-1" /> CSV
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
