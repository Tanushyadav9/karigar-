"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  COLLECTIONS,
  CollectionGarment,
  buildWhatsAppEnquiryUrl,
} from "@/data/karigarData";
import { MandalaWatermark } from "@/components/svg/MandalaArt";

gsap.registerPlugin(ScrollTrigger);

interface GarmentImageWithLoupeProps {
  item: CollectionGarment;
}

/**
 * Arched garment display with a circular 2.5x fabric-detail magnifying loupe
 * that tracks the cursor smoothly on hover.
 */
function GarmentImageWithLoupe({ item }: GarmentImageWithLoupeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loupe, setLoupe] = useState({
    active: false,
    x: 0,
    y: 0,
    pctX: 50,
    pctY: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setLoupe({ active: true, x, y, pctX, pctY });
  };

  const handleMouseLeave = () => {
    setLoupe((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={containerRef}
      data-cursor="none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full overflow-hidden rounded-t-[999px] border border-gold/35 bg-charcoal-elevated shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 84vw, 38vw"
        className="object-cover object-top transition-transform duration-1200 ease-atelier group-hover:scale-[1.03]"
      />

      {/* Inner couture hairline arch frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2.5 rounded-t-[999px] border border-gold/25"
      />

      {/* Subtle bottom gradient for editorial depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent"
      />

      {/* Circular Fabric-Detail Magnifying Loupe (Desktop fine pointer) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute z-30 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-gold bg-charcoal shadow-[0_14px_45px_rgba(0,0,0,0.85)] transition-opacity duration-200 lg:block ${
          loupe.active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${loupe.x}px`,
          top: `${loupe.y}px`,
          backgroundImage: `url(${item.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "260%",
          backgroundPosition: `${loupe.pctX}% ${loupe.pctY}%`,
        }}
      >
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold-light/40" />
        <div className="absolute inset-x-0 bottom-2 text-center">
          <span className="rounded-full bg-charcoal/85 px-2.5 py-0.5 font-sans text-[8px] uppercase tracking-atelier text-gold-light">
            Fabric Detail
          </span>
        </div>
      </div>
    </div>
  );
}

interface CollectionCardProps {
  item: CollectionGarment;
  isActive: boolean;
}

function CollectionCard({ item, isActive }: CollectionCardProps) {
  return (
    <article
      className={`group relative grid h-full w-full grid-cols-1 items-center gap-6 overflow-hidden border bg-charcoal-elevated/85 p-6 backdrop-blur-sm transition-colors duration-700 ease-atelier sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10 ${
        isActive ? "border-gold/50" : "border-gold/20"
      }`}
    >
      {/* Subtle Rotating Mandala Outline Behind Each Card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.06]"
      >
        <MandalaWatermark className="h-[440px] w-[440px] animate-mandala-slow" />
      </div>

      {/* Left: Large Arched Garment Photograph */}
      <div className="relative z-10 mx-auto aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] lg:col-span-5 lg:h-full lg:max-h-[500px] lg:max-w-none">
        <GarmentImageWithLoupe item={item} />
      </div>

      {/* Right: Editorial Copy, Stitched Active Underline & WhatsApp Enquiry */}
      <div className="relative z-10 flex flex-col justify-between lg:col-span-7 lg:py-4">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="font-hindi text-base text-gold">
              {item.index}
            </span>
            <span className="h-px w-6 bg-gold/50" />
            <span className="font-hindi text-lg tracking-wide text-gold-light">
              {item.hindiName}
            </span>
          </div>

          <div className="relative mt-3 inline-block">
            <h3 className="font-display text-4xl font-light leading-none tracking-tight-display text-ivory sm:text-5xl xl:text-6xl">
              {item.name}
            </h3>

            {/* Golden Thread Underlining Active Garment Title */}
            <svg
              viewBox="0 0 320 14"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="mt-2 h-3 w-full overflow-visible"
            >
              <path
                d="M 0 7 Q 80 12, 160 7 T 320 7"
                fill="none"
                stroke="#C9A24D"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
              <motion.path
                d="M 0 7 Q 80 12, 160 7 T 320 7"
                fill="none"
                stroke="#DEC078"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={false}
                animate={{
                  pathLength: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0.25,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>

          <p className="mt-5 max-w-lg font-sans text-sm font-light leading-relaxed text-ivory/75 sm:text-base">
            {item.description}
          </p>
        </div>

        <div className="mt-8 space-y-6 border-t border-gold/20 pt-6">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-atelier text-gold/75">
              Fabric &amp; Craft
            </p>
            <p className="mt-1.5 font-sans text-xs tracking-editorial text-ivory/90 sm:text-sm">
              {item.fabric}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <a
              href={buildWhatsAppEnquiryUrl(item.whatsappText)}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative inline-flex items-center gap-3 overflow-hidden border border-gold/75 px-6 py-3 font-sans text-[10px] font-medium uppercase tracking-atelier text-gold transition-colors duration-500 ease-atelier hover:text-charcoal"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-atelier group-hover/btn:translate-x-0"
              />
              <span className="relative z-10">Enquire on WhatsApp</span>
              <span className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1">
                →
              </span>
            </a>

            <span className="hidden font-sans text-[10px] uppercase tracking-atelier text-ivory/65 sm:inline">
              Hover image for loupe
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

interface StitchProgressBarProps {
  progress: number;
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
}

function StitchProgressBar({
  progress,
  activeIndex,
  onSelectIndex,
}: StitchProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <div className="flex items-center gap-5">
      <span className="font-hindi text-sm text-gold">
        {COLLECTIONS[activeIndex]?.index ?? "०१"}
      </span>

      {/* Dashed Stitch Track */}
      <div className="relative flex flex-1 items-center">
        {/* Background basting trace */}
        <div
          aria-hidden="true"
          className="h-0.5 w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(201,162,77,0.24) 0px, rgba(201,162,77,0.24) 10px, transparent 10px, transparent 18px)",
          }}
        />

        {/* Active illuminated gold stitches */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-0.5 transition-[width] duration-150 ease-out"
          style={{
            width: `${clamped * 100}%`,
            backgroundImage:
              "repeating-linear-gradient(90deg, #DEC078 0px, #DEC078 10px, transparent 10px, transparent 18px)",
          }}
        />

        {/* 6 Interactive Garment Stitch Nodes */}
        <div className="absolute inset-x-0 flex items-center justify-between">
          {COLLECTIONS.map((item, idx) => {
            const passed = idx <= activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectIndex?.(idx)}
                aria-label={`Jump to ${item.name}`}
                className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                  idx === activeIndex
                    ? "scale-125 border-gold-light bg-gold"
                    : passed
                      ? "border-gold bg-gold/50"
                      : "border-gold/40 bg-charcoal"
                }`}
              />
            );
          })}
        </div>
      </div>

      <span className="font-sans text-[10px] uppercase tracking-atelier text-ivory/75">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(COLLECTIONS.length).padStart(2, "0")}
      </span>
    </div>
  );
}

export function CollectionsSection() {
  const pinStageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [desktopProgress, setDesktopProgress] = useState(0);
  const [desktopActive, setDesktopActive] = useState(0);
  const [mobileProgress, setMobileProgress] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);

  useEffect(() => {
    const pinStage = pinStageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!pinStage || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinStage,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: prefersReduced ? false : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setDesktopProgress(self.progress);
            const idx = Math.min(
              COLLECTIONS.length - 1,
              Math.round(self.progress * (COLLECTIONS.length - 1))
            );
            setDesktopActive(idx);
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;

      return () => {
        scrollTriggerRef.current = null;
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const handleDesktopSelect = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const ratio = idx / (COLLECTIONS.length - 1);
    const targetY = st.start + (st.end - st.start) * ratio;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = Math.max(0, Math.min(1, el.scrollLeft / maxScroll));
    setMobileProgress(ratio);
    setMobileActive(
      Math.min(
        COLLECTIONS.length - 1,
        Math.round(ratio * (COLLECTIONS.length - 1))
      )
    );
  };

  const handleMobileSelect = (idx: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section
      id="collections"
      className="relative z-20 overflow-x-clip border-t border-gold/15 bg-charcoal text-ivory"
    >
      {/* SECTION INTRO */}
      <div className="mx-auto max-w-atelier px-gutter pb-12 pt-section lg:pb-10">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
              ०१ · The Collections
            </p>
            <h2 className="mt-3 font-display text-4xl font-light leading-[1.02] tracking-tight-display text-ivory sm:text-6xl xl:text-7xl">
              The Wardrobe of a{" "}
              <span className="italic text-gold-foil">Gentleman</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-ivory/75 lg:col-span-5 lg:justify-self-end">
            Six foundational silhouettes cut from heritage weaves and modern
            tailoring—each finished by hand in our Krishna Nagar atelier.
          </p>
        </div>
      </div>

      {/* DESKTOP: HORIZONTALLY SCROLLING PINNED GALLERY */}
      <div
        ref={pinStageRef}
        className="hidden h-screen flex-col justify-between overflow-hidden px-gutter pb-10 pt-24 lg:flex"
      >
        <div className="mx-auto flex w-full max-w-atelier items-center justify-between border-b border-gold/15 pb-3">
          <span className="font-sans text-[10px] uppercase tracking-atelier text-gold-light/85">
            Karigar Couture · Six Signature Silhouettes
          </span>
          <span className="font-sans text-[10px] uppercase tracking-atelier text-ivory/70">
            Scroll to Traverse Gallery →
          </span>
        </div>

        <div
          ref={viewportRef}
          className="relative mx-auto flex w-full max-w-atelier flex-1 items-center overflow-hidden py-4"
        >
          <div ref={trackRef} className="flex w-max items-center gap-10 pr-16">
            {COLLECTIONS.map((item, idx) => (
              <div
                key={item.id}
                className="h-[66vh] min-h-[420px] max-h-[640px] w-[78vw] max-w-[1020px] shrink-0"
              >
                <CollectionCard item={item} isActive={idx === desktopActive} />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-atelier pt-2">
          <StitchProgressBar
            progress={desktopProgress}
            activeIndex={desktopActive}
            onSelectIndex={handleDesktopSelect}
          />
        </div>
      </div>

      {/* MOBILE / TABLET: SWIPEABLE SNAP-SCROLLING CAROUSEL */}
      <div className="pb-section lg:hidden">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-gutter pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {COLLECTIONS.map((item, idx) => (
            <div
              key={item.id}
              className="w-[86vw] max-w-[460px] shrink-0 snap-center"
            >
              <CollectionCard item={item} isActive={idx === mobileActive} />
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-atelier px-gutter">
          <StitchProgressBar
            progress={mobileProgress}
            activeIndex={mobileActive}
            onSelectIndex={handleMobileSelect}
          />
        </div>
      </div>
    </section>
  );
}
