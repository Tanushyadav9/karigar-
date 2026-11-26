"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { OCCASIONS, OccasionLook } from "@/data/karigarData";
import { buildWhatsAppEnquiryUrl } from "@/data/karigarData";
import { MandalaDivider, MandalaWatermark } from "@/components/svg/MandalaArt";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

function SmallMandalaIcon({ active }: { active: boolean }) {
  const petals = Array.from({ length: 8 }, (_, idx) => idx * 45);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-700 ease-atelier ${
        active ? "rotate-45 text-gold-light" : "text-gold/70"
      }`}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
      <circle cx="20" cy="20" r="4.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="20" r="1.4" fill="currentColor" />
      {petals.map((deg) => (
        <path
          key={deg}
          d="M20 15.5 C21.8 11.5, 21.8 7.5, 20 5 C18.2 7.5, 18.2 11.5, 20 15.5 Z"
          stroke="currentColor"
          strokeWidth="0.85"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
    </svg>
  );
}

export function OccasionsSection() {
  const { setScrollLocked, scrollTo } = useSmoothScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedLook, setSelectedLook] = useState<OccasionLook | null>(null);

  useEffect(() => {
    setScrollLocked(Boolean(selectedLook));
    return () => {
      if (selectedLook) setScrollLocked(false);
    };
  }, [selectedLook, setScrollLocked]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedLook(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section
      id="occasions"
      className="relative z-20 bg-ivory px-gutter pb-16 pt-section text-charcoal"
    >
      <div className="mx-auto max-w-atelier">
        <MandalaDivider className="mb-12" />

        {/* Section Intro */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-atelier text-maroon">
              ०२ · Moments in a Man&apos;s Life
            </p>
            <h2 className="mt-3 font-display text-4xl font-light leading-[1.04] tracking-tight-display text-charcoal sm:text-6xl">
              Dress for the{" "}
              <span className="italic text-maroon">Occasion</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-charcoal/80 lg:col-span-5 lg:justify-self-end">
            Rather than dressing by rack, step into six defining chapters—each
            styled with balanced proportions, heirloom weaves, and bespoke finish.
          </p>
        </div>

        {/* SIX-PANEL EXPANDING ACCORDION */}
        <div className="relative mt-14 flex flex-col gap-3 lg:h-[620px] lg:flex-row lg:gap-2">
          {/* Horizontal Golden Thread Passing Across Panel Seams (Behind Active Panel) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[22%] z-10 hidden -translate-y-1/2 lg:block"
          >
            <svg
              viewBox="0 0 1200 44"
              preserveAspectRatio="none"
              className="h-9 w-full overflow-visible"
            >
              <defs>
                <linearGradient id="occasion-thread-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9D7B32" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#DEC078" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9D7B32" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <path
                d="M 0 22 Q 150 8, 300 22 T 600 22 T 900 22 T 1200 22"
                fill="none"
                stroke="#C9A24D"
                strokeOpacity="0.24"
                strokeWidth="1"
                strokeDasharray="4 6"
                vectorEffect="non-scaling-stroke"
              />

              <motion.path
                key={activeIndex}
                d="M 0 22 Q 150 8, 300 22 T 600 22 T 900 22 T 1200 22"
                fill="none"
                stroke="url(#occasion-thread-gold)"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0.15, opacity: 0.5 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(201,162,77,0.45))",
                }}
              />
            </svg>
          </div>

          {OCCASIONS.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <motion.article
                key={item.id}
                layout
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 210,
                    damping: 28,
                    mass: 0.9,
                  },
                }}
                className={`group relative overflow-hidden border border-gold/30 bg-charcoal text-ivory transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? "z-20 h-[480px] lg:h-full lg:flex-[5]"
                    : "z-0 h-[76px] cursor-pointer lg:h-full lg:flex-[1] lg:hover:border-gold/60"
                }`}
              >
                {/* Stitched Eyelet Pin at Panel Seam (Desktop Thread Anchor) */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-2 top-[22%] z-30 hidden h-2 w-2 -translate-y-1/2 rounded-full border transition-colors duration-500 lg:block ${
                    isActive
                      ? "border-gold-light bg-gold shadow-[0_0_8px_rgba(222,192,120,0.8)]"
                      : "border-gold/50 bg-charcoal"
                  }`}
                />

                {/* Full-Bleed Look Image (Always mounted cleanly for instant spring transitions) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-atelier ${
                    isActive ? "opacity-100" : "opacity-15 lg:opacity-20"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 92vw, 48vw"
                    className={`object-cover object-top transition-transform duration-1200 ease-atelier ${
                      isActive ? "scale-100" : "scale-110 grayscale-[45%]"
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-t ${item.accentTone}`}
                  />
                </div>

                {/* INACTIVE LABEL STATE */}
                <AnimatePresence initial={false}>
                  {!isActive && (
                    <motion.div
                      key={`${item.id}-inactive`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative z-10 flex h-full w-full items-center justify-between px-5 lg:flex-col lg:px-3 lg:py-6"
                    >
                      <div className="flex items-center gap-3 lg:flex-col lg:gap-2">
                        <SmallMandalaIcon active={false} />
                        <span className="font-hindi text-xs text-gold/80">
                          {item.index}
                        </span>
                      </div>

                      {/* Vertical rotated title on desktop, crisp horizontal on mobile */}
                      <p className="font-display text-xl font-light tracking-wide text-ivory/90 lg:my-auto lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-2xl">
                        {item.title}
                      </p>

                      <span className="font-sans text-[9px] uppercase tracking-atelier text-gold/65 lg:hidden">
                        Tap
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ACTIVE EXPANDED PANEL CONTENT */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`${item.id}-active`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative z-20 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <SmallMandalaIcon active />
                          <span className="font-hindi text-sm text-gold-light">
                            {item.index}
                          </span>
                          <span className="font-sans text-[10px] uppercase tracking-atelier text-gold-light/90">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="max-w-lg">
                        <h3 className="font-display text-3xl font-light leading-tight text-ivory sm:text-5xl">
                          {item.title}
                        </h3>

                        <p className="mt-2 font-display text-lg italic text-gold-light sm:text-2xl">
                          &ldquo;{item.story}&rdquo;
                        </p>

                        {/* Garments Included */}
                        <div className="mt-5">
                          <p className="font-sans text-[9px] uppercase tracking-atelier text-ivory/65">
                            Ensemble Pieces
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {item.garments.map((piece) => (
                              <span
                                key={piece}
                                className="border border-gold/35 bg-charcoal/70 px-3 py-1 font-sans text-[10px] tracking-wide text-ivory/90 backdrop-blur-sm"
                              >
                                {piece}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLook(item);
                            }}
                            className="inline-flex items-center gap-2 border border-gold bg-gold px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-atelier text-charcoal transition-colors duration-400 hover:bg-gold-light"
                          >
                            <span>View this Look</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* LOOK DETAIL MODAL */}
      <AnimatePresence>
        {selectedLook && (
          <motion.div
            key="occasion-look-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setSelectedLook(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedLook.title} Look Details`}
              className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-gold/40 bg-charcoal-elevated text-ivory shadow-[0_40px_120px_rgba(0,0,0,0.85)] md:grid-cols-12"
            >
              {/* Faint Mandala Watermark */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 opacity-[0.06]"
              >
                <MandalaWatermark className="h-[380px] w-[380px]" />
              </div>

              <div className="relative aspect-[3/4] w-full md:col-span-5 md:aspect-auto md:min-h-[460px]">
                <Image
                  src={selectedLook.image}
                  alt={selectedLook.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 38vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="relative z-10 flex flex-col justify-between p-6 sm:p-10 md:col-span-7">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                      {selectedLook.index} · {selectedLook.subtitle}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedLook(null)}
                      aria-label="Close look details"
                      className="border border-gold/35 px-3 py-1 font-sans text-[10px] uppercase tracking-atelier text-gold transition-colors hover:border-gold hover:bg-gold hover:text-charcoal"
                    >
                      Close
                    </button>
                  </div>

                  <h3 className="mt-4 font-display text-4xl font-light text-ivory sm:text-5xl">
                    {selectedLook.title}
                  </h3>
                  <p className="mt-2 font-display text-xl italic text-gold-light">
                    &ldquo;{selectedLook.story}&rdquo;
                  </p>

                  <div className="mt-6 border-t border-gold/20 pt-5">
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold/80">
                      Garments Included
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selectedLook.garments.map((piece) => (
                        <li
                          key={piece}
                          className="flex items-center gap-2 font-sans text-xs text-ivory/85"
                        >
                          <span className="h-1 w-1 rounded-full bg-gold" />
                          <span>{piece}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-gold/20 pt-5">
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold/80">
                      Craft &amp; Textile Direction
                    </p>
                    <p className="mt-1.5 font-sans text-xs tracking-wide text-ivory/75">
                      {selectedLook.fabricNote}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={buildWhatsAppEnquiryUrl(
                      `Namaste Karigar Couture, I would like to book a consultation for the "${selectedLook.title}" (${selectedLook.subtitle}) look.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center border border-gold bg-gold px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-atelier text-charcoal transition-colors hover:bg-gold-light"
                  >
                    Enquire on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLook(null);
                      scrollTo("#design-your-look", -76);
                    }}
                    className="inline-flex items-center justify-center border border-gold/60 px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-atelier text-gold transition-colors hover:border-gold hover:text-gold-light"
                  >
                    Customise This Look
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
