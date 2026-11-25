"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ATELIER_CONTACT } from "@/data/lookbook";
import { MandalaWatermark } from "@/components/svg/MandalaArt";

const GARMENT_INTERESTS = [
  "Bespoke Sherwani",
  "Indo-Western Suit",
  "Safari Suit",
  "Kurta Set",
  "Premium Shirts & Trousers",
  "Complete Wedding Trousseau",
] as const;

/**
 * Terminus emblem where the continuous Ek Dhaaga golden thread ends as a needle
 * piercing cleanly through the 4-hole Karigar Couture button logo.
 */
function NeedlePiercingButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3"
    >
      <svg
        width="140"
        height="112"
        viewBox="0 0 140 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Golden sewing needle piercing the Karigar Couture four-hole button mark"
      >
        <defs>
          <linearGradient id="terminus-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9D7B32" />
            <stop offset="50%" stopColor="#DEC078" />
            <stop offset="100%" stopColor="#C9A24D" />
          </linearGradient>
        </defs>

        {/* Incoming vertical thread from above */}
        <path
          d="M70 0 C70 16, 86 18, 96 24"
          stroke="url(#terminus-gold)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Button Back Rim */}
        <circle cx="70" cy="64" r="32" fill="#2A070F" stroke="url(#terminus-gold)" strokeWidth="1.6" />
        <circle cx="70" cy="64" r="24" stroke="#DEC078" strokeOpacity="0.4" strokeWidth="1" />

        {/* 4 Thread Holes */}
        <circle cx="61" cy="55" r="2.8" fill="#121212" stroke="#C9A24D" strokeWidth="1.1" />
        <circle cx="79" cy="55" r="2.8" fill="#121212" stroke="#C9A24D" strokeWidth="1.1" />
        <circle cx="61" cy="73" r="2.8" fill="#121212" stroke="#C9A24D" strokeWidth="1.1" />
        <circle cx="79" cy="73" r="2.8" fill="#121212" stroke="#C9A24D" strokeWidth="1.1" />

        {/* Crossed thread stitch anchored in the button */}
        <path
          d="M61 55 L79 73 M79 55 L61 73"
          stroke="#DEC078"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Piercing Needle Shaft entering top-right hole and emerging bottom-left */}
        <motion.g
          initial={{ x: 10, y: -10 }}
          whileInView={{ x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Upper shaft with needle eye */}
          <path
            d="M112 18 L79 55"
            stroke="#F6EFE2"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <ellipse
            cx="107"
            cy="23.5"
            rx="1.5"
            ry="3.6"
            transform="rotate(42 107 23.5)"
            fill="#121212"
            stroke="#DEC078"
            strokeWidth="1.1"
          />
          {/* Emerging needle tip below-left after piercing through */}
          <path
            d="M61 73 L32 104"
            stroke="#F6EFE2"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <polygon points="32,104 39,100 35,96" fill="#F6EFE2" />
          {/* Trailing gold thread loop tied to eye */}
          <path
            d="M108 22 C122 10, 128 32, 114 42"
            stroke="#DEC078"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>

      <p className="font-sans text-[9px] uppercase tracking-atelier text-gold-light/85">
        Ek Dhaaga · Signed at the Atelier
      </p>
    </motion.div>
  );
}

export function VisitAtelierSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [garment, setGarment] = useState<string>(GARMENT_INTERESTS[0]);
  const [preferredDate, setPreferredDate] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const handleFittingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Namaste Karigar Couture, I would like to book a fitting at your Krishna Nagar atelier:",
      "",
      `• Name: ${name.trim() || "Guest"}`,
      `• Phone: ${phone.trim() || "Not provided"}`,
      `• Garment Interest: ${garment}`,
      preferredDate ? `• Preferred Date: ${preferredDate}` : null,
      "",
      `Address: ${ATELIER_CONTACT.address}`,
    ].filter(Boolean);

    const url = `https://wa.me/${ATELIER_CONTACT.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    setSubmittedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="visit-us"
      className="relative z-20 overflow-hidden bg-maroon px-gutter pb-20 pt-section text-ivory"
    >
      {/* Mandala Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.09]"
      >
        <MandalaWatermark
          className="h-[720px] w-[720px] animate-mandala-slow"
          strokeColor="#DEC078"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-atelier">
        {/* Heading */}
        <div className="text-center">
          <p className="font-sans text-[10px] uppercase tracking-atelier text-gold-light">
            ०८ · Visit the Atelier
          </p>
          <h2 className="mt-3 font-display text-4xl font-light tracking-tight-display text-ivory sm:text-6xl">
            Step Into{" "}
            <span className="italic text-gold-foil">Karigar Couture</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm font-light text-ivory/75">
            Experience archival textiles, custom pattern drafting, and personal
            styling in our Krishna Nagar salon.
          </p>
        </div>

        {/* Contact Details + Map + Fitting Form */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* LEFT: Address, Tap-to-Call Phones, Hours & Styled Map */}
          <div className="relative z-0 flex flex-col justify-between gap-8 border border-gold/30 bg-maroon-deep/90 p-6 sm:p-10 lg:col-span-6">
            <div className="space-y-8">
              {/* Address */}
              <div>
                <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                  Atelier Address
                </p>
                <p className="mt-2 font-display text-2xl font-light leading-snug text-ivory sm:text-3xl">
                  {ATELIER_CONTACT.address}
                </p>
              </div>

              {/* Tap-to-Call Phone Numbers */}
              <div>
                <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                  Direct Concierge (Tap to Call)
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {ATELIER_CONTACT.phones.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group border border-gold/30 bg-charcoal/55 p-3.5 transition-colors duration-400 hover:border-gold hover:bg-charcoal"
                    >
                      <span className="block font-sans text-[9px] uppercase tracking-atelier text-gold-light">
                        {item.label}
                      </span>
                      <span className="mt-1 block font-sans text-sm font-medium tracking-wide text-ivory group-hover:text-gold-light">
                        {item.display}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Working Hours (Placeholder) */}
              <div className="border-t border-gold/20 pt-5">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                    Salon Hours
                  </p>
                  <span className="font-sans text-[9px] uppercase tracking-atelier text-ivory/65">
                    Sample Hours
                  </span>
                </div>
                <dl className="mt-3 space-y-2 text-xs">
                  {ATELIER_CONTACT.hours.map((row) => (
                    <div
                      key={row.days}
                      className="flex items-center justify-between text-ivory/80"
                    >
                      <dt>{row.days}</dt>
                      <dd className="text-gold-light">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Styled Embedded Google Map */}
            <div className="relative z-0 isolate space-y-2">
              <div className="relative z-0 h-52 w-full overflow-hidden border border-gold/35 bg-charcoal">
                <iframe
                  title="Karigar Couture Atelier Map — Krishna Nagar, Delhi"
                  src="https://maps.google.com/maps?q=F-6/9,+Mandir+Marg,+Krishna+Nagar,+Delhi+110051&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative z-0 h-full w-full border-0 opacity-85 grayscale-[45%] contrast-[1.08] invert-[90%] hue-rotate-[180deg]"
                />
              </div>
              <a
                href="https://maps.google.com/?q=F-6/9,+Mandir+Marg,+Krishna+Nagar,+Delhi+110051"
                target="_blank"
                rel="noreferrer"
                className="inline-block font-sans text-[10px] uppercase tracking-atelier text-gold-light hover:underline"
              >
                Open Directions in Google Maps →
              </a>
            </div>
          </div>

          {/* RIGHT: "Book Your Fitting" WhatsApp Form */}
          <div className="flex flex-col justify-between border border-gold/30 bg-charcoal/85 p-6 backdrop-blur-md sm:p-10 lg:col-span-6">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                Private Appointment
              </p>
              <h3 className="mt-2 font-display text-3xl font-light text-ivory sm:text-4xl">
                Book Your Fitting
              </h3>
              <p className="mt-2 font-sans text-xs font-light text-ivory/70">
                Reserve a one-on-one session with Anish &amp; Rohit. Submitting
                opens WhatsApp directly with your details.
              </p>

              <form onSubmit={handleFittingSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="visit-name"
                    className="block font-sans text-[10px] uppercase tracking-atelier text-ivory/70"
                  >
                    Full Name
                  </label>
                  <input
                    id="visit-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohan Verma"
                    className="mt-2 w-full border border-gold/30 bg-charcoal-elevated px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/35 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="visit-phone"
                      className="block font-sans text-[10px] uppercase tracking-atelier text-ivory/70"
                    >
                      Phone Number
                    </label>
                    <input
                      id="visit-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="mt-2 w-full border border-gold/30 bg-charcoal-elevated px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/35 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="visit-date"
                      className="block font-sans text-[10px] uppercase tracking-atelier text-ivory/70"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="visit-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="mt-2 w-full border border-gold/30 bg-charcoal-elevated px-4 py-3 font-sans text-sm text-ivory [color-scheme:dark] focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="visit-garment"
                    className="block font-sans text-[10px] uppercase tracking-atelier text-ivory/70"
                  >
                    Garment Interest
                  </label>
                  <select
                    id="visit-garment"
                    value={garment}
                    onChange={(e) => setGarment(e.target.value)}
                    className="mt-2 w-full border border-gold/30 bg-charcoal-elevated px-4 py-3 font-sans text-sm text-ivory focus:border-gold focus:outline-none"
                  >
                    {GARMENT_INTERESTS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-3 border border-gold bg-gold px-7 py-4 font-sans text-[11px] font-medium uppercase tracking-atelier text-charcoal transition-colors duration-400 hover:bg-gold-light"
                >
                  <span>Book Your Fitting via WhatsApp</span>
                  <span>→</span>
                </button>
              </form>

              {submittedUrl && (
                <div className="mt-4 border border-gold/35 bg-maroon-deep/70 p-4 text-xs text-ivory/85">
                  <p className="text-gold-light">
                    Fitting brief prepared for Karigar Couture.
                  </p>
                  <a
                    href={submittedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block underline decoration-gold/70 underline-offset-4 hover:text-gold-light"
                  >
                    Open WhatsApp (+91 85957 76323) →
                  </a>
                </div>
              )}
            </div>

            {/* Thread Terminus: Needle Piercing the 4-Hole Button Logo */}
            <div className="mt-10 flex justify-center border-t border-gold/20 pt-8">
              <NeedlePiercingButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
