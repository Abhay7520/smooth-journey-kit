import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Hide on landing page
  if (path === "/") return null;

  // Check if inside a dashboard layout (has sidebar at ml-64)
  const inDashboard = path.startsWith("/user/") || path.startsWith("/staff/") || path.startsWith("/admin/");

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(-1)}
      className={`fixed top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 ${inDashboard ? "left-[17.5rem]" : "left-4"}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </motion.button>
  );
};

export default BackButton;
