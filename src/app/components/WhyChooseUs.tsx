"use client";

import { motion } from "framer-motion";

const otherFirms = [
  {
    title: "Generic Approach",
    description: "One-size-fits-all acquisition strategies that miss unique opportunities and business-specific nuances.",
  },
  {
    title: "Limited Post-Close Support",
    description: "Buyers are left to navigate operational challenges and growth initiatives with minimal guidance.",
  },
  {
    title: "Transaction-Only Focus",
    description: "Firms focused solely on closing deals without considering long-term value creation and sustainability.",
  },
];

const withPocketFund = [
  {
    title: "Operator-Led Diligence",
    description: "Deep operational insights combined with financial analysis to uncover true business potential and risks.",
  },
  {
    title: "End-to-End Partnership",
    description: "From deal sourcing through exit preparation, we're with you at every stage of the journey.",
  },
  {
    title: "Growth Acceleration",
    description: "Proven playbooks and hands-on execution support to scale profitably and build lasting enterprise value.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-medium tracking-wide text-neutral-600">Why choose us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-tight max-w-4xl mx-auto">
            Expert guidance tailored to your <br />
            business success
          </h2>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Other Firms */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-neutral-200 p-10 md:p-14 rounded-2xl"
          >
            <h3 className="text-3xl font-normal text-neutral-900 mb-12">
              Other Firms
            </h3>
            <div className="space-y-10">
              {otherFirms.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6L5 9L10 3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-neutral-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-neutral-600 leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* With Pocket Fund */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50/30 to-blue-50/10 border-2 border-blue-600 p-10 md:p-14 rounded-2xl relative"
          >
            <h3 className="text-3xl font-normal mb-12">
              <span className="text-neutral-900">With </span>
              <span className="text-neutral-900">Pocket Fund</span>
            </h3>
            <div className="space-y-10">
              {withPocketFund.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-neutral-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-neutral-600 leading-relaxed text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


