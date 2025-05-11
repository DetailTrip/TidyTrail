// src/features/booking/components/steps/ServiceSelection.tsx

import React, { useEffect, useState } from "react";
import { useBookingContext } from "@booking/context/BookingContext";
import { Frequency, WasteLevel } from "@booking/utils/pricingLogic";
import { serviceSelectionSchema } from "@utils/validation";
import { useBookingDefaults } from "@booking/hooks/useBookingDefaults"; // ✅ NEW HOOK
import { Check } from "lucide-react";

const frequencies = [
  { label: "Weekly", value: "weekly", icon: "🗓️" },
  { label: "Bi-Weekly", value: "biweekly", icon: "📆" },
  { label: "Twice a Week", value: "twice", icon: "🔁" },
  { label: "One-Time (Spring Cleanup)", value: "onetime", icon: "🌷" },
];

const wasteLevels = [
  {
    label: "Light",
    value: "light",
    description: "Just a few piles, recently maintained.",
    icon: "💩",
  },
  {
    label: "Moderate",
    value: "moderate",
    description: "Moderate build-up — a month or two.",
    icon: "💩💩",
  },
  {
    label: "Heavy",
    value: "heavy",
    description: "Full season, heavily neglected.",
    icon: "💩💩💩",
  },
];

const areas = ["Front Yard", "Back Yard", "Side Yard", "Patio/Driveway"];

let lastSetErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>> | null = null;

const ServiceSelection: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useBookingDefaults(); // ✅ Replaces three local useEffects

  useEffect(() => {
    lastSetErrors = setErrors;
    return () => {
      lastSetErrors = null;
    };
  }, []);

  const toggleArea = (area: string) => {
    const updated = bookingData.areas?.includes(area)
      ? bookingData.areas.filter((a) => a !== area)
      : [...(bookingData.areas || []), area];
    updateBooking({ areas: updated });
  };

  const getAriaPressed = (area: string) =>
    bookingData.areas?.includes(area) ? "true" : "false";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      {bookingData.referralCode?.trim() && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm text-center">
          🎉 You’re saving $10 with referral code <strong>{bookingData.referralCode}</strong>!
        </div>
      )}

      <fieldset>
        <legend className="text-2xl font-bold text-center">How often should we scoop?</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {frequencies.map((freq) => {
            const isSelected = bookingData.frequency === freq.value;
            return (
              <button
                type="button"
                key={freq.value}
                aria-label={`Select ${freq.label} frequency`}
                aria-pressed={isSelected}
                onClick={() => updateBooking({ frequency: freq.value as Frequency })}
                className={`rounded-xl border p-4 flex items-center justify-between transition text-left font-semibold ${
                  isSelected
                    ? "ring-2 ring-green-500 border-green-500 bg-white shadow-md"
                    : "border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {freq.icon} {freq.label}
                </span>
                {isSelected && <Check className="w-5 h-5 text-green-500" />}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-green-900 bg-green-50 border border-green-200 rounded-md px-4 py-2 mt-4 text-center">
          💸 Want to save more? Prepay 3 months at checkout and <strong>get 10% off</strong> any recurring plan.
        </p>

        <div className="bg-sectionAlt border border-border rounded-md px-4 py-3 mt-3 text-center text-sm text-muted">
          📅 Choose <strong>weekly, bi-weekly, or even twice a week</strong> — TidyTrails fits your schedule and keeps your yard spotless.
        </div>

        {errors.frequency && <p className="text-sm text-red-600 mt-2">{errors.frequency}</p>}
        {bookingData.frequency === "onetime" && (
          <p className="text-sm italic text-center text-gray-500 mt-2">
            We’ll ask how much waste is present next.
          </p>
        )}
      </fieldset>

      {bookingData.frequency === "onetime" && (
        <fieldset>
          <legend className="text-lg font-semibold mb-2">What’s the poop situation?</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wasteLevels.map((level) => (
              <button
                type="button"
                key={level.value}
                className={`p-4 rounded-lg shadow-sm border transition text-left bg-mist ${
                  bookingData.wasteLevel === level.value
                    ? "ring-2 ring-green-500 border-green-500"
                    : "hover:bg-gray-100"
                }`}
                aria-pressed={bookingData.wasteLevel === level.value}
                onClick={() => updateBooking({ wasteLevel: level.value as WasteLevel })}
              >
                <div className="text-lg font-semibold">
                  {level.icon} {level.label}
                </div>
                <p className="text-sm text-gray-600 mt-1">{level.description}</p>
              </button>
            ))}
          </div>
          {errors.wasteLevel && <p className="text-sm text-red-600 mt-2">{errors.wasteLevel}</p>}
        </fieldset>
      )}

      <fieldset className="bg-mist border border-accent px-4 py-4 rounded-xl">
        <legend className="text-lg font-semibold mb-2">🐕‍🦺 How many dogs?</legend>

        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            aria-label="Decrease dog count"
            className="bg-gray-200 hover:ring-2 hover:ring-green-400 w-10 h-10 rounded-full text-lg transition-transform active:scale-90"
            onClick={() => updateBooking({ dogCount: Math.max((bookingData.dogCount || 1) - 1, 1) })}
          >
            -
          </button>
          <span className="text-xl font-semibold">{bookingData.dogCount || 1}</span>
          <button
            type="button"
            aria-label="Increase dog count"
            disabled={bookingData.dogCount === 6}
            aria-disabled={bookingData.dogCount === 6}
            onClick={() =>
              updateBooking({ dogCount: Math.min((bookingData.dogCount || 1) + 1, 6) })
            }
            className={`bg-gray-200 w-10 h-10 rounded-full text-lg transition-transform ${
              bookingData.dogCount === 6
                ? "opacity-50 cursor-not-allowed"
                : "hover:ring-2 hover:ring-green-400 active:scale-90"
            }`}
          >
            +
          </button>
        </div>

        {errors.dogCount && <p className="text-sm text-red-600 text-center mt-2">{errors.dogCount}</p>}

        <p className="text-sm text-gray-500 text-center mt-1">Used to calculate your price.</p>

        <p
          className="text-yellow-800 bg-yellow-100 border border-yellow-300 text-sm rounded px-3 py-2 mt-2 text-center"
          aria-live="polite"
        >
          ⚠️ Heads up! A small fee is included automatically if you have more than 2 dogs.
        </p>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold mb-2">🏡 What parts of the yard?</legend>
        <p className="text-sm text-gray-500 text-center mb-2">Select all that apply</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {areas.map((area) => (
            <button
              type="button"
              key={area}
              className={`px-4 py-2 border rounded-full transition ${
                bookingData.areas?.includes(area)
                  ? "bg-mist border-green-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => toggleArea(area)}
              role="button"
              aria-pressed={getAriaPressed(area)}
              aria-checked={bookingData.areas?.includes(area)}
            >
              {area}
            </button>
          ))}
        </div>
        {errors.areas && <p className="text-sm text-red-600 text-center mt-2">{errors.areas}</p>}
      </fieldset>

      <fieldset className="pt-4">
        <legend className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
          <span role="img" aria-label="sparkles">🧼</span> Deep Clean Add-On
        </legend>
        <button
          type="button"
          onClick={() => {
            const checked = bookingData.addOns?.includes("enzymeCleaner");
            const updated = checked ? [] : ["enzymeCleaner"];
            updateBooking({ addOns: updated });
          }}
          className={`w-full text-left bg-mist rounded-xl p-4 shadow-sm transition flex items-start gap-4 cursor-pointer ${
            bookingData.addOns?.includes("enzymeCleaner")
              ? "ring-2 ring-green-500 border-green-500 bg-white"
              : "border border-gray-300 hover:border-accent/60 hover:ring-1 hover:ring-accent/30 hover:bg-white"
          }`}
          aria-pressed={bookingData.addOns?.includes("enzymeCleaner")}
        >
          <div className="pt-[2px] text-lg">🧼</div>
          <div>
            <div className="font-semibold text-md">
              Add Enzyme Cleaner <span className="text-sm font-normal text-muted">(+$18)</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              EZ-CLEAN™ is a Canadian-made, pet-safe enzyme spray that breaks down odors,
              bacteria, and organic waste.
            </p>
          </div>
        </button>
      </fieldset>
    </div>
  );
};

import { ZodError } from "zod";

export const validate = (data: any) => {
  try {
    serviceSelectionSchema.parse(data);
    if (lastSetErrors) lastSetErrors({});
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      const errs: { [key: string]: string } = {};
      error.errors.forEach((e) => {
        if (e.path[0]) errs[e.path[0] as string] = e.message;
      });
      if (lastSetErrors) lastSetErrors(errs);
    }
    return false;
  }
};

export default ServiceSelection;