import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Plus, Search, Eye, Edit } from "lucide-react";
import { toast } from "sonner";

const mockPatients = [
  { id: "P001", name: "Maria Garcia", age: 32, phone: "09123456789", lastVisit: "2024-03-10", status: "active" },
  { id: "P002", name: "James Wilson", age: 45, phone: "09234567890", lastVisit: "2024-03-08", status: "active" },
  { id: "P003", name: "Emma Davis", age: 28, phone: "09345678901", lastVisit: "2024-02-28", status: "active" },
  { id: "P004", name: "Robert Brown", age: 55, phone: "09456789012", lastVisit: "2024-01-15", status: "inactive" },
  { id: "P005", name: "Lisa Anderson", age: 38, phone: "09567890123", lastVisit: "2024-03-12", status: "active" },
];

export default function AdminPatients() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const filtered = mockPatients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Patient Records</h1>
          <p className="text-muted-foreground">Manage patient information and history</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Patient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-heading">Add New Patient</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Full Name</Label><Input placeholder="Patient name" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Age</Label><Input type="number" placeholder="Age" /></div>
                <div><Label>Phone</Label><Input placeholder="Phone number" /></div>
              </div>
              <div><Label>Email</Label><Input type="email" placeholder="Email" /></div>
              <div><Label>Address</Label><Input placeholder="Address" /></div>
              <Button className="w-full gradient-primary text-primary-foreground" onClick={() => { toast.success("Patient added"); setShowAdd(false); }}>Save Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-sm">{p.id}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.lastVisit}</TableCell>
                  <TableCell><Badge variant={p.status === "active" ? "default" : "secondary"} className={p.status === "active" ? "bg-success/10 text-success border-success/20" : ""}>{p.status}</Badge></TableCell>
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
