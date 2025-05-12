import React from "react";
import {
  calculatePricing,
  getFinalTotal,
  Frequency,
  WasteLevel,
} from "@booking/utils/pricingLogic";
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
  const visitsPerMonth =
    booking.frequency === "weekly" ? 4 :
    booking.frequency === "biweekly" ? 2 :
    booking.frequency === "twice" ? 8 : 1;

  const enzymeAddOn = pricing.oneTimeAddOnsTotal ?? 0;
  const fullPricePerVisit = pricing.finalPricePerVisit;
  const fullFirstMonth = fullPricePerVisit * visitsPerMonth;
  const discountedPricePerVisit = booking.prepaySelected ? fullPricePerVisit * 0.9 : fullPricePerVisit;

  const regular3mo = fullPricePerVisit * visitsPerMonth * 3;
  const prepayDiscountAmount = booking.prepaySelected ? (regular3mo * 0.1) : 0;
  const referralDiscount = booking.referralCode?.trim() ? 10 : 0;

  const finalTotalDueToday = getFinalTotal({
    frequency: booking.frequency,
    dogCount: booking.dogCount,
    wasteLevel: booking.wasteLevel,
    addOns: booking.addOns,
    referralCode: booking.referralCode,
    prepaySelected: booking.prepaySelected,
  });

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
      <section className="space-y-2 pt-6 border-t border-border animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold inline-flex items-center gap-2">🐶 <span>Service Info</span></h3>
          {goToStep && (
            <button type="button" onClick={() => goToStep(0)} className="text-sm text-blue-600 hover:underline" aria-label="Edit Service Info">
              Edit
            </button>
          )}
        </div>
        <div><strong>Frequency:</strong> {booking.frequency}</div>
        {booking.frequency === "onetime" && <div><strong>Waste Level:</strong> {booking.wasteLevel}</div>}
        <div><strong>Dog Count:</strong> {booking.dogCount}</div>
        <div><strong>Yard Areas:</strong> {booking.areas?.join(", ") || "None selected"}</div>
        {booking.addOns?.includes("enzymeCleaner") && (
          <div className="text-sm bg-mist border border-accent px-3 py-2 rounded">
            🧼 <strong>Enzyme Cleaner:</strong> one-time deep clean (+$18)
          </div>
        )}
        <div>
          <strong>First Cleanup Date:</strong> <span className="text-secondary font-semibold">{friendlyDate}</span>
          {isWeekend && <span className="ml-2 text-xs text-muted">(weekend)</span>}
        </div>
        {avLoading ? (
          <div className="animate-pulse h-4 w-32 bg-gray-200 rounded" aria-hidden="true" />
        ) : weekendInfo ? (
          <div className="text-sm text-muted" aria-live="polite">
            {weekendInfo.spotsLeft} {weekendInfo.spotsLeft === 1 ? "slot" : "slots"} left this weekend
          </div>
        ) : null}
      </section>

      {/* Contact Info */}
      <section className="space-y-2 pt-6 border-t border-border animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold inline-flex items-center gap-2">👤 <span>Contact Info</span></h3>
          {goToStep && (
            <button type="button" onClick={() => goToStep(2)} className="text-sm text-blue-600 hover:underline" aria-label="Edit Contact Info">
              Edit
            </button>
          )}
        </div>
        <div><strong>Name:</strong> {booking.firstName} {booking.lastName}</div>
        <div><strong>Email:</strong> {booking.email}</div>
        <div><strong>Phone:</strong> {booking.phone}</div>
        <div><strong>Address:</strong> {booking.address}{booking.unit && `, Apt ${booking.unit}`}{booking.city && `, ${booking.city}`}</div>
        {booking.specialInstructions && <div><strong>Notes:</strong> {booking.specialInstructions}</div>}
      </section>

      {/* Pricing Summary */}
      <section className="space-y-4 pt-6 border-t border-border animate-fade-in">
        <h3 className="text-base font-semibold inline-flex items-center gap-2">💰 <span>Pricing Summary</span></h3>
        <div className="bg-mist border border-border rounded-xl p-4 space-y-4">
          <div className="text-sm">
            <div className="flex justify-between"><span>Base Price/Visit</span><span>${pricing.basePricePerVisit.toFixed(2)}</span></div>
            {pricing.dogSurcharge > 0 && (
              <div className="flex justify-between"><span>Dog Surcharge</span><span>+${pricing.dogSurcharge.toFixed(2)}</span></div>
            )}
            {pricing.wasteSurcharge > 0 && (
              <div className="flex justify-between"><span>Waste Surcharge</span><span>+${pricing.wasteSurcharge.toFixed(2)}</span></div>
            )}
            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>{isRecurring ? "First Month Total (before discounts)" : "One-Time Total"}</span>
              <span>${fullFirstMonth.toFixed(2)}</span>
            </div>
          </div>

          {enzymeAddOn > 0 && (
            <div className="text-sm border-t pt-3">
              <div className="flex justify-between">
                <span>🧼 Enzyme Cleaner <span className="text-xs text-muted">(first visit only)</span></span>
                <span>+${enzymeAddOn.toFixed(2)}</span>
              </div>
            </div>
          )}

          {!(
            booking.prepaySelected &&
            isPrepayEligible &&
            isRecurring
          ) && (
            <div>
              <div className="border-t pt-4 text-lg font-bold flex justify-between text-primary">
                <span>Total Due Today</span>
                <span>${finalTotalDueToday.toFixed(2)}</span>
              </div>
              <div className="text-xs text-muted text-center">
                {isRecurring
                  ? "Includes first month + any one-time add-ons"
                  : "Includes full one-time service + any add-ons"}
                {booking.referralCode?.trim() && ", plus referral discount"}
              </div>
            </div>
          )}
        </div>

        {/* Prepay Breakdown */}
        {booking.prepaySelected && isPrepayEligible && isRecurring && (
          <div className="mt-4 border-t pt-4 text-sm text-gray-800 space-y-1 animate-fade-in">
            <div className="flex justify-between">
              <span>3-Month Regular Price</span>
              <span>${regular3mo.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Per-Visit Discount (10%)</span>
              <span>– ${(pricing.finalPricePerVisit * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold">
              <span>3-Month Prepay Savings</span>
              <span>– ${prepayDiscountAmount.toFixed(2)}</span>
            </div>
            {booking.referralCode?.trim() && (
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Referral Discount</span>
                <span>– $10.00</span>
              </div>
            )}
            {enzymeAddOn > 0 && (
              <div className="flex justify-between">
                <span>Enzyme Cleaner (first visit only)</span>
                <span>${enzymeAddOn.toFixed(2)}</span>
              </div>
            )}
            <div className="text-green-700 text-center font-semibold pt-2">
              You saved ${(prepayDiscountAmount + referralDiscount).toFixed(2)} today!
            </div>
            <div className="flex justify-between font-bold text-lg text-primary border-t pt-2">
              <span>Total Due Today</span>
              <span>${finalTotalDueToday.toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted text-center pt-1">
              Includes 3-month prepay at ${discountedPricePerVisit.toFixed(2)}/visit
              {booking.referralCode?.trim() && " & referral savings"}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default BookingSummary;
