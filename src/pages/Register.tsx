import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Register = () => {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 items-center justify-center bg-hero lg:flex">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md px-12 text-primary-foreground">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-gradient">
            <Package className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold">Join AIPOSTAL</h1>
          <p className="mt-4 text-primary-foreground/70">Create your account and experience AI-powered delivery management.</p>
        </motion.div>
      </div>

      <div className="flex w-full items-center justify-center bg-background px-4 lg:w-1/2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 font-display text-xl font-bold text-foreground lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gradient">
              <Package className="h-5 w-5 text-accent-foreground" />
            </div>
            AIPOSTAL
          </Link>

          <h2 className="font-display text-3xl font-bold text-foreground">Create Account</h2>
          <p className="mt-2 text-muted-foreground">Select your role and register</p>

          <div className="mt-6 flex gap-2 rounded-lg bg-muted p-1">
            {["user", "staff", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-all ${
                  role === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent-gradient text-accent-foreground hover:opacity-90">
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-accent hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
