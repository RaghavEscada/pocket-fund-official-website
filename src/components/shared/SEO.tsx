import Script from "next/script";

interface SEOProps {
  structuredData?: Record<string, any> | Record<string, any>[];
}

export function SEO({ structuredData }: SEOProps) {
  if (!structuredData) return null;

  const data = Array.isArray(structuredData) ? structuredData : [structuredData];

  return (
    <>
      {data.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </>
  );
}

