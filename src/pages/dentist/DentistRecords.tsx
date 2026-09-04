import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useDentalRecords } from "@/lib/dentistAppointmentStore";

export default function DentistRecords() {
  const records = useDentalRecords();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Dental Records</h1>
        <p className="text-muted-foreground">Records saved from your consultations</p>
      </div>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Saved Dental Records</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Procedure</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Prescription</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                    No dental records yet. Save a consultation from My Appointments.
                  </TableCell>
                </TableRow>
              ) : (
                records.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{format(parseISO(r.date), "MMM d, yyyy")}</TableCell>
                    <TableCell className="font-medium">{r.patient}</TableCell>
                    <TableCell>{r.service}</TableCell>
                    <TableCell>{r.procedure}</TableCell>
                    <TableCell>{r.diagnosis}</TableCell>
                    <TableCell>{r.prescription || "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
