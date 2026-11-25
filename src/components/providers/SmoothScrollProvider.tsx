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
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

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
  const lenisRef = useRef<Lenis | null>(null);
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

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.35,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    if (!isPreloaderDone) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      lenis.stop();
    }

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
    // Initialize Lenis once on mount; preloader & drawer lock effects manage stop/start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    if (isPreloaderDone) {
      applyScrollLock(false);
      const timer = window.setTimeout(() => {
        ScrollTrigger.refresh();
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
