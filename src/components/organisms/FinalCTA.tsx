// src/components/organisms/FinalCTA.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const FinalCTA: React.FC = () => {
  return (
    <section className="bg-tidy-green text-white py-24 px-6 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <Sparkles className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Let us handle the mess — you enjoy the fresh yard.
        </h2>

        <p className="text-lg max-w-2xl mx-auto text-white/90">
          Book in under 60 seconds. Transparent pricing, friendly service,
          and $1 donated to Timmins SPCA with every cleanup. It’s yard care with purpose.
        </p>

        <Link
          to="/booking"
          className="inline-block bg-white text-tidy-green font-semibold py-3 px-8 rounded-lg text-lg hover:bg-tidy-mist transition"
        >
          Book My First Cleanup
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
