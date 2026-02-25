import DashboardLayout from "@/components/DashboardLayout";
import { Package, Truck, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const stats = [
  { label: "Assigned", value: "8", icon: Package, color: "text-accent" },
  { label: "In Transit", value: "5", icon: Truck, color: "text-info" },
  { label: "High Risk", value: "2", icon: AlertTriangle, color: "text-destructive" },
  { label: "Completed Today", value: "3", icon: CheckCircle, color: "text-success" },
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
        <h1 className="font-display text-3xl font-bold text-foreground">Staff Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Manage your assigned deliveries</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-lg font-semibold text-foreground">Assigned Parcels</h2>
          <span className="text-xs text-muted-foreground">Sorted by AI priority</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
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
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-5 py-4 font-medium text-accent">{p.id}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{p.dest}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.priority === "Urgent" ? "bg-destructive/10 text-destructive" :
                      p.priority === "High" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>{p.priority}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium ${p.risk === "High" ? "text-destructive" : p.risk === "Medium" ? "text-warning" : "text-success"}`}>
                      {p.risk === "High" && <AlertTriangle className="mb-0.5 mr-1 inline h-3 w-3" />}
                      {p.risk}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.status === "In Transit" ? "bg-info/10 text-info" : "bg-accent/10 text-accent"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Select defaultValue={p.status.toLowerCase().replace(" ", "-")}>
                      <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
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
