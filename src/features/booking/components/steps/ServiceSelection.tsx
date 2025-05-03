// src/features/booking/components/steps/ServiceSelection.tsx

import React, { useEffect } from "react";
import { useBookingContext } from "@booking/context/BookingContext";
import { Frequency, WasteLevel } from "@booking/utils/pricingLogic";

const frequencies = [
  { label: "Weekly", value: "weekly" },
  { label: "Bi-Weekly", value: "biweekly" },
  { label: "Twice a Week", value: "twice" },
  { label: "One-Time (Spring Cleanup)", value: "onetime" },
];

const wasteLevels = [
  { label: "Light", value: "light", description: "Only a few piles, recently maintained.", icon: "💩" },
  { label: "Moderate", value: "moderate", description: "Medium build-up, about 1–2 months.", icon: "💩💩" },
  { label: "Heavy", value: "heavy", description: "Full season accumulation, heavily neglected.", icon: "💩💩💩" },
];

const areas = ["Front Yard", "Back Yard", "Side Yard", "Patio/Driveway"];

const ServiceSelection: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();

  const toggleArea = (area: string) => {
    const updated = bookingData.areas?.includes(area)
      ? bookingData.areas.filter((a) => a !== area)
      : [...(bookingData.areas || []), area];
    updateBooking({ areas: updated });
  };

  const getAriaPressed = (area: string) => (bookingData.areas?.includes(area) ? "true" : "false");

  useEffect(() => {
    if (bookingData.addOns === undefined) {
      updateBooking({ addOns: [] });
    }
  }, [bookingData.addOns]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">Customize Your Service</h2>

      <div>
        <h3 className="text-lg font-semibold mb-2">How often would you like service?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {frequencies.map((freq) => (
            <button
              type="button"
              key={freq.value}
              className={`border rounded p-4 text-center font-semibold transition ${
                bookingData.frequency === freq.value ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
              }`}
              onClick={() => updateBooking({ frequency: freq.value as Frequency })}
            >
              {freq.label}
            </button>
          ))}
        </div>
        {bookingData.frequency === "onetime" && (
          <p className="text-sm italic text-center text-gray-500 mt-2">
            We’ll ask how much waste is present next.
          </p>
        )}
      </div>

      {bookingData.frequency === "onetime" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">How much waste is present?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wasteLevels.map((level) => (
              <button
                type="button"
                key={level.value}
                className={`p-4 rounded shadow border transition text-left ${
                  bookingData.wasteLevel === level.value ? "ring-2 ring-green-500 border-green-500" : "hover:bg-gray-100"
                }`}
                onClick={() => updateBooking({ wasteLevel: level.value as WasteLevel })}
              >
                <div className="text-lg font-semibold">{level.icon} {level.label}</div>
                <p className="text-sm text-gray-600 mt-1">{level.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">How many dogs do you have?</h3>
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className="bg-gray-200 hover:bg-green-200 w-8 h-8 rounded-full text-lg cursor-pointer"
            onClick={() => updateBooking({ dogCount: Math.max((bookingData.dogCount || 1) - 1, 1) })}
          >
            -
          </button>
          <span className="text-xl">{bookingData.dogCount || 1}</span>
          <button
            type="button"
            className="bg-gray-200 hover:bg-green-200 w-8 h-8 rounded-full text-lg cursor-pointer"
            onClick={() => updateBooking({ dogCount: Math.min((bookingData.dogCount || 1) + 1, 6) })}
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center mt-1">This affects your pricing.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">What parts of your yard should we clean?</h3>
        <p className="text-sm text-gray-500 text-center mb-2">Select all that apply</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {areas.map((area) => (
            <button
              type="button"
              key={area}
              className={`px-4 py-2 border rounded-full transition ${
                bookingData.areas?.includes(area) ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
              }`}
              onClick={() => toggleArea(area)}
              role="button"
              aria-pressed={getAriaPressed(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t mt-6">
        <label className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            checked={bookingData.addOns?.includes("enzymeCleaner") || false}
            onChange={(e) => {
              const updated = e.target.checked ? ["enzymeCleaner"] : [];
              updateBooking({ addOns: updated });
            }}
            className="w-5 h-5"
          />
          <span className="font-medium">Add Enzyme Cleaner (+$18)</span>
        </label>
        <p className="text-sm text-gray-500 ml-6">
          We use EZ-CLEAN™ — a Canadian-made, pet-safe formula that breaks down bacteria,
          odors, and organic stains using natural enzymes.
        </p>
      </div>
    </div>
  );
};

export default ServiceSelection;
