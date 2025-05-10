// src/features/booking/components/steps/ServiceSelection.tsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookingContext } from "@booking/context/BookingContext";
import { Frequency, WasteLevel } from "@booking/utils/pricingLogic";
import { serviceSelectionSchema } from "@utils/validation";
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
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    lastSetErrors = setErrors;
    return () => {
      lastSetErrors = null;
    };
  }, []);

  useEffect(() => {
    const paramReferral = searchParams.get("ref")?.toUpperCase();
    if (paramReferral) {
      updateBooking({ referralCode: paramReferral });
    } else if (bookingData.referralCode) {
      updateBooking({ referralCode: undefined });
    }
  }, [searchParams]);

  useEffect(() => {
    if (bookingData.frequency !== "onetime" && bookingData.wasteLevel) {
      updateBooking({ wasteLevel: undefined });
    }
  }, [bookingData.frequency, bookingData.wasteLevel, updateBooking]);

  useEffect(() => {
    if (bookingData.addOns === undefined) {
      updateBooking({ addOns: [] });
    }
  }, [bookingData.addOns, updateBooking]);

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
          {frequencies.map((freq) => (
            <button
              type="button"
              key={freq.value}
              className={`border rounded p-4 flex justify-between items-center transition shadow-sm text-left font-semibold aria-pressed:$
                {bookingData.frequency === freq.value}`}
              aria-pressed={bookingData.frequency === freq.value}
              onClick={() => updateBooking({ frequency: freq.value as Frequency })}
            >
              <span>{freq.icon} {freq.label}</span>
              {bookingData.frequency === freq.value && <Check className="w-4 h-4 text-green-600" />}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center mt-3">
          💸 Want to save more? Prepay 3 months at checkout and get <strong>10% off</strong> any recurring plan.
        </p>
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

      <fieldset className="bg-highlight border border-accent px-4 py-4 rounded-xl">
        <legend className="text-lg font-semibold mb-2">🐕‍🦺 How many dogs?</legend>
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className="bg-gray-200 hover:ring-2 hover:ring-green-400 w-10 h-10 rounded-full text-lg"
            onClick={() => updateBooking({ dogCount: Math.max((bookingData.dogCount || 1) - 1, 1) })}
          >
            -
          </button>
          <span className="text-xl font-semibold">{bookingData.dogCount || 1}</span>
          <button
            type="button"
            className="bg-gray-200 hover:ring-2 hover:ring-green-400 w-10 h-10 rounded-full text-lg"
            onClick={() => updateBooking({ dogCount: Math.min((bookingData.dogCount || 1) + 1, 6) })}
          >
            +
          </button>
        </div>
        {errors.dogCount && <p className="text-sm text-red-600 text-center mt-2">{errors.dogCount}</p>}
        <p className="text-sm text-gray-500 text-center mt-1">Used to calculate your price.</p>
        <p className="text-yellow-800 bg-yellow-100 border border-yellow-300 text-sm rounded px-3 py-2 mt-2 text-center">
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
        <legend className="text-lg font-semibold mb-2">🧼 Deep Clean Add-On</legend>
        <div
          className={`p-4 rounded-lg shadow-sm border bg-mist flex items-start gap-4 ${
            bookingData.addOns?.includes("enzymeCleaner")
              ? "ring-2 ring-green-500 border-green-500"
              : "hover:bg-gray-100"
          }`}
        >
          <input
            type="checkbox"
            checked={bookingData.addOns?.includes("enzymeCleaner") || false}
            onChange={(e) => {
              const updated = e.target.checked ? ["enzymeCleaner"] : [];
              updateBooking({ addOns: updated });
            }}
            className="mt-1 w-5 h-5 shrink-0"
            aria-label="Add enzyme cleaner for $18"
          />
          <div>
            <span className="font-medium">Add Enzyme Cleaner (+$18)</span>
            <p className="text-sm text-gray-600 mt-1">
              EZ-CLEAN™ is a Canadian-made, pet-safe formula that breaks down bacteria,
              odors, and organic stains using natural enzymes.
            </p>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export const validate = (data: any) => {
  const errs: { [key: string]: string } = {};
  if (!data.frequency) errs.frequency = "Please select a service frequency.";
  if (data.frequency === "onetime" && !data.wasteLevel)
    errs.wasteLevel = "Please choose how much waste is present.";
  if (!data.dogCount) errs.dogCount = "Please select how many dogs you have.";
  if (!data.areas || data.areas.length === 0)
    errs.areas = "Please select at least one area to clean.";
  if (lastSetErrors) lastSetErrors(errs);
  return Object.keys(errs).length === 0;
};

export default ServiceSelection;
