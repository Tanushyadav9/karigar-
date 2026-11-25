"use client";

import React, { useId, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { MandalaWatermark } from "@/components/svg/MandalaArt";
import { ButtonMark } from "@/components/svg/ButtonMark";

interface MehrabFrameProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  kenBurns?: boolean;
  className?: string;
  label?: string;
}

/**
 * Pointed Mughal Mehrab arched image frame with an antique-gold hairline rim
 * and custom "VIEW" cursor trigger.
 */
function MehrabFrame({
  src,
  alt,
  sizes,
  priority = false,
  kenBurns = false,
  className = "",
  label,
}: MehrabFrameProps) {
  const clipId = useId();
  // Normalized 0..1 pointed mehrab ogee arch silhouette
  const mehrabOutline =
    "M 0.5 0.01 C 0.72 0.08, 0.96 0.20, 0.985 0.36 L 0.985 0.99 L 0.015 0.99 L 0.015 0.36 C 0.04 0.20, 0.28 0.08, 0.5 0.01 Z";

  return (
    <div
      data-cursor="view"
      className={`group relative overflow-hidden bg-charcoal-elevated shadow-[0_30px_80px_rgba(0,0,0,0.65)] ${className}`}
      style={{
        clipPath: `url(#${clipId})`,
      }}
    >
      {/* Hidden SVG defining the normalized objectBoundingBox Mehrab clipPath */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={mehrabOutline} />
          </clipPath>
        </defs>
      </svg>

      {/* Garment Photograph */}
      <div
        className={`relative h-full w-full ${
          kenBurns ? "animate-[karigar-ken-burns_18s_ease-in-out_infinite_alternate]" : ""
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-1200 ease-atelier group-hover:scale-105"
        />
      </div>

      {/* Subtle warm editorial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/20"
      />

      {/* Matching Antique-Gold Mehrab Hairline Rim */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M 50 1 C 72 8, 96 20, 98.5 36 L 98.5 99 L 1.5 99 L 1.5 36 C 4 20, 28 8, 50 1 Z"
          fill="none"
          stroke="#C9A24D"
          strokeOpacity="0.55"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {label && (
        <span className="pointer-events-none absolute bottom-3 left-3 right-3 truncate font-sans text-[8px] uppercase tracking-editorial text-gold-light/90 sm:left-4 sm:right-4 sm:text-[9px] sm:tracking-atelier">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Rotating circular atelier seal ("HANDCRAFTED • DELHI • MADE TO MEASURE •")
 * encircling the signature 4-hole button mark.
 */
function HandcraftedBadge() {
  const pathId = useId();

  return (
    <div
      className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/25 bg-charcoal/80 backdrop-blur-md sm:h-32 sm:w-32"
      aria-label="Handcrafted in Delhi, Made to Measure"
    >
      <svg
        viewBox="0 0 140 140"
        className="h-full w-full animate-[mandala-drift_26s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
          />
        </defs>
        <text
          fill="#DEC078"
          fontSize="9.2"
          fontWeight="500"
          letterSpacing="3.1"
          className="font-sans uppercase"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            HANDCRAFTED • DELHI • MADE TO MEASURE •
          </textPath>
        </text>
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <ButtonMark size={30} />
      </div>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isPreloaderDone, scrollTo } = useSmoothScroll();
  const titleGradientId = useId();
  const stitchClipId = useId();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Differential scroll parallax speeds for the primary and two overlapping arches
  const primaryArchY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const secondaryLeftY = useTransform(scrollYProgress, [0, 1], [10, -95]);
  const secondaryRightY = useTransform(scrollYProgress, [0, 1], [-8, 55]);
  const mandalaOpacity = useTransform(scrollYProgress, [0, 0.8], [0.08, 0.02]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-charcoal px-gutter pb-0 pt-20 sm:pt-20"
    >
      {/* Charcoal-to-Maroon Atmospheric Gradient Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_28%,_rgba(74,15,28,0.72)_0%,_rgba(32,12,18,0.88)_48%,_#121212_100%)]"
      />

      {/* Faint Rotating Mandala Watermark */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: mandalaOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <MandalaWatermark
          className="h-[640px] w-[640px] sm:h-[820px] sm:w-[820px] animate-mandala-slow"
          strokeColor="#C9A24D"
        />
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-atelier flex-1 flex-col justify-center">
        {/* CENTERPIECE: Giant Devanagari "कारीगर" stitched by the golden thread + "COUTURE" */}
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <span className="sr-only">कारीगर Couture — Karigar Couture</span>

          <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[460px]">
            <svg
              viewBox="0 0 720 156"
              className="w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={titleGradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#9D7B32" />
                  <stop offset="35%" stopColor="#DEC078" />
                  <stop offset="68%" stopColor="#C9A24D" />
                  <stop offset="100%" stopColor="#DEC078" />
                </linearGradient>

                <clipPath id={stitchClipId}>
                  <motion.rect
                    x="0"
                    y="0"
                    height="156"
                    initial={{ width: 0 }}
                    animate={isPreloaderDone ? { width: 720 } : { width: 0 }}
                    transition={{
                      duration: 1.45,
                      delay: 0.15,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  />
                </clipPath>
              </defs>

              {/* Sweeping golden Ek Dhaaga thread crossing the screen to stitch कारीगर */}
              <motion.path
                d="M -220 92 C -60 56, 65 118, 175 88 C 285 56, 415 112, 540 84 C 660 56, 790 102, 940 80"
                fill="none"
                stroke={`url(#${titleGradientId})`}
                strokeWidth="1.4"
                strokeOpacity="0.65"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isPreloaderDone
                    ? { pathLength: 1, opacity: 0.7 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: 1.55,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* Subtle resting trace */}
              <text
                x="360"
                y="114"
                textAnchor="middle"
                fill="none"
                stroke="#C9A24D"
                strokeOpacity="0.14"
                strokeWidth="1"
                fontSize="118"
                style={{ fontFamily: "var(--font-hindi)" }}
              >
                कारीगर
              </text>

              {/* Layer 1: Running-Stitch (dashed) stroke sweeping left-to-right */}
              <g clipPath={`url(#${stitchClipId})`}>
                <motion.text
                  x="360"
                  y="114"
                  textAnchor="middle"
                  fill="transparent"
                  stroke={`url(#${titleGradientId})`}
                  strokeWidth="2.1"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                  fontSize="118"
                  style={{ fontFamily: "var(--font-hindi)" }}
                  initial={{ strokeDashoffset: 48 }}
                  animate={
                    isPreloaderDone
                      ? { strokeDashoffset: 0 }
                      : { strokeDashoffset: 48 }
                  }
                  transition={{
                    duration: 1.5,
                    delay: 0.15,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                >
                  कारीगर
                </motion.text>
              </g>

              {/* Layer 2: Lustrous antique-gold fill entering immediately after stitch */}
              <motion.text
                x="360"
                y="114"
                textAnchor="middle"
                fill={`url(#${titleGradientId})`}
                fontSize="118"
                style={{
                  fontFamily: "var(--font-hindi)",
                  filter: "drop-shadow(0 8px 28px rgba(201, 162, 77, 0.22))",
                }}
                initial={{ opacity: 0 }}
                animate={isPreloaderDone ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 1.05,
                  delay: 1.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                कारीगर
              </motion.text>
            </svg>
          </div>

          {/* Spaced Cormorant Caps "COUTURE" beneath कारीगर */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={
              isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
            }
            transition={{
              duration: 0.9,
              delay: 1.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="-mt-2 font-display text-sm font-normal uppercase tracking-[0.65em] text-ivory/90 sm:text-base"
          >
            Couture
          </motion.p>
        </div>

        {/* EDITORIAL SPLIT: Mobile stacks vertically with Arch Showcase FIRST */}
        <div className="mt-4 grid items-center gap-8 lg:mt-2 lg:grid-cols-12 lg:gap-8">
          {/* LEFT SIDE: Headline, 1-line subtext, Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={
              isPreloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
            }
            transition={{
              duration: 1,
              delay: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="order-2 flex flex-col items-start lg:order-1 lg:col-span-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/70" />
              <span className="font-sans text-[10px] uppercase tracking-atelier text-gold-light">
                Krishna Nagar · New Delhi
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-light leading-[1.03] tracking-tight-display text-ivory sm:text-5xl xl:text-[4.15rem]">
              Where every thread is a{" "}
              <span className="italic text-gold-foil">signature.</span>
            </h1>

            <p className="mt-5 max-w-xl font-sans text-sm font-light leading-relaxed text-ivory/75 sm:text-base">
              Bespoke Sherwanis, Indo-western suits &amp; Indian menswear,
              crafted in Delhi.
            </p>

            {/* Two CTAs: Gold Filled + Outlined */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#collections", -76);
                }}
                className="inline-flex items-center justify-center border border-gold bg-gold px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-atelier text-charcoal transition-all duration-500 ease-atelier hover:bg-gold-light"
              >
                Explore Collections
              </a>

              <a
                href="#visit-us"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#visit-us", -76);
                }}
                className="group relative inline-flex items-center justify-center overflow-hidden border border-gold/75 px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-atelier text-gold transition-colors duration-500 ease-atelier hover:text-charcoal"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-atelier group-hover:translate-x-0"
                />
                <span className="relative z-10">Book a Fitting</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Tall Mehrab Arch + 2 Overlapping Parallax Arches + Rotating Seal */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(8% 0 0 0)" }}
            animate={
              isPreloaderDone
                ? { opacity: 1, clipPath: "inset(0% 0 0 0)" }
                : { opacity: 0, clipPath: "inset(8% 0 0 0)" }
            }
            transition={{
              duration: 1.15,
              delay: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative order-1 mx-auto w-full max-w-[380px] pb-8 pt-2 lg:order-2 lg:col-span-6 lg:max-w-[430px]"
          >
            {/* Tall Primary Mehrab Arch: Sherwani with Parallax + Slow Ken Burns */}
            <motion.div
              style={{ y: primaryArchY }}
              className="relative mx-auto w-[78%] sm:w-[72%]"
            >
              <MehrabFrame
                src="/images/hero-sherwani.jpg"
                alt="Karigar Couture bespoke ivory and antique-gold embroidered sherwani"
                sizes="(max-width: 1024px) 75vw, 34vw"
                priority
                kenBurns
                className="aspect-[3/4] w-full"
              />
            </motion.div>

            {/* Overlapping Smaller Arch 1 (Bottom-Left): Indo-Western Bandhgala (Faster Parallax) */}
            <motion.div
              style={{ y: secondaryLeftY }}
              className="absolute bottom-2 left-0 z-20 w-[38%] sm:w-[36%]"
            >
              <MehrabFrame
                src="/images/hero-indowestern.jpg"
                alt="Tailored midnight-teal Indo-western bandhgala suit"
                sizes="(max-width: 1024px) 36vw, 16vw"
                label="Indo-Western"
                className="aspect-[3/4] w-full"
              />
            </motion.div>

            {/* Overlapping Smaller Arch 2 (Top-Right): Deep Maroon Kurta Detail (Counter Parallax) */}
            <motion.div
              style={{ y: secondaryRightY }}
              className="absolute right-0 top-0 z-20 w-[34%] sm:w-[33%]"
            >
              <MehrabFrame
                src="/images/hero-kurta.jpg"
                alt="Handcrafted deep maroon silk kurta with four-hole gold buttons"
                sizes="(max-width: 1024px) 32vw, 15vw"
                label="Silk Kurta"
                className="aspect-[3/4] w-full"
              />
            </motion.div>

            {/* Rotating Circular Badge: HANDCRAFTED • DELHI • MADE TO MEASURE • */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                isPreloaderDone
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={{
                duration: 0.9,
                delay: 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute bottom-0 right-2 z-30 sm:right-4"
            >
              <HandcraftedBadge />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR WITH CONTINUING THREAD DROP */}
      <div className="relative z-20 mt-4 flex flex-col items-center">
        <button
          type="button"
          onClick={() => scrollTo("#collections", -76)}
          className="group flex flex-col items-center gap-2 focus-visible:outline-none"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold-light/85 transition-colors group-hover:text-gold">
            Scroll
          </span>
          <div className="relative h-10 w-px overflow-hidden bg-gold/20">
            <motion.span
              aria-hidden="true"
              className="absolute left-0 top-0 h-8 w-full bg-gradient-to-b from-transparent via-gold-light to-gold"
              animate={{ y: ["-100%", "180%"] }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </button>
      </div>
    </section>
  );
}
