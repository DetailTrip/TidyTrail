// src/features/booking/utils/bookingApi.ts
import { supabase } from "@utils/supabaseClient";
import { BookingPayload } from "@booking/hooks/useBookAppointment";

/** Convert our snake_case payload → DB columns */
const toDbRow = (p: BookingPayload) => ({
  // Service & pricing
  frequency:          p.frequency,
  dog_count:          p.dog_count,
  waste_level:        p.waste_level,
  areas:              p.areas,
  add_ons:            p.add_ons,
  referral_code:      p.referral_code,
  first_service_date: p.first_service_date,
  total_price:        p.total_price,

  // Customer info
  first_name:         p.first_name,
  last_name:          p.last_name,
  phone:              p.phone,
  email:              p.email,
  address:            p.address,
  unit:               p.unit,
  city:               p.city,
  special_instructions: p.special_instructions,
  preferred_contact:  p.preferred_contact,
  best_time:          p.best_time,
  dog_names:          p.dog_names,
  marketing_opt_in:   p.marketing_opt_in,
});

export const submitBooking = async (payload: BookingPayload) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert([ toDbRow(payload) ])
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return { bookingId: data.id as string };
};