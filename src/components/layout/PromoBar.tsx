import React, { useState } from "react";
import { Copy, Gift } from "lucide-react";

interface PromoBarProps {
  referralCode: string;
}

const PromoBar: React.FC<PromoBarProps> = ({ referralCode }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/booking?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert("Could not copy. Please try manually.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 via-tidy-gold/70 to-yellow-50 text-tidy-green text-sm sm:text-base py-3 px-4 sm:px-6 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-medium shadow-md rounded-b-md">
      <span className="flex items-center gap-1">
        <Gift className="w-4 h-4" />
        💥 Give <span className="font-bold">$10</span>, Get <span className="font-bold">$10</span> — Share your link!
      </span>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1 bg-white text-tidy-green font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-100 transition text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-tidy-green"
        aria-label="Copy referral link"
      >
        <Copy className="w-4 h-4" />
        Copy Link
      </button>

      {copied && (
        <span className="text-green-700 font-semibold text-sm">
          ✅ Link copied!
        </span>
      )}
    </div>
  );
};

export default PromoBar;

