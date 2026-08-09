import { Card, CardContent } from "@/components/ui/card";

export default function DentistRecords() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Dental Records</h1>
        <p className="text-muted-foreground">Dental records you manage</p>
      </div>
      <Card>
        <CardContent className="py-16 text-center text-muted-foreground">
          This page is coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
