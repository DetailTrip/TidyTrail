// src/features/booking/components/steps/ServiceSelection.tsx
import React, { useState } from "react";
import { useBookingContext } from "@booking/context/BookingContext";

const frequencies = [
  { label: "Weekly", value: "weekly" },
  { label: "Bi-Weekly", value: "biweekly" },
  { label: "Twice a Week", value: "twice" },
  { label: "One-Time (Spring Cleanup)", value: "onetime" },
];

const wasteLevels = [
  { label: "Light", value: "light", description: "Only a few piles, recently maintained.", color: "bg-green-100" },
  { label: "Moderate", value: "moderate", description: "Medium build-up, about 1–2 months.", color: "bg-yellow-100" },
  { label: "Heavy", value: "heavy", description: "Full season accumulation, heavily neglected.", color: "bg-red-100" },
];

const ServiceSelection: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();
  
  const [localFrequency, setLocalFrequency] = useState<string>(bookingData.frequency || "");
  const [localWaste, setLocalWaste] = useState<string>(bookingData.wasteLevel || ""); // If One-Time
  
  const [dogCount, setDogCount] = useState<number>(bookingData.dogCount || 1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(bookingData.areas || []);
  const [addEnzymeCleaner, setAddEnzymeCleaner] = useState<boolean>(bookingData.addOns?.includes("enzymeCleaner") || false);

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleContinue = () => {
    updateBooking({
      frequency: localFrequency,
      wasteLevel: localFrequency === "onetime" ? localWaste : undefined,
      dogCount,
      areas: selectedAreas,
      addOns: addEnzymeCleaner ? ["enzymeCleaner"] : [],
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Tell us about your yard!</h2>

      {/* Frequency */}
      <div className="grid grid-cols-2 gap-4">
        {frequencies.map((freq) => (
          <button
            key={freq.value}
            className={`border rounded p-4 text-center font-semibold ${
              localFrequency === freq.value ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
            }`}
            onClick={() => setLocalFrequency(freq.value)}
          >
            {freq.label}
          </button>
        ))}
      </div>

      {/* Waste Level (only if One-Time) */}
      {localFrequency === "onetime" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mt-6 text-center">How much waste?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wasteLevels.map((level) => (
              <button
                key={level.value}
                className={`p-4 rounded shadow ${level.color} ${
                  localWaste === level.value ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setLocalWaste(level.value)}
              >
                <div className="font-semibold">{level.label}</div>
                <div className="text-xs mt-1">{level.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dog Count */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mt-8 mb-2">How many dogs?</h3>
        <div className="flex justify-center items-center gap-4">
          <button
            className="bg-gray-200 w-8 h-8 rounded-full"
            onClick={() => setDogCount((prev) => Math.max(prev - 1, 0))}
          >
            -
          </button>
          <span className="text-xl">{dogCount}</span>
          <button
            className="bg-gray-200 w-8 h-8 rounded-full"
            onClick={() => setDogCount((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Areas to Clean */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mt-8 mb-2">Which areas?</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {["Front Yard", "Back Yard", "Side Yard", "Patio/Driveway"].map((area) => (
            <button
              key={area}
              className={`px-4 py-2 border rounded ${
                selectedAreas.includes(area) ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
              }`}
              onClick={() => toggleArea(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="text-center">
        <label className="flex items-center justify-center gap-2 mt-8">
          <input
            type="checkbox"
            checked={addEnzymeCleaner}
            onChange={(e) => setAddEnzymeCleaner(e.target.checked)}
            className="w-5 h-5"
          />
          Add Enzyme Cleaner (+$18)
        </label>
      </div>

      {/* Continue Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleContinue}
          disabled={!localFrequency}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
