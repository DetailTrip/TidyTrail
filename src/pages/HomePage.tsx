import HomeHero from "@/components/organisms/HomeHero";
import HowItWorks from "@/components/organisms/HowItWorks";
import PricingPreview from "@/components/organisms/PricingPreview";
import FinalCallToAction from "@/components/organisms/FinalCallToAction";

const HomePage: React.FC = () => {
  return (
    <>
      <HomeHero />
      <HowItWorks />
      <PricingPreview />
      <FinalCallToAction />
    </>
  );
};

export default HomePage;