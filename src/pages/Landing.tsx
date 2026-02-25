import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, MapPin, Brain, ShieldCheck, Clock, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Brain, title: "AI Address Validation", desc: "Intelligent address parsing and standardization for error-free deliveries." },
  { icon: MapPin, title: "Smart Post Office ID", desc: "Automatically identifies the nearest and most efficient post office." },
  { icon: Clock, title: "Delivery ETA Prediction", desc: "ML-powered delivery time estimates using traffic, weather & priority data." },
  { icon: ShieldCheck, title: "Delay Risk Detection", desc: "Proactive alerts when potential delays are detected on your parcel route." },
  { icon: TrendingUp, title: "Anomaly Detection", desc: "Flags stuck parcels, overloaded offices, and repeated route failures." },
  { icon: Package, title: "Real-time Tracking", desc: "Live milestone updates with AI-powered predictive status changes." },
];

const steps = [
  { num: "01", title: "Book Your Parcel", desc: "Enter addresses and parcel details. AI validates and selects the best post office." },
  { num: "02", title: "Make Payment", desc: "Choose UPI, Credit Card, or Cash on Delivery and confirm your booking." },
  { num: "03", title: "Get AI Predictions", desc: "Receive tracking ID with predicted delivery date, confidence score, and risk level." },
  { num: "04", title: "Track & Receive", desc: "Monitor real-time updates with smart delay notifications until delivery." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
              AI-Powered Delivery System
            </span>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Smarter Deliveries with{" "}
              <span className="text-accent">AI Precision</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/80">
              AIPOSTAL revolutionizes postal delivery with intelligent address validation, 
              predictive ETAs, and proactive delay detection. Experience the future of logistics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-accent-gradient text-accent-foreground hover:opacity-90">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">Core Capabilities</span>
            <h2 className="mt-2 font-display text-4xl font-bold text-foreground">
              Powered by Artificial Intelligence
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent-gradient group-hover:text-accent-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">Simple Process</span>
            <h2 className="mt-2 font-display text-4xl font-bold text-foreground">How It Works</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <span className="font-display text-5xl font-bold text-accent/20">{s.num}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { role: "User", desc: "Book, pay, and track parcels with AI-powered predictions.", path: "/login?role=user", items: ["Book parcels", "AI delivery ETA", "Real-time tracking"] },
              { role: "Staff", desc: "Manage deliveries with smart prioritization and risk indicators.", path: "/login?role=staff", items: ["View assignments", "Risk indicators", "Status updates"] },
              { role: "Admin", desc: "Monitor operations with anomaly detection and analytics.", path: "/login?role=admin", items: ["System overview", "Anomaly detection", "Staff management"] },
            ].map((r) => (
              <div key={r.role} className="rounded-xl border border-border bg-card p-8 shadow-card">
                <h3 className="font-display text-2xl font-bold text-foreground">{r.role} Portal</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <ul className="mt-4 space-y-2">
                  {r.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-success" /> {item}
                    </li>
                  ))}
                </ul>
                <Link to={r.path}>
                  <Button className="mt-6 w-full bg-accent-gradient text-accent-foreground hover:opacity-90">
                    Enter as {r.role}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2 font-display text-sm font-bold text-foreground">
            <Package className="h-4 w-4 text-accent" /> AIPOSTAL
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AIPOSTAL. AI-Powered Delivery System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
