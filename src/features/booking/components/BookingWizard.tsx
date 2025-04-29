// src/features/booking/components/BookingWizard.tsx
import React, { useState } from "react";
import { useBookingForm } from "@booking/hooks/useBookingForm"; // Custom form logic
import { useBookingContext } from "@booking/context/BookingContext"; // Shared state

import ServiceSelection from "@booking/components/steps/ServiceSelection";
import CalendarPicker from "@booking/components/steps/CalendarPicker";
import CustomerForm from "@booking/components/steps/CustomerForm";
import ReviewStep from "@booking/components/steps/ReviewStep";

const steps = [
  { id: 1, title: "Service & Details", component: <ServiceSelection /> },
  { id: 2, title: "Schedule Your Cleanup", component: <CalendarPicker /> },
  { id: 3, title: "Your Information", component: <CustomerForm /> },
  { id: 4, title: "Review & Confirm", component: <ReviewStep /> },
];

const BookingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { validateStep } = useBookingForm();
  const { bookingData } = useBookingContext();

  const goNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      {/* Step Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-tidy-green">
        {steps[currentStep].title}
      </h2>

      {/* Render Current Step */}
      <div className="mb-12">
        {steps[currentStep].component}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={currentStep === 0}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>

        <button
          onClick={goNext}
          className="bg-tidy-green hover:bg-green-800 text-white px-6 py-2 rounded transition"
        >
          {currentStep === steps.length - 1 ? "Confirm Booking" : "Next"}
        </button>
      </div>

      {/* (Optional Debug Info - remove later) */}
      {/* <pre>{JSON.stringify(bookingData, null, 2)}</pre> */}
    </section>
  );
};

export default BookingWizard;
