// src/pages/ThankYouPage.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { useBookingContext } from "@booking/context/BookingContext";
import ReferralModal from "@components/ui/ReferralModal";

const ThankYouPage: React.FC = () => {
  const { bookingData } = useBookingContext();
  const [showReferral, setShowReferral] = useState(false);

  const firstName = bookingData.firstName?.trim();
  const displayName = firstName || "there";
  const referralCode = bookingData.referralCode || "TIDY10";

  useEffect(() => {
    document.title = "Booking Confirmed | TidyTrails";

    const timeout = setTimeout(() => {
      setShowReferral(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-16">
      <div className="max-w-md w-full space-y-10">
        {/* Confirmation Icon */}
        <div className="text-tidy-green">
          <PawPrint className="w-16 h-16 mx-auto" strokeWidth={1.5} />
        </div>

        {/* Main Thank You */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-tidy-green">
            Thanks, {displayName}! 🎉
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed">
            Your cleanup is on our radar! 📅<br />
            You’ll get a confirmation email or text shortly.
          </p>
        </div>

        {/* Divider + Back Button */}
        <div className="pt-6 border-t border-border">
          <Link
            to="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            Back to Home
          </Link>
        </div>

        {/* Referral Share Section */}
        <section className="space-y-3 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold">📣 Share & Save</h3>
          <p className="text-sm text-muted">
            Love what we do? Share your referral code and both you and a friend will save.
          </p>
        </section>
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
