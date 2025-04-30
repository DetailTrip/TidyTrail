// src/features/booking/components/steps/CalendarPicker.tsx

import React, { useState } from "react";
import { useBookingContext } from "@booking/context/BookingContext";
import { useAvailability } from "@booking/hooks/useAvailability";

const CalendarPicker: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();
  const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD

  const [selectedDate, setSelectedDate] = useState<string>(bookingData.firstServiceDate || "");
  const { data, isLoading, isError } = useAvailability(selectedDate);

  const handleContinue = () => {
    if (selectedDate && data?.available) {
      updateBooking({ firstServiceDate: selectedDate });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center space-y-8">
      <h2 className="text-2xl font-bold text-tidy-green">
        Pick Your First Cleanup Date
      </h2>

      <p className="text-gray-600 text-sm">
        Choose a day that works for your first visit. We'll keep it easy!
      </p>

      <div>
        <label htmlFor="first-cleanup-date" className="block text-sm font-medium text-gray-700">
          Select a date for your first cleanup:
        </label>
        <input
          id="first-cleanup-date"
          type="date"
          min={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          placeholder="Select a date"
          className="border p-3 rounded-lg w-full max-w-xs mx-auto text-center"
        />
        {isLoading && <p className="text-sm text-gray-500 mt-2">Checking availability...</p>}
        {isError && <p className="text-sm text-red-600 mt-2">Error loading availability.</p>}
        {data?.available === false && (
          <p className="text-sm text-red-600 mt-2">Sorry, that date is fully booked.</p>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selectedDate || data?.available === false || isLoading}
        className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        Continue
      </button>
    </div>
  );
};

export default CalendarPicker;

