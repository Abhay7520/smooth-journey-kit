import DashboardLayout from "@/components/DashboardLayout";
import { Package, MapPin, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Parcels", value: "3", icon: Package, color: "text-accent" },
  { label: "Delivered", value: "12", icon: MapPin, color: "text-success" },
  { label: "Avg Delivery", value: "2.4 days", icon: Clock, color: "text-info" },
  { label: "On Time Rate", value: "94%", icon: TrendingUp, color: "text-accent" },
];

const recentOrders = [
  { id: "AP-20260001", dest: "Mumbai, MH", status: "In Transit", eta: "Feb 27", risk: "Low" },
  { id: "AP-20260002", dest: "Delhi, DL", status: "Processing", eta: "Mar 01", risk: "Medium" },
  { id: "AP-20260003", dest: "Bangalore, KA", status: "Delivered", eta: "Feb 24", risk: "None" },
];

const UserDashboard = () => {
  return (
    <DashboardLayout role="user">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome back, John</h1>
        <p className="mt-1 text-muted-foreground">Here's your delivery overview</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 flex gap-4">
        <Link to="/user/book">
          <Button className="bg-accent-gradient text-accent-foreground hover:opacity-90">
            <Package className="mr-2 h-4 w-4" /> Book New Parcel
          </Button>
        </Link>
        <Link to="/user/track">
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" /> Track Parcel
          </Button>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="border-b border-border p-5">
          <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-5 py-3 font-medium">Tracking ID</th>
                <th className="px-5 py-3 font-medium">Destination</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">ETA</th>
                <th className="px-5 py-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-4 font-medium text-accent">{o.id}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{o.dest}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      o.status === "Delivered" ? "bg-success/10 text-success" :
                      o.status === "In Transit" ? "bg-info/10 text-info" :
                      "bg-warning/10 text-warning"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground">{o.eta}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium ${
                      o.risk === "None" ? "text-success" :
                      o.risk === "Low" ? "text-info" :
                      "text-warning"
                    }`}>
                      {o.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
