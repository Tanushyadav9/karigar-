'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { LookItem } from '@/data/looks';

interface ActiveLookAnnotationsProps {
  look: LookItem;
  settled: boolean;
}

/**
 * Overlay aligned over the foreground Karigar model when settled:
 * - Animated golden running-stitch SVG silhouette outline
 * - 3–4 interactive gold hotspot dots (collar, embroidery, buttons, hem)
 * - Circular loupe revealing fabric close-up + label on hover/tap
 */
export const ActiveLookAnnotations: React.FC<ActiveLookAnnotationsProps> = ({
  look,
  settled,
}) => {
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center lg:justify-start lg:pl-[33%]">
      <div className="relative h-[58vh] w-[260px] sm:h-[64vh] sm:w-[310px]">
        <AnimatePresence>
          {settled && (
            <motion.div
              key={look.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative h-full w-full"
            >
              {/* Running-stitch Golden Silhouette Outline */}
              <svg
                viewBox="0 0 240 420"
                fill="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <motion.path
                  d="M120 26 C134 26 142 36 142 52 C142 64 134 72 134 76 L168 92 L182 192 L166 196 L158 142 L162 270 L150 392 L126 392 L122 282 L118 282 L114 392 L90 392 L78 270 L82 142 L74 196 L58 192 L72 92 L106 76 C106 72 98 64 98 52 C98 36 106 26 120 26 Z"
                  stroke="#C9A24D"
                  strokeWidth="1.25"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.72 }}
                  transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>

              {/* Interactive Gold Hotspot Dots */}
              {look.hotspots.map((spot, idx) => {
                const isOpen = activeHotspotIdx === idx;
                return (
                  <div
                    key={spot.label}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setActiveHotspotIdx(idx)}
                      onMouseLeave={() => setActiveHotspotIdx(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspotIdx(isOpen ? null : idx);
                      }}
                      aria-label={spot.label}
                      className="group relative flex h-6 w-6 items-center justify-center rounded-full focus:outline-none"
                    >
                      <span className="absolute h-6 w-6 animate-ping rounded-full bg-gold/35" />
                      <span className="relative h-2.5 w-2.5 rounded-full border border-ivory bg-gold shadow-[0_0_12px_rgba(201,162,77,0.8)] transition-transform duration-300 group-hover:scale-125" />
                    </button>

                    {/* Circular Fabric Loupe Popover */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 6 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="pointer-events-none absolute left-8 top-1/2 z-40 flex -translate-y-1/2 items-center gap-3"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-gold bg-charcoal shadow-[0_12px_36px_rgba(0,0,0,0.85)]">
                            <Image
                              src={spot.closeupImage}
                              alt={spot.label}
                              fill
                              sizes="80px"
                              className="object-cover scale-125"
                            />
                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-ivory/20" />
                          </div>
                          <div className="whitespace-nowrap border border-gold/40 bg-charcoal/95 px-3 py-1.5 backdrop-blur-md">
                            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-light">
                              {spot.label}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
