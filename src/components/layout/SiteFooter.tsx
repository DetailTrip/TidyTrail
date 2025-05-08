// src/components/organisms/Footer.tsx

import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-tidy-slate text-white py-10 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Left: Brand Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold">TidyTrails Yard Services</h3>
          <p className="text-sm text-white/80 uppercase tracking-wide">
            Locally owned in Timmins 🇨🇦
          </p>
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} TidyTrails. All poop scooped. All rights reserved.
          </p>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
          <Link to="/" className="hover:underline text-white/80">Home</Link>
          <Link to="/booking" className="hover:underline text-white/80">Booking</Link>
          <Link to="/contact" className="hover:underline text-white/80">Contact</Link>
          <a href="#" className="hidden md:block text-white/60 hover:underline text-xs">↑ Back to Top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
