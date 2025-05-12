// src/features/booking/components/steps/CustomerForm.tsx

import React, { useState, useEffect, ChangeEvent } from "react";
import { useBookingContext } from "@booking/context/BookingContext";
import { customerInfoSchema } from "@utils/validation";

let lastSetErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>> | null = null;

const contactMethods = ["call", "text", "email"] as const;
const timesOfDay = ["morning", "afternoon", "evening"] as const;
const cities = ["Timmins", "South Porcupine", "Schumacher", "Porcupine"];

const CustomerForm: React.FC = () => {
  const { bookingData, updateBooking } = useBookingContext();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    lastSetErrors = setErrors;
    return () => {
      lastSetErrors = null;
    };
  }, []);

  const handleChange = (field: keyof typeof bookingData, value: any) => {
    updateBooking({ [field]: value });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 10);
    let formatted = "";
    if (part1) formatted += `(${part1}`;
    if (part2) formatted += `) ${part2}`;
    if (part3) formatted += `-${part3}`;
    updateBooking({ phone: formatted });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary">👤 Your Details</h2>
        <p className="text-sm text-muted">We’ll use this to confirm your booking and keep you updated.</p>
      </div>

      {/* Contact Info */}
      <section className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold">
          📇 Contact Info <span className="text-xs text-muted ml-1">(required)</span>
        </h3>
        <fieldset className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="label-required">First Name</label>
            <input
              id="firstName"
              type="text"
              value={bookingData.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              required
              autoComplete="given-name"
              className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
              aria-invalid={!!errors.firstName}
              aria-describedby="firstName-error"
            />
            {errors.firstName && <p id="firstName-error" className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="label-required">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={bookingData.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              required
              autoComplete="family-name"
              className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
              aria-invalid={!!errors.lastName}
              aria-describedby="lastName-error"
            />
            {errors.lastName && <p id="lastName-error" className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
          </div>
        </fieldset>

        <fieldset className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="label-required">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={bookingData.phone || ""}
              onChange={handlePhoneChange}
              placeholder="(705) 555-0199"
              required
              autoComplete="tel"
              className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
            />
            <p className="text-xs text-muted mt-1">We’ll only contact you for booking reminders.</p>
            {errors.phone && <p id="phone-error" className="text-sm text-red-600 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="email" className="label-required">Email</label>
            <input
              id="email"
              type="email"
              value={bookingData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              autoComplete="email"
              className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            <p className="text-xs text-muted mt-1">We’ll never share your info. Used only for booking & reminders.</p>
            {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>
        </fieldset>
      </section>

      {/* Address */}
      <section className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold">🏠 Service Address</h3>
        <fieldset className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="address" className="label-required">Street Address</label>
            <input
              id="address"
              type="text"
              value={bookingData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              required
              autoComplete="street-address"
              className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
              aria-invalid={!!errors.address}
              aria-describedby="address-error"
            />
            {errors.address && <p id="address-error" className="text-sm text-red-600 mt-1">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="unit">Unit / Apt #</label>
            <input
              id="unit"
              type="text"
              value={bookingData.unit || ""}
              onChange={(e) => handleChange("unit", e.target.value)}
              className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
            />
          </div>
        </fieldset>
        <div>
          <label htmlFor="city" className="label-required">City</label>
          <input
            id="city"
            list="city-options"
            value={bookingData.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            required
            autoComplete="address-level2"
            className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
            aria-invalid={!!errors.city}
            aria-describedby="city-error"
          />
          <datalist id="city-options">
            {cities.map((c) => <option key={c} value={c} />)}
          </datalist>
          {errors.city && <p id="city-error" className="text-sm text-red-600 mt-1">{errors.city}</p>}
        </div>
      </section>

      {/* Preferences */}
      <section className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold">
          🎯 Preferences <span className="text-xs text-muted ml-1">(how we contact you)</span>
        </h3>
        <fieldset>
          <legend className="label-required">Preferred Contact Method</legend>
          <div className="flex gap-4 mt-1">
            {contactMethods.map((method) => (
              <label key={method} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="preferredContact"
                  value={method}
                  checked={bookingData.preferredContact === method}
                  onChange={() => handleChange("preferredContact", method)}
                  required
                  className="w-4 h-4"
                />
                <span className="capitalize text-sm">{method}</span>
              </label>
            ))}
          </div>
          {errors.preferredContact && <p className="text-sm text-red-600 mt-2">{errors.preferredContact}</p>}
        </fieldset>
        <div>
          <label htmlFor="bestTime" className="label-required">Best Time to Reach</label>
          <select
            id="bestTime"
            value={bookingData.bestTime || ""}
            onChange={(e) => handleChange("bestTime", e.target.value)}
            required
            className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
            aria-invalid={!!errors.bestTime}
            aria-describedby="bestTime-error"
          >
            {timesOfDay.map((time) => (
              <option key={time} value={time}>{time.charAt(0).toUpperCase() + time.slice(1)}</option>
            ))}
          </select>
          {errors.bestTime && <p id="bestTime-error" className="text-sm text-red-600 mt-1">{errors.bestTime}</p>}
        </div>
      </section>

      {/* Extras */}
      <section className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold">🐾 Extras (optional)</h3>
        <div>
          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea
            id="specialInstructions"
            rows={3}
            value={bookingData.specialInstructions || ""}
            onChange={(e) => handleChange("specialInstructions", e.target.value)}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
            aria-invalid={!!errors.specialInstructions}
            aria-describedby="specialInstructions-error"
          />
          <p className="text-xs text-muted mt-1">
            Optional notes like locked gates, pet access, or timing preferences.
          </p>
          {errors.specialInstructions && <p id="specialInstructions-error" className="text-sm text-red-600 mt-1">{errors.specialInstructions}</p>}
        </div>
        <div>
          <label htmlFor="dogNames">Dog’s Name(s)</label>
          <input
            id="dogNames"
            type="text"
            value={bookingData.dogNames || ""}
            onChange={(e) => handleChange("dogNames", e.target.value)}
            placeholder="Comma-separated"
            className="w-full border p-3 rounded focus:ring-2 focus:ring-accent focus:outline-none transition"
          />
          <p className="text-xs text-muted mt-1">So we can say hi properly 🐶</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 flex items-start gap-3">
          <input
            id="marketingOptIn"
            type="checkbox"
            checked={bookingData.marketingOptIn || false}
            onChange={(e) => handleChange("marketingOptIn", e.target.checked)}
            className="mt-1 w-4 h-4"
          />
          <label htmlFor="marketingOptIn" className="text-sm text-primary">
            <strong>Yes!</strong> Sign me up for occasional promotions and seasonal deals.
          </label>
        </div>
      </section>
    </div>
  );
};

export const validate = (data: any) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      try {
        customerInfoSchema.parse(data);
        if (lastSetErrors) lastSetErrors({});
        resolve(true);
      } catch (err: any) {
        const fieldErrors: { [key: string]: string } = {};
        if (err?.flatten) {
          const flat = err.flatten();
          for (const key in flat.fieldErrors) {
            if (flat.fieldErrors[key]?.[0]) {
              fieldErrors[key] = flat.fieldErrors[key][0];
            }
          }
        }
        if (lastSetErrors) lastSetErrors(fieldErrors);
        resolve(false);
      }
    }, 0); // Give React a tick to mount component and register `setErrors`
  });
};


export default CustomerForm;
