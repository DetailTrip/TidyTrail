// src/components/organisms/PricingPreview.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PricingPreview: React.FC = () => {
  return (
    <> 
      <div className="h-[3px] w-16 bg-tidy-gold mx-auto my-10 rounded-full"></div>
      <section id="pricing" className="bg-stone-50 px-6 text-center section-spacing">
        <div className="max-w-6xl mx-auto space-y-14">
          <p className="text-base text-gray-600 text-center max-w-xl mx-auto mb-2">
            Pick the plan that fits your routine — weekly, bi-weekly, or one-time.
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-tidy-green text-center relative">
            Choose Your Plan
            <span className="block w-12 h-1 bg-tidy-gold mx-auto mt-3 rounded-full" />
          </h2>

          {/* Subheading with upsell context */}
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mt-2">
            Save 10% when you prepay — or refer a friend and both save $10.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {/* Weekly Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative bg-gradient-to-br from-white to-tidy-mist/40 rounded-xl shadow-md p-8 flex flex-col items-center space-y-6 border-2 border-tidy-green hover:scale-[1.02] hover:shadow-lg transition-transform"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tidy-gold text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Most Popular
              </span>
              <h3 className="text-xl font-semibold text-tidy-blue">Weekly Service</h3>
              <p className="text-3xl font-bold text-tidy-green bg-tidy-mist px-4 py-1 rounded-full">
                $24<span className="text-lg font-normal">/visit</span>
              </p>
              <p className="text-gray-600 text-sm text-balance">Best for fresh yards year-round.</p>
              <Link
                to="/booking?frequency=weekly"
                className="mt-4 bg-tidy-gold hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                💸 Start Weekly & Save
              </Link>
            </motion.div>

            {/* Bi-Weekly Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gradient-to-br from-white to-tidy-mist/40 rounded-xl shadow-md p-8 flex flex-col items-center space-y-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
            >
              <h3 className="text-xl font-semibold text-tidy-blue">Bi-Weekly Service</h3>
              <p className="text-3xl font-bold text-tidy-green bg-tidy-mist px-4 py-1 rounded-full">
                $45<span className="text-lg font-normal">/visit</span>
              </p>
              <p className="text-gray-600 text-sm text-balance">Every other week — great for light-traffic yards.</p>
              <Link
                to="/booking?frequency=biweekly"
                className="mt-4 bg-tidy-green hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                Choose Bi-Weekly
              </Link>
            </motion.div>

            {/* One-Time Cleanup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gradient-to-br from-white to-tidy-mist/40 rounded-xl shadow-md p-8 flex flex-col items-center space-y-6 hover:scale-[1.02] hover:shadow-lg transition-transform"
            >
              <h3 className="text-xl font-semibold text-tidy-blue">One-Time Cleanup</h3>
              <p className="text-3xl font-bold text-tidy-green bg-tidy-mist px-4 py-1 rounded-full">From $90</p>
              <p className="text-gray-600 text-sm text-balance">Perfect for spring cleanups or move-outs.</p>
              <Link
                to="/booking?frequency=onetime"
                className="mt-4 bg-tidy-green hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                Book One-Time Cleanup
              </Link>
            </motion.div>
          </div>

          {/* Deep Clean Add-On */}
          <p className="text-sm text-gray-700 mt-6 max-w-2xl mx-auto">
            🧼 Need extra freshness? Add a Deep Clean for <strong>$18</strong> — we use <strong>EZ-CLEAN™</strong>, a Canadian-made, pet-safe enzyme formula that breaks down bacteria, odors, and organic stains.
          </p>

          {/* Refer-a-Friend Note */}
          <p className="text-sm text-gray-700 mt-4">
            💚 Refer a friend and you both save $10 —{' '}
            <Link to="/#referral" className="text-tidy-green underline font-medium">
              share your link.
            </Link>
          </p>

          {/* Pricing Disclaimer */}
          <p className="text-xs text-gray-500 max-w-2xl mx-auto mt-10">
            Base rates shown. Final pricing is personalized based on your yard, pets, and preferences.
          </p>

          {/* Extra CTA for unsure users */}
          <p className="text-sm text-gray-600 mt-6">
            Not sure what to pick?{' '}
            <Link to="/booking" className="text-tidy-blue underline font-medium">
              See all service options in the booking form.
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default PricingPreview;
