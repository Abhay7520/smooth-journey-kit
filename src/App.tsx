import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthRoleSelect from "./pages/auth/AuthRoleSelect";
import AuthPage from "./pages/auth/AuthPage";
import UserDashboard from "./pages/user/UserDashboard";
import BookParcel from "./pages/user/BookParcel";
import Payment from "./pages/user/Payment";
import OrderConfirmation from "./pages/user/OrderConfirmation";
import TrackParcel from "./pages/user/TrackParcel";
import UserOrders from "./pages/user/UserOrders";
import StaffDashboard from "./pages/staff/StaffDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Auth routes */}
          <Route path="/auth/select/login" element={<AuthRoleSelect mode="login" />} />
          <Route path="/auth/select/register" element={<AuthRoleSelect mode="register" />} />
          <Route path="/auth/:role/:mode" element={<AuthPage />} />
          {/* Legacy redirects */}
          <Route path="/login" element={<Navigate to="/auth/select/login" replace />} />
          <Route path="/register" element={<Navigate to="/auth/select/register" replace />} />
          {/* User routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/book" element={<BookParcel />} />
          <Route path="/user/payment" element={<Payment />} />
          <Route path="/user/confirmation" element={<OrderConfirmation />} />
          <Route path="/user/track" element={<TrackParcel />} />
          <Route path="/user/orders" element={<UserOrders />} />
          {/* Staff routes */}
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/delivery" element={<StaffDashboard />} />
          <Route path="/staff/parcels" element={<StaffDashboard />} />
          <Route path="/staff/update" element={<StaffDashboard />} />
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/parcels" element={<AdminDashboard />} />
          <Route path="/admin/staff" element={<AdminDashboard />} />
          <Route path="/admin/anomalies" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
