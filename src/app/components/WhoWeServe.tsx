"use client";

const audiences = [
  {
    title: "First-time acquisition entrepreneurs",
    description: "Individuals seeking to build wealth through business ownership with structured support.",
  },
  {
    title: "Solo founders seeking inorganic growth",
    description: "Operators looking to expand through strategic acquisitions and consolidation.",
  },
  {
    title: "Private equity and family offices",
    description: "Institutional investors deploying capital in the micro-cap space with operational oversight.",
  },
  {
    title: "Indie hackers acquiring cash-flow businesses",
    description: "Technical founders transitioning from building to buying profitable digital assets.",
  },
];

export function WhoWeServe() {
  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            We partner with serious buyers committed to long-term value creation.
          </p>
        </div>

        {/* Audience List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {audiences.map((audience, index) => (
            <div key={index} className="border-t border-neutral-300 pt-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                {audience.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


