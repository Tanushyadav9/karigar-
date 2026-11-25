"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonMark } from "@/components/svg/ButtonMark";
import { MandalaWatermark } from "@/components/svg/MandalaArt";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const NAV_LINKS = [
  { label: "Collections", href: "#collections", hindiIndex: "०१" },
  { label: "Occasions", href: "#occasions", hindiIndex: "०२" },
  { label: "Design Your Look", href: "#design-your-look", hindiIndex: "०३" },
  { label: "Craft", href: "#craft", hindiIndex: "०४" },
  { label: "Visit Us", href: "#visit-us", hindiIndex: "०५" },
] as const;

export function Navbar() {
  const { setScrollLocked, isPreloaderDone, scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isPreloaderDone) return;
    setScrollLocked(mobileOpen);
  }, [mobileOpen, isPreloaderDone, setScrollLocked]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollTo(href, -76);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] isolate [transform:translateZ(0)] transition-all duration-700 ease-atelier ${
          mobileOpen
            ? "border-b border-transparent bg-transparent py-5"
            : scrolled
              ? "border-b border-gold/20 bg-charcoal/85 py-3.5 backdrop-blur-md"
              : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex max-w-atelier items-center justify-between px-gutter"
        >
          {/* Logo Left: 4-Hole Button Mark + Bilingual Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3.5 focus-visible:outline-none"
          >
            <ButtonMark
              size={34}
              className="transition-transform duration-700 ease-atelier group-hover:rotate-45"
            />
            <div className="flex flex-col leading-none">
              <span className="font-hindi text-[11px] tracking-wider text-gold-light">
                कारीगर
              </span>
              <span className="font-display text-lg uppercase tracking-[0.26em] text-ivory sm:text-xl">
                Karigar
              </span>
            </div>
          </a>

          {/* Center Minimal Navigation Links */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="stitch-link font-sans text-[11px] font-normal uppercase tracking-atelier text-ivory/80 transition-colors duration-400 hover:text-gold-light"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#visit-us"
              onClick={(e) => handleNavClick(e, "#visit-us")}
              className="group relative hidden overflow-hidden border border-gold/75 px-5 py-2.5 font-sans text-[10px] font-medium uppercase tracking-atelier text-gold transition-colors duration-500 ease-atelier hover:text-charcoal sm:inline-flex"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 ease-atelier group-hover:translate-x-0"
              />
              <span className="relative z-10">Book a Fitting</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-atelier-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-gold/40 bg-charcoal/60 backdrop-blur-sm transition-colors hover:border-gold lg:hidden"
            >
              <span
                className={`h-px w-4 bg-gold transition-all duration-500 ease-atelier ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-gold transition-all duration-500 ease-atelier ${
                  mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Deep Maroon Mobile Menu with Mandala Watermark */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-atelier-menu"
            key="mobile-maroon-menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              clipPath: "inset(0% 0% 100% 0%)",
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-[65] flex flex-col justify-between overflow-hidden bg-maroon px-gutter pb-10 pt-28 text-ivory lg:hidden"
          >
            {/* Large Ambient Mandala Watermark */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 top-1/2 -translate-y-1/2 opacity-[0.12]"
            >
              <MandalaWatermark
                className="h-[520px] w-[520px] animate-mandala-slow"
                strokeColor="#DEC078"
              />
            </div>

            {/* Subtle top hairline & atelier label */}
            <div className="relative z-10">
              <p className="font-sans text-[10px] uppercase tracking-atelier text-gold-light/80">
                कारीगर Couture · Delhi Atelier
              </p>

              <ul className="mt-8 flex flex-col gap-5">
                {NAV_LINKS.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.16 + idx * 0.06,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group flex items-baseline gap-4"
                    >
                      <span className="font-hindi text-sm text-gold/75">
                        {item.hindiIndex}
                      </span>
                      <span className="font-display text-3xl font-light tracking-wide text-ivory transition-colors duration-400 group-hover:text-gold-light sm:text-4xl">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom Atelier Address & Gold CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 border-t border-gold/25 pt-6"
            >
              <a
                href="#visit-us"
                onClick={(e) => handleNavClick(e, "#visit-us")}
                className="mb-6 flex w-full items-center justify-center border border-gold bg-gold px-6 py-3.5 font-sans text-xs font-medium uppercase tracking-atelier text-charcoal transition-colors hover:bg-gold-light"
              >
                Book a Fitting
              </a>
              <div className="flex flex-col gap-1 font-sans text-xs text-ivory/75">
                <p>F-6/9, Mandir Marg, Krishna Nagar, Delhi 110051</p>
                <p className="text-gold-light">@karigar.couture</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
