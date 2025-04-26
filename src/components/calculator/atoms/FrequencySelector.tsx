import React from 'react';
import { ServiceFrequency } from '../context/CalculatorContext';

interface FrequencySelectorProps {
  value: ServiceFrequency;
  onChange: (frequency: ServiceFrequency) => void;
  disabled?: boolean;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const frequencies: {
    value: ServiceFrequency;
    label: string;
    description: string;
    discount: string | null;
  }[] = [
    { 
      value: 'weekly', 
      label: 'Weekly', 
      description: '4 visits per month', 
      discount: '10% off'
    },
    { 
      value: 'bi-weekly', 
      label: 'Bi-Weekly', 
      description: '2 visits per month', 
      discount: '5% off'
    },
    { 
      value: 'monthly', 
      label: 'Monthly', 
      description: '1 visit per month', 
      discount: null
    },
    { 
      value: 'one-time', 
      label: 'One-Time', 
      description: 'Single visit', 
      discount: null
    },
  ];
  
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="sr-only">Service frequency</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {frequencies.map((frequency) => (
          <label
            key={frequency.value}
            className={`
              p-4 border rounded-lg text-center transition-all
              ${value === frequency.value 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <input
              type="radio"
              name="frequency"
              value={frequency.value}
              checked={value === frequency.value}
              onChange={() => !disabled && onChange(frequency.value)}
              disabled={disabled}
              className="sr-only" // Visually hidden but accessible
            />
            <div className="font-semibold mb-1">{frequency.label}</div>
            <div className="text-sm text-gray-600">{frequency.description}</div>
            {frequency.discount && (
              <div className="mt-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  {frequency.discount}
                </span>
              </div>
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default FrequencySelector;
