import React, { useEffect, useState } from "react";
import { Copy, MessageCircle, Smartphone, Facebook, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface ReferralModalProps {
  code: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ code, isOpen, onClose }) => {
  const referralLink = `${window.location.origin}/booking?ref=${code}`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen]);

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

            {/* Link box */}
            <div className="bg-tidy-mist border border-tidy-green rounded px-4 py-2 font-mono text-sm text-tidy-green truncate">
              {referralLink}
            </div>
            {copied && <p className="text-green-700 text-sm">✅ Copied to clipboard!</p>}

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-tidy-green hover:bg-green-800 text-white px-4 py-2 text-sm rounded-lg transition"
              >
                <Copy className="w-4 h-4" /> Copy Link
              </button>
              <a
                href={`https://www.messenger.com/share?link=${encodeURIComponent(referralLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg transition"
              >
                <MessageCircle className="w-4 h-4" /> Messenger
              </a>
              <a
                href={`sms:?&body=${encodeURIComponent(`Check this out: ${referralLink}`)}`}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-lg transition"
              >
                <Smartphone className="w-4 h-4" /> Text a Friend
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Try this: ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE54] text-white px-4 py-2 text-sm rounded-lg transition"
              >
                <Facebook className="w-4 h-4" /> WhatsApp
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
