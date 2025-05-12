// src/features/booking/hooks/useBookingForm.ts

import { useBookingContext } from "@booking/context/BookingContext";

export const useBookingForm = () => {
  const { bookingData, updateBooking } = useBookingContext();

  const validateStep = async (step: number) => {
    try {
      if (step === 0) {
        const serviceModule = await import("@booking/components/steps/ServiceSelection");
        if (typeof (serviceModule as any).validate === "function") {
          return (serviceModule as any).validate(bookingData);
        }
      }

      if (step === 1) {
        const calendarModule = await import("@booking/components/steps/CalendarPicker");
        if (typeof (calendarModule as any).validate === "function") {
          return (calendarModule as any).validate(bookingData);
        }
      }

      if (step === 2) {
        const customerModule = await import("@booking/components/steps/CustomerForm");
        if (typeof (customerModule as any).validate === "function") {
          return await (customerModule as any).validate(bookingData);
        }
      }

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
