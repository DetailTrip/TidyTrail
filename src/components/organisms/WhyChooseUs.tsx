// src/components/organisms/WhyChooseUs.tsx

import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  "Locally owned in Timmins",
  "Straightforward, upfront pricing",
  "Pet-friendly enzyme cleaner available",
  "$1 donated to the Timmins SPCA with every cleanup",
  "Book online in under 60 seconds"
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-tidy-green">
          Why Choose TidyTrails?
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {features.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-tidy-green mt-1" />
              <span className="text-base md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
