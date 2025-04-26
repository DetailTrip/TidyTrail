import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  labels = []
}) => {
  // Pre-compute all values
  const progressValue = Math.round((currentStep - 1) / (totalSteps - 1) * 100);
  const progressStyle = { width: `${progressValue}%` };
  
  return (
    <div className="w-full mb-8" role="navigation" aria-label="Calculator progress">
      <div className="flex justify-between items-center mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const label = labels[index] || `Step ${stepNumber}`;
          
          return (
            <div key={stepNumber} className="flex flex-col items-center relative">
              <div 
                className={`
                  flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                  ${isActive ? 'bg-primary text-white' : 
                    isCompleted ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'}
                  transition-colors duration-300
                `}
                data-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              
              <span className="text-xs mt-1 text-center hidden sm:block">
                {label}
              </span>
              
              {index < totalSteps - 1 && (
                <div className="absolute top-4 w-full right-1/2 h-[2px] bg-gray-200">
                  <div 
                    className={`h-full bg-primary transition-all duration-300 ${
                      currentStep > stepNumber ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-300"
          style={progressStyle}
          role="progressbar"
          aria-label="Progress through calculator steps"
          data-value={progressValue}
          data-min="0"
          data-max="100"
        />
      </div>
    </div>
  );
};

export default StepIndicator;
