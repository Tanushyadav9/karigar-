"use client";

import React, { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export type ThreadPreset = "headline" | "button-loop" | "fold";

interface EkDhaagaSpineProps {
  variant: "spine";
  /** CSS selector or ref of the scrollable container; defaults to parent wrapper */
  targetRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

interface EkDhaagaStitchProps {
  variant?: "stitch";
  preset?: ThreadPreset;
  customPath?: string;
  viewBox?: string;
  className?: string;
  strokeWidth?: number;
  delay?: number;
  triggerOnScroll?: boolean;
}

export type EkDhaagaThreadProps = EkDhaagaSpineProps | EkDhaagaStitchProps;

const PRESET_PATHS: Record<
  ThreadPreset,
  { viewBox: string; d: string; aspectClass: string }
> = {
  headline: {
    viewBox: "0 0 640 72",
    d: "M 8 44 C 135 66, 260 18, 390 46 C 485 66, 565 26, 632 34",
    aspectClass: "w-full h-14",
  },
  "button-loop": {
    viewBox: "0 0 260 120",
    d: "M 10 64 C 55 64, 72 22, 130 22 C 178 22, 178 98, 130 98 C 82 98, 82 22, 130 22 C 188 22, 205 64, 250 64",
    aspectClass: "w-64 h-28",
  },
  fold: {
    viewBox: "0 0 1000 40",
    d: "M 0 20 Q 250 4, 500 20 T 1000 20",
    aspectClass: "w-full h-8",
  },
};

/**
 * Full-page continuous "Ek Dhaaga" (One Thread) spine scrubbed by GSAP ScrollTrigger.
 * On tablet/desktop (>= 768px): draws the asymmetrical golden SVG path and updates an
 * undistorted sewing needle head along the tangent.
 * On mobile (< 768px): falls back to a lightweight CSS vertical stitch thread for 60fps scroll.
 */
function EkDhaagaSpine({ targetRef, className = "" }: EkDhaagaSpineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const gradientId = useId();

  const spinePath =
    "M 600 0 " +
    "C 600 52, 430 72, 430 112 " +
    "C 430 144, 488 156, 520 134 " +
    "C 555 110, 482 82, 460 118 " +
    "C 436 156, 780 205, 910 290 " +
    "C 1030 370, 960 442, 620 482 " +
    "C 295 520, 175 585, 210 665 " +
    "C 245 745, 860 770, 920 845 " +
    "C 968 905, 680 935, 600 976";

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const pathEl = pathRef.current;
    const triggerEl = targetRef?.current ?? wrapperRef.current?.parentElement;
    if (!pathEl || !triggerEl) return;

    const mm = gsap.matchMedia();

    // Desktop & Tablet: run full pathLength scrub + live needle tangent tracking
    mm.add("(min-width: 768px)", () => {
      const totalLength = pathEl.getTotalLength();

      const updateNeedlePosition = (progress: number) => {
        const needleEl = needleRef.current;
        if (!needleEl) return;

        const clamped = Math.min(1, Math.max(0.002, progress));
        const currentLen = totalLength * clamped;
        const point = pathEl.getPointAtLength(currentLen);
        const prevPoint = pathEl.getPointAtLength(Math.max(0, currentLen - 4));
        const angleRad = Math.atan2(
          point.y - prevPoint.y,
          point.x - prevPoint.x
        );
        const angleDeg = (angleRad * 180) / Math.PI;

        const xPct = (point.x / 1200) * 100;
        const yPct = (point.y / 1000) * 100;

        needleEl.style.left = `${xPct}%`;
        needleEl.style.top = `${yPct}%`;
        needleEl.style.transform = `translate(-50%, -50%) rotate(${
          angleDeg + 90
        }deg)`;
      };

      if (prefersReduced) {
        pathEl.style.strokeDasharray = `${totalLength}`;
        pathEl.style.strokeDashoffset = "0";
        if (needleRef.current) needleRef.current.style.opacity = "1";
        updateNeedlePosition(1);
        return;
      }

      pathEl.style.strokeDasharray = `${totalLength}`;
      pathEl.style.strokeDashoffset = `${totalLength}`;
      updateNeedlePosition(0.01);

      const tween = gsap.to(pathEl, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          refreshPriority: -1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateNeedlePosition(self.progress);
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [targetRef]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
    >
      {/* Mobile Lightweight Fallback (< 768px): zero-JS dashed gold stitch spine */}
      <div
        className="absolute bottom-6 left-4 top-0 w-px opacity-35 md:hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, #C9A24D 0px, #C9A24D 6px, transparent 6px, transparent 14px)",
        }}
      />

      {/* Tablet & Desktop (>= 768px): Full Curving Ek Dhaaga SVG + Live Needle */}
      <div className="hidden h-full w-full md:block">
        <svg
          viewBox="0 0 1200 1000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DEC078" />
              <stop offset="35%" stopColor="#C9A24D" />
              <stop offset="70%" stopColor="#DEC078" />
              <stop offset="100%" stopColor="#C9A24D" />
            </linearGradient>
          </defs>

          <path
            d={spinePath}
            stroke="#C9A24D"
            strokeOpacity="0.14"
            strokeWidth="1"
            strokeDasharray="4 7"
            vectorEffect="non-scaling-stroke"
          />

          <path
            ref={pathRef}
            d={spinePath}
            stroke={`url(#${gradientId})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          ref={needleRef}
          className="absolute left-1/2 top-[2%] -translate-x-1/2 -translate-y-1/2 opacity-95 will-change-transform"
        >
          <svg
            width="28"
            height="46"
            viewBox="0 0 28 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(222,192,120,0.45)]"
          >
            <ellipse
              cx="14"
              cy="9"
              rx="1.8"
              ry="4.2"
              fill="#121212"
              stroke="#DEC078"
              strokeWidth="1.3"
            />
            <path
              d="M14 13.5 L14 42"
              stroke="#DEC078"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path d="M14 38 L12.2 44 L14 42.5 L15.8 44 Z" fill="#F6EFE2" />
            <circle cx="14" cy="5.5" r="2.1" fill="#C9A24D" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable inline/section stitch thread for headlines, button loops, and fabric-fold dividers.
 */
function EkDhaagaStitch({
  preset = "headline",
  customPath,
  viewBox,
  className = "",
  strokeWidth = 1.6,
  delay = 0.2,
  triggerOnScroll = true,
}: EkDhaagaStitchProps) {
  const gradientId = useId();
  const presetConfig = PRESET_PATHS[preset];
  const d = customPath ?? presetConfig.d;
  const resolvedViewBox = viewBox ?? presetConfig.viewBox;

  return (
    <svg
      viewBox={resolvedViewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${presetConfig.aspectClass} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9D7B32" />
          <stop offset="50%" stopColor="#DEC078" />
          <stop offset="100%" stopColor="#C9A24D" />
        </linearGradient>
      </defs>

      <path
        d={d}
        stroke="#C9A24D"
        strokeOpacity="0.16"
        strokeWidth="1"
        strokeDasharray="3 6"
      />

      <motion.path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        {...(triggerOnScroll
          ? {
              whileInView: { pathLength: 1, opacity: 1 },
              viewport: { once: true, amount: 0.35 },
            }
          : {
              animate: { pathLength: 1, opacity: 1 },
            })}
        transition={{
          duration: 1.4,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

export function EkDhaagaThread(props: EkDhaagaThreadProps) {
  if (props.variant === "spine") {
    return <EkDhaagaSpine {...props} />;
  }
  return <EkDhaagaStitch {...props} />;
}
