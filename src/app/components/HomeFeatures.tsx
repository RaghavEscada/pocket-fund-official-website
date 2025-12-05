export function HomeFeatures() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Investment Management</h3>
            <p className="text-gray-600">Expert portfolio management tailored to your goals</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Financial Planning</h3>
            <p className="text-gray-600">Comprehensive financial strategies for your future</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Wealth Advisory</h3>
            <p className="text-gray-600">Personalized advice from experienced advisors</p>
          </div>
        </div>
      </div>
    </section>
  );
}





