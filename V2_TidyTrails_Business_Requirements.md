
# File 2: Business Requirements (V2)

```markdown name=V2_TidyTrails_Business_Requirements.md
# TIDYTRAILS BUSINESS REQUIREMENTS (V2)

Current Date and Time (UTC): 2025-04-26 02:13:13
Current User: DetailTrip

## PROJECT OVERVIEW
TidyTrails Yard Services website development focusing on service calculator, booking system, and seasonal content presentation for Timmins, Ontario market.

## BUSINESS REQUIREMENTS

### SERVICE CALCULATOR SPECIFICATIONS
- **Input Parameters:**
  * Property type (Residential/Commercial)
  * Yard size (Small: <2,500 sq ft, Medium: 2,500-5,000 sq ft, Large: 5,000-10,000 sq ft)
  * Service type selection (multiple checkbox options)
  * Service frequency (One-time, Weekly, Bi-weekly, Monthly)
  * Pet ownership (Yes/No - unlocks pet waste services)
  * Special conditions (Slope, Heavy debris, Difficult access)

- **Pricing Logic:**
  * Base price determined by service type + yard size
  * Frequency discounts: Weekly (10% off), Bi-weekly (5% off)
  * Bundle discounts: 2 services (5% off), 3+ services (10% off)
  * Seasonal adjustments: Spring cleanup (+15% Apr-May), Winter prep (+10% Oct)
  * Special conditions: Each adds 10% to final price

- **User Experience Requirements:**
  * Mobile-first sliding calculator with real-time updates
  * Ability to compare different service combinations
  * Option to save/email quote (requires basic contact info)
  * Summary view showing itemized breakdown
  * Keyboard-accessible controls with proper ARIA attributes
  * Haptic feedback for mobile interactions (subtle vibration on selections)
  * Dark mode support with automatic detection of system preferences

### SERVICE DETAILS & PRICING
**Residential Services:**
- Pet Waste Cleanup
  * Weekly: $24/visit ($96/month)
  * Bi-weekly: $45/visit ($90/month)
  * One-time spring cleanup: $90+ (varies by waste volume)
- Raking and Removing Debris: $40+ (based on yard size)
  * Small yard: $40
  * Medium yard: $60
  * Large yard: $80
- Lawn Mowing Service
  * **Regular Service Pricing**

    | Yard Size | Grass Height | Weekly | Bi-Weekly | One-Time |
    |-----------|--------------|--------|-----------|----------|
    | Up to 1,500 sq ft | Short | $30 | $40 | $50 |
    | | Medium | $35 | $45 | $60 |
    | | Long | $40 | $50 | $70 |
    | 1,501–3,000 sq ft | Short | $40 | $50 | $60 |
    | | Medium | $45 | $55 | $70 |
    | | Long | $55 | $65 | $90 |
    | 3,001–6,000 sq ft | Short | $55 | $70 | $80 |
    | | Medium | $65 | $80 | $100 |
    | | Long | $75 | $90 | $120 |
    | 6,001–8,000 sq ft | Short | $70 | $90 | $100 |
    | | Medium | $85 | $100 | $120 |
    | | Long | $100 | $120 | $140 |

  * **Seasonal Packages**

    | Yard Size | Package Price (14 cuts) | Per Cut Equivalent | Savings |
    |-----------|------------------------|-------------------|---------|
    | Up to 1,500 sq ft | $378 | $27 | 10% |
    | 1,501–3,000 sq ft | $504 | $36 | 10% |
    | 3,001–6,000 sq ft | $693 | $49.50 | 10% |
    | 6,001–8,000 sq ft | $882 | $63 | 10% |

  * **Package Notes:**
    - Based on short to medium grass height
    - Additional fee of $10-$25 per cut for consistently long grass
    - Includes basic edge trimming along walkways
    - Weekly scheduling from mid-May to late August

- Patio and Furniture Cleaning: $50+
- Deodorizing & Stain Treatment: $30 base price

**Commercial Services:**
- Custom pricing based on property size and service frequency
- Minimum contract: $200/month
- Free on-site assessment for accurate quoting

**Service Packages:**
- Fresh Start Combo: Debris removal, lawn mowing, furniture cleaning ($140+)
- Pet-Friendly Yard Package: Pet waste cleanup, raking, deodorizing ($110+)
- Complete Spring Cleanup: Comprehensive service bundle (seasonal pricing)
- Commercial Contracts: Customized recurring services

### SEASONAL CONTENT REQUIREMENTS
- Dynamic content display based on current date
- April-May: Highlight spring cleanup services and packages
- June-August: Showcase lawn maintenance and outdoor living services
- September-October: Feature fall cleanup and winter preparation services
- November-March: Promote early-bird booking discounts for spring
- Interactive seasonal UI themes that subtly reflect the current season
- Preloaded content with ISR (Incremental Static Regeneration) for performance
- Visual weather indicators integrated with local forecast API

### BOOKING SYSTEM REQUIREMENTS
- Calendar view showing available appointment slots
- Service selection with estimated duration
- Required customer information:
  * Name, Address, Phone, Email
  * Property details (access instructions, pets, etc.)
  * Preferred communication method
- 24-hour cancellation policy display
- Email and SMS confirmation options
- Recurring booking option for maintenance services
- Progressive form with step indicators and save-as-you-go functionality
- Multi-step validation with clear error messaging
- Address autocomplete with Google Places API integration

## TECHNICAL INTEGRATION POINTS
- Google Maps API for service area verification (Timmins postal codes)
- Email service for quote and booking confirmations
- Weather API integration for seasonal content adjustments
- Local storage for saving user calculator preferences
- SMS notification system for appointment reminders
- Stripe integration for deposit payments and subscription management
- Vercel Analytics for performance monitoring and user journey tracking
- React Query for efficient API data fetching and caching
- PWA capabilities for offline access to booking information

## BRANDING ELEMENTS
- Refer to expanded brand identity guidelines
- Use Forest Green (#56772A) and Steel Blue (#6D8BA6) as primary colors
- Implement defined typography system (Lato Bold for headings, Open Sans for body)
- Follow established UI component guidelines for consistent interfaces
- Design system implementation in Tailwind with custom theme extension
- CSS variables for dynamic color scheme adaptation
- Micro-interactions and subtle animations on brand elements

## TRACEABILITY MATRIX

This section maps specific business requirements to technical implementation approaches to ensure complete coverage:

| Business Requirement | Technical Implementation |
|----------------------|--------------------------|
| Service Calculator | Real-time Calculator Implementation with React Hook Form + Zod validation |
| Mobile-first Design | Tailwind CSS responsive design + WCAG 2.1 compliant touch targets |
| Booking System | Multi-step form with state preservation + Progressive form with step indicators |
| Seasonal Content | Next.js ISR + Dynamic rendering based on date/location |
| Service Area Verification | Google Maps API + Server-side validation in API routes |
| Email/SMS Notifications | Serverless functions + Third-party API integration |
| Quote Saving | LocalStorage encryption + PDF export functionality |
| Weather Integration | React Query for data fetching + Optimistic UI updates |
| Pricing Logic | Context Providers + Custom calculation hooks |
| Accessibility | ARIA implementation + Keyboard navigation + Screen reader testing |