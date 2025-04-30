// src/features/booking/hooks/useBookingForm.ts

import { useBookingContext } from "@booking/context/BookingContext";
import {
  serviceSelectionSchema,
  calendarSchema,
  customerInfoSchema,
} from "@utils/validation";

export const useBookingForm = () => {
  const { bookingData, updateBooking } = useBookingContext(); // ✅ Correct usage

  const validateStep = (step: number) => {
    try {
      if (step === 0) serviceSelectionSchema.parse(bookingData);
      if (step === 1) calendarSchema.parse(bookingData);
      if (step === 2) customerInfoSchema.parse(bookingData);
      return true;
    } catch (err) {
      console.error("Validation error:", err);
      return false;
    }
  };

  const updateField = (field: string, value: any) => {
    updateBooking({ [field]: value }); // ✅ Call updateBooking, not setBookingData
  };

  return {
    bookingData,
    validateStep,
    updateField,
  };
};

