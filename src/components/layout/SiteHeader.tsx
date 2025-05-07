// src/components/layout/SiteHeader.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PawPrint } from "lucide-react";

const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 md:px-10 lg:px-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Go to TidyTrails homepage"
          className="flex items-center gap-2 text-tidy-green font-extrabold text-[22px] tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-tidy-green rounded"
        >
          <PawPrint className="w-6 h-6" strokeWidth={2} />
          <span>TidyTrails</span>
        </Link>

        {/* CTA */}
        {pathname !== "/booking" && (
          <Link
            to="/booking"
            className="bg-tidy-green hover:bg-green-800 text-white font-semibold py-2 px-5 rounded-lg transition min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800"
          >
            Book Now
          </Link>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
