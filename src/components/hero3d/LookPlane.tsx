'use client';

import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import type { LookItem } from '@/data/karigarData';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Alpha-weighted blur kernel prevents dark edge halos on transparent PNGs
const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uBlur;
  uniform float uOpacity;
  uniform float uBrightness;
  uniform float uAlphaTest;
  uniform float uHighQuality;
  varying vec2 vUv;

  void main() {
    vec4 center = texture2D(uMap, vUv);
    vec4 color = center;

    if (uHighQuality > 0.5 && uBlur > 0.01) {
      float r = uBlur * 0.011;
      vec2 offsets[8];
      offsets[0] = vec2( r,  0.0);
      offsets[1] = vec2(-r,  0.0);
      offsets[2] = vec2( 0.0,  r);
      offsets[3] = vec2( 0.0, -r);
      offsets[4] = vec2( r * 0.707,  r * 0.707);
      offsets[5] = vec2(-r * 0.707,  r * 0.707);
      offsets[6] = vec2( r * 0.707, -r * 0.707);
      offsets[7] = vec2(-r * 0.707, -r * 0.707);

      vec3 rgbSum = center.rgb * center.a * 0.28;
      float weightSum = center.a * 0.28;
      float alphaSum = center.a * 0.28;

      for (int i = 0; i < 8; i++) {
        vec4 s = texture2D(uMap, vUv + offsets[i]);
        rgbSum += s.rgb * s.a * 0.09;
        weightSum += s.a * 0.09;
        alphaSum += s.a * 0.09;
      }

      vec3 finalRgb = weightSum > 0.001 ? rgbSum / weightSum : center.rgb;
      color = vec4(finalRgb, alphaSum);
    }

    if (color.a < uAlphaTest) discard;

    vec3 lit = color.rgb * uBrightness;
    gl_FragColor = vec4(lit, color.a * uOpacity);
  }
`;

interface LookPlaneProps {
  look: LookItem;
  index: number;
  progressRef: React.MutableRefObject<number>;
  lowPower: boolean;
  isMobile: boolean;
  isActiveSettled: boolean;
  onSelect: (index: number) => void;
}

export const LookPlane: React.FC<LookPlaneProps> = ({
  look,
  index,
  progressRef,
  lowPower,
  isMobile,
  isActiveSettled,
  onSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number | null>(null);

  const texture = useTexture(look.image, (tex) => {
    const t = Array.isArray(tex) ? tex[0] : tex;
    t.colorSpace = THREE.SRGBColorSpace;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.needsUpdate = true;
  });

  const aspect = useMemo(() => {
    const img = texture.image as { width?: number; height?: number } | undefined;
    if (img?.width && img?.height) {
      return img.width / img.height;
    }
    return 768 / 1360;
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uBlur: { value: 0 },
      uOpacity: { value: 1 },
      uBrightness: { value: 1 },
      uAlphaTest: { value: 0.12 },
      uHighQuality: { value: lowPower ? 0.0 : 1.0 },
    }),
    [texture, lowPower]
  );

  const planeHeight = isMobile ? 1.56 : 2.72;
  const planeWidth = planeHeight * aspect;

  useFrame(() => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    const mat = shaderRef.current;
    if (!group || !mesh || !mat) return;

    const progress = progressRef.current;
    const offset = index - progress;
    const baseFrontX = isMobile ? 0.0 : 0.85;
    const baseFrontY = isMobile ? planeHeight * 0.5 + 1.42 : planeHeight * 0.5;

    // Passed models (offset < 0): slide off left and fade out
    if (offset < 0) {
      const passed = Math.abs(offset);
      group.position.set(
        baseFrontX - passed * 2.35,
        baseFrontY - passed * 0.04,
        0.25 + passed * 0.35
      );
      const s = Math.max(0.84, 1 - passed * 0.08);
      group.scale.setScalar(s);
      const op = passed < 0.08 ? 1.0 : Math.max(0, 1 - (passed - 0.08) * 1.75);
      mat.uniforms.uOpacity.value = op;
      mat.uniforms.uBrightness.value = Math.max(0.4, 1 - passed * 0.35);
      mat.uniforms.uBlur.value = passed < 0.08 ? 0 : Math.min(1.0, passed * 0.55);
      mesh.renderOrder = 120;
      group.visible = op > 0.015;
      return;
    }

    // Receding queue (offset >= 0): smaller, higher, darker, progressively blurred
    const zigZagX =
      baseFrontX + Math.sin(index * 1.45) * (isMobile ? 0.14 : 0.22) + offset * (isMobile ? 0.34 : 0.52);
    const yPos = baseFrontY + offset * 0.14;
    const zPos = 0.25 - offset * 2.1;
    const scale = Math.max(0.38, 1 - offset * 0.088);
    const opacity = offset < 0.08 ? 1.0 : Math.max(0.16, 1 - offset * 0.125);
    const brightness = Math.max(0.34, 1 - offset * 0.115);
    const blur = offset < 0.08 ? 0 : Math.min(1.0, offset * 0.27);

    group.position.set(zigZagX, yPos, zPos);
    group.scale.setScalar(scale);
    mat.uniforms.uOpacity.value = opacity;
    mat.uniforms.uBrightness.value = brightness;
    mat.uniforms.uBlur.value = blur;
    mesh.renderOrder = Math.round(100 - offset * 10);
    group.visible = opacity > 0.02 && offset < 7.2;
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
      >
        <planeGeometry args={[planeWidth, planeHeight, 1, 1]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={true}
        />
      </mesh>

      {/* 3D-Projected Running-Stitch & Fabric Loupe Hotspots locked 1:1 to the front model */}
      {isActiveSettled && (
        <Html
          center
          position={[0, 0, 0.02]}
          style={{
            width: isMobile ? '24vh' : '44vh',
            height: isMobile ? '42.5vh' : '78vh',
            pointerEvents: 'none',
          }}
        >
          <div className="relative h-full w-full select-none">
            <svg
              viewBox="0 0 240 420"
              fill="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M120 26 C134 26 142 36 142 52 C142 64 134 72 134 76 L168 92 L182 192 L166 196 L158 142 L162 270 L150 392 L126 392 L122 282 L118 282 L114 392 L90 392 L78 270 L82 142 L74 196 L58 192 L72 92 L106 76 C106 72 98 64 98 52 C98 36 106 26 120 26 Z"
                stroke="#C9A24D"
                strokeWidth="1.35"
                strokeDasharray="5 5"
                strokeLinecap="round"
                className="opacity-75"
              />
            </svg>

            {look.hotspots.map((spot, idx) => {
              const isOpen = activeHotspotIdx === idx;
              return (
                <div
                  key={spot.label}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveHotspotIdx(idx)}
                    onMouseLeave={() => setActiveHotspotIdx(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspotIdx(isOpen ? null : idx);
                    }}
                    aria-label={spot.label}
                    className="group relative flex h-6 w-6 items-center justify-center rounded-full focus:outline-none"
                  >
                    <span className="absolute h-5 w-5 animate-ping rounded-full bg-gold/40" />
                    <span className="relative h-2.5 w-2.5 rounded-full border border-ivory bg-gold shadow-[0_0_12px_rgba(201,162,77,0.9)] transition-transform duration-300 group-hover:scale-125" />
                  </button>

                  {isOpen && (
                    <div
                      className={`pointer-events-none absolute top-1/2 z-50 flex -translate-y-1/2 items-center gap-2.5 ${
                        spot.x > 55 ? 'right-7 flex-row-reverse' : 'left-7 flex-row'
                      }`}
                    >
                      <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-full border-2 border-gold bg-charcoal shadow-[0_14px_36px_rgba(0,0,0,0.9)]">
                        <Image
                          src={spot.closeupImage}
                          alt={spot.label}
                          fill
                          sizes="76px"
                          className="object-cover scale-125"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-ivory/20 ring-1 ring-inset ring-ivory/25" />
                      </div>
                      <div className="whitespace-nowrap border border-gold/50 bg-charcoal/95 px-3 py-1.5 shadow-lg backdrop-blur-md">
                        <p className="font-sans text-[9.5px] uppercase tracking-[0.2em] text-gold-light">
                          {spot.label}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Html>
      )}
    </group>
  );
};
