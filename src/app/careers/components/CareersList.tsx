export function CareersList() {
  const positions = [
    {
      title: "Senior Financial Advisor",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead client relationships and develop comprehensive financial plans.",
    },
    {
      title: "Investment Analyst",
      location: "Remote",
      type: "Full-time",
      description: "Analyze market trends and provide investment recommendations.",
    },
    {
      title: "Client Relations Manager",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Manage client communications and ensure exceptional service delivery.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Open Positions</h2>
        <div className="space-y-6">
          {positions.map((position, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{position.title}</h3>
                  <div className="flex gap-4 text-gray-600">
                    <span>{position.location}</span>
                    <span>•</span>
                    <span>{position.type}</span>
                  </div>
                </div>
                <button className="bg-[#005f2a] text-white px-6 py-2 rounded-full hover:bg-[#003d1f] transition-colors">
                  Apply
                </button>
              </div>
              <p className="text-gray-700">{position.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





