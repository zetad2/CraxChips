'use client';

import React from 'react';
import Image from 'next/image';
import { FlavorType } from './CraxBag3D';
import { Sparkles, Eye, CheckCircle2, ShieldCheck, Smile, Users, Star } from 'lucide-react';

interface FlavorsSectionProps {
  currentFlavor: FlavorType;
  onSelectFlavor: (flavor: FlavorType) => void;
}

const FLAVORS = [
  {
    id: 'vanilla' as FlavorType,
    name: 'NONO Ni Vanilla',
    badge: 'Saveur Emblématique',
    tagline: 'Vanille Douceur',
    image: '/assets/bag_vanilla.png',
    accentColor: 'from-[#0072EC] to-[#38BDF8]',
    borderColor: 'border-blue-400',
    shadowColor: 'shadow-blue-500/20',
    btnColor: 'bg-[#0072EC] hover:bg-blue-700',
    ingredients: ['Semoule de maïs soufflé', 'Arôme naturel de vanille', 'Lait en poudre', 'Enrichi en calcium'],
    weight: '35g & 50g',
    description: 'Le sachet emblématique bleu qui enchante petits et grands avec sa vanille délicate et son croquant aérien.',
  },
  {
    id: 'cheese' as FlavorType,
    name: 'NONO Ni Fromage',
    badge: 'Gourmand & Salé',
    tagline: 'Cheddar Fondant',
    image: '/assets/bag_cheese.png',
    accentColor: 'from-[#DC2626] to-[#F59E0B]',
    borderColor: 'border-red-400',
    shadowColor: 'shadow-red-500/20',
    btnColor: 'bg-[#DC2626] hover:bg-red-700',
    ingredients: ['Semoule de maïs croustillant', 'Assaisonnement au cheddar fondant', 'Sel iodé de qualité', 'Plaisir garanti'],
    weight: '35g & 50g',
    description: 'Une explosion gourmande de cheddar savoureux sur des chips soufflées dorées pour toutes les pauses snacks.',
  },
  {
    id: 'spicy' as FlavorType,
    name: 'NONO Ni Épicé',
    badge: 'Piquant & Caractère',
    tagline: 'Piments Doux & Épices',
    image: '/assets/bag_spicy.png',
    accentColor: 'from-[#16A34A] to-[#84CC16]',
    borderColor: 'border-emerald-400',
    shadowColor: 'shadow-emerald-500/20',
    btnColor: 'bg-[#16A34A] hover:bg-emerald-700',
    ingredients: ['Semoule de maïs soufflé', 'Mélange d\'épices relevées', 'Paprika & piments doux', 'Sans brûler le palais'],
    weight: '35g & 50g',
    description: 'Pour ceux qui aiment le goût intense et relevé, avec un peps maîtrisé qui réveille les papilles.',
  },
];

export default function FlavorsSection({
  currentFlavor,
  onSelectFlavor,
}: FlavorsSectionProps) {
  return (
    <section id="saveurs" className="py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white via-[#EDF6FD] to-white relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header (matching exact ChatGPT mockup 2) */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#0072EC] via-[#1A90FF] to-[#0072EC] text-white font-black text-xl sm:text-2xl shadow-xl shadow-blue-500/30 border-2 border-white/60 mb-3 transform hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Nos Saveurs</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3B70] tracking-tight">
            Un plaisir gourmand pour tous les goûts !
          </h2>
          <p className="text-slate-600 max-w-2xl mt-3 text-base sm:text-lg font-medium">
            Trois déclinaisons savoureuses pensées pour combler tous les moments de la journée.
          </p>
        </div>

        {/* 3 Flavors Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {FLAVORS.map((item) => {
            const isSelected = currentFlavor === item.id;
            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl p-6 sm:p-8 bg-white border-2 transition-all duration-500 flex flex-col justify-between shadow-xl ${
                  isSelected
                    ? 'border-[#0072EC] ring-4 ring-blue-500/20 shadow-2xl scale-[1.02]'
                    : `border-slate-100 hover:border-blue-400 hover:shadow-2xl`
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r ${item.accentColor} shadow-md`}>
                    {item.badge}
                  </span>
                  <span className="text-xs font-black text-slate-500 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                    {item.weight}
                  </span>
                </div>

                {/* 3D Product Bag Presentation */}
                <div className="relative w-full h-64 sm:h-72 my-4 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                  <div className="relative w-48 sm:w-56 h-full drop-shadow-[0_18px_30px_rgba(0,114,236,0.2)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Floating corn puffs near bag */}
                  <div className="absolute bottom-2 left-4 w-10 h-10 drop-shadow-md hidden sm:block animate-pulse">
                    <Image src="/assets/puff_chip.png" alt="Puff" width={40} height={40} />
                  </div>
                </div>

                {/* Flavor Details */}
                <div className="mt-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-sm font-extrabold text-[#0072EC] mb-2">
                    {item.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                    {item.description}
                  </p>

                  {/* Ingredients Checklist */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                    {item.ingredients.map((ing) => (
                      <div key={ing} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action: Charger en 3D */}
                <button
                  onClick={() => {
                    onSelectFlavor(item.id);
                    document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95 ${item.btnColor}`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{isSelected ? 'Actuellement affiché en 3D' : 'Inspecter en 3D 360°'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Section "Pourquoi choisir Crax Chips ?" (Exact layout from ChatGPT Mockup 2 Right) */}
        <div id="qualite" className="mt-16 rounded-3xl p-8 sm:p-12 bg-[#C3E2FE] border-4 border-white shadow-2xl relative overflow-hidden">
          
          <div className="max-w-4xl mx-auto">
            {/* Header pill matching mockup 2 */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0072EC] text-white font-black text-xl sm:text-2xl shadow-xl shadow-blue-600/30 border-2 border-white/60">
                <span>Pourquoi choisir Crax Chips ?</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Card 1: Qualité Supérieure */}
              <div className="p-5 rounded-2xl bg-white shadow-lg border border-white flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">Qualité Supérieure</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Des ingrédients sélectionnés avec rigueur</p>
                </div>
              </div>

              {/* Card 2: Goût Délicieux */}
              <div className="p-5 rounded-2xl bg-white shadow-lg border border-white flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-amber-400 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Smile className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">Goût Délicieux</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Un plaisir unique à chaque bouchée</p>
                </div>
              </div>

              {/* Card 3: Pour Toute la Famille */}
              <div className="p-5 rounded-2xl bg-white shadow-lg border border-white flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-[#0072EC] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">Pour Toute la Famille</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Petits et grands se régalent ensemble</p>
                </div>
              </div>

              {/* Card 4: Marque de Confiance */}
              <div className="p-5 rounded-2xl bg-white shadow-lg border border-white flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Star className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">Marque de Confiance</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Une référence snacking depuis toujours</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
