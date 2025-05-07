// src/features/booking/utils/transformBookingData.ts
import { BookingData } from "@booking/context/BookingContext";
import { BookingPayload } from "@booking/hooks/useBookAppointment";

export const transformBookingData = (
  bookingData: BookingData,
  total: number
): BookingPayload => ({
  frequency: bookingData.frequency!,
  dog_count: bookingData.dogCount!,
  waste_level: bookingData.wasteLevel,
  areas: bookingData.areas,
  add_ons: bookingData.addOns,
  referral_code: bookingData.referralCode,
  first_service_date: bookingData.firstServiceDate,
  total_price: total,

  first_name: bookingData.firstName,
  last_name: bookingData.lastName,
  phone: bookingData.phone,
  email: bookingData.email,
  address: bookingData.address,
  unit: bookingData.unit,
  city: bookingData.city,
  special_instructions: bookingData.specialInstructions,
  preferred_contact: bookingData.preferredContact,
  best_time: bookingData.bestTime,
  dog_names: bookingData.dogNames,
  marketing_opt_in: bookingData.marketingOptIn,
});
