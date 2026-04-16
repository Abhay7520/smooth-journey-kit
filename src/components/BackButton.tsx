import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on landing page
  if (location.pathname === "/") return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(-1)}
      className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95"
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </motion.button>
  );
};

export default BackButton;
