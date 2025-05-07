// src/features/booking/hooks/useBookingForm.ts

import { useBookingContext } from "@booking/context/BookingContext";
import {
  serviceSelectionSchema,
  calendarSchema,
  customerInfoSchema,
} from "@utils/validation";

export const useBookingForm = () => {
  const { bookingData, updateBooking } = useBookingContext();

  const validateStep = async (step: number) => {
    try {
      if (step === 0) {
        const serviceModule = await import("@booking/components/steps/ServiceSelection");
        if (typeof serviceModule.validate === "function") {
          const valid = serviceModule.validate(bookingData);
          return valid;
        }
      }
      if (step === 1) calendarSchema.parse(bookingData);
      if (step === 2) customerInfoSchema.parse(bookingData);
      return true;
    } catch (err) {
      console.error("Validation error:", err);
      return false;
    }
  };

  const updateField = (field: string, value: any) => {
    updateBooking({ [field]: value });
  };

  return {
    bookingData,
    validateStep,
    updateField,
  };
};
