// src/features/booking/hooks/useBookAppointment.ts

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { submitBooking } from "@booking/utils/bookingApi";

interface BookingPayload {
  frequency: string;
  dogCount: number;
  wasteLevel?: string;
  areas?: string[];
  addOns?: string[];
  referralCode?: string;
  firstServiceDate?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  total: number;
}

interface BookingResponse {
  success: boolean;
}

export const useBookAppointment = (): UseMutationResult<
  BookingResponse,
  Error,
  BookingPayload
> => {
  return useMutation<BookingResponse, Error, BookingPayload>({
    mutationFn: submitBooking,
  });
};

