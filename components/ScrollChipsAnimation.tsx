'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ChipConfig {
  id: number;
  size: number;
  scale: number;
  spawnP: number; // progress [0, 1] at which this chip detaches/multiplies
  arrivalP: number; // progress at which it lands in bowl
  fanOutX: number; // horizontal spread factor
  waveX: number; // S-curve wobble
  fanOutY: number; // arc lift
  depthZ: number; // 3D pop out towards viewer (px)
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  startRotZ: number;
  targetOffsetX: number; // final rest position inside bowl
  targetOffsetY: number;
}

// Exactly 10 chips multiplying from the 1st master chip of Hero
const CHIPS_DATA: ChipConfig[] = [
  {
    id: 0, // Master chip (first chip of Hero)
    size: 78,
    scale: 1.0,
    spawnP: 0.0,
    arrivalP: 0.84,
    fanOutX: 30,
    waveX: 20,
    fanOutY: 35,
    depthZ: 140,
    rotSpeedX: 380,
    rotSpeedY: 520,
    rotSpeedZ: 340,
    startRotZ: 14,
    targetOffsetX: -8,
    targetOffsetY: 4,
  },
  {
    id: 1, // Chip 2
    size: 64,
    scale: 0.88,
    spawnP: 0.08,
    arrivalP: 0.86,
    fanOutX: -120,
    waveX: -35,
    fanOutY: 55,
    depthZ: 100,
    rotSpeedX: -480,
    rotSpeedY: 420,
    rotSpeedZ: -260,
    startRotZ: -20,
    targetOffsetX: -32,
    targetOffsetY: -6,
  },
  {
    id: 2, // Chip 3
    size: 62,
    scale: 0.85,
    spawnP: 0.13,
    arrivalP: 0.88,
    fanOutX: 130,
    waveX: 45,
    fanOutY: 50,
    depthZ: 90,
    rotSpeedX: 360,
    rotSpeedY: -420,
    rotSpeedZ: 460,
    startRotZ: 35,
    targetOffsetX: 22,
    targetOffsetY: 8,
  },
  {
    id: 3, // Chip 4
    size: 56,
    scale: 0.8,
    spawnP: 0.18,
    arrivalP: 0.90,
    fanOutX: -70,
    waveX: 65,
    fanOutY: 65,
    depthZ: 150,
    rotSpeedX: 620,
    rotSpeedY: 340,
    rotSpeedZ: -380,
    startRotZ: -45,
    targetOffsetX: 4,
    targetOffsetY: -15,
  },
  {
    id: 4, // Chip 5
    size: 58,
    scale: 0.82,
    spawnP: 0.22,
    arrivalP: 0.92,
    fanOutX: 85,
    waveX: -50,
    fanOutY: 30,
    depthZ: 80,
    rotSpeedX: -420,
    rotSpeedY: 560,
    rotSpeedZ: 300,
    startRotZ: 65,
    targetOffsetX: -18,
    targetOffsetY: 10,
  },
  {
    id: 5, // Chip 6
    size: 50,
    scale: 0.74,
    spawnP: 0.27,
    arrivalP: 0.93,
    fanOutX: -100,
    waveX: 35,
    fanOutY: 75,
    depthZ: 120,
    rotSpeedX: 500,
    rotSpeedY: -460,
    rotSpeedZ: -320,
    startRotZ: 90,
    targetOffsetX: 26,
    targetOffsetY: -3,
  },
  {
    id: 6, // Chip 7
    size: 54,
    scale: 0.76,
    spawnP: 0.32,
    arrivalP: 0.95,
    fanOutX: 105,
    waveX: -35,
    fanOutY: 60,
    depthZ: 110,
    rotSpeedX: -380,
    rotSpeedY: 480,
    rotSpeedZ: 390,
    startRotZ: -30,
    targetOffsetX: -12,
    targetOffsetY: -10,
  },
  {
    id: 7, // Chip 8
    size: 46,
    scale: 0.68,
    spawnP: 0.37,
    arrivalP: 0.96,
    fanOutX: -45,
    waveX: -25,
    fanOutY: 45,
    depthZ: 70,
    rotSpeedX: 440,
    rotSpeedY: 380,
    rotSpeedZ: -270,
    startRotZ: 115,
    targetOffsetX: 14,
    targetOffsetY: 6,
  },
  {
    id: 8, // Chip 9
    size: 48,
    scale: 0.7,
    spawnP: 0.42,
    arrivalP: 0.98,
    fanOutX: 55,
    waveX: 25,
    fanOutY: 80,
    depthZ: 130,
    rotSpeedX: -540,
    rotSpeedY: -350,
    rotSpeedZ: 330,
    startRotZ: -65,
    targetOffsetX: -28,
    targetOffsetY: 4,
  },
  {
    id: 9, // Chip 10
    size: 42,
    scale: 0.64,
    spawnP: 0.46,
    arrivalP: 0.99,
    fanOutX: -20,
    waveX: -15,
    fanOutY: 85,
    depthZ: 95,
    rotSpeedX: 360,
    rotSpeedY: 490,
    rotSpeedZ: -440,
    startRotZ: 40,
    targetOffsetX: 8,
    targetOffsetY: 12,
  },
];

export default function ScrollChipsAnimation() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const updateChips = () => {
      if (typeof window === 'undefined') return;

      const firstChipEl = document.getElementById('hero-first-chip');
      const aboutEl = document.getElementById('a-propos');
      const bowlEl = document.getElementById('about-chips-bowl');

      if (!aboutEl) {
        animFrameRef.current = requestAnimationFrame(updateChips);
        return;
      }

      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      const winW = window.innerWidth;
      const aboutRect = aboutEl.getBoundingClientRect();

      // Scroll progress: 0 when at top of Hero, 1 when Section 2 has masked the Hero (scrollY = winH)
      const rawProgress = Math.min(1, Math.max(0, scrollY / Math.max(1, winH)));

      // Check if user scrolled far beyond AboutSection (fade out smoothly)
      const isPastAbout = aboutRect.bottom < 80;
      const opacity = isPastAbout
        ? Math.max(0, 1 - (80 - aboutRect.bottom) / 160)
        : 1;

      if (containerRef.current) {
        containerRef.current.style.opacity = opacity.toString();
      }

      // Starting point: Exact position of the first chip of the Hero section
      let startX = winW * 0.07;
      let startY = 144;

      if (firstChipEl) {
        const firstRect = firstChipEl.getBoundingClientRect();
        if (firstRect.width > 0) {
          startX = firstRect.left;
          startY = firstRect.top;
        }
      }

      // Target point: Center of the wooden bowl in Section 2
      let targetX = winW * 0.28;
      let targetY = winH * 0.55;

      if (bowlEl) {
        const bowlRect = bowlEl.getBoundingClientRect();
        targetX = bowlRect.left + bowlRect.width * 0.46;
        targetY = bowlRect.top + bowlRect.height * 0.38;

        // Natural reactive bowl bounce as chips drop in
        if (rawProgress >= 0.84 && rawProgress <= 1.0) {
          const impact = Math.sin((rawProgress - 0.84) * Math.PI * 8) * 3.5;
          bowlEl.style.transform = `translateY(${Math.max(0, impact)}px)`;
        } else {
          bowlEl.style.transform = '';
        }
      }

      // Update all 10 chips
      CHIPS_DATA.forEach((chip) => {
        const chipEl = document.getElementById(`scroll-chip-${chip.id}`);
        if (!chipEl) return;

        // Has this chip spawned yet?
        if (rawProgress < chip.spawnP) {
          if (chip.id === 0) {
            // Master chip (first chip of Hero) at its initial position
            const idleBob = Math.sin(Date.now() / 420) * (rawProgress === 0 ? 5 : 0);
            chipEl.style.opacity = '1';
            chipEl.style.transform = `translate3d(${startX}px, ${startY + idleBob}px, 40px) scale(1) rotate(${chip.startRotZ}deg)`;
          } else {
            // Secondary multiplying chips hidden until spawned
            chipEl.style.opacity = '0';
            chipEl.style.transform = `translate3d(${startX}px, ${startY}px, 0px) scale(0)`;
          }
          return;
        }

        // Chip is active! Compute local progress from spawn to arrival
        const pRange = Math.max(0.01, chip.arrivalP - chip.spawnP);
        const localP = Math.min(1, Math.max(0, (rawProgress - chip.spawnP) / pRange));

        // Smooth cubic easing for fluid trajectory
        const easeT =
          localP < 0.5
            ? 2 * localP * localP
            : 1 - Math.pow(-2 * localP + 2, 2) / 2;

        // Arc & Wave trajectory calculation
        const fanArc = Math.sin(easeT * Math.PI);
        const waveArc = Math.sin(easeT * Math.PI * 2);

        const curTargetX = targetX + chip.targetOffsetX;
        const curTargetY = targetY + chip.targetOffsetY;

        let posX =
          (1 - easeT) * startX +
          easeT * curTargetX +
          fanArc * chip.fanOutX +
          waveArc * chip.waveX;
        let posY =
          (1 - easeT) * startY +
          easeT * curTargetY -
          fanArc * chip.fanOutY;

        // 3D Depth Pop (Z-axis towards viewer)
        const posZ = fanArc * chip.depthZ;

        // 3D Tumbling rotations
        const rotX = easeT * chip.rotSpeedX + Math.sin(easeT * 7 + chip.id) * 30;
        const rotY = easeT * chip.rotSpeedY + Math.cos(easeT * 6 + chip.id) * 35;
        const rotZ =
          chip.startRotZ + easeT * chip.rotSpeedZ + Math.sin(easeT * 4) * 45;

        // Natural Bounce Effect on Arrival inside the bowl!
        let bounceY = 0;
        let currentScale = chip.scale;

        if (rawProgress >= chip.arrivalP) {
          const bounceWindow = 1 - chip.arrivalP;
          const bounceT = Math.min(
            1,
            (rawProgress - chip.arrivalP) / Math.max(0.01, bounceWindow)
          );

          // Damped harmonic bounce equation
          const damping = Math.exp(-bounceT * 4.2);
          const oscillation = Math.sin(bounceT * Math.PI * 3.5);
          bounceY = oscillation * damping * -26 * chip.scale;

          // Subtle squash & stretch scale bounce
          currentScale =
            chip.scale * (1 + Math.sin(bounceT * Math.PI * 3) * damping * 0.12);
        } else if (localP < 0.20 && chip.id > 0) {
          // Emerge smoothly from the master chip as it multiplies
          currentScale = chip.scale * (localP / 0.20);
        }

        posY += bounceY;

        // Dynamic shadow effect
        const shadowBlur = Math.round(15 + (1 - easeT) * 15 + fanArc * 10);
        const shadowY = Math.round(8 + (1 - easeT) * 16 + fanArc * 12);
        const shadowOpacity = 0.25 + easeT * 0.15;

        chipEl.style.opacity = '1';
        chipEl.style.transform = `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${currentScale})`;
        chipEl.style.filter = `drop-shadow(0 ${shadowY}px ${shadowBlur}px rgba(0, 70, 180, ${shadowOpacity}))`;
      });

      animFrameRef.current = requestAnimationFrame(updateChips);
    };

    animFrameRef.current = requestAnimationFrame(updateChips);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-300"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      aria-hidden="true"
    >
      {/* Exactly 10 3D Flying Multiplying Chips */}
      {CHIPS_DATA.map((chip) => (
        <div
          key={chip.id}
          id={`scroll-chip-${chip.id}`}
          className="absolute top-0 left-0 will-change-transform pointer-events-none"
          style={{
            width: `${chip.size}px`,
            height: `${chip.size}px`,
            transform: 'translate3d(-9999px, -9999px, 0)',
            transformOrigin: 'center center',
          }}
        >
          {/* Subtle Royal Blue Crax aura glow behind chip */}
          <div className="absolute inset-[-12%] rounded-full bg-blue-500/20 blur-md pointer-events-none transform -z-10" />

          {/* Golden 3D Corn Chip Snack Render */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/chip_single.png"
              alt="Crax Corn Chip 3D"
              fill
              sizes={`${chip.size}px`}
              className="object-contain select-none"
              priority={chip.id === 0}
            />
          </div>

          {/* Golden Sparkle / Glint overlay on master chip */}
          {chip.id === 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FFE600] blur-[1px] animate-ping duration-[3000ms]" />
          )}
        </div>
      ))}
    </div>
  );
}
