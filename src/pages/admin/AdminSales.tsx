import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";
import { DollarSign, TrendingUp, Receipt, CreditCard } from "lucide-react";

const mockSales = [
  { id: "S001", patient: "Maria Garcia", service: "Dental Cleaning", amount: 1500, date: "2024-03-15", status: "paid" },
  { id: "S002", patient: "James Wilson", service: "Tooth Extraction", amount: 3000, date: "2024-03-15", status: "paid" },
  { id: "S003", patient: "Emma Davis", service: "Root Canal", amount: 8000, date: "2024-03-15", status: "pending" },
  { id: "S004", patient: "Robert Brown", service: "Check-up", amount: 500, date: "2024-03-14", status: "paid" },
  { id: "S005", patient: "Lisa Anderson", service: "Filling", amount: 2500, date: "2024-03-14", status: "paid" },
];

export default function AdminSales() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Sales & Bookkeeping</h1>
        <p className="text-muted-foreground">Track payments and revenue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value="₱12,500" icon={DollarSign} trend="+18%" trendUp delay={0} />
        <StatCard title="Weekly Revenue" value="₱68,200" icon={TrendingUp} trend="+12%" trendUp delay={0.1} />
        <StatCard title="Pending Payments" value="₱8,000" icon={Receipt} delay={0.2} />
        <StatCard title="Total Transactions" value={42} icon={CreditCard} delay={0.3} />
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSales.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-sm">{s.id}</TableCell>
                  <TableCell className="font-medium">{s.patient}</TableCell>
                  <TableCell>{s.service}</TableCell>
                  <TableCell className="font-semibold">₱{s.amount.toLocaleString()}</TableCell>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={s.status === "paid" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                      {s.status}
                    </Badge>
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
