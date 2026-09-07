import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { addStaff, nextEmployeeId, type StaffRole } from "@/lib/staffStore";
import { saveDentistSchedule } from "@/lib/dentistSchedules";

const schema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  contact: z.string().trim().min(7, "Contact number is required").max(20),
  username: z.string().trim().min(3, "Username must be at least 3 characters").max(50),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  role: z.enum(["admin", "dentist"]),
});

export default function SuperAdminAddStaff() {
  const navigate = useNavigate();
  const [employeeId] = useState(() => nextEmployeeId());
  const [form, setForm] = useState({ name: "", email: "", contact: "", username: "", password: "", role: "" });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    const data = parsed.data;
    addStaff({
      id: employeeId,
      name: data.name,
      email: data.email,
      contact: data.contact,
      username: data.username,
      role: data.role as StaffRole,
      status: "active",
    });
    if (data.role === "dentist") saveDentistSchedule(data.name, {});
    toast.success("Staff account created");
    navigate("/superadmin/staff");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/superadmin/staff")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground">Add Staff Account</h1>
          <p className="text-muted-foreground">Create an Admin or Dentist account</p>
        </div>
      </div>

      <Card className="shadow-card max-w-2xl">
        <CardHeader><CardTitle className="font-heading text-lg">Account Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Employee ID</Label>
            <Input value={employeeId} readOnly disabled className="font-mono" />
            <p className="text-xs text-muted-foreground mt-1">Automatically generated and cannot be changed later.</p>
          </div>
          <div><Label>Full Name</Label><Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Staff name" /></div>
          <div><Label>Email Address</Label><Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@ayagdental.com" /></div>
          <div><Label>Contact Number</Label><Input value={form.contact} onChange={e => set("contact", e.target.value)} placeholder="0917-555-0000" /></div>
          <div><Label>Username</Label><Input value={form.username} onChange={e => set("username", e.target.value)} placeholder="username" /></div>
          <div><Label>Password</Label><Input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="Temporary password" /></div>
          <div>
            <Label>Role</Label>
            <Select value={form.role} onValueChange={v => set("role", v)}>
              <SelectTrigger><SelectValue placeholder="Assign role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="dentist">Dentist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button className="gradient-primary text-primary-foreground" onClick={submit}>Create Account</Button>
            <Button variant="outline" onClick={() => navigate("/superadmin/staff")}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
