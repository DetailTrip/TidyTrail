import React from 'react';

/**
 * LawnMowService Component
 * 
 * Core component for the TidyTrails lawn mowing service.
 * Displays service information, pricing, and booking options.
 */
const LawnMowService: React.FC = () => {
  return (
    <div className="lawn-mow-service">
      <h2 className="text-2xl font-bold mb-4">Lawn Mowing Service</h2>
      <p className="mb-4">
        Professional lawn mowing service to keep your yard looking its best.
        We offer regular scheduled service and one-time options.
      </p>
      
      <div className="pricing-overview my-6">
        <h3 className="text-xl font-semibold mb-2">Pricing</h3>
        <ul className="list-disc pl-5">
          <li>Small Yard (up to 5,000 sq ft): $XX/visit</li>
          <li>Medium Yard (5,001-10,000 sq ft): $XX/visit</li>
          <li>Large Yard (10,001+ sq ft): Custom quote</li>
        </ul>
      </div>
      
      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Book Now
      </button>
    </div>
  );
};

export default LawnMowService;