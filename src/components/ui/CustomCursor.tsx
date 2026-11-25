"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

type CursorMode = "default" | "needle" | "view" | "scissors" | "none";

const subscribeMedia = (callback: () => void) => {
  const pointerMq = window.matchMedia("(pointer: fine)");
  const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  pointerMq.addEventListener("change", callback);
  motionMq.addEventListener("change", callback);
  return () => {
    pointerMq.removeEventListener("change", callback);
    motionMq.removeEventListener("change", callback);
  };
};

const getCursorEnabledSnapshot = () =>
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribeMedia,
    getCursorEnabledSnapshot,
    () => false
  );
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("karigar-cursor-ready");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let rafId = 0;

    const resolveMode = (el: EventTarget | null): CursorMode => {
      if (!(el instanceof Element)) return "default";
      const explicit = el.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (explicit === "none") return "none";
      if (explicit === "view") return "view";
      if (explicit === "scissors") return "scissors";
      if (explicit === "needle") return "needle";
      if (el.closest("a, button, [role='button'], input, select, textarea")) {
        return "needle";
      }
      return "default";
    };

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      setMode(resolveMode(e.target));
    };

    const handleLeave = () => {
      setVisible(false);
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("karigar-cursor-ready");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[120] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
        visible && mode !== "none" ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Default Gold Ring */}
      <div
        className={`flex items-center justify-center rounded-full border border-gold/80 transition-all duration-300 ease-atelier ${
          mode === "default"
            ? "h-7 w-7 scale-100 opacity-100"
            : "h-7 w-7 scale-50 opacity-0"
        }`}
      >
        <span className="h-1 w-1 rounded-full bg-gold" />
      </div>

      {/* Needle Cursor on Links & Buttons */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-atelier ${
          mode === "needle" ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-rotate-12 drop-shadow-[0_0_8px_rgba(201,162,77,0.45)]"
        >
          {/* Trailing gold thread tail */}
          <path
            d="M27 7 C31 4, 33 9, 29 13"
            stroke="#C9A24D"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeDasharray="2 1.5"
          />
          {/* Needle shaft & point */}
          <path
            d="M26 8 L7 29"
            stroke="#DEC078"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Needle eye */}
          <ellipse
            cx="24.5"
            cy="9.5"
            rx="1.3"
            ry="2.8"
            transform="rotate(42 24.5 9.5)"
            fill="#121212"
            stroke="#DEC078"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* "View" Pill on Garments */}
      <div
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-gold bg-charcoal/90 px-4 py-1.5 backdrop-blur-md transition-all duration-300 ease-atelier ${
          mode === "view" ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <span className="h-1 w-1 rounded-full bg-gold" />
        <span className="font-sans text-[10px] font-medium uppercase tracking-atelier text-ivory">
          View
        </span>
      </div>

      {/* Scissors Cursor for Craft / Bespoke Cut Details */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-atelier ${
          mode === "scissors" ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(201,162,77,0.45)]"
        >
          <circle cx="9" cy="9" r="3.5" stroke="#DEC078" strokeWidth="1.3" />
          <circle cx="9" cy="23" r="3.5" stroke="#DEC078" strokeWidth="1.3" />
          <path d="M12 11 L26 22" stroke="#DEC078" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M12 21 L26 10" stroke="#DEC078" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
