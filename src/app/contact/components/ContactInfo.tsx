import { SITE_CONFIG } from "@/lib/constants";

export function ContactInfo() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Email</h3>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-[#005f2a] hover:underline"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold mb-4">Address</h3>
            <p className="text-gray-700">
              {SITE_CONFIG.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

