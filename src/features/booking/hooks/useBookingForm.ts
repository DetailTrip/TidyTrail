// src/features/booking/hooks/useBookingForm.ts
import { useContext } from "react";
import { BookingContext } from "@booking/context/BookingContext";

export const useBookingForm = () => {
  const { bookingData, setBookingData } = useContext(BookingContext);

  // Dummy validation — just return true for now
  const validateStep = () => {
    return true;
  };

  const updateField = (field: string, value: any) => {
    setBookingData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    bookingData,
    validateStep,
    updateField,
  };
};
