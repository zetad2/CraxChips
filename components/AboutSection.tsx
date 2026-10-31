'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, MapPin, Factory, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="a-propos" className="py-20 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden">
      
      {/* Background soft ambient blur */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Container matching Mockup 1 bottom card */}
        <div className="rounded-3xl bg-white border border-sky-100 shadow-[0_12px_36px_rgba(0,114,236,0.1)] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Wooden Bowl with Corn and Chips (from Mockup 1) */}
            <div className="lg:col-span-4 relative flex justify-center">
              <div className="relative w-full max-w-sm h-64 sm:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                <Image
                  src="/assets/corn_bowl.png"
                  alt="Maïs doré et chips Crax Corn Toon"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Middle: Brand Story */}
            <div className="lg:col-span-5 flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-[#0072EC] font-black text-xs uppercase tracking-wider mb-3">
                <Factory className="w-4 h-4" />
                <span>Fabrication 100% Ivoirienne</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0B3B70] tracking-tight">
                À propos de Crax Chips
              </h2>

              <p className="text-slate-700 text-base sm:text-lg mt-3 leading-relaxed font-semibold">
                Crax Chips, c&apos;est une marque emblématique qui met du sourire dans chaque moment de gourmandise. Avec ses produits savoureux et de qualité, nous partageons le bonheur avec vous !
              </p>

              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Fabriqué à Abidjan par <strong>Éléphant Moderne de Côte d&apos;Ivoire (EMCI)</strong> à <strong>Yopougon Anguedou</strong>, nos produits répondent aux plus hauts standards de sécurité alimentaire et de croustillant.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Riche en Calcium
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs font-black border border-sky-100">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  Yopougon Anguedou, Abidjan
                </span>
              </div>

            </div>

            {/* Right: Iconic Slogan Banner (Exact Mockup 1 bottom right) */}
            <div className="lg:col-span-3 rounded-2xl bg-gradient-to-br from-[#0072EC] via-[#1A90FF] to-[#0055B8] p-6 text-white text-center flex flex-col items-center justify-center shadow-xl shadow-blue-500/30 border-2 border-white/50 relative overflow-hidden min-h-[200px]">
              {/* Yellow sparkles */}
              <div className="flex gap-2 text-yellow-300 mb-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Crax Chips...
              </h3>
              <p className="text-lg sm:text-xl font-black text-yellow-300 mt-1 leading-snug">
                Toujours plus de plaisir !
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
