// src/features/booking/context/BookingContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Frequency, WasteLevel } from "@booking/utils/pricingLogic";

// 1. Define the shape of the context
interface BookingData {
  serviceType?: string;
  yardSize?: string;
  frequency?: Frequency;
  dogCount?: number;
  wasteLevel?: WasteLevel;
  areas?: string[];
  addOns?: string[];
  firstServiceDate?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  referralCode?: string;
}

interface BookingContextType {
  bookingData: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
}

const STORAGE_KEY = "tidytrails-booking-draft";

// 2. Create and export the context
export const BookingContext = createContext<BookingContextType | undefined>(undefined);

// 3. Custom hook to access the context
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

// 4. Provider component
export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingData, setBookingData] = useState<BookingData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
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

