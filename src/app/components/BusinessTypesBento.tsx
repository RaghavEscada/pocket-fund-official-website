"use client";

import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconNews,
  IconUsers,
  IconCurrencyDollar,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const businessDetails = {
  saas: {
    title: "SaaS Businesses",
    icon: IconDeviceDesktop,
    description: "B2B SaaS, productivity tools, niche software, and API-based services.",
    revenue: "$5k-$300k MRR",
    valuations: "Under $10M",
    details: [
      "B2B SaaS platforms with recurring revenue models",
      "Productivity and workflow automation tools",
      "Niche software solutions for specific industries",
      "API-based services and developer tools",
      "Enterprise software with strong customer retention",
      "Platforms with clear expansion opportunities"
    ],
    idealProfile: "Businesses with 50-500 customers, strong unit economics, and clear paths to scale."
  },
  mobile: {
    title: "Mobile Apps",
    icon: IconDeviceMobile,
    description: "iOS and Android applications including utility apps, consumer-focused apps, and AI applications.",
    revenue: "$1k-$150k MRR",
    valuations: "$50k-$2M",
    details: [
      "iOS and Android native applications",
      "Utility apps with daily active users",
      "Consumer-focused apps with engagement metrics",
      "AI-powered mobile applications",
      "Subscription-based mobile services",
      "Apps with in-app purchase revenue"
    ],
    idealProfile: "Apps with 10K+ downloads, positive reviews, and monetization strategies in place."
  },
  content: {
    title: "Content Sites",
    icon: IconNews,
    description: "Niche blog networks, newsletter businesses, and affiliate-driven sites.",
    revenue: "$1k-$150k MRR",
    valuations: "$50k-$1M",
    details: [
      "Niche blog networks with established audiences",
      "Newsletter businesses with subscriber bases",
      "Affiliate-driven content sites",
      "SEO-optimized content properties",
      "Media sites with advertising revenue",
      "Content platforms with community engagement"
    ],
    idealProfile: "Sites with 50K+ monthly visitors, established traffic sources, and multiple revenue streams."
  },
  community: {
    title: "Community Platforms",
    icon: IconUsers,
    description: "Niche communities, membership sites, Discord servers, and professional networks.",
    revenue: "$2k-$30k MRR",
    valuations: "$100k-$500k",
    details: [
      "Niche communities with engaged members",
      "Membership sites with recurring subscriptions",
      "Discord servers with premium tiers",
      "Professional networks and forums",
      "Exclusive communities with high-value content",
      "Platforms with strong community engagement"
    ],
    idealProfile: "Communities with 1K+ active members, high engagement rates, and clear monetization."
  },
  fintech: {
    title: "Fintech & Business Tools",
    icon: IconCurrencyDollar,
    description: "Budgeting apps, investment trackers, business calculators, and payment processors.",
    revenue: "$5k-$50k MRR",
    valuations: "$200k-$1M",
    details: [
      "Budgeting and personal finance apps",
      "Investment tracking and portfolio management tools",
      "Business calculators and financial planning tools",
      "Payment processors and fintech infrastructure",
      "Accounting software for small businesses",
      "Financial data aggregation platforms"
    ],
    idealProfile: "Tools with regulatory compliance, strong security, and clear value propositions."
  },
};

const items = [
  {
    id: "saas" as const,
    title: "SaaS Businesses",
    description: "B2B SaaS, productivity tools, niche software, and API-based services. Revenue: $5k-$300k MRR, valuations under $10M.",
    header: <div className="w-full h-full min-h-[6rem] flex items-center justify-center">
      <IconDeviceDesktop className="h-20 w-20 text-blue-600" />
    </div>,
    className: "md:col-span-2",
    icon: <IconDeviceDesktop className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "mobile" as const,
    title: "Mobile Apps",
    description: "iOS and Android applications including utility apps, consumer-focused apps, and AI applications. Revenue: $1k-$150k MRR.",
    header: <div className="w-full h-full min-h-[6rem] flex items-center justify-center">
      <IconDeviceMobile className="h-20 w-20 text-blue-600" />
    </div>,
    className: "md:col-span-1",
    icon: <IconDeviceMobile className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "content" as const,
    title: "Content Sites",
    description: "Niche blog networks, newsletter businesses, and affiliate-driven sites. Revenue: $1k-$150k MRR, valuations $50k-$1M.",
    header: <div className="w-full h-full min-h-[6rem] flex items-center justify-center">
      <IconNews className="h-20 w-20 text-blue-600" />
    </div>,
    className: "md:col-span-1",
    icon: <IconNews className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "community" as const,
    title: "Community Platforms",
    description: "Niche communities, membership sites, Discord servers, and professional networks. Revenue: $2k-$30k MRR.",
    header: <div className="w-full h-full min-h-[6rem] flex items-center justify-center">
      <IconUsers className="h-20 w-20 text-blue-600" />
    </div>,
    className: "md:col-span-1",
    icon: <IconUsers className="h-4 w-4 text-blue-600" />,
  },
  {
    id: "fintech" as const,
    title: "Fintech & Business Tools",
    description: "Budgeting apps, investment trackers, business calculators, and payment processors. Revenue: $5k-$50k MRR.",
    header: <div className="w-full h-full min-h-[6rem] flex items-center justify-center">
      <IconCurrencyDollar className="h-20 w-20 text-blue-600" />
    </div>,
    className: "md:col-span-1",
    icon: <IconCurrencyDollar className="h-4 w-4 text-blue-600" />,
  },
];

export function BusinessTypesBento() {
  const [selectedBusiness, setSelectedBusiness] = useState<keyof typeof businessDetails | null>(null);

  return (
    <>
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/30 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-4 block">
              Investment Focus
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Types of Businesses </span>
              <span className="text-blue-600">We Target</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Specialized focus on high-quality digital businesses with proven revenue models and sustainable competitive advantages
            </p>
          </div>

          {/* Featured visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-5xl mx-auto"
          >
            <div className="relative h-72 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Collaborative Meeting on Modern Sofa.png"
                alt="Business strategy discussion"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl font-bold drop-shadow-lg">
                  Focused on businesses with proven models and clear paths to growth
                </p>
              </div>
            </div>
          </motion.div>

          <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedBusiness(item.id)}
                className={`cursor-pointer ${item.className}`}
              >
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className="h-full"
                  icon={item.icon}
                />
              </div>
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Modal with Detailed Overview */}
      <AnimatePresence>
        {selectedBusiness && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBusiness(null)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                  const business = businessDetails[selectedBusiness];
                  const IconComponent = business.icon;
                  
                  return (
                    <div className="p-8">
                      {/* Close Button */}
                      <div className="flex justify-end mb-6">
                        <button
                          onClick={() => setSelectedBusiness(null)}
                          className="w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors"
                        >
                          <IconX className="w-6 h-6 text-gray-600" />
                        </button>
                      </div>

                      {/* Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shadow-sm">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            {business.title}
                          </h3>
                          <p className="text-gray-600">{business.description}</p>
                        </div>
                      </div>

                      {/* Revenue & Valuation */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow-sm">
                          <div className="text-sm text-blue-600 font-semibold mb-1">Revenue Range</div>
                          <div className="text-2xl font-bold text-gray-900">{business.revenue}</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 shadow-sm">
                          <div className="text-sm text-blue-600 font-semibold mb-1">Valuation Range</div>
                          <div className="text-2xl font-bold text-gray-900">{business.valuations}</div>
                        </div>
                      </div>

                      {/* What We Look For */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">What We Look For</h4>
                        <ul className="space-y-3">
                          {business.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Ideal Profile */}
                      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Ideal Profile</h4>
                        <p className="text-gray-700 leading-relaxed">{business.idealProfile}</p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
