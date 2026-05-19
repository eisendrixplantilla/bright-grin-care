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
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search archived staff..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
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
                <TableHead>Archived On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No archived staff</TableCell>
                </TableRow>
              ) : filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-sm">{s.id}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell><Badge variant="outline" className="bg-secondary text-secondary-foreground">Clinic Staff</Badge></TableCell>
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
