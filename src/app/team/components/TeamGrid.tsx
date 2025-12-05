export function TeamGrid() {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Chief Executive Officer",
      bio: "20+ years of experience in financial services",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Investment Officer",
      bio: "Expert in portfolio management and strategy",
    },
    {
      name: "Michael Chen",
      role: "Senior Financial Advisor",
      bio: "Specialized in wealth management and planning",
    },
    {
      name: "Emily Davis",
      role: "Financial Analyst",
      bio: "Market research and investment analysis expert",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Meet Our Experts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-3">{member.role}</p>
              <p className="text-sm text-gray-500">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





