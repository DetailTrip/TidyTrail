// src/components/organisms/HomeHero.tsx
import React from "react";
import { Link } from "react-router-dom";

const HomeHero: React.FC = () => {
  return (
    <section className="bg-tidy-mist py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-tidy-green leading-tight">
          Safe Yards. Honest Prices. <span className="inline-block">🐾</span>
        </h1>

        <p className="text-lg md:text-xl text-tidy-blue max-w-2xl">
          Book professional pet-waste cleanup in under 60 seconds.
          Fresh, healthy yards—without the mess.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/booking"
            className="bg-tidy-green hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg text-lg transition"
          >
            Book My Cleanup
          </Link>
          <Link
            to="/services/petWaste"
            className="border-2 border-tidy-green text-tidy-green hover:bg-tidy-mist font-semibold py-3 px-8 rounded-lg text-lg transition"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-4">
          <span className="inline-block bg-tidy-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
            $1/visit donated to Timmins SPCA 🎉
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

