// src/components/organisms/PricingPreview.tsx
import React from "react";
import { Link } from "react-router-dom";

const PricingPreview: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 text-center" id="pricing">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-tidy-green mb-10">
          Simple, Honest Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Weekly */}
          <div className="border border-gray-200 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-tidy-blue mb-2">Weekly Service</h3>
            <p className="text-2xl font-bold text-tidy-green mb-4">$24/visit</p>
            <p className="text-gray-600 mb-6">
              Best for fresh yards year-round.
            </p>
            <Link
              to="/booking"
              className="bg-tidy-green text-white font-semibold py-2 px-6 rounded hover:bg-green-800 transition"
            >
              Book Weekly
            </Link>
          </div>

          {/* Bi-Weekly */}
          <div className="border border-gray-200 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-tidy-blue mb-2">Bi-Weekly Service</h3>
            <p className="text-2xl font-bold text-tidy-green mb-4">$45/visit</p>
            <p className="text-gray-600 mb-6">
              Every other week—great for light-traffic yards.
            </p>
            <Link
              to="/booking"
              className="bg-tidy-green text-white font-semibold py-2 px-6 rounded hover:bg-green-800 transition"
            >
              Book Bi-Weekly
            </Link>
          </div>

          {/* One-Time */}
          <div className="border border-gray-200 p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-tidy-blue mb-2">One-Time Cleanup</h3>
            <p className="text-2xl font-bold text-tidy-green mb-4">From $90</p>
            <p className="text-gray-600 mb-6">
              Perfect for spring cleanups or move-outs.
            </p>
            <Link
              to="/booking"
              className="bg-tidy-green text-white font-semibold py-2 px-6 rounded hover:bg-green-800 transition"
            >
              Book One-Time
            </Link>
          </div>
        </div>

        {/* Pricing Disclaimer */}
        <p className="text-xs text-gray-400 mt-8 max-w-2xl mx-auto">
          *Prices based on up to 2 dogs and standard yard size. Additional charges may apply for extra-large yards, heavy debris, or multiple pets.
        </p>
      </div>
    </section>
  );
};

export default PricingPreview;
