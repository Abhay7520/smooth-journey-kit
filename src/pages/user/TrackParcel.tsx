import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, MapPin, CheckCircle, Truck, Building2, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const milestones = [
  { label: "Order Placed", time: "Feb 25, 10:30 AM", done: true, icon: Package },
  { label: "Picked Up from Pune GPO", time: "Feb 25, 2:15 PM", done: true, icon: Building2 },
  { label: "In Transit to Delhi Hub", time: "Feb 26, 8:00 AM", done: true, icon: Truck },
  { label: "Arrived at Delhi Sorting", time: "Predicted: Feb 26, 6:00 PM", done: false, icon: Building2, predicted: true },
  { label: "Out for Delivery", time: "Predicted: Feb 27, 9:00 AM", done: false, icon: Truck, predicted: true },
  { label: "Delivered", time: "Predicted: Feb 27, 12:00 PM", done: false, icon: CheckCircle, predicted: true },
];

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("AP-20260001");
  const [tracked, setTracked] = useState(true);

  return (
    <DashboardLayout role="user">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Track Parcel</h1>
        <p className="mt-1 text-white/50">Enter your tracking ID for real-time updates</p>
      </div>

      <div className="mb-8 flex max-w-lg gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <Input
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID (e.g., AP-20260001)"
            className="pl-10 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-orange-500/50"
          />
        </div>
        <Button onClick={() => setTracked(true)} className="bg-gradient-to-r from-orange-500 to-violet-600 text-white hover:opacity-90">Track</Button>
      </div>

      {tracked && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid max-w-4xl gap-6 lg:grid-cols-3">
          {/* Info card */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
            <h3 className="font-display text-lg font-semibold text-white">Parcel Info</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div><span className="text-white/40">Tracking ID</span><p className="font-medium text-orange-400">{trackingId}</p></div>
              <div><span className="text-white/40">From</span><p className="text-white/80">Pune, MH</p></div>
              <div><span className="text-white/40">To</span><p className="text-white/80">New Delhi, DL</p></div>
              <div><span className="text-white/40">Status</span>
                <p className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                  <Truck className="h-3 w-3" /> In Transit
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-400">
                <AlertTriangle className="h-4 w-4" /> AI Delay Alert
              </div>
              <p className="mt-1 text-xs text-white/50">
                Weather conditions near Delhi may cause a 4-6 hour delay. Updated ETA reflected below.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm">
            <h3 className="mb-6 font-display text-lg font-semibold text-white">Tracking Timeline</h3>
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      m.done ? "bg-emerald-500 text-white" :
                      m.predicted ? "border-2 border-dashed border-white/20 bg-white/5 text-white/40" :
                      "bg-white/10 text-white/40"
                    }`}>
                      <m.icon className="h-4 w-4" />
                    </div>
                    {i < milestones.length - 1 && (
                      <div className={`my-1 h-8 w-0.5 ${m.done ? "bg-emerald-500" : "bg-white/10"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${m.done ? "text-white" : "text-white/50"}`}>
                      {m.label}
                      {m.predicted && <span className="ml-2 text-xs text-orange-400">(AI Predicted)</span>}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-white/40">
                      <Clock className="h-3 w-3" /> {m.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default TrackParcel;
