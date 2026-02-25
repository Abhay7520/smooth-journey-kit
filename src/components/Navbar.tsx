import { Link, useLocation } from "react-router-dom";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gradient">
            <Package className="h-5 w-5 text-accent-foreground" />
          </div>
          AIPOSTAL
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {isLanding && (
            <>
              <a href="#features" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">How It Works</a>
            </>
          )}
          <Link to="/login">
            <Button variant="ghost" size="sm">Log In</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-accent-gradient text-accent-foreground hover:opacity-90">Get Started</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-3 p-4">
              {isLanding && (
                <>
                  <a href="#features" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Features</a>
                  <a href="#how-it-works" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">How It Works</a>
                </>
              )}
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">Log In</Button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full bg-accent-gradient text-accent-foreground">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
