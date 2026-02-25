import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const methods = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "Pay via UPI ID" },
  { id: "card", label: "Credit Card", icon: CreditCard, desc: "Visa, Mastercard" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when delivered" },
];

const Payment = () => {
  const [selected, setSelected] = useState("upi");
  const navigate = useNavigate();

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/user/confirmation");
  };

  return (
    <DashboardLayout role="user">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Payment</h1>
        <p className="mt-1 text-muted-foreground">Complete your booking</p>
      </div>

      <div className="grid max-w-3xl gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Payment Method</h3>
            <div className="space-y-3">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m.id)}
                  className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                    selected === m.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${selected === m.id ? "bg-accent-gradient text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                  {selected === m.id && <CheckCircle className="ml-auto h-5 w-5 text-accent" />}
                </button>
              ))}
            </div>

            {selected === "upi" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                <Label>UPI ID</Label>
                <Input className="mt-1" placeholder="yourname@upi" defaultValue="john@okaxis" />
              </motion.div>
            )}

            {selected === "card" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                <div><Label>Card Number</Label><Input className="mt-1" placeholder="1234 5678 9012 3456" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Expiry</Label><Input className="mt-1" placeholder="MM/YY" /></div>
                  <div><Label>CVV</Label><Input className="mt-1" placeholder="123" type="password" /></div>
                </div>
              </motion.div>
            )}

            <Button onClick={handlePay} className="mt-6 w-full bg-accent-gradient text-accent-foreground hover:opacity-90">
              {selected === "cod" ? "Confirm Booking" : "Pay ₹185"}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">From</span><span className="text-foreground">Pune, MH</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">To</span><span className="text-foreground">New Delhi, DL</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Weight</span><span className="text-foreground">2.5 kg</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground">Standard</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground">
                <span>Total</span><span className="text-accent">₹185</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payment;
