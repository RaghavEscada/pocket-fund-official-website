import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { generateMetadata as genMeta } from "@/lib/seo";
import { PAGE_METADATA } from "@/lib/constants";
import { SEO } from "@/components/shared/SEO";
import { generateOrganizationSchema } from "@/lib/seo";
import { HomeHero, Stats, WhatWeDo, BusinessTypesBento, HowWeWork } from "./index";
import { HomePageLoader } from "./components/HomePageLoader";

// Lazy load heavy components that are below the fold
const WorldMapSection = dynamic(() => import("./components/WorldMapSection").then(mod => ({ default: mod.WorldMapSection })), {
  loading: () => <div className="py-40 bg-white w-full" />
});

export const metadata: Metadata = genMeta(PAGE_METADATA.home);

export default function HomePage() {
  const structuredData = generateOrganizationSchema();

  return (
    <>
      <HomePageLoader />
      <SEO structuredData={structuredData} />
      <HomeHero />
      <Stats />
      <WhatWeDo />
      <BusinessTypesBento />
      <HowWeWork />
      <WorldMapSection />
    </>
  );
}
