"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { LOOKBOOK_ITEMS } from "@/data/lookbook";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function LookbookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const { setScrollLocked } = useSmoothScroll();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Gentle column-level parallax offsets for asymmetric editorial rhythm
  const col0Y = useTransform(scrollYProgress, [0, 1], [20, -35]);
  const col1Y = useTransform(scrollYProgress, [0, 1], [-18, 32]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [28, -42]);

  const columns = [
    LOOKBOOK_ITEMS.map((item, idx) => ({ item, idx })).filter(
      ({ item }) => item.column === 0
    ),
    LOOKBOOK_ITEMS.map((item, idx) => ({ item, idx })).filter(
      ({ item }) => item.column === 1
    ),
    LOOKBOOK_ITEMS.map((item, idx) => ({ item, idx })).filter(
      ({ item }) => item.column === 2
    ),
  ];

  const colTransforms = [col0Y, col1Y, col2Y];

  const goNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % LOOKBOOK_ITEMS.length
    );
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + LOOKBOOK_ITEMS.length) % LOOKBOOK_ITEMS.length
    );
  }, []);

  useEffect(() => {
    setScrollLocked(activeIndex !== null);
    return () => {
      if (activeIndex !== null) setScrollLocked(false);
    };
  }, [activeIndex, setScrollLocked]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goNext, goPrev]);

  const activeItem =
    activeIndex !== null ? LOOKBOOK_ITEMS[activeIndex] : null;

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative z-20 border-t border-gold/20 bg-charcoal px-gutter py-section text-ivory"
    >
      <div className="mx-auto max-w-atelier">
        {/* Intro */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
              ०५ · Lookbook Archive
            </p>
            <h2 className="mt-3 font-display text-4xl font-light leading-[1.04] tracking-tight-display text-ivory sm:text-6xl">
              Moments{" "}
              <span className="italic text-gold-foil">We&apos;ve Dressed</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-ivory/75 lg:col-span-5 lg:justify-self-end">
            Ten archival frames blending architectural mehrab arches and
            classic salon portraits. Select any plate to inspect full-screen.
          </p>
        </div>

        {/* Tablet & Mobile (< lg): Symmetric 1-col / 2-col Grid (10 cards = 5x2, zero orphan) */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <button
              key={`mob-${item.id}`}
              type="button"
              data-cursor="view"
              onClick={() => setActiveIndex(idx)}
              className={`group relative w-full overflow-hidden border border-gold/25 bg-charcoal-elevated text-left transition-colors duration-500 hover:border-gold/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                item.frame === "arch" ? "rounded-t-[999px]" : ""
              }`}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 92vw, 45vw"
                  className="object-cover object-top transition-transform duration-1200 ease-atelier group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                />
                {item.frame === "arch" && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2.5 rounded-t-[999px] border border-gold/25"
                  />
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-sans text-[9px] uppercase tracking-atelier text-gold-light">
                  {item.category}
                </p>
                <p className="mt-1 font-display text-xl font-light text-ivory sm:text-2xl">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop (>= lg): Asymmetric 3-Column Parallax Masonry */}
        <div className="mt-14 hidden grid-cols-3 gap-8 lg:grid">
          {columns.map((colItems, colIdx) => (
            <motion.div
              key={`lookbook-col-${colIdx}`}
              style={{ y: colTransforms[colIdx] }}
              className={`flex flex-col gap-6 lg:gap-8 ${
                colIdx === 1 ? "lg:pt-14" : colIdx === 2 ? "lg:pt-6" : ""
              }`}
            >
              {colItems.map(({ item, idx }) => (
                <button
                  key={item.id}
                  type="button"
                  data-cursor="view"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative w-full overflow-hidden border border-gold/25 bg-charcoal-elevated text-left transition-colors duration-500 hover:border-gold/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    item.frame === "arch" ? "rounded-t-[999px]" : ""
                  }`}
                >
                  <div className={`relative w-full ${item.aspectClass}`}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover object-top transition-transform duration-1200 ease-atelier group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                    />
                    {item.frame === "arch" && (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-2.5 rounded-t-[999px] border border-gold/25"
                      />
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-sans text-[9px] uppercase tracking-atelier text-gold-light">
                      {item.category}
                    </p>
                    <p className="mt-1 font-display text-xl font-light text-ivory sm:text-2xl">
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL WITH KEYBOARD & SWIPE NAVIGATION */}
      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <motion.div
            key="lookbook-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveIndex(null)}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
              const delta = endX - touchStartX.current;
              touchStartX.current = null;
              if (delta > 45) goPrev();
              if (delta < -45) goNext();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`Lookbook lightbox: ${activeItem.title}`}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-charcoal/95 p-4 backdrop-blur-lg sm:p-8"
          >
            {/* Top Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="mb-4 flex w-full max-w-4xl items-center justify-between"
            >
              <span className="font-sans text-[10px] uppercase tracking-atelier text-gold-light">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(LOOKBOOK_ITEMS.length).padStart(2, "0")} ·{" "}
                {activeItem.category}
              </span>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close lightbox"
                className="border border-gold/45 px-4 py-1.5 font-sans text-[10px] uppercase tracking-atelier text-gold transition-colors hover:bg-gold hover:text-charcoal"
              >
                Close (Esc)
              </button>
            </div>

            {/* Active Plate + Prev/Next Navigation */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-4xl items-center justify-center gap-3 sm:gap-6"
            >
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous lookbook image"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-charcoal/80 font-sans text-sm text-gold transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
              >
                ←
              </button>

              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`relative h-[62vh] max-h-[680px] w-full max-w-lg overflow-hidden border border-gold/35 bg-charcoal-elevated ${
                  activeItem.frame === "arch" ? "rounded-t-[999px]" : ""
                }`}
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  sizes="(max-width: 768px) 85vw, 520px"
                  className="object-cover object-top"
                />
              </motion.div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next lookbook image"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-charcoal/80 font-sans text-sm text-gold transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
              >
                →
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-4 text-center"
            >
              <p className="font-display text-2xl font-light text-ivory sm:text-3xl">
                {activeItem.title}
              </p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-atelier text-ivory/70">
                Use ← → keys or swipe to browse
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
