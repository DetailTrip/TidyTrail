// src/pages/HomePage.tsx

import React from "react";
import HeroSection from "@components/organisms/HeroSection";
import WhyChooseUs from "@components/organisms/WhyChooseUs";
import HowItWorks from "@components/organisms/HowItWorks";
import PricingPreview from "@components/organisms/PricingPreview";
import TrustSection from "@components/organisms/TrustSection";
import FAQSection from "@components/organisms/FAQSection";
import FinalCTA from "@components/organisms/FinalCTA";
import MobileStickyNav from "@components/layout/MobileStickyNav";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <HowItWorks />
      <PricingPreview />
      <TrustSection />
      <FAQSection />
      <FinalCTA />
      <MobileStickyNav />
    </>
  );
};

export default HomePage;
