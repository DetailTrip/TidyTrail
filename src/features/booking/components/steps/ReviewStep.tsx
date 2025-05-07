// src/features/booking/components/steps/ReviewStep.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "@booking/context/BookingContext";
import { calculatePricing, Frequency, WasteLevel } from "@booking/utils/pricingLogic";
import { useBookAppointment } from "@booking/hooks/useBookAppointment";
import { fullBookingSchema } from "@utils/validation";
import { useAvailability } from "@booking/hooks/useAvailability";
import { transformBookingData } from "@booking/utils/transformBookingData";
import { Info } from "lucide-react";

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

  if (!bookingData.frequency || !bookingData.dogCount || !bookingData.firstServiceDate) {
    return <div className="text-center text-gray-600">Missing required booking data.</div>;
  }

  const pricing = calculatePricing({
    frequency: bookingData.frequency as Frequency,
    dogCount: bookingData.dogCount,
    wasteLevel: bookingData.wasteLevel as WasteLevel,
    addOns: bookingData.addOns,
    referralCode: bookingData.referralCode,
    prepaySelected: bookingData.prepaySelected,
  });

  const visitsPerMonth = bookingData.frequency === "weekly"
    ? 4
    : bookingData.frequency === "biweekly"
    ? 2
    : bookingData.frequency === "twice"
    ? 8
    : 1;

  const discountedPricePerVisit = bookingData.prepaySelected
    ? pricing.finalPricePerVisit * 0.9
    : pricing.finalPricePerVisit;

  const monthlyTotal = visitsPerMonth * discountedPricePerVisit;
  const enzymeAddOn = pricing.oneTimeAddOnsTotal ?? 0;

  const totalDueToday = (bookingData.prepaySelected ? monthlyTotal * 3 : monthlyTotal) + enzymeAddOn;
  const regular3mo = visitsPerMonth * pricing.finalPricePerVisit * 3;
  const savings = regular3mo - (bookingData.prepaySelected ? monthlyTotal * 3 : monthlyTotal);
  const referralDiscount = bookingData.referralCode ? 10 : 0;
  const finalTotalDueNow = totalDueToday - referralDiscount;

  const dateObj = new Date(`${bookingData.firstServiceDate}T00:00:00`);
  const friendlyDate = dateObj.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { data: weekendInfo, isLoading: avLoading } = useAvailability(bookingData.firstServiceDate);

  const handleConfirm = () => {
    try {
      fullBookingSchema.parse(bookingData);
      const payload = transformBookingData(bookingData, finalTotalDueNow);
      mutate(payload);
    } catch (e) {
      console.error("Final validation failed:", e);
      alert("Please double-check your form — some required fields are missing or invalid.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-tidy-green">Review Your Booking</h2>

      {/* Service Info */}
      <div className="bg-gray-50 border rounded p-4 space-y-2 mt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Service Info</h3>
          <button type="button" onClick={() => goToStep?.(0)} className="text-sm text-blue-600 hover:underline">Edit</button>
        </div>
        <div><strong>Service:</strong> Pet Waste Cleanup</div>
        <div><strong>Frequency:</strong> {bookingData.frequency}</div>
        {bookingData.frequency === "onetime" && <div><strong>Waste Level:</strong> {bookingData.wasteLevel}</div>}
        <div><strong>Dog Count:</strong> {bookingData.dogCount}</div>
        <div><strong>Yard Areas:</strong> {Array.isArray(bookingData.areas) && bookingData.areas.length > 0 ? bookingData.areas.join(", ") : "None selected"}</div>
        {bookingData.addOns?.includes("enzymeCleaner") && <div><strong>Add-On:</strong> Enzyme Cleaner (+$18)</div>}
        <div><strong>First Cleanup Date:</strong> <span className="text-tidy-blue">{friendlyDate}</span></div>
        {avLoading ? <div className="text-sm text-gray-500">Checking weekend slots…</div> : weekendInfo && <div className="text-sm text-gray-600">{weekendInfo.spotsLeft} {weekendInfo.spotsLeft === 1 ? "slot" : "slots"} left this weekend</div>}
      </div>

      {/* Prepay Teaser */}
      {(bookingData.frequency === "weekly" || bookingData.frequency === "biweekly" || bookingData.frequency === "twice") && (
        <div className="bg-yellow-50 border border-yellow-300 rounded p-4 text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bookingData.prepaySelected || false}
              onChange={(e) => updateBooking({ prepaySelected: e.target.checked })}
              className="mt-1"
            />
            <span>
              <strong>Save 10% when you prepay 3 months.</strong><br />
              Pay upfront and cancel anytime. Discount will be applied immediately.
            </span>
          </label>
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-gray-50 border rounded p-4 space-y-2 mt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Contact Details</h3>
          <button type="button" onClick={() => goToStep?.(2)} className="text-sm text-blue-600 hover:underline">Edit</button>
        </div>
        <div><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</div>
        <div><strong>Email:</strong> {bookingData.email}</div>
        <div><strong>Phone:</strong> {bookingData.phone}</div>
        <p className="text-xs text-gray-500 mt-1">We’ll never share your info. Used only for booking & reminders.</p>
        <div>
          <strong>Address:</strong> {bookingData.address}
          {bookingData.unit ? `, Apt ${bookingData.unit}` : ""}
          {bookingData.city ? `, ${bookingData.city}` : ""}
        </div>
        {bookingData.specialInstructions && <div><strong>Notes:</strong> {bookingData.specialInstructions}</div>}
      </div>

      {/* Pricing Summary */}
      <div className="bg-gray-50 border rounded p-4 mt-6">
        <h3 className="font-semibold mb-2">Pricing Summary</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-t border-gray-200 py-2">
              <td>Base Price/Visit</td>
              <td className="text-right">${pricing.basePricePerVisit.toFixed(2)}</td>
            </tr>
            {pricing.dogSurcharge > 0 && (
              <tr className="border-t border-gray-200 py-2">
                <td>Dog Surcharge</td>
                <td className="text-right">+${pricing.dogSurcharge.toFixed(2)}</td>
              </tr>
            )}
            {bookingData.prepaySelected && (
              <tr className="border-t border-gray-200 py-2 bg-green-50">
                <td className="flex items-center gap-1">
                  <span>Prepay Discount (10%)</span>
                  <span title="Save instantly when you prepay 3 months — discount applied to each visit.">
                    <Info className="w-4 h-4 text-gray-400 cursor-help hover:text-tidy-blue" />
                  </span>
                </td>
                <td className="text-right text-green-700">– ${(pricing.finalPricePerVisit * 0.1).toFixed(2)}</td>
              </tr>
            )}
            <tr className="font-bold border-t text-lg bg-tidy-gold/10 ring-1 ring-tidy-gold rounded">
              <td>Total Per Visit</td>
              <td className="text-right">${discountedPricePerVisit.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {bookingData.prepaySelected && (
          <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-1">
            <div className="flex justify-between">
              <span>3-Month Regular Price</span>
              <span>${regular3mo.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold">
              <span>10% Prepay Discount</span>
              <span>– ${savings.toFixed(2)}</span>
            </div>
            {enzymeAddOn > 0 && (
              <div className="flex justify-between">
                <span>Enzyme Cleaner (one-time)</span>
                <span>${enzymeAddOn.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-tidy-green border-t pt-2">
              <span>Total Due Today (3 Months)</span>
              <span>${totalDueToday.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600 mt-3">
          Est. Monthly Total: ${monthlyTotal.toFixed(2)}<br />
          <em className="text-xs text-gray-500">*Referral discount applies once — on your one-time cleanup or your first monthly payment.</em>
        </div>

        {bookingData.referralCode && (
          <div className="text-lg text-green-700 font-semibold mt-4">
            <strong>🎉 Total Due Today (after referral):</strong> ${finalTotalDueNow.toFixed(2)}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-6 space-y-4">
        <button onClick={goBack} className="w-full border border-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-100">
          ← Back to Edit
        </button>
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-tidy-green hover:bg-green-800 text-white font-semibold py-3 px-6 rounded disabled:opacity-50 text-lg"
        >
          {isLoading ? "Booking..." : bookingData.prepaySelected ? "Book My Cleanup & Save" : "Looks Good! Book My Cleanup"}
        </button>
        {isError && (
          <p className="text-red-600 text-center mt-4">
            Error: {(error as Error)?.message || "Something went wrong."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewStep;
