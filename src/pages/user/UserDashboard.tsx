import DashboardLayout from "@/components/DashboardLayout";
import { Package, MapPin, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Parcels", value: "3", icon: Package, color: "text-orange-400" },
  { label: "Delivered", value: "12", icon: MapPin, color: "text-emerald-400" },
  { label: "Avg Delivery", value: "2.4 days", icon: Clock, color: "text-indigo-400" },
  { label: "On Time Rate", value: "94%", icon: TrendingUp, color: "text-violet-400" },
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
        <h1 className="font-display text-3xl font-bold text-white">Welcome back, John</h1>
        <p className="mt-1 text-white/50">Here's your delivery overview</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 flex gap-4">
        <Link to="/user/book">
          <Button className="bg-gradient-to-r from-orange-500 to-violet-600 text-white hover:opacity-90">
            <Package className="mr-2 h-4 w-4" /> Book New Parcel
          </Button>
        </Link>
        <Link to="/user/track">
          <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
            <MapPin className="mr-2 h-4 w-4" /> Track Parcel
          </Button>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
        <div className="border-b border-white/[0.06] p-5">
          <h2 className="font-display text-lg font-semibold text-white">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-sm text-white/40">
                <th className="px-5 py-3 font-medium uppercase tracking-wider text-xs">Tracking ID</th>
                <th className="px-5 py-3 font-medium uppercase tracking-wider text-xs">Destination</th>
                <th className="px-5 py-3 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="px-5 py-3 font-medium uppercase tracking-wider text-xs">ETA</th>
                <th className="px-5 py-3 font-medium uppercase tracking-wider text-xs">Risk</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.04]">
                  <td className="px-5 py-4 font-medium text-orange-400">{o.id}</td>
                  <td className="px-5 py-4 text-sm text-white/80">{o.dest}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      o.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" :
                      o.status === "In Transit" ? "bg-blue-500/10 text-blue-400" :
                      "bg-amber-500/10 text-amber-400"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/80">{o.eta}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium ${
                      o.risk === "None" ? "text-emerald-400" :
                      o.risk === "Low" ? "text-blue-400" :
                      "text-amber-400"
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
