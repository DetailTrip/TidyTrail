import React, { useEffect } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import FrequencySelector from '../atoms/FrequencySelector';
import PriceDisplay from '../atoms/PriceDisplay';
import { calculateTotalPrice } from '../../../utils/pricing';

const CalculatorStep3: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { services, property } = state;
  
  const selectedServices = services.filter(service => service.selected);
  const hasLawnService = selectedServices.some(service => service.id === 'lawn-mowing');
  
  // Default frequency
  const currentFrequency = selectedServices.length > 0 && selectedServices[0].frequency 
    ? selectedServices[0].frequency 
    : 'one-time';
  
  // When frequency changes, update all selected services
  const handleFrequencyChange = (frequency: typeof currentFrequency) => {
    // Update each selected service with the new frequency
    selectedServices.forEach(service => {
      dispatch({
        type: 'SET_SERVICE_FREQUENCY',
        payload: { id: service.id, frequency }
      });
    });
    
    // Recalculate pricing
    updatePricing(frequency);
  };
  
  // Calculate prices for different frequencies for comparison
  const updatePricing = (frequency: typeof currentFrequency) => {
    if (selectedServices.length === 0) return;
    
    const pricing = calculateTotalPrice(
      services,
      property.yardSize,
      property.grassHeight || 'short',
      frequency,
      property.specialConditions
    );
    
    dispatch({ type: 'UPDATE_PRICING', payload: pricing });
  };
  
  // Calculate seasonal package price if lawn service is selected
  const calculateSeasonalPackage = () => {
    if (!hasLawnService) return null;
    
    // 14 cuts for the season with 10% discount
    const regularWeeklyPrice = calculateTotalPrice(
      services.filter(s => s.id === 'lawn-mowing').map(s => ({ ...s, selected: true, frequency: 'weekly' })),
      property.yardSize,
      property.grassHeight || 'short',
      'weekly',
      property.specialConditions
    );
    
    const cutPrice = regularWeeklyPrice.totalPrice;
    const seasonalDiscount = 0.1; // 10% discount
    const numberOfCuts = 14;
    
    return {
      totalPrice: Math.round(cutPrice * numberOfCuts * (1 - seasonalDiscount)),
      perCutPrice: Math.round(cutPrice * (1 - seasonalDiscount)),
      numberOfCuts,
      savings: Math.round(cutPrice * numberOfCuts * seasonalDiscount)
    };
  };
  
  const seasonalPackage = hasLawnService ? calculateSeasonalPackage() : null;
  
  // Run price calculation when component mounts
  useEffect(() => {
    updatePricing(currentFrequency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Check if we have any selected services
  if (selectedServices.length === 0) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Service Frequency</h2>
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
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Service Frequency</h2>
      <p className="text-gray-600 mb-8">How often would you like your services performed?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {['one-time', 'bi-weekly', 'weekly'].map((freq) => {
          const isActive = currentFrequency === freq;
          const discount = freq === 'weekly' ? 10 : freq === 'bi-weekly' ? 5 : 0;
          
          // Calculate example pricing
          const basePrice = 50; // Example base price
          const discountedPrice = basePrice * (1 - discount/100);
          
          return (
            <div
              key={freq}
              onClick={() => handleFrequencyChange(freq as any)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all
                         ${isActive
                           ? 'border-primary bg-primary/5 dark:bg-primary/20'
                           : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
            >
              <div className="absolute top-3 right-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-primary text-white' : 'border border-gray-300 dark:border-gray-600'
                }`}>
                  {isActive && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-1">
                {freq === 'one-time' ? 'One-time Service' :
                 freq === 'bi-weekly' ? 'Bi-weekly Service' : 'Weekly Service'}
              </h3>
              
              <div className="mt-2 space-y-1">
                {freq === 'one-time' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Perfect for occasional needs
                  </p>
                )}
                {freq === 'bi-weekly' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Every 2 weeks (2 visits/month)
                  </p>
                )}
                {freq === 'weekly' && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Every week (4 visits/month)
                  </p>
                )}
              </div>
              
              <div className="mt-4">
                <div className="font-medium text-lg">
                  ${discountedPrice.toFixed(2)}
                  {discount > 0 && (
                    <span className="ml-2 line-through text-sm text-gray-500">${basePrice.toFixed(2)}</span>
                  )}
                </div>
                
                {discount > 0 && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                    {discount}% Off
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Service Summary</h3>
        
        <div className="space-y-3">
          {selectedServices.map(service => (
            <div key={service.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{service.name}</p>
                <p className="text-sm text-gray-600">
                  {service.frequency === 'weekly' ? '4 visits per month' :
                   service.frequency === 'bi-weekly' ? '2 visits per month' :
                   service.frequency === 'monthly' ? '1 visit per month' : 'One-time service'}
                </p>
              </div>
              <PriceDisplay 
                amount={service.price || 0} 
                period="per-visit"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <div>
            <p className="font-medium">Monthly Total</p>
            <p className="text-sm text-gray-600">
              {currentFrequency === 'weekly' ? '4 visits' :
               currentFrequency === 'bi-weekly' ? '2 visits' :
               currentFrequency === 'monthly' ? '1 visit' : 'One-time service'}
            </p>
          </div>
          <PriceDisplay 
            amount={
              currentFrequency === 'weekly' ? state.pricing.totalPrice * 4 :
              currentFrequency === 'bi-weekly' ? state.pricing.totalPrice * 2 :
              state.pricing.totalPrice
            } 
            period="monthly"
            size="large"
          />
        </div>
      </div>
      
      {/* Seasonal Package Option for Lawn Service */}
      {hasLawnService && seasonalPackage && (
        <div className="mt-6 p-4 border border-primary border-dashed rounded-lg bg-primary/5">
          <div className="flex items-start">
            <div className="p-2 bg-primary text-white rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg">Season Package</h3>
              <p className="text-gray-700 text-sm mt-1">
                Get our seasonal package for lawn mowing with 14 visits from May through August.
              </p>
              
              <div className="mt-3 bg-white p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Seasonal Total:</span>
                  <PriceDisplay 
                    amount={seasonalPackage.totalPrice} 
                    size="medium"
                  />
                </div>
                <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                  <span>Per cut ({seasonalPackage.numberOfCuts} cuts):</span>
                  <span>${seasonalPackage.perCutPrice}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Your savings:</span>
                  <span>${seasonalPackage.savings}</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  // Logic to select seasonal package would go here
                  alert('Seasonal package selected! In a real implementation, this would update your pricing.');
                }}
                className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Switch to Season Package
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Frequency discount information */}
      {(currentFrequency === 'weekly' || currentFrequency === 'bi-weekly') && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm text-green-800">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              You're getting a <strong>{currentFrequency === 'weekly' ? '10%' : '5%'} discount</strong> with {currentFrequency} service!
            </span>
          </div>
        </div>
      )}
      
      {/* Launch timing information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            We're launching in late May - perfect timing for your summer yard care needs!
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorStep3;
