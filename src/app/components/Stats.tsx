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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-2 mb-8 bg-neutral-50">
              <span className="text-sm font-medium uppercase tracking-wider text-neutral-700">ABOUT US</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-gray-900">Pocket</span>{' '}
              <span className="text-blue-600">Fund</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 mb-8">
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
              <Button size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white text-lg border border-neutral-900">
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
                className="bg-white border-2 border-blue-600 p-6 hover:shadow-md transition-all"
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
