import DashboardLayout from "@/components/DashboardLayout";
import { Package, Truck, AlertTriangle, CheckCircle, Clock, TrendingUp, BarChart3, Bell, MapPin, ScanLine, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const stats = [
  { label: "Assigned", value: "8", icon: Package, color: "text-orange-400", change: "+2 today" },
  { label: "In Transit", value: "5", icon: Truck, color: "text-blue-400", change: "3 on route" },
  { label: "High Risk", value: "2", icon: AlertTriangle, color: "text-red-400", change: "1 critical" },
  { label: "Completed Today", value: "3", icon: CheckCircle, color: "text-emerald-400", change: "75% on time" },
];

const performanceStats = [
  { label: "Deliveries This Week", value: 18, max: 25, color: "from-orange-500 to-amber-400" },
  { label: "On-Time Rate", value: 92, max: 100, color: "from-emerald-500 to-emerald-400" },
  { label: "Customer Rating", value: 4.7, max: 5, color: "from-violet-500 to-indigo-400", suffix: "/5" },
  { label: "Avg Delivery Time", value: 1.8, max: 3, color: "from-blue-500 to-cyan-400", suffix: " hrs" },
];

const parcels = [
  { id: "AP-20260001", dest: "New Delhi, DL", priority: "High", risk: "Medium", status: "In Transit", eta: "Feb 27" },
  { id: "AP-20260005", dest: "Jaipur, RJ", priority: "Urgent", risk: "High", status: "Picked", eta: "Feb 26" },
  { id: "AP-20260006", dest: "Lucknow, UP", priority: "Normal", risk: "Low", status: "In Transit", eta: "Feb 28" },
  { id: "AP-20260007", dest: "Kolkata, WB", priority: "High", risk: "High", status: "Picked", eta: "Mar 01" },
  { id: "AP-20260008", dest: "Chennai, TN", priority: "Normal", risk: "Low", status: "In Transit", eta: "Feb 28" },
];

const notifications = [
  { id: 1, type: "alert", msg: "AP-20260005 flagged as high-risk — reroute suggested", time: "2m ago" },
  { id: 2, type: "info", msg: "New parcel AP-20260009 assigned to you", time: "15m ago" },
  { id: 3, type: "success", msg: "AP-20260003 delivered successfully — rated 5★", time: "1h ago" },
  { id: 4, type: "alert", msg: "Delay alert: AP-20260007 stuck at sorting hub", time: "2h ago" },
];

const mapPoints = [
  { id: "AP-20260001", lat: "28.6°N", lng: "77.2°E", label: "New Delhi", status: "moving" },
  { id: "AP-20260006", lat: "26.8°N", lng: "80.9°E", label: "Lucknow", status: "moving" },
  { id: "AP-20260008", lat: "13.1°N", lng: "80.3°E", label: "Chennai", status: "moving" },
  { id: "AP-20260005", lat: "26.9°N", lng: "75.8°E", label: "Jaipur", status: "delayed" },
  { id: "AP-20260007", lat: "22.6°N", lng: "88.4°E", label: "Kolkata", status: "delayed" },
];

const StaffDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScan = () => {
    setScanMode(true);
    setTimeout(() => {
      setScanResult("AP-20260006");
      setScanMode(false);
    }, 2000);
  };

  return (
    <DashboardLayout role="staff">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Staff Dashboard</h1>
          <p className="mt-1 text-white/50">Manage your assigned deliveries</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="relative border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">4</span>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-violet-600 text-white hover:opacity-90"
            onClick={handleScan}
          >
            <ScanLine className="mr-2 h-4 w-4" />
            {scanMode ? "Scanning..." : "Scan Parcel"}
          </Button>
        </div>
      </div>

      {/* Scan Result */}
      <AnimatePresence>
        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-white">Scanned: <span className="font-semibold text-orange-400">{scanResult}</span> — Lucknow, UP — In Transit</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white/40 hover:text-white" onClick={() => setScanResult(null)}>
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-orange-400" />
                <h3 className="font-display text-sm font-semibold text-white">Notifications & Alerts</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-white/40 hover:text-white" onClick={() => setShowNotifications(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-white/[0.04]">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${
                    n.type === "alert" ? "bg-red-400" : n.type === "success" ? "bg-emerald-400" : "bg-blue-400"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-white/80">{n.msg}</p>
                    <span className="text-xs text-white/30">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stat Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">{s.label}</span>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="mt-1 text-xs text-white/30">{s.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Stats & Live Map */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Performance */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            <h3 className="font-display text-lg font-semibold text-white">My Performance</h3>
          </div>
          <div className="space-y-4">
            {performanceStats.map((ps) => (
              <div key={ps.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-white/60">{ps.label}</span>
                  <span className="font-display text-sm font-bold text-white">{ps.value}{ps.suffix || ""}</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.08]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${ps.color}`}
                    style={{ width: `${(ps.value / ps.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
            <p className="text-xs text-white/40">🎯 Weekly target: 25 deliveries — <span className="text-orange-400">72% complete</span></p>
          </div>
        </motion.div>

        {/* Live Map */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <h3 className="font-display text-lg font-semibold text-white">Live Parcel Map</h3>
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
          </div>
          {/* Simulated Map */}
          <div className="relative h-[220px] rounded-lg border border-white/[0.06] bg-[#0a0a14] overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />
            {mapPoints.map((p, i) => (
              <div key={p.id} className="absolute" style={{
                left: `${15 + i * 18}%`,
                top: `${25 + (i % 3) * 20}%`,
              }}>
                <div className={`relative flex h-6 w-6 items-center justify-center rounded-full ${
                  p.status === "moving" ? "bg-blue-500/30" : "bg-red-500/30"
                }`}>
                  <div className={`h-2.5 w-2.5 rounded-full ${
                    p.status === "moving" ? "bg-blue-400 animate-pulse" : "bg-red-400 animate-pulse"
                  }`} />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-white/50">{p.label}</span>
                </div>
              </div>
            ))}
            <div className="absolute bottom-3 right-3 flex gap-3">
              <div className="flex items-center gap-1 text-[10px] text-white/40">
                <span className="h-2 w-2 rounded-full bg-blue-400" /> Moving
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/40">
                <span className="h-2 w-2 rounded-full bg-red-400" /> Delayed
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Parcels Table */}
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
