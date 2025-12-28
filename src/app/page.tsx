import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { generateMetadata as genMeta } from "@/lib/seo";
import { PAGE_METADATA } from "@/lib/constants";
import { SEO } from "@/components/shared/SEO";
import { generateOrganizationSchema } from "@/lib/seo";
import { HomeHero } from "./components/HomeHero";
import { Stats } from "./components/Stats";
import { WhatWeDo } from "./components/WhatWeDo";
import { KeyBenefits } from "./components/KeyBenefits";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { BusinessTypesBento } from "./components/BusinessTypesBento";
import { HowWeWork } from "./components/HowWeWork";
import { FAQ } from "./components/FAQ";
import { Testimonials } from "./components/Testimonials";

// Lazy load heavy components that are below the fold
const WorldMapSection = dynamic(() => import("./components/WorldMapSection").then(mod => ({ default: mod.WorldMapSection })), {
  loading: () => <div className="py-40 bg-white w-full" />
});

export const metadata: Metadata = genMeta(PAGE_METADATA.home);

export default function HomePage() {
  const structuredData = generateOrganizationSchema();

  return (
    <>
      <SEO structuredData={structuredData} />
      <HomeHero />
      <Stats />
      <WhatWeDo />
      <KeyBenefits />
      <WhyChooseUs />
      <BusinessTypesBento />
      <HowWeWork />
      <FAQ />
      <Testimonials />
      <WorldMapSection />
    </>
  );
}
