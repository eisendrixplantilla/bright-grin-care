import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCog, Plus, Trash2, Edit, Search } from "lucide-react";
import { toast } from "sonner";

const mockStaff = [
  { id: "S001", name: "Dr. Sarah Chen", email: "sarah@ayagdental.com", role: "admin", status: "active", joined: "2023-01-15" },
  { id: "S002", name: "Dr. Mike Johnson", email: "mike@ayagdental.com", role: "admin", status: "active", joined: "2023-03-20" },
  { id: "S003", name: "Nurse Amy Lee", email: "amy@ayagdental.com", role: "admin", status: "active", joined: "2023-06-10" },
  { id: "S004", name: "Receptionist Jen Cruz", email: "jen@ayagdental.com", role: "admin", status: "on-leave", joined: "2023-09-01" },
];

export default function SuperAdminStaff() {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = mockStaff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Add, remove, and manage staff accounts</p>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => toast.success("Staff account removed")}>
                        <Trash2 className="w-4 h-4" />
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
