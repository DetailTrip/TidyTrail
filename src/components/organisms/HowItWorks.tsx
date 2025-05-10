// src/components/organisms/HowItWorks.tsx
import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, Sparkles, Smile } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <>
      <div className="h-6 bg-gradient-to-t from-background to-white w-full -mt-6"></div>
      <section className="bg-white px-6 section-spacing border-t border-gray-100">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="inline-block text-xs uppercase font-semibold tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
              How It Works
            </span>
            <p className="text-base text-muted text-center max-w-xl mx-auto">
              Simple steps, spotless results.
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              How TidyTrails Works
            </h2>
            <motion.div
              className="w-16 h-1 bg-accent mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
              style={{ originX: 0 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-10 text-left">
            {[
              {
                icon: (<MousePointerClick className="w-8 h-8 text-white" />),
                label: "Step 1",
                title: "Choose Your Plan",
                desc: "Pick your plan, yard size, and first service date — all in under 60 seconds.",
              },
              {
                icon: (<Sparkles className="w-8 h-8 text-white" />),
                label: "Step 2",
                title: "We Do the Dirty Work",
                desc: "Our trained team arrives on time, removes all the waste, and sanitizes if needed.",
              },
              {
                icon: (<Smile className="w-8 h-8 text-white" />),
                label: "Step 3",
                title: "Relax in a Clean, Safe Yard",
                desc: "Guaranteed no poop left behind. Your grass is family ready.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start space-y-4 bg-muted/5 p-5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white text-xl font-medium shadow-md ring-1 ring-accent/30">
                    {step.icon}
                  </div>
                  <div className="text-xs font-semibold text-muted uppercase">
                    {step.label}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-secondary">{step.title}</h3>
                <p className="text-sm text-muted/80 leading-relaxed max-w-xs text-center md:text-left">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="pt-12">
            <div className="h-[2px] w-16 bg-accent/30 mx-auto mb-6"></div>
            <div className="text-center">
              <a
                href="#pricing"
                className="inline-block text-sm font-semibold text-primary underline hover:text-secondary transition"
              >
                Choose your plan
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
