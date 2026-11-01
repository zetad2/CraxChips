"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-b from-[#0062D6] via-[#0052B8] to-[#003882] dark:from-[#051126] dark:via-[#040e20] dark:to-[#020713] text-white pt-16 pb-0 overflow-hidden transition-colors duration-300"
    >
      {/* Top Wave Curve Divider matching Mockup 2 */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-12 text-white dark:text-[#070e1c] fill-current transition-colors duration-300"
        >
          <path d="M0,0 C320,60 480,90 720,50 C960,10 1200,60 1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Floating Corn Puff on Footer (matching Mockup 2 top right) */}
      <div className="absolute top-14 right-10 sm:right-16 w-14 h-14 drop-shadow-xl opacity-90 hidden sm:block animate-bounce duration-[8000ms]">
        <Image
          src="/assets/chip_single.png"
          alt="Crax Puff Chip"
          width={56}
          height={56}
          className="object-contain rotate-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/20">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="relative w-48 h-20 drop-shadow-xl">
              <Image
                src="/assets/crax_logo_hq.png"
                alt="Crax Chips Logo"
                fill
                sizes="192px"
                className="object-contain object-left"
              />
            </div>
            <div className="pt-2">
              <p className="text-2xl font-black text-white tracking-tight leading-tight">
                Crax Chips...
              </p>
              <div className="relative inline-block mt-1">
                <p className="text-xl font-black text-white italic tracking-tight leading-tight">
                  Toujours plus de plaisir !
                </p>
                {/* Yellow curved underline swoosh */}
                <svg
                  className="w-full h-3 mt-0.5"
                  viewBox="0 0 120 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10 C 35 2, 85 2, 118 8"
                    stroke="#FFCC00"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Links with Yellow Chevron Markers */}
          <div>
            <h4 className="text-lg font-black tracking-tight mb-4 text-white">
              Liens Rapides
            </h4>
            <ul className="space-y-2.5 text-sm font-bold text-sky-100">
              <li>
                <a
                  href="#accueil"
                  className="hover:text-yellow-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-yellow-400 font-black group-hover:translate-x-0.5 transition-transform">
                    &gt;
                  </span>
                  <span>Accueil</span>
                </a>
              </li>
              <li>
                <a
                  href="#saveurs"
                  className="hover:text-yellow-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-yellow-400 font-black group-hover:translate-x-0.5 transition-transform">
                    &gt;
                  </span>
                  <span>Nos Produits</span>
                </a>
              </li>
              <li>
                <a
                  href="#a-propos"
                  className="hover:text-yellow-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-yellow-400 font-black group-hover:translate-x-0.5 transition-transform">
                    &gt;
                  </span>
                  <span>À Propos</span>
                </a>
              </li>
              <li>
                <a
                  href="#qualite"
                  className="hover:text-yellow-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-yellow-400 font-black group-hover:translate-x-0.5 transition-transform">
                    &gt;
                  </span>
                  <span>Qualité</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-yellow-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-yellow-400 font-black group-hover:translate-x-0.5 transition-transform">
                    &gt;
                  </span>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col (matching mockup 2 exact icons & values) */}
          <div>
            <h4 className="text-lg font-black tracking-tight mb-4 text-white">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-sky-100 font-semibold">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="font-bold text-white">+225 27 3688 4208</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="font-bold text-white">info@craxchips.ci</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="font-bold text-white">
                  Yopougon Anguedou - ÎLOT 58 LOT 643, Abidjan, Côte
                  d&apos;Ivoire
                </span>
              </li>
            </ul>
          </div>

          {/* Social (Exact 4 white circle buttons from Mockup 2) */}
          <div>
            <div className="relative inline-block mb-4">
              <h4 className="text-lg font-black tracking-tight text-white">
                Suivez-nous
              </h4>
              <svg className="w-12 h-1.5 mt-0.5" viewBox="0 0 50 6" fill="none">
                <path
                  d="M2 3 C 15 1, 35 1, 48 4"
                  stroke="#FFCC00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#0072EC] flex items-center justify-center font-black text-lg hover:scale-110 active:scale-95 transition-all shadow-lg"
                title="Facebook"
              >
                f
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                title="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                title="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.75 1.35-.04 2.56-.91 2.97-2.2.14-.44.2-.91.2-1.38.03-4.9.01-9.8.02-14.7z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/2250700000000"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#25D366] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
            </div>

            <div className="mt-6" id="commander">
              <a
                href="https://wa.me/2250700000000?text=Bonjour,%20je%20souhaite%20commander%20des%20paquets%20Crax%20Chips"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFCC00] hover:bg-yellow-300 text-[#003882] font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                Commander en gros (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar (Dark navy blue matching Mockup 2 bottom) */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200">
          <p className="font-semibold text-slate-200">
            &copy; 2026{" "}
            <span className="text-[#FFCC00]">
              <a
                href="https://nehonix.com?utm_source=craxchips.com&utm_medium=footer&utm_campaign=nehonix"
                target="_blank"
                rel="noreferrer"
              >
                NEHONIX
              </a>
            </span>
            . Tous droits réservés.
          </p>
          <div className="flex items-center gap-3 bg-[#002B66]/80 px-5 py-2 rounded-full border border-white/30 font-bold text-white text-xs shadow-inner">
            <span>Qualité</span>
            <span>•</span>
            <span>Plaisir</span>
            <span>•</span>
            <span>Confiance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
