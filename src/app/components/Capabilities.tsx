"use client";

const capabilities = [
  {
    title: "Micro-Acquisitions",
    description: "Control and significant minority investments in cash-flowing digital businesses.",
  },
  {
    title: "Buy-Side Advisory",
    description: "Supporting serious buyers through end-to-end acquisition processes.",
  },
  {
    title: "Dealflow Engine",
    description: "Data-backed sourcing and screening systems delivering consistent opportunities.",
  },
  {
    title: "Operator Placement",
    description: "Matching deals with execution-ready operators for seamless transitions.",
  },
  {
    title: "Growth Acceleration",
    description: "Hands-on post-acquisition execution focused on revenue and margin expansion.",
  },
  {
    title: "Exit Readiness",
    description: "Preparing assets for institutional buyers through process discipline and reporting maturity.",
  },
];

export function Capabilities() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-4">
            What We Do
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Clarifying positioning beyond &ldquo;fund&rdquo;—we are operators, advisors, and capital partners.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {capabilities.map((capability, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {capability.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

