export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-semibold text-neutral-900 mb-8">
            Contact
          </h1>
          <p className="text-2xl text-neutral-600 leading-relaxed max-w-3xl">
            Reach out to discuss partnership opportunities, deal flow, or acquisition support.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left - Contact Details */}
            <div className="space-y-12">
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">
                  Email
                </h3>
                <a 
                  href="mailto:hello@pocket-fund.com"
                  className="text-2xl text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  hello@pocket-fund.com
                </a>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">
                  Location
                </h3>
                <p className="text-2xl text-neutral-900">
                  Mumbai, India
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">
                  Connect
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://www.linkedin.com/company/pocket-fund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xl text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/microsearchfund"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xl text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://www.instagram.com/devlikesbizness/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xl text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Inquiry Form */}
            <div>
              <h2 className="text-3xl font-semibold text-neutral-900 mb-8">
                Send an Inquiry
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm uppercase tracking-wider text-neutral-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm uppercase tracking-wider text-neutral-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm uppercase tracking-wider text-neutral-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm uppercase tracking-wider text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 border border-neutral-900 text-neutral-900 font-medium tracking-wide hover:bg-neutral-900 hover:text-white transition-colors duration-200"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
