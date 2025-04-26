import React from 'react';

// Define the YardSize type
type YardSize = 'small' | 'medium' | 'large' | 'x-large';

interface YardSizeSliderProps {
  value: YardSize;
  onChange: (value: YardSize) => void;
  disabled?: boolean;
}

const YardSizeSlider: React.FC<YardSizeSliderProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const yardSizes: { value: YardSize; label: string; description: string }[] = [
    { value: 'small', label: 'Small', description: 'Up to 1,500 sq ft' },
    { value: 'medium', label: 'Medium', description: '1,501–3,000 sq ft' },
    { value: 'large', label: 'Large', description: '3,001–6,000 sq ft' },
    { value: 'x-large', label: 'X-Large', description: '6,001–8,000 sq ft' }
  ];
  
  const currentIndex = yardSizes.findIndex(size => size.value === value);
  const sliderId = React.useId();
  
  return (
    <div className="w-full" data-disabled={disabled ? "true" : "false"}>
      <label htmlFor={sliderId} className="sr-only">Yard Size Slider</label>
      
      <div className="mb-4">
        <div className="flex justify-between" role="group" aria-label="Yard size options">
          {yardSizes.map((size, index) => (
            <button
              key={size.value}
              type="button"
              onClick={() => !disabled && onChange(size.value)}
              disabled={disabled}
              className={`
                w-[calc(25%-0.5rem)] py-2 px-1 rounded-lg text-center transition-all
                ${value === size.value 
                  ? 'bg-primary text-white scale-105 shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              aria-pressed={value === size.value ? "true" : "false"}
              aria-label={`${size.label}: ${size.description}`}
            >
              <div className="text-sm font-semibold">{size.label}</div>
              <div className="text-xs mt-1">{size.description}</div>
            </button>
          ))}
        </div>
      </div>
      
      <input
        id={sliderId}
        type="range"
        min={0}
        max={yardSizes.length - 1}
        value={currentIndex}
        onChange={(e) => !disabled && onChange(yardSizes[parseInt(e.target.value)].value)}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-label="Yard size slider"
        aria-valuetext={`Current selection: ${yardSizes[currentIndex].label} (${yardSizes[currentIndex].description})`}
      />
      
      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
        <span>Small</span>
        <span>Medium</span>
        <span>Large</span>
        <span>X-Large</span>
      </div>
    </div>
  );
};

export default YardSizeSlider;