// Updated BookingSummary.tsx to support prepay eligibility condition

import React from "react";
import { calculatePricing, Frequency, WasteLevel } from "@booking/utils/pricingLogic";
import { useAvailability } from "@booking/hooks/useAvailability";

interface Props {
  booking: any;
  goToStep?: (stepIndex: number) => void;
  isPrepayEligible?: boolean;
}

const BookingSummary: React.FC<Props> = ({ booking, goToStep, isPrepayEligible }) => {
  const pricing = calculatePricing({
    frequency: booking.frequency as Frequency,
    dogCount: booking.dogCount,
    wasteLevel: booking.wasteLevel as WasteLevel,
    addOns: booking.addOns,
    referralCode: booking.referralCode,
    prepaySelected: booking.prepaySelected,
  });

  const visitsPerMonth = booking.frequency === "weekly" ? 4 : booking.frequency === "biweekly" ? 2 : booking.frequency === "twice" ? 8 : 1;
  const discountedPricePerVisit = booking.prepaySelected ? pricing.finalPricePerVisit * 0.9 : pricing.finalPricePerVisit;
  const enzymeAddOn = pricing.oneTimeAddOnsTotal ?? 0;
  const monthlyTotal = visitsPerMonth * discountedPricePerVisit;
  const totalDueToday = (booking.prepaySelected ? monthlyTotal * 3 : monthlyTotal) + enzymeAddOn;
  const regular3mo = visitsPerMonth * pricing.finalPricePerVisit * 3;
  const savings = regular3mo - (booking.prepaySelected ? monthlyTotal * 3 : monthlyTotal);
  const referralDiscount = booking.referralCode ? 10 : 0;
  const finalTotalDueNow = totalDueToday - referralDiscount;

  const dateObj = new Date(`${booking.firstServiceDate}T00:00:00`);
  const friendlyDate = dateObj.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { data: weekendInfo, isLoading: avLoading } = useAvailability(booking.firstServiceDate);

  return (
    <>
      {/* Service Info */}
      <section className="bg-mist border border-border rounded-xl p-5 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">🐶 Service Info</h3>
          {goToStep && (
            <button type="button" onClick={() => goToStep(0)} className="text-sm text-blue-600 hover:underline">Edit</button>
          )}
        </div>
        <div><strong>Service:</strong> Pet Waste Cleanup</div>
        <div><strong>Frequency:</strong> {booking.frequency}</div>
        {booking.frequency === "onetime" && <div><strong>Waste Level:</strong> {booking.wasteLevel}</div>}
        <div><strong>Dog Count:</strong> {booking.dogCount}</div>
        <div><strong>Yard Areas:</strong> {Array.isArray(booking.areas) && booking.areas.length > 0 ? booking.areas.join(", ") : "None selected"}</div>
        {booking.addOns?.includes("enzymeCleaner") && (
          <div className="text-sm bg-mist border border-accent px-3 py-2 rounded">
            🧼 <strong>Enzyme Cleaner:</strong> one-time deep clean for stubborn odors (+$18)
          </div>
        )}
        <div><strong>First Cleanup Date:</strong> <span className="text-secondary font-semibold">{friendlyDate}</span></div>
        {avLoading ? (
          <div className="text-sm text-gray-500" aria-live="polite">Checking weekend slots…</div>
        ) : weekendInfo ? (
          <div className="text-sm text-gray-600" aria-live="polite">{weekendInfo.spotsLeft} {weekendInfo.spotsLeft === 1 ? "slot" : "slots"} left this weekend</div>
        ) : null}
      </section>

      {/* Contact Info */}
      <section className="bg-mist border border-border rounded-xl p-5 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">👤 Contact Info</h3>
          {goToStep && (
            <button type="button" onClick={() => goToStep(2)} className="text-sm text-blue-600 hover:underline">Edit</button>
          )}
        </div>
        <div><strong>Name:</strong> {booking.firstName} {booking.lastName}</div>
        <div><strong>Email:</strong> {booking.email}</div>
        <div><strong>Phone:</strong> {booking.phone}</div>
        <p className="text-xs text-gray-500 mt-1">We’ll never share your info. Only used for bookings & reminders.</p>
        <div>
          <strong>Address:</strong> {booking.address}
          {booking.unit ? `, Apt ${booking.unit}` : ""}
          {booking.city ? `, ${booking.city}` : ""}
        </div>
        {booking.specialInstructions && <div><strong>Notes:</strong> {booking.specialInstructions}</div>}
      </section>

      {/* Pricing Summary */}
      <section className="bg-mist border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-2">💰 Pricing Summary</h3>
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
            {booking.prepaySelected && isPrepayEligible && (
              <tr className="border-t border-gray-200 py-2 bg-green-50">
                <td>Prepay Discount (10%)</td>
                <td className="text-right text-green-700">– ${(pricing.finalPricePerVisit * 0.1).toFixed(2)}</td>
              </tr>
            )}
            <tr className="font-bold border-t text-lg bg-highlight ring-1 ring-accent">
              <td>Total Per Visit</td>
              <td className="text-right">${discountedPricePerVisit.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {booking.prepaySelected && isPrepayEligible && (
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
            <div className="flex justify-between font-bold text-lg text-primary border-t pt-2">
              <span>Total Due Today (3 Months)</span>
              <span>${totalDueToday.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600 mt-3">
          Est. Monthly Total: ${monthlyTotal.toFixed(2)}<br />
          <em className="text-xs text-gray-500">*Referral discount applies once — on your one-time cleanup or first monthly payment.</em>
        </div>

        {booking.referralCode && (
          <div className="text-lg text-green-700 font-semibold mt-4">
            🎉 <strong>Total Due Today (after referral):</strong> ${finalTotalDueNow.toFixed(2)}
          </div>
        )}
      </section>
    </>
  );
};

export default BookingSummary;