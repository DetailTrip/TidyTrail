// src/components/organisms/HowItWorks.tsx
import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-24 px-6 text-center">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-tidy-green">
          How TidyTrails Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-tidy-gold flex items-center justify-center text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-tidy-blue">
              Book Online
            </h3>
            <p className="text-gray-600 max-w-xs">
              Choose your plan, yard size, and first service date — all in under 60 seconds.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-tidy-gold flex items-center justify-center text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-tidy-blue">
              We Scoop It All
            </h3>
            <p className="text-gray-600 max-w-xs">
              Our trained team arrives on-time, removes all waste, and sanitizes if requested.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-tidy-gold flex items-center justify-center text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-tidy-blue">
              Enjoy Your Yard
            </h3>
            <p className="text-gray-600 max-w-xs">
              Safe, clean, and fresh for your pets and family — guaranteed or we re-clean free!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
