import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { FileText, Download, Users, CalendarDays, DollarSign, TrendingUp, BarChart3, Package } from "lucide-react";
import { toast } from "sonner";

const reports = [
  { title: "Patient Records Report", description: "Complete list of all patients and their information", icon: Users, color: "text-primary" },
  { title: "Appointment History", description: "Detailed appointment logs with status tracking", icon: CalendarDays, color: "text-accent" },
  { title: "Inventory Usage Report", description: "Stock levels, usage trends, and reorder alerts", icon: Package, color: "text-warning" },
  { title: "Sales & Revenue Report", description: "Financial transactions and revenue analysis", icon: DollarSign, color: "text-success" },
];

export default function SuperAdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Full system reports, financial analytics, and performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue (Month)" value="₱285,000" icon={DollarSign} trend="+15%" trendUp delay={0} />
        <StatCard title="Total Patients" value={248} icon={Users} trend="+12 this month" trendUp delay={0.1} />
        <StatCard title="Appointments (Month)" value={186} icon={CalendarDays} trend="+8%" trendUp delay={0.2} />
        <StatCard title="Avg Revenue/Day" value="₱9,500" icon={TrendingUp} trend="+10%" trendUp delay={0.3} />
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Financial Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Dental Cleaning", revenue: "₱67,500", percentage: 24 },
              { label: "Tooth Extraction", revenue: "₱54,000", percentage: 19 },
              { label: "Root Canal", revenue: "₱96,000", percentage: 34 },
              { label: "Others", revenue: "₱67,500", percentage: 23 },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-bold text-foreground mt-1">{item.revenue}</p>
                <div className="w-full h-2 bg-secondary rounded-full mt-2">
                  <div className="h-2 rounded-full gradient-primary" style={{ width: `${item.percentage}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.percentage}% of total</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
