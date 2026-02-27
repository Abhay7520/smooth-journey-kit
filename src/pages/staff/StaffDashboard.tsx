import DashboardLayout from "@/components/DashboardLayout";
import { Package, Truck, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const stats = [
  { label: "Assigned", value: "8", icon: Package, color: "text-orange-400" },
  { label: "In Transit", value: "5", icon: Truck, color: "text-blue-400" },
  { label: "High Risk", value: "2", icon: AlertTriangle, color: "text-red-400" },
  { label: "Completed Today", value: "3", icon: CheckCircle, color: "text-emerald-400" },
];

const parcels = [
  { id: "AP-20260001", dest: "New Delhi, DL", priority: "High", risk: "Medium", status: "In Transit", eta: "Feb 27" },
  { id: "AP-20260005", dest: "Jaipur, RJ", priority: "Urgent", risk: "High", status: "Picked", eta: "Feb 26" },
  { id: "AP-20260006", dest: "Lucknow, UP", priority: "Normal", risk: "Low", status: "In Transit", eta: "Feb 28" },
  { id: "AP-20260007", dest: "Kolkata, WB", priority: "High", risk: "High", status: "Picked", eta: "Mar 01" },
  { id: "AP-20260008", dest: "Chennai, TN", priority: "Normal", risk: "Low", status: "In Transit", eta: "Feb 28" },
];

const StaffDashboard = () => {
  return (
    <DashboardLayout role="staff">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Staff Dashboard</h1>
        <p className="mt-1 text-white/50">Manage your assigned deliveries</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
          <h2 className="font-display text-lg font-semibold text-white">Assigned Parcels</h2>
          <span className="text-xs text-white/40">Sorted by AI priority</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-xs uppercase tracking-wider text-white/40">
                <th className="px-5 py-3 font-medium">Tracking ID</th>
                <th className="px-5 py-3 font-medium">Destination</th>
                <th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Update</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.04]">
                  <td className="px-5 py-4 font-medium text-orange-400">{p.id}</td>
                  <td className="px-5 py-4 text-sm text-white/80">{p.dest}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.priority === "Urgent" ? "bg-red-500/10 text-red-400" :
                      p.priority === "High" ? "bg-amber-500/10 text-amber-400" :
                      "bg-white/10 text-white/50"
                    }`}>{p.priority}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium ${p.risk === "High" ? "text-red-400" : p.risk === "Medium" ? "text-amber-400" : "text-emerald-400"}`}>
                      {p.risk === "High" && <AlertTriangle className="mb-0.5 mr-1 inline h-3 w-3" />}
                      {p.risk}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.status === "In Transit" ? "bg-blue-500/10 text-blue-400" : "bg-orange-500/10 text-orange-400"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Select defaultValue={p.status.toLowerCase().replace(" ", "-")}>
                      <SelectTrigger className="h-8 w-32 text-xs border-white/10 bg-white/5 text-white"><SelectValue /></SelectTrigger>
                      <SelectContent className="border-white/10 bg-[#18181b] text-white">
                        <SelectItem value="picked">Picked</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
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

export default StaffDashboard;
