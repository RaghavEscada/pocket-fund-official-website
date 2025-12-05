export function AboutValues() {
  const values = [
    {
      title: "Integrity",
      description: "We operate with the highest ethical standards in all our dealings.",
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service delivery.",
    },
    {
      title: "Innovation",
      description: "We leverage cutting-edge technology and strategies to serve our clients better.",
    },
    {
      title: "Client-First",
      description: "Your success is our success. We put your interests first, always.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





