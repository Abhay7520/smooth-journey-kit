import { Link, useLocation } from "react-router-dom";
import { Package, LayoutDashboard, Truck, MapPin, ClipboardList, AlertTriangle, LogOut, Users, BarChart3 } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "user" | "staff" | "admin";
}

const navItems = {
  user: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/user/dashboard" },
    { label: "Book Parcel", icon: Package, path: "/user/book" },
    { label: "Track Parcel", icon: MapPin, path: "/user/track" },
    { label: "My Orders", icon: ClipboardList, path: "/user/orders" },
  ],
  staff: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/staff/dashboard" },
    { label: "Assigned Parcels", icon: Truck, path: "/staff/parcels" },
    { label: "Update Status", icon: ClipboardList, path: "/staff/update" },
  ],
  admin: [
    { label: "Dashboard", icon: BarChart3, path: "/admin/dashboard" },
    { label: "All Parcels", icon: Package, path: "/admin/parcels" },
    { label: "Staff", icon: Users, path: "/admin/staff" },
    { label: "Anomalies", icon: AlertTriangle, path: "/admin/anomalies" },
  ],
};

const roleLabels = { user: "User", staff: "Staff", admin: "Admin" };

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const location = useLocation();
  const items = navItems[role];

  return (
    <div className="flex min-h-screen bg-[#050508]">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-white/[0.08] bg-[#08080c]">
        <div className="flex h-16 items-center gap-2 border-b border-white/[0.08] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-violet-600">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-white">AIPOSTAL</span>
        </div>

        <div className="px-4 pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/30">
            {roleLabels[role]} Panel
          </span>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {items.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gradient-to-r from-orange-500/20 to-violet-600/10 text-orange-400 border border-orange-500/20"
                    : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.08] p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative z-10 ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
