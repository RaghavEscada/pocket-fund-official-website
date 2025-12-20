"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
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
import React from "react";

const IconWrapper = ({ icon: Icon, gradient }: { icon: React.ElementType; gradient: string }) => (
  <div className={`w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
    <Icon className="h-16 w-16 text-white opacity-90" />
  </div>
);

const benefits = [
  {
    title: "Competitive Salary & Equity Participation",
    description: "Attractive compensation packages with equity participation opportunities",
    icon: IconCurrencyDollar,
    className: "md:col-span-2",
  },
  {
    title: "Comprehensive Health Insurance",
    description: "Full health coverage for you and your family",
    icon: IconHeartHandshake,
    className: "md:col-span-1",
  },
  {
    title: "Professional Development & Training",
    description: "Continuous learning opportunities and skill development programs",
    icon: IconSchool,
    className: "md:col-span-1",
  },
  {
    title: "Flexible Work Arrangements",
    description: "Remote, hybrid, or in-office - choose what works for you",
    icon: IconCalendarEvent,
    className: "md:col-span-1",
  },
  {
    title: "Deal Exposure & Learning Opportunities",
    description: "Direct involvement in acquisitions and portfolio management",
    icon: IconBriefcase,
    className: "md:col-span-2",
  },
  {
    title: "Generous Paid Time Off",
    description: "Take time to recharge with our generous PTO policy",
    icon: IconUsers,
    className: "md:col-span-1",
  },
  {
    title: "Team Building & Company Events",
    description: "Regular team activities and company-wide events",
    icon: IconRocket,
    className: "md:col-span-1",
  },
  {
    title: "Career Growth & Advancement",
    description: "Clear career paths and advancement opportunities",
    icon: IconTrendingUp,
    className: "md:col-span-1",
  },
];

export function CareersBenefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Benefits & Perks
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive benefits package to support our team members
          </p>
        </div>

        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[18rem]">
          {benefits.map((benefit, i) => {
            const IconComponent = benefit.icon;
            return (
              <BentoGridItem
                key={i}
                title={benefit.title}
                description={benefit.description}
                header={<IconWrapper icon={IconComponent} gradient="from-blue-500 to-blue-600" />}
                className={`${benefit.className} border-2 border-blue-600 hover:border-blue-700`}
                icon={<IconComponent className="h-4 w-4 text-blue-600" />}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}





