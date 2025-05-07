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

export const calculatePricing = ({
  frequency,
  dogCount,
  wasteLevel,
  addOns = [],
  prepaySelected,
}: PricingInput): PriceBreakdown => {
  let basePricePerVisit = 0;
  let visitsPerMonth = 0;

  switch (frequency) {
    case "weekly":
      basePricePerVisit = 24;
      visitsPerMonth = 4;
      break;
    case "biweekly":
      basePricePerVisit = 45;
      visitsPerMonth = 2;
      break;
    case "twice":
      basePricePerVisit = 20;
      visitsPerMonth = 8;
      break;
    case "onetime":
      basePricePerVisit = 90;
      visitsPerMonth = 1;
      break;
  }

  let dogSurcharge = 0;
  if (frequency !== "onetime") {
    if (dogCount === 3) dogSurcharge = 5;
    else if (dogCount === 4) dogSurcharge = 10;
    else if (dogCount >= 5) dogSurcharge = 15;
  }

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
  if (
    prepaySelected &&
    (frequency === "weekly" || frequency === "biweekly" || frequency === "twice") &&
    estimatedMonthlyTotal
  ) {
    prepayDiscountAmount = estimatedMonthlyTotal * 0.1;
    estimatedMonthlyTotal = estimatedMonthlyTotal - prepayDiscountAmount;
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
