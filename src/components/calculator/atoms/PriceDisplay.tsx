import React from 'react';

interface PriceDisplayProps {
  amount: number;
  period?: 'one-time' | 'per-visit' | 'weekly' | 'bi-weekly' | 'monthly' | 'seasonal';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showDiscount?: boolean;
  originalAmount?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  period,
  size = 'medium',
  className = '',
  showDiscount = false,
  originalAmount
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const getPeriodLabel = () => {
    switch (period) {
      case 'one-time': return 'one-time';
      case 'per-visit': return 'per visit';
      case 'weekly': return 'per week';
      case 'bi-weekly': return 'bi-weekly';
      case 'monthly': return 'per month';
      case 'seasonal': return 'per season';
      default: return '';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'text-lg font-semibold';
      case 'medium': return 'text-2xl font-bold';
      case 'large': return 'text-3xl md:text-4xl font-bold';
      default: return 'text-2xl font-bold';
    }
  };
  
  const discountPercentage = originalAmount ? Math.round((1 - amount / originalAmount) * 100) : 0;
  
  return (
    <div className={`${className}`}>
      <span className={`${getSizeClasses()} text-primary`} aria-label={`Price: ${formatCurrency(amount)}${period ? ` ${getPeriodLabel()}` : ''}`}>
        {formatCurrency(amount)}
      </span>
      
      {period && (
        <span className="text-gray-500 text-sm ml-1">
          {getPeriodLabel()}
        </span>
      )}
      
      {showDiscount && originalAmount && originalAmount > amount && (
        <div className="flex items-center mt-1">
          <span className="text-gray-500 line-through text-sm mr-2">
            {formatCurrency(originalAmount)}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
            Save {discountPercentage}%
          </span>
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
