'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-b from-[#0072EC] via-[#005EB8] to-[#004080] text-white pt-16 pb-10 overflow-hidden">
      
      {/* Top Wave Curve Divider */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-white rounded-b-[40px] shadow-md" />

      {/* Floating Corn Puffs on Footer */}
      <div className="absolute top-12 right-12 w-14 h-14 drop-shadow-xl opacity-80 hidden sm:block animate-bounce duration-[8000ms]">
        <Image src="/assets/puff_chip.png" alt="Puff" width={56} height={56} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/20">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="relative w-44 h-20 drop-shadow-xl">
              <Image
                src="/assets/crax_logo.png"
                alt="Crax Chips Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xl font-black text-yellow-300 tracking-tight leading-tight">
              Crax Chips...
              <br />
              <span className="text-white text-lg font-black">Toujours plus de plaisir !</span>
            </p>
            <p className="text-xs text-sky-100 leading-relaxed max-w-xs font-medium">
              Fabriqué en Côte d&apos;Ivoire par Éléphant Moderne de Côte d&apos;Ivoire (EMCI) à Yopougon Anguedou, Abidjan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
              Liens Rapides
            </h4>
            <ul className="space-y-2.5 text-sm font-bold text-sky-100">
              <li>
                <a href="#accueil" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                  Accueil
                </a>
              </li>
              <li>
                <a href="#saveurs" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                  Nos Produits (Corn Toon)
                </a>
              </li>
              <li>
                <a href="#a-propos" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                  À Propos
                </a>
              </li>
              <li>
                <a href="#qualite" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                  Qualité
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-sky-300" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col (matching mockup 2 exact values) */}
          <div>
            <h4 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm text-sky-100 font-semibold">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">+225 07 00 00 00 00</div>
                  <div className="text-xs text-sky-200">+225 27 36 38 42 08</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">info@craxchips.ci</div>
                  <div className="text-xs text-sky-200">em.ciservies@gmail.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-sky-100">
                  <strong>Abidjan, Côte d&apos;Ivoire</strong>
                  <br />
                  Yopougon Anguedou - Îlot 58 Lot 643
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-yellow-300"></span>
              Suivez-nous
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#0072EC] flex items-center justify-center font-black text-base hover:scale-110 transition-transform shadow-lg"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center font-black text-xs hover:scale-110 transition-transform shadow-lg"
                title="YouTube"
              >
                YT
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center font-black text-xs hover:scale-110 transition-transform shadow-lg"
                title="TikTok"
              >
                TK
              </a>
              <a
                href="https://wa.me/2252736384208"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-6" id="commander">
              <a
                href="https://wa.me/2252736384208?text=Bonjour,%20je%20souhaite%20commander%20des%20paquets%20Crax%20Chips"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                Commander en gros (WhatsApp)
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200">
          <p className="font-semibold">
            &copy; 2026 Crax Chips. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3 bg-blue-950/40 px-4 py-1.5 rounded-full border border-white/20 font-bold text-white text-[11px]">
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
