// src/components/organisms/FinalCallToAction.tsx
import React from "react";
import { Link } from "react-router-dom";

const FinalCallToAction: React.FC = () => {
  return (
    <section className="bg-tidy-mist py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-tidy-green">
          Ready for a Cleaner Yard?
        </h2>

        <p className="text-lg md:text-xl text-tidy-blue max-w-2xl">
          Book your professional pet-waste cleanup in under 60 seconds.  
          Safe, fresh, and hassle-free — let's do this!
        </p>

        <Link
          to="/booking"
          className="bg-tidy-green hover:bg-green-800 text-white font-semibold py-4 px-10 rounded-lg text-lg transition shadow-md hover:shadow-lg"
        >
          Book My First Cleanup
        </Link>

        <div className="mt-6 text-sm text-tidy-blue opacity-80">
          🐾 $1 from every visit is donated to Timmins SPCA!
        </div>
      </div>
    </section>
  );
};

export default FinalCallToAction;
