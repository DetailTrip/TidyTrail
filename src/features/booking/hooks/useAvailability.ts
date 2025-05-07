// src/features/booking/hooks/useAvailability.ts

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@utils/supabaseClient";

export interface DayAvailability {
  spotsLeft: number;
  available: boolean;
}

export const useAvailability = (date: string) => {
  return useQuery<DayAvailability, Error>({
    queryKey: ["availability", date],
    queryFn: async () => {
      // No date selected → assume all slots open
      if (!date) {
        return { spotsLeft: 30, available: true };
      }

      // Parse YYYY-MM-DD into a Date
      const [year, month, day] = date.split("-").map(Number);
      const selected = new Date(year, month - 1, day);
      const dow = selected.getDay();

      // Find the Saturday of that weekend
      let saturday = new Date(selected);
      if (dow === 0) {
        // Sunday → go back one day
        saturday.setDate(selected.getDate() - 1);
      } else if (dow !== 6) {
        // Not a weekend (should already be blocked UI‑side)
        return { spotsLeft: 30, available: true };
      }

      // Sunday is the day after Saturday
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);

      const satStr = saturday.toISOString().split("T")[0];
      const sunStr = sunday.toISOString().split("T")[0];

      // Fetch **both** weekend days’ bookings
      const { data, error } = await supabase
        .from("bookings")
        .select("id")
        .in("first_service_date", [satStr, sunStr]);

      if (error) throw new Error(error.message);

      const totalBooked = data?.length ?? 0;
      const spotsLeft = Math.max(30 - totalBooked, 0);
      return { spotsLeft, available: spotsLeft > 0 };
    },
    enabled: !!date,
    staleTime: 5 * 60 * 1000, // cache for 5m
  });
};
