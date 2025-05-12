// src/features/booking/utils/pricingLogic.ts

export type Frequency = "weekly" | "biweekly" | "twice" | "onetime";
export type WasteLevel = "light" | "moderate" | "heavy";

export interface PricingInput {
  frequency: Frequency;
  dogCount: number;
  wasteLevel?: WasteLevel;
  addOns?: string[];
  referralCode?: string;
  prepaySelected?: boolean;
}

export interface PriceBreakdown {
  basePricePerVisit: number;
  dogSurcharge: number;
  wasteSurcharge: number;
  finalPricePerVisit: number;
  estimatedMonthlyTotal?: number;
  prepayDiscountAmount?: number;
  oneTimeAddOnsTotal?: number;
}

// 🔁 Shared helper
export const getVisitsPerMonth = (frequency: Frequency): number => {
  switch (frequency) {
    case "weekly": return 4;
    case "biweekly": return 2;
    case "twice": return 8;
    default: return 1; // onetime or fallback
  }
};

export const calculatePricing = ({
  frequency,
  dogCount,
  wasteLevel,
  addOns = [],
  prepaySelected,
}: PricingInput): PriceBreakdown => {
  let basePricePerVisit = 0;
  switch (frequency) {
    case "weekly": basePricePerVisit = 24; break;
    case "biweekly": basePricePerVisit = 45; break;
    case "twice": basePricePerVisit = 20; break;
    case "onetime": basePricePerVisit = 90; break;
  }

  const visitsPerMonth = getVisitsPerMonth(frequency);

  let dogSurcharge = 0;
  if (dogCount === 3) dogSurcharge = 5;
  else if (dogCount === 4) dogSurcharge = 10;
  else if (dogCount >= 5) dogSurcharge = 15;

  let wasteSurcharge = 0;
  if (frequency === "onetime") {
    if (wasteLevel === "moderate") wasteSurcharge = 30;
    else if (wasteLevel === "heavy") wasteSurcharge = 60;
  }

  const oneTimeAddOnsTotal = addOns.includes("enzymeCleaner") ? 18 : 0;
  const finalPricePerVisit = basePricePerVisit + dogSurcharge + wasteSurcharge;

  let estimatedMonthlyTotal =
    frequency !== "onetime" ? finalPricePerVisit * visitsPerMonth : undefined;

  let prepayDiscountAmount = 0;
  if (prepaySelected && estimatedMonthlyTotal) {
    prepayDiscountAmount = estimatedMonthlyTotal * 0.1;
    estimatedMonthlyTotal -= prepayDiscountAmount;
  }

  return {
    basePricePerVisit,
    dogSurcharge,
    wasteSurcharge,
    finalPricePerVisit,
    estimatedMonthlyTotal,
    prepayDiscountAmount,
    oneTimeAddOnsTotal,
  };
};

// ✅ Unified total calculator
export const getFinalTotal = ({
  frequency,
  dogCount,
  wasteLevel,
  addOns = [],
  referralCode,
  prepaySelected,
}: PricingInput): number => {
  const pricing = calculatePricing({
    frequency,
    dogCount,
    wasteLevel,
    addOns,
    prepaySelected,
  });

  const isRecurring = frequency !== "onetime";
  const visitsPerMonth = getVisitsPerMonth(frequency);

  const discountedPricePerVisit = prepaySelected
    ? pricing.finalPricePerVisit * 0.9
    : pricing.finalPricePerVisit;

  const enzymeAddOn = pricing.oneTimeAddOnsTotal ?? 0;

  const serviceSubtotal = isRecurring
    ? (prepaySelected
        ? discountedPricePerVisit * visitsPerMonth * 3
        : discountedPricePerVisit * visitsPerMonth)
    : pricing.finalPricePerVisit;

  const totalBeforeDiscount = serviceSubtotal + enzymeAddOn;

  const referralDiscount = referralCode?.trim() ? 10 : 0;

  return totalBeforeDiscount - referralDiscount;
};
