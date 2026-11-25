"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ATELIER_CONTACT } from "@/data/lookbook";

export function FloatingActions() {
  const { isPreloaderDone } = useSmoothScroll();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isPreloaderDone) return null;

  const whatsappUrl = `https://wa.me/${ATELIER_CONTACT.whatsappNumber}?text=${encodeURIComponent(
    "Namaste Karigar Couture, I would like to connect with the Delhi atelier."
  )}`;

  return (
    <AnimatePresence>
      {pastHero && (
        <React.Fragment key="floating-concierge">
          {/* Mobile-Only Floating Call Button (Bottom-Left) */}
          <motion.a
            href="tel:+918595776323"
            aria-label="Call Karigar Couture"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-gold/80 bg-maroon/95 px-4 py-2.5 font-sans text-[10px] font-medium uppercase tracking-atelier text-ivory shadow-[0_12px_35px_rgba(0,0,0,0.6)] backdrop-blur-md md:hidden"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DEC078"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call</span>
          </motion.a>

          {/* Floating WhatsApp Concierge Button (Bottom-Right, Desktop & Mobile) */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Enquire on WhatsApp with Karigar Couture"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-gold bg-charcoal/95 px-4 py-2.5 font-sans text-[10px] font-medium uppercase tracking-atelier text-gold-light shadow-[0_12px_35px_rgba(0,0,0,0.65)] backdrop-blur-md transition-colors hover:bg-gold hover:text-charcoal sm:bottom-6 sm:right-6 sm:px-5 sm:py-3"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>WhatsApp</span>
          </motion.a>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
