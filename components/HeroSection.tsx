"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  Smile,
  Star,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Smooth 3D mouse tilt tracking for the entire hero showcase
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setRotateY(Math.max(-12, Math.min(12, x / 40)));
      setRotateX(Math.max(-10, Math.min(10, -y / 40)));
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="relative h-screen min-h-screen pt-24 sm:pt-28 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-12 flex flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat transition-colors duration-700"
      style={{
        backgroundImage: "url('/assets/hero_bg.png')",
        backgroundPosition: "center top",
      }}
    >
      {/* Dark mode cinematic night overlay with glowing ambient stars/aurora */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060d1b]/88 via-[#08142c]/82 to-[#070e1c] pointer-events-none transition-opacity duration-700 opacity-0 dark:opacity-100 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,114,236,0.35),transparent)] pointer-events-none transition-opacity duration-700 opacity-0 dark:opacity-100 z-0" />

      {/* Theme Toggle Button Widget - Seamlessly integrated in Hero Section */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-12 z-40">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Basculer en mode jour" : "Basculer en mode nuit"
          }
          title={
            theme === "dark"
              ? "Mode Nuit actif (cliquer pour le mode Jour)"
              : "Mode Jour actif (cliquer pour le mode Nuit)"
          }
          className="group relative flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-2 border-white/80 dark:border-slate-700/80 shadow-[0_8px_30px_rgba(0,114,236,0.18)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer select-none"
        >
          {/* Micro Track with Sun & Moon */}
          <div className="relative w-12 h-6 sm:w-14 sm:h-7 rounded-full bg-sky-100 dark:bg-slate-800 p-0.5 flex items-center justify-between px-1.5 border border-sky-200/80 dark:border-slate-700 shadow-inner">
            <Sun
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
                theme === "dark"
                  ? "text-slate-500 opacity-40 scale-75"
                  : "text-amber-500 opacity-100 scale-100"
              }`}
            />
            <Moon
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 ${
                theme === "dark"
                  ? "text-sky-300 opacity-100 scale-100"
                  : "text-slate-400 opacity-40 scale-75"
              }`}
            />

            {/* Sliding Pill Thumb */}
            <span
              className={`absolute top-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md transition-all duration-300 ease-out flex items-center justify-center ${
                theme === "dark"
                  ? "left-[calc(100%-1.45rem)] sm:left-[calc(100%-1.65rem)] bg-gradient-to-tr from-[#0072EC] to-indigo-500 text-white shadow-blue-500/50"
                  : "left-0.5 bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-amber-500/30"
              }`}
            >
              {theme === "dark" ? (
                <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              ) : (
                <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              )}
            </span>
          </div>

          {/* Integrated Label with Badge indicator */}
          <div className="flex flex-col text-left">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#0072EC] dark:text-sky-400 leading-none">
              Ambiance
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white leading-tight flex items-center gap-1">
              <span>{theme === "dark" ? "Mode Nuit" : "Mode Jour"}</span>
              <span className="pl-4 text-[11px] transition-transform duration-300 group-hover:rotate-12">
                {theme === "dark" ? "🌙" : "☀️"}
              </span>
            </span>
          </div>
        </button>
      </div>

      {/* Soft gradient wash at bottom to blend seamlessly into white / dark theme */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#070e1c] dark:via-[#070e1c]/85 pointer-events-none z-10 transition-colors duration-500" />

      {/* Floating 3D Chips from mockup - First chip anchor for 3D scroll animation */}
      <div
        id="hero-first-chip"
        className="absolute top-36 left-[7%] w-16 sm:w-20 aspect-square z-20 pointer-events-none drop-shadow-2xl transition-transform duration-300 opacity-0"
        style={{
          transform: `translate3d(${rotateY * -2}px, ${rotateX * -2}px, 40px) rotate(14deg)`,
        }}
      >
        <Image
          src="/assets/chip_single.png"
          alt="Chip 3D maïs soufflé"
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>

      <div
        className="absolute top-52 right-[6%] w-14 sm:w-18 aspect-square z-20 pointer-events-none drop-shadow-2xl transition-transform duration-300"
        style={{
          transform: `translate3d(${rotateY * 2.5}px, ${rotateX * 2.5}px, 60px) rotate(-35deg)`,
        }}
      >
        <Image
          src="/assets/chip_single.png"
          alt="Chip 3D maïs soufflé"
          fill
          sizes="72px"
          className="object-contain"
        />
      </div>

      {/* Main Hero Content Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-20 my-auto">
        {/* Left Column: Big Ultra-3D Typography & CTA */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left pt-6 lg:pt-0">
          {/* Top Yellow Rays above NONO Ni Vanilla */}
          <div className="flex items-center gap-1.5 mb-2 ml-0 lg:ml-6">
            <span className="w-1.5 h-3 bg-[#FFCC00] rounded-full -rotate-30 transform shadow-sm" />
            <span className="w-1.5 h-4.5 bg-[#FFCC00] rounded-full transform shadow-sm" />
            <span className="w-1.5 h-3 bg-[#FFCC00] rounded-full rotate-30 transform shadow-sm" />
          </div>

          {/* Flavor Pill Badge: NONO Ni Vanilla (Exact Match Mockup 1) */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#0072EC] text-white shadow-lg shadow-blue-500/30 mb-3 border border-white/50 transform hover:scale-105 transition-transform">
            <span className="font-black text-sm uppercase tracking-wider">
              NONO Ni Vanilla
            </span>
          </div>

          {/* 3D Giant Cartoon Pop-Out Title (CORN TOON: Super 3D Jumps off the screen) */}
          <div
            className="relative my-2 select-none transition-transform duration-200 ease-out"
            style={{
              perspective: "1000px",
              transform: `perspective(1000px) rotateX(${rotateX * 0.4}deg) rotateY(${rotateY * 0.4}deg) scale(1.02)`,
            }}
          >
            <h1 className="text-3d-corn text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.88] tracking-tight hover:scale-105 transition-transform">
              CORN
            </h1>
            <br />
            <h1 className="text-3d-toon text-6xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.88] tracking-tight -mt-3 sm:-mt-5 hover:scale-105 transition-transform">
              TOON
            </h1>
          </div>

          {/* Slogan */}
          <h2 className="bg-[#0054f1] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-4 tracking-tight drop-shadow-sm italic">
            Le goût unique qui fait sourire !
          </h2>

          {/* CTA Button: Découvrir le produit -> */}
          <div className="mt-8">
            <a
              href="#saveurs"
              className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-[#0072EC] via-[#1A90FF] to-[#0072EC] text-white font-black text-base sm:text-lg shadow-xl shadow-blue-500/35 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 border-2 border-white/60 active:scale-95"
            >
              <span>Découvrir le produit</span>
              <div className="w-8 h-8 rounded-full bg-white text-[#0072EC] flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-md">
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Pure 3D Showcase (100% Clean, No white artifacts, Pop-Out Depth) */}
        <div
          className="lg:col-span-7 relative flex items-center justify-center py-6 select-none"
          style={{ perspective: "1200px" }}
        >
          {/* Main 3D Container with Parallax Perspective */}
          <div
            className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D Tiered Circular Podium Platform */}
            <div className="absolute bottom-2 w-[85%] h-24 rounded-[100%] bg-gradient-to-b from-white via-sky-100 to-sky-200 dark:from-slate-800 dark:via-blue-950 dark:to-slate-900 border-4 border-white dark:border-blue-500/40 shadow-[0_20px_50px_rgba(0,114,236,0.35)] dark:shadow-[0_20px_50px_rgba(0,114,236,0.5)] -z-10 transform scale-y-50 transition-colors duration-500">
              <div className="absolute inset-2 rounded-[100%] bg-gradient-to-b from-sky-50 to-white/90 dark:from-slate-850 dark:to-slate-900/90" />
            </div>

            {/* Central 3D Crax Chips Corn Toon Bag (Ultra Clean PNG, zero artifacts) */}
            <div
              className="relative w-[340px] sm:w-[410px] aspect-square transition-transform duration-300 z-10"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              <Image
                src="/assets/Composition publicitaire colorée de chips Crax.png"
                alt="Paquet 3D Crax Chips Corn Toon Vanilla"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain drop-shadow-[0_25px_40px_rgba(0,90,210,0.4)]"
                priority
              />
            </div>

            {/* Top-Right: 3D Floating Gold Ribbon Seal Medal (Qualité Supérieure) */}
            <div
              className="absolute top-2 sm:top-6 right-2 sm:right-6 w-28 sm:w-36 aspect-square z-30 transition-transform duration-300 hover:scale-110 drop-shadow-[0_15px_30px_rgba(217,119,6,0.45)] animate-bounce duration-[8000ms]"
              style={{
                transform: "translateZ(90px) rotate(8deg)",
              }}
            >
              <Image
                src="/assets/gold_badge.png"
                alt="Médaille d'Or Qualité Supérieure 5 étoiles"
                fill
                sizes="144px"
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom-Right: Royal Blue Ceramic Bowl overflowing with chips */}
            {/* <div
              className="absolute -bottom-2 sm:-bottom-4 right-0 sm:right-4 w-36 sm:w-48 aspect-square z-25 transition-transform duration-300 drop-shadow-[0_20px_35px_rgba(0,114,236,0.45)] hover:scale-105"
              style={{
                transform: "translateZ(70px)",
              }}
            >
              <Image
                src="/assets/blue_bowl_clean.png"
                alt="Bol de chips Crax Corn Toon avec logo"
                fill
                sizes="192px"
                className="object-contain"
                priority
              />
            </div> */}

            {/* Foreground Pop-Out Floating Chips with Deep Z-Index */}
            <div
              className="absolute bottom-6 left-6 sm:left-12 w-20 sm:w-28 aspect-square z-35 transition-transform duration-300 drop-shadow-[0_15px_25px_rgba(0,0,0,0.25)] pointer-events-none"
              style={{
                transform: `translate3d(${rotateY * -3}px, ${rotateX * -3}px, 120px) rotate(-16deg)`,
              }}
            >
              <Image
                src="/assets/chips_cluster.png"
                alt="Chips 3D maïs soufflé"
                fill
                sizes="112px"
                className="object-contain"
              />
            </div>

            <div
              className="absolute bottom-16 right-36 w-14 sm:w-16 aspect-square z-35 transition-transform duration-300 drop-shadow-xl pointer-events-none"
              style={{
                transform: `translate3d(${rotateY * 3}px, ${rotateX * 3}px, 100px) rotate(24deg)`,
              }}
            >
              <Image
                src="/assets/chip_single.png"
                alt="Puff chip trèfle"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Feature Trust Pills (Exact single elongated capsule matching Mockup 1) */}
      <div className="max-w-7xl mx-auto w-full z-20 mt-8">
        <div className="bg-white/95 dark:bg-[#0b162c]/90 backdrop-blur-md rounded-2xl sm:rounded-full border border-sky-100 dark:border-slate-800 shadow-[0_12px_36px_rgba(0,114,236,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] p-2 sm:p-3 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-sky-100 dark:divide-slate-800 transition-colors duration-300">
          {/* 1. Goût Délicieux */}
          <div className="flex items-center gap-3.5 py-3 sm:py-2 px-3 sm:px-4 group hover:bg-sky-50/50 dark:hover:bg-slate-800/60 rounded-2xl sm:rounded-full transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-[#0072EC] dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                Goût Délicieux
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Un plaisir à chaque bouchée
              </p>
            </div>
          </div>

          {/* 2. Ingrédients de Qualité */}
          <div className="flex items-center gap-3.5 py-3 sm:py-2 px-3 sm:px-4 group hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 rounded-2xl sm:rounded-full transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-[#16A34A] dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <Leaf className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                Ingrédients de Qualité
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Pour toute la famille
              </p>
            </div>
          </div>

          {/* 3. Plaisir Garanti */}
          <div className="flex items-center gap-3.5 py-3 sm:py-2 px-3 sm:px-4 group hover:bg-amber-50/50 dark:hover:bg-slate-800/60 rounded-2xl sm:rounded-full transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-[#F59E0B] dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <Smile className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                Plaisir Garanti
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Pour petits et grands
              </p>
            </div>
          </div>

          {/* 4. Marque de Confiance */}
          <div className="flex items-center gap-3.5 py-3 sm:py-2 px-3 sm:px-4 group hover:bg-blue-50/50 dark:hover:bg-slate-800/60 rounded-2xl sm:rounded-full transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-[#0072EC] dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
              <Star className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                Marque de Confiance
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Depuis toujours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
