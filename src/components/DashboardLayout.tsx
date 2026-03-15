import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import {
  Stethoscope, Users, CalendarDays, ListOrdered, Package, DollarSign, FileText, Settings, LogOut,
  CalendarPlus, Clock, History, Menu
} from "lucide-react";

const adminNav = [
  { title: "Dashboard", url: "/admin", icon: Stethoscope },
  { title: "Patients", url: "/admin/patients", icon: Users },
  { title: "Appointments", url: "/admin/appointments", icon: CalendarDays },
  { title: "Queue", url: "/admin/queue", icon: ListOrdered },
  { title: "Inventory", url: "/admin/inventory", icon: Package },
  { title: "Sales", url: "/admin/sales", icon: DollarSign },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const patientNav = [
  { title: "Dashboard", url: "/patient", icon: Stethoscope },
  { title: "Book Appointment", url: "/patient/book", icon: CalendarPlus },
  { title: "My Appointments", url: "/patient/appointments", icon: CalendarDays },
  { title: "Dental History", url: "/patient/history", icon: History },
];

function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const nav = user?.role === "admin" ? adminNav : patientNav;
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" className="gradient-sidebar border-r-0">
      <SidebarContent>
        <div className="p-4 flex items-center gap-3">
          <img src="/clinic-logo.png" alt="Ayag Dental Clinic" className="w-9 h-9 rounded-xl object-contain flex-shrink-0" />
          {!collapsed && <span className="text-lg font-bold font-heading text-sidebar-foreground">Ayag Dental</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            {!collapsed && "Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/admin" || item.url === "/patient"} className="text-sidebar-foreground/70 hover:bg-sidebar-accent" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="w-4 h-4 mr-2" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          {!collapsed && (
            <div className="mb-3 p-3 rounded-lg bg-sidebar-accent">
              <p className="text-xs text-sidebar-foreground/70">Logged in as</p>
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50 capitalize">{user?.role}</p>
            </div>
          )}
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => { logout(); navigate("/login"); }}>
            <LogOut className="w-4 h-4 mr-2" />
            {!collapsed && "Sign Out"}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
