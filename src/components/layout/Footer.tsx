"use client";

import React from "react";
import { ATELIER_CONTACT } from "@/data/karigarData";
import { ButtonMark } from "@/components/svg/ButtonMark";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

const FOOTER_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Occasions", href: "#occasions" },
  { label: "Design Your Look", href: "#design-your-look" },
  { label: "Craft", href: "#craft" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Visit Us", href: "#visit-us" },
] as const;

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative z-20 overflow-hidden border-t border-gold/25 bg-charcoal px-gutter pb-24 pt-16 text-ivory">
      <div className="mx-auto max-w-atelier">
        {/* Huge "कारीगर" Outline Display Mark */}
        <div
          aria-hidden="true"
          className="select-none overflow-hidden py-4 text-center"
        >
          <p
            className="font-hindi text-[clamp(5.25rem,20vw,15rem)] leading-[0.9] tracking-tight"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.25px rgba(201, 162, 77, 0.35)",
            }}
          >
            कारीगर
          </p>
        </div>

        {/* Navigation & Social Row */}
        <div className="mt-8 grid items-center gap-8 border-t border-gold/20 pt-10 lg:grid-cols-12">
          <div className="flex items-center gap-3 lg:col-span-3">
            <ButtonMark size={30} />
            <div>
              <p className="font-display text-base uppercase tracking-[0.22em] text-ivory xl:text-lg xl:tracking-[0.26em]">
                Karigar Couture
              </p>
              <p className="font-sans text-[10px] uppercase tracking-atelier text-ivory/70">
                Creating Stylish Indian Outfits
              </p>
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-span-6 lg:flex-nowrap lg:justify-center">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href, -76);
                  }}
                  className="stitch-link whitespace-nowrap font-sans text-[10px] uppercase tracking-atelier text-ivory/75 hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4 lg:col-span-3 lg:justify-end">
            <a
              href={ATELIER_CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="stitch-link font-sans text-[10px] uppercase tracking-atelier text-gold-light"
            >
              Instagram
            </a>
            <a
              href={`https://wa.me/${ATELIER_CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="stitch-link font-sans text-[10px] uppercase tracking-atelier text-gold-light"
            >
              WhatsApp
            </a>
            <a
              href="tel:+918595776323"
              className="stitch-link font-sans text-[10px] uppercase tracking-atelier text-gold-light"
            >
              Call Atelier
            </a>
          </div>
        </div>

        {/* Credits Row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gold/15 pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-sans text-[10px] uppercase tracking-atelier text-ivory/65">
            © 2026 Karigar Couture · {ATELIER_CONTACT.address}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-atelier text-gold/75">
            Crafted with thread &amp; code
          </p>
        </div>
      </div>
    </footer>
  );
}
