// src/features/booking/context/BookingContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Frequency, WasteLevel } from "@booking/utils/pricingLogic";

// Extended BookingData to include all booking fields
export interface BookingData {
  // ServiceSelection & calendar
  frequency?: Frequency;
  dogCount?: number;
  wasteLevel?: WasteLevel;
  areas?: string[];
  addOns?: string[];
  firstServiceDate?: string;
  prepaySelected?: boolean; // NEW: For 3-month prepay option
  // CustomerForm
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  unit?: string;
  city?: string;
  specialInstructions?: string;
  preferredContact?: "call" | "text" | "email";
  bestTime?: "morning" | "afternoon" | "evening";
  dogNames?: string;
  marketingOptIn?: boolean;
  referralCode?: string;
}

interface BookingContextType {
  bookingData: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
}

const STORAGE_KEY = "tidytrails-booking-draft";

export const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const queryFrequency = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    const freq = params.get("frequency")?.toLowerCase();
    const allowed: Frequency[] = ["weekly", "biweekly", "twice", "onetime"];
    return allowed.includes(freq as Frequency) ? (freq as Frequency) : undefined;
  }, [location.search]);

  const [bookingData, setBookingData] = useState<BookingData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      return {
        ...parsed,
        frequency: queryFrequency ?? parsed.frequency,
      };
    } catch {
      return { frequency: queryFrequency };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
  }, [bookingData]);

  const updateBooking = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};