"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function WhatWeOffer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do you offer any remote work opportunities?",
      answer: "Yes! We offer flexible work arrangements including fully remote, hybrid, and in-office options. We believe in work-life balance and trust our team to deliver results regardless of location."
    },
    {
      question: "What are some of the challenges and rewards of working at your company?",
      answer: "Working at Pocket Fund means being part of a fast-paced, high-growth environment. Challenges include managing multiple deals simultaneously and adapting to market changes. The rewards are immense - you'll gain deep expertise in private equity, work with cutting-edge businesses, and have direct impact on company growth and success."
    },
    {
      question: "What are some of your milestones and achievements so far?",
      answer: "Since our founding, we've successfully acquired and managed multiple portfolio companies, generated significant returns for our investors, and built a reputation as a leading micro private equity firm. We've closed deals across SaaS, mobile apps, content sites, and fintech sectors, with a track record of successful exits."
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            What we offer
          </h2>
          <p className="text-xl text-gray-500 italic">
            when working at Pocket Fund
          </p>
        </div>

        <div className="max-w-4xl">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
            We're a micro private equity firm based in Mumbai, India. Our team's experience spans a variety of backgrounds and disciplines, from investment banking and private equity to technology and operations. We work as a cohesive team that collectively develops and delivers solutions to help entrepreneurs and funds build wealth through strategic micro-acquisitions.
          </p>

          {/* FAQ Section */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left py-4 hover:text-blue-600 transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <Minus className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </button>
                {openFaq === index && (
                  <div className="mt-2 text-gray-600 leading-relaxed animate-in slide-in-from-top-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

