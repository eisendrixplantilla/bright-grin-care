import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Archive, Edit, Search } from "lucide-react";
import { toast } from "sonner";
import { useActiveStaff, archiveStaff } from "@/lib/staffStore";

export default function SuperAdminStaff() {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const staff = useActiveStaff();
  const filtered = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesFrom = !fromDate || s.joined >= fromDate;
    const matchesTo = !toDate || s.joined <= toDate;
    return matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Add, archive, and manage staff accounts</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-2" />Add Staff Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-heading">Add Staff Account</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Full Name</Label><Input placeholder="Staff name" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="email@ayagdental.com" /></div>
              <div><Label>Password</Label><Input type="password" placeholder="Temporary password" /></div>
              <div><Label>Role</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Assign role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Clinic Staff (Admin)</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full gradient-primary text-primary-foreground" onClick={() => { toast.success("Staff account created"); setShowAdd(false); }}>Create Account</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search staff..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-sm">{s.id}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-secondary text-secondary-foreground">Clinic Staff</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={s.status === "active" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{s.joined}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-warning" onClick={() => { archiveStaff(s.id); toast.success("Staff account archived"); }}>
                        <Archive className="w-4 h-4" />
                      </Button>
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
