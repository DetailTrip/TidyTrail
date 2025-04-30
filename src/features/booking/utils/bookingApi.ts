// src/features/booking/utils/bookingApi.ts

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
  
  export const submitBooking = async (payload: BookingPayload): Promise<{ success: boolean }> => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Failed to submit booking. Please try again.");
    }
  
    return await response.json();
  };
  