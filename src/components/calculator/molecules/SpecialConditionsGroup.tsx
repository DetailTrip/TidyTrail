import React from 'react';
import { SpecialCondition } from '../context/CalculatorContext';
import SpecialConditionCheckbox from '../atoms/SpecialConditionCheckbox';

interface SpecialConditionsGroupProps {
  values: SpecialCondition[];
  onChange: (conditions: SpecialCondition[]) => void;
  disabled?: boolean;
}

const SpecialConditionsGroup: React.FC<SpecialConditionsGroupProps> = ({
  values,
  onChange,
  disabled = false
}) => {
  const conditions: { value: SpecialCondition; label: string; description: string }[] = [
    {
      value: 'slope',
      label: 'Sloped Yard',
      description: 'Your yard has significant hills or slopes that require special equipment or techniques'
    },
    {
      value: 'debris',
      label: 'Heavy Debris',
      description: 'Your yard regularly has large amounts of leaves, sticks, or other debris'
    },
    {
      value: 'difficult-access',
      label: 'Difficult Access',
      description: 'Limited entry points, narrow gates, or obstacles that make access challenging'
    }
  ];
  
  const toggleCondition = (condition: SpecialCondition) => {
    if (values.includes(condition)) {
      onChange(values.filter(c => c !== condition));
    } else {
      onChange([...values, condition]);
    }
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Special Conditions
        </label>
        {values.length > 0 && (
          <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
            {values.length} condition{values.length !== 1 ? 's' : ''} selected (+{values.length * 10}%)
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {conditions.map((condition) => (
          <SpecialConditionCheckbox
            key={condition.value}
            condition={condition.value}
            label={condition.label}
            description={condition.description}
            checked={values.includes(condition.value)}
            onChange={() => toggleCondition(condition.value)}
            disabled={disabled}
          />
        ))}
      </div>
      
      {values.length > 0 && (
        <p className="mt-3 text-sm text-gray-500">
          Each special condition adds a 10% surcharge to account for the additional time and effort required.
        </p>
      )}
    </div>
  );
};

export default SpecialConditionsGroup;
