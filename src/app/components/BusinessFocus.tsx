"use client";

const businessTypes = [
  "Profitable SMBs with stable cash flows",
  "Founder-led businesses seeking succession",
  "Asset-light, service or niche-product companies",
  "Businesses with operational upside, not financial engineering",
];

export function BusinessFocus() {
  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-6">
              Types of Businesses We Focus On
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              We maintain disciplined focus on quality over volume. Our investment thesis centers on businesses with proven models and clear paths to value creation.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {businessTypes.map((type, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-neutral-400 font-mono text-sm mt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-xl text-neutral-900 leading-relaxed">
                  {type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


