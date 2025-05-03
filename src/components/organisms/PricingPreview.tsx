// src/components/organisms/PricingPreview.tsx
import React from "react";
import { Link } from "react-router-dom";

const PricingPreview: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 px-6 text-center">
      <div className="max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-tidy-green">
          Start With Transparent Base Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Weekly Service */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center space-y-6">
            <h3 className="text-xl font-semibold text-tidy-blue">Weekly Service</h3>
            <p className="text-3xl font-bold text-tidy-green">$24<span className="text-lg font-normal">/visit</span></p>
            <p className="text-gray-600 text-sm">Best for fresh yards year-round.</p>
            <Link
              to="/booking?frequency=weekly"
              className="mt-4 bg-tidy-green hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Start With Weekly
            </Link>
          </div>

          {/* Bi-Weekly Service */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center space-y-6">
            <h3 className="text-xl font-semibold text-tidy-blue">Bi-Weekly Service</h3>
            <p className="text-3xl font-bold text-tidy-green">$45<span className="text-lg font-normal">/visit</span></p>
            <p className="text-gray-600 text-sm">Every other week — great for light-traffic yards.</p>
            <Link
              to="/booking?frequency=biweekly"
              className="mt-4 bg-tidy-green hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Start With Bi-Weekly
            </Link>
          </div>

          {/* One-Time Cleanup */}
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center space-y-6">
            <h3 className="text-xl font-semibold text-tidy-blue">One-Time Cleanup</h3>
            <p className="text-3xl font-bold text-tidy-green">From $90</p>
            <p className="text-gray-600 text-sm">Perfect for spring cleanups or move-outs.</p>
            <Link
              to="/booking?frequency=onetime"
              className="mt-4 bg-tidy-green hover:bg-green-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Start With One-Time
            </Link>
          </div>
        </div>

        {/* Pricing Disclaimer */}
        <p className="text-xs text-gray-500 max-w-2xl mx-auto mt-10">
          Base rates shown. Final pricing is personalized based on your yard, pets, and preferences.
        </p>
      </div>
    </section>
  );
};

export default PricingPreview;
