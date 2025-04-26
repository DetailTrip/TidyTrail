import React, { useEffect } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import StepIndicator from '../atoms/StepIndicator';

interface CalculatorLayoutProps {
  children: React.ReactNode;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ children }) => {
  const { state, dispatch } = useCalculator();
  const { currentStep, property } = state;

  // Step labels
  const stepLabels = [
    'Property Details',
    'Services',
    'Frequency',
    'Summary',
    'Contact'
  ];

  // Handle next step navigation
  const handleNext = () => {
    // Save progress before navigating
    localStorage.setItem('calculatorState', JSON.stringify(state));
    
    // Validation logic for each step
    if (currentStep === 1) {
      // Validate property details
      if (!property.type) {
        alert('Please select a property type');
        return;
      }
      if (!property.yardSize) {
        alert('Please select a yard size');
        return;
      }
      if (property.type === 'residential' && !property.grassHeight) {
        alert('Please select a grass height');
        return;
      }
    }

    if (currentStep < stepLabels.length) {
      dispatch({ type: 'SET_STEP', payload: currentStep + 1 });
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous step navigation
  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only if focused within the calculator
      const calculatorElement = document.getElementById('calculator-container');
      if (!calculatorElement || !calculatorElement.contains(document.activeElement)) {
        return;
      }

      if (e.key === 'Enter' && e.ctrlKey) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  // Add a class to body when calculator is active for potential styling hooks
  useEffect(() => {
    document.body.classList.add('calculator-active');
    return () => document.body.classList.remove('calculator-active');
  }, []);

  return (
    <div 
      id="calculator-container" 
      className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-6 md:p-8"
      aria-live="polite"
    >
      {/* Progress indicator */}
      <StepIndicator 
        currentStep={currentStep}
        totalSteps={stepLabels.length}
        labels={stepLabels}
      />
      
      {/* Step content */}
      <div className="min-h-[400px]">
        {children}
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between">
        {currentStep > 1 ? (
          <button
            onClick={handlePrevious}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        ) : (
          <div></div> // Empty div to maintain flex spacing
        )}
        
        {currentStep < stepLabels.length && (
          <button
            onClick={handleNext}
            className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {currentStep === stepLabels.length - 1 ? 'Complete' : 'Continue'}
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Keyboard shortcut hint */}
      <div className="text-center text-xs text-gray-500 mt-4">
        Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">Enter</kbd> to continue
      </div>
      
      {/* Price guarantee */}
      {currentStep >= 2 && (
        <div className="mt-6 text-center text-sm text-primary font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          All quotes are guaranteed for 30 days
        </div>
      )}
    </div>
  );
};

export default CalculatorLayout;
