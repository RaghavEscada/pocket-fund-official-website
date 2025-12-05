"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const menulinks = [
  { path: "/", label: "HOME " },
  { path: "/about", label: "ABOUT " },
  { path: "/team", label: "TEAM " },
  { path: "/careers", label: "CAREERS " },
  { path: "/blog", label: "BLOG " },
  { path: "/contact", label: "CONTACT " },
];

const Menu = () => {
  const container = useRef(null);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!mounted) return;

    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        duration: 0.5,
        x: 0,
        ease: "power3.out",
      });

      gsap.fromTo(
        ".menu-link",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, {
        duration: 0.5,
        x: "-100%",
        ease: "power3.in",
      });
    }
  }, [isMenuOpen, mounted]);

  // Return null or loading state before client-side hydration
  if (!mounted) {
    return null; // Or a loading skeleton
  }

  return (
    <div ref={container} className="relative">
      <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <Image
              src="/Logo/pflogobg.webp"
              alt="Pocket Fund Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              loading="lazy"
            />
          </Link>
          <span className="text-xl font-bold text-gray-900">Pocket Fund</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer uppercase text-sm tracking-wider text-blue-600 hover:text-blue-700 transition-colors duration-300 font-semibold"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
          <Link
            href="/contact"
            className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 uppercase text-sm tracking-wider font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {mounted && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-white z-50 flex flex-col transform -translate-x-full"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center">
              <Link href="/" onClick={toggleMenu} className="flex items-center">
                <Image
                  src="/Logo/pflogobg.webp"
                  alt="Pocket Fund Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            </div>
            <button
              className="cursor-pointer uppercase text-sm tracking-wider text-blue-600 hover:text-blue-700 transition-colors duration-300 font-semibold"
              onClick={toggleMenu}
            >
              Close &#10005;
            </button>
          </div>

          <nav className="flex-grow flex flex-col justify-center px-8 md:pl-40 lg:pl-96 space-y-2">
            {menulinks.map((link, index) => (
              <div key={index} className="menu-link group">
                <Link
                  href={link.path}
                  onClick={toggleMenu}
                  className="text-4xl md:text-7xl font-serif text-gray-900 bg-clip-text hover:bg-gradient-to-t hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 hover:text-transparent transition-all duration-500 ease-in-out"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-end md:items-center text-sm border-t border-gray-200">
            <div className="space-y-2 items-end mb-4 md:mb-0">
              <a
                href="https://www.linkedin.com/company/pocketfund"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.twitter.com/pocketfund"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                Twitter ↗
              </a>
              <a
                href="https://www.facebook.com/pocketfund"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                Facebook ↗
              </a>
            </div>

            <div className="space-y-2 text-gray-700">
              <a
                href="mailto:hello@pocket-fund.com"
                className="block hover:text-blue-600 transition-colors duration-300"
              >
                hello@pocket-fund.com
              </a>
              <p className="text-gray-700">
                Mumbai, India
              </p>
            </div>

            <div className="hidden md:block">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 uppercase text-sm tracking-wider font-medium"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}

      {mounted && (
        <>

          {!isMenuOpen && (
            <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white text-center border-t border-gray-200 shadow-lg">
              <Link
                href="/contact"
                className="bg-blue-600 text-white py-3 px-8 rounded-full text-pretty text-left text-lg font-semibold uppercase shadow-lg hover:bg-blue-700 transition-all duration-300 inline-block"
              >
                Contact Us
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Menu;
