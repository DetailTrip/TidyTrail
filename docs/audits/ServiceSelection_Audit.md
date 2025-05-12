# 🧹 TidyTrails Audit — `ServiceSelection.tsx`

🔍 **Summary**  
This component captures key service selection inputs — frequency, yard areas, waste level, add-ons, and dog count — and stores them in booking context. It's robust, accessible, and mobile-ready, with only minor improvements needed for schema validation, Tailwind token consistency, and default state handling.

---

## 📦 Component Function

- Renders the first booking step: frequency selection, waste level (if one-time), dog count, area toggles, and enzyme cleaner add-on.
- Uses `useBookingContext()` to read/write `bookingData`.
- Each interaction updates state via `updateBooking()`, which merges changes safely.
- Uses `useBookingDefaults()` to auto-set fields like `addOns` and reset logic (e.g., clearing `wasteLevel` when not needed).

---

## 🧠 BookingContext Usage

- `updateBooking()` uses a functional state merge — avoids race conditions.
- `useBookingDefaults()` enforces consistent state on mount.
- ❗ `dogCount` is not defaulted in context — UI uses `bookingData.dogCount || 1`, but context state may remain `undefined`.
  - Recommended: Add `dogCount: 1` to default state or initialize via `useBookingDefaults()`.

---

## ✅ Zod Form Validation

- Uses `serviceSelectionSchema`.
- Validates: `frequency`, `areas` (at least one), `wasteLevel` (if onetime), and `addOns` (via whitelist).
- Missing: `dogCount` is not validated (UI assumes default of 1).
- Validation errors are accessible and tied to fields via `aria-describedby`.

**🧪 Suggest:**
- Add `dogCount` min check (`>= 1`) to schema for consistency.

---

## 💸 Pricing & Discount Inputs

- Sets up values that `calculatePricing()` will later use:
  - Dog count → surcharge after 2
  - Waste level → one-time surcharge
  - Frequency → eligible for prepay discount
- UI shows helpful hints (e.g., "10% off with prepay", "fee for >2 dogs").
- Referral code banner shown if `bookingData.referralCode` exists.
- Good separation: this component doesn’t run pricing logic directly.

**🧪 Suggest:**
- Consider surfacing all pricing-affecting choices in one shared `pricingBreakdown()` utility for later clarity in `ReviewStep`.

---

## ♿ Accessibility (WCAG 2.1-AA)

- All buttons and toggles use proper `aria-label`, `aria-pressed`, etc.
- Emoji icons are screen-reader safe, but:
  - 🧼 icon has a misleading `aria-label="sparkles"` (should be “cleaning”).
  - Some emojis may benefit from `aria-hidden` if decorative only.
- Errors tied to inputs using `aria-describedby`.
- `aria-live="polite"` used for fee notices (note: surcharge warning is always visible, so it doesn't announce dynamically).

---

## 📱 Mobile UX

- Uses responsive Tailwind grids and flex utilities.
- Layout adapts for 375px screens — buttons and cards stay tappable.
- Emoji section headers and controls remain legible and spaced.
- Uses `max-w-2xl`, `px-6`, and stacking behavior for mobile friendliness.

---

## ⚠️ Edge Cases & Resilience

- Validation prevents progression if required fields (e.g. waste level) are missing.
- Booking data is persisted via `localStorage` on every change.
- On refresh, form restores from context — but `dogCount` may be undefined if never touched.
- Validation messages are inline, clear, and screen-reader accessible.
- No API interaction occurs in this step (safe for offline/local use).

---

## 🧼 Clean Code & Reusability

- Toggle logic (for `areas` and `addOns`) is clean and isolated.
- Constants (`frequencies`, `wasteLevels`, `areas`) are inline — consider exporting if reused in summary/ReviewStep.
- Residual code: `errors.dogCount && ...` JSX exists but `dogCount` is not validated — either add schema rule or remove this block.
- `useBookingDefaults()` improves cleanliness by reducing `useEffect` duplication.
- Reusable toggle logic could be abstracted (e.g. `useMultiToggleState()`).

---

## 🎨 Tailwind Design Token Audit

- ✅ Uses: `text-primary`, `text-muted`, `bg-sectionAlt`, `max-w-2xl`, `p-6`
- ⚠️ Replace: `text-gray-500` → `text-muted` for WCAG contrast
- ⚠️ Confirm: `bg-mist` resolves correctly (likely needs `bg-tidy-mist`)
- ⚠️ Consider: `ring-green-500` → `ring-primary` for selection indicators
- Uses font and spacing utilities consistently; default font fallback assumes `font-body` is applied globally

---

## 🔧 Actionable Fixes Summary

- [ ] Default `dogCount: 1` in context or `useBookingDefaults()`
- [ ] Add Zod validation for `dogCount`
- [ ] Fix `aria-label="sparkles"` on 🧼 emoji
- [ ] Replace `text-gray-500` with `text-muted` for better contrast
- [ ] Confirm `bg-mist` is recognized or replace with `bg-tidy-mist`
- [ ] Swap `ring-green-500` for `ring-primary` for brand consistency
- [ ] Remove unused JSX block `errors.dogCount && ...` if schema isn't validating it

---

## 🛠 Refactor Level: **2/5**

Low-impact: The component is well-structured. Most changes involve minor default handling, design token polish, and cleanup for future maintainability.
