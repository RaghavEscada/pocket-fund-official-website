"use client";

const services = [
  {
    title: "Deal Sourcing",
    description: "Proprietary deal flow through inbound, outbound, and network-driven origination.",
  },
  {
    title: "Due Diligence",
    description: "Financial, operational, and risk-focused diligence with operator insight.",
  },
  {
    title: "Deal Structuring & Negotiation",
    description: "Buyer-aligned structuring, valuation discipline, and closing support.",
  },
  {
    title: "Transition & Operator Placement",
    description: "Seamless post-close transitions with vetted operators and advisors.",
  },
  {
    title: "Growth Playbook",
    description: "Proven execution frameworks across revenue, cost, systems, and talent.",
  },
  {
    title: "Exit Preparation",
    description: "KPI discipline, reporting maturity, and buyer-ready positioning.",
  },
];

export function CoreServices() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-4">
            Core Services
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Full investment lifecycle capability from origination to exit.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {services.map((service, index) => (
            <div key={index} className="border-t border-neutral-200 pt-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
