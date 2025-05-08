// src/components/organisms/TrustSection.tsx
import React from "react";
import { PawPrint, HandHeart, Clock } from "lucide-react";

const trustPoints = [
  {
    icon: <HandHeart className="w-8 h-8 text-tidy-green mx-auto" />,
    title: "We Give Back",
    description:
      "$1 from every cleanup goes directly to the Timmins SPCA. Community impact starts local.",
  },
  {
    icon: <PawPrint className="w-8 h-8 text-tidy-green mx-auto" />,
    title: "Locally Owned",
    description:
      "TidyTrails is based right here in Timmins—built for and by pet lovers in our city.",
  },
  {
    icon: <Clock className="w-8 h-8 text-tidy-green mx-auto" />,
    title: "Fast Booking",
    description:
      "No phone calls or forms that drag on—just book online in under 60 seconds.",
  },
];

const TrustSection: React.FC = () => {
  return (
    <section className="bg-emerald-50 px-6 md:px-10 lg:px-20 section-spacing">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-tidy-green">
          Community-Focused, Customer-First
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 space-y-4 flex flex-col items-center"
            >
              {point.icon}
              <h3 className="text-lg font-semibold text-tidy-blue">{point.title}</h3>
              <p className="text-sm text-gray-600 text-center max-w-xs">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

