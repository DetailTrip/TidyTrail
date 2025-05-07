// src/components/organisms/HowItWorks.tsx
import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, Sparkles, Smile } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-tidy-mist/30 px-6 border-t border-gray-100 section-spacing">
      <div className="max-w-5xl mx-auto space-y-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-tidy-green">
            How TidyTrails Works
          </h2>
          <motion.div
            className="w-16 h-1 bg-tidy-gold mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ originX: 0 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-10 text-left">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-tidy-gold flex items-center justify-center text-white text-2xl font-bold">
                <MousePointerClick className="w-7 h-7" />
              </div>
              <div className="text-sm font-semibold text-gray-500 uppercase mb-2">Step 1</div>
            </div>
            <h3 className="text-xl font-semibold text-tidy-blue">
              Choose Your Plan
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-xs text-center md:text-left">
              Pick your plan, yard size, and first service date — all in under 60 seconds.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-tidy-gold flex items-center justify-center text-white text-2xl font-bold">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="text-sm font-semibold text-gray-500 uppercase mb-2">Step 2</div>
            </div>
            <h3 className="text-xl font-semibold text-tidy-blue">
              We Do the Dirty Work
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-xs text-center md:text-left">
              Our trained team arrives on time, removes all the waste, and sanitizes if needed.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-tidy-gold flex items-center justify-center text-white text-2xl font-bold">
                <Smile className="w-7 h-7" />
              </div>
              <div className="text-sm font-semibold text-gray-500 uppercase mb-2">Step 3</div>
            </div>
            <h3 className="text-xl font-semibold text-tidy-blue">
              Relax in a Clean, Safe Yard
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-xs text-center md:text-left">
              Guaranteed no poop left behind. Your grass is family ready.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;