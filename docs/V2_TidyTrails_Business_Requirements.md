# TIDYTRAILS BUSINESS REQUIREMENTS (V2)

**Core Service**: Pet Waste Cleanup
- **Weekly**: $24/visit (up to 2 dogs)  
- **Weekly (3+ dogs)**: $29/visit  
- **Bi-weekly**: $45/visit  
- **One-time Spring Cleanup**: Starts at $90 + optional enzyme cleaner

**Additional Services**: Lawn Mowing, Raking & Debris Removal, Furniture Cleaning.

## CALCULATOR SPECIFICATIONS
- **Inputs**:
  1. serviceType ("petWaste", "lawnMow", "rake")
  2. yardSizeBracket (Up to 1,500; 1,501–3,000; 3,001–6,000; 6,001–8,000)
  3. frequency ("weekly", "biWeekly", "oneTime")
  4. dogCount (integer)
  5. addOns: [enzymeCleaner, furnitureClean, extraDebris]
  6. springCleanupToggle (boolean)
- **Pricing Logic**:
  - Base rates from serviceType + yardSize + frequency.
  - DogCount surcharge: +$5 if dogCount ≥ 3.
  - Enzyme cleaner: $24 standalone; $18 with any Pet Waste service.
  - Spring Cleanup package: $90 base + $18 enzymeCleaner.
  - Bundle discounts and loyalty credits applied automatically.
- **UX**: Real-time sliding calculator, inline price updates, ability to save/email quote, session persistence.

## SERVICE PRICING
- **Pet Waste Cleanup**:
  - Weekly (≤2 dogs): $24  
  - Weekly (3+ dogs): $29  
  - Bi-weekly: $45  
  - One-time Spring Cleanup: $90 + $18 enzyme cleaner

- **Lawn Mowing**:
  | Yard Size       | Weekly | Bi-weekly | One-time |
  |-----------------|--------|-----------|----------|
  | Up to 1,500 sf  | $30    | $40       | $50      |
  | 1,501–3,000 sf  | $35    | $45       | $60      |
  | 3,001–6,000 sf  | $40    | $50       | $70      |
  | 6,001–8,000 sf  | $45    | $55       | $80      |

- **Raking & Debris Removal**: Small $40, Medium $60, Large $80.

## PACKAGES & SUBSCRIPTIONS
- **Fresh Start Combo** (Pet Waste + Lawn Mow + Rake): $50/week up to 1,500 sf.
- **Complete Lawn Care**: Tiered seasonal plan (starts $150 up to 1,500 sf).
- **Spring Cleanup Package**: One-time Pet Waste Spring Cleanup + enzyme cleaner: $90 + $18.
- **Subscription Plans** (Weekly, Bi-weekly, All-inclusive tiers).

## UPSELL & LOYALTY
- **Add-ons**:
  - Enzyme Cleaner (stain remover): $24 standalone, $18 with Pet Waste service.
  - Furniture Clean: $50.
  - Extra Debris Removal: $40.
- **Loyalty**: 1 pt per $10 spent → 100 pts = free service; 10% refer-a-friend.

## BOOKING SYSTEM
- Multi-step form with calendar slots, conditional fields (dogCount, add-ons), Google Places API, SMS/email confirmations.

## SEASONAL CONTENT
- Highlight spring cleanup (with package offer), summer maintenance, fall prep, off-season promos.

## TECH INTEGRATION & TRACEABILITY
- Google Maps, Stripe for one-time & recurring payments, Weather API, React Query, Vercel Analytics.
- Traceability matrix updated to include dogCount logic and enzyme cleaner pricing in calculator implementation.