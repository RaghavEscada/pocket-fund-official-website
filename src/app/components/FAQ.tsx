"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of businesses does Pocket Fund acquire?",
    answer: "We focus on profitable small and medium-sized businesses (SMBs) with stable cash flows, typically generating $50K to $5M in annual revenue. Our primary focus areas include SaaS businesses, mobile apps, content sites, community platforms, and fintech tools. We prioritize asset-light, service-based companies with operational upside rather than businesses requiring financial engineering."
  },
  {
    question: "What is your typical investment range?",
    answer: "Pocket Fund targets investments between $50,000 and $5,000,000. We specialize in micro-acquisitions where we can add significant operational value through our operator-led approach. Deal size varies based on revenue, growth potential, and strategic fit with our portfolio."
  },
  {
    question: "How does the acquisition process work?",
    answer: "Our process follows four key stages: (1) Onboarding - We align on buyer criteria and mandate definition, (2) Acquisition Support - We handle sourcing, due diligence, structuring, and negotiation, (3) Operations Setup - We establish systems, reporting, and leadership alignment, (4) Scale & Grow - We execute growth levers with operator accountability. Throughout, we maintain discipline and focus on long-term value creation."
  },
  {
    question: "Do you provide buy-side advisory services?",
    answer: "Yes. Beyond direct acquisitions, we offer comprehensive buy-side advisory services for first-time acquisition entrepreneurs, solo founders seeking inorganic growth, private equity firms, family offices, and indie hackers. We support clients through the entire acquisition lifecycle from deal sourcing to exit preparation."
  },
  {
    question: "What makes Pocket Fund different from other private equity firms?",
    answer: "We combine disciplined capital deployment with operator-led execution. Unlike traditional PE firms focused on financial engineering, we prioritize operational improvements, hands-on management, and sustainable business building. Our team has deep operational experience, and we work closely with portfolio companies to create enduring value rather than short-term optimization."
  },
  {
    question: "How do you source deals?",
    answer: "We maintain proprietary deal flow through multiple channels: inbound inquiries from business owners, outbound outreach to target companies, and our extensive network of operators, advisors, and intermediaries. Our dealflow engine evaluates 50+ opportunities per week, using data-backed screening systems to identify high-quality businesses that fit our investment thesis."
  },
  {
    question: "What happens after you acquire a business?",
    answer: "Post-acquisition, we focus on seamless transition and value creation. We place vetted operators and advisors, establish robust systems and reporting, and execute proven growth frameworks across revenue, cost optimization, systems improvement, and talent development. Our goal is to prepare businesses for institutional buyers through KPI discipline and operational maturity."
  },
  {
    question: "Where is Pocket Fund based?",
    answer: "Pocket Fund is headquartered in Mumbai, India, and operates on a global scale. We work with businesses and buyers worldwide, leveraging our international network and digital-first approach to serve clients regardless of geographic location."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-600">
            Common questions about our approach, process, and services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200 transition-all duration-300 hover:border-neutral-400"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors"
              >
                <h3 className="text-xl font-semibold text-neutral-900 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  <ChevronDown
                    className={`w-6 h-6 text-neutral-900 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 pt-2 border-t border-neutral-100">
                      <p className="text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

