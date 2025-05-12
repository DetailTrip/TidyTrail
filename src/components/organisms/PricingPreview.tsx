import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Repeat, CalendarClock, Sparkles } from "lucide-react";
import ReferralModal from "@components/ui/ReferralModal";

const PricingPreview: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const referralCode = "TIDY10";

  return (
    <section id="pricing" className="bg-sectionAlt px-6 text-center section-spacing">
      <div className="max-w-6xl mx-auto space-y-14">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center relative">
          Choose Your Plan
          <span className="block w-12 h-1 bg-accent mx-auto mt-3 rounded-full" />
        </h2>
        <p className="text-base text-muted text-center max-w-xl mx-auto">
          Weekly. Bi-weekly. One-time. You pick the pace.
        </p>

        <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto mt-2">
          Save 10% when you prepay — or refer a friend and both save $10.
        </p>

        {/* Plans */}
        <div className="bg-white rounded-2xl shadow-inner ring-1 ring-border/20 mt-14 p-6 md:p-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {/* Weekly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative bg-white rounded-xl p-8 flex flex-col items-center space-y-6 md:pr-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
            >
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Most Popular
                </span>
              </div>
              <div className="text-accent"> <Repeat className="w-6 h-6" /> </div>
              <h3 className="text-xl font-semibold text-secondary">Weekly Service</h3>
              <p className="text-3xl font-bold text-primary bg-muted/10 px-4 py-1 rounded-full">
                $24<span className="text-lg font-normal">/visit</span>
              </p>
              <p className="text-muted text-sm text-balance">Best for fresh yards year-round.</p>
              <Link
                to="/booking?frequency=weekly"
                className="mt-4 bg-accent hover:bg-yellow-500 text-white text-base font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:translate-y-[1px]"
              >
                💸 Start Weekly & Save
              </Link>
            </motion.div>

            {/* Bi-Weekly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-xl p-8 flex flex-col items-center space-y-6 md:px-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
            >
              <div className="text-accent"> <CalendarClock className="w-6 h-6" /> </div>
              <h3 className="text-xl font-semibold text-secondary">Bi-Weekly Service</h3>
              <p className="text-3xl font-bold text-primary bg-muted/10 px-4 py-1 rounded-full">
                $45<span className="text-lg font-normal">/visit</span>
              </p>
              <p className="text-muted text-sm text-balance">Every other week — great for light-traffic yards.</p>
              <Link
                to="/booking?frequency=biweekly"
                className="mt-4 bg-primary hover:bg-green-800 text-white text-base font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:translate-y-[1px]"
              >
                Choose Bi-Weekly
              </Link>
            </motion.div>

            {/* One-Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-muted/5 rounded-xl p-8 flex flex-col items-center space-y-6 md:pl-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
            >
              <div className="absolute top-4 right-4 bg-muted text-white text-xs px-2 py-0.5 rounded-full shadow">One-Time</div>
              <div className="text-accent"> <Sparkles className="w-6 h-6" /> </div>
              <h3 className="text-xl font-semibold text-secondary">One-Time Cleanup</h3>
              <p className="text-3xl font-bold text-primary bg-muted/10 px-4 py-1 rounded-full">
                Starting at $90
              </p>
              <p className="text-muted text-sm text-balance">Perfect for spring cleanups or move-outs.</p>
              <Link
                to="/booking?frequency=onetime"
                className="mt-4 bg-primary hover:bg-green-800 text-white text-base font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:translate-y-[1px]"
              >
                Book One-Time Cleanup
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Enzyme Add-On Highlight */}
        <div className="mt-10 max-w-2xl mx-auto bg-muted/5 border border-border rounded-lg p-4 text-sm text-muted">
          <span className="inline-flex items-center gap-1 font-semibold text-accent">
            <Sparkles className="w-4 h-4" />
            Enzyme Add-On:
          </span>{" "}
          Add a Deep Clean for <strong>$18</strong> — we use <strong>EZ-CLEAN™</strong>, a Canadian-made, pet-safe enzyme formula that breaks down bacteria, odors, and organic stains.
        </div>

        {/* Referral Note */}
        <div className="max-w-2xl mx-auto mt-4 bg-muted/5 border border-border rounded-lg p-4 text-sm text-muted">
          💚 Refer a friend and you both save $10 —{" "}
          <button
            onClick={() => setShowModal(true)}
            className="text-primary underline font-medium hover:text-secondary transition"
          >
            learn how it works
          </button>
        </div>

        <ReferralModal
          code={referralCode}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />

        {/* Disclaimer */}
        <p className="text-xs text-muted max-w-2xl mx-auto mt-10">
          Base rates shown. Final pricing is personalized based on your yard, pets, and preferences.
        </p>

        {/* Fallback CTA */}
        <div className="pt-12">
          <div className="h-[1px] w-16 bg-accent/20 mx-auto mb-6" />
          <p className="text-sm text-muted">
            Not sure what to pick?{" "}
            <Link to="/booking" className="text-secondary underline font-medium">
              See all service options in the booking form.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
