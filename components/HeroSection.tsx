'use client';

import React from 'react';
import Image from 'next/image';
import CraxBag3D, { FlavorType } from './CraxBag3D';
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  Smile,
  Star,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  currentFlavor: FlavorType;
  onSelectFlavor: (flavor: FlavorType) => void;
}

const FLAVOR_DATA: Record<
  FlavorType,
  {
    subtitle: string;
    desc: string;
    pillBg: string;
    pillBorder: string;
    textColor: string;
  }
> = {
  vanilla: {
    subtitle: 'NONO Ni Vanilla',
    desc: 'Le croustillant aérien du maïs soufflé associé à la douceur gourmande de la vanille qui fait sourire petits et grands !',
    pillBg: 'bg-[#0084FF]',
    pillBorder: 'border-blue-400',
    textColor: 'text-[#0072EC]',
  },
  cheese: {
    subtitle: 'NONO Ni Fromage',
    desc: 'Une explosion gourmande de vrai fromage cheddar fondant sur des chips soufflées ultra croustillantes !',
    pillBg: 'bg-[#DC2626]',
    pillBorder: 'border-red-400',
    textColor: 'text-[#DC2626]',
  },
  spicy: {
    subtitle: 'NONO Ni Épicé',
    desc: 'Le peps pimenté irrésistible avec un mélange d’épices doux qui réveille le goût sans brûler le palais !',
    pillBg: 'bg-[#16A34A]',
    pillBorder: 'border-emerald-400',
    textColor: 'text-[#16A34A]',
  },
};

export default function HeroSection({
  currentFlavor,
  onSelectFlavor,
}: HeroSectionProps) {
  const flavor = FLAVOR_DATA[currentFlavor];

  return (
    <section
      id="accueil"
      className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-12 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#2B98EE] via-[#7AC4FB] via-50% to-[#FFFFFF]"
    >
      {/* Tropical Green Leaves in Corners (matching ChatGPT mockup 1) */}
      <div className="absolute top-0 left-0 w-36 sm:w-56 h-48 sm:h-72 pointer-events-none z-10 opacity-95">
        <Image
          src="/assets/leaves_left.png"
          alt="Feuilles tropicales"
          fill
          className="object-contain object-top-left"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-40 sm:w-64 h-56 sm:h-80 pointer-events-none z-10 opacity-95">
        <Image
          src="/assets/leaves_right.png"
          alt="Feuilles tropicales"
          fill
          className="object-contain object-top-right"
          priority
        />
      </div>

      {/* Radiant Sun Glow behind product */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[700px] bg-gradient-to-b from-white/60 via-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Puffed Corn Chips */}
      <div className="absolute top-28 left-[18%] w-14 h-14 animate-bounce duration-[6000ms] opacity-90 hidden lg:block pointer-events-none drop-shadow-lg">
        <Image src="/assets/puff_chip.png" alt="Puff Chip" width={56} height={56} className="rotate-12" />
      </div>
      <div className="absolute top-48 right-[14%] w-16 h-16 animate-bounce duration-[7000ms] delay-1000 opacity-90 hidden lg:block pointer-events-none drop-shadow-lg">
        <Image src="/assets/puff_chip_2.png" alt="Puff Chip" width={64} height={64} className="-rotate-45" />
      </div>

      {/* Main Hero Content Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-20 my-auto">
        
        {/* Left Column: Big 3D Typography & CTA */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left pt-6 lg:pt-0">
          
          {/* Flavor Pill Badge (matching mockup) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white shadow-md mb-2 transform hover:scale-105 transition-transform">
            <span className={`w-2.5 h-2.5 rounded-full ${flavor.pillBg} animate-ping`} />
            <span className={`font-black text-xs uppercase tracking-wider ${flavor.textColor}`}>
              {flavor.subtitle}
            </span>
          </div>

          {/* 3D Giant Cartoon Bubbly Title (CORN TOON) matching mockup */}
          <div className="relative my-1 select-none">
            <h1 className="text-3d-corntoon text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.9] tracking-tight">
              CORN
            </h1>
            <h1 className="text-3d-corntoon text-6xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.9] tracking-tight -mt-1 sm:-mt-2">
              TOON
            </h1>
          </div>

          {/* Slogan */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B3B70] mt-4 tracking-tight drop-shadow-sm">
            Le goût unique qui fait sourire !
          </h2>

          {/* Description */}
          <p className="text-slate-700 text-base sm:text-lg mt-3 max-w-lg leading-relaxed font-semibold">
            {flavor.desc}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href="#saveurs"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0072EC] via-[#1A90FF] to-[#0072EC] text-white font-black text-base shadow-xl shadow-blue-500/35 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 border-2 border-white/60"
            >
              <span>Découvrir le produit</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </a>

            <a
              href="#a-propos"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/95 hover:bg-white text-slate-800 font-extrabold text-base shadow-md hover:shadow-lg border border-sky-100 hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Notre Histoire</span>
            </a>
          </div>

          {/* Interactive Flavor Switcher Tabs */}
          <div className="mt-8 w-full max-w-md">
            <p className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
              Choisissez votre saveur Crax :
            </p>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-lg">
              {(['vanilla', 'cheese', 'spicy'] as FlavorType[]).map((flv) => {
                const isActive = currentFlavor === flv;
                const labels: Record<FlavorType, { name: string; emoji: string; color: string }> = {
                  vanilla: { name: 'Vanille', emoji: '🍦', color: 'from-[#0072EC] to-[#38BDF8]' },
                  cheese: { name: 'Fromage', emoji: '🧀', color: 'from-[#DC2626] to-[#F59E0B]' },
                  spicy: { name: 'Épicé', emoji: '🌶️', color: 'from-[#16A34A] to-[#84CC16]' },
                };
                return (
                  <button
                    key={flv}
                    onClick={() => onSelectFlavor(flv)}
                    className={`py-2.5 px-2 rounded-xl font-black text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${labels[flv].color} text-white shadow-md scale-105`
                        : 'text-slate-700 hover:bg-white/90'
                    }`}
                  >
                    <span>{labels[flv].emoji}</span>
                    <span>{labels[flv].name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Scene with Podium, Gold Badge, and Snack Bowl */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          
          {/* Gold Quality Seal Badge (From mockup 1) */}
          <div className="absolute top-2 sm:top-6 right-2 sm:right-6 z-30 w-24 sm:w-32 h-24 sm:h-32 drop-shadow-2xl transform hover:scale-105 transition-transform">
            <Image
              src="/assets/gold_badge.png"
              alt="Qualité Supérieure 5 étoiles"
              fill
              className="object-contain"
            />
          </div>

          {/* 3D WebGL Canvas */}
          <div className="w-full relative">
            <CraxBag3D currentFlavor={currentFlavor} />
          </div>

          {/* Blue Bowl of Chips on Podium (from mockup right) */}
          <div className="absolute -bottom-2 right-2 sm:right-8 w-32 h-32 sm:w-44 sm:h-44 z-20 pointer-events-none drop-shadow-2xl">
            <Image
              src="/assets/blue_bowl_clean.png"
              alt="Bol de chips Crax Corn Toon"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom 4 Feature Trust Pills (From mockup 1) */}
      <div className="max-w-7xl mx-auto w-full z-20 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* 1. Goût Délicieux */}
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,114,236,0.12)] hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-100 text-[#0072EC] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                Goût Délicieux
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Un plaisir à chaque bouchée
              </p>
            </div>
          </div>

          {/* 2. Ingrédients de Qualité */}
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,114,236,0.12)] hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                Ingrédients de Qualité
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pour toute la famille
              </p>
            </div>
          </div>

          {/* 3. Plaisir Garanti */}
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,114,236,0.12)] hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-[#F59E0B] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                Plaisir Garanti
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pour petits et grands
              </p>
            </div>
          </div>

          {/* 4. Marque de Confiance */}
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,114,236,0.12)] hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-[#0072EC] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                Marque de Confiance
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Depuis toujours en Côte d&apos;Ivoire
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
