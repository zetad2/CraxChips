'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ShieldCheck, Smile, Users, Star } from 'lucide-react';

export default function FlavorsSection() {
  const podiumRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Smooth 3D mouse parallax on the 3-bags podium
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!podiumRef.current) return;
      const rect = podiumRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setRotateY(Math.max(-8, Math.min(8, x / 35)));
      setRotateX(Math.max(-6, Math.min(6, -y / 35)));
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="saveurs"
      className="py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white via-[#EDF6FD] to-white dark:from-[#070e1c] dark:via-[#09142b] dark:to-[#070e1c] relative overflow-hidden transition-colors duration-300"
    >
      {/* Background soft ambient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-200/40 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D chips as decorative elements from Mockup 2 */}
      <div className="absolute top-16 right-[10%] w-16 aspect-square z-10 pointer-events-none drop-shadow-lg hidden md:block animate-bounce duration-[7000ms]">
        <Image
          src="/assets/chip_single.png"
          alt="Chip maïs soufflé"
          fill
          sizes="64px"
          className="object-contain rotate-45"
        />
      </div>

      <div className="absolute bottom-12 left-[5%] w-24 aspect-square z-10 pointer-events-none drop-shadow-xl hidden lg:block animate-pulse duration-[6000ms]">
        <Image
          src="/assets/chips_cluster.png"
          alt="Amas chips maïs soufflé"
          fill
          sizes="96px"
          className="object-contain -rotate-12"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Section Header (matching exact Mockup 2: blue pill with 3 yellow rays on each side) */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-3">
            {/* 3 Yellow rays left */}
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-3 bg-[#FFCC00] rounded-full -rotate-45 transform" />
              <span className="w-1.5 h-4 bg-[#FFCC00] rounded-full -rotate-15 transform" />
              <span className="w-1.5 h-3 bg-[#FFCC00] rounded-full rotate-15 transform" />
            </div>

            {/* Pill: Nos Saveurs */}
            <div className="px-8 py-2.5 rounded-full bg-[#0072EC] text-white font-black text-2xl sm:text-3xl shadow-xl shadow-blue-500/25 border-2 border-white/60 transform hover:scale-105 transition-transform">
              <span>Nos Saveurs</span>
            </div>

            {/* 3 Yellow rays right */}
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-3 bg-[#FFCC00] rounded-full -rotate-15 transform" />
              <span className="w-1.5 h-4 bg-[#FFCC00] rounded-full rotate-15 transform" />
              <span className="w-1.5 h-3 bg-[#FFCC00] rounded-full rotate-45 transform" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B3B70] dark:text-sky-200 tracking-tight transition-colors">
            Un plaisir gourmand pour tous les goûts !
          </h2>
        </div>

        {/* 2-Column Grid: 3-Bags Podium Composition on Left, 'Pourquoi choisir Crax Chips ?' on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: The 3-Bags Podium (flavors_podium_hq.png) with interactive 3D tilt */}
          <div
            ref={podiumRef}
            className="lg:col-span-7 relative flex items-center justify-center py-4"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative w-full max-w-[660px] aspect-[1672/941] transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src="/assets/flavors_podium_du_bas.png"
                alt="Les 3 saveurs Crax Chips Corn Toon: Vanilla, Fromage et Épicé sur podium"
                fill
                sizes="(max-width: 1024px) 100vw, 660px"
                className="object-contain drop-shadow-[0_24px_45px_rgba(0,114,236,0.25)] select-none"
                priority
              />
            </div>
          </div>

          {/* Right Column: 'Pourquoi choisir Crax Chips ?' (Exact Mockup 2 Right) */}
          <div className="lg:col-span-5" id="qualite">
            <div className="rounded-[32px] p-6 sm:p-8 bg-[#C2E1FD] dark:bg-[#0c1c38] border-4 border-white dark:border-slate-700/60 shadow-xl relative overflow-hidden transition-colors duration-300">
              {/* Header pill matching mockup 2 */}
              <div className="flex justify-center -mt-2 mb-6">
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0072EC] text-white font-black text-lg sm:text-xl shadow-lg shadow-blue-600/30 border border-white/60">
                  <span>Pourquoi choisir Crax Chips ?</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Card 1: Qualité Supérieure */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0f244a] shadow-sm border border-white dark:border-slate-700/50 flex items-center gap-3 transform hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      Qualité Supérieure
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 font-medium mt-0.5">
                      Des ingrédients sélectionnés
                    </p>
                  </div>
                </div>

                {/* Card 2: Goût Délicieux */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0f244a] shadow-sm border border-white dark:border-slate-700/50 flex items-center gap-3 transform hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Smile className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      Goût Délicieux
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 font-medium mt-0.5">
                      Un plaisir unique à chaque bouchée
                    </p>
                  </div>
                </div>

                {/* Card 3: Pour Toute la Famille */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0f244a] shadow-sm border border-white dark:border-slate-700/50 flex items-center gap-3 transform hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-[#0072EC] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Users className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      Pour Toute la Famille
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 font-medium mt-0.5">
                      Petits et grands se régalent
                    </p>
                  </div>
                </div>

                {/* Card 4: Marque de Confiance */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0f244a] shadow-sm border border-white dark:border-slate-700/50 flex items-center gap-3 transform hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Star className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white leading-tight">
                      Marque de Confiance
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 font-medium mt-0.5">
                      Une référence depuis toujours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
