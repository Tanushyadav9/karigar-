'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { looks } from '@/data/looks';
import { ActiveLookAnnotations } from '@/components/hero3d/ActiveLookAnnotations';
import { Hero3DOverlay } from '@/components/hero3d/Hero3DOverlay';

const QueueCanvas = dynamic(
  () => import('@/components/hero3d/QueueScene').then((m) => m.QueueCanvas),
  { ssr: false }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<number>(2); // Start at Look 03 ("03 / 08")
  const targetRef = useRef<number>(2);
  const velocityRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStateRef = useRef<{ active: boolean; lastX: number }>({
    active: false,
    lastX: 0,
  });
  const snapTweenRef = useRef<gsap.core.Tween | null>(null);

  const [activeIndex, setActiveIndex] = useState(2);
  const [liveProgress, setLiveProgress] = useState(2);
  const [settled, setSettled] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const totalVisible = isMobile ? 5 : looks.length;
  const maxIndex = totalVisible - 1;

  // Detect mobile, low-power hardware, and prefers-reduced-motion
  useEffect(() => {
    const updateEnv = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const cores = navigator.hardwareConcurrency ?? 8;
      setLowPower(mobile || cores <= 4);
      setReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };
    updateEnv();
    window.addEventListener('resize', updateEnv);
    return () => window.removeEventListener('resize', updateEnv);
  }, []);

  // Pause WebGL rendering when Hero scrolls off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const snapToNearest = useCallback(
    (explicitIndex?: number) => {
      const clampedTarget = Math.max(
        0,
        Math.min(
          maxIndex,
          explicitIndex !== undefined ? explicitIndex : Math.round(targetRef.current)
        )
      );
      targetRef.current = clampedTarget;
      snapTweenRef.current?.kill();
      const proxy = { val: progressRef.current };
      snapTweenRef.current = gsap.to(proxy, {
        val: clampedTarget,
        duration: 0.78,
        ease: 'power3.out',
        onUpdate: () => {
          progressRef.current = proxy.val;
          setLiveProgress(proxy.val);
          const nearest = Math.max(0, Math.min(maxIndex, Math.round(proxy.val)));
          setActiveIndex(nearest);
          setSettled(Math.abs(proxy.val - nearest) < 0.06);
        },
        onComplete: () => {
          progressRef.current = clampedTarget;
          setLiveProgress(clampedTarget);
          setActiveIndex(clampedTarget);
          setSettled(true);
        },
      });
    },
    [maxIndex]
  );

  // Heavy-fabric damping loop when dragging/coasting
  useEffect(() => {
    if (reducedMotion) return;
    let rafId = 0;

    const tick = () => {
      if (dragStateRef.current.active || Math.abs(velocityRef.current) > 0.0005) {
        if (!dragStateRef.current.active) {
          targetRef.current = Math.max(
            0,
            Math.min(maxIndex, targetRef.current + velocityRef.current)
          );
          velocityRef.current *= 0.9;
          if (Math.abs(velocityRef.current) <= 0.002) {
            velocityRef.current = 0;
            snapToNearest();
          }
        }
        const diff = targetRef.current - progressRef.current;
        progressRef.current += diff * 0.16;
        setLiveProgress(progressRef.current);
        const nearest = Math.max(0, Math.min(maxIndex, Math.round(progressRef.current)));
        setActiveIndex(nearest);
        setSettled(Math.abs(progressRef.current - nearest) < 0.06 && !dragStateRef.current.active);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [maxIndex, reducedMotion, snapToNearest]);

  // Keyboard arrow navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        snapToNearest(Math.min(maxIndex, activeIndex + 1));
      } else if (e.key === 'ArrowLeft') {
        snapToNearest(Math.max(0, activeIndex - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, maxIndex, snapToNearest]);

  const handleSelectLook = useCallback(
    (idx: number) => {
      if (reducedMotion) {
        const clamped = Math.max(0, Math.min(maxIndex, idx));
        setActiveIndex(clamped);
        setLiveProgress(clamped);
        return;
      }
      snapToNearest(idx);
    },
    [maxIndex, reducedMotion, snapToNearest]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    snapTweenRef.current?.kill();
    dragStateRef.current = { active: true, lastX: e.clientX };
    velocityRef.current = 0;
    setSettled(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Update subtle camera parallax coordinates (-1..1)
    pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);

    if (!dragStateRef.current.active || reducedMotion) return;
    const dx = e.clientX - dragStateRef.current.lastX;
    dragStateRef.current.lastX = e.clientX;
    const step = -dx * 0.0055;
    targetRef.current = Math.max(0, Math.min(maxIndex, targetRef.current + step));
    velocityRef.current = step * 0.65;
  };

  const handlePointerUp = () => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    if (Math.abs(velocityRef.current) < 0.008) {
      velocityRef.current = 0;
      snapToNearest();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Allow horizontal wheel / trackpad swipe to scrub the queue cleanly
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
      snapTweenRef.current?.kill();
      const next = Math.max(0, Math.min(maxIndex, targetRef.current + e.deltaX * 0.003));
      targetRef.current = next;
      progressRef.current += (next - progressRef.current) * 0.35;
      setLiveProgress(progressRef.current);
      setActiveIndex(Math.round(progressRef.current));
      setSettled(false);
      window.clearTimeout((sectionRef.current as unknown as { _wt?: number })?._wt);
      if (sectionRef.current) {
        (sectionRef.current as unknown as { _wt?: number })._wt = window.setTimeout(
          () => snapToNearest(),
          180
        );
      }
    }
  };

  const currentLook = looks[activeIndex] ?? looks[0];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-charcoal text-ivory"
    >
      {/* Dynamic Per-Look Background Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-colors duration-1000 ease-atelier"
        style={{
          background: `radial-gradient(circle at 60% 42%, ${currentLook.accentColor}66 0%, #16070B 56%, #121212 100%)`,
        }}
      />

      {/* Interactive 3D Stage (or Reduced-Motion Crossfade Fallback) */}
      <div
        data-cursor="drag"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative z-10 h-full w-full touch-pan-y"
      >
        {reducedMotion ? (
          <div className="flex h-full w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLook.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="relative h-[66vh] w-[320px]"
              >
                <Image
                  src={currentLook.image}
                  alt={currentLook.name}
                  fill
                  priority
                  sizes="320px"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <QueueCanvas
            looks={looks}
            progressRef={progressRef}
            pointerRef={pointerRef}
            isInView={isInView}
            lowPower={lowPower}
            isMobile={isMobile}
            onSelectLook={handleSelectLook}
          />
        )}
      </div>

      {/* Silhouette Running-Stitch Outline + Gold Fabric Loupe Hotspots */}
      <ActiveLookAnnotations look={currentLook} settled={settled} />

      {/* HTML Editorial HUD Overlay + Lockstep Infinite Hang-Tag Rail */}
      <Hero3DOverlay
        looks={looks}
        activeIndex={activeIndex}
        liveProgress={liveProgress}
        totalVisible={totalVisible}
        onSelectLook={handleSelectLook}
      />
    </section>
  );
}
