import React, { useEffect, useState, useCallback, useRef } from "react";
import { X, Send, Copy, MessageCircle, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface ReferralModalProps {
  code: string;
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ code, isOpen, onClose, id }) => {
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const referralLink = `${window.location.origin}/booking?ref=${code}`;

  // Confetti on open
  useEffect(() => {
    if (isOpen) {
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Focus close button on open
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Could not copy. Try manually.");
    }
  }, [referralLink]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      await navigator.share({
        title: "TidyTrails Referral",
        text: "Get $10 off your first cleanup with TidyTrails!",
        url: referralLink,
      });
    } else {
      // Fallback to SMS link
      window.location.href = `sms:&body=Check out TidyTrails and get $10 off your first cleanup! ${referralLink}`;
    }
  }, [referralLink]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="referral-heading"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-5 relative"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Close referral modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Heading */}
            <h2
              id="referral-heading"
              className="text-2xl md:text-3xl font-bold text-tidy-green flex items-center justify-center gap-2"
            >
              <Send className="w-6 h-6" aria-hidden="true" />
              Get $10 When You Refer a Friend
            </h2>

            {/* Subtext */}
            <p className="text-gray-700 text-base">
              Give your friends <strong>$10 off</strong> their first cleanup and you’ll get <strong>$10 off</strong> too!
            </p>

            {/* Referral link */}
            <div
              role="textbox"
              aria-readonly="true"
              className="bg-muted/10 border border-accent/30 px-4 py-2 rounded-md text-sm font-mono select-all"
            >
              {referralLink}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="flex-1 min-w-[120px] flex items-center justify-center gap-1 bg-accent hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Copy className="w-4 h-4" aria-hidden="true" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 min-w-[120px] flex items-center justify-center gap-1 bg-accent hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Share2 className="w-4 h-4" aria-hidden="true" /> Share
              </button>
            </div>

            {/* ARIA-live confirmation */}
            <div aria-live="polite" className="sr-only">
              {copied && "Referral link copied to clipboard."}
            </div>

            {/* Dismiss */}
            <button
              onClick={onClose}
              className="text-gray-700 underline px-2 py-1 text-sm hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              No thanks, maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReferralModal;
