// src/components/organisms/EnzymeAddOn.tsx
import React from "react";
import { Sparkles } from "lucide-react";

const EnzymeAddOn: React.FC = () => {
  return (
    <section className="bg-highlight section-spacing px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 justify-center text-sm font-semibold text-accent uppercase tracking-wide">
          <Sparkles className="w-5 h-5 text-accent" />
          <span>Enzyme Add-On</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-primary">
          Want Extra Freshness?
        </h3>
        <p className="text-base text-muted max-w-2xl mx-auto">
          Add a Deep Clean for <span className="font-semibold text-secondary">$18</span> — we use <strong>EZ-CLEAN™</strong>, a Canadian-made enzyme spray that neutralizes odors, breaks down bacteria, and tackles tough organic waste.
        </p>
      </div>
    </section>
  );
};

export default EnzymeAddOn;
