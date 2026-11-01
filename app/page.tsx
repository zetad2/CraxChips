'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FlavorsSection from '@/components/FlavorsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import ScrollChipsAnimation from '@/components/ScrollChipsAnimation';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070e1c] text-[#0F2744] dark:text-slate-100 selection:bg-[#0072EC] selection:text-white transition-colors duration-300">
      {/* Header Navigation with exact Crax Logo & pill bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* 3D Flying Multiplying Chips scroll animation between Hero and AboutSection */}
        <ScrollChipsAnimation />

        {/* Hero Section: Sticky at top: 0, z-0 */}
        <div id="hero-scroll-track" className="sticky top-0 h-screen w-full z-0 overflow-hidden">
          <HeroSection />
        </div>

        {/* Section 2 (AboutSection) and following sections: z-10, immediately sliding OVER Hero on scroll to mask it */}
        <div className="relative z-10 bg-white dark:bg-[#070e1c] shadow-[0_-30px_70px_rgba(0,0,0,0.35)] transition-colors duration-700">
          <AboutSection />
          <FlavorsSection />
        </div>
      </main>

      {/* Footer with exact ocean blue wave and contact details */}
      <Footer />
    </div>
  );
}
