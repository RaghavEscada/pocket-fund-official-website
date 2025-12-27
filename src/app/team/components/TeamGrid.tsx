export function TeamGrid() {
  const teamMembers = [
    {
      name: "Dev",
      role: "Engineering & Systems",
      description: "Technical infrastructure and operational systems.",
    },
    {
      name: "Aadarsh",
      role: "Deal Sourcing & Analysis",
      description: "Deal origination and financial analysis.",
    },
    {
      name: "Aniket",
      role: "Operations & Execution",
      description: "Portfolio operations and growth execution.",
    },
  ];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-20">
          Team
        </h2>
        <div className="grid md:grid-cols-3 gap-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="border-t border-neutral-200 pt-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                {member.name}
              </h3>
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-3">
                {member.role}
              </p>
              <p className="text-neutral-600 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
