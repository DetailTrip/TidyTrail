import React, { useState } from "react";
import { Gift } from "lucide-react";
import ReferralModal from "../ui/ReferralModal";

interface PromoBarProps {
  referralCode: string;
}


const PromoBar: React.FC<PromoBarProps> = ({ referralCode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-yellow-50 border border-tidy-gold rounded-xl px-4 py-4 shadow-sm text-tidy-green text-center">
  <div className="inline-flex items-center justify-center gap-2 text-sm md:text-base font-semibold">
    <Gift className="w-5 h-5 text-tidy-gold" />
    <span>
      Give <strong>$10</strong>, Get <strong>$10</strong> —{" "}
      <button
        onClick={() => setShowModal(true)}
        className="underline underline-offset-2 hover:text-primary transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Invite a friend
      </button>
    </span>
  </div>
</div>


      {/* Shared referral modal */}
      <ReferralModal
        code={referralCode}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default PromoBar;
