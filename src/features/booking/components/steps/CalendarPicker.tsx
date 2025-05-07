// src/features/booking/components/steps/CalendarPicker.tsx

import React, { useState } from "react";
import { useBookingContext } from "@booking/context/BookingContext";
import { useAvailability, DayAvailability } from "@booking/hooks/useAvailability";

// Parse a YYYY-MM-DD string into a local Date at midnight
type Nullable<T> = T | null;
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function isWeekend(dateStr: string): boolean {
  const d = parseLocalDate(dateStr);
  const day = d.getDay();
  return day === 0 || day === 6;
}

const CalendarPicker: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(bookingData.firstServiceDate || "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, isLoading, isError } = useAvailability(selectedDate);
  const availability: Nullable<DayAvailability> = data ?? null;

  const handleDateChange = (v: string) => {
    setSelectedDate(v);
    updateBooking({ firstServiceDate: v });
    setErrorMessage(null); // clear error on change
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center space-y-8">
      <h2 className="text-2xl font-bold text-tidy-green">Pick Your First Cleanup Date</h2>
      <p className="text-gray-600 text-sm">
        Choose a weekend (Saturday or Sunday) that works for your first visit.
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
          onChange={(e) => handleDateChange(e.target.value)}
          className="border p-3 rounded-lg w-full max-w-xs mx-auto text-center"
        />

        {isLoading && <p className="text-sm text-gray-500 mt-2">Checking availability...</p>}
        {isError && <p className="text-sm text-red-600 mt-2">Error loading availability.</p>}

        {selectedDate && !isWeekend(selectedDate) && (
          <p className="text-sm text-red-600 mt-2">Please choose a Saturday or Sunday.</p>
        )}

        {availability && !availability.available && (
          <p className="text-sm text-red-600 mt-2">Sorry, that date is fully booked.</p>
        )}

        {availability && availability.available && availability.spotsLeft < 30 && (
          <p className="text-sm text-green-600 mt-2">
            {availability.spotsLeft} {availability.spotsLeft === 1 ? "spot" : "spots"} left
          </p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-600 font-medium mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CalendarPicker;
