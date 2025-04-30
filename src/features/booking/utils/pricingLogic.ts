// src/features/booking/utils/pricingLogic.ts

export type Frequency = "weekly" | "biweekly" | "twice" | "onetime";
export type WasteLevel = "light" | "moderate" | "heavy";

export interface PricingInput {
  frequency: Frequency;
  dogCount: number;
  wasteLevel?: WasteLevel;
  addOns?: string[]; // e.g. ["enzymeCleaner"]
  referralCode?: string;
}

export interface PriceBreakdown {
  basePricePerVisit: number;
  dogSurcharge: number;
  wasteSurcharge: number;
  addOnTotal: number;
  referralDiscount: number;
  finalPricePerVisit: number;
  estimatedMonthlyTotal?: number;
}

export const calculatePricing = ({
  frequency,
  dogCount,
  wasteLevel,
  addOns = [],
  referralCode,
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
      visitsPerMonth = 1; // just for consistent math
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

  const addOnTotal = addOns.includes("enzymeCleaner") ? 18 : 0;
  const referralDiscount = referralCode ? 10 : 0;

  const finalPricePerVisit =
    basePricePerVisit + dogSurcharge + wasteSurcharge + addOnTotal - referralDiscount;

  const estimatedMonthlyTotal =
    frequency !== "onetime" ? finalPricePerVisit * visitsPerMonth : undefined;

  return {
    basePricePerVisit,
    dogSurcharge,
    wasteSurcharge,
    addOnTotal,
    referralDiscount,
    finalPricePerVisit,
    estimatedMonthlyTotal,
  };
};
