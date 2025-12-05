"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, FileText, Users, DollarSign } from 'lucide-react';

const businessTypes = [
  {
    icon: Monitor,
    number: '01',
    title: 'SaaS',
    subtitle: 'Software as a Service businesses',
    price: 'Under $10M',
    mrr: '$5k - $300k',
    features: ['B2B SaaS', 'Productivity tools', 'Niche software', 'API-based services'],
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Smartphone,
    number: '02',
    title: 'Mobile Apps',
    subtitle: 'iOS and Android applications',
    price: '$50k - $3M',
    mrr: '$1k - $150k',
    features: ['Utility applications', 'Consumer-focused apps', 'AI apps'],
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: FileText,
    number: '03',
    title: 'Content Sites',
    subtitle: 'Blogs, newsletters, media sites',
    price: '$50k - $1M',
    mrr: '$1k - $150k',
    features: ['Niche blog networks', 'Newsletter businesses', 'Affiliate-driven sites'],
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: Users,
    number: '04',
    title: 'Community Platforms',
    subtitle: 'Forums and social networks',
    price: 'Under $500k',
    mrr: '$2k - $30k',
    features: ['Niche communities', 'Membership sites', 'Discord servers', 'Professional networks'],
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    icon: DollarSign,
    number: '05',
    title: 'Fintech and business tools',
    subtitle: 'Fintech and business utilities',
    price: 'Under $1M',
    mrr: '$5k - $50k',
    features: ['Budgeting applications', 'Investment trackers', 'Business calculators', 'Payment processors'],
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
];

export function BusinessTypes() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
          {/* Left side - Business Type Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-5">
              {businessTypes.map((business, index) => {
                const IconComponent = business.icon;
                return (
                  <motion.div
                    key={business.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-5 p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-white"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${business.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{business.title}</h3>
                      <p className="text-sm text-gray-500">{business.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 text-sm font-semibold tracking-wide uppercase mb-4 block">
              Investment Focus
            </span>
            
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Types of Businesses </span>
              <span className="text-blue-600">We Target</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Specialized focus on high-quality digital businesses with proven revenue models and sustainable competitive advantages.
            </p>

            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Profitable & Cash-flowing</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Strong Fundamentals</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Clear Growth Potential</span>
              </div>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Reviewing Deals Today →
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}





