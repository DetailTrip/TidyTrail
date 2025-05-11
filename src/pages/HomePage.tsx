import React from "react";
import HeroSection from "@components/organisms/HeroSection";
import HowItWorks from "@components/organisms/HowItWorks";
import WhyHomeownersLove from "@components/organisms/WhyHomeownersLove";
import PricingPreview from "@components/organisms/PricingPreview";
import FAQSection from "@components/organisms/FAQSection";
import FinalCTA from "@components/organisms/FinalCTA";
import PromoBar from "@components/layout/PromoBar";
import EnzymeAddOn from "@components/organisms/EnzymeAddOn";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <PromoBar referralCode="TIDY10" />
      <WhyHomeownersLove />
      <HowItWorks />
      <EnzymeAddOn />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
    </>
  );
};

export default HomePage;
