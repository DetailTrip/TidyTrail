import React from 'react';

interface ServiceCheckboxProps {
  id: string;
  name: string;
  description?: string;
  price?: number | string;
  image?: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  recommended?: boolean;
  period?: string;
}

const ServiceCheckbox: React.FC<ServiceCheckboxProps> = ({
  id,
  name,
  description,
  price,
  image,
  checked,
  onChange,
  disabled = false,
  recommended = false,
  period
}) => {
  return (
    <div 
      className={`
        relative border rounded-lg overflow-hidden transition-all
        ${checked 
          ? 'border-primary shadow-md' 
          : 'border-gray-200 hover:border-gray-300'}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <input
        type="checkbox"
        id={`service-${id}`}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        aria-label={`Select ${name} service`}
      />
      
      <label 
        htmlFor={`service-${id}`}
        className={`block cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        {recommended && (
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-2 py-1 m-2 rounded-full z-10">
            Recommended
          </div>
        )}
        
        {image && (
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={image} 
              alt={name} 
              className="object-cover w-full h-40"
            />
          </div>
        )}
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {checked && (
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {description && (
            <p className="text-sm text-gray-600 mb-3">{description}</p>
          )}
          
          {price && (
            <div className="text-primary font-semibold">
              {typeof price === 'string' ? price : `$${price}`}
              {period && <span className="text-gray-500 text-sm ml-1">{period}</span>}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default ServiceCheckbox;
