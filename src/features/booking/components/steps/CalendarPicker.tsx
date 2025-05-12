// src/features/booking/components/steps/CalendarPicker.tsx

import React, { useState } from "react";
import { useBookingContext } from "@booking/context/BookingContext";
import { useAvailability, DayAvailability } from "@booking/hooks/useAvailability";
import { calendarSchema } from "@utils/validation";
import { ZodError } from "zod";

// Shared utility functions (could be moved to utils/dateHelpers.ts)
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

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(bookingData.firstServiceDate || "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, isLoading, isError } = useAvailability(selectedDate);
  const availability: DayAvailability | null = data ?? null;

  const handleDateChange = (value: string) => {
    setSelectedDate(value);

    if (!value) {
      setErrorMessage("Please select a date.");
      return;
    }

    if (!isWeekend(value)) {
      setErrorMessage("Please select a Saturday or Sunday.");
      return;
    }

    if (availability && !availability.available) {
      setErrorMessage("That date is fully booked.");
      return;
    }

    updateBooking({ firstServiceDate: value });
    setErrorMessage(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 text-center">
      <h2 className="text-2xl font-bold text-primary">
        <span role="img" aria-label="calendar">📅</span> First Cleanup Date
      </h2>

      <p className="text-sm text-muted">
        We scoop on weekends! Choose a <strong>Saturday</strong> or <strong>Sunday</strong> for your first visit.
      </p>

      <div className="bg-tidy-mist border border-border rounded-lg p-6">
        <label htmlFor="first-cleanup-date" className="block text-sm font-medium text-muted mb-2">
          Select a date:
        </label>

        <input
          id="first-cleanup-date"
          type="date"
          min={tomorrow}
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="border border-border p-3 rounded-md w-full bg-white text-center shadow-sm"
        />

        <p className="text-xs text-muted mt-1 text-center">
          Only Saturdays and Sundays are available
        </p>

        {isLoading && (
          <p className="mt-3 text-sm text-muted" aria-live="polite">
            🌀 Checking availability...
          </p>
        )}

        {isError && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded" aria-live="polite">
            ❌ Error loading availability. Please try again.
          </p>
        )}

        {availability && !availability.available && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded" aria-live="polite">
            ❌ Sorry, that date is fully booked.
          </p>
        )}

        {availability && availability.available && availability.spotsLeft < 30 && (
          <p className="inline-block mt-3 bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full" aria-live="polite">
            ✅ Only {availability.spotsLeft} weekend {availability.spotsLeft === 1 ? "spot" : "spots"} left — book before it’s full!
          </p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-600 font-medium mt-2" aria-live="polite">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

// ✅ Step-level validator
export const validate = (data: any) => {
  try {
    calendarSchema.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

export default CalendarPicker;
