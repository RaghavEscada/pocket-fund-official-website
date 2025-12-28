"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  {
    value: '75,000',
    label: 'Strong community around buying businesses',
  },
  {
    value: '2+',
    label: 'Years of experience',
  },
  {
    value: '1M',
    label: 'Impressions per month',
  },
  {
    value: '50+',
    label: 'Deals sourced every week',
  },
];

export function Stats() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium tracking-wide text-neutral-600">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 leading-tight">
              <span className="text-neutral-900">Pocket</span>{' '}
              <span className="text-blue-600">Fund</span>
            </h2>
            <div className="space-y-6 text-lg text-neutral-600 mb-8 leading-relaxed">
              <p>
                At Pocket Fund, we are dedicated to transforming the acquisition landscape for micro digital businesses.
              </p>
              
              <p>
                Headquartered in Mumbai, India, and operating on a global scale, our firm specializes in acquiring small online businesses, targeting investments between $50,000 and $5,000,000.
              </p>
              
              <p>
                With over 2 years of experience, we have honed our expertise in the SaaS, newsletter, and digital content sectors, enabling us to deliver unparalleled results for our portfolio companies.
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white text-lg border border-neutral-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Start Reviewing Deals Today
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </motion.div>

          {/* Right Side - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border-2 border-blue-600 p-6 rounded-3xl hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-neutral-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
