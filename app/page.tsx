'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FlavorsSection from '@/components/FlavorsSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { FlavorType } from '@/components/CraxBag3D';

export default function Home() {
  const [currentFlavor, setCurrentFlavor] = useState<FlavorType>('vanilla');

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F2744] selection:bg-[#0072EC] selection:text-white">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Interactive 3D Hero Section */}
        <HeroSection
          currentFlavor={currentFlavor}
          onSelectFlavor={setCurrentFlavor}
        />

        {/* 3 Flavors Presentation + Pourquoi Choisir */}
        <FlavorsSection
          currentFlavor={currentFlavor}
          onSelectFlavor={setCurrentFlavor}
        />

        {/* About Brand & Story (EMCI Abidjan) */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
