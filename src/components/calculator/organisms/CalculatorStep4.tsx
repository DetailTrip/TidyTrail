import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import PriceDisplay from '../atoms/PriceDisplay';

const CalculatorStep4: React.FC = () => {
  const { state, dispatch } = useCalculator(); // Added dispatch here
  const { services, property, pricing } = state;
  
  const selectedServices = services.filter(service => service.selected);
  
  // No services selected case
  if (selectedServices.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Quote Summary</h2>
        <p className="text-gray-600 mb-8">Please go back and select at least one service to continue.</p>
        <button
          onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Select Services
        </button>
      </div>
    );
  }
  
  // Find current frequency (assuming all services have the same frequency)
  const currentFrequency = selectedServices[0].frequency || 'one-time';
  
  // Calculate monthly or one-time totals based on frequency
  const calculateMonthlyVisits = () => {
    if (currentFrequency === 'weekly') return 4;
    if (currentFrequency === 'bi-weekly') return 2;
    if (currentFrequency === 'monthly') return 1;
    return 1; // one-time
  };
  
  const monthlyVisits = calculateMonthlyVisits();
  const isRecurring = currentFrequency !== 'one-time';
  const monthlyTotal = pricing.totalPrice * monthlyVisits;
  
  // Format the property details for display
  const getYardSizeText = () => {
    switch (property.yardSize) {
      case 'small': return 'Small (Up to 1,500 sq ft)';
      case 'medium': return 'Medium (1,501–3,000 sq ft)';
      case 'large': return 'Large (3,001–6,000 sq ft)';
      case 'x-large': return 'Extra Large (6,001–8,000 sq ft)';
      default: return property.yardSize;
    }
  };
  
  const getGrassHeightText = () => {
    switch (property.grassHeight) {
      case 'short': return 'Short (1-2 inches)';
      case 'medium': return 'Medium (3-5 inches)';
      case 'long': return 'Long (6+ inches)';
      default: return property.grassHeight;
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Quote Summary</h2>
      
      {/* Property Details */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Property Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Property Type</p>
            <p className="font-medium">{property.type === 'residential' ? 'Residential' : 'Commercial'}</p>
          </div>
          <div>
            <p className="text-gray-500">Yard Size</p>
            <p className="font-medium">{getYardSizeText()}</p>
          </div>
          <div>
            <p className="text-gray-500">Grass Height</p>
            <p className="font-medium">{getGrassHeightText()}</p>
          </div>
          {property.hasPets && (
            <div>
              <p className="text-gray-500">Pet Owner</p>
              <p className="font-medium">Yes</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Services & Pricing */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Selected Services</h3>
        <ul className="space-y-2 mb-4">
          {selectedServices.map(service => (
            <li key={service.id} className="flex justify-between">
              <span>{service.name}</span>
              <span className="font-medium">${(service.price ?? 0).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        {/* Special conditions if any */}
        {property.specialConditions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Special Conditions</h4>
            <ul className="text-sm space-y-1">
              {property.specialConditions.map(condition => (
                <li key={condition} className="flex justify-between">
                  <span>{condition}</span>
                  <span className="font-medium">+10%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Discounts if any */}
        {(pricing.frequencyDiscount > 0 || pricing.bundleDiscount > 0) && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Discounts Applied</h4>
            <ul className="text-sm space-y-1">
              {pricing.frequencyDiscount > 0 && (
                <li className="flex justify-between">
                  <span>{currentFrequency} Frequency Discount</span>
                  <span className="font-medium text-green-600">-${pricing.frequencyDiscount.toFixed(2)}</span>
                </li>
              )}
              {pricing.bundleDiscount > 0 && (
                <li className="flex justify-between">
                  <span>Bundle Discount ({selectedServices.length} services)</span>
                  <span className="font-medium text-green-600">-${pricing.bundleDiscount.toFixed(2)}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      
      {/* Summary Pricing */}
      <div className="bg-primary/5 p-4 rounded-lg">
  <PriceDisplay 
    amount={pricing.totalPrice}  // Changed from price to amount
    period={isRecurring ? "per-visit" : "one-time"}  // Changed from label to period
    size="medium"
  />
  
  {isRecurring && (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-gray-700">
          {monthlyVisits} visit{monthlyVisits > 1 ? 's' : ''} per month
        </span>
        <PriceDisplay 
          amount={monthlyTotal}  // Changed from price to amount
          period="monthly"  // Changed from label to period
          size="large"
        />
      </div>
    </div>
  )}
</div>
    </div>
  );
};

export default CalculatorStep4;
