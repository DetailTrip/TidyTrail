// src/components/organisms/ReferralPromo.tsx

import React, { useState } from "react";
import { Gift, Copy, Facebook, MessageCircle, Smartphone } from "lucide-react";

interface Props {
  code: string;
}

const ReferralPromo: React.FC<Props> = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/booking?ref=${code}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert("Could not copy. Try manually.");
    }
  };

  return (
    <section className="bg-white border border-yellow-200 rounded-2xl px-6 section-spacing shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-6">

        {/* Headline */}
        <div className="flex items-center gap-2 text-tidy-gold font-bold text-2xl">
          <Gift className="w-7 h-7" aria-hidden="true" />
          <span>Give $10, Get $10</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 max-w-xl text-sm sm:text-base">
          Share your link — your friend gets <strong>$10 off</strong> their first cleanup. You get <strong>$10 off</strong> your next one.
        </p>

        {/* Referral Code */}
        <div className="text-sm text-gray-600 font-medium -mb-2">
          Your referral code:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded font-mono">{code}</code>
        </div>

        {/* Clickable Link */}
        <div className="flex items-center justify-center bg-tidy-mist border border-tidy-green px-5 py-3 rounded-lg shadow-inner w-full max-w-md">
          <a
            href={referralLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-tidy-green text-sm truncate hover:underline cursor-text"
            aria-label="Referral link to share with friends"
          >
            {referralLink}
          </a>
        </div>

        {/* Copy Confirmation */}
        {copied && (
          <p className="text-green-700 font-semibold text-sm" role="status">
            ✅ Link copied! Send it to a friend to start saving.
          </p>
        )}

        {/* Share Buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-tidy-green hover:bg-green-800 text-white px-4 py-2 text-sm rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800"
            aria-label="Copy referral link to clipboard"
          >
            <Copy className="w-4 h-4" /> Copy Link
          </button>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            aria-label="Share referral link on Facebook"
          >
            <Facebook className="w-4 h-4" /> Facebook
          </a>

          <a
            href={`https://www.messenger.com/share?link=${encodeURIComponent(referralLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            aria-label="Share referral link via Facebook Messenger"
          >
            <MessageCircle className="w-4 h-4" /> Messenger
          </a>

          <a
            href={`sms:?&body=${encodeURIComponent(`Check this out: ${referralLink}`)}`}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            aria-label="Send referral link via text message"
          >
            <Smartphone className="w-4 h-4" /> Text a Friend
          </a>
        </div>

        {/* Social Proof Testimonial */}
        <p className="italic text-gray-500 text-xs max-w-xs pt-4">
          “Used my friend’s link and saved $10 — easy win.”<br />
          <span className="text-[10px] text-gray-400">– A happy Timmins customer</span>
        </p>
      </div>
    </section>
  );
};

export default ReferralPromo;
