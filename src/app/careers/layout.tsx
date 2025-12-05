import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { PAGE_METADATA } from "@/lib/constants";
import { SEO } from "@/components/shared/SEO";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = genMeta(PAGE_METADATA.careers);

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Careers", url: `${SITE_CONFIG.url}/careers` },
  ]);

  return (
    <>
      <SEO structuredData={breadcrumbs} />
      {children}
    </>
  );
}





