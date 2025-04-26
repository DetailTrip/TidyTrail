import React from 'react';
import { YardSize } from '../context/CalculatorContext';
import YardSizeSlider from '../atoms/YardSizeSlider';

interface YardSizeSelectorProps {
  value: YardSize;
  onChange: (size: YardSize) => void;
  disabled?: boolean;
}

const YardSizeSelector: React.FC<YardSizeSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const sizeDescriptions = {
    'small': 'Typical for townhouses or small city lots',
    'medium': 'Average suburban yard',
    'large': 'Larger property with extensive lawn area',
    'x-large': 'Estate-sized property or large rural lot'
  };
  
  const imageSrcs = {
    'small': '/assets/yard-small.jpg', // Replace with actual image paths
    'medium': '/assets/yard-medium.jpg',
    'large': '/assets/yard-large.jpg',
    'x-large': '/assets/yard-xlarge.jpg'
  };
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Yard Size
      </label>
      
      <YardSizeSlider 
        value={value} 
        onChange={onChange}
        disabled={disabled}
      />
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          {/* Uncomment if you have yard size images */}
          {/* <div className="w-20 h-20 mr-4 overflow-hidden rounded-lg">
            <img 
              src={imageSrcs[value]} 
              alt={`${value} yard`} 
              className="w-full h-full object-cover"
            />
          </div> */}
          
          <div>
            <h4 className="font-semibold">
              {value === 'small' ? 'Small Yard' : 
               value === 'medium' ? 'Medium Yard' : 
               value === 'large' ? 'Large Yard' : 'Extra Large Yard'}
            </h4>
            <p className="text-sm text-gray-600">
              {sizeDescriptions[value]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YardSizeSelector;
