import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import bgNotFound from "@/assets/bg-not-found.jpg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050508] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={bgNotFound} alt="" className="h-full w-full object-cover opacity-[0.2]" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-[#050508]/60 to-[#050508]" />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="mb-4 text-7xl font-black text-white/90">404</h1>
        <p className="mb-4 text-xl text-white/50">Oops! This parcel seems lost</p>
        <a href="/" className="text-orange-400 font-bold underline hover:text-orange-300">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
