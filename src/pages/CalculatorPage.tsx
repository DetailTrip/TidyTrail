import React, { useState, useEffect } from 'react';
import { CalculatorProvider, useCalculator } from '../components/calculator/context/CalculatorContext';
import StepIndicator from '../components/calculator/atoms/StepIndicator';
import CalculatorStep1 from '../components/calculator/organisms/CalculatorStep1';
import CalculatorStep2 from '../components/calculator/organisms/CalculatorStep2';
import CalculatorStep3 from '../components/calculator/organisms/CalculatorStep3';
import CalculatorStep4 from '../components/calculator/organisms/CalculatorStep4';
import CalculatorStep5 from '../components/calculator/organisms/CalculatorStep5';
import CommercialInquiry from '../components/calculator/organisms/CommercialInquiry';

// Add this component to wrap StepIndicator
const StepIndicatorWrapper: React.FC = () => {
  const { state } = useCalculator();
  
  // Use type assertion to access potential properties safely
  const currentStep = (
    (state as any).currentStep ?? 
    (state as any).activeStep ?? 
    (state as any).stepIndex ?? 
    1
  );
  
  return (
    <div className="mb-8">
      <StepIndicator 
        currentStep={currentStep}
        totalSteps={5}
        labels={[
          "Property Details", 
          "Service Selection", 
          "Frequency & Options", 
          "Price Summary", 
          "Contact Info"
        ]}
      />
    </div>
  );
};

// Helper component to render the current step
const CalculatorStepContent: React.FC = () => {
  const { state } = useCalculator();
  
  // Use type assertion to access potential properties safely
  const currentStep = (
    (state as any).currentStep ?? 
    (state as any).activeStep ?? 
    (state as any).stepIndex ?? 
    1
  );
  
  // If commercial property selected, show the commercial inquiry form instead
  if (state.property?.type === 'commercial') {
    return <CommercialInquiry />;
  }
  
  // Otherwise show the appropriate step for residential properties
  switch (currentStep) {
    case 1:
      return <CalculatorStep1 />;
    case 2:
      return <CalculatorStep2 />;
    case 3:
      return <CalculatorStep3 />;
    case 4:
      return <CalculatorStep4 />;
    case 5:
      return <CalculatorStep5 />;
    default:
      return <CalculatorStep1 />;
  }
};

// Navigation buttons for the calculator
const CalculatorNavigation: React.FC = () => {
  const { state, dispatch } = useCalculator();
  
  // Use type assertion with nullish coalescing
  const currentStep = (
    (state as any).currentStep ?? 
    (state as any).activeStep ?? 
    (state as any).stepIndex ?? 
    1
  );
  
  // Don't show navigation for commercial properties or on the final steps
  if (state.property?.type === 'commercial' || currentStep >= 4) {
    return null;
  }
  
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <button
          onClick={() => dispatch({ type: 'SET_STEP', payload: currentStep - 1 })}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          aria-label="Go to previous step"
        >
          Previous
        </button>
      )}
      
      <div className="flex-grow"></div>
      
      <button
        onClick={() => dispatch({ type: 'SET_STEP', payload: currentStep + 1 })}
        className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark"
        aria-label="Go to next step"
      >
        {currentStep === 3 ? 'View Summary' : 'Next'}
      </button>
    </div>
  );
};

const CalculatorPage: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
    document.title = "Service Calculator | TidyTrails";
  }, []);
  
  // Get current season for seasonal content adjustments
  const getCurrentSeason = (): 'spring' | 'summer' | 'fall' | 'winter' => {
    const now = new Date();
    const month = now.getMonth();
    
    if (month >= 2 && month <= 4) return 'spring';  // March to May
    if (month >= 5 && month <= 7) return 'summer';  // June to August
    if (month >= 8 && month <= 10) return 'fall';   // September to November
    return 'winter';                                // December to February
  };
  
  const currentSeason = getCurrentSeason();
  
  // Generate seasonal heading and description based on current date
  const getSeasonalContent = () => {
    switch (currentSeason) {
      case 'spring':
        return {
          heading: 'Spring into Action with Our Lawn Services',
          description: 'Get your yard ready for the season with our spring cleanup and maintenance services.',
          emphasis: 'spring cleanup'
        };
      case 'summer':
        return {
          heading: 'Keep Your Lawn Looking Perfect All Summer',
          description: 'Maintain a beautiful yard throughout the summer with our regular maintenance services.',
          emphasis: 'lawn maintenance'
        };
      case 'fall':
        return {
          heading: 'Prepare Your Yard for Winter',
          description: 'Get your property ready for the cold months with our fall cleanup and preparation services.',
          emphasis: 'fall cleanup'
        };
      case 'winter':
        return {
          heading: 'Plan Ahead for a Beautiful Spring',
          description: 'Book early and save with our pre-season discounts for spring services.',
          emphasis: 'early booking'
        };
    }
  };
  
  const seasonalContent = getSeasonalContent();
  
  // Only render client-side to prevent hydration errors with the calculator state
  if (!hasMounted) {
    return null;
  }
  
  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{seasonalContent.heading}</h1>
          <p className="text-lg text-gray-600 mb-6">
            {seasonalContent.description}
          </p>
          <p className="text-sm text-gray-500">
            Serving Timmins and surrounding areas
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your Personalized Service Quote
              </h2>
              <p className="text-gray-600">
                Tell us about your property and service needs for an instant quote.
              </p>
            </div>
            
            <CalculatorProvider>
              <StepIndicatorWrapper />
              <CalculatorStepContent />
              <CalculatorNavigation />
            </CalculatorProvider>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Questions? Call us at (705) 555-1234 or email <a href="mailto:info@tidytrails.ca" className="text-primary hover:underline">info@tidytrails.ca</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;