// src/utils/validation.ts

import { z } from "zod";

// Step 1: ServiceSelection (frequency, dog count, waste level if onetime)
export const serviceSelectionSchema = z.object({
  frequency: z.enum(["weekly", "biweekly", "twice", "onetime"]),
  dogCount: z.number().min(1).max(6),
  wasteLevel: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  areas: z.array(z.string()).optional(),
});

// Step 2: CalendarPicker
export const calendarSchema = z.object({
  firstServiceDate: z.string().refine(
    (date) => {
      const selected = new Date(date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return selected >= tomorrow;
    },
    { message: "Date must be at least 1 day from today" }
  ),
});

// Step 3: CustomerForm
export const customerInfoSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().min(5),
  referralCode: z.string().optional(),
});

// Combined for final submission
export const fullBookingSchema = serviceSelectionSchema
  .merge(calendarSchema)
  .merge(customerInfoSchema);

export type FullBookingData = z.infer<typeof fullBookingSchema>;
