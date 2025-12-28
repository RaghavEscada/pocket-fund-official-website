"use client";

const steps = [
  {
    number: "01",
    title: "Onboarding",
    description: "Buyer alignment, mandate definition, criteria lock.",
  },
  {
    number: "02",
    title: "Acquisition Support",
    description: "Sourcing → diligence → structuring → negotiation.",
  },
  {
    number: "03",
    title: "Operations Setup",
    description: "Systems, reporting, leadership alignment.",
  },
  {
    number: "04",
    title: "Scale & Grow",
    description: "Execute growth levers with operator accountability.",
  },
];

export function Process() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-4">
            Our Process
          </h2>
          <p className="text-lg text-neutral-600">
            Disciplined, repeatable execution from mandate to scale.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-neutral-200 pt-8"
            >
              {/* Number */}
              <div className="md:col-span-2">
                <span className="text-6xl font-semibold text-neutral-300">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-10">
                <h3 className="text-3xl font-semibold text-neutral-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



