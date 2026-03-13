import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

import DashboardLayout from "./components/DashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPatients from "./pages/admin/AdminPatients";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminQueue from "./pages/admin/AdminQueue";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminSales from "./pages/admin/AdminSales";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";

import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientBook from "./pages/patient/PatientBook";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientQueue from "./pages/patient/PatientQueue";
import PatientHistory from "./pages/patient/PatientHistory";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === "admin" ? "/admin" : "/patient"} replace />;
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user) return <Navigate to={user.role === "admin" ? "/admin" : "/patient"} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
      <Route path="/verify" element={<Verify />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><DashboardLayout><AdminDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute role="admin"><DashboardLayout><AdminPatients /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute role="admin"><DashboardLayout><AdminAppointments /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/queue" element={<ProtectedRoute role="admin"><DashboardLayout><AdminQueue /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/inventory" element={<ProtectedRoute role="admin"><DashboardLayout><AdminInventory /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/sales" element={<ProtectedRoute role="admin"><DashboardLayout><AdminSales /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute role="admin"><DashboardLayout><AdminReports /></DashboardLayout></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute role="admin"><DashboardLayout><AdminSettings /></DashboardLayout></ProtectedRoute>} />

      {/* Patient Routes */}
      <Route path="/patient" element={<ProtectedRoute role="patient"><DashboardLayout><PatientDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/patient/book" element={<ProtectedRoute role="patient"><DashboardLayout><PatientBook /></DashboardLayout></ProtectedRoute>} />
      <Route path="/patient/appointments" element={<ProtectedRoute role="patient"><DashboardLayout><PatientAppointments /></DashboardLayout></ProtectedRoute>} />
      <Route path="/patient/queue" element={<ProtectedRoute role="patient"><DashboardLayout><PatientQueue /></DashboardLayout></ProtectedRoute>} />
      <Route path="/patient/history" element={<ProtectedRoute role="patient"><DashboardLayout><PatientHistory /></DashboardLayout></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
