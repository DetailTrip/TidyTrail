// Updated ReviewStep.tsx with BookingSummary extraction + prepay logic fix

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "@booking/context/BookingContext";
import { calculatePricing, Frequency, WasteLevel } from "@booking/utils/pricingLogic";
import { useBookAppointment } from "@booking/hooks/useBookAppointment";
import { fullBookingSchema } from "@utils/validation";
import { transformBookingData } from "@booking/utils/transformBookingData";
import BookingSummary from "@booking/components/BookingSummary";

interface ReviewStepProps {
  goBack: () => void;
  goToStep?: (stepIndex: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ goBack, goToStep }) => {
  const { bookingData, updateBooking } = useBookingContext();
  const { mutate, status, isSuccess, isError, error } = useBookAppointment();
  const isLoading = status === "pending";
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/thank-you");
  }, [isSuccess, navigate]);

  const handleConfirm = () => {
    try {
      fullBookingSchema.parse(bookingData);
      const pricing = calculatePricing({
        frequency: bookingData.frequency as Frequency,
        dogCount: bookingData.dogCount!,
        wasteLevel: bookingData.wasteLevel as WasteLevel,
        addOns: bookingData.addOns,
        referralCode: bookingData.referralCode,
        prepaySelected: bookingData.prepaySelected,
      });
      const visitsPerMonth = bookingData.frequency === "weekly" ? 4 : bookingData.frequency === "biweekly" ? 2 : bookingData.frequency === "twice" ? 8 : 1;
      const discountedPricePerVisit = bookingData.prepaySelected ? pricing.finalPricePerVisit * 0.9 : pricing.finalPricePerVisit;
      const enzymeAddOn = pricing.oneTimeAddOnsTotal ?? 0;
      const monthlyTotal = visitsPerMonth * discountedPricePerVisit;
      const totalDueToday = (bookingData.prepaySelected ? monthlyTotal * 3 : monthlyTotal) + enzymeAddOn;
      const referralDiscount = bookingData.referralCode ? 10 : 0;
      const finalTotalDueNow = totalDueToday - referralDiscount;
      const payload = transformBookingData(bookingData, finalTotalDueNow);
      mutate(payload);
    } catch (e) {
      console.error("Final validation failed:", e);
      alert("Please double-check your form — some required fields are missing or invalid.");
    }
  };

  const isPrepayEligible = bookingData.frequency !== "onetime";

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-primary">🧾 Review Your Booking</h2>

      {isPrepayEligible && (
        <div className="bg-highlight border border-accent rounded p-4 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bookingData.prepaySelected || false}
              onChange={(e) => updateBooking({ prepaySelected: e.target.checked })}
              className="mt-1"
            />
            <span>
              <strong>Save 10% when you prepay 3 months.</strong><br />
              Pay upfront and cancel anytime. Discount applies immediately.
            </span>
          </label>
        </div>
      )}

      <BookingSummary booking={bookingData} goToStep={goToStep} isPrepayEligible={isPrepayEligible} />

      <div className="pt-6 space-y-4">
        <p className="text-center text-sm text-gray-500">✅ Everything look good? Let’s get your yard poop-free!</p>
        <button onClick={goBack} className="w-full border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-100">
          ← Back to Edit
        </button>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-green-800 text-white font-semibold py-3 px-6 rounded disabled:opacity-50 text-lg"
        >
          {isLoading ? "Booking..." : bookingData.prepaySelected ? "🚀 Book Now & Save 10%" : "✅ Confirm My Cleanup"}
        </button>
        {isError && (
          <p className="text-red-600 text-center mt-4" aria-live="polite">
            Error: {(error as Error)?.message || "Something went wrong."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;
