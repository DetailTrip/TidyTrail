# TIDYTRAILS PET-WASTE CLEANUP — BUSINESS REQUIREMENTS (V2)  
_Last updated: 2025-04-28_

---

## 1 · PROJECT OVERVIEW  
TidyTrails is launching an online booking system that lets homeowners in Timmins, Ontario schedule **pet-waste cleanup** in minutes.  
Phase 1 supports **only pet-waste services** (with optional enzyme cleaner). Future yard-care add-ons will be introduced in Phase 2.

---

## 2 · SERVICE PACKAGES & PRICING

| Frequency | **Price / Visit** | Visits / 4-Week Month* | **Approx. Monthly Cost** |
|-----------|------------------|------------------------|--------------------------|
| **Weekly**          | **$24** | 4 | **$96 / mo** |
| **Bi-weekly**       | **$45** | 2 | **$90 / mo** |
| **Twice a Week**    | **$20** | 8 | **$160 / mo** |
| **One-time “Spring Cleanup”** | **$90** base | n/a | One-time charge |

\* _Assumes exactly four weeks per month for quick comparison._

### 2.1 Dog-Count Surcharge (all visit-based plans)

| Dogs | Extra / Visit |
|------|---------------|
| 1–2  | $0   |
| 3    | +$5  |
| 4    | +$10 |
| 5+   | +$15 |

### 2.2 Waste-Level Surcharge (One-time only)

| Level | Customer-facing Description | Fee |
|-------|----------------------------|-----|
| 🟢 **Light**    | “Only a few piles, recently maintained.”            | +$0  |
| 🟡 **Moderate** | “Medium build-up, ~1–2 months since last cleanup.”  | +$30 |
| 🔴 **Heavy**    | “Full-season accumulation, heavily neglected.”      | +$60 |

> _Soft note_: “If conditions are heavier than described, your cleaner will confirm any adjustment before starting.”

### 2.3 Add-Ons

| Add-On            | Stand-alone | Bundled Price |
|-------------------|-------------|---------------|
| **Enzyme Cleaner**| $24         | **$18** with any cleanup |

---

## 3 · BOOKING FORM — EXPERIENCE & REQUIRED FIELDS  

### 3.1 Form Experience & Technology  
* **Multi-step wizard** with progressive disclosure (Service → Schedule → Info → Review).  
* Built with **React Hook Form + Zod** for state & validation.  
* **BookingContext** shares data across steps; autosaves draft to **localStorage**.  
* **Live total price updates** after every change.  
* **Mobile-first UI** with sticky Back/Next toolbar and subtle haptic feedback.

### 3.2 Required Fields  

| Field              | UI Control / Type | Validation & Notes |
|--------------------|-------------------|--------------------|
| Service Type       | fixed label       | “Pet Waste Cleanup” (hidden/disabled) |
| Frequency          | radio (Weekly / Bi-weekly / Twice a Week / One-time) | required |
| Waste Amount       | 🟢🟡🔴 card selector | shown **only if** Frequency = One-time |
| Dog Count          | numeric stepper (1–6) | surcharge tiers |
| Yard Areas         | checkboxes (Front / Back / Side / Patio) | optional multi-select |
| Add-Ons            | checkbox (Enzyme Cleaner) | $18 bundled price |
| First Visit Date   | calendar picker | must be ≥ today + 1 day |
| Customer Info      | name, phone, email, address (Google Places) | all required |
| Referral Code      | optional text | $10 discount if valid |

---

## 4 · UX & ACCESSIBILITY REQUIREMENTS  
* Mobile-first; 48 px touch targets  
* Emoji-coded 🟢🟡🔴 waste cards with soft tint backgrounds  
* Sticky **Confirm & Book** button on mobile  
* WCAG 2.1-AA labels & keyboard navigation  
* Subtle haptic feedback on key selections

---

## 5 · SCHEDULING & RECURRENCE RULES  
* **Weekly / Bi-weekly:** repeat same weekday as first visit  
* **Twice a Week:** customer selects two weekdays (e.g., Mon + Thu)  
* Skips handled via SMS (no pause UI in MVP)

---

## 6 · REFERRAL & LOYALTY  
* Referral code field at checkout → $10 discount on first service  
* After first visit, SMS/email a unique share-link (`tidytrails.ca/r/ABC123`)  
* Each successful referral credits $10 to referrer (tracked in Referrals sheet)

---

## 7 · TECHNICAL INTEGRATION  
* **React 18 + Vite** front-end  
* **React Hook Form + Zod** for validation  
* **@tanstack/react-query** for `GET /api/availability` & `POST /api/bookings`  
* **Stripe Checkout** for optional $10 deposit  
* **Twilio** for SMS confirmations & reminders  
* **Google Places API** for address autocomplete  
* Data schema aligns with Bookings · Clients · Referrals · Payments · Notes tabs

---

## 8 · TRACEABILITY MATRIX

| Business Need                   | Implementation Artifact |
|---------------------------------|-------------------------|
| Real-time pricing               | `pricingLogic.ts` in `features/booking/utils/` |
| Waste-level selector            | `WasteAmount.tsx` component |
| Dog-surcharge logic             | `pricingLogic.ts` + `DogCountInput.tsx` |
| Recurring scheduling            | `CalendarPicker.tsx` + `BookingContext` |
| Mobile-first accessible UI      | Tailwind + ARIA labels |
| SMS & Email confirmations       | Messages Playbook + Twilio |
| Referral discount & link        | `bookingApi.ts` + Referrals sheet |

---

\* _All prices in CAD. Update values in `pricingLogic.ts` for future adjustments._
