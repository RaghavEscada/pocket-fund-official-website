"use client";

import {
  IconCurrencyDollar,
  IconHeartHandshake,
  IconSchool,
  IconCalendarEvent,
  IconBriefcase,
  IconUsers,
  IconTrendingUp,
  IconRocket,
} from "@tabler/icons-react";

const benefits = [
  {
    title: "Competitive Salary & Equity Participation",
    description: "Attractive compensation packages with equity participation opportunities",
    icon: IconCurrencyDollar,
  },
  {
    title: "Comprehensive Health Insurance",
    description: "Full health coverage for you and your family",
    icon: IconHeartHandshake,
  },
  {
    title: "Professional Development & Training",
    description: "Continuous learning opportunities and skill development programs",
    icon: IconSchool,
  },
  {
    title: "Flexible Work Arrangements",
    description: "Remote, hybrid, or in-office - choose what works for you",
    icon: IconCalendarEvent,
  },
  {
    title: "Deal Exposure & Learning Opportunities",
    description: "Direct involvement in acquisitions and portfolio management",
    icon: IconBriefcase,
  },
  {
    title: "Generous Paid Time Off",
    description: "Take time to recharge with our generous PTO policy",
    icon: IconUsers,
  },
  {
    title: "Team Building & Company Events",
    description: "Regular team activities and company-wide events",
    icon: IconRocket,
  },
  {
    title: "Career Growth & Advancement",
    description: "Clear career paths and advancement opportunities",
    icon: IconTrendingUp,
  },
];

export function CareersBenefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Benefits & Perks
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive benefits package to support our team members
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={i}
                className="bg-white border border-neutral-200 p-6 hover:border-blue-600 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
