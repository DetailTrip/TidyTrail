import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-tidy-slate text-white py-10 px-4 sm:px-6 border-t border-white/10"
      aria-label="Site Footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Left: Brand Info */}
        <div className="space-y-2">
          <h3 className="text-xl font-display font-bold">
            TidyTrails Yard Services
          </h3>
          <p className="text-sm text-white/80 uppercase tracking-wide font-body">
            Locally owned in Timmins 🇨🇦
          </p>
          <p className="text-xs text-white/60 font-body">
            © {new Date().getFullYear()} TidyTrails. All rights reserved.
          </p>
        </div>

        {/* Right: Navigation Links */}
        <nav className="flex flex-col md:flex-row justify-center md:justify-end gap-4 text-sm font-body">
          <Link to="/" className="hover:underline text-white/80">
            Home
          </Link>
          <Link to="/booking" className="hover:underline text-white/80">
            Book a Service
          </Link>
          <button
            onClick={scrollToTop}
            className="text-white/60 hover:underline text-xs"
            aria-label="Back to top of page"
          >
            ↑ Back to Top
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
