// src/features/booking/components/BookingWizard.tsx

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookingForm } from "@booking/hooks/useBookingForm";
import { useBookingContext } from "@booking/context/BookingContext";
import { Frequency } from "@booking/utils/pricingLogic";

import ServiceSelection from "@booking/components/steps/ServiceSelection";
import CalendarPicker from "@booking/components/steps/CalendarPicker";
import CustomerForm from "@booking/components/steps/CustomerForm";
import ReviewStep from "@booking/components/steps/ReviewStep";

const steps = [
  { id: 1, title: "Service & Details", component: ServiceSelection },
  { id: 2, title: "Schedule Your Cleanup", component: CalendarPicker },
  { id: 3, title: "Your Information", component: CustomerForm },
  { id: 4, title: "Review & Confirm", component: ReviewStep },
];

const BookingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { validateStep } = useBookingForm();
  const { updateBooking, bookingData } = useBookingContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paramFrequency = searchParams.get("frequency")?.toLowerCase();
    const paramReferral = searchParams.get("ref")?.toUpperCase();
    const allowed: Frequency[] = ["weekly", "biweekly", "twice", "onetime"];

    const updates: Partial<typeof bookingData> = {};

    if (paramFrequency && allowed.includes(paramFrequency as Frequency) && !bookingData.frequency) {
      updates.frequency = paramFrequency as Frequency;
    }

    if (paramReferral && !bookingData.referralCode) {
      updates.referralCode = paramReferral;
    }

    if (Object.keys(updates).length > 0) {
      updateBooking(updates);
    }
  }, [searchParams, bookingData.frequency, bookingData.referralCode, updateBooking]);

  const goNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = currentStep === steps.length - 1;
  const StepComponent = steps[currentStep].component;

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center text-sm text-gray-600 mb-2">
        Step {currentStep + 1} of {steps.length}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-tidy-green">
        {steps[currentStep].title}
      </h2>
      <div className="mb-12">
        <StepComponent goBack={goBack} goToStep={setCurrentStep} />
      </div>
      <div className="flex justify-between items-center">
        {currentStep > 0 ? (
          <button
            onClick={goBack}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        {!isLastStep && (
          <button
            onClick={goNext}
            className="bg-tidy-green hover:bg-green-800 text-white px-6 py-2 rounded transition"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default BookingWizard;
