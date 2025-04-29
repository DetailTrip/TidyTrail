# FRONTEND DEVELOPMENT TECHNICAL PROFILE (V1)  
_Last updated 2025-04-28_

---

## ROLE & EXPERTISE
* **Senior Frontend Engineer** (React 18 + TypeScript).  
* Specializes in **multi-step booking wizards** & **real-time pricing**.  
* Domain: **Pet-waste cleanup booking MVP** (Phase 1).

---

## TECH STACK

| Layer / Concern             | Tool / Version (minimum) |
|-----------------------------|---------------------------|
| Build & Dev Server          | **Vite v6** |
| Framework / UI              | **React 18**, **Tailwind CSS 3** |
| Routing                     | **react-router-dom 6** |
| Form State & Validation     | **React-Hook-Form ≥ 7**, **Zod ≥ 3** |
| Data-fetch / Caching        | **@tanstack/react-query ≥ 5** |
| Payments                    | Stripe Checkout (JS SDK v3) |
| SMS / Reminders             | Twilio REST API |
| Address Autocomplete        | Google Places JS API |
| Testing                     | Vitest + React Testing Library |
| Lint / Format               | ESLint (strict) + Prettier |

---

## PATH ALIASES  *(vite.config.ts & tsconfig.json)*

@/* → src/* @components/* → src/components/* @features/* → src/features/* @booking/* → src/features/booking/* @utils/* → src/utils/*


---

## TECHNICAL FOCUS
1. **Wizard flow** (Service → Schedule → Info → Review) in `features/booking/`.  
2. **Live price updates** via `@booking/utils/pricingLogic.ts`.  
3. **Autosave** wizard state to **localStorage**.  
4. **Atomic design** (atoms → molecules → organisms → templates).  
5. **Strict TypeScript** (`strict: true`, no `any`).

---

## UI / UX STANDARDS
* Mobile-first; 48 × 48 px touch targets.  
* WCAG 2.1 AA labels, focus rings, keyboard nav.  
* Emojis limited to 🐾, 🟢🟡🔴, 🌿, 🎉.  
* Tailwind classes only — no inline `style` props.  
* Sticky **Back / Next** toolbar on mobile.

---

## FORM IMPLEMENTATION MAP

| Wizard Step                | Component(s)                   | Hook / Logic |
|----------------------------|--------------------------------|--------------|
| Service & Frequency        | `ServiceSelection.tsx`         | `useBookingForm` |
| Waste Level (🟢🟡🔴)        | `WasteAmount.tsx`              | conditional Zod schema |
| Dog Count & Yard Areas     | `DogCountInput.tsx`, `AreaSelector.tsx` | — |
| Schedule Picker            | `CalendarPicker.tsx`           | `useAvailability` (React-Query) |
| Summary & Submit           | `Confirmation.tsx`             | `useBookAppointment` (mutation) |

---

## STATE & PERFORMANCE
* `BookingContext` + `useReducer` for wizard state.  
* React-Query for availability & booking APIs.  
* Lazy-load wizard steps with `React.lazy` + `Suspense`.  
* Memoize derived totals with `useMemo`.

---

## CODE & WORKFLOW STANDARDS
* ≤ **150 LOC** per component, ≤ 50 LOC per custom hook.  
* Default export + named exports per file.  
* Tests colocated (`__tests__/` or `tests/`).  
* CI/PR gate: `npm run lint` · `npm run test` · `npm run typecheck` must all pass.

---

## PROJECT SCRIPTS & QUALITY CHECKS

| Command               | Purpose |
|-----------------------|---------|
| `npm run dev`         | Start Vite dev server with HMR. |
| `npm run build`       | Type-check then bundle for production. |
| `npm run preview`     | Serve the built bundle locally. |
| `npm run lint`        | ESLint (strict rules) + Prettier check. |
| `npm run test`        | Unit tests via Vitest. |
| `npm run typecheck`   | `tsc --noEmit` (CI gate). |

**Commit-message convention**

`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`

**PR checklist**

- [ ] lint ✔︎  
- [ ] tests ✔︎  
- [ ] typecheck ✔︎  
- [ ] screenshots / GIFs for UI changes ✔︎

---

## OUTPUT EXPECTATIONS  *(for any AI or contractor code request)*

1. **File path** → `src/features/booking/[subdir]/<Component>.tsx`  
2. **Stack** → React 18 + Tailwind + TypeScript (`strict`).  
3. **Imports** → use path aliases (`@booking`, `@components`, `@utils`).  
4. **Max length** → 150 LOC/component, 50 LOC/hook.  
5. **Include tests** when business logic present.  
6. **Exclude** → any lawn-mow or raking references, unused imports.

---

_This profile supersedes all prior lawn-care instructions. New services will be specified in future versions._
