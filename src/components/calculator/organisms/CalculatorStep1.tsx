import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import PropertyTypeSelector from '../molecules/PropertyTypeSelector';
import YardSizeSelector from '../molecules/YardSizeSelector';
import GrassHeightSelector from '../molecules/GrassHeightSelector';
import PetOwnershipSelector from '../molecules/PetOwnershipSelector';
import SpecialConditionsGroup from '../molecules/SpecialConditionsGroup';

const CalculatorStep1: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { property } = state;
  
  // Only show yard-specific fields for residential properties
  const isResidential = property.type === 'residential';
  
  const handlePropertyTypeChange = (type: 'residential' | 'commercial') => {
    dispatch({ 
      type: 'UPDATE_PROPERTY', 
      payload: { type } 
    });
  };
  
  const handleYardSizeChange = (yardSize: 'small' | 'medium' | 'large' | 'x-large') => {
    dispatch({ 
      type: 'UPDATE_PROPERTY', 
      payload: { yardSize } 
    });
  };
  
  const handleGrassHeightChange = (grassHeight: 'short' | 'medium' | 'long') => {
    dispatch({ 
      type: 'UPDATE_PROPERTY', 
      payload: { grassHeight } 
    });
  };
  
  const handlePetOwnershipChange = (hasPets: boolean) => {
    dispatch({ 
      type: 'UPDATE_PROPERTY', 
      payload: { hasPets } 
    });
  };
  
  const handleSpecialConditionsChange = (specialConditions: Array<'slope' | 'debris' | 'difficult-access'>) => {
    dispatch({ 
      type: 'UPDATE_PROPERTY', 
      payload: { specialConditions } 
    });
  };
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Tell us about your property
      </h2>
      
      <PropertyTypeSelector 
        value={property.type}
        onChange={handlePropertyTypeChange}
      />
      
      {isResidential && (
        <>
          <YardSizeSelector 
            value={property.yardSize}
            onChange={handleYardSizeChange}
          />
          
          <GrassHeightSelector 
            value={property.grassHeight || 'short'}
            onChange={handleGrassHeightChange}
          />
          
          <PetOwnershipSelector 
            value={property.hasPets}
            onChange={handlePetOwnershipChange}
          />
          
          <SpecialConditionsGroup 
            values={property.specialConditions}
            onChange={handleSpecialConditionsChange}
          />
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Property Summary
            </h3>
            <p className="text-sm text-blue-700">
              You have a {property.yardSize} residential property with {property.grassHeight} grass height
              {property.hasPets ? ' and pets' : ''}
              {property.specialConditions.length > 0 
                ? `, with ${property.specialConditions.length} special condition${property.specialConditions.length !== 1 ? 's' : ''}` 
                : ''}.
            </p>
          </div>
        </>
      )}
      
      {!isResidential && (
        <div className="p-6 bg-amber-50 border border-amber-100 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">
            Commercial Properties
          </h3>
          <p className="text-amber-700 mb-4">
            Our commercial services start at $200/month and include customized maintenance plans for businesses and multi-unit properties.
          </p>
          <p className="text-amber-700">
            In the next steps, we'll gather some basic information about your commercial property to provide you with a custom quote.
          </p>
        </div>
      )}
    </div>
  );
};

export default CalculatorStep1;
