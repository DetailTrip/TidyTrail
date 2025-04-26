import React, { useCallback, lazy } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import PropertyTypeSelector from '../molecules/PropertyTypeSelector';
import YardSizeSelector from '../molecules/YardSizeSelector';
import GrassHeightSelector from '../molecules/GrassHeightSelector';
import PetOwnershipSelector from '../molecules/PetOwnershipSelector';
import InfoCard from '../../common/InfoCard';

// Lazy load SpecialConditionsGroup for performance optimization
const SpecialConditionsGroup = lazy(() => import('../molecules/SpecialConditionsGroup'));

const CalculatorStep1: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { property } = state;
  const [isLoading, setIsLoading] = React.useState(true);

  // Only show yard-specific fields for residential properties
  const isResidential = property.type === 'residential';

  // Restore progress from localStorage - move to top with loading state
  React.useEffect(() => {
    const savedState = localStorage.getItem('calculatorState');
    if (savedState) {
      try {
        dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(savedState) });
      } catch (error) {
        console.error('Failed to parse saved state:', error);
      }
    }
    setIsLoading(false);
  }, [dispatch]);

  // Add this utility function at the top of your file
  const triggerHapticFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(5); // Subtle vibration (5ms)
    }
  };

  // Reusable dispatch helper
  const updatePropertyWithFeedback = useCallback((key: string, value: any) => {
    triggerHapticFeedback();
    dispatch({ type: 'UPDATE_PROPERTY', payload: { [key]: value } });
  }, [dispatch]);


  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tell us about your property
      </h2>

      {/* Property Type Selector */}
      <PropertyTypeSelector
        value={property.type}
        onChange={(type) => updatePropertyWithFeedback('type', type)}
      />

      {isResidential && (
        <>
          {/* Responsive grid for residential fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <YardSizeSelector
              value={property.yardSize}
              onChange={(yardSize) => updatePropertyWithFeedback('yardSize', yardSize)}
            />

            <GrassHeightSelector
              value={property.grassHeight || 'short'}
              onChange={(grassHeight) => updatePropertyWithFeedback('grassHeight', grassHeight)}
            />
          </div>

          <PetOwnershipSelector
            value={property.hasPets}
            onChange={(hasPets) => updatePropertyWithFeedback('hasPets', hasPets)}
          />

          <SpecialConditionsGroup
            values={property.specialConditions}
            onChange={(specialConditions) => updatePropertyWithFeedback('specialConditions', specialConditions)}
          />

          {/* Property Summary */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
              </svg>
              Property Summary
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                {property.type === 'residential' ? '🏠 Residential' : '🏢 Commercial'}
              </span>
              {property.type === 'residential' && (
                <>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                    {property.yardSize === 'small' ? '🌱 Small Yard' : 
                     property.yardSize === 'medium' ? '🌿 Medium Yard' : '🌳 Large Yard'}
                  </span>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                    {property.grassHeight === 'short' ? '✂️ Short Grass' : 
                     property.grassHeight === 'medium' ? '🌾 Medium Grass' : '🌾🌾 Long Grass'}
                  </span>
                  {property.hasPets && (
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700">
                      🐾 Pet Owner
                    </span>
                  )}
                </>
              )}
            </div>
            
            {property.specialConditions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">Special Conditions:</p>
                <div className="flex flex-wrap gap-2">
                  {property.specialConditions.map(condition => (
                    <span key={condition} className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/30 rounded-full text-xs font-medium border border-yellow-100 dark:border-yellow-800">
                      {condition === 'slope' ? '⛰️ Slope' : 
                       condition === 'debris' ? '🍃 Heavy Debris' : '🚧 Difficult Access'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {!isResidential && (
        <div className="p-6 bg-amber-50 dark:bg-gray-900 border-l-4 border-amber-400 dark:border-amber-700 rounded-lg mt-6">
          <div className="flex items-start mb-4">
            <svg className="w-6 h-6 text-amber-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
                Commercial Properties
              </h3>
              <p className="text-amber-700 dark:text-amber-400 mt-1">
                Our commercial services start at $200/month with customized maintenance plans.
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="property-size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Approximate Property Size
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="property-size"
                  placeholder="Enter size in square feet"
                  value={property.commercialSize || ''}
                  className="block w-full pl-3 pr-12 py-2 rounded-md border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  onChange={(e) => updatePropertyWithFeedback('commercialSize', e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">sq ft</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Common sizes: Small office (1,000-3,000 sq ft), Medium building (3,000-10,000 sq ft)
              </p>
            </div>
            
            <div>
              <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Type
              </label>
              <select
                id="property-type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                onChange={(e) => updatePropertyWithFeedback('commercialType', e.target.value)}
                value={property.commercialType || 'office'}
              >
                <option value="office">Office Building</option>
                <option value="retail">Retail Space</option>
                <option value="restaurant">Restaurant</option>
                <option value="industrial">Industrial Property</option>
                <option value="other">Other Commercial</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorStep1;