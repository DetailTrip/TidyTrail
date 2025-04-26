import React from 'react';
import { SpecialCondition } from '../context/CalculatorContext';

interface SpecialConditionCheckboxProps {
  condition: SpecialCondition;
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  surcharge?: string;
}

const SpecialConditionCheckbox: React.FC<SpecialConditionCheckboxProps> = ({
  condition,
  label,
  description,
  checked,
  onChange,
  disabled = false,
  surcharge = "+10%"
}) => {
  return (
    <div className="relative">
      <div 
        className={`
          flex items-start p-3 border rounded-lg transition-all
          ${checked 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-200 hover:border-gray-300'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => !disabled && onChange()}
      >
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            id={`condition-${condition}`}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            aria-describedby={`condition-${condition}-description`}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label 
            htmlFor={`condition-${condition}`} 
            className="font-medium text-gray-900 flex items-center"
          >
            {label}
            <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              {surcharge}
            </span>
          </label>
          {description && (
            <p id={`condition-${condition}-description`} className="text-gray-500 text-xs mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialConditionCheckbox;
