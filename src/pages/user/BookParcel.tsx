import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Package, MapPin, ArrowRight, CheckCircle, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BookParcel = () => {
  const [step, setStep] = useState(1);
  const [aiValidated, setAiValidated] = useState(false);
  const navigate = useNavigate();

  const handleValidate = () => {
    setTimeout(() => setAiValidated(true), 800);
  };

  return (
    <DashboardLayout role="user">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Book a Parcel</h1>
        <p className="mt-1 text-muted-foreground">Fill in the details and let AI handle the rest</p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-4">
        {["Address", "Parcel Details", "Review"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
              step > i + 1 ? "bg-success text-success-foreground" :
              step === i + 1 ? "bg-accent-gradient text-accent-foreground" :
              "bg-muted text-muted-foreground"
            }`}>
              {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${step === i + 1 ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < 2 && <div className="mx-2 h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-card">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <Label>Source Address</Label>
                <Textarea placeholder="Enter full source address" className="mt-1" defaultValue="42, MG Road, Pune, Maharashtra 411001" />
              </div>
              <div>
                <Label>Destination Address</Label>
                <Textarea placeholder="Enter full destination address" className="mt-1" defaultValue="15, Connaught Place, New Delhi 110001" />
              </div>

              {!aiValidated ? (
                <Button onClick={handleValidate} variant="outline" className="gap-2">
                  <Brain className="h-4 w-4 text-accent" /> Validate with AI
                </Button>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg border border-success/30 bg-success/5 p-4">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">AI Validated</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Nearest post office identified: <strong className="text-foreground">Pune GPO (MH-PNQ-001)</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Destination post office: <strong className="text-foreground">New Delhi GPO (DL-NDL-001)</strong>
                  </p>
                </motion.div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!aiValidated} className="bg-accent-gradient text-accent-foreground hover:opacity-90">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Parcel Weight (kg)</Label>
                  <Input type="number" className="mt-1" defaultValue="2.5" />
                </div>
                <div>
                  <Label>Parcel Type</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="express">Express</SelectItem>
                      <SelectItem value="fragile">Fragile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea className="mt-1" placeholder="Brief parcel description" defaultValue="Electronics - laptop charger" />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} className="bg-accent-gradient text-accent-foreground hover:opacity-90">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">From</span><span className="text-foreground">42, MG Road, Pune</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">To</span><span className="text-foreground">15, Connaught Place, Delhi</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Weight</span><span className="text-foreground">2.5 kg</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Type</span><span className="text-foreground">Standard</span></div>
                <div className="border-t border-border pt-3 flex justify-between font-medium"><span>Estimated Cost</span><span className="text-accent">₹185</span></div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => navigate("/user/payment")} className="bg-accent-gradient text-accent-foreground hover:opacity-90">
                  <Package className="mr-2 h-4 w-4" /> Proceed to Payment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default BookParcel;
