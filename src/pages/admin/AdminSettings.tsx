import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, Building2, Users, Shield } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage clinic and system settings</p>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" />Clinic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Clinic Name</Label><Input defaultValue="Ayag Dental Clinic" /></div>
              <div><Label>Phone</Label><Input defaultValue="(02) 8123-4567" /></div>
              <div><Label>Email</Label><Input defaultValue="info@ayagdental.com" /></div>
              <div><Label>Address</Label><Input defaultValue="123 Health St, Manila" /></div>
            </div>
            <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Settings saved")}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2"><Users className="w-5 h-5 text-primary" />User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Dr. Sarah Chen", role: "Admin", email: "admin@ayagdental.com" },
                { name: "Dr. Mike Johnson", role: "Dentist", email: "mike@ayagdental.com" },
                { name: "Nurse Amy Lee", role: "Staff", email: "amy@ayagdental.com" },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{user.role}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
