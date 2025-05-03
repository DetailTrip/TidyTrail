// src/components/organisms/TrustSection.tsx

import React from "react";
import { PawPrint, HandHeart, Clock } from "lucide-react";

const TrustSection: React.FC = () => {
  return (
    <section className="bg-tidy-mist py-16 px-6 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-tidy-green">
          Community-Focused, Customer-First
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SPCA Donation */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <HandHeart className="w-8 h-8 text-tidy-green mx-auto" />
            <h3 className="text-lg font-semibold">We Give Back</h3>
            <p className="text-sm text-gray-600">
              $1 from every cleanup goes directly to the Timmins SPCA. Community impact starts local.
            </p>
          </div>

          {/* Local Ownership */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <PawPrint className="w-8 h-8 text-tidy-green mx-auto" />
            <h3 className="text-lg font-semibold">Locally Owned</h3>
            <p className="text-sm text-gray-600">
              TidyTrails is based right here in Timmins—built for and by pet lovers in our city.
            </p>
          </div>

          {/* Quick & Easy Booking */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <Clock className="w-8 h-8 text-tidy-green mx-auto" />
            <h3 className="text-lg font-semibold">Fast Booking</h3>
            <p className="text-sm text-gray-600">
              No phone calls or forms that drag on—just book online in under 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
