// src/features/booking/components/steps/ReviewStep.tsx
import React from "react";
import { useBookingContext } from "@booking/context/BookingContext";
import { calculatePricing, Frequency, WasteLevel } from "@booking/utils/pricingLogic";
import { useBookAppointment } from "@booking/hooks/useBookAppointment";
import { fullBookingSchema } from "@utils/validation";

const ReviewStep: React.FC = () => {
  const { bookingData } = useBookingContext();
  const { mutate, status, isSuccess, isError, error } = useBookAppointment();
  const isLoading = status === "pending";

  if (!bookingData.frequency || !bookingData.dogCount) {
    return <div className="text-center text-gray-600">Missing required booking data.</div>;
  }

  const pricing = calculatePricing({
    frequency: bookingData.frequency as Frequency,
    dogCount: bookingData.dogCount,
    wasteLevel: bookingData.wasteLevel as WasteLevel,
    addOns: bookingData.addOns,
    referralCode: bookingData.referralCode,
  });

  const handleConfirm = () => {
    try {
      fullBookingSchema.parse(bookingData);
      mutate({
        ...bookingData,
        frequency: bookingData.frequency!,
        dogCount: bookingData.dogCount!,
        total: pricing.finalPricePerVisit,
      });
    } catch (e) {
      console.error("Final validation failed:", e);
      alert("Please double-check your form — some required fields are missing or invalid.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-tidy-green">Review Your Booking</h2>

      <div className="space-y-2">
        <div><strong>Service:</strong> Pet Waste Cleanup</div>
        <div><strong>Frequency:</strong> {bookingData.frequency}</div>
        {bookingData.frequency === "onetime" && (
          <div><strong>Waste Level:</strong> {bookingData.wasteLevel}</div>
        )}
        <div><strong>Dog Count:</strong> {bookingData.dogCount}</div>
        {bookingData.areas && bookingData.areas.length > 0 && (
          <div><strong>Yard Areas:</strong> {bookingData.areas.join(", ")}</div>
        )}
        {bookingData.addOns?.includes("enzymeCleaner") && (
          <div><strong>Add-On:</strong> Enzyme Cleaner (+$18)</div>
        )}
        {bookingData.referralCode && (
          <div><strong>Referral Discount:</strong> -$10</div>
        )}
        <div><strong>First Cleanup Date:</strong> {bookingData.firstServiceDate}</div>
      </div>

      <div className="border-t pt-4 mt-6 space-y-2 text-lg">
        <div><strong>Base Price/Visit:</strong> ${pricing.basePricePerVisit.toFixed(2)}</div>
        {pricing.dogSurcharge > 0 && <div><strong>Dog Surcharge:</strong> +${pricing.dogSurcharge}</div>}
        {pricing.wasteSurcharge > 0 && <div><strong>Waste Surcharge:</strong> +${pricing.wasteSurcharge}</div>}
        {pricing.addOnTotal > 0 && <div><strong>Add-On:</strong> +${pricing.addOnTotal}</div>}
        {pricing.referralDiscount > 0 && <div><strong>Referral Discount:</strong> -${pricing.referralDiscount}</div>}

        <div className="font-bold text-xl mt-2">
          Total Per Visit: ${pricing.finalPricePerVisit.toFixed(2)}
        </div>

        {pricing.estimatedMonthlyTotal && (
          <div className="text-sm text-gray-600">Est. Monthly Total: ${pricing.estimatedMonthlyTotal.toFixed(2)}</div>
        )}
      </div>

      <div className="pt-6">
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-tidy-green hover:bg-green-800 text-white font-semibold py-3 px-6 rounded disabled:opacity-50"
        >
          {isLoading ? "Booking..." : "Confirm & Book"}
        </button>

        {isSuccess && (
          <p className="text-green-700 text-center mt-4">🎉 Booking confirmed! Check your email for details.</p>
        )}
        {isError && (
          <p className="text-red-600 text-center mt-4">Error: {(error as Error)?.message || "Something went wrong."}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;
