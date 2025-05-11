// src/features/booking/components/steps/ServiceSelection.tsx

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serviceSelectionSchema } from "@utils/validation";
import { Frequency, WasteLevel } from "@booking/utils/pricingLogic";
import { useBookingContext } from "@booking/context/BookingContext";
import { useBookingDefaults } from "@booking/hooks/useBookingDefaults";
import { Check } from "lucide-react";

const frequencies = [
  { label: "Weekly", value: "weekly", icon: "🗓️" },
  { label: "Bi-Weekly", value: "biweekly", icon: "📆" },
  { label: "Twice a Week", value: "twice", icon: "🔁" },
  { label: "One-Time (Spring Cleanup)", value: "onetime", icon: "🌷" },
] as const;

const wasteLevels = [
  { label: "Light", value: "light", description: "Just a few piles, recently maintained.", icon: "💩" },
  { label: "Moderate", value: "moderate", description: "Moderate build-up — a month or two.", icon: "💩💩" },
  { label: "Heavy", value: "heavy", description: "Full season, heavily neglected.", icon: "💩💩💩" },
] as const;

type Area = "Front Yard" | "Back Yard" | "Side Yard" | "Patio/Driveway";
const areas: Area[] = ["Front Yard", "Back Yard", "Side Yard", "Patio/Driveway"];

const ServiceSelection: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();
  useBookingDefaults();
  const [dogCount, setDogCount] = useState(bookingData.dogCount || 1);

  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof serviceSelectionSchema>>({
    resolver: zodResolver(serviceSelectionSchema),
    defaultValues: {
      ...bookingData,
      areas: (bookingData.areas?.filter(
        (a): a is Area => areas.includes(a as Area)
      ) ?? []) as ("Front Yard" | "Back Yard" | "Side Yard" | "Patio/Driveway")[],
      addOns: (bookingData.addOns?.filter(
        (a): a is "enzymeCleaner" => a === "enzymeCleaner"
      ) ?? []) as ("enzymeCleaner")[],
    },
    mode: "onChange",
  });

  const watched = watch() as z.infer<typeof serviceSelectionSchema> & { referralCode?: string };

  useEffect(() => {
    updateBooking({ ...watched, dogCount });
  }, [watched, dogCount, updateBooking]);

  const toggleArea = (area: Area) => {
    const updated = watched.areas?.includes(area)
      ? watched.areas.filter((a) => a !== area)
      : [...(watched.areas || []), area];
    setValue("areas", updated as Area[]);
    trigger("areas");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      {bookingData.referralCode?.trim() && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm text-center">
          🎉 You’re saving $10 with referral code <strong>{watched.referralCode}</strong>!
        </div>
      )}

      <fieldset>
        <legend className="text-2xl font-bold text-center">How often should we scoop?</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {frequencies.map((freq) => {
            const isSelected = watched.frequency === freq.value;
            return (
              <button
                type="button"
                key={freq.value}
                onClick={() => setValue("frequency", freq.value as Frequency)}
                aria-pressed={isSelected}
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
        {errors.frequency && <p className="text-sm text-red-600 mt-2">{errors.frequency.message}</p>}
      </fieldset>

      {watched.frequency === "onetime" && (
        <fieldset>
          <legend className="text-lg font-semibold mb-2">What’s the poop situation?</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wasteLevels.map((level) => (
              <button
                type="button"
                key={level.value}
                onClick={() => setValue("wasteLevel", level.value as WasteLevel)}
                aria-pressed={watched.wasteLevel === level.value}
                className={`p-4 rounded-lg shadow-sm border transition text-left bg-mist ${
                  watched.wasteLevel === level.value
                    ? "ring-2 ring-green-500 border-green-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="text-lg font-semibold">
                  {level.icon} {level.label}
                </div>
                <p className="text-sm text-gray-600 mt-1">{level.description}</p>
              </button>
            ))}
          </div>
          {errors.wasteLevel && <p className="text-sm text-red-600 mt-2">{errors.wasteLevel.message}</p>}
        </fieldset>
      )}

      <fieldset className="bg-mist border border-accent px-4 py-4 rounded-xl">
        <legend className="text-lg font-semibold mb-2">🐕‍🦺 How many dogs?</legend>
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            onClick={() => setDogCount(Math.max(dogCount - 1, 1))}
            className="bg-gray-200 hover:ring-2 hover:ring-green-400 w-10 h-10 rounded-full text-lg"
          >
            -
          </button>
          <span className="text-xl font-semibold">{dogCount}</span>
          <button
            type="button"
            onClick={() => setDogCount(Math.min(dogCount + 1, 6))}
            disabled={dogCount === 6}
            className="bg-gray-200 w-10 h-10 rounded-full text-lg hover:ring-2 hover:ring-green-400"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center mt-1">Used to calculate your price.</p>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold mb-2">🏡 What parts of the yard?</legend>
        <div className="flex flex-wrap gap-3 justify-center">
          {areas.map((area) => (
            <button
              type="button"
              key={area}
              onClick={() => toggleArea(area)}
              className={`px-4 py-2 border rounded-full transition ${
                watched.areas?.includes(area as "Front Yard" | "Back Yard" | "Side Yard" | "Patio/Driveway")
                  ? "bg-mist border-green-500"
                  : "hover:bg-gray-100"
              }`}
              aria-pressed={watched.areas?.includes(area as "Front Yard" | "Back Yard" | "Side Yard" | "Patio/Driveway")}
            >
              {area}
            </button>
          ))}
        </div>
        {errors.areas && <p className="text-sm text-red-600 text-center mt-2">{errors.areas.message}</p>}
      </fieldset>

      <fieldset className="pt-4">
        <legend className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
          <span role="img" aria-label="sparkles">🧬</span> Deep Clean Add-On
        </legend>
        <button
          type="button"
          onClick={() => {
            const checked = watched.addOns?.includes("enzymeCleaner");
            const updated = checked ? [] : ["enzymeCleaner"];
            setValue("addOns", updated as ("enzymeCleaner")[]);
          }}
          className={`w-full text-left bg-mist rounded-xl p-4 shadow-sm transition flex items-start gap-4 cursor-pointer ${
            watched.addOns?.includes("enzymeCleaner")
              ? "ring-2 ring-green-500 border-green-500 bg-white"
              : "border border-gray-300 hover:border-accent/60 hover:ring-1 hover:ring-accent/30 hover:bg-white"
          }`}
          aria-pressed={watched.addOns?.includes("enzymeCleaner")}
        >
          <div className="pt-[2px] text-lg">🧬</div>
          <div>
            <div className="font-semibold text-md">
              Add Enzyme Cleaner <span className="text-sm font-normal text-muted">(+\$18)</span>
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

export default ServiceSelection;
