"use client";

import {
  IconCurrencyDollar,
  IconSchool,
  IconCalendarEvent,
  IconBriefcase,
  IconUsers,
  IconTrendingUp,
  IconRocket,
  IconStar, // Added for Mentorship & Guidance
} from "@tabler/icons-react";
import { Montserrat } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const benefits = [
  {
    title: "Competitive Salary & Equity",
    description: "Attractive compensation packages with equity participation opportunities",
    icon: IconCurrencyDollar,
  },
  {
    title: "Professional Development",
    description: "Continuous learning opportunities and skill development programs",
    icon: IconSchool,
  },
  {
    title: "Flexible Work",
    description: "Remote, hybrid, or in-office - choose what works for you",
    icon: IconCalendarEvent,
  },
  {
    title: "Deal Exposure",
    description: "Direct involvement in acquisitions and portfolio management",
    icon: IconBriefcase,
  },
  {
    title: "Paid Time Off",
    description: "Take time to recharge with our generous PTO policy",
    icon: IconUsers,
  },
  {
    title: "Team Events",
    description: "Regular team activities and company-wide events",
    icon: IconRocket,
  },
  {
    title: "Career Growth",
    description: "Clear career paths and advancement opportunities",
    icon: IconTrendingUp,
  },
  {
    title: "Mentorship & Guidance",
    description: "Access to experienced leaders and personalized career mentorship",
    icon: IconStar,
  },
];

export function CareersBenefits() {
  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-white ${montserrat.variable}`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            Benefits & Perks
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-normal" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            We offer a comprehensive benefits package to support our team members
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" style={{ gridAutoRows: '1fr' }}>
          {benefits.map((benefit, i) => {
            const IconComponent = benefit.icon;
            return (
              <Card
                key={i}
                className="border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all rounded-2xl h-full flex flex-col"
              >
                <CardContent className="p-6 flex flex-col h-full flex-grow">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 flex-shrink-0" style={{ backgroundColor: 'rgba(54, 110, 243, 0.1)' }}>
                    <IconComponent className="w-6 h-6" style={{ color: '#366EF3' }} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex-shrink-0" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light flex-grow" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
