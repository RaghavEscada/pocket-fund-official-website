export function CareersBenefits() {
  const benefits = [
    "Competitive Salary & Bonus Structure",
    "Comprehensive Health Insurance",
    "401(k) Retirement Plan",
    "Professional Development Opportunities",
    "Flexible Work Arrangements",
    "Generous Paid Time Off",
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Benefits & Perks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg font-medium">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





