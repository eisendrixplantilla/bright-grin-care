import { Card, CardContent } from "@/components/ui/card";

export default function DentistAppointments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">My Appointments</h1>
        <p className="text-muted-foreground">Appointments assigned to you</p>
      </div>
      <Card>
        <CardContent className="py-16 text-center text-muted-foreground">
          This page is coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
