// src/components/layout/MobileStickyNav.tsx

import React from "react";
import { Link } from "react-router-dom";

const MobileStickyNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t shadow sm:hidden flex justify-around py-3 px-4">
      <Link to="/booking" className="text-tidy-green font-semibold text-sm">
        Book
      </Link>
      <Link to="/pricing" className="text-gray-600 text-sm">
        Pricing
      </Link>
      <Link to="/contact" className="text-gray-600 text-sm">
        Contact
      </Link>
    </nav>
  );
};

export default MobileStickyNav;
