import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookingContext } from "@booking/context/BookingContext";

/**
 * Auto-applies default booking behaviors:
 * - Pulls referral code from URL and formats it
 * - Clears wasteLevel unless frequency is 'onetime'
 * - Ensures addOns array is always defined
 * - Ensures dogCount defaults to 1
 */
export const useBookingDefaults = () => {
  const { bookingData, updateBooking } = useBookingContext();
  const [searchParams] = useSearchParams();

  // 1. Set referral code from URL param if present
  useEffect(() => {
    const paramReferral = searchParams.get("ref")?.toUpperCase();
    if (paramReferral) {
      updateBooking({ referralCode: paramReferral });
    } else if (bookingData.referralCode) {
      updateBooking({ referralCode: undefined });
    }
  }, [searchParams]);

  // 2. Clear wasteLevel if not needed
  useEffect(() => {
    if (bookingData.frequency !== "onetime" && bookingData.wasteLevel) {
      updateBooking({ wasteLevel: undefined });
    }
  }, [bookingData.frequency, bookingData.wasteLevel]);

  // 3. Default addOns to empty array
  useEffect(() => {
    if (bookingData.addOns === undefined) {
      updateBooking({ addOns: [] });
    }
  }, [bookingData.addOns]);

  // 4. Default dogCount to 1 if undefined
  useEffect(() => {
    if (bookingData.dogCount === undefined) {
      updateBooking({ dogCount: 1 });
    }
  }, [bookingData.dogCount]);
};
