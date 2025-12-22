"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Montserrat } from "next/font/google";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconNews,
  IconUsers,
  IconCurrencyDollar,
} from "@tabler/icons-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const IconWrapper = ({ icon: Icon, gradient }: { icon: React.ElementType; gradient: string }) => (
  <div className={`w-full h-full min-h-[8rem] bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
    <Icon className="h-24 w-24 text-white opacity-90 relative z-10" />
  </div>
);

const businessTypesData = [
  {
    id: "saas",
    title: "SaaS Businesses",
    shortDescription: "B2B SaaS, productivity tools, niche software, and API-based services. Revenue: $5k-$300k MRR, valuations under $10M.",
    overview: "Software as a Service (SaaS) businesses represent one of the most attractive investment opportunities in the digital space. We focus on B2B SaaS companies that solve specific problems for businesses, offering recurring revenue models and strong customer retention.",
    revenue: "$5k - $300k MRR",
    valuation: "Under $10M",
    examples: [
      "B2B productivity and collaboration tools",
      "Niche industry-specific software solutions",
      "API-based services and integrations",
      "Developer tools and platforms",
      "Marketing automation software",
      "CRM and sales tools"
    ],
    characteristics: [
      "Recurring subscription revenue model",
      "Strong customer retention (low churn)",
      "Scalable technology infrastructure",
      "Clear value proposition for businesses",
      "Potential for upselling and expansion revenue"
    ],
    whyWeInvest: "SaaS businesses offer predictable recurring revenue, high margins, and strong growth potential. With the right operational support, these companies can scale efficiently and become valuable portfolio assets.",
    icon: IconDeviceDesktop,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    shortDescription: "iOS and Android applications including utility apps, consumer-focused apps, and AI applications. Revenue: $1k-$150k MRR.",
    overview: "Mobile applications have become essential tools for modern consumers and businesses. We target mobile apps with proven user engagement, monetization strategies, and growth potential across iOS and Android platforms.",
    revenue: "$1k - $150k MRR",
    valuation: "$50k - $3M",
    examples: [
      "Utility applications (productivity, tools)",
      "Consumer-focused mobile apps",
      "AI-powered mobile applications",
      "Gaming apps with in-app purchases",
      "Health and fitness tracking apps",
      "Social and communication apps"
    ],
    characteristics: [
      "Strong user engagement metrics",
      "Multiple monetization streams (ads, subscriptions, in-app purchases)",
      "Cross-platform availability (iOS & Android)",
      "Regular updates and feature additions",
      "Growing user base or high retention"
    ],
    whyWeInvest: "Mobile apps offer direct access to billions of users worldwide. With proper optimization, marketing, and feature development, mobile apps can achieve significant revenue growth and become valuable digital assets.",
    icon: IconDeviceMobile,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "content",
    title: "Content Sites",
    shortDescription: "Niche blog networks, newsletter businesses, and affiliate-driven sites. Revenue: $1k-$150k MRR, valuations $50k-$1M.",
    overview: "Content sites represent a stable and often overlooked investment opportunity. We focus on niche content businesses with established audiences, multiple revenue streams, and strong SEO foundations.",
    revenue: "$1k - $150k MRR",
    valuation: "$50k - $1M",
    examples: [
      "Niche blog networks and content sites",
      "Newsletter businesses with paid subscribers",
      "Affiliate-driven content sites",
      "Educational and tutorial websites",
      "Review and comparison sites",
      "Industry-specific content platforms"
    ],
    characteristics: [
      "Established organic traffic from SEO",
      "Multiple revenue streams (ads, affiliates, subscriptions)",
      "Niche expertise and authority",
      "Consistent content production",
      "Strong email list or subscriber base"
    ],
    whyWeInvest: "Content sites offer stable, diversified revenue streams and can be scaled through content expansion, SEO optimization, and strategic monetization. They often have lower operational overhead and strong cash flow.",
    icon: IconNews,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "community",
    title: "Community Platforms",
    shortDescription: "Niche communities, membership sites, Discord servers, and professional networks. Revenue: $2k-$30k MRR.",
    overview: "Community platforms bring together like-minded individuals around shared interests, goals, or professions. We invest in communities with engaged members, clear value propositions, and sustainable monetization models.",
    revenue: "$2k - $30k MRR",
    valuation: "Under $500k",
    examples: [
      "Niche online communities and forums",
      "Membership sites with exclusive content",
      "Discord servers with premium tiers",
      "Professional networks and communities",
      "Hobby and interest-based platforms",
      "Educational communities and courses"
    ],
    characteristics: [
      "Highly engaged and active user base",
      "Strong sense of community and belonging",
      "Multiple monetization options (memberships, courses, events)",
      "Network effects and viral growth potential",
      "Low customer acquisition costs"
    ],
    whyWeInvest: "Community platforms offer unique value through network effects and member engagement. With the right community management and value delivery, these platforms can achieve strong retention and organic growth.",
    icon: IconUsers,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "fintech",
    title: "Fintech & Business Tools",
    shortDescription: "Budgeting apps, investment trackers, business calculators, and payment processors. Revenue: $5k-$50k MRR.",
    overview: "Financial technology and business tools represent a growing sector with high user value and retention. We focus on fintech tools that solve real financial problems for individuals and businesses.",
    revenue: "$5k - $50k MRR",
    valuation: "$100k - $2M",
    examples: [
      "Budgeting and personal finance apps",
      "Investment tracking and portfolio management tools",
      "Business calculators and financial planning tools",
      "Payment processors and financial APIs",
      "Tax preparation and accounting software",
      "Expense tracking and invoicing tools"
    ],
    characteristics: [
      "High user value and retention",
      "Compliance with financial regulations",
      "Strong security and data protection",
      "Multiple revenue models (subscriptions, transaction fees)",
      "Integration potential with other financial services"
    ],
    whyWeInvest: "Fintech tools address critical needs in financial management, offering high user value and strong retention. With proper compliance and security measures, these businesses can scale while maintaining trust and user satisfaction.",
    icon: IconCurrencyDollar,
    gradient: "from-blue-500 to-blue-600",
  },
];

export function BusinessTypesBento() {
  const [selectedBusiness, setSelectedBusiness] = useState<typeof businessTypesData[0] | null>(null);

  const items = businessTypesData.map((business) => ({
    title: business.title,
    // Short description plus a subtle call-to-action to open the modal
    description: (
      <div className="space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
          {business.shortDescription}
        </p>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs font-semibold text-[#366EF3] flex items-center gap-1.5 group-hover/bento:gap-2 transition-all" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            <span>Click to see more details</span>
            <span className="text-sm transform group-hover/bento:translate-x-1 transition-transform">→</span>
          </p>
        </div>
      </div>
    ),
    header: <IconWrapper icon={business.icon} gradient={business.gradient} />,
    className: business.id === "saas" ? "md:col-span-2" : "md:col-span-1",
    icon: <business.icon className="h-5 w-5" style={{ color: '#366EF3' }} />,
    onClick: () => setSelectedBusiness(business),
  }));

  return (
    <>
      <section className={`py-20 bg-white ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <span className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-4 block" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Investment Focus
          </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            <span className="text-gray-900">Types of Businesses </span>
            <span className="text-blue-600">We Target</span>
          </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Specialized focus on high-quality digital businesses with proven revenue models and sustainable competitive advantages
          </p>
        </div>

        <BentoGrid className={`max-w-6xl mx-auto md:auto-rows-[20rem] ${montserrat.variable}`}>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn(item.className, "cursor-pointer hover:scale-[1.02] transition-transform duration-200")}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </BentoGrid>
      </div>
    </section>

      {/* Detailed Modal */}
      {selectedBusiness && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBusiness(null)}
        >
          <div
            className={`bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${montserrat.variable}`}
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedBusiness.gradient} flex items-center justify-center flex-shrink-0`}>
                  <selectedBusiness.icon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  {selectedBusiness.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedBusiness(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Overview
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  {selectedBusiness.overview}
                </p>
              </div>

              {/* Revenue & Valuation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-sm font-medium text-blue-600 mb-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Revenue Range
                  </div>
                  <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {selectedBusiness.revenue}
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-sm font-medium text-blue-600 mb-1" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    Valuation Range
                  </div>
                  <div className="text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {selectedBusiness.valuation}
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Examples
                </h3>
                <ul className="space-y-2">
                  {selectedBusiness.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#366EF3' }} />
                      <span className="text-gray-700 font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        {example}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Characteristics */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Key Characteristics
                </h3>
                <ul className="space-y-2">
                  {selectedBusiness.characteristics.map((characteristic, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#366EF3' }} />
                      <span className="text-gray-700 font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                        {characteristic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why We Invest */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  Why We Invest
                </h3>
                <p className="text-gray-700 leading-relaxed font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                  {selectedBusiness.whyWeInvest}
                </p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={() => setSelectedBusiness(null)}
                  className="px-6 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: '#366EF3', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d5dd9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#366EF3'}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
