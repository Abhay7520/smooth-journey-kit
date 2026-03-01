import DashboardLayout from "@/components/DashboardLayout";
import { Package, Truck, AlertTriangle, CheckCircle, Clock, TrendingUp, Bell, MapPin, ScanLine, MessageSquare, X, Navigation, Phone, IndianRupee, Star, KeyRound, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LeafletMap from "@/components/LeafletMap";

// ── Staff data ──
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

const staffMapMarkers = [
  { id: "AP-20260001", lat: 28.6139, lng: 77.209, label: "New Delhi", status: "moving" as const },
  { id: "AP-20260006", lat: 26.8467, lng: 80.9462, label: "Lucknow", status: "moving" as const },
  { id: "AP-20260008", lat: 13.0827, lng: 80.2707, label: "Chennai", status: "moving" as const },
  { id: "AP-20260005", lat: 26.9124, lng: 75.7873, label: "Jaipur", status: "delayed" as const },
  { id: "AP-20260007", lat: 22.5726, lng: 88.3639, label: "Kolkata", status: "delayed" as const },
];

// ── Delivery Agent data ──
const todaysStops = [
  { id: "AP-20260010", customer: "Ravi Menon", address: "14, MG Road, Bangalore 560001", phone: "+91 98XXX XX10", eta: "10:30 AM", status: "delivered", otp: "", lat: 12.9716, lng: 77.5946 },
  { id: "AP-20260011", customer: "Anita Das", address: "B-12, Salt Lake, Kolkata 700091", phone: "+91 97XXX XX11", eta: "11:45 AM", status: "delivered", otp: "", lat: 22.58, lng: 88.415 },
  { id: "AP-20260012", customer: "Karan Joshi", address: "Plot 8, Sector 22, Noida 201301", phone: "+91 99XXX XX12", eta: "1:15 PM", status: "current", otp: "4829", lat: 28.5355, lng: 77.391 },
  { id: "AP-20260013", customer: "Meera Nair", address: "Flat 5A, Marine Drive, Mumbai 400002", phone: "+91 96XXX XX13", eta: "3:00 PM", status: "upcoming", otp: "", lat: 18.944, lng: 72.8234 },
  { id: "AP-20260014", customer: "Suresh Iyer", address: "23, Anna Nagar, Chennai 600040", phone: "+91 95XXX XX14", eta: "4:30 PM", status: "upcoming", otp: "", lat: 13.085, lng: 80.2101 },
];

const earningsData = {
  today: 480, week: 3250, month: 14200, perDelivery: 60, incentiveBonus: 500, totalDeliveries: 8, completedToday: 2,
};

const StaffDashboard = () => {
  // Staff state
  const [showNotifications, setShowNotifications] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Delivery Agent state
  const [isDeliveryMode, setIsDeliveryMode] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [showContact, setShowContact] = useState<string | null>(null);

  const handleScan = () => {
    setScanMode(true);
    setTimeout(() => { setScanResult("AP-20260006"); setScanMode(false); }, 2000);
  };

  const handleConfirmOTP = (parcelId: string) => {
    const stop = todaysStops.find(s => s.id === parcelId);
    if (stop && otpInput === stop.otp) {
      setConfirmed(prev => [...prev, parcelId]);
      setOtpInput("");
    }
  };

  const deliveryMapMarkers = todaysStops.map(s => ({
    id: s.id,
    lat: s.lat,
    lng: s.lng,
    label: s.customer,
    status: (s.status === "delivered" || confirmed.includes(s.id) ? "delivered" : s.status === "current" && !confirmed.includes(s.id) ? "current" : "moving") as "moving" | "delayed" | "delivered" | "current",
  }));

  const deliveryStats = [
    { label: "Today's Stops", value: todaysStops.length.toString(), icon: MapPin, color: "text-blue-400" },
    { label: "Completed", value: `${earningsData.completedToday + confirmed.length}`, icon: CheckCircle, color: "text-emerald-400" },
    { label: "Today's Earnings", value: `₹${earningsData.today + confirmed.length * earningsData.perDelivery}`, icon: IndianRupee, color: "text-orange-400" },
    { label: "Rating", value: "4.8 ★", icon: Star, color: "text-amber-400" },
  ];

  return (
    <DashboardLayout role="staff">
      {/* Header with Delivery Agent Toggle */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            {isDeliveryMode ? "Delivery Agent" : "Staff Dashboard"}
          </h1>
          <p className="mt-1 text-white/50">
            {isDeliveryMode ? "Your deliveries and route for today" : "Manage your assigned deliveries"}
          </p>
        </div>
        <div className="flex gap-2">
          {/* Delivery Agent Toggle */}
          <Button
            size="sm"
            variant={isDeliveryMode ? "default" : "outline"}
            className={isDeliveryMode
              ? "bg-gradient-to-r from-orange-500 to-violet-600 text-white hover:opacity-90"
              : "border-white/10 bg-white/5 text-white hover:bg-white/10"}
            onClick={() => setIsDeliveryMode(!isDeliveryMode)}
          >
            <Navigation className="mr-1.5 h-4 w-4" />
            {isDeliveryMode ? "Back to Staff" : "Delivery Mode"}
          </Button>

          {!isDeliveryMode && (
            <>
              <Button variant="outline" size="sm"
                className="relative border-white/10 bg-white/5 text-white hover:bg-white/10"
                onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">4</span>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-violet-600 text-white hover:opacity-90" onClick={handleScan}>
                <ScanLine className="mr-2 h-4 w-4" />
                {scanMode ? "Scanning..." : "Scan Parcel"}
              </Button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isDeliveryMode ? (
          <motion.div key="delivery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {/* ─── DELIVERY AGENT VIEW ─── */}
            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deliveryStats.map((s, i) => (
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

            {/* Live Map */}
            <div className="mb-6 rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <h3 className="font-display text-lg font-semibold text-white">Live Delivery Map</h3>
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
                </span>
              </div>
              <LeafletMap markers={deliveryMapMarkers} center={[22, 80]} zoom={5} className="h-[280px]" />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Route & Stops */}
              <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-white/[0.06] p-5">
                  <Navigation className="h-5 w-5 text-orange-400" />
                  <h2 className="font-display text-lg font-semibold text-white">Today's Route & Stops</h2>
                  <span className="ml-auto text-xs text-white/30">{todaysStops.length} stops</span>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {todaysStops.map((stop, i) => {
                    const isDelivered = stop.status === "delivered" || confirmed.includes(stop.id);
                    const isCurrent = stop.status === "current" && !confirmed.includes(stop.id);
                    return (
                      <div key={stop.id} className={`p-4 ${isCurrent ? "bg-orange-500/5" : "hover:bg-white/[0.04]"}`}>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex flex-col items-center">
                            <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              isDelivered ? "bg-emerald-500/20" : isCurrent ? "bg-orange-500/20 ring-2 ring-orange-500/30" : "bg-white/[0.08]"
                            }`}>
                              {isDelivered ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> :
                               isCurrent ? <Package className="h-3.5 w-3.5 text-orange-400" /> :
                               <Clock className="h-3.5 w-3.5 text-white/30" />}
                            </div>
                            {i < todaysStops.length - 1 && (
                              <div className={`mt-1 h-8 w-px ${isDelivered ? "bg-emerald-500/30" : "bg-white/[0.08]"}`} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${isDelivered ? "text-white/40 line-through" : "text-orange-400"}`}>{stop.id}</span>
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                isDelivered ? "bg-emerald-500/10 text-emerald-400" : isCurrent ? "bg-orange-500/10 text-orange-400" : "bg-white/10 text-white/40"
                              }`}>{isDelivered ? "Delivered" : isCurrent ? "Current" : stop.eta}</span>
                            </div>
                            <p className={`mt-1 text-sm ${isDelivered ? "text-white/30" : "text-white/80"}`}>{stop.customer}</p>
                            <p className="text-xs text-white/40">{stop.address}</p>

                            {isCurrent && (
                              <div className="mt-3 space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-500/5 px-3 py-2">
                                    <KeyRound className="h-4 w-4 text-orange-400" />
                                    <input type="text" maxLength={4} placeholder="Enter OTP" value={otpInput}
                                      onChange={(e) => setOtpInput(e.target.value)}
                                      className="w-16 bg-transparent text-sm font-mono text-white placeholder:text-white/30 outline-none" />
                                  </div>
                                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-violet-600 text-white hover:opacity-90"
                                    onClick={() => handleConfirmOTP(stop.id)} disabled={otpInput.length < 4}>
                                    Confirm Delivery
                                  </Button>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                                    onClick={() => setShowContact(showContact === stop.id ? null : stop.id)}>
                                    <Phone className="mr-1.5 h-3.5 w-3.5" /> Contact
                                  </Button>
                                  <Button size="sm" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                                    <Navigation className="mr-1.5 h-3.5 w-3.5" /> Navigate
                                  </Button>
                                </div>
                              </div>
                            )}

                            <AnimatePresence>
                              {showContact === stop.id && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                  className="mt-2 overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
                                  <p className="mb-2 text-xs text-white/40">Customer contact (masked)</p>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="flex-1 border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10">
                                      <PhoneCall className="mr-1.5 h-3.5 w-3.5" /> Call {stop.phone}
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 border-blue-500/20 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10">
                                      <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> SMS
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {!isCurrent && !isDelivered && (
                              <div className="mt-2 flex gap-2">
                                <Button size="sm" variant="ghost" className="h-7 text-xs text-white/30 hover:text-white/60"
                                  onClick={() => setShowContact(showContact === stop.id ? null : stop.id)}>
                                  <Phone className="mr-1 h-3 w-3" /> Contact
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Earnings Sidebar */}
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-emerald-400" />
                    <h3 className="font-display text-lg font-semibold text-white">Earnings</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                      <p className="text-xs text-white/40">Today's Earnings</p>
                      <p className="font-display text-3xl font-bold text-emerald-400">₹{earningsData.today + confirmed.length * earningsData.perDelivery}</p>
                      <p className="text-xs text-white/30">{earningsData.completedToday + confirmed.length} × ₹{earningsData.perDelivery}/delivery</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
                        <p className="text-xs text-white/40">This Week</p>
                        <p className="font-display text-lg font-bold text-white">₹{earningsData.week.toLocaleString()}</p>
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
                        <p className="text-xs text-white/40">This Month</p>
                        <p className="font-display text-lg font-bold text-white">₹{earningsData.month.toLocaleString()}</p>
                      </div>
                    </div>
                    {earningsData.incentiveBonus > 0 && (
                      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/40">Incentive Bonus</span>
                          <span className="text-sm font-bold text-amber-400">+₹{earningsData.incentiveBonus}</span>
                        </div>
                        <p className="mt-1 text-[10px] text-white/30">Complete 25 deliveries this week to unlock</p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Progress */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
                  <h3 className="mb-3 font-display text-sm font-semibold text-white">Today's Summary</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Total Stops</span>
                      <span className="text-sm font-medium text-white">{todaysStops.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Delivered</span>
                      <span className="text-sm font-medium text-emerald-400">{earningsData.completedToday + confirmed.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Remaining</span>
                      <span className="text-sm font-medium text-orange-400">{todaysStops.length - earningsData.completedToday - confirmed.length}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/[0.08]">
                      <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-emerald-400"
                        style={{ width: `${((earningsData.completedToday + confirmed.length) / todaysStops.length) * 100}%` }} />
                    </div>
                    <p className="text-center text-[10px] text-white/30">
                      {Math.round(((earningsData.completedToday + confirmed.length) / todaysStops.length) * 100)}% complete
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="staff" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            {/* ─── STAFF VIEW ─── */}
            {/* Scan Result */}
            <AnimatePresence>
              {scanResult && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 backdrop-blur-sm">
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
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
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

            {/* Performance & Live Map */}
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
                        <div className={`h-full rounded-full bg-gradient-to-r ${ps.color}`}
                          style={{ width: `${(ps.value / ps.max) * 100}%` }} />
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
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Live
                  </span>
                </div>
                <LeafletMap markers={staffMapMarkers} center={[22.5, 78.5]} zoom={5} className="h-[280px]" />
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
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default StaffDashboard;
