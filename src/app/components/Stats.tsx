"use client";

import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  {
    icon: Users,
    value: '75,000',
    label: 'Strong community around buying businesses',
  },
  {
    icon: Calendar,
    value: '2+',
    label: 'Years of experience',
  },
  {
    icon: TrendingUp,
    value: '1M',
    label: 'Impressions per month',
  },
  {
    icon: Target,
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
            <div className="inline-flex items-center gap-2 border border-blue-200 rounded-full px-4 py-2 mb-8 bg-blue-50">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium uppercase tracking-wider text-blue-600">ABOUT US</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-blue-600">Pocket</span><br /><span className="text-gray-900">Fund</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 mb-8">
              <p>
                At <span className="text-blue-600 font-semibold">Pocket Fund</span>, we are dedicated to transforming the 
                acquisition landscape for micro digital businesses.
              </p>
              
              <p>
                Headquartered in <span className="text-blue-600 font-semibold">Mumbai, India</span>, and operating on a global 
                scale, our firm specializes in acquiring small online businesses, targeting investments between{' '}
                <span className="text-blue-600 font-semibold">$50,000 and $5,000,000</span>.
              </p>
              
              <p>
                With over <span className="text-blue-600 font-semibold">2 years of experience</span>, we have honed our 
                expertise in the SaaS, newsletter, and digital content sectors, enabling us to deliver unparalleled 
                results for our portfolio companies.
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg">
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
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <stat.icon className="text-blue-600" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

