import DashboardLayout from "@/components/DashboardLayout";
import { Package, MapPin, Clock, TrendingUp, ArrowUpRight, ArrowRight, Bell, Sparkles, Shield, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const stats = [
  { label: "Active Parcels", value: "3", icon: Package, color: "text-orange-400", bg: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/20", trend: "+1 this week" },
  { label: "Delivered", value: "12", icon: MapPin, color: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20", trend: "All time" },
  { label: "Avg Delivery", value: "2.4 days", icon: Clock, color: "text-indigo-400", bg: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/20", trend: "↓ 0.3 days" },
  { label: "On Time Rate", value: "94%", icon: TrendingUp, color: "text-violet-400", bg: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/20", trend: "↑ 2%" },
];

const recentOrders = [
  { id: "AP-20260001", dest: "Mumbai, MH", status: "In Transit", eta: "Feb 27", risk: "Low", progress: 65 },
  { id: "AP-20260002", dest: "Delhi, DL", status: "Processing", eta: "Mar 01", risk: "Medium", progress: 25 },
  { id: "AP-20260003", dest: "Bangalore, KA", status: "Delivered", eta: "Feb 24", risk: "None", progress: 100 },
];

const activityData = [
  { day: "Mon", parcels: 2 }, { day: "Tue", parcels: 1 }, { day: "Wed", parcels: 3 },
  { day: "Thu", parcels: 0 }, { day: "Fri", parcels: 2 }, { day: "Sat", parcels: 1 }, { day: "Sun", parcels: 4 },
];

const trackingTimeline = [
  { label: "Order Placed", done: true },
  { label: "Picked Up", done: true },
  { label: "In Transit", done: true },
  { label: "Out for Delivery", done: false },
  { label: "Delivered", done: false },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#12121a] px-3 py-2 text-xs text-white shadow-lg">
        <p className="text-white/50">{label}</p>
        <p className="font-semibold text-orange-400">{payload[0].value} parcels</p>
      </div>
    );
  }
  return null;
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const UserDashboard = () => {
  return (
    <DashboardLayout role="user">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-orange-500/10 via-violet-500/5 to-transparent p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-orange-400/80">AI Postal Dashboard</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white">{getGreeting()}, John 👋</h1>
            <p className="mt-1 text-white/50">You have <span className="font-semibold text-orange-400">3 active parcels</span> being tracked right now</p>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/user/book">
              <Button className="bg-gradient-to-r from-orange-500 to-violet-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:opacity-90 transition-all">
                <Package className="mr-2 h-4 w-4" /> Book New Parcel
              </Button>
            </Link>
            <Link to="/user/track">
              <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <MapPin className="mr-2 h-4 w-4" /> Track Parcel
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-xl border ${s.border} bg-gradient-to-b ${s.bg} p-5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">{s.label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] ${s.color}`}>
                <s.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-white">{s.value}</p>
            <p className="mt-1 text-xs text-white/30">{s.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile Quick Actions */}
      <div className="mb-8 flex gap-3 lg:hidden">
        <Link to="/user/book" className="flex-1">
          <Button className="w-full bg-gradient-to-r from-orange-500 to-violet-600 text-white hover:opacity-90">
            <Package className="mr-2 h-4 w-4" /> Book Parcel
          </Button>
        </Link>
        <Link to="/user/track" className="flex-1">
          <Button variant="outline" className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10">
            <MapPin className="mr-2 h-4 w-4" /> Track
          </Button>
        </Link>
      </div>

      {/* Activity Chart + Active Tracking */}
      <div className="mb-8 grid gap-6 lg:grid-cols-5">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-white">Weekly Activity</h3>
            <span className="text-xs text-white/30">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="userActivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="parcels" stroke="hsl(25, 95%, 53%)" fill="url(#userActivityGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="mt-2 text-center text-xs text-white/30">13 parcels shipped this week</p>
        </motion.div>

        {/* Live Tracking Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-3 rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent p-6 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                <Package className="h-4 w-4 text-orange-400" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-white">AP-20260001</h3>
                <p className="text-xs text-white/40">Mumbai, Maharashtra</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
            </span>
          </div>

          {/* Timeline */}
          <div className="mb-4 flex items-center justify-between px-2">
            {trackingTimeline.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-1.5">
                <div className="flex items-center">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    step.done ? "bg-orange-500 shadow-lg shadow-orange-500/30" : "bg-white/[0.08]"
                  }`}>
                    {step.done && <span className="text-[10px] text-white">✓</span>}
                  </div>
                  {i < trackingTimeline.length - 1 && (
                    <div className={`h-0.5 w-8 sm:w-12 lg:w-16 ${
                      step.done && trackingTimeline[i + 1]?.done ? "bg-orange-500" :
                      step.done ? "bg-gradient-to-r from-orange-500 to-white/10" : "bg-white/[0.08]"
                    }`} />
                  )}
                </div>
                <span className={`text-[10px] ${step.done ? "text-orange-400" : "text-white/30"}`}>{step.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <div>
              <p className="text-xs text-white/40">Estimated delivery</p>
              <p className="font-display text-sm font-semibold text-white">Feb 27, 2026 — 2:00 PM</p>
            </div>
            <Link to="/user/track">
              <Button size="sm" variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10">
                Track <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
          <h2 className="font-display text-lg font-semibold text-white">Recent Orders</h2>
          <Link to="/user/orders">
            <Button size="sm" variant="ghost" className="text-xs text-white/40 hover:text-white">
              View All <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {recentOrders.map((o) => (
            <div key={o.id} className="flex items-center gap-4 p-5 hover:bg-white/[0.04] transition-colors">
              {/* Icon */}
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                o.status === "Delivered" ? "bg-emerald-500/10" :
                o.status === "In Transit" ? "bg-blue-500/10" : "bg-amber-500/10"
              }`}>
                {o.status === "Delivered" ? <MapPin className="h-4.5 w-4.5 text-emerald-400" /> :
                 o.status === "In Transit" ? <Package className="h-4.5 w-4.5 text-blue-400" /> :
                 <Clock className="h-4.5 w-4.5 text-amber-400" />}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-orange-400">{o.id}</span>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    o.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" :
                    o.status === "In Transit" ? "bg-blue-500/10 text-blue-400" :
                    "bg-amber-500/10 text-amber-400"
                  }`}>{o.status}</span>
                </div>
                <p className="mt-0.5 text-sm text-white/50">{o.dest} · ETA {o.eta}</p>
              </div>

              {/* Progress */}
              <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="text-xs text-white/40">{o.progress}%</span>
                <div className="h-1.5 w-24 rounded-full bg-white/[0.08]">
                  <div className={`h-full rounded-full ${
                    o.status === "Delivered" ? "bg-emerald-500" :
                    o.status === "In Transit" ? "bg-blue-500" : "bg-amber-500"
                  }`} style={{ width: `${o.progress}%` }} />
                </div>
              </div>

              {/* Risk */}
              <span className={`hidden md:block text-xs font-medium ${
                o.risk === "None" ? "text-emerald-400" : o.risk === "Low" ? "text-blue-400" : "text-amber-400"
              }`}>
                {o.risk !== "None" && <Shield className="mb-0.5 mr-1 inline h-3 w-3" />}
                {o.risk}
              </span>

              <Link to="/user/track">
                <ArrowUpRight className="h-4 w-4 text-white/20 hover:text-orange-400 transition-colors" />
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UserDashboard;
