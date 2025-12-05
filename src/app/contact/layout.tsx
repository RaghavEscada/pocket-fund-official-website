import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { PAGE_METADATA } from "@/lib/constants";
import { SEO } from "@/components/shared/SEO";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = genMeta(PAGE_METADATA.contact);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Contact", url: `${SITE_CONFIG.url}/contact` },
  ]);

  return (
    <>
      <SEO structuredData={breadcrumbs} />
      {children}
    </>
  );
}





