"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { MandalaWatermark } from "@/components/svg/MandalaArt";
import { looks } from "@/data/karigarData";
import * as THREE from "three";

export function Preloader() {
  const { setPreloaderDone } = useSmoothScroll();
  const [visible, setVisible] = useState(true);

  const finishPreloader = () => {
    setVisible(false);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const id = window.setTimeout(() => {
        setVisible(false);
        setPreloaderDone(true);
      }, 0);
      return () => window.clearTimeout(id);
    }

    let cancelled = false;
    const loader = new THREE.TextureLoader();

    const loadAllTextures = Promise.allSettled(
      looks.map(
        (look) =>
          new Promise<void>((resolve) => {
            loader.load(
              look.image,
              () => resolve(),
              undefined,
              () => {
                console.warn(`[Karigar Preloader] Failed to preload ${look.image}`);
                resolve();
              }
            );
          })
      )
    );

    const minDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, 1850)
    );
    const maxTimeout = new Promise<void>((resolve) =>
      window.setTimeout(resolve, 4200)
    );

    Promise.race([Promise.all([loadAllTextures, minDelay]), maxTimeout]).then(
      () => {
        if (!cancelled) setVisible(false);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [setPreloaderDone]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setPreloaderDone(true);
      }}
    >
      {visible && (
        <motion.div
          key="karigar-preloader"
          initial={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: {
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-charcoal px-6 text-ivory"
          aria-label="Loading Karigar Couture"
        >
          {/* Ambient Mandala Watermark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute flex items-center justify-center"
          >
            <MandalaWatermark className="h-[460px] w-[460px] sm:h-[580px] sm:w-[580px] animate-mandala-slow" />
          </motion.div>

          {/* 4-Hole Couture Button + Animated Golden Thread Pull */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <svg
                width="108"
                height="108"
                viewBox="0 0 108 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="preloader-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9D7B32" />
                    <stop offset="50%" stopColor="#DEC078" />
                    <stop offset="100%" stopColor="#C9A24D" />
                  </linearGradient>
                </defs>

                {/* Button rim */}
                <circle
                  cx="54"
                  cy="54"
                  r="46"
                  stroke="url(#preloader-gold)"
                  strokeWidth="1.5"
                />
                <circle
                  cx="54"
                  cy="54"
                  r="36"
                  stroke="#C9A24D"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                />

                {/* 4 Thread Holes */}
                <circle cx="42" cy="42" r="4.2" fill="#0B0A09" stroke="#C9A24D" strokeWidth="1.2" />
                <circle cx="66" cy="42" r="4.2" fill="#0B0A09" stroke="#C9A24D" strokeWidth="1.2" />
                <circle cx="42" cy="66" r="4.2" fill="#0B0A09" stroke="#C9A24D" strokeWidth="1.2" />
                <circle cx="66" cy="66" r="4.2" fill="#0B0A09" stroke="#C9A24D" strokeWidth="1.2" />

                {/* Thread pulled in from below, stitching X across the 4 holes, and exiting upward */}
                <motion.path
                  d="M 54 106 C 54 88, 36 82, 42 66 L 66 42 C 74 34, 42 28, 42 42 L 66 66 C 72 78, 54 90, 54 54 L 54 2"
                  stroke="url(#preloader-gold)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.75,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />
              </svg>
            </motion.div>

            {/* Brand Lockup */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-center"
            >
              <p className="font-hindi text-2xl tracking-wide text-gold-light">
                कारीगर
              </p>
              <h1 className="mt-1 font-display text-xl uppercase tracking-[0.34em] text-ivory sm:text-2xl">
                Karigar Couture
              </h1>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.28em] text-ivory/70">
                Creating Stylish Indian Outfits
              </p>
            </motion.div>
          </div>

          {/* Subtle skip action for returning guests */}
          <motion.button
            type="button"
            onClick={finishPreloader}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-8 font-sans text-[10px] uppercase tracking-atelier text-gold transition-colors hover:text-gold-light"
          >
            Enter Atelier
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
