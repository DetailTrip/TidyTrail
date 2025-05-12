// src/features/booking/components/steps/ReviewStep.tsx

/** @jsxImportSource react */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "@booking/context/BookingContext";
import {
  calculatePricing,
  Frequency,
  WasteLevel,
  getFinalTotal,
} from "@booking/utils/pricingLogic";
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
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("tidytrails-booking-draft");
      localStorage.removeItem("tidyDraft");
      navigate("/thank-you");
    }
  }, [isSuccess, navigate]);

  const handleConfirm = () => {
    try {
      fullBookingSchema.parse(bookingData);

      const finalTotalDueNow = getFinalTotal({
        frequency: bookingData.frequency as Frequency,
        dogCount: bookingData.dogCount ?? 1,
        wasteLevel: bookingData.wasteLevel as WasteLevel,
        addOns: bookingData.addOns,
        referralCode: bookingData.referralCode,
        prepaySelected: bookingData.prepaySelected,
      });

      const payload = transformBookingData(bookingData, finalTotalDueNow);
      mutate(payload);
    } catch (e) {
      console.error("Final validation failed:", e);
      setValidationError(
        "Please double-check your form — some required fields are missing or invalid."
      );
    }
  };

  const isPrepayEligible = bookingData.frequency !== "onetime";

  return (
    <div className="max-w-xl mx-auto p-6 space-y-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">🧾 Review Your Booking</h2>
        <p className="text-sm text-gray-600">Take a final look and confirm your details.</p>
      </div>

      {isPrepayEligible && (
        <section className="space-y-3 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold">💸 Save with Prepay</h3>
          <div className="bg-highlight border border-accent rounded p-4 text-sm">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bookingData.prepaySelected || false}
                onChange={(e) => updateBooking({ prepaySelected: e.target.checked })}
                className="mt-1"
              />
              <span>
                <strong>Save 10% when you prepay 3 months.</strong>
                <br />
                Pay upfront and cancel anytime. Discount applies immediately.
              </span>
            </label>
          </div>
        </section>
      )}

      <section className="space-y-3 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold">📋 Summary</h3>
        <BookingSummary
          booking={bookingData}
          goToStep={goToStep}
          isPrepayEligible={isPrepayEligible}
        />
      </section>

      <section className="space-y-4 pt-6 border-t border-border">
        <p className="text-center text-sm text-gray-500">
          ✅ Everything look good? Let’s get your yard poop-free!
        </p>

        {validationError && (
          <div
            className="text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded px-4 py-2"
            aria-live="polite"
          >
            ❗ {validationError}
          </div>
        )}

        <button
          onClick={goBack}
          className="w-full border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-100"
        >
          ← Back to Edit
        </button>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-primary hover:bg-green-800 text-white font-semibold py-3 px-6 rounded disabled:opacity-50 text-lg"
        >
          {isLoading
            ? "Booking..."
            : bookingData.prepaySelected
            ? "🚀 Book Now & Save 10%"
            : "✅ Confirm My Cleanup"}
        </button>
        {isError && (
          <p className="text-red-600 text-center mt-4" aria-live="polite">
            Error: {(error as Error)?.message || "Something went wrong."}
          </p>
        )}
      </section>
    </div>
  );
};

export default ReviewStep;
