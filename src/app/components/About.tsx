"use client";

export function About() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left Column - Firm Overview */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-8">
              About Pocket Fund
            </h2>
            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
              <p>
                Pocket Fund is a micro private equity firm focused on acquiring and scaling profitable small businesses.
              </p>
              <p>
                We combine disciplined capital deployment with operator-led execution to create sustainable value across our portfolio.
              </p>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:col-span-2 space-y-12">
            <div className="border-t border-neutral-200 pt-6">
              <div className="text-5xl font-semibold text-neutral-900 mb-2">
                2+
              </div>
              <div className="text-neutral-600">
                Years combined experience
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <div className="text-5xl font-semibold text-neutral-900 mb-2">
                75K+
              </div>
              <div className="text-neutral-600">
                Operators & analysts in ecosystem
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <div className="text-5xl font-semibold text-neutral-900 mb-2">
                50+
              </div>
              <div className="text-neutral-600">
                Deals evaluated per week
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <div className="text-5xl font-semibold text-neutral-900 mb-2">
                1M+
              </div>
              <div className="text-neutral-600">
                Monthly impressions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


