import React, { useState, useCallback } from "react";
import { Copy, Gift, Send } from "lucide-react";

interface ReferralCardProps {
  referralCode: string;
  compact?: boolean;
  title?: string;
  description?: string;
}

const ReferralCard: React.FC<ReferralCardProps> = ({
  referralCode,
  compact = false,
  title = "Give $10, Get $10",
  description = "Share your link and you both save on your next poop-free service!",
}) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/booking?ref=${referralCode}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert("Could not copy. Try manually.");
    }
  }, [referralLink]);

  return (
    <div
      className={`bg-tidy-mist border border-tidy-green rounded-xl p-4 ${
        compact ? "flex items-center justify-between gap-4" : "space-y-4 text-center"
      }`}
    >
      {!compact && (
        <>
          <h3 className="text-lg font-bold text-tidy-green flex justify-center items-center gap-2">
            <Send className="w-5 h-5" /> {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </>
      )}

      <div className="bg-white rounded px-4 py-2 font-mono text-sm text-tidy-green truncate border border-gray-300">
        {referralLink}
      </div>

      <div className={`${compact ? "" : "pt-2"} flex justify-center`}>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 bg-tidy-green hover:bg-green-800 text-white px-3 py-1.5 rounded-full text-sm transition"
          aria-label="Copy referral link"
        >
          <Copy className="w-4 h-4" />
          Copy Link
        </button>
      </div>

      {copied && (
        <p className="text-green-700 text-sm font-semibold" role="status" aria-live="polite">
          ✅ Link copied!
        </p>
      )}
    </div>
  );
};

export default ReferralCard;
