import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

const HeroSection: React.FC = () => {
  const handleScrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("pricing");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative bg-[url('/og/og-home.png')] bg-cover bg-left min-h-[680px] flex items-center bg-blend-darken bg-black/40"
      role="img"
      aria-label="Clean backyard with dog and family"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20"
      >
        <div className="max-w-xl space-y-6 text-white text-left">
          {/* SEO H2 (invisible but crawlable) */}
          <h2 className="sr-only">Professional Dog Waste Removal in Timmins, Ontario</h2>

          {/* Animated Tagline */}
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <PawPrint className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" strokeWidth={1.5} />
            </motion.div>
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wide text-white/80">
              Pet Waste Removal, Timmins ON
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug sm:leading-tight drop-shadow-md">
            Timmins' Trusted Poop-Free Yard Service.
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-white/90 max-w-lg leading-relaxed">
            Book your poop-free yard in under <strong>60 seconds</strong>. Fresh, pet-safe, and 100% hassle-free.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/booking"
              aria-label="Start booking your pet waste cleanup"
              className="bg-tidy-green hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg shadow transition min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get My Yard Cleaned
            </Link>
            <a
              href="#pricing"
              onClick={handleScrollToPricing}
              aria-label="Jump to pricing section"
              className="border-2 border-tidy-gold text-tidy-gold hover:bg-tidy-gold hover:text-white font-semibold py-3 px-6 rounded-lg text-base sm:text-lg transition min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              See Pricing & Plans
            </a>
          </div>

          {/* Starting Price Note */}
          <p className="text-sm text-white/80 pt-1">
            Starting at <span className="font-semibold text-tidy-gold">$24/visit</span> — no hidden fees
          </p>

          {/* Audience Message */}
          <div className="bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-white/90 max-w-md mt-4 hidden sm:block">
            🐶 TidyTrails is perfect for busy pet owners, seniors, and families who love a clean yard — without lifting a finger.
          </div>

          {/* SPCA Donation */}
          <div className="pt-3">
            <span className="inline-block bg-tidy-gold text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              $1/visit donated to Timmins SPCA 🎉
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
