'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { LookItem } from '@/data/karigarData';

interface Hero3DOverlayProps {
  looks: LookItem[];
  activeIndex: number;
  liveProgress: number;
  totalVisible: number;
  onSelectLook: (index: number) => void;
}

const WHATSAPP_BASE = 'https://wa.me/918595776323';

export const Hero3DOverlay: React.FC<Hero3DOverlayProps> = ({
  looks,
  activeIndex,
  liveProgress,
  totalVisible,
  onSelectLook,
}) => {
  const currentLook = looks[activeIndex] ?? looks[0];
  const counterLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(
    totalVisible
  ).padStart(2, '0')}`;
  const progressPercent =
    totalVisible > 1 ? (liveProgress / (totalVisible - 1)) * 100 : 100;

  // Infinite looping hang-tag rail synchronized in lockstep with `liveProgress`
  const railPieces = [...currentLook.pieces, ...currentLook.pieces, ...currentLook.pieces];
  const cardStride = 224;
  const loopWidth = currentLook.pieces.length * cardStride;
  const railShiftPx = -(((liveProgress * cardStride) % loopWidth + loopWidth) % loopWidth);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-end lg:justify-between">
      {/* Upper Editorial HUD:
          - Desktop (lg+): pinned cleanly to left column (max-w-[390px]), leaving right 65% open for 3D Queue
          - Mobile/Tablet (<lg): compact bottom editorial strip so the model owns the upper stage */}
      <div className="flex flex-col justify-between gap-1.5 bg-gradient-to-t from-charcoal via-charcoal/88 to-transparent px-4 pb-2 pt-8 sm:gap-3 sm:px-8 sm:pb-3 sm:pt-8 lg:flex-row lg:items-start lg:bg-none lg:px-14 lg:pb-0 lg:pt-28">
        <div className="pointer-events-auto max-w-[390px]">
          <p className="font-sans text-[8.5px] uppercase tracking-[0.22em] text-gold-light sm:text-[10px]">
            The Queue of Karigars · Delhi Atelier
          </p>

          <h1 className="mt-0.5 font-display text-[1.3rem] font-light leading-[1.06] tracking-tight text-ivory sm:mt-1.5 sm:text-4xl lg:mt-3 lg:text-[3.25rem]">
            Where every thread is a{' '}
            <span className="italic text-gold-light">signature.</span>
          </h1>

          {/* Active Look Mask-Reveal Name & Hindi Name (no mode="wait" so rapid drag never blanks) */}
          <div className="mt-2 overflow-hidden border-l border-gold/50 pl-3 lg:mt-5 lg:pl-4">
            <motion.div
              key={currentLook.id}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap items-baseline gap-x-2 font-display text-lg text-ivory sm:text-2xl lg:block lg:text-3xl">
                <span>{currentLook.name}</span>
                <span className="font-hindi text-xs text-gold lg:mt-0.5 lg:block lg:text-base">
                  · {currentLook.hindiName}
                </span>
              </div>
              <p className="mt-0.5 line-clamp-1 font-sans text-[9px] uppercase tracking-[0.16em] text-ivory/65 sm:text-[10px]">
                {currentLook.fabricLine}
              </p>
            </motion.div>
          </div>

          {/* Counter "03 / 08" + Stitched Progress Line */}
          <div className="mt-2.5 flex items-center gap-3 lg:mt-5">
            <span className="font-sans text-[11px] font-medium tracking-[0.22em] text-ivory tabular-nums sm:text-xs">
              {counterLabel}
            </span>
            <div className="relative h-[2px] w-24 overflow-hidden bg-ivory/15 sm:w-40">
              <div
                className="absolute inset-y-0 left-0 border-t-2 border-dashed border-gold transition-[width] duration-75"
                style={{
                  width: `${Math.max(8, Math.min(100, progressPercent))}%`,
                }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              {looks.slice(0, totalVisible).map((l, idx) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => onSelectLook(idx)}
                  aria-label={`View ${l.name}`}
                  className={`h-1.5 transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-4 bg-gold'
                      : 'w-1.5 bg-ivory/30 hover:bg-gold/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTAs — side-by-side on mobile to stay compact and never overlap model */}
          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 lg:mt-6">
            <a
              href="#collections"
              className="bg-gold px-3 py-2 text-center font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-charcoal transition-all duration-300 hover:bg-gold-light sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.22em] lg:px-6 lg:py-3"
            >
              Explore Collections
            </a>
            <a
              href="#visit-us"
              className="border border-gold/55 bg-charcoal/70 px-3 py-2 text-center font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-[0.22em] lg:px-6 lg:py-3"
            >
              Book a Fitting
            </a>
          </div>
        </div>

        {/* Right Hint (Desktop Only) */}
        <div className="hidden text-right lg:block">
          <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-ivory/55">
            Drag · Scroll · Arrow Keys
          </p>
          <p className="mt-1 font-sans text-[11px] text-gold/80">
            Click any Karigar behind to bring forward
          </p>
        </div>
      </div>

      {/* Bottom: Infinite Looping Tailor's Hang-Tag Rail Synchronized to `progress` */}
      <div className="pointer-events-auto relative border-t border-gold/25 bg-charcoal/88 px-5 pb-4 pt-3 backdrop-blur-md sm:px-8 lg:px-14">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="truncate font-sans text-[10px] uppercase tracking-[0.22em] text-gold">
            Pieces in {currentLook.name}
          </span>
          <span className="hidden shrink-0 font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/50 sm:inline">
            Tailor&apos;s Hang-Tags · + Enquire via WhatsApp
          </span>
        </div>

        {/* Horizontal golden cord that the tailor tags hang from */}
        <div className="relative w-full overflow-hidden pt-2.5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[5px] h-[1px] bg-gradient-to-r from-transparent via-gold/55 to-transparent"
          />

          <div
            className="flex gap-4 will-change-transform"
            style={{ transform: `translate3d(${railShiftPx}px, 0, 0)` }}
          >
            {railPieces.map((piece, idx) => {
              const message = encodeURIComponent(
                `Namaste Karigar Couture, I would like to enquire about "${piece.name}" from the "${currentLook.name}" (${currentLook.hindiName}) look.`
              );
              const waHref = `${WHATSAPP_BASE}?text=${message}`;

              return (
                <div
                  key={`${currentLook.id}-${piece.name}-${idx}`}
                  data-cursor="view"
                  className="group relative mt-1 flex w-[208px] shrink-0 items-center gap-3 border border-gold/35 bg-[#161311]/95 px-2.5 pb-2.5 pt-3.5 shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold"
                  style={{
                    clipPath:
                      'polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% 100%, 0% 100%, 0% 10px)',
                  }}
                >
                  {/* Gold thread loop tying the hang-tag to the rail cord */}
                  <svg
                    width="24"
                    height="14"
                    viewBox="0 0 24 14"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-[9px] left-1/2 -translate-x-1/2"
                  >
                    <path
                      d="M12 1 C8 1, 7 8, 12 11 C17 8, 16 1, 12 1 Z"
                      stroke="#C9A24D"
                      strokeWidth="1.2"
                      fill="none"
                    />
                  </svg>

                  {/* Brass/Gold Eyelet Hole */}
                  <span className="absolute left-1/2 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full border border-gold bg-charcoal shadow-[0_0_6px_rgba(201,162,77,0.5)]" />

                  {/* Inner dashed tailor stitch border */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-1 border border-dashed border-gold/20"
                  />

                  <div className="relative z-10 h-12 w-11 shrink-0 overflow-hidden border border-gold/20 bg-charcoal">
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      sizes="44px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <p className="line-clamp-1 font-display text-[13.5px] leading-tight text-ivory">
                      {piece.name}
                    </p>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 border-b border-gold/40 pb-0.5 font-sans text-[9.5px] uppercase tracking-[0.18em] text-gold transition-colors hover:border-gold hover:text-gold-light"
                    >
                      + Enquire
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
