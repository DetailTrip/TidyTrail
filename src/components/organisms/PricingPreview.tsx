import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Repeat, CalendarClock, Sparkles } from "lucide-react";
import ReferralModal from "@components/ui/ReferralModal";

const PricingPreview: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const referralCode = "TIDY10";

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-sectionAlt px-6 section-spacing"
    >
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-14">
        {/* Headline */}
        <h2
          id="pricing-heading"
          className="text-4xl md:text-5xl font-bold text-primary text-center relative"
        >
          Choose Your Poop-Free Plan in Timmins
          <span
            aria-hidden="true"
            className="block w-12 h-1 bg-accent mx-auto mt-3 rounded-full"
          />
        </h2>

        {/* Combined Teaser */}
        <div className="bg-accent/10 rounded-lg p-4 mt-6 mx-auto max-w-2xl">
          <p className="text-base sm:text-lg text-muted">
            <strong className="text-secondary">Save 10%</strong> when you prepay, or{' '}
            <strong className="text-secondary">💚 save $10</strong> each by referring a friend.
          </p>
        </div>

        {/* Plans */}
        <div className="bg-white rounded-2xl shadow ring-2 ring-accent/20 mt-14 p-6 md:p-8 overflow-hidden">
          <ul
            role="list"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/30"
          >
            {/* Weekly */}
            <li>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative bg-white rounded-xl p-8 flex flex-col items-center gap-4 md:pr-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
              >
                <span
                  role="status"
                  aria-label="Most popular plan"
                  className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow"
                >
                  Most Popular
                </span>

                <Repeat className="w-6 h-6 text-accent" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary">Weekly Service</h3>
                <p className="text-3xl font-bold text-primary bg-muted/10 px-4 py-1 rounded-full">
                  $24<span className="text-lg font-normal">/visit</span>
                </p>
                <p className="text-muted text-sm text-balance">
                  Best for fresh yards year-round.
                </p>
                <Link
                  to="/booking?frequency=weekly"
                  className="mt-4 bg-accent hover:bg-yellow-500 text-white text-base font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:translate-y-[1px]"
                >
                  💸 Start Weekly & Save
                </Link>
              </motion.div>
            </li>

            {/* Bi-Weekly */}
            <li>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 md:px-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
              >
                <CalendarClock className="w-6 h-6 text-accent" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary">Bi-Weekly Service</h3>
                <p className="text-3xl font-bold text-primary bg-muted/10 px-4 py-1 rounded-full">
                  $45<span className="text-lg font-normal">/visit</span>
                </p>
                <p className="text-muted text-sm text-balance">
                  Every other week — great for light-traffic yards.
                </p>
                <Link
                  to="/booking?frequency=biweekly"
                  className="mt-4 bg-accent hover:bg-yellow-500 text-white text-base font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:translate-y-[1px]"
                >
                  💸 Choose Bi-Weekly
                </Link>
              </motion.div>
            </li>

            {/* One-Time */}
            <li>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-muted/5 rounded-xl p-8 flex flex-col items-center gap-4 md:pl-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
              >
                <span
                  role="note"
                  className="absolute top-4 right-4 bg-muted text-white text-xs px-2 py-0.5 rounded-full shadow"
                >
                  One-Time
                </span>
                <Sparkles className="w-6 h-6 text-accent" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-secondary">One-Time Cleanup</h3>
                <p className="text-3xl font-bold text-primary bg-muted/10 px-4 py-1 rounded-full">
                  Starting at $90
                </p>
                <p className="text-muted text-sm text-balance">
                  Perfect for spring cleanups or move-outs.
                </p>
                <p className="text-xs text-secondary mt-1">
                  Moderate mess +$30 • Heavy mess +$60
                </p>
                <Link
                  to="/booking?frequency=onetime"
                  className="mt-4 bg-accent hover:bg-yellow-500 text-white text-base font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:translate-y-[1px]"
                >
                  💸 Book One-Time Cleanup
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>

        {/* Enzyme Add-On Highlight */}
        <div
          role="region"
          aria-label="Pet-safe enzyme cleaner add-on"
          className="mt-10 max-w-2xl mx-auto bg-accent/10 border border-accent/30 rounded-lg p-4 text-sm text-muted"
        >
          <span
            className="inline-flex items-center gap-1 font-semibold text-accent"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Enzyme Add-On:
          </span>{" "}
          Add a Deep Clean for <strong>$18</strong> — we use <strong>EZ-CLEAN™</strong>, a Canadian-made, pet-safe enzyme formula that breaks down bacteria, odors, and organic stains.
        </div>

        {/* Referral Note */}
        <div
          role="region"
          aria-label="Referral program"
          className="max-w-2xl mx-auto mt-4 bg-accent/10 border border-accent/30 rounded-lg p-4 text-sm text-muted"
        >
          <p>
            Refer a friend — each of you saves <strong>$10</strong> on your first clean. {' '}
            <button
              id="referral-modal-trigger"
              aria-haspopup="dialog"
              aria-controls="referral-modal"
              onClick={() => setShowModal(true)}
              className="ml-1 text-primary underline font-medium focus:outline-none focus:ring-2 focus:ring-accent hover:text-secondary transition"
            >
              Learn how it works
            </button>
          </p>
        </div>

        <ReferralModal
          id="referral-modal"
          code={referralCode}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />

        {/* Disclaimer */}
        <p className="text-sm md:text-xs text-muted max-w-2xl mx-auto mt-10">
          Base rates shown. Final pricing is personalized based on your yard, pets, and preferences. Serving Timmins homeowners since 2025.
        </p>

        {/* Fallback CTA */}
        <div className="pt-12">
          <div className="h-[1px] w-16 bg-accent/20 mx-auto mb-6" />
          <p className="text-sm text-muted">
            Not sure what to pick?{' '}
            <Link
              to="/booking"
              className="text-accent underline font-medium"
            >
              See all service options in the booking form.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
