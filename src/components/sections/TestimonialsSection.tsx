"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SAMPLE_CLIENT_STORIES } from "@/data/lookbook";
import { MandalaDivider } from "@/components/svg/MandalaArt";

/**
 * Oversized bespoke quotation mark formed from twin 4-hole couture buttons
 * and trailing curved antique-gold threads.
 */
function ButtonQuoteMark() {
  return (
    <svg
      width="86"
      height="54"
      viewBox="0 0 86 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-maroon"
    >
      {[20, 62].map((cx) => (
        <g key={cx}>
          {/* Trailing quote tail */}
          <path
            d={`M ${cx + 10} 22 C ${cx + 12} 36, ${cx + 2} 45, ${cx - 8} 49`}
            stroke="#C9A24D"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* 4-hole button mark */}
          <circle
            cx={cx}
            cy="20"
            r="14"
            fill="#F6EFE2"
            stroke="#C9A24D"
            strokeWidth="1.6"
          />
          <circle cx={cx} cy="20" r="10.5" stroke="#4A0F1C" strokeOpacity="0.28" strokeWidth="0.9" />
          <circle cx={cx - 3.6} cy="16.4" r="1.4" fill="#4A0F1C" />
          <circle cx={cx + 3.6} cy="16.4" r="1.4" fill="#4A0F1C" />
          <circle cx={cx - 3.6} cy="23.6" r="1.4" fill="#4A0F1C" />
          <circle cx={cx + 3.6} cy="23.6" r="1.4" fill="#4A0F1C" />
          <path
            d={`M ${cx - 3.6} 16.4 L ${cx + 3.6} 23.6 M ${cx + 3.6} 16.4 L ${cx - 3.6} 23.6`}
            stroke="#C9A24D"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = SAMPLE_CLIENT_STORIES[index];

  const handlePrev = () => {
    setIndex(
      (prev) =>
        (prev - 1 + SAMPLE_CLIENT_STORIES.length) %
        SAMPLE_CLIENT_STORIES.length
    );
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % SAMPLE_CLIENT_STORIES.length);
  };

  return (
    <section
      id="client-stories"
      className="relative z-20 bg-ivory px-gutter py-section text-charcoal"
    >
      <div className="mx-auto max-w-atelier">
        <MandalaDivider className="mb-12" />

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-atelier text-maroon">
              ०६ · Client Stories
            </p>
            <h2 className="mt-3 font-display text-4xl font-light tracking-tight-display text-charcoal sm:text-5xl">
              Words from{" "}
              <span className="italic text-maroon">Our Gentlemen</span>
            </h2>
          </div>

          <span className="border border-maroon/25 bg-ivory-muted/70 px-3 py-1 font-sans text-[9px] uppercase tracking-atelier text-maroon/80">
            Sample Testimonials
          </span>
        </div>

        {/* Slider Stage */}
        <div className="mt-12 border border-gold/40 bg-ivory-muted/45 p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <ButtonQuoteMark />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous client story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/35 text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-ivory"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next client story"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/35 text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-ivory"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-8 min-h-[190px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="max-w-4xl font-display text-2xl font-light italic leading-snug text-charcoal sm:text-3xl lg:text-4xl">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold/35 pt-6">
                  <div>
                    <p className="font-sans text-sm font-medium tracking-wide text-maroon">
                      {current.clientName}
                    </p>
                    <p className="mt-0.5 font-sans text-xs text-charcoal/70">
                      {current.occasion} · {current.city}
                    </p>
                  </div>

                  <span className="font-sans text-[10px] uppercase tracking-atelier text-maroon/80">
                    Commission: {current.garment}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Stitched Pagination Dots */}
          <div className="mt-8 flex items-center gap-3">
            {SAMPLE_CLIENT_STORIES.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                onClick={() => setIndex(idx)}
                aria-label={`Read testimonial from ${story.clientName}`}
                className={`h-1.5 transition-all duration-400 ${
                  idx === index
                    ? "w-10 bg-maroon"
                    : "w-4 bg-maroon/25 hover:bg-maroon/55"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
