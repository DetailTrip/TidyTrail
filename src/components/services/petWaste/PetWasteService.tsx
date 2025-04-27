import React from 'react';

/**
 * PetWasteService Component
 * 
 * Core component for the TidyTrails pet waste cleanup service.
 * Displays service information, pricing, and booking options.
 */
const PetWasteService: React.FC = () => {
  return (
    <div className="pet-waste-service">
      <h2 className="text-2xl font-bold mb-4">Pet Waste Cleanup Service</h2>
      <p className="mb-4">
        Our professional pet waste cleanup service helps keep your yard clean and hygienic.
        We offer weekly, bi-weekly, and one-time spring cleanup options.
      </p>
      
      <div className="pricing-overview my-6">
        <h3 className="text-xl font-semibold mb-2">Pricing</h3>
        <ul className="list-disc pl-5">
          <li>Weekly Service (up to 2 dogs): $24/visit</li>
          <li>Weekly Service (3+ dogs): $29/visit</li>
          <li>Bi-weekly Service: $45/visit</li>
          <li>One-time Spring Cleanup: $90</li>
        </ul>
      </div>
      
      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Book Now
      </button>
    </div>
  );
};

export default PetWasteService;