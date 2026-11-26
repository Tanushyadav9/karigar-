'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { looks } from '@/data/karigarData';
import { Hero3DOverlay } from '@/components/hero3d/Hero3DOverlay';

const QueueCanvas = dynamic(
  () => import('@/components/hero3d/QueueScene').then((m) => m.QueueCanvas),
  { ssr: false }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Single source of truth: damped `progress` (0 .. maxIndex)
  const progressRef = useRef<number>(2);
  const targetRef = useRef<number>(2);
  const velocityRef = useRef<number>(0);
  const wheelTimerRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStateRef = useRef<{ active: boolean; lastX: number }>({
    active: false,
    lastX: 0,
  });

  const [activeIndex, setActiveIndex] = useState(2);
  const [liveProgress, setLiveProgress] = useState(2);
  const [settled, setSettled] = useState(true);
  const [isInView, setIsInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const totalVisible = isMobile ? 5 : looks.length;
  const maxIndex = totalVisible - 1;

  useEffect(() => {
    const updateEnv = () => {
      const mobile = window.innerWidth < 1024;
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

  // Clamp progress if viewport shrinks to mobile (5 models)
  useEffect(() => {
    if (targetRef.current > maxIndex) {
      targetRef.current = maxIndex;
      progressRef.current = maxIndex;
      setActiveIndex(maxIndex);
      setLiveProgress(maxIndex);
    }
  }, [maxIndex]);

  // Pause 3D rendering when Hero scrolls off-screen
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

  // Unified spring-damper loop (zero jitter, heavy-fabric feel)
  useEffect(() => {
    if (reducedMotion) return;
    let rafId = 0;
    let lastReportedIdx = Math.round(progressRef.current);

    const tick = () => {
      if (!dragStateRef.current.active && Math.abs(velocityRef.current) > 0.0004) {
        targetRef.current = Math.max(
          0,
          Math.min(maxIndex, targetRef.current + velocityRef.current)
        );
        velocityRef.current *= 0.88;
        if (Math.abs(velocityRef.current) <= 0.0025) {
          velocityRef.current = 0;
          targetRef.current = Math.max(
            0,
            Math.min(maxIndex, Math.round(targetRef.current))
          );
        }
      }

      const diff = targetRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0005 || dragStateRef.current.active) {
        progressRef.current += diff * 0.14;
        setLiveProgress(progressRef.current);

        const nearest = Math.max(
          0,
          Math.min(maxIndex, Math.round(progressRef.current))
        );
        if (nearest !== lastReportedIdx) {
          lastReportedIdx = nearest;
          setActiveIndex(nearest);
        }

        const isNowSettled =
          !dragStateRef.current.active &&
          Math.abs(velocityRef.current) < 0.001 &&
          Math.abs(progressRef.current - nearest) < 0.035;
        setSettled(isNowSettled);
      } else if (progressRef.current !== targetRef.current) {
        progressRef.current = targetRef.current;
        setLiveProgress(targetRef.current);
        setSettled(true);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [maxIndex, reducedMotion]);

  const snapToIndex = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, idx));
      velocityRef.current = 0;
      targetRef.current = clamped;
      if (reducedMotion) {
        progressRef.current = clamped;
        setLiveProgress(clamped);
        setActiveIndex(clamped);
        setSettled(true);
      } else {
        setSettled(false);
      }
    },
    [maxIndex, reducedMotion]
  );

  // Keyboard arrow navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        snapToIndex(Math.round(targetRef.current) + 1);
      } else if (e.key === 'ArrowLeft') {
        snapToIndex(Math.round(targetRef.current) - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [snapToIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    dragStateRef.current = { active: true, lastX: e.clientX };
    velocityRef.current = 0;
    setSettled(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);

    if (!dragStateRef.current.active || reducedMotion) return;
    const dx = e.clientX - dragStateRef.current.lastX;
    dragStateRef.current.lastX = e.clientX;
    const step = -dx * 0.0052;
    targetRef.current = Math.max(0, Math.min(maxIndex, targetRef.current + step));
    velocityRef.current = step * 0.55;
  };

  const handlePointerUp = () => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    if (Math.abs(velocityRef.current) < 0.006) {
      velocityRef.current = 0;
      targetRef.current = Math.max(
        0,
        Math.min(maxIndex, Math.round(targetRef.current))
      );
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
      targetRef.current = Math.max(
        0,
        Math.min(maxIndex, targetRef.current + e.deltaX * 0.0028)
      );
      setSettled(false);
      window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        targetRef.current = Math.max(
          0,
          Math.min(maxIndex, Math.round(targetRef.current))
        );
      }, 180);
    }
  };

  const currentLook = looks[activeIndex] ?? looks[0];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-charcoal text-ivory"
    >
      {/* Dynamic Per-Look Background Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-colors duration-1000 ease-atelier"
        style={{
          background: `radial-gradient(circle at 64% 38%, ${currentLook.accentColor}66 0%, #16070B 56%, #121212 100%)`,
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
          <div className="flex h-full w-full items-center justify-center lg:pl-[28%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLook.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="relative h-[55vh] w-[280px]"
              >
                <Image
                  src={currentLook.image}
                  alt={currentLook.name}
                  fill
                  priority
                  sizes="280px"
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
            activeIndex={activeIndex}
            settled={settled}
            onSelectLook={snapToIndex}
          />
        )}
      </div>

      {/* HTML Editorial HUD Overlay + Lockstep Infinite Hang-Tag Rail */}
      <Hero3DOverlay
        looks={looks}
        activeIndex={activeIndex}
        liveProgress={liveProgress}
        totalVisible={totalVisible}
        onSelectLook={snapToIndex}
      />
    </section>
  );
}
