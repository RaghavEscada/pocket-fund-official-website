"use client";

export function Testimonial() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-white border-2 border-gray-200 shadow-sm">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400 text-center p-8">
                <p className="text-lg mb-2">Team Member Image</p>
                <p className="text-sm">Add testimonial image here</p>
              </div>
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="space-y-6">
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed">
              "At Pocket Fund, we develop exclusively based on the needs of our portfolio companies and entrepreneurs. We involve them in every step of the process - I have never come across that level of collaboration before in private equity."
            </blockquote>
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold text-gray-900">Raghav Krishna</div>
                <div className="text-sm text-gray-600">Pocket Fund Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

