'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Home, Star, Building2, Handshake, Headphones, ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Accueil');

  const navLinks = [
    { label: 'Accueil', href: '#accueil', icon: Home },
    { label: 'Nos Produits', href: '#saveurs', icon: Star },
    { label: 'À Propos', href: '#a-propos', icon: Building2 },
    { label: 'Qualité', href: '#qualite', icon: Handshake },
    { label: 'Contact', href: '#contact', icon: Headphones },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Crax Chips Official High-Res Logo */}
        <a href="#accueil" className="group flex items-center gap-2 transform transition-transform duration-300 hover:scale-105">
          <div className="relative w-36 h-16 sm:w-44 sm:h-20 drop-shadow-md">
            <Image
              src="/assets/crax_logo_hq.png"
              alt="Crax Chips Logo Officiel"
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        {/* Central Navigation Pill Bar (Matching EXACTLY Image 1) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 dark:bg-[#0b162c]/90 backdrop-blur-md px-2 py-1.5 rounded-full shadow-[0_6px_25px_rgba(0,114,236,0.12)] dark:shadow-[0_6px_25px_rgba(0,0,0,0.5)] border border-sky-100 dark:border-slate-800 text-sm font-black transition-all duration-300">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.label;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.label)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0072EC] text-white shadow-md shadow-blue-500/30'
                    : 'text-[#0F2744] dark:text-slate-200 hover:text-[#0072EC] dark:hover:text-[#38bdf8] hover:bg-sky-50 dark:hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0F2744] dark:text-slate-200'}`} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action: Acheter Maintenant Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#commander"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0072EC] via-[#1A90FF] to-[#0072EC] text-white font-black text-sm shadow-xl shadow-blue-500/35 border-2 border-white/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Acheter Maintenant</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-white/95 dark:bg-[#0b162c]/95 backdrop-blur-md border border-sky-200 dark:border-slate-700 text-[#0072EC] dark:text-sky-400 shadow-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-white/95 dark:bg-[#0b162c]/95 backdrop-blur-xl rounded-3xl border border-sky-100 dark:border-slate-800 text-[#0F2744] dark:text-slate-100 shadow-2xl flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.label);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-base transition-colors ${
                  isActive
                    ? 'bg-[#0072EC] text-white shadow-md'
                    : 'text-[#0F2744] dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-sky-100 dark:border-slate-800">
            <a
              href="#commander"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#0072EC] to-[#0084FF] text-white font-black shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Acheter Maintenant</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
