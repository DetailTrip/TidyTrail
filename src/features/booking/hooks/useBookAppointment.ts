// src/features/booking/hooks/useBookAppointment.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { submitBooking } from "@booking/utils/bookingApi";

/** Data we send to Supabase (snake_case to match DB columns) */
export interface BookingPayload {
  // Service & pricing
  frequency: string;
  dog_count: number;
  waste_level?: string;
  areas?: string[];
  add_ons?: string[];
  referral_code?: string;
  first_service_date?: string;
  total_price: number;

  // Customer info
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  address?: string;
  unit?: string;
  city?: string;
  special_instructions?: string;
  preferred_contact?: string;
  best_time?: string;
  dog_names?: string;
  marketing_opt_in?: boolean;
}

/** Data we get back from Supabase */
interface BookingResponse {
  bookingId: string;
}

export const useBookAppointment = (): UseMutationResult<
  BookingResponse,
  Error,
  BookingPayload
> =>
  useMutation<BookingResponse, Error, BookingPayload>({
    mutationFn: submitBooking,
  });
