'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, DepthOfField, Noise } from '@react-three/postprocessing';
import type { LookItem } from '@/data/looks';
import { LookPlane } from './LookPlane';

interface QueueSceneContentProps {
  looks: LookItem[];
  progressRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  lowPower: boolean;
  isMobile: boolean;
  onSelectLook: (index: number) => void;
}

/**
 * Generates a high-resolution transparent canvas texture for the 3D background
 * "कारीगर" (Tiro Devanagari Hindi) + "COUTURE" (Cormorant Garamond) plane.
 */
function useBrandBackdropTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Huge "कारीगर" in Antique Gold
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(201, 162, 77, 0.22)';
    ctx.font = '400 340px "Tiro Devanagari Hindi", Georgia, serif';
    ctx.fillText('कारीगर', canvas.width / 2, canvas.height * 0.43);

    // "COUTURE" in spaced Cormorant caps below
    ctx.fillStyle = 'rgba(246, 239, 226, 0.20)';
    ctx.font = '300 76px "Cormorant Garamond", Georgia, serif';
    const spaced = 'C   O   U   T   U   R   E';
    ctx.fillText(spaced, canvas.width / 2, canvas.height * 0.72);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/**
 * Generates a subtle rotating mandala line-art watermark texture.
 */
function useMandalaTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const cx = 512;
    const cy = 512;
    ctx.strokeStyle = 'rgba(201, 162, 77, 0.14)';
    ctx.lineWidth = 1.5;

    [460, 390, 300, 210, 120].forEach((r, idx) => {
      ctx.beginPath();
      if (idx % 2 === 0) ctx.setLineDash([6, 10]);
      else ctx.setLineDash([]);
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.setLineDash([]);
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, -120);
      ctx.quadraticCurveTo(28, -260, 0, -455);
      ctx.quadraticCurveTo(-28, -260, 0, -120);
      ctx.stroke();
      ctx.restore();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function GoldDustParticles({ count = 140 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 5.5 + 0.1;
      arr[i * 3 + 2] = -Math.random() * 16 + 2.5;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + delta * 0.08;
      if (y > 5.6) y = 0.15;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#DFC17B"
        size={0.032}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

const QueueSceneContent: React.FC<QueueSceneContentProps> = ({
  looks,
  progressRef,
  pointerRef,
  lowPower,
  isMobile,
  onSelectLook,
}) => {
  const { camera } = useThree();
  const brandTex = useBrandBackdropTexture();
  const mandalaTex = useMandalaTexture();
  const mandalaRef = useRef<THREE.Mesh>(null);
  const backdropRef = useRef<THREE.Mesh>(null);
  const spotRef = useRef<THREE.SpotLight>(null);

  const visibleLooks = useMemo(
    () => (isMobile ? looks.slice(0, 5) : looks),
    [looks, isMobile]
  );

  useFrame((_, delta) => {
    // Gentle mouse / gyro camera parallax drift
    const targetCamX = 0.35 + pointerRef.current.x * 0.24;
    const targetCamY = 1.08 + pointerRef.current.y * 0.12;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);
    camera.lookAt(0.28, 1.32, -3.2);

    // Slow parallax on background 3D brand text & mandala rotation
    if (backdropRef.current) {
      backdropRef.current.position.x = 0.45 - pointerRef.current.x * 0.32;
    }
    if (mandalaRef.current) {
      mandalaRef.current.rotation.z += delta * 0.028;
    }
    if (spotRef.current) {
      spotRef.current.position.x = 0.6 + pointerRef.current.x * 0.4;
    }
  });

  return (
    <>
      <color attach="background" args={['#18070B']} />
      <fogExp2 attach="fog" args={['#260911', 0.068]} />

      {/* Studio Lighting */}
      <ambientLight intensity={0.45} color="#F6EFE2" />
      <spotLight
        ref={spotRef}
        position={[0.6, 5.2, 3.8]}
        angle={0.48}
        penumbra={0.85}
        intensity={48}
        color="#F0CF85"
        castShadow={!lowPower}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3.2, 2.4, -2]} intensity={8} color="#4A0F1C" />
      <pointLight position={[3.6, 2.2, -5]} intensity={10} color="#C9A24D" />

      {/* Rotating Mandala Watermark Plane */}
      {mandalaTex && (
        <mesh ref={mandalaRef} position={[0.45, 2.25, -13.5]}>
          <planeGeometry args={[11.5, 11.5]} />
          <meshBasicMaterial map={mandalaTex} transparent depthWrite={false} />
        </mesh>
      )}

      {/* Huge 3D "कारीगर / COUTURE" Backdrop Plane */}
      {brandTex && (
        <mesh ref={backdropRef} position={[0.45, 2.15, -11.2]}>
          <planeGeometry args={[12.8, 6.4]} />
          <meshBasicMaterial map={brandTex} transparent depthWrite={false} />
        </mesh>
      )}

      {/* Glossy Dark Atelier Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -4]} receiveShadow>
        <planeGeometry args={[36, 36]} />
        {lowPower || isMobile ? (
          <meshStandardMaterial color="#12080B" roughness={0.28} metalness={0.65} />
        ) : (
          <MeshReflectorMaterial
            blur={[320, 90]}
            resolution={512}
            mixBlur={0.85}
            mixStrength={18}
            roughness={0.42}
            depthScale={0.8}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#11070A"
            metalness={0.65}
            mirror={0.35}
          />
        )}
      </mesh>

      {/* Floating Gold Dust */}
      <GoldDustParticles count={lowPower || isMobile ? 65 : 140} />

      {/* The Queue of Karigars */}
      {visibleLooks.map((look, index) => (
        <LookPlane
          key={look.id}
          look={look}
          index={index}
          progressRef={progressRef}
          lowPower={lowPower}
          onSelect={onSelectLook}
        />
      ))}

      {/* High-Quality Desktop Postprocessing (Depth of Field + Subtle Film Grain) */}
      {!lowPower && !isMobile && (
        <EffectComposer multisampling={0}>
          <DepthOfField
            focusDistance={0.025}
            focalLength={0.035}
            bokehScale={2.2}
          />
          <Noise opacity={0.03} />
        </EffectComposer>
      )}
    </>
  );
};

interface QueueCanvasProps {
  looks: LookItem[];
  progressRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  isInView: boolean;
  lowPower: boolean;
  isMobile: boolean;
  onSelectLook: (index: number) => void;
}

export const QueueCanvas: React.FC<QueueCanvasProps> = ({
  looks,
  progressRef,
  pointerRef,
  isInView,
  lowPower,
  isMobile,
  onSelectLook,
}) => {
  const dpr: [number, number] = isMobile ? [1, 1.5] : [1, 2];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        pointerRef.current.x = THREE.MathUtils.clamp(e.gamma / 35, -1, 1);
        pointerRef.current.y = THREE.MathUtils.clamp((e.beta - 45) / 35, -1, 1);
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [pointerRef]);

  return (
    <Canvas
      shadows={!lowPower}
      dpr={dpr}
      frameloop={isInView ? 'always' : 'never'}
      camera={{ fov: 35, near: 0.1, far: 45, position: [0.35, 1.08, 5.35] }}
      gl={{
        antialias: !lowPower,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      className="h-full w-full"
    >
      <QueueSceneContent
        looks={looks}
        progressRef={progressRef}
        pointerRef={pointerRef}
        lowPower={lowPower}
        isMobile={isMobile}
        onSelectLook={onSelectLook}
      />
    </Canvas>
  );
};
