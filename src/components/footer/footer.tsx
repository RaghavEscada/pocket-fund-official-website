"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Process", href: "/#timeline" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white h-screen flex flex-col justify-between overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="/Logo/pflogobg.webp"
                alt="Pocket Fund Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">Pocket Fund</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              We love deals.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering entrepreneurs and funds to build wealth through strategic micro-acquisitions. From deal sourcing to operator placement, we handle the complexity so you can focus on growth.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="https://www.linkedin.com/company/pocketfund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link
                href="https://www.twitter.com/pocketfund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/@pocketfund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm">{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400 text-sm">24/7 Deal Flow</span>
              </li>
            </ul>

            <div className="mt-4 space-y-2">
              <Link
                href="/contact"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm"
              >
                Get in Touch
              </Link>
              <button className="block w-full text-center border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm">
                Book a Call
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-4 mb-4">
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
            <span className="font-semibold text-gray-400">Disclaimer:</span> Pocket Fund provides advisory and consulting services to buyers of small and mid-sized businesses. We are not a registered broker-dealer, investment adviser, or law firm, and nothing on this website constitutes legal, tax, investment, or financial advice. All content is for informational purposes only and may not be complete or up-to-date. Engagements are governed solely by executed agreements. Use of this website is at your own risk; Pocket Fund is not liable for any losses arising from reliance on the information provided.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Pocket Fund. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Large Brand Text - Grounded at Bottom */}
      <div className="w-full pb-0">
        <h2 className="text-5xl md:text-6xl lg:text-[15rem] font-bold text-center bg-gradient-to-r from-gray-800 via-gray-700 pt-0 to-gray-800 bg-clip-text text-transparent tracking-tighter leading-none whitespace-nowrap">
          POCKET FUND
        </h2>
      </div>
    </footer>
  );
}

