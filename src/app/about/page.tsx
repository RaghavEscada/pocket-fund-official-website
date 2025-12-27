import { About } from "../components/About";
import { Capabilities } from "../components/Capabilities";
import { Process } from "../components/Process";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-semibold text-neutral-900 mb-8">
            About Pocket Fund
          </h1>
          <p className="text-2xl text-neutral-600 leading-relaxed max-w-3xl">
            We are a micro private equity firm combining disciplined capital deployment with operator-led execution.
          </p>
        </div>
      </section>

      {/* Main About Content */}
      <About />
      
      {/* Capabilities */}
      <section className="py-32 bg-neutral-50">
        <Capabilities />
      </section>

      {/* Process */}
      <Process />

      {/* Culture & Standards */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 mb-12">
            Operating Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                Discipline
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Systematic approach to deal evaluation, execution, and value creation with clear decision frameworks.
              </p>
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                Ownership Mindset
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Operator-led perspective focused on sustainable business building, not financial engineering.
              </p>
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                Long-term Value
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Patient capital approach prioritizing enduring value creation over short-term optimization.
              </p>
            </div>
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                Execution Focus
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Hands-on operational involvement with accountability for results, not passive oversight.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
