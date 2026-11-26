"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type LenisType from "lenis";
import { MotionConfig } from "framer-motion";

interface SmoothScrollContextValue {
  isPreloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
  setScrollLocked: (locked: boolean) => void;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  isPreloaderDone: false,
  setPreloaderDone: () => {},
  setScrollLocked: () => {},
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisType | null>(null);
  const scrollTriggerRef = useRef<{ refresh: () => void } | null>(null);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  const applyScrollLock = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (locked) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;
    let lenis: LenisType | null = null;
    let cleanupTicker: (() => void) | null = null;
    let onScrollFn: (() => void) | null = null;

    const initLenis = async () => {
      if (cancelled || lenis) return;
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerRef.current = ScrollTrigger;

      const onScroll = () => ScrollTrigger.update();
      const raf = (time: number) => lenis?.raf(time * 1000);
      onScrollFn = onScroll;

      lenis = new Lenis({
        duration: prefersReducedMotion ? 0.01 : 1.35,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smoothWheel: !prefersReducedMotion,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;
      lenis.on("scroll", onScroll);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanupTicker = () => gsap.ticker.remove(raf);
    };

    const events = ["wheel", "touchstart", "scroll"] as const;
    const onFirstScroll = () => {
      void initLenis();
    };
    events.forEach((ev) =>
      window.addEventListener(ev, onFirstScroll, { passive: true, once: true })
    );
    const initId = window.setTimeout(() => void initLenis(), 4500);

    return () => {
      cancelled = true;
      window.clearTimeout(initId);
      events.forEach((ev) => window.removeEventListener(ev, onFirstScroll));
      cleanupTicker?.();
      if (lenis) {
        if (onScrollFn) lenis.off("scroll", onScrollFn);
        lenis.destroy();
      }
      lenisRef.current = null;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
    // Initialize Lenis once on mount; preloader & drawer lock effects manage stop/start
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    if (isPreloaderDone) {
      applyScrollLock(false);
      const timer = window.setTimeout(() => {
        scrollTriggerRef.current?.refresh();
      }, 150);
      return () => window.clearTimeout(timer);
    } else {
      applyScrollLock(true);
    }
  }, [isPreloaderDone, applyScrollLock]);

  const setPreloaderDone = useCallback((done: boolean) => {
    setIsPreloaderDone(done);
  }, []);

  const setScrollLocked = useCallback(
    (locked: boolean) => {
      applyScrollLock(locked);
    },
    [applyScrollLock]
  );

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, offset = -84) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          offset,
          duration: 1.4,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      isPreloaderDone,
      setPreloaderDone,
      setScrollLocked,
      scrollTo,
    }),
    [isPreloaderDone, setPreloaderDone, setScrollLocked, scrollTo]
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SmoothScrollContext.Provider>
  );
}
