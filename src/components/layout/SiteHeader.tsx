// src/components/layout/SiteHeader.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PawPrint } from "lucide-react";

const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 px-6 py-4 md:px-10 lg:px-20 transition-colors duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Go to TidyTrails homepage"
          className="flex flex-col items-start gap-0 text-tidy-green font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-tidy-green rounded"
        >
          <div className="flex items-center gap-2">
            <PawPrint className="w-6 h-6" strokeWidth={2} />
            <span>TidyTrails</span>
          </div>
          <span className="text-xs text-tidy-green/60 hidden sm:block leading-none">Timmins, ON</span>
        </Link>

        {/* CTA */}
        {pathname !== "/booking" && (
          <Link
            to="/booking"
            className="bg-tidy-green hover:bg-green-800 text-white font-semibold py-2 px-5 rounded-lg min-h-[44px] transition-transform transform hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800"
          >
            Book Now
          </Link>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
