'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import type { LookItem } from '@/data/looks';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

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
      float radius = uBlur * 0.0085;
      vec4 sum = center * 0.24;
      sum += texture2D(uMap, vUv + vec2( radius,  0.0)) * 0.11;
      sum += texture2D(uMap, vUv + vec2(-radius,  0.0)) * 0.11;
      sum += texture2D(uMap, vUv + vec2( 0.0,  radius)) * 0.11;
      sum += texture2D(uMap, vUv + vec2( 0.0, -radius)) * 0.11;
      sum += texture2D(uMap, vUv + vec2( radius * 0.7,  radius * 0.7)) * 0.08;
      sum += texture2D(uMap, vUv + vec2(-radius * 0.7,  radius * 0.7)) * 0.08;
      sum += texture2D(uMap, vUv + vec2( radius * 0.7, -radius * 0.7)) * 0.08;
      sum += texture2D(uMap, vUv + vec2(-radius * 0.7, -radius * 0.7)) * 0.08;
      color = sum;
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
  onSelect: (index: number) => void;
}

export const LookPlane: React.FC<LookPlaneProps> = ({
  look,
  index,
  progressRef,
  lowPower,
  onSelect,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(look.image);

  const aspect = useMemo(() => {
    const img = texture.image as { width?: number; height?: number } | undefined;
    if (img?.width && img?.height) {
      return img.width / img.height;
    }
    return 768 / 1360;
  }, [texture]);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uBlur: { value: 0 },
      uOpacity: { value: 1 },
      uBrightness: { value: 1 },
      uAlphaTest: { value: 0.08 },
      uHighQuality: { value: lowPower ? 0.0 : 1.0 },
    }),
    [texture, lowPower]
  );

  const planeHeight = 2.68;
  const planeWidth = planeHeight * aspect;

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const progress = progressRef.current;
    const offset = index - progress;

    // Passed models (offset < 0): slide left and fade out cleanly
    if (offset < 0) {
      const passed = Math.abs(offset);
      mesh.position.set(
        -0.15 - passed * 2.1,
        planeHeight * 0.5 - passed * 0.04,
        passed * 0.45
      );
      const s = Math.max(0.86, 1 + offset * 0.05);
      mesh.scale.setScalar(s);
      const op = Math.max(0, 1 - passed * 1.45);
      uniforms.uOpacity.value = op;
      uniforms.uBrightness.value = Math.max(0.5, 1 - passed * 0.3);
      uniforms.uBlur.value = Math.min(1.0, passed * 0.45);
      mesh.visible = op > 0.01;
      return;
    }

    // Receding queue (offset >= 0)
    const zigZagX = Math.sin(index * 1.45) * 0.24 + offset * 0.58 + 0.12;
    const yPos = planeHeight * 0.5 + offset * 0.11;
    const zPos = -offset * 2.05;
    const scale = Math.max(0.42, 1 - offset * 0.075);
    const opacity = Math.max(0.18, 1 - offset * 0.115);
    const brightness = Math.max(0.42, 1 - offset * 0.085);
    const blur = Math.min(1.0, offset * 0.22);

    mesh.position.set(zigZagX, yPos, zPos);
    mesh.scale.setScalar(scale);
    uniforms.uOpacity.value = opacity;
    uniforms.uBrightness.value = brightness;
    uniforms.uBlur.value = blur;
    mesh.visible = opacity > 0.02 && offset < 7.2;
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
      }}
    >
      <planeGeometry args={[planeWidth, planeHeight, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={true}
      />
    </mesh>
  );
};
