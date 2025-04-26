import React from 'react';
import { PropertyType } from '../context/CalculatorContext';

interface PropertyTypeSelectorProps {
  value: PropertyType;
  onChange: (type: PropertyType) => void;
  disabled?: boolean;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const propertyTypes: { value: PropertyType; label: string; description: string; icon: string }[] = [
    { 
      value: 'residential', 
      label: 'Residential', 
      description: 'Homes & private properties',
      icon: '🏠'
    },
    { 
      value: 'commercial', 
      label: 'Commercial', 
      description: 'Businesses & multi-unit properties',
      icon: '🏢'
    }
  ];
  
  return (
    <div className="mb-6">
      <fieldset className="border-0 p-0 m-0">
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </legend>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {propertyTypes.map((type) => (
            <label
              key={type.value}
              className={`
                p-4 border rounded-lg transition-all flex items-center
                ${value === type.value 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                  : 'border-gray-200 hover:border-gray-300'}
                ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <input
                type="radio"
                name="propertyType"
                value={type.value}
                checked={value === type.value}
                onChange={() => !disabled && onChange(type.value)}
                disabled={disabled}
                className="sr-only" // Visually hidden but semantically present
              />
              <div className="text-3xl mr-3">{type.icon}</div>
              <div>
                <div className="font-semibold">{type.label}</div>
                <div className="text-sm text-gray-600">{type.description}</div>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default PropertyTypeSelector;
