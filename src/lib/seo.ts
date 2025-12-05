import type { Metadata } from "next";

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article";
}

export function generateMetadata(pageSEO: PageSEO): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pocketfund.com";
  
  return {
    title: pageSEO.title,
    description: pageSEO.description,
    keywords: pageSEO.keywords,
    openGraph: {
      title: pageSEO.title,
      description: pageSEO.description,
      type: pageSEO.type || "website",
      url: pageSEO.canonical || siteUrl,
      siteName: "Pocket Fund",
      images: pageSEO.ogImage 
        ? [{ url: `${siteUrl}${pageSEO.ogImage}`, width: 1200, height: 630 }] 
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: pageSEO.title,
      description: pageSEO.description,
      images: pageSEO.ogImage ? [`${siteUrl}${pageSEO.ogImage}`] : undefined,
    },
    alternates: {
      canonical: pageSEO.canonical || siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStructuredData(type: string, data: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

export function generateOrganizationSchema() {
  return generateStructuredData("Organization", {
    name: "Pocket Fund",
    url: "https://pocketfund.com",
    logo: "https://pocketfund.com/logo.png",
    sameAs: [
      "https://www.facebook.com/pocketfund",
      "https://www.twitter.com/pocketfund",
      "https://www.linkedin.com/company/pocketfund",
    ],
  });
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return generateStructuredData("BreadcrumbList", {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}





