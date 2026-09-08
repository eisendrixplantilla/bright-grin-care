import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArchiveRestore, Search } from "lucide-react";
import { toast } from "sonner";
import { useArchivedStaff, restoreStaff } from "@/lib/staffStore";

export default function SuperAdminArchives() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const archived = useArchivedStaff();
  const filtered = archived.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesFrom = !fromDate || (s.archivedAt ?? "") >= fromDate;
    const matchesTo = !toDate || (s.archivedAt ?? "") <= toDate;
    return matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Archived Staff</h1>
        <p className="text-muted-foreground">View and restore archived staff accounts</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search archived staff..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex items-end gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">From</Label>
                <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-40" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">To</Label>
                <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-40" />
              </div>
              {(fromDate || toDate) && (
                <Button variant="ghost" size="sm" onClick={() => { setFromDate(""); setToDate(""); }}>Clear</Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Archived On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">No archived staff</TableCell>
                </TableRow>
              ) : filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-sm">{s.id}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-secondary text-secondary-foreground">{s.role === "dentist" ? "Dentist" : "Admin"}</Badge></TableCell>
                  <TableCell><Badge variant="outline" className="bg-muted text-muted-foreground">Archived</Badge></TableCell>
                  <TableCell>{s.archivedAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => { restoreStaff(s.id); toast.success("Staff account restored"); }}>
                      <ArchiveRestore className="w-4 h-4 mr-2" />Restore
                    </Button>
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
