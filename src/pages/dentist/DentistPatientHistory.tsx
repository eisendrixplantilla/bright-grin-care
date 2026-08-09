import { Card, CardContent } from "@/components/ui/card";

export default function DentistPatientHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Patient History</h1>
        <p className="text-muted-foreground">Clinical history of your patients</p>
      </div>
      <Card>
        <CardContent className="py-16 text-center text-muted-foreground">
          This page is coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
