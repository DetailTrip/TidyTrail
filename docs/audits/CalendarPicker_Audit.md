# 🧹 TidyTrails Audit — `CalendarPicker.tsx`

🔍 **Summary**  
This step allows users to select a weekend date for their first service. It reads/writes from global context, checks availability via `useAvailability()`, and ensures the date is valid before allowing progression. It’s functionally sound, mobile-ready, and WCAG-compliant — only minor UX tweaks and validation alignments are recommended.

---

## 📦 Component Function

- Uses a native `<input type="date">` to let users choose their first service date.
- Calls `useAvailability(selectedDate)` to check backend availability.
- Only allows Saturdays and Sundays (enforced by `isWeekend()` and Zod schema).
- Stores selection in `bookingData.firstServiceDate` via `updateBooking()`.

---

## 🧠 BookingContext Usage

- Initializes from `bookingData.firstServiceDate` (for back/forward navigation).
- Valid weekend dates are merged into context; invalid ones are blocked locally.
- ❗ `updateBooking()` is only called for valid selections — prevents invalid context state.

---

## ✅ Zod Form Validation

- Uses `calendarSchema`: requires a weekend date at least 1 day in the future.
- Validates: presence, weekend day, and minimum date via `parse()` in `validate()`.
- ❗ The `<input>` currently allows today (`min={today}`), while schema requires tomorrow.
  - **Fix:** set min attribute to tomorrow via `Date.now() + 24h` to match schema.
- ❗ No visible feedback if user skips date (Next button just fails silently).
  - **Fix:** consider showing “Please select a date” if none is picked.

---

## 💸 Pricing & Discounts Logic

- No pricing calculations here.
- No impact from `calculatePricing()` or referral/prepay logic.
- `useAvailability()` ensures selected date is valid for backend capacity.

---

## ♿ Accessibility (WCAG 2.1-AA)

- `aria-label`, `htmlFor`, and `aria-describedby` used correctly.
- Status updates (“Checking availability…”, errors) use `aria-live="polite"`.
- Emoji in heading (`📅`) is screen reader visible — optionally `aria-hidden` for polish.
- ❗ Contrast: mostly OK, but replace `text-gray-600` with `text-muted` for consistency.

---

## 📱 Mobile UX

- Layout uses `max-w-md mx-auto p-6` — fits well on mobile (375px).
- Input and feedback messages are legible, stacked, and centered.
- UX flow is simple: one action, one validation, one feedback loop.

---

## ⚠️ Resilience & Edge Cases

- ✅ Guards against weekdays with error messages.
- ✅ Shows availability error if date is booked or API fails.
- ❗ No message if no date is selected — user might be confused.
- ❗ If availability fails, user may still proceed (schema doesn’t check `.available === true`).
  - **Fix:** block Next if availability is explicitly false.
- ❗ Timezone edge case: near-midnight selection might mismatch Zod’s “>= tomorrow” check.
  - Current schema uses `Date.now() + 24h` — safe in most environments.

---

## 🧼 Clean Code & Reusability

- Code is modular and avoids duplication.
- `isWeekend()` and `parseLocalDate()` duplicated in both component and schema — could move to shared utility.
- All validation messages are inline; centralizing to a constants file might help.
- Uses no effect hooks — availability handled by `useAvailability()` hook (likely wrapped in React Query).
- `validate()` is self-contained and safe — no global state hacks.

---

## 🎨 Tailwind Design Token Audit

- ✅ Uses: `text-primary`, `bg-mist`, `border-border`, `max-w-md`, `p-6`, `space-y-6`
- ⚠️ Replace: `text-gray-600` → `text-muted` for token consistency
- ⚠️ Confirm: `bg-mist` actually applies `tidy.mist` (#EEF5F2)
- ✅ Accessibility color contrast: red-600 on red-50, green-800 on green-100 all pass

---

## 🔧 Actionable Fixes Summary

- [ ] Change `min` on date input to **tomorrow**, not today
- [ ] Add a required check: show “Please select a date” if input is empty
- [ ] Block Next step if selected date is **fully booked**
- [ ] Replace `text-gray-600` with `text-muted` token
- [ ] Confirm `bg-mist` resolves — replace with `bg-tidy-mist` if needed
- [ ] Move `isWeekend()` and `parseLocalDate()` into shared utils
- [ ] Consider centralizing inline error messages

---

## 🛠 Refactor Level: **2/5**

Minimal — component is clean, functional, and accessible. Only small fixes for validation clarity, token consistency, and defensive UX needed.
