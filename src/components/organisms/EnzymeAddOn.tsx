import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EnzymeAddOn: React.FC = () => {
  return (
    <section className="bg-highlight section-spacing px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Label */}
        <div className="inline-flex items-center gap-2 justify-center text-sm font-semibold text-accent uppercase tracking-wide">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-accent" />
          </motion.div>
          <span>Enzyme Add-On</span>
        </div>

        {/* Headline */}
        <h3 className="text-3xl md:text-4xl font-bold text-primary">
          Want Extra Freshness?
        </h3>

        {/* Description */}
        <p className="text-base text-muted max-w-2xl mx-auto">
          Add a Deep Clean for <span className="font-bold text-tidy-gold">$18</span> — we use <strong>EZ-CLEAN™</strong>, a pet-safe enzyme spray made in Canada that neutralizes odors, breaks down bacteria, and tackles tough organic waste.
        </p>

        {/* CTA */}
        <div>
          <Link
            to="/booking"
            className="inline-block mt-4 bg-tidy-green hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Add It to My Cleanup →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EnzymeAddOn;
