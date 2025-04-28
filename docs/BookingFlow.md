# 📋 TIDYTRAILS — MASTER BOOKING FLOW SPEC (FINAL V1)

---

# Step 1: Service & Details

## Step Title:

> **What service would you like to book today?**

## Subtext (Helper):

> *"Let's get your yard looking fresh! Select your cleanup plan and details below."*

## Fields:

### 1.1 Service Type

- Pre-selected and locked: **Pet Waste Cleanup**

**Example UI:**

```
Service:
(•) Pet Waste Cleanup (Only service available)
```

### 1.2 Frequency

**Options:**

- (•) Weekly
- (•) Bi-weekly
- (•) Twice a Week (NEW)
- (•) One-time (Spring Cleanup)

**Helper text:**

> *"Weekly is best for staying fresh. Twice-a-Week for heavy-use homes!"*

**Example UI:**

```
Frequency:
(•) Weekly
( ) Bi-weekly
( ) Twice a Week
( ) One-time (Spring Cleanup)
```

### 1.3 Waste Amount (ONLY if One-Time)

**Step Title:**

> *"How much waste needs to be cleaned up today?"*

**Subtext:**

> *"This helps us schedule enough time and quote fairly. No surprises!"*

**Options:**

| Level       | Label    | Description (visible)                                   | Internal Price Surcharge |
| ----------- | -------- | ------------------------------------------------------- | ------------------------ |
| 🟢 Light    | Light    | "Only a few piles, recently maintained."                | Base Price (\$90)        |
| 🟡 Moderate | Moderate | "Medium build-up, about 1–2 months since last cleanup." | +\$20–30                 |
| 🔴 Heavy    | Heavy    | "Full season accumulation, heavily neglected."          | +\$50–75                 |

**Example UI:**

```
🟢 Light  
( ) Only a few piles, recently maintained.

🟡 Moderate  
( ) Medium build-up, about 1–2 months since last cleanup.

🔴 Heavy  
( ) Full season accumulation, heavily neglected.
```

**Soft Warning Below:**

> *"If conditions are heavier than described, we'll confirm any adjustment before starting — no surprises."*

### 1.4 Number of Dogs

**Options:**

- Numeric stepper input (0–6+)

| Dogs | Surcharge |
| ---- | --------- |
| 1–2  | \$0       |
| 3    | +\$5      |
| 4    | +\$10     |
| 5+   | +\$15     |

**Example UI:**

```
Number of Dogs:
[ - ] 2 [ + ]

(Small note below input:)  
"3 or more dogs may have a small cleaning surcharge."
```

### 1.5 Areas to Clean

**Options:**

-

**Example UI:**

```
Areas to clean:
[x] Front Yard
[x] Back Yard
[ ] Side Yard
[ ] Driveway / Patio
```

### 1.6 Add-Ons

**Options:**

-

**Example UI:**

```
Add-ons:
[x] Enzyme Cleaner (+$18 with service)

(NOTE: Standalone Enzyme Cleaner = $24)
```

---

# Step 2: Schedule & Recurring Options

## Step Title:

> **Choose your first cleaning date!**

## Subtext:

> *"Select your preferred date and we'll handle the rest. If you chose recurring service, we'll keep you fresh on a regular basis!"*

## Fields:

### 2.1 Pick First Service Date

**Calendar Picker:**

- Visual calendar view
- Unavailable days grayed out

### 2.2 Recurrence Pattern

**Summary Display:**

> *"You are booking for: Monday, May 6th, and continuing every Monday."*

If Twice a Week:

- Choose **second day** if possible (default to Monday/Thursday).

---

# Step 3: Customer Information

## Step Title:

> **Tell us about you**

## Fields:

| Field   | Validation                    |
| ------- | ----------------------------- |
| Name    | Required, text only           |
| Phone   | Required, mobile-format input |
| Email   | Required, email format check  |
| Address | Google Places Autocomplete    |

**Example UI:**

```
Name:  [ John Doe ]
Phone:  [ (705) 555-1234 ]
Email:  [ john@email.com ]
Address:  [ 123 Elm Street, Timmins, ON ]
```

---

# Step 4: Referral Code (Optional)

## Step Title:

> **Were you referred by a friend?**

## Field:

- Optional text input for referral code.

**Example UI:**

```
Referral Code:
[ _______ ]

(Small note:)  
"Save $10 when you use a valid referral code!"
```

---

# Step 5: Review & Confirm

## Step Title:

> **Review Your Booking**

## Subtext:

> *"Almost there! Confirm your details below and lock in your clean, fresh yard!"*

## Display Summary:

| Section          | What’s shown                                 |
| ---------------- | -------------------------------------------- |
| Service Selected | Pet Waste Cleanup                            |
| Frequency        | Weekly, Bi-Weekly, Twice a Week, or One-Time |
| Waste Level      | (If applicable)                              |
| Dogs             | Dog count + surcharge                        |
| Areas            | Selected areas                               |
| Add-ons          | Selected extras                              |
| Start Date       | First appointment date                       |
| Recurrence       | Summary of ongoing dates                     |
| Total Price      | Deposit or full price                        |

---

# Step 6: Booking Confirmation

## Step Title:

> 🎉 **You're all booked!**

## Subtext:

> *"Thank you for choosing TidyTrails. We'll be in touch soon!"*

## Post-Booking Display:

- Appointment Summary
- Download Calendar Invite
- Referral Link
- Customer Service Contact (text us to reschedule)

**Example UI:**

```
Thanks, John!
Your first cleanup is scheduled for:
🗓️ Monday, May 6th at 10:00 AM

[ Add to Calendar ]

Earn rewards! Refer friends and earn $10 credits:
[ Copy Your Referral Link ]
```

