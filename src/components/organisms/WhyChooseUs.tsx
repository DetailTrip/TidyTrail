// src/components/organisms/WhyChooseUs.tsx
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, PawPrint, CalendarClock, HandHeart, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: <PawPrint className="w-7 h-7 text-primary" />, 
    title: "Pet-Friendly, Always",
    description: "Vet-approved products that are safe for paws, kids, and lawns.",
  },
  {
    icon: <MapPin className="w-7 h-7 text-primary" />, 
    title: "Timmins Proud. Locally Rooted.",
    description: "Fast service, real people, no call centers. We’re from here.",
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-primary" />, 
    title: "Rain or Shine, We’re There",
    description: "Reliable scheduling with friendly, punctual pros.",
  },
  {
    icon: <CalendarClock className="w-7 h-7 text-primary/80" />, 
    title: "We Scoop on Weekends",
    description: "Life gets busy. We’ll handle it — even on Saturdays.",
  },
  {
    icon: <HandHeart className="w-7 h-7 text-primary" />, 
    title: "$1 Per Visit Goes to SPCA",
    description: "Giving back with every cleanup. Local service that pays it forward.",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-primary/80" />,
    title: "Sanitized Equipment",
    description: "We take hygiene seriously — all tools are sanitized with organic disinfectant, trusted by kennels and clinics alike."
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-background px-6 section-spacing">
      <div className="max-w-6xl mx-auto space-y-14">
        <div className="text-center">
          <span className="inline-block text-xs uppercase font-semibold tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-8">
            Why TidyTrails?
          </span>
          <p className="text-base text-muted max-w-xl mx-auto">
            Here’s what makes TidyTrails Timmins’ top choice for poop-free yards.
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-6">
            The TidyTrails Difference
          </h2>
          <span className="block w-12 h-1 bg-accent mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              className={`group flex gap-4 items-start bg-white p-6 rounded-xl shadow-md transition-all duration-300 ${
                idx >= 3 ? "sm:col-span-2 lg:col-span-1 lg:mx-auto" : ""
              } ${idx === 4 ? "border border-accent/40 shadow-accent/20 bg-accent/5" : "hover:shadow-lg hover:-translate-y-1"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="pt-1 flex-shrink-0 group-hover:scale-110 group-hover:-translate-y-[2px] transition-transform duration-200">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary">{reason.title}</h3>
                <p className="text-sm text-muted mt-1">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-10">
          <a
            href="#pricing"
            className="inline-block text-sm font-semibold text-primary underline hover:text-secondary transition"
          >
            See service options & pricing
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
