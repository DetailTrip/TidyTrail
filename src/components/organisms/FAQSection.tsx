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
    <section className="bg-white py-16 px-6 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-tidy-green mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between text-left p-4 text-lg font-medium text-tidy-green hover:bg-tidy-mist focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-gray-700 text-sm">
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
