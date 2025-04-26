import { 
  YardSize, 
  GrassHeight, 
  ServiceFrequency, 
  SpecialCondition, 
  Service 
} from '../components/calculator/context/CalculatorContext';

// Lawn mowing pricing matrix
export const lawnMowingPricing: Record<YardSize, Record<GrassHeight, Record<ServiceFrequency, number>>> = {
  'small': { // Up to 1,500 sq ft
    'short': { 'weekly': 30, 'bi-weekly': 40, 'one-time': 50, 'monthly': 50 },
    'medium': { 'weekly': 35, 'bi-weekly': 45, 'one-time': 60, 'monthly': 60 },
    'long': { 'weekly': 40, 'bi-weekly': 50, 'one-time': 70, 'monthly': 70 }
  },
  'medium': { // 1,501–3,000 sq ft
    'short': { 'weekly': 40, 'bi-weekly': 50, 'one-time': 60, 'monthly': 60 },
    'medium': { 'weekly': 45, 'bi-weekly': 55, 'one-time': 70, 'monthly': 70 },
    'long': { 'weekly': 55, 'bi-weekly': 65, 'one-time': 90, 'monthly': 90 }
  },
  'large': { // 3,001–6,000 sq ft
    'short': { 'weekly': 55, 'bi-weekly': 70, 'one-time': 80, 'monthly': 80 },
    'medium': { 'weekly': 65, 'bi-weekly': 80, 'one-time': 100, 'monthly': 100 },
    'long': { 'weekly': 75, 'bi-weekly': 90, 'one-time': 120, 'monthly': 120 }
  },
  'x-large': { // 6,001–8,000 sq ft
    'short': { 'weekly': 70, 'bi-weekly': 90, 'one-time': 100, 'monthly': 100 },
    'medium': { 'weekly': 85, 'bi-weekly': 100, 'one-time': 120, 'monthly': 120 },
    'long': { 'weekly': 100, 'bi-weekly': 120, 'one-time': 140, 'monthly': 140 }
  }
};

// Pet waste cleanup pricing
export const petWastePricing: Record<ServiceFrequency, number> = {
  'weekly': 24,
  'bi-weekly': 45,
  'one-time': 90,
  'monthly': 90
};

// Debris removal pricing
export const debrisPricing: Record<YardSize, number> = {
  'small': 40,   // Up to 1,500 sq ft
  'medium': 60,  // 1,501–3,000 sq ft
  'large': 80,   // 3,001–6,000 sq ft
  'x-large': 100 // 6,001–8,000 sq ft
};

// Other service pricing
export const servicePricing: Record<string, number> = {
  'patio-cleaning': 50,
  'deodorizing': 30,
  'spring-cleanup': 150,
  'fall-cleanup': 150
};

// Calculate base price for a service
export function calculateServicePrice(
  serviceId: string,
  yardSize: YardSize,
  grassHeight: GrassHeight,
  frequency: ServiceFrequency
): number {
  if (serviceId === 'lawn-mowing') {
    return lawnMowingPricing[yardSize][grassHeight][frequency];
  }
  
  if (serviceId === 'pet-waste') {
    return petWastePricing[frequency];
  }
  
  if (serviceId === 'spring-cleanup' || serviceId === 'fall-cleanup') {
    return servicePricing[serviceId];
  }
  
  if (serviceId === 'debris-removal') {
    return debrisPricing[yardSize];
  }
  
  return servicePricing[serviceId] || 0;
}

// Calculate frequency discount
export function calculateFrequencyDiscount(frequency: ServiceFrequency): number {
  switch (frequency) {
    case 'weekly': return 0.1;  // 10% discount
    case 'bi-weekly': return 0.05;  // 5% discount
    default: return 0;
  }
}

// Calculate bundle discount
export function calculateBundleDiscount(selectedServices: Service[]): number {
  const count = selectedServices.filter(s => s.selected).length;
  if (count >= 3) return 0.1;  // 10% discount for 3+ services
  if (count === 2) return 0.05;  // 5% discount for 2 services
  return 0;
}

// Calculate special condition surcharge
export function calculateSpecialConditionSurcharge(conditions: SpecialCondition[]): number {
  return conditions.length * 0.1;  // 10% surcharge per condition
}

// Calculate seasonal adjustment
export function calculateSeasonalAdjustment(): number {
  const month = new Date().getMonth();
  
  // April-May (3-4): Spring cleanup (+15%)
  if (month >= 3 && month <= 4) return 0.15;
  
  // October (9): Fall cleanup (+10%)
  if (month === 9) return 0.1;
  
  return 0;
}

// Calculate total price with all adjustments
export function calculateTotalPrice(
  services: Service[],
  yardSize: YardSize,
  grassHeight: GrassHeight,
  frequency: ServiceFrequency,
  specialConditions: SpecialCondition[]
): {
  basePrice: number;
  frequencyDiscount: number;
  bundleDiscount: number;
  specialConditionSurcharge: number;
  seasonalAdjustment: number;
  totalPrice: number;
} {
  const selectedServices = services.filter(s => s.selected);
  
  // Calculate base price (sum of all selected services)
  const basePrice = selectedServices.reduce((total, service) => {
    const servicePrice = calculateServicePrice(
      service.id,
      yardSize,
      grassHeight,
      service.frequency || frequency
    );
    return total + servicePrice;
  }, 0);
  
  // Calculate adjustments
  const frequencyDiscountRate = calculateFrequencyDiscount(frequency);
  const bundleDiscountRate = calculateBundleDiscount(services);
  const conditionSurchargeRate = calculateSpecialConditionSurcharge(specialConditions);
  const seasonalAdjustmentRate = calculateSeasonalAdjustment();
  
  // Apply discounts and surcharges
  const frequencyDiscountAmount = basePrice * frequencyDiscountRate;
  const afterFrequencyDiscount = basePrice - frequencyDiscountAmount;
  
  const bundleDiscountAmount = afterFrequencyDiscount * bundleDiscountRate;
  const afterBundleDiscount = afterFrequencyDiscount - bundleDiscountAmount;
  
  const totalDiscountRate = frequencyDiscountRate + bundleDiscountRate;
  const cappedDiscountRate = Math.min(totalDiscountRate, 0.2); // Cap total discount at 20%
  const actualBundleDiscountRate = cappedDiscountRate - frequencyDiscountRate;
  const actualBundleDiscountAmount = afterFrequencyDiscount * actualBundleDiscountRate;
  
  const surchargeAmount = afterBundleDiscount * conditionSurchargeRate;
  const seasonalAdjustmentAmount = afterBundleDiscount * seasonalAdjustmentRate;
  
  // Calculate final price
  const totalPrice = afterBundleDiscount + surchargeAmount + seasonalAdjustmentAmount;
  
  return {
    basePrice,
    frequencyDiscount: frequencyDiscountAmount,
    bundleDiscount: actualBundleDiscountAmount,
    specialConditionSurcharge: surchargeAmount,
    seasonalAdjustment: seasonalAdjustmentAmount,
    totalPrice
  };
}