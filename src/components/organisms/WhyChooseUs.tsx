// src/components/organisms/WhyChooseUs.tsx
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, PawPrint, CalendarClock, HandHeart, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: <PawPrint className="w-7 h-7 text-tidy-green" />, 
    title: "Pet-Friendly, Always",
    description: "Vet-approved products that are safe for paws, kids, and lawns.",
  },
  {
    icon: <MapPin className="w-7 h-7 text-tidy-green" />, 
    title: "Timmins Proud. Locally Rooted.",
    description: "Fast service, real people, no call centers. We’re from here.",
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-tidy-green" />, 
    title: "Rain or Shine, We’re There",
    description: "Reliable scheduling with friendly, punctual pros.",
  },
  {
    icon: <CalendarClock className="w-7 h-7 text-tidy-green" />, 
    title: "We Scoop on Weekends",
    description: "Life gets busy. We’ll handle it — even on Saturdays.",
  },
  {
    icon: <HandHeart className="w-7 h-7 text-tidy-green" />, 
    title: "$1 Per Visit Goes to SPCA",
    description: "Giving back with every cleanup. Local service that pays it forward.",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-tidy-green" />,
    title: "Sanitized Equipment",
    description: "We take hygiene seriously — all tools are sanitized with organic disinfectant, trusted by kennels and clinics alike."
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-amber-50 px-6 section-spacing">
      <div className="max-w-6xl mx-auto space-y-14">
        <p className="text-base text-gray-700 max-w-xl mx-auto text-center">
          Here’s what makes TidyTrails Timmins’ top choice for poop-free yards.
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-tidy-green text-center relative">
          The TidyTrails Difference
          <span className="block w-12 h-1 bg-tidy-gold mx-auto mt-3 rounded-full" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-12 mt-14">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              className={`flex gap-4 items-start ${idx % 2 === 0 ? 'bg-white' : 'bg-lime-50'}  p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                ""
              } `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="pt-1 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">{reason.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-tidy-blue">{reason.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
