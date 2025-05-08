// src/components/organisms/FAQSection.tsx

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need to be home during the cleanup?",
    answer:
      "Nope! As long as we can access the yard, you don’t need to be home. Just make sure gates are unlocked and pets are secured."
  },
  {
    question: "What if it rains or snows?",
    answer:
      "We still scoop in most weather conditions unless it's dangerous. In extreme cases, we’ll reschedule at no extra cost."
  },
  {
    question: "How do I reschedule or cancel?",
    answer:
      "You can contact us by email or text at least 24 hours in advance to change your appointment."
  },
  {
    question: "Can you handle heavily neglected yards?",
    answer:
      "Yes! Just select 'Heavy' waste level for one-time cleanups. We'll bring extra time and tools."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-neutral-50 py-24 px-6 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-tidy-green mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white"
              >
                <button
                  className="w-full flex items-center justify-between text-left px-6 py-4 text-base md:text-lg font-semibold text-tidy-green hover:bg-gray-100 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-gray-700 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

