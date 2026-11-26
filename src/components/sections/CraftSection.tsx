"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { CRAFT_STATS, CRAFT_STEPS, CraftStat, CraftStep } from "@/data/karigarData";
import { ButtonMark } from "@/components/svg/ButtonMark";
import { MandalaWatermark } from "@/components/svg/MandalaArt";

function CraftStepRow({ step, idx }: { step: CraftStep; idx: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.12 });
  const isEven = idx % 2 === 0;

  return (
    <article
      ref={rowRef}
      className="relative grid grid-cols-1 items-center gap-8 pl-12 lg:grid-cols-2 lg:gap-20 lg:pl-0"
    >
      {/* Central 4-Hole Button Stitch Node */}
      <div
        aria-hidden="true"
        className="absolute left-4 top-2 z-20 -translate-x-1/2 rounded-full bg-charcoal-elevated p-1 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
      >
        <ButtonMark size={26} />
      </div>

      {/* Step Editorial Text Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`${
          isEven
            ? "lg:order-1 lg:pr-8 lg:text-right"
            : "lg:order-2 lg:pl-8 lg:text-left"
        }`}
      >
        <div
          className={`flex items-baseline gap-3 ${
            isEven ? "lg:justify-end" : "lg:justify-start"
          }`}
        >
          <span className="font-display text-3xl font-light text-gold/90">
            {step.number}
          </span>
          <span className="h-px w-6 bg-gold/50" />
          <span className="font-hindi text-base text-gold-light">
            {step.hindiLabel}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-atelier text-ivory/70">
            ({step.transliteration})
          </span>
        </div>

        <h3 className="mt-3 font-display text-3xl font-light text-ivory sm:text-4xl">
          {step.title}
        </h3>

        <p
          className={`mt-4 max-w-md font-sans text-sm font-light leading-relaxed text-ivory/75 ${
            isEven ? "lg:ml-auto" : ""
          }`}
        >
          {step.description}
        </p>

        <p className="mt-4 font-sans text-[10px] uppercase tracking-atelier text-gold/85">
          {step.craftDetail}
        </p>
      </motion.div>

      {/* Step Image Slot with Fabric-Unfold Reveal */}
      <motion.div
        initial={{ clipPath: "inset(14% 0 0 0)", opacity: 0 }}
        animate={
          inView
            ? { clipPath: "inset(0% 0 0 0)", opacity: 1 }
            : { clipPath: "inset(14% 0 0 0)", opacity: 0 }
        }
        transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        data-cursor={step.id === "katai-silai" ? "scissors" : "view"}
        className={`group relative aspect-[4/3] w-full overflow-hidden border border-gold/30 bg-charcoal shadow-[0_24px_70px_rgba(0,0,0,0.55)] ${
          isEven ? "lg:order-2 lg:pl-0" : "lg:order-1"
        }`}
      >
        <Image
          src={step.image}
          alt={step.alt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 88vw, 42vw"
          className="object-cover transition-transform duration-1200 ease-atelier group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/15"
        />
        <span className="pointer-events-none absolute bottom-3 left-4 font-sans text-[9px] uppercase tracking-atelier text-gold-light/90">
          {step.number} · {step.transliteration}
        </span>
      </motion.div>
    </article>
  );
}

function AnimatedCounterValue({ stat }: { stat: CraftStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(
    stat.numericValue !== undefined ? 0 : null
  );

  useEffect(() => {
    if (!inView || stat.numericValue === undefined) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      const id = window.setTimeout(() => {
        setDisplayValue(stat.numericValue ?? 0);
      }, 0);
      return () => window.clearTimeout(id);
    }

    const controls = animate(0, stat.numericValue, {
      duration: 1.65,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, stat.numericValue]);

  return (
    <div ref={ref} className="text-center lg:text-left">
      <p className="font-display text-4xl font-light tracking-tight-display text-gold-foil sm:text-5xl">
        {stat.staticDisplay
          ? stat.staticDisplay
          : `${displayValue ?? 0}${stat.suffix ?? ""}`}
      </p>
      <p className="mt-2 font-sans text-xs uppercase tracking-atelier text-ivory">
        {stat.label}
      </p>
      <p className="mt-1 font-sans text-[11px] font-light text-ivory/70">
        {stat.sublabel}
      </p>
    </div>
  );
}

function ScissorCutTransition() {
  const cutRef = useRef<HTMLDivElement>(null);
  const [snippedManually, setSnippedManually] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cutRef,
    offset: ["start 92%", "center 55%"],
  });

  // As the user scrolls past the counter strip, the scissor blades close & sever the thread
  const topBladeRotate = useTransform(scrollYProgress, [0, 0.85], [-24, -3]);
  const bottomBladeRotate = useTransform(scrollYProgress, [0, 0.85], [24, 3]);
  const cutSpread = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const dividerScaleX = useTransform(scrollYProgress, [0.5, 1], [0.08, 1]);

  return (
    <div
      ref={cutRef}
      className="relative mt-16 flex flex-col items-center pt-4"
    >
      {/* Incoming golden thread above the scissors */}
      <div className="h-14 w-px bg-gradient-to-b from-gold/80 to-gold-light" />

      {/* Interactive & Scroll-Driven Brass Tailor Shears */}
      <button
        type="button"
        data-cursor="scissors"
        onClick={() => setSnippedManually((prev) => !prev)}
        aria-label="Tailor scissors thread cut transition"
        className="group relative z-20 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-charcoal/90 backdrop-blur-sm transition-colors duration-500 hover:border-gold"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible drop-shadow-[0_0_12px_rgba(201,162,77,0.35)]"
          aria-hidden="true"
        >
          {/* Upper Shear Blade + Finger Loop */}
          <motion.g
            style={{
              rotate: snippedManually ? -3 : topBladeRotate,
              transformOrigin: "32px 32px",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <circle cx="15" cy="22" r="7" stroke="#DEC078" strokeWidth="1.6" />
            <path
              d="M21 25 L54 33 L31 33 Z"
              fill="#C9A24D"
              fillOpacity="0.25"
              stroke="#DEC078"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Lower Shear Blade + Finger Loop */}
          <motion.g
            style={{
              rotate: snippedManually ? 3 : bottomBladeRotate,
              transformOrigin: "32px 32px",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <circle cx="15" cy="42" r="7" stroke="#DEC078" strokeWidth="1.6" />
            <path
              d="M21 39 L54 31 L31 31 Z"
              fill="#C9A24D"
              fillOpacity="0.25"
              stroke="#DEC078"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Brass Pivot Screw */}
          <circle cx="32" cy="32" r="2.5" fill="#F6EFE2" stroke="#9D7B32" strokeWidth="1" />
        </svg>
      </button>

      {/* Severed Thread Ends + Opening Fabric Seam */}
      <motion.div
        style={{ opacity: cutSpread }}
        className="mt-2 flex flex-col items-center gap-1"
      >
        <span className="h-3 w-px bg-gold/70" />
        <span className="font-sans text-[9px] uppercase tracking-atelier text-gold/80">
          Thread Cut · Entering The Atelier
        </span>
      </motion.div>

      <motion.div
        style={{ scaleX: dividerScaleX }}
        className="mt-6 h-px w-full origin-center bg-gradient-to-r from-transparent via-gold/75 to-transparent"
      />
    </div>
  );
}

export function CraftSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 70%"],
  });

  const threadScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="craft"
      className="relative z-20 overflow-hidden border-t border-gold/20 bg-charcoal-elevated px-gutter py-section text-ivory"
    >
      {/* Subtle Mandala Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 opacity-[0.055]"
      >
        <MandalaWatermark className="h-[580px] w-[580px] animate-mandala-slow" />
      </div>

      <div className="relative z-10 mx-auto max-w-atelier">
        {/* Section Intro */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-atelier text-gold-light">
              ०४ · The Craft
            </p>
            <h2 className="mt-3 font-display text-4xl font-light leading-[1.04] tracking-tight-display text-ivory sm:text-6xl">
              Six Stages of One{" "}
              <span className="italic text-gold-foil">Unbroken Thread</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-ivory/75 lg:col-span-5 lg:justify-self-end">
            From your initial consultation to final steam calibration, every
            Karigar Couture garment passes through six disciplined hands-on
            rituals inside our Delhi workshop.
          </p>
        </div>

        {/* SCROLL-DRIVEN CENTRAL GOLDEN THREAD TIMELINE */}
        <div ref={timelineRef} className="relative mt-20 pb-8">
          {/* Ghost Dashed Basting Spine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 lg:left-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(201,162,77,0.28) 0px, rgba(201,162,77,0.28) 6px, transparent 6px, transparent 13px)",
            }}
          />

          {/* Scroll-Scrubbed Active Golden Thread */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: threadScaleY }}
            className="pointer-events-none absolute bottom-0 left-4 top-0 w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-gold-light via-gold to-gold-light shadow-[0_0_12px_rgba(201,162,77,0.55)] lg:left-1/2"
          />

          <div className="space-y-16 lg:space-y-24">
            {CRAFT_STEPS.map((step, idx) => (
              <CraftStepRow key={step.id} step={step} idx={idx} />
            ))}
          </div>
        </div>

        {/* ANIMATED COUNTER STRIP */}
        <div className="mt-20 grid grid-cols-2 gap-8 border-y border-gold/25 py-12 lg:grid-cols-4">
          {CRAFT_STATS.map((stat) => (
            <AnimatedCounterValue key={stat.id} stat={stat} />
          ))}
        </div>

        {/* DECORATIVE SCISSORS CUTTING THREAD TRANSITION */}
        <ScissorCutTransition />
      </div>
    </section>
  );
}
