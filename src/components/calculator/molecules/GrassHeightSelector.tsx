import React from 'react';
import { GrassHeight } from '../context/CalculatorContext';

interface GrassHeightSelectorProps {
  value: GrassHeight;
  onChange: (height: GrassHeight) => void;
  disabled?: boolean;
}

const GrassHeightSelector: React.FC<GrassHeightSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const heights: { value: GrassHeight; label: string; description: string; height: string }[] = [
    { 
      value: 'short', 
      label: 'Short', 
      description: 'Recently cut, under 2"', 
      height: 'h-4'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Moderate growth, 2-4"', 
      height: 'h-8'
    },
    { 
      value: 'long', 
      label: 'Long', 
      description: 'Overgrown, over 4"', 
      height: 'h-12'
    }
  ];
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Current Grass Height
      </label>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        role="radiogroup"
        aria-label="Grass height"
      >
        {heights.map((height) => (
          <label
            key={height.value}
            className={`
              p-4 border rounded-lg transition-all text-center block
              ${value === height.value 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <input
              type="radio"
              name="grassHeight"
              value={height.value}
              checked={value === height.value}
              onChange={() => !disabled && onChange(height.value)}
              disabled={disabled}
              className="sr-only" // Visually hidden but semantically present
            />
            <div className="mb-3 flex justify-center">
              <div className="w-12 flex items-end">
                <div className={`w-full ${height.height} bg-green-500 rounded-t`}></div>
              </div>
            </div>
            <div className="font-semibold">{height.label}</div>
            <div className="text-sm text-gray-600">{height.description}</div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GrassHeightSelector;
