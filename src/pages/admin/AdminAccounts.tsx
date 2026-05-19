import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, Eye, Edit, Trash2 } from "lucide-react";

const mockAccounts = [
  { id: "A001", name: "Maria Garcia", email: "maria@email.com", role: "patient", status: "active", created: "2024-01-15" },
  { id: "A002", name: "James Wilson", email: "james@email.com", role: "patient", status: "active", created: "2024-02-10" },
  { id: "A003", name: "Emma Davis", email: "emma@email.com", role: "patient", status: "inactive", created: "2024-01-20" },
  { id: "A004", name: "Robert Brown", email: "robert@email.com", role: "patient", status: "active", created: "2024-03-01" },
  { id: "A005", name: "Lisa Anderson", email: "lisa@email.com", role: "patient", status: "active", created: "2024-03-05" },
];

export default function AdminAccounts() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const filtered = mockAccounts.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
    const matchesFrom = !fromDate || a.created >= fromDate;
    const matchesTo = !toDate || a.created <= toDate;
    return matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Patient Accounts</h1>
        <p className="text-muted-foreground">Manage registered patient accounts</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell><Badge variant="outline">{a.role}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={a.status === "active" ? "default" : "secondary"} className={a.status === "active" ? "bg-success/10 text-success border-success/20" : ""}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{a.created}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
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
