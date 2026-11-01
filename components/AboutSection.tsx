'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section
      id="a-propos"
      className="relative z-20 pt-8 sm:pt-12 pb-14 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#070e1c] rounded-t-[40px] sm:rounded-t-[56px] shadow-[0_-25px_60px_rgba(0,114,236,0.18)] dark:shadow-[0_-30px_70px_rgba(0,0,0,0.85)] border-t-2 border-white/80 dark:border-slate-800 transition-colors duration-700 ease-in-out"
    >
      {/* Decorative top sheet pill grab handle like Chrome / iOS modal sheets */}
      <div className="flex justify-center mb-6">
        <span className="w-16 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 opacity-60 transition-colors duration-700" />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Main Card (exact layout and style matching Mockup 1 bottom) */}
        <div className="rounded-[36px] bg-white dark:bg-[#0b162c] border border-sky-100 dark:border-slate-800 shadow-[0_15px_45px_rgba(0,114,236,0.08)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-colors duration-700">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Blue Curved Organic Background with Wooden Bowl & Fresh Corn */}
            <div className="lg:col-span-4 relative flex items-center justify-center min-h-[220px]">
              
              {/* Organic smooth blue wave background matching Mockup 1 */}
              <div className="absolute inset-y-0 -left-6 sm:-left-8 w-full max-w-[340px] bg-gradient-to-r from-[#0072EC] via-[#0072EC] to-[#0084FF] rounded-r-[120px] rounded-l-[36px] shadow-lg shadow-blue-500/20 -z-0" />

              {/* Wooden Bowl with Chips and Fresh Corn on the cob */}
              <div
                id="about-chips-bowl"
                className="relative z-10 w-full max-w-[360px] aspect-[1771/887] drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              >
                <Image
                  src="/assets/bowl_corn_clean.png"
                  alt="Bol en bois de chips Crax et épis de maïs frais"
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Middle: Brand Story Text */}
            <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B3B70] dark:text-sky-300 tracking-tight leading-tight transition-colors">
                À propos de Crax Chips
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-semibold transition-colors">
                Crax Chips, c&apos;est une marque emblématique qui met du sourire dans chaque moment de gourmandise. Avec ses produits savoureux et de qualité, nous partageons le bonheur avec vous !
              </p>
            </div>

            {/* Right: Slogan Graphic Banner (exact Mockup 1 bottom right) */}
            <div className="lg:col-span-3 relative flex items-center justify-center">
              <div className="w-full rounded-[28px] bg-gradient-to-br from-[#0072EC] via-[#0060D6] to-[#004BB5] p-7 sm:p-8 text-white text-center flex flex-col items-center justify-center shadow-xl shadow-blue-500/30 border border-white/40 relative overflow-hidden min-h-[180px]">
                
                {/* 3 Bold Yellow rays in top right corner */}
                <div className="absolute top-4 right-5 flex gap-1.5">
                  <span className="w-2 h-4 bg-[#FFCC00] rounded-full rotate-45 transform shadow-sm" />
                  <span className="w-2 h-5 bg-[#FFCC00] rounded-full transform shadow-sm" />
                  <span className="w-2 h-4 bg-[#FFCC00] rounded-full -rotate-45 transform shadow-sm" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                  Crax Chips...
                </h3>
                
                <div className="relative inline-block mt-1.5">
                  <p className="text-xl sm:text-2xl font-black text-white italic leading-snug tracking-tight">
                    Toujours plus de plaisir !
                  </p>
                  {/* Yellow curved swoosh underline */}
                  <svg className="w-full h-3 mt-1" viewBox="0 0 120 14" fill="none" preserveAspectRatio="none">
                    <path d="M2 10 C 35 2, 85 2, 118 8" stroke="#FFCC00" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
