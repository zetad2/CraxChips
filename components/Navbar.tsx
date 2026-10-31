'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Home, Sparkles, Building2, ShieldCheck, Headphones, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#accueil', icon: Home },
    { label: 'Nos Produits', href: '#saveurs', icon: Sparkles },
    { label: 'À Propos', href: '#a-propos', icon: Building2 },
    { label: 'Qualité', href: '#qualite', icon: ShieldCheck },
    { label: 'Contact', href: '#contact', icon: Headphones },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Crax Chips Iconic Brand Logo */}
        <a href="#accueil" className="group flex items-center gap-2 transform transition-transform duration-300 hover:scale-105">
          <div className="relative w-36 h-16 sm:w-44 sm:h-20 drop-shadow-md">
            <Image
              src="/assets/crax_logo.png"
              alt="Crax Chips Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </a>

        {/* Central Navigation Pill Bar (exact ChatGPT mockup style) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#0084FF]/90 hover:bg-[#0084FF] backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/25 border border-white/50 text-white font-bold text-sm transition-all duration-300">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/20 transition-all duration-200 active:scale-95"
              >
                <Icon className="w-4 h-4 opacity-95" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action: Acheter Maintenant Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#commander"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0072EC] via-[#1A90FF] to-[#0072EC] text-white font-extrabold text-sm shadow-xl shadow-blue-500/35 border-2 border-white/50 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Acheter Maintenant</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/90 backdrop-blur-md border border-sky-200 text-sky-800 shadow-md"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-[#0084FF]/95 backdrop-blur-xl rounded-3xl border border-white/40 text-white shadow-2xl flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl hover:bg-white/20 font-bold text-base transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </a>
            );
          })}
          <div className="pt-2 border-t border-white/20">
            <a
              href="#commander"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-[#0072EC] font-black shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acheter Maintenant</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
