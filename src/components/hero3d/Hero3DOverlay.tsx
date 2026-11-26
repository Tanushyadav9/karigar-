'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import type { LookItem } from '@/data/looks';

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

  // Duplicate pieces to create an infinite looping rail feeling
  const railPieces = [...currentLook.pieces, ...currentLook.pieces];
  // Derive lockstep horizontal shift directly from continuous progress
  const railShiftPx = -((liveProgress * 180) % (currentLook.pieces.length * 196));

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between px-6 pb-5 pt-24 sm:px-10 lg:px-14 lg:pt-28">
      {/* Upper Area: Left Editorial HUD */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div className="pointer-events-auto max-w-md">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold-light">
            The Queue of Karigars · Delhi Atelier
          </p>

          <h1 className="mt-3 font-display text-3xl font-light leading-[1.02] tracking-tight text-ivory sm:text-5xl lg:text-[3.35rem]">
            Where every thread is a{' '}
            <span className="italic text-gold-light">signature.</span>
          </h1>

          {/* Active Look Mask-Reveal Name & Hindi Name */}
          <div className="mt-6 overflow-hidden border-l border-gold/45 pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLook.id}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-65%', opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-display text-2xl text-ivory sm:text-3xl">
                  {currentLook.name}
                </div>
                <div className="mt-0.5 font-hindi text-base text-gold">
                  {currentLook.hindiName}
                </div>
                <p className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-ivory/65">
                  {currentLook.fabricLine}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Counter "03 / 08" + Stitched Progress Line */}
          <div className="mt-5 flex items-center gap-4">
            <span className="font-sans text-xs font-medium tracking-[0.26em] text-ivory tabular-nums">
              {counterLabel}
            </span>
            <div className="relative h-[2px] w-40 overflow-hidden bg-ivory/15">
              <div
                className="absolute inset-y-0 left-0 border-t-2 border-dashed border-gold transition-[width] duration-75"
                style={{ width: `${Math.max(8, Math.min(100, progressPercent))}%` }}
              />
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              {looks.slice(0, totalVisible).map((l, idx) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => onSelectLook(idx)}
                  aria-label={`View ${l.name}`}
                  className={`h-1.5 transition-all duration-300 ${
                    idx === activeIndex ? 'w-4 bg-gold' : 'w-1.5 bg-ivory/30 hover:bg-gold/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <a
              href="#collections"
              className="bg-gold px-6 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-charcoal transition-all duration-300 hover:bg-gold-light"
            >
              Explore Collections
            </a>
            <a
              href="#visit-us"
              className="border border-gold/55 bg-charcoal/50 px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Book a Fitting
            </a>
          </div>
        </div>

        {/* Right Hint */}
        <div className="hidden text-right lg:block">
          <p className="font-sans text-[10px] uppercase tracking-[0.26em] text-ivory/50">
            Drag · Scroll · Arrow Keys
          </p>
          <p className="mt-1 font-sans text-[11px] text-gold/75">
            Click any Karigar behind to bring forward
          </p>
        </div>
      </div>

      {/* Bottom: Infinite Looping Hang-Tag Rail Synchronized to `progress` */}
      <div className="pointer-events-auto relative mt-auto overflow-hidden border-t border-gold/20 bg-charcoal/75 pt-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-gold">
            Pieces in {currentLook.name}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory/45">
            Click + Enquire via WhatsApp
          </span>
        </div>

        <div className="relative w-full overflow-hidden pb-1">
          <div
            className="flex gap-3 will-change-transform"
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
                  className="group relative flex w-[184px] shrink-0 items-center gap-3 border border-gold/25 bg-charcoal-soft/90 p-2 transition-colors duration-300 hover:border-gold"
                >
                  {/* Hang-tag hole & thread */}
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full border border-gold/60 bg-charcoal" />

                  <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-charcoal">
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate font-display text-sm text-ivory">
                      {piece.name}
                    </p>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-sans text-[9.5px] uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
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
