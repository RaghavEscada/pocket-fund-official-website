"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconNews,
  IconUsers,
  IconCurrencyDollar,
} from "@tabler/icons-react";

export function BusinessTypesBento() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const IconWrapper = ({ icon: Icon, gradient }: { icon: React.ElementType; gradient: string }) => (
  <div className={`w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
    <Icon className="h-20 w-20 text-white opacity-80" />
  </div>
);

const items = [
  {
    title: "SaaS Businesses",
    description: "B2B SaaS, productivity tools, niche software, and API-based services. Revenue: $5k-$300k MRR, valuations under $10M.",
    header: <IconWrapper icon={IconDeviceDesktop} gradient="from-blue-500 to-blue-600" />,
    className: "md:col-span-2",
    icon: <IconDeviceDesktop className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Mobile Apps",
    description: "iOS and Android applications including utility apps, consumer-focused apps, and AI applications. Revenue: $1k-$150k MRR.",
    header: <IconWrapper icon={IconDeviceMobile} gradient="from-blue-500 to-blue-600" />,
    className: "md:col-span-1",
    icon: <IconDeviceMobile className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Content Sites",
    description: "Niche blog networks, newsletter businesses, and affiliate-driven sites. Revenue: $1k-$150k MRR, valuations $50k-$1M.",
    header: <IconWrapper icon={IconNews} gradient="from-blue-500 to-blue-600" />,
    className: "md:col-span-1",
    icon: <IconNews className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Community Platforms",
    description: "Niche communities, membership sites, Discord servers, and professional networks. Revenue: $2k-$30k MRR.",
    header: <IconWrapper icon={IconUsers} gradient="from-blue-500 to-blue-600" />,
    className: "md:col-span-1",
    icon: <IconUsers className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Fintech & Business Tools",
    description: "Budgeting apps, investment trackers, business calculators, and payment processors. Revenue: $5k-$50k MRR.",
    header: <IconWrapper icon={IconCurrencyDollar} gradient="from-blue-500 to-blue-600" />,
    className: "md:col-span-1",
    icon: <IconCurrencyDollar className="h-4 w-4 text-blue-600" />,
  },
];

