import React from 'react';

interface PetOwnershipSelectorProps {
  value: boolean;
  onChange: (hasPets: boolean) => void;
  disabled?: boolean;
}

const PetOwnershipSelector: React.FC<PetOwnershipSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="mb-6">
      <fieldset className="border-0 p-0 m-0">
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          Do you have pets?
        </legend>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            className={`
              p-4 border rounded-lg transition-all text-center block
              ${value 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <input
              type="radio"
              name="petOwnership"
              value="true"
              checked={value === true}
              onChange={() => !disabled && onChange(true)}
              disabled={disabled}
              className="sr-only" // Visually hidden but semantically present
            />
            <div className="text-3xl mb-2">🐾</div>
            <div className="font-semibold">Yes</div>
            <div className="text-sm text-gray-600">
              We have pet waste removal services available
            </div>
          </label>
          
          <label
            className={`
              p-4 border rounded-lg transition-all text-center block
              ${value === false 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:border-gray-300'}
              ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <input
              type="radio"
              name="petOwnership"
              value="false"
              checked={value === false}
              onChange={() => !disabled && onChange(false)}
              disabled={disabled}
              className="sr-only" // Visually hidden but semantically present
            />
            <div className="text-3xl mb-2">🏡</div>
            <div className="font-semibold">No</div>
            <div className="text-sm text-gray-600">
              No pets on the property
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  );
};

export default PetOwnershipSelector;
