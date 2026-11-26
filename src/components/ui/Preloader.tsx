"use client";

import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { looks } from "@/data/karigarData";

export function Preloader() {
  const { setPreloaderDone } = useSmoothScroll();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPreloaderDone(true);

    let cancelled = false;
    // Preload adjacent hero textures after initial paint settles (look[2] is already priority-preloaded)
    const preloadTimer = window.setTimeout(() => {
      if (cancelled) return;
      const adjacentLooks = [looks[1], looks[3]].filter(Boolean);
      Promise.allSettled(
        adjacentLooks.map(
          (look) =>
            new Promise<void>((resolve) => {
              const img = new window.Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = look.image;
            })
        )
      ).then(() => {
        if (!cancelled) setLoading(false);
      });
    }, 2500);

    const maxTimeout = window.setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 450);

    return () => {
      cancelled = true;
      window.clearTimeout(preloadTimer);
      window.clearTimeout(maxTimeout);
    };
  }, [setPreloaderDone]);

  if (!loading) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-[2px] overflow-hidden bg-transparent"
    >
      <div className="h-full w-full origin-left animate-pulse bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
