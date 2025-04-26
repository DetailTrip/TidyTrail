import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import ServiceCheckbox from '../atoms/ServiceCheckbox';
import PriceDisplay from '../atoms/PriceDisplay';
import { calculateServicePrice } from '../../../utils/pricing';

const CalculatorStep2: React.FC = () => {
  const { state, dispatch } = useCalculator();
  const { property, services } = state;
  
  const handleToggleService = (serviceId: string) => {
    dispatch({ type: 'TOGGLE_SERVICE', payload: serviceId });
  };
  
  // Get recommendations based on property details
  const getRecommendedServices = () => {
    const recommendations: string[] = [];
    
    // Recommend pet waste cleanup for pet owners
    if (property.hasPets) {
      recommendations.push('pet-waste');
    }
    
    // Recommend debris removal for properties with heavy debris
    if (property.specialConditions.includes('debris')) {
      recommendations.push('debris-removal');
    }
    
    // Seasonal recommendations (based on current month)
    const currentMonth = new Date().getMonth();
    // Spring (April-May)
    if (currentMonth >= 3 && currentMonth <= 4) {
      recommendations.push('spring-cleanup');
    }
    // Fall (Sept-Oct)
    else if (currentMonth >= 8 && currentMonth <= 9) {
      recommendations.push('fall-cleanup');
    }
    
    return recommendations;
  };
  
  const recommendedServices = getRecommendedServices();
  const availableServices = [
    {
      id: 'lawn-mowing',
      name: 'Lawn Mowing & Maintenance',
      description: 'Regular cutting, edging, and basic lawn care',
      image: '/assets/lawn-mowing.jpg' // Replace with actual image path
    },
    {
      id: 'pet-waste',
      name: 'Pet Waste Cleanup',
      description: 'Regular removal of pet waste to keep your yard clean and sanitary',
      image: '/assets/pet-waste.jpg' // Replace with actual image path
    },
    {
      id: 'spring-cleanup',
      name: 'Spring Cleanup',
      description: 'Comprehensive yard cleanup to prepare for the growing season',
      image: '/assets/spring-cleanup.jpg' // Replace with actual image path
    },
    {
      id: 'fall-cleanup',
      name: 'Fall Cleanup',
      description: 'Leaf removal and yard prep for winter',
      image: '/assets/fall-cleanup.jpg' // Replace with actual image path
    },
    {
      id: 'debris-removal',
      name: 'Debris Removal',
      description: 'Removal of sticks, leaves, and other yard debris',
      image: '/assets/debris-removal.jpg' // Replace with actual image path
    },
    {
      id: 'patio-cleaning',
      name: 'Patio & Furniture Cleaning',
      description: 'Clean and restore your outdoor living spaces',
      image: '/assets/patio-cleaning.jpg' // Replace with actual image path
    },
    {
      id: 'deodorizing',
      name: 'Deodorizing & Stain Treatment',
      description: 'Eliminate pet odors and stains from your yard',
      image: '/assets/deodorizing.jpg' // Replace with actual image path
    }
  ];
  
  const isCommercial = property.type === 'commercial';
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Select Your Services
      </h2>
      <p className="text-gray-600 mb-6">
        Choose the services you're interested in. Prices are based on your property details.
      </p>
      
      {isCommercial ? (
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            Commercial Service Packages
          </h3>
          <p className="text-amber-700 mb-4">
            We offer customized maintenance packages for commercial properties starting at $200/month.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-white">
              <h4 className="font-semibold mb-2">Basic Maintenance</h4>
              <ul className="text-sm space-y-1 mb-3">
                <li>• Weekly lawn mowing</li>
                <li>• Edging and trimming</li>
                <li>• Debris removal</li>
              </ul>
              <p className="font-semibold text-primary">From $200/month</p>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <h4 className="font-semibold mb-2">Premium Maintenance</h4>
              <ul className="text-sm space-y-1 mb-3">
                <li>• All Basic services</li>
                <li>• Seasonal cleanups</li>
                <li>• Patio & walkway maintenance</li>
              </ul>
              <p className="font-semibold text-primary">From $350/month</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {availableServices.map((service) => {
            const isSelected = services.find(s => s.id === service.id)?.selected || false;
            const isRecommended = recommendedServices.includes(service.id);
            
            // Calculate service price based on property details
            let price = 0;
            if (service.id === 'lawn-mowing') {
              price = calculateServicePrice(
                service.id, 
                property.yardSize, 
                property.grassHeight || 'short', 
                'weekly'
              );
            } else if (service.id === 'pet-waste') {
              price = 24; // Weekly price
            } else if (service.id === 'debris-removal') {
              // Using the debris pricing from the pricing utility
              const debrisPrices = {
                'small': 40,
                'medium': 60,
                'large': 80,
                'x-large': 100
              };
              price = debrisPrices[property.yardSize];
            } else if (service.id === 'spring-cleanup' || service.id === 'fall-cleanup') {
              price = 150;
            } else if (service.id === 'patio-cleaning') {
              price = 50;
            } else if (service.id === 'deodorizing') {
              price = 30;
            }
            
            return (
              <div
                onClick={() => handleToggleService(service.id)}
                className={`relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all 
                            ${isSelected 
                              ? 'border-primary bg-primary/5 dark:bg-primary/20' 
                              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
              >
                <div className="p-4">
                  <div className="absolute top-3 right-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-primary text-white' : 'border border-gray-300 dark:border-gray-600'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{service.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <PriceDisplay amount={price} period={service.id === 'pet-waste' || service.id === 'lawn-mowing' ? 'weekly' : 'one-time'} />
                    
                    {isRecommended && !isSelected && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Service recommendation section */}
      {!isCommercial && recommendedServices.length > 0 && !recommendedServices.every(id => 
        services.find(s => s.id === id)?.selected
      ) && (
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Recommended Services
          </h3>
          <p className="text-sm text-green-700 mb-3">
            Based on your property details, we recommend the following services:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recommendedServices.map(id => {
              const service = availableServices.find(s => s.id === id);
              if (!service) return null;
              
              const isSelected = services.find(s => s.id === id)?.selected || false;
              if (isSelected) return null;
              
              return (
                <button
                  key={id}
                  onClick={() => handleToggleService(id)}
                  className="flex items-center p-2 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Selected services summary */}
      {services.some(s => s.selected) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">
            Selected Services
          </h3>
          <ul className="space-y-1">
            {services.filter(s => s.selected).map(service => {
              const serviceDetails = availableServices.find(s => s.id === service.id);
              if (!serviceDetails) return null;
              
              return (
                <li key={service.id} className="flex justify-between">
                  <span>{serviceDetails.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalculatorStep2;
