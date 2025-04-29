// src/features/booking/context/BookingContext.tsx
import React, { createContext, useContext, useState } from "react";

// 1. Define the shape of the context
interface BookingData {
  serviceType?: string;
  yardSize?: string;
  frequency?: string;
  dogCount?: number;
  addOns?: string[];
  firstServiceDate?: string;
  // Add more fields later as needed
}

interface BookingContextType {
  bookingData: BookingData;
  updateBooking: (updates: Partial<BookingData>) => void;
}

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
  const [bookingData, setBookingData] = useState<BookingData>({});

  const updateBooking = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
