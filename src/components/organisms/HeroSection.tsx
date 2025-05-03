// src/components/organisms/HeroSection.tsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative bg-[url('/og/og-home.png')] bg-cover bg-left min-h-[680px] flex items-center"
    >
      <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20"
      >
        <div className="max-w-lg space-y-6 text-white text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Safe Yards. Honest Prices. <span role="img" aria-label="paw">🐾</span>
          </h1>

          <p className="text-xl md:text-2xl">
            Book professional pet-waste cleanup in under <strong>50 seconds</strong>. Fresh, healthy yards—without the mess.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/booking"
              className="bg-tidy-green hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg text-lg transition min-h-[48px]"
            >
              Book My Cleanup
            </Link>
            <Link
              to="/services/petWaste"
              className="border-2 border-white text-white hover:bg-white hover:text-tidy-green font-semibold py-3 px-8 rounded-lg text-lg transition min-h-[48px]"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-4">
            <span className="inline-block bg-tidy-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
              $1/visit donated to Timmins SPCA 🎉
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
