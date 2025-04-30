// src/features/booking/hooks/useAvailability.ts

import { useQuery } from "@tanstack/react-query";

export const useAvailability = (date: string) => {
  return useQuery({
    queryKey: ["availability", date],
    queryFn: async () => {
      const res = await fetch(`/api/availability?date=${date}`);
      if (!res.ok) {
        throw new Error("Failed to fetch availability");
      }
      return res.json(); // Expected shape: { available: boolean }
    },
    enabled: !!date,
  });
};
