// src/pages/ThankYouPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { useBookingContext } from "@booking/context/BookingContext";
import ReferralModal from "@components/ui/ReferralModal"; // ← updated import

const ThankYouPage: React.FC = () => {
  const { bookingData } = useBookingContext();
  const [showReferral, setShowReferral] = useState(false);

  const firstName = bookingData.firstName?.trim();
  const displayName = firstName || "there";
  const referralCode = bookingData.referralCode || "TIDY10";

  useEffect(() => {
    document.title = "Booking Confirmed | TidyTrails";

    // Show referral modal after 2 seconds
    const timeout = setTimeout(() => {
      setShowReferral(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-tidy-green">
          <PawPrint className="w-16 h-16 mx-auto" strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold text-tidy-green">
          Thanks, {displayName}! 🎉
        </h1>

        <p className="text-gray-700">
          Your cleanup is on our radar! 📅 <br />
          You’ll get a confirmation email or text shortly.
        </p>

        <div className="border-t border-gray-200 pt-6">
          <Link
            to="/"
            className="inline-block bg-tidy-green text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Referral Modal */}
      <ReferralModal
        code={referralCode}
        isOpen={showReferral}
        onClose={() => setShowReferral(false)}
      />
    </section>
  );
};

export default ThankYouPage;
