// src/hooks/useBookings.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@utils/supabaseClient";

/** One row from the `bookings` table after normalisation */
export interface Booking {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  frequency?: string;        // weekly | biweekly | etc.
  dogCount?: number;
  referralCode?: string;
  totalPrice?: number;
  createdAt: string;         // ISO string
  firstServiceDate?: string; // ISO string
  wasteLevel?: string;
  areas?: string;
  addOns?: string;
}

/** Fetches + caches all bookings (stale for 1 minute) */
export const useBookings = () =>
  useQuery<Booking[], Error>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);

      // Shape incoming rows into the Booking interface
      return (data ?? []).map((b) => ({
        id: b.id,
        name: b.name,
        email: b.email,
        phone: b.phone,
        address: b.address,
        frequency: b.frequency,
        dogCount: b.dog_count,
        referralCode: b.referral_code,
        totalPrice: b.total_price,
        createdAt: b.created_at,
        firstServiceDate: b.first_service_date,
        wasteLevel: b.waste_level,
        areas: b.areas,
        addOns: b.add_ons,
      }));
    },
    staleTime: 60_000, // 1 min
  });
