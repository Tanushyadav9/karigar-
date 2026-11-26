"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

const EkDhaagaThread = dynamic(
  () => import("@/components/ui/EkDhaagaThread").then((m) => m.EkDhaagaThread),
  { ssr: false }
);
const CollectionsSection = dynamic(
  () => import("@/components/sections/CollectionsSection").then((m) => m.CollectionsSection),
  { ssr: false }
);
const OccasionsSection = dynamic(
  () => import("@/components/sections/OccasionsSection").then((m) => m.OccasionsSection),
  { ssr: false }
);
const DesignYourLookSection = dynamic(
  () => import("@/components/sections/DesignYourLookSection").then((m) => m.DesignYourLookSection),
  { ssr: false }
);
const CraftSection = dynamic(
  () => import("@/components/sections/CraftSection").then((m) => m.CraftSection),
  { ssr: false }
);
const LookbookSection = dynamic(
  () => import("@/components/sections/LookbookSection").then((m) => m.LookbookSection),
  { ssr: false }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
  { ssr: false }
);
const InstagramStrip = dynamic(
  () => import("@/components/sections/InstagramStrip").then((m) => m.InstagramStrip),
  { ssr: false }
);
const VisitAtelierSection = dynamic(
  () => import("@/components/sections/VisitAtelierSection").then((m) => m.VisitAtelierSection),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/layout/Footer").then((m) => m.Footer),
  { ssr: false }
);

export function FoundationShowcase() {
  const threadScopeRef = useRef<HTMLDivElement>(null);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    if (belowFoldReady) return;
    const activate = () => setBelowFoldReady(true);
    const onScroll = () => {
      if (window.scrollY > 40) activate();
    };

    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((ev) => window.addEventListener(ev, activate, { passive: true, once: true }));
    window.addEventListener("scroll", onScroll, { passive: true });

    const timer = window.setTimeout(activate, 5500);
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, activate));
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [belowFoldReady]);

  return (
    <main id="main-content" className="relative bg-charcoal text-ivory">
      {/* FULL-VIEWPORT 3D HERO SECTION */}
      <HeroSection />

      {/* BELOW-HERO LAZY-MOUNTED SECTIONS */}
      {belowFoldReady && (
        <>
          <div ref={threadScopeRef} className="relative">
            <EkDhaagaThread variant="spine" targetRef={threadScopeRef} />
            <CollectionsSection />
            <OccasionsSection />
            <DesignYourLookSection />
            <CraftSection />
            <LookbookSection />
            <TestimonialsSection />
            <InstagramStrip />
            <VisitAtelierSection />
          </div>

          {/* EDITORIAL FOOTER WITH HUGE "कारीगर" OUTLINE TEXT */}
          <Footer />
        </>
      )}
    </main>
  );
}
