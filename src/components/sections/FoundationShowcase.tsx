"use client";

import React, { useRef } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { OccasionsSection } from "@/components/sections/OccasionsSection";
import { DesignYourLookSection } from "@/components/sections/DesignYourLookSection";
import { CraftSection } from "@/components/sections/CraftSection";
import { LookbookSection } from "@/components/sections/LookbookSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { VisitAtelierSection } from "@/components/sections/VisitAtelierSection";
import { Footer } from "@/components/layout/Footer";
import { EkDhaagaThread } from "@/components/ui/EkDhaagaThread";

export function FoundationShowcase() {
  const threadScopeRef = useRef<HTMLDivElement>(null);

  return (
    <main id="main-content" className="relative bg-charcoal text-ivory">
      {/* FULL-VIEWPORT HERO SECTION */}
      <HeroSection />

      {/* CONTINUOUS POST-HERO FLOW CONNECTED BY EK DHAAGA THREAD */}
      <div ref={threadScopeRef} className="relative">
        <EkDhaagaThread variant="spine" targetRef={threadScopeRef} />

        {/* THE COLLECTIONS (Pinned Horizontal Gallery on Desktop / Swipe Snap on Mobile) */}
        <CollectionsSection />

        {/* DRESS FOR THE OCCASION (6-Panel Expanding Accordion) */}
        <OccasionsSection />

        {/* DESIGN YOUR LOOK (Interactive Bespoke Configurator) */}
        <DesignYourLookSection />

        {/* THE CRAFT (6-Stage Scroll Timeline, Animated Counters & Scissor Cut Transition) */}
        <CraftSection />

        {/* LOOKBOOK GALLERY (Asymmetric Parallax Masonry + Lightbox) */}
        <LookbookSection />

        {/* CLIENT STORIES (Testimonial Slider with Button Quote Marks) */}
        <TestimonialsSection />

        {/* INSTAGRAM STRIP (6 Tiles -> @karigar.couture) */}
        <InstagramStrip />

        {/* VISIT THE ATELIER / CONTACT (Maroon Salon, Map, Fitting Form & Piercing Needle Terminus) */}
        <VisitAtelierSection />
      </div>

      {/* EDITORIAL FOOTER WITH HUGE "कारीगर" OUTLINE TEXT */}
      <Footer />
    </main>
  );
}
