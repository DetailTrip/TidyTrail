# 🧹 TidyTrails Audit — `CustomerForm.tsx`

🔍 **Summary**  
This step gathers the customer’s full contact and service details. It writes all data to `bookingData`, validates fields with Zod, and persistently stores input locally. The structure is clean and accessible, with minor issues around redundant storage, missing error displays, and token usage consistency.

---

## 📦 Component Function

- Multi-section form: Contact Info, Address, Preferences, Extras.
- Inputs are controlled — every field is bound to `bookingData` and updated via `updateBooking()`.
- Also mirrors data to localStorage under `"tidyDraft"` (in addition to context's `"tidytrails-booking-draft"`).
- Initializes special fields (like `marketingOptIn`) with fallbacks to prevent validation errors.

---

## 🧠 BookingContext Usage

- All fields update context live via `updateBooking()` — the source of truth.
- ❗ Redundant localStorage key `"tidyDraft"` mirrors `"tidytrails-booking-draft"`, creating double-write overhead.
  - **Fix:** Consolidate to a single localStorage persistence mechanism (prefer context-level one).
- Phone number is formatted live (`(###) ###-####`) before saving.
- Booleans like `marketingOptIn` are explicitly set to `false` if undefined — a good safety measure.

---

## ✅ Zod Form Validation

- Schema validates:  
  - First/last name (non-empty, trimmed)  
  - Phone (regex-matched format)  
  - Email (standard format)  
  - Address (includes number, min length)  
  - City (non-empty)  
  - Enums for `preferredContact` and `bestTime`  
  - Booleans for opt-in  
  - Optional fields: `specialInstructions`, `dogNames`, `unit`, `referralCode`

- Errors are collected via `.flatten()` and mapped into local `errors` state.

**⚠️ Missing UI Error Displays For:**
- `address`, `city`, `preferredContact`, `bestTime`, and `specialInstructions`
  - These are caught in validation but not rendered in UI.
  - **Fix:** Add `{errors.fieldName && <p>...</p>}` under relevant inputs.

**Other Observations:**
- Optional `referralCode` is not input manually — it's handled via URL param or earlier step.
- Zod messages are descriptive and user-friendly.
- Inputs use `aria-describedby` for accessible error messaging.

---

## 💸 Pricing & Discounts Logic

- No pricing logic is executed here.
- Referral code (if present) carries forward to final pricing — not edited in this form.
- Other fields (e.g., opt-in, dog names) do not influence cost.

---

## ♿ Accessibility (WCAG 2.1-AA)

- Semantic `<section>`s and `<fieldset>`s group related fields.
- Inputs are labeled with `htmlFor` and `id`.
- Required indicators (via class or text) inform users.
- `aria-invalid` and `aria-describedby` are used properly.
- Uses `autoComplete` on key fields for browser support.
- Emoji headers (📇, 🏠, 🐾, etc.) follow text — readable but can be `aria-hidden` for clarity.
- City field uses `<datalist>` for predefined entries — accessible and user-friendly.

**Enhancement Suggestion:**
- Add a focus or alert mechanism on validation failure to guide screen reader users to first error.

---

## 📱 Mobile UX

- Grid-based layout adapts to 1-column stack under `sm:` breakpoint.
- Inputs are `w-full` and wrap cleanly.
- Radios (preferred contact) and selects (best time) are mobile-friendly.
- Responsive class usage (`sm:grid-cols-2`, etc.) ensures usability on small screens.

---

## ⚠️ Resilience & Edge Cases

- Double-saving to localStorage is redundant and could cause desync.
  - **Fix:** Remove `"tidyDraft"` logic or namespace it per session.
- Form reloads correctly on page refresh or back-navigation due to context/state sync.
- ❗ Booking data persists even after final submission — could be a privacy concern.
  - **Fix:** Call `localStorage.removeItem()` on `"tidytrails-booking-draft"` after successful booking.
- ❗ City field is free text (not validated against a known list).
  - **Fix:** Use Zod `z.enum()` or `.refine()` to limit to serviceable cities if needed.

---

## 🧼 Clean Code & Reusability

- Code is logically segmented and consistent.
- Some patterns (e.g., error handling) repeated across steps — suggest a shared `useZodErrors()` hook.
- Phone formatting logic exists in both component and schema — could be unified.
- LocalStorage handling should be centralized for clarity and maintainability.
- Suggest reusable components (e.g. `<TextInputWithError>`) if form complexity grows further.

---

## 🎨 Tailwind Design Token Audit

- ✅ Uses: `text-primary`, `text-muted`, `bg-highlight`, `border-border`, `focus:ring-accent`, `max-w-2xl`, `p-6`
- ⚠️ Replace: `text-gray-500` with `text-muted` for better consistency.
- ✅ Focus rings use `accent` (gold), labels and sections use token-based styles.
- ❓ `bg-yellow-50` used for marketing opt-in instead of `bg-highlight` — likely intentional, but worth verifying for tone consistency.

---

## 🔧 Actionable Fixes Summary

- [ ] Add missing error displays: `address`, `city`, `preferredContact`, `bestTime`, `specialInstructions`
- [ ] Remove `"tidyDraft"` localStorage mirror and rely on context's key
- [ ] Clear localStorage keys (`"tidytrails-booking-draft"`, `"tidyDraft"`) on successful submission
- [ ] Validate city input against serviceable list (Zod enum or refine)
- [ ] Replace raw Tailwind grays with `text-muted` where applicable
- [ ] Consider shared utils for phone formatting, Zod error mapping
- [ ] Optionally refactor repeated UI logic into shared input components

---

## 🛠 Refactor Level: **3/5**

Moderate — the form is robust and production-ready, but some cleanup around validation display, redundant persistence, and token usage will improve performance, consistency, and maintainability.
