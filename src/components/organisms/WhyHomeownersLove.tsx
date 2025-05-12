import React from "react";
import { motion } from "framer-motion";
import {
  PawPrint,
  MapPin,
  CalendarClock,
  HandHeart,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const mergedReasons = [
  {
    icon: <PawPrint className="w-8 h-8 text-primary" />,
    title: "Pet-Friendly, Always",
    description: "Vet-approved products safe for paws, kids, and lawns.",
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Locally Owned & Timmins Proud",
    description: "Fast service from people who live here — no call centers.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Rain or Shine, We’re There",
    description: "Reliable, on-time service with zero no-shows.",
  },
  {
    icon: <CalendarClock className="w-8 h-8 text-primary/80" />,
    title: "Weekend Cleanups Available",
    description: "We scoop Saturdays — because life gets busy.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary/80" />,
    title: "Sanitized Equipment",
    description: "All tools are disinfected after every job — kennel-level clean.",
  },
  {
    icon: <HandHeart className="w-8 h-8 text-primary" />,
    title: "$1 Per Visit to Timmins SPCA",
    description: "Giving back with every scoop. Local service that gives back.",
  },
];

const WhyHomeownersLove: React.FC = () => {
  const scrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("pricing");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-sectionAlt section-spacing px-6">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-block text-xs uppercase font-semibold tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full mb-8">
            Local Trust. Real Benefits.
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            The Poop-Free Perks of Choosing TidyTrails
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto mt-4">
            Built in Timmins. Trusted by your neighbors. Backed by real values.
          </p>
          <span className="block w-12 h-1 bg-accent mx-auto mt-6 rounded-full" />
        </div>

        {/* Benefits List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {mergedReasons.map((item, idx) => (
            <motion.li
              key={idx}
              className="group flex gap-4 items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="pt-1 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:-translate-y-[2px] transition-transform duration-200">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary">{item.title}</h3>
                <p className="text-sm text-muted mt-1">{item.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Soft CTA footer */}
        <div className="text-center pt-10">
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="inline-block text-tidy-green hover:underline font-semibold transition"
          >
            View Plans & Pricing →
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyHomeownersLove;
