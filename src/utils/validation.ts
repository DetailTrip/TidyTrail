// src/utils/validation.ts

import { z } from "zod";

// Helper: parse YYYY-MM-DD into a local Date at midnight
function parseLocalDate(val: unknown): unknown {
  if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const [year, month, day] = val.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return val;
}

// Enums for strict values
const FrequencyEnum = z.enum(["weekly", "biweekly", "twice", "onetime"]);
const WasteLevelEnum = z.enum(["light", "moderate", "heavy"]);
const AddOnEnum = z.enum(["enzymeCleaner"]);
const AreaEnum = z.enum([
  "Front Yard",
  "Back Yard",
  "Side Yard",
  "Patio/Driveway",
]);
const CityEnum = z.enum(["Timmins", "South Porcupine", "Schumacher", "Porcupine"]);

// Step 1: ServiceSelection
export const serviceSelectionSchema = z
  .object({
    frequency: FrequencyEnum,
    dogCount: z
      .number({ required_error: "Please enter how many dogs you have" })
      .min(1, { message: "At least 1 dog must be selected" })
      .max(6, { message: "Max 6 dogs allowed" }),
    wasteLevel: WasteLevelEnum.optional(),
    addOns: z.array(AddOnEnum).optional(),
    areas: z.array(AreaEnum).min(1, { message: "Please select at least one service area" }),
  })
  .superRefine((data, ctx) => {
    if (data.frequency === "onetime" && !data.wasteLevel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["wasteLevel"],
        message: "Please select a waste level for one-time cleanups",
      });
    }

    if (data.addOns && new Set(data.addOns).size !== data.addOns.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["addOns"],
        message: "You’ve already selected that add-on",
      });
    }
  });

// Step 2: CalendarPicker
export const calendarSchema = z.object({
  firstServiceDate: z.preprocess(
    parseLocalDate,
    z
      .date()
      .min(
        new Date(Date.now() + 24 * 60 * 60 * 1000),
        { message: "Date must be at least 1 day from today" }
      )
      .refine(
        (d) => {
          const day = d.getDay();
          return day === 6 || day === 0;
        },
        { message: "Only Saturdays and Sundays are available" }
      )
  ),
});

// Step 3: CustomerForm
export const customerInfoSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  phone: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const digits = val.replace(/\D/g, "");
        if (digits.length === 10) {
          return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
      }
      return val;
    },
    z.string().regex(/^(\(\d{3}\) \d{3}-\d{4})$/, {
      message: "Phone must be in the format (###) ###-####",
    })
  ),
  email: z.string().trim().email({ message: "Invalid email address" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .refine((addr) => /\d+/.test(addr), { message: "Address must include a street number" }),
  unit: z.string().optional(),
  city: z
  .string()
  .min(1, { message: "City is required" })
  .refine((val): val is z.infer<typeof CityEnum> => CityEnum.options.includes(val as any), {
    message: "Please select a valid city from the list",
  }),
  specialInstructions: z.string().max(200, { message: "Special instructions too long" }).optional(),
  preferredContact: z.enum(["call", "text", "email"]),
  bestTime: z.enum(["morning", "afternoon", "evening"]),
  dogNames: z.string().optional(),
  marketingOptIn: z.boolean(),
  referralCode: z
    .string()
    .min(3, { message: "Referral code must be between 3 and 10 characters" })
    .max(10, { message: "Referral code must be between 3 and 10 characters" })
    .optional(),
});


// Combined for final submission
export const fullBookingSchema = serviceSelectionSchema
  .and(calendarSchema)
  .and(customerInfoSchema);

export type FullBookingData = z.infer<typeof fullBookingSchema>;
