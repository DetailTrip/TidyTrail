import React, { useCallback, lazy } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import PropertyTypeSelector from '../molecules/PropertyTypeSelector';
import YardSizeSelector from '../molecules/YardSizeSelector';
import GrassHeightSelector from '../molecules/GrassHeightSelector';
import PetOwnershipSelector from '../molecules/PetOwnershipSelector';

// Lazy load SpecialConditionsGroup for performance optimization
const SpecialConditionsGroup = lazy(() => import('../molecules/SpecialConditionsGroup'));

const CalculatorStep1: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { property } = state;

  // Only show yard-specific fields for residential properties
  const isResidential = property.type === 'residential';

  // Reusable dispatch helper
  const updateProperty = useCallback((key: string, value: any) => {
    dispatch({ type: 'UPDATE_PROPERTY', payload: { [key]: value } });
  }, [dispatch]);

  // Save progress to localStorage
  const saveProgress = useCallback(() => {
    localStorage.setItem('calculatorState', JSON.stringify(state));
  }, [state]);

  // Restore progress from localStorage
  React.useEffect(() => {
    const savedState = localStorage.getItem('calculatorState');
    if (savedState) {
      try {
        dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(savedState) });
      } catch (error) {
        console.error('Failed to parse saved state:', error);
        // Could add error state handling here
      }
    }
  }, [dispatch]);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tell us about your property
      </h2>

      {/* Property Type Selector */}
      <PropertyTypeSelector
        value={property.type}
        onChange={(type) => updateProperty('type', type)}
      />

      {isResidential && (
        <>
          {/* Responsive grid for residential fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <YardSizeSelector
              value={property.yardSize}
              onChange={(yardSize) => updateProperty('yardSize', yardSize)}
            />

            <GrassHeightSelector
              value={property.grassHeight || 'short'}
              onChange={(grassHeight) => updateProperty('grassHeight', grassHeight)}
            />
          </div>

          <PetOwnershipSelector
            value={property.hasPets}
            onChange={(hasPets) => updateProperty('hasPets', hasPets)}
          />

          <SpecialConditionsGroup
            values={property.specialConditions}
            onChange={(specialConditions) => updateProperty('specialConditions', specialConditions)}
          />

          {/* Property Summary */}
          <div
            aria-live="polite"
            className="mt-8 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700 shadow-sm"
          >
            <h3
              id="property-summary"
              className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2 text-blue-800 dark:text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Property Summary
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              You have a <strong>{property.yardSize || 'small'}</strong>{' '}
              <span>{property.type || 'residential'}</span> property with{' '}
              <strong>{property.grassHeight || 'short'}</strong> grass height
              {property.hasPets ? ' and pets' : ''}.
              {property.specialConditions.length > 0
                ? ` It includes ${property.specialConditions.length} special condition${
                    property.specialConditions.length !== 1 ? 's' : ''
                  }: ${property.specialConditions.join(', ')}.`
                : ''}
            </p>
          </div>
        </>
      )}

      {!isResidential && (
        <div className="p-6 bg-amber-50 dark:bg-gray-900 border border-amber-100 dark:border-amber-700 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
            Commercial Properties
          </h3>
          <p className="text-amber-700 dark:text-amber-400 mb-4">
            Our commercial services start at $200/month and include customized maintenance plans for businesses and multi-unit properties.
          </p>
          <p className="text-amber-700 dark:text-amber-400 mb-4">
            In the next steps, we'll gather some basic information about your commercial property to provide you with a custom quote.
          </p>
          
          {/* Add commercial-specific fields */}
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="property-size" className="block text-sm font-medium text-gray-700">
                Approximate Property Size (sq ft)
              </label>
              <input
                type="number"
                id="property-size"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                onChange={(e) => updateProperty('commercialSize', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {state.currentStep > 1 && (
          <button
            onClick={() => dispatch({ type: 'SET_STEP', payload: Math.max(0, state.currentStep - 1) })}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Previous Step
          </button>
        )}
        <button
          onClick={() => {
            saveProgress();
            // Only advance if we have the minimum required fields
            const canProceed = isResidential ? 
              Boolean(property.type && property.yardSize) : 
              Boolean(property.type);
            if (canProceed) {
              dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
            }
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default CalculatorStep1;