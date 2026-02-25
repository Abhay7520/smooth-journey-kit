import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, Copy, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const OrderConfirmation = () => {
  const trackingId = "AP-20260004";

  return (
    <DashboardLayout role="user">
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Booking Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Your parcel has been booked successfully</p>

          <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card text-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">Tracking ID</span>
                <p className="font-display text-xl font-bold text-accent">{trackingId}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(trackingId); toast.success("Copied!"); }}>
                <Copy className="mr-1 h-3 w-3" /> Copy
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <Clock className="mx-auto mb-1 h-5 w-5 text-info" />
                <span className="text-xs text-muted-foreground">Predicted ETA</span>
                <p className="mt-1 font-display text-sm font-semibold text-foreground">Feb 28, 2026</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <Shield className="mx-auto mb-1 h-5 w-5 text-success" />
                <span className="text-xs text-muted-foreground">Confidence</span>
                <p className="mt-1 font-display text-sm font-semibold text-foreground">92%</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <MapPin className="mx-auto mb-1 h-5 w-5 text-accent" />
                <span className="text-xs text-muted-foreground">Risk Level</span>
                <p className="mt-1 font-display text-sm font-semibold text-success">Low</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <Link to={`/user/track?id=${trackingId}`}>
              <Button className="bg-accent-gradient text-accent-foreground hover:opacity-90">
                <MapPin className="mr-2 h-4 w-4" /> Track Parcel
              </Button>
            </Link>
            <Link to="/user/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default OrderConfirmation;
