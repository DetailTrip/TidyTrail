// src/features/booking/components/BookingSummary.tsx

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

  const isRecurring = ["weekly", "biweekly", "twice"].includes(booking.frequency);
  const visitsPerMonth = booking.frequency === "weekly" ? 4 : booking.frequency === "biweekly" ? 2 : booking.frequency === "twice" ? 8 : 1;
  const discountedPricePerVisit = booking.prepaySelected ? pricing.finalPricePerVisit * 0.9 : pricing.finalPricePerVisit;
  const enzymeAddOn = pricing.oneTimeAddOnsTotal ?? 0;

  const monthlyTotal = visitsPerMonth * discountedPricePerVisit;
  const regular3mo = visitsPerMonth * pricing.finalPricePerVisit * 3;
  const savings = regular3mo - monthlyTotal * 3;

  const totalDueToday = isRecurring
    ? booking.prepaySelected
      ? monthlyTotal * 3
      : monthlyTotal
    : pricing.finalPricePerVisit + enzymeAddOn;

  const referralDiscount = booking.referralCode?.trim() ? 10 : 0;
  const finalTotalDueNow = totalDueToday - referralDiscount;

  const dateObj = new Date(`${booking.firstServiceDate}T00:00:00`);
  const friendlyDate = dateObj.toLocaleDateString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { data: weekendInfo, isLoading: avLoading } = useAvailability(booking.firstServiceDate);
  const isWeekend = [0, 6].includes(dateObj.getDay());

  return (
    <>
      {/* Service Info */}
      <section className="space-y-2 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold inline-flex items-center gap-2">🐶 <span>Service Info</span></h3>
          {goToStep && (
            <button type="button" onClick={() => goToStep(0)} className="text-sm text-blue-600 hover:underline">Edit</button>
          )}
        </div>
        <div><strong>Frequency:</strong> {booking.frequency}</div>
        {booking.frequency === "onetime" && <div><strong>Waste Level:</strong> {booking.wasteLevel}</div>}
        <div><strong>Dog Count:</strong> {booking.dogCount}</div>
        <div><strong>Yard Areas:</strong> {Array.isArray(booking.areas) && booking.areas.length > 0 ? booking.areas.join(", ") : "None selected"}</div>
        {booking.addOns?.includes("enzymeCleaner") && (
          <div className="text-sm bg-mist border border-accent px-3 py-2 rounded">
            🧼 <strong>Enzyme Cleaner:</strong> one-time deep clean for stubborn odors (+$18)
          </div>
        )}
        <div>
          <strong>First Cleanup Date:</strong> <span className="text-secondary font-semibold">{friendlyDate}</span>
          {isWeekend && <span className="ml-2 text-xs text-muted">(weekend)</span>}
        </div>
        {avLoading ? (
          <div className="animate-pulse h-4 w-32 bg-gray-200 rounded" aria-hidden="true" />
        ) : weekendInfo ? (
          <div className="text-sm text-gray-600" aria-live="polite">{weekendInfo.spotsLeft} {weekendInfo.spotsLeft === 1 ? "slot" : "slots"} left this weekend</div>
        ) : null}
      </section>

      {/* Contact Info */}
      <section className="space-y-2 pt-6 border-t border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold inline-flex items-center gap-2">👤 <span>Contact Info</span></h3>
          {goToStep && (
            <button type="button" onClick={() => goToStep(2)} className="text-sm text-blue-600 hover:underline">Edit</button>
          )}
        </div>
        <div><strong>Name:</strong> {booking.firstName} {booking.lastName}</div>
        <div><strong>Email:</strong> {booking.email}</div>
        <div><strong>Phone:</strong> {booking.phone}</div>
        <div>
          <strong>Address:</strong> {booking.address}
          {booking.unit ? `, Apt ${booking.unit}` : ""}
          {booking.city ? `, ${booking.city}` : ""}
        </div>
        {booking.specialInstructions && <div><strong>Notes:</strong> {booking.specialInstructions}</div>}
      </section>

      {/* Pricing Summary */}
      <section className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-base font-semibold inline-flex items-center gap-2">💰 <span>Pricing Summary</span></h3>
        <div className="bg-mist border border-border rounded-xl p-4">
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
              {booking.prepaySelected && isPrepayEligible && isRecurring && (
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

          {isRecurring && (
            <div className="text-sm text-gray-600 mt-3">
              Est. Monthly Total: ${monthlyTotal.toFixed(2)}<br />
              <em className="text-xs text-gray-500">
                *Referral discount applies once — on your one-time cleanup or first monthly payment.
              </em>
            </div>
          )}
        </div>

        {booking.prepaySelected && isPrepayEligible && isRecurring && (
          <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-1">
            <div className="flex justify-between">
              <span>3-Month Regular Price</span>
              <span>${regular3mo.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold">
              <span>10% Prepay Discount</span>
              <span>– ${savings.toFixed(2)}</span>
            </div>
            {booking.referralCode?.trim() && (
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Referral Discount</span>
                <span>– $10.00</span>
              </div>
            )}
            {enzymeAddOn > 0 && (
              <div className="flex justify-between">
                <span>Enzyme Cleaner (one-time)</span>
                <span>${enzymeAddOn.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg text-primary border-t pt-2">
              <span>Total Due Today</span>
              <span>${finalTotalDueNow.toFixed(2)}</span>
            </div>
            {booking.referralCode?.trim() ? (
              <div className="text-xs text-muted text-center pt-1">
                Includes 3-month prepay & referral savings
              </div>
            ) : (
              <div className="text-xs text-muted text-center pt-1">
                Includes 3-month prepay
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default BookingSummary;
