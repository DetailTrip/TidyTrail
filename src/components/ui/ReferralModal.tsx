import React, { useEffect, useState, useCallback } from "react";
import { X, Send, Copy, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface ReferralModalProps {
  code: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ code, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/booking?ref=${code}`;

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-5 relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close referral modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-tidy-green flex items-center justify-center gap-2">
              <Send className="w-6 h-6" /> Refer & Save
            </h2>
            <p className="text-gray-600 text-sm">
              Give your friends <strong>$10 off</strong> their first cleanup — you’ll get <strong>$10 off</strong> too!
            </p>

            {/* Referral link and actions */}
            <div className="bg-muted/10 border border-muted px-4 py-2 rounded-md text-sm font-mono select-all">
              {referralLink}
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 bg-primary hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
              >
                <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy Link"}
              </button>
              <a
                href={`sms:&body=Check out TidyTrails and get $10 off your first cleanup! ${referralLink}`}
                className="flex items-center gap-1 bg-accent hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
              >
                <MessageCircle className="w-4 h-4" /> Send via Text
              </a>
            </div>

            {/* Dismiss */}
            <button
              onClick={onClose}
              className="text-gray-500 text-sm underline pt-2 hover:text-gray-700"
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
