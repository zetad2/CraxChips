'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type FlavorType = 'vanilla' | 'cheese' | 'spicy';

interface CraxBag3DProps {
  currentFlavor: FlavorType;
  className?: string;
}

const FLAVOR_CONFIG: Record<
  FlavorType,
  {
    name: string;
    label: string;
    color: string;
    lightColor: number;
    frontTexture: string;
  }
> = {
  vanilla: {
    name: 'NONO Ni Vanilla',
    label: 'Vanille Douceur',
    color: '#0284c7',
    lightColor: 0x38bdf8,
    frontTexture: '/assets/bag_vanilla_foil.jpg',
  },
  cheese: {
    name: 'NONO Ni Fromage',
    label: 'Fromage Savoureux',
    color: '#dc2626',
    lightColor: 0xf87171,
    frontTexture: '/assets/bag_cheese_foil.jpg',
  },
  spicy: {
    name: 'NONO Ni Épicé',
    label: 'Piment Épicé',
    color: '#16a34a',
    lightColor: 0x4ade80,
    frontTexture: '/assets/bag_spicy_foil.jpg',
  },
};

export default function CraxBag3D({
  currentFlavor,
  className = '',
}: CraxBag3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showingBack, setShowingBack] = useState(false);

  const threeState = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    bagGroup?: THREE.Group;
    frontMaterial?: THREE.MeshPhysicalMaterial;
    puffsGroup?: THREE.Group;
    spotlight?: THREE.SpotLight;
    podiumRing?: THREE.Mesh;
    targetRotationY: number;
    targetRotationX: number;
    spinVelocity: number;
    prevPointerX: number;
    prevPointerY: number;
    pointerX: number;
    pointerY: number;
    isUserInteracting: boolean;
    textureLoader?: THREE.TextureLoader;
    loadedTextures: Record<string, THREE.Texture>;
  }>({
    targetRotationY: 0,
    targetRotationX: 0,
    spinVelocity: 0,
    prevPointerX: 0,
    prevPointerY: 0,
    pointerX: 0,
    pointerY: 0,
    isUserInteracting: false,
    loadedTextures: {},
  });

  // Handle flavor transition texture update and 360 spin
  useEffect(() => {
    const state = threeState.current;
    if (!state.frontMaterial || !state.textureLoader) return;

    const config = FLAVOR_CONFIG[currentFlavor];
    const texturePath = config.frontTexture;

    const applyTexture = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (state.frontMaterial) {
        state.frontMaterial.map = tex;
        state.frontMaterial.needsUpdate = true;
      }
    };

    if (state.loadedTextures[texturePath]) {
      applyTexture(state.loadedTextures[texturePath]);
    } else {
      state.textureLoader.load(texturePath, (tex) => {
        state.loadedTextures[texturePath] = tex;
        applyTexture(tex);
      });
    }

    // Dynamic 360 spin when flavor changes, then settle back front-facing
    state.targetRotationY = 0;
    state.targetRotationX = 0;
    state.spinVelocity = Math.PI * 2.5;
    setShowingBack(false);

    // Adjust spotlight tint
    if (state.spotlight) {
      state.spotlight.color.setHex(config.lightColor);
    }
  }, [currentFlavor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // 1. Scene setup
    const scene = new THREE.Scene();
    threeState.current.scene = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 4.3);
    threeState.current.camera = camera;

    // 3. WebGL Renderer with clear alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    threeState.current.renderer = renderer;

    const textureLoader = new THREE.TextureLoader();
    threeState.current.textureLoader = textureLoader;

    // 4. Lights: Crisp studio lighting for glossy snack foil
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    mainKeyLight.position.set(3, 4, 4);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.6);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    const spotlight = new THREE.SpotLight(
      FLAVOR_CONFIG[currentFlavor].lightColor,
      3.0,
      10,
      Math.PI / 4,
      0.5
    );
    spotlight.position.set(0, 4, 2);
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target);
    threeState.current.spotlight = spotlight;

    // 5. 3D Pillow Snack Bag Assembly
    const bagGroup = new THREE.Group();
    bagGroup.position.set(0, 0.08, 0);
    scene.add(bagGroup);
    threeState.current.bagGroup = bagGroup;

    const bagWidth = 1.7;
    const bagHeight = 2.3;
    const bagDepth = 0.44;

    const createPillowFace = (isFront: boolean) => {
      const segX = 40;
      const segY = 50;
      const geom = new THREE.PlaneGeometry(bagWidth, bagHeight, segX, segY);
      const pos = geom.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);

        const nx = x / (bagWidth / 2);
        const ny = y / (bagHeight / 2);

        // Inflation profile
        const inflationX = Math.cos((nx * Math.PI) / 2);
        const inflationY = Math.cos((ny * Math.PI) / 2);
        let z = bagDepth * inflationX * Math.pow(Math.max(0, inflationY), 0.7);

        // Flatter & crimped at top and bottom seals
        const crimpZone = 0.22;
        const distFromEdge = bagHeight / 2 - Math.abs(y);
        if (distFromEdge < crimpZone) {
          const t = distFromEdge / crimpZone;
          z *= Math.pow(t, 1.8);
          // Micro crimp ridges
          const ridge = Math.sin(y * 90) * 0.009 * (1 - t);
          z += ridge;
        }

        // Foil wrinkles
        const wrinkle =
          Math.sin(x * 12 + y * 8) * 0.006 +
          Math.cos(x * 6 - y * 14) * 0.004;
        z += wrinkle * Math.max(0, inflationX * inflationY);

        pos.setZ(i, isFront ? z : -z);
      }

      geom.computeVertexNormals();
      return geom;
    };

    // Load textures
    const initialFrontTexture = FLAVOR_CONFIG[currentFlavor].frontTexture;
    const frontTex = textureLoader.load(initialFrontTexture, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      threeState.current.loadedTextures[initialFrontTexture] = tex;
    });
    frontTex.colorSpace = THREE.SRGBColorSpace;

    const backTex = textureLoader.load('/assets/bag_back_clean.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
    });
    backTex.colorSpace = THREE.SRGBColorSpace;

    // PBR Foil Materials
    const frontMat = new THREE.MeshPhysicalMaterial({
      map: frontTex,
      roughness: 0.22,
      metalness: 0.14,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
      side: THREE.FrontSide,
    });
    threeState.current.frontMaterial = frontMat;

    const backMat = new THREE.MeshPhysicalMaterial({
      map: backTex,
      roughness: 0.35,
      metalness: 0.08,
      clearcoat: 0.5,
      side: THREE.FrontSide,
    });

    const frontMesh = new THREE.Mesh(createPillowFace(true), frontMat);
    frontMesh.castShadow = true;
    bagGroup.add(frontMesh);

    const backMesh = new THREE.Mesh(createPillowFace(false), backMat);
    backMesh.rotation.y = Math.PI;
    backMesh.castShadow = true;
    bagGroup.add(backMesh);

    // 6. Multi-tier Glossy Blue Podium (matching mockup)
    const podiumGroup = new THREE.Group();
    podiumGroup.position.set(0, -1.25, 0);
    scene.add(podiumGroup);

    // Tier 1 (Upper disc - bright electric blue)
    const tier1Geom = new THREE.CylinderGeometry(1.65, 1.7, 0.14, 64);
    const tier1Mat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Vibrant sky/electric blue
      roughness: 0.15,
      metalness: 0.25,
    });
    const tier1 = new THREE.Mesh(tier1Geom, tier1Mat);
    tier1.receiveShadow = true;
    podiumGroup.add(tier1);

    // Glowing white accent ring on top disc
    const ringGeom = new THREE.RingGeometry(1.52, 1.62, 64);
    ringGeom.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const podiumRing = new THREE.Mesh(ringGeom, ringMat);
    podiumRing.position.y = 0.072;
    podiumGroup.add(podiumRing);
    threeState.current.podiumRing = podiumRing;

    // Tier 2 (Base disc - deeper blue)
    const tier2Geom = new THREE.CylinderGeometry(2.15, 2.25, 0.16, 64);
    const tier2Mat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.25,
      metalness: 0.3,
    });
    const tier2 = new THREE.Mesh(tier2Geom, tier2Mat);
    tier2.position.y = -0.15;
    tier2.receiveShadow = true;
    podiumGroup.add(tier2);

    // 7. Floating 3D Star Corn Puffs
    const puffsGroup = new THREE.Group();
    scene.add(puffsGroup);
    threeState.current.puffsGroup = puffsGroup;

    const createPuffGeometry = () => {
      const shape = new THREE.Shape();
      const numPoints = 5;
      const outerRadius = 0.15;
      const innerRadius = 0.09;
      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / numPoints;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(px, py);
        else shape.lineTo(px, py);
      }
      shape.closePath();

      const extrudeSettings = {
        steps: 2,
        depth: 0.08,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.04,
        bevelSegments: 4,
      };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      return geom;
    };

    const puffGeom = createPuffGeometry();
    const puffMat = new THREE.MeshStandardMaterial({
      color: 0xffd000, // Rich warm golden corn puff color
      roughness: 0.5,
      metalness: 0.05,
    });

    const puffItems: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      floatSpeed: number;
      floatOffset: number;
    }[] = [];

    const puffPositions = [
      { x: -1.35, y: 0.85, z: 0.4 },
      { x: 1.45, y: 0.65, z: 0.3 },
      { x: -1.15, y: -0.35, z: 0.6 },
      { x: 1.25, y: -0.25, z: 0.5 },
      { x: -0.75, y: 1.15, z: -0.2 },
      { x: 0.85, y: 1.25, z: -0.1 },
      { x: -1.6, y: 0.1, z: 0.2 },
      { x: 1.5, y: -0.7, z: 0.7 },
      { x: 0.15, y: -0.85, z: 1.1 },
    ];

    puffPositions.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(puffGeom, puffMat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.scale.setScalar(0.75 + Math.random() * 0.35);
      mesh.castShadow = true;
      puffsGroup.add(mesh);

      puffItems.push({
        mesh,
        baseX: pos.x,
        baseY: pos.y,
        baseZ: pos.z,
        rotSpeedX: (Math.random() - 0.5) * 1.5,
        rotSpeedY: (Math.random() - 0.5) * 1.5,
        floatSpeed: 1.2 + Math.random() * 1.2,
        floatOffset: idx * 0.7,
      });
    });

    // 8. Event listeners for mouse interaction
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      threeState.current.pointerX = x;
      threeState.current.pointerY = y;

      if (threeState.current.isUserInteracting) {
        const deltaX = e.clientX - threeState.current.prevPointerX;
        const deltaY = e.clientY - threeState.current.prevPointerY;
        threeState.current.targetRotationY += deltaX * 0.012;
        threeState.current.targetRotationX += deltaY * 0.008;
        threeState.current.targetRotationX = Math.max(
          -0.4,
          Math.min(0.4, threeState.current.targetRotationX)
        );
        threeState.current.prevPointerX = e.clientX;
        threeState.current.prevPointerY = e.clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      threeState.current.isUserInteracting = true;
      threeState.current.prevPointerX = e.clientX;
      threeState.current.prevPointerY = e.clientY;
      setIsDragging(true);
    };

    const handlePointerUp = () => {
      threeState.current.isUserInteracting = false;
      setIsDragging(false);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        threeState.current.isUserInteracting = true;
        threeState.current.prevPointerX = e.touches[0].clientX;
        threeState.current.prevPointerY = e.touches[0].clientY;
        setIsDragging(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && threeState.current.isUserInteracting) {
        const deltaX = e.touches[0].clientX - threeState.current.prevPointerX;
        const deltaY = e.touches[0].clientY - threeState.current.prevPointerY;
        threeState.current.targetRotationY += deltaX * 0.014;
        threeState.current.targetRotationX += deltaY * 0.008;
        threeState.current.prevPointerX = e.touches[0].clientX;
        threeState.current.prevPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      threeState.current.isUserInteracting = false;
      setIsDragging(false);
    };

    container.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Levitation floating
      const hoverY = 0.08 + Math.sin(elapsedTime * 2.2) * 0.05;
      bagGroup.position.y = hoverY;

      // Handle spin velocity damping
      if (Math.abs(threeState.current.spinVelocity) > 0.01) {
        threeState.current.targetRotationY +=
          threeState.current.spinVelocity * 0.08;
        threeState.current.spinVelocity *= 0.92;
      }

      // Parallax mouse tilt when not dragging
      if (!threeState.current.isUserInteracting) {
        // Natural subtle swaying (pendulum oscillation +/- 6 degrees)
        const idleSway = Math.sin(elapsedTime * 1.5) * 0.08;
        const mouseTiltX = -threeState.current.pointerY * 0.2;
        const mouseTiltY = threeState.current.pointerX * 0.3;

        bagGroup.rotation.y +=
          (threeState.current.targetRotationY + mouseTiltY + idleSway - bagGroup.rotation.y) *
          0.06;
        bagGroup.rotation.x +=
          (threeState.current.targetRotationX + mouseTiltX - bagGroup.rotation.x) *
          0.06;
      } else {
        bagGroup.rotation.y +=
          (threeState.current.targetRotationY - bagGroup.rotation.y) * 0.15;
        bagGroup.rotation.x +=
          (threeState.current.targetRotationX - bagGroup.rotation.x) * 0.15;
      }

      // Gentle rocking
      bagGroup.rotation.z = Math.sin(elapsedTime * 1.8) * 0.025;

      // Animate floating corn puffs
      puffItems.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX * 0.02;
        item.mesh.rotation.y += item.rotSpeedY * 0.02;
        item.mesh.position.y =
          item.baseY +
          Math.sin(elapsedTime * item.floatSpeed + item.floatOffset) * 0.08;
      });

      // Podium ring rotation
      if (podiumRing) {
        podiumRing.rotation.z = elapsedTime * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      className={`relative w-full h-[450px] sm:h-[520px] md:h-[580px] lg:h-[620px] flex items-center justify-center select-none ${className}`}
    >
      {/* 3D Scene Canvas */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300 ${
          isDragging ? 'scale-[1.02]' : 'scale-100'
        }`}
        title="Faites glisser pour tourner le sachet en 3D !"
      />

      {/* Floating 3D Interactive Badge */}
      <div className="absolute top-4 right-4 sm:right-8 z-10 flex flex-col items-end gap-1.5 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-200 shadow-md text-xs font-black text-sky-700 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Vue 3D Interactive</span>
        </div>
        <p className="text-[11px] text-slate-500 font-semibold bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-md hidden sm:block shadow-sm">
          Faites glisser pour faire pivoter
        </p>
      </div>

      {/* Controls Bar at bottom of 3D canvas */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-100 shadow-lg">
        <button
          onClick={() => {
            if (threeState.current.bagGroup) {
              threeState.current.targetRotationY = 0;
              threeState.current.targetRotationX = 0;
              threeState.current.spinVelocity = Math.PI * 2;
              setShowingBack(false);
            }
          }}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            !showingBack
              ? 'bg-sky-500 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Vue Face
        </button>

        <button
          onClick={() => {
            if (threeState.current.bagGroup) {
              threeState.current.targetRotationY = Math.PI;
              threeState.current.targetRotationX = 0;
              setShowingBack(true);
            }
          }}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            showingBack
              ? 'bg-sky-500 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Voir le dos
        </button>
      </div>
    </div>
  );
}
