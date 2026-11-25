"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CONFIG_COLORS,
  CONFIG_DETAILING,
  CONFIG_FABRICS,
  CONFIG_GARMENTS,
  CONFIG_OCCASIONS,
  ColorId,
  DetailingId,
  FabricId,
  GarmentId,
  STEP_LABELS,
} from "@/data/configurator";
import { GarmentLivePreview } from "@/components/sections/GarmentLivePreview";
import { ButtonMark } from "@/components/svg/ButtonMark";
import { MandalaWatermark } from "@/components/svg/MandalaArt";

const SHOP_WHATSAPP_NUMBER = "918595776323";

interface ThreadPiece {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  delay: number;
  curve: string;
}

const CONFETTI_THREADS: ThreadPiece[] = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  const radius = 110 + ((i * 37) % 160);
  return {
    id: i,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius - 40,
    rotate: (i * 53) % 360,
    scale: 0.75 + ((i * 19) % 50) / 100,
    delay: (i % 7) * 0.035,
    curve:
      i % 2 === 0
        ? "M2 10 Q10 2, 20 10 T34 6"
        : "M2 4 C8 14, 18 0, 28 10",
  };
});

function GoldThreadConfetti({ burstKey }: { burstKey: number }) {
  if (burstKey === 0) return null;

  return (
    <div
      key={burstKey}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center overflow-hidden"
    >
      {CONFETTI_THREADS.map((thread) => (
        <motion.svg
          key={thread.id}
          width="36"
          height="16"
          viewBox="0 0 36 16"
          fill="none"
          className="absolute"
          initial={{ x: 0, y: 60, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{
            x: thread.x * 1.8,
            y: thread.y * 1.5 - 30,
            opacity: 0,
            scale: thread.scale,
            rotate: thread.rotate + 140,
          }}
          transition={{
            duration: 1.65,
            delay: thread.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <path
            d={thread.curve}
            stroke={thread.id % 3 === 0 ? "#F6EFE2" : "#DEC078"}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}

function getFabricSwatchStyle(fabricId: FabricId, baseHex: string): React.CSSProperties {
  switch (fabricId) {
    case "raw-silk":
      return {
        backgroundColor: baseHex,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 5px), repeating-linear-gradient(90deg, rgba(201,162,77,0.12) 0px, transparent 2px, transparent 9px)",
      };
    case "velvet":
      return {
        backgroundColor: baseHex,
        backgroundImage:
          "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), transparent 60%), linear-gradient(135deg, rgba(0,0,0,0.45) 0%, transparent 50%, rgba(0,0,0,0.35) 100%)",
      };
    case "jacquard":
      return {
        backgroundColor: baseHex,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(222,192,120,0.16) 0px, rgba(222,192,120,0.16) 2px, transparent 2px, transparent 12px), repeating-linear-gradient(-45deg, rgba(222,192,120,0.12) 0px, rgba(222,192,120,0.12) 2px, transparent 2px, transparent 12px)",
      };
    case "linen":
      return {
        backgroundColor: baseHex,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0px, transparent 1px, transparent 4px)",
      };
    case "cotton-silk":
      return {
        backgroundColor: baseHex,
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, transparent 45%, rgba(222,192,120,0.16) 100%)",
      };
  }
}

export function DesignYourLookSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [garmentId, setGarmentId] = useState<GarmentId>("sherwani");
  const [fabricId, setFabricId] = useState<FabricId>("raw-silk");
  const [colorId, setColorId] = useState<ColorId>("maroon");
  const [detailingId, setDetailingId] = useState<DetailingId>("zardozi");
  const [occasion, setOccasion] = useState<string>("Wedding / Dulha");
  const [eventDate, setEventDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [burstKey, setBurstKey] = useState(0);
  const [submittedNotice, setSubmittedNotice] = useState<{
    mode: "enquiry" | "fitting";
    url: string;
  } | null>(null);

  const selectedGarment = useMemo(
    () => CONFIG_GARMENTS.find((g) => g.id === garmentId) ?? CONFIG_GARMENTS[0],
    [garmentId]
  );
  const selectedFabric = useMemo(
    () => CONFIG_FABRICS.find((f) => f.id === fabricId) ?? CONFIG_FABRICS[0],
    [fabricId]
  );
  const selectedColor = useMemo(
    () => CONFIG_COLORS.find((c) => c.id === colorId) ?? CONFIG_COLORS[0],
    [colorId]
  );
  const selectedDetailing = useMemo(
    () =>
      CONFIG_DETAILING.find((d) => d.id === detailingId) ??
      CONFIG_DETAILING[0],
    [detailingId]
  );

  const buildMessageUrl = (mode: "enquiry" | "fitting") => {
    const header =
      mode === "fitting"
        ? "Namaste Karigar Couture, I would like to book a FREE FITTING at your Krishna Nagar atelier for this custom look:"
        : "Namaste Karigar Couture, I have designed my bespoke look and would love to enquire:";

    const lines = [
      header,
      "",
      `• Garment: ${selectedGarment.name} (${selectedGarment.hindiName})`,
      `• Fabric: ${selectedFabric.name} — ${selectedFabric.origin}`,
      `• Colour: ${selectedColor.name}`,
      `• Detailing: ${selectedDetailing.name}`,
      `• Occasion: ${occasion || "Bespoke Commission"}`,
      eventDate ? `• Event Date: ${eventDate}` : null,
      clientName.trim() ? `• Name: ${clientName.trim()}` : null,
      "",
      "Atelier: F-6/9, Mandir Marg, Krishna Nagar, Delhi 110051",
    ].filter(Boolean);

    return `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const handleSubmit = (mode: "enquiry" | "fitting") => {
    const url = buildMessageUrl(mode);
    setBurstKey((prev) => prev + 1);
    setSubmittedNotice({ mode, url });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const progressFraction = (activeStep - 1) / (STEP_LABELS.length - 1);

  return (
    <section
      id="design-your-look"
      className="relative z-20 overflow-hidden bg-maroon px-gutter py-section text-ivory"
    >
      <GoldThreadConfetti burstKey={burstKey} />

      {/* Subtle Ambient Mandala Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 top-16 opacity-[0.08]"
      >
        <MandalaWatermark
          className="h-[620px] w-[620px] animate-mandala-slow"
          strokeColor="#DEC078"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-atelier">
        {/* Section Header */}
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-atelier text-gold-light">
              ०३ · Bespoke Atelier Configurator
            </p>
            <h2 className="mt-3 font-display text-4xl font-light leading-[1.04] tracking-tight-display text-ivory sm:text-6xl">
              Design Your{" "}
              <span className="italic text-gold-foil">Signature Look</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-ivory/75 lg:col-span-5 lg:justify-self-end">
            Compose your garment silhouette, heritage fabric, colour, and
            handwork step by step—then send your draft directly to our master
            tailors in Delhi.
          </p>
        </div>

        {/* Main 2-Column Atelier Workbench */}
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
          {/* LEFT: Large Live Silhouette Preview + Summary Card */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <GarmentLivePreview
              garment={selectedGarment}
              fabric={selectedFabric}
              color={selectedColor}
              detailing={selectedDetailing}
              occasion={occasion}
              eventDate={eventDate}
              clientName={clientName}
            />
          </div>

          {/* RIGHT: Guided 5-Step Stitched Configurator */}
          <div className="border border-gold/30 bg-maroon-deep/75 p-6 backdrop-blur-md sm:p-10 lg:col-span-7">
            {/* Animated Stepper with Stitched Progress Line */}
            <div className="relative pb-6">
              <div className="relative flex items-center justify-between">
                {/* Base dashed basting stitch */}
                <div
                  aria-hidden="true"
                  className="absolute left-4 right-4 top-4 h-0.5"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(201,162,77,0.28) 0px, rgba(201,162,77,0.28) 6px, transparent 6px, transparent 12px)",
                  }}
                />
                {/* Animated active golden stitch line (GPU scaleX) */}
                <motion.div
                  aria-hidden="true"
                  className="absolute left-4 right-4 top-4 h-0.5 origin-left"
                  initial={false}
                  animate={{ scaleX: progressFraction }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, #DEC078 0px, #DEC078 6px, transparent 6px, transparent 12px)",
                  }}
                />

                {STEP_LABELS.map((item) => {
                  const isCurrent = item.step === activeStep;
                  const isCompleted = item.step < activeStep;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      onClick={() => setActiveStep(item.step)}
                      className="group relative z-10 flex flex-col items-center gap-2 focus-visible:outline-none"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border font-sans text-[10px] transition-all duration-400 ease-atelier ${
                          isCurrent
                            ? "scale-110 border-gold-light bg-gold font-medium text-charcoal shadow-[0_0_16px_rgba(222,192,120,0.45)]"
                            : isCompleted
                              ? "border-gold bg-maroon text-gold-light"
                              : "border-gold/35 bg-charcoal text-ivory/60 group-hover:border-gold/75"
                        }`}
                      >
                        {String(item.step).padStart(2, "0")}
                      </span>
                      <span
                        className={`hidden font-sans text-[9px] uppercase tracking-atelier sm:block ${
                          isCurrent ? "text-gold-light" : "text-ivory/70"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Stage Content */}
            <div className="min-h-[380px] border-t border-gold/20 pt-8">
              <AnimatePresence mode="wait">
                {/* STEP 1: CHOOSE GARMENT */}
                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                      Step 01 · Choose Your Silhouette
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-light text-ivory">
                      Select a Garment
                    </h3>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {CONFIG_GARMENTS.map((item) => {
                        const selected = item.id === garmentId;
                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setGarmentId(item.id)}
                            className={`flex items-start justify-between border p-5 text-left transition-all duration-400 ease-atelier ${
                              selected
                                ? "border-gold bg-charcoal/80 shadow-[0_0_24px_rgba(201,162,77,0.16)]"
                                : "border-gold/20 bg-charcoal/40 hover:border-gold/55"
                            }`}
                          >
                            <div>
                              <span className="font-hindi text-xs text-gold-light">
                                {item.hindiName}
                              </span>
                              <p className="mt-1 font-display text-2xl font-light text-ivory">
                                {item.name}
                              </p>
                              <p className="mt-1.5 font-sans text-[11px] font-light text-ivory/65">
                                {item.silhouetteNote}
                              </p>
                            </div>
                            {selected && <ButtonMark size={22} />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: CHOOSE FABRIC (Tactile Swatch Tiles with Hover Zoom) */}
                {activeStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                      Step 02 · Tactile Textile Library
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-light text-ivory">
                      Choose Your Fabric
                    </h3>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {CONFIG_FABRICS.map((item) => {
                        const selected = item.id === fabricId;
                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setFabricId(item.id)}
                            className={`group flex flex-col overflow-hidden border text-left transition-all duration-500 ease-atelier ${
                              selected
                                ? "border-gold bg-charcoal/85"
                                : "border-gold/25 bg-charcoal/45 hover:border-gold/60"
                            }`}
                          >
                            {/* Hover-Zoom Swatch Window */}
                            <div className="relative h-28 w-full overflow-hidden border-b border-gold/20">
                              <div
                                className="h-full w-full transition-transform duration-700 ease-atelier group-hover:scale-125"
                                style={getFabricSwatchStyle(
                                  item.id,
                                  selectedColor.hex
                                )}
                              />
                              <span className="absolute bottom-2 right-2 rounded-full bg-charcoal/80 px-2 py-0.5 font-sans text-[8px] uppercase tracking-atelier text-gold-light">
                                {selected ? "Selected" : "Inspect"}
                              </span>
                            </div>

                            <div className="p-4">
                              <p className="font-display text-xl font-light text-ivory">
                                {item.name}
                              </p>
                              <p className="mt-1 font-sans text-[10px] uppercase tracking-editorial text-gold/85">
                                {item.origin}
                              </p>
                              <p className="mt-1.5 font-sans text-[11px] font-light text-ivory/65">
                                {item.sheen}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CHOOSE COLOUR (8 Premium Colours) */}
                {activeStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                      Step 03 · Atelier Dye House
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-light text-ivory">
                      Choose Your Colour
                    </h3>

                    <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
                      {CONFIG_COLORS.map((item) => {
                        const selected = item.id === colorId;
                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            whileHover={{ y: -2 }}
                            onClick={() => setColorId(item.id)}
                            className={`flex flex-col items-center gap-3 border p-4 transition-all duration-400 ease-atelier ${
                              selected
                                ? "border-gold bg-charcoal/85 shadow-[0_0_20px_rgba(201,162,77,0.2)]"
                                : "border-gold/20 bg-charcoal/40 hover:border-gold/55"
                            }`}
                          >
                            <span
                              className={`relative h-12 w-12 rounded-full border transition-transform duration-500 ${
                                selected
                                  ? "scale-110 border-gold-light ring-2 ring-gold/40 ring-offset-2 ring-offset-charcoal"
                                  : "border-gold/35"
                              }`}
                              style={{
                                background: `radial-gradient(circle at 30% 30%, ${item.highlightHex}, ${item.hex} 65%, ${item.shadeHex})`,
                              }}
                            />
                            <span className="font-sans text-[11px] tracking-editorial text-ivory">
                              {item.name}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CHOOSE EMBROIDERY / DETAILING */}
                {activeStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                      Step 04 · Karigari Handwork
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-light text-ivory">
                      Choose Embroidery &amp; Detailing
                    </h3>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {CONFIG_DETAILING.map((item) => {
                        const selected = item.id === detailingId;
                        return (
                          <motion.button
                            key={item.id}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setDetailingId(item.id)}
                            className={`flex items-start justify-between border p-5 text-left transition-all duration-400 ease-atelier ${
                              selected
                                ? "border-gold bg-charcoal/85"
                                : "border-gold/20 bg-charcoal/40 hover:border-gold/55"
                            }`}
                          >
                            <div>
                              <p className="font-display text-2xl font-light text-ivory">
                                {item.name}
                              </p>
                              <p className="mt-1.5 font-sans text-xs font-light text-ivory/70">
                                {item.note}
                              </p>
                            </div>
                            {selected && <ButtonMark size={20} />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: OCCASION, DATE (OPTIONAL), NAME & FINAL WHATSAPP SUBMISSION */}
                {activeStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-atelier text-gold">
                      Step 05 · Personalise &amp; Send
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-light text-ivory">
                      Occasion &amp; Final Brief
                    </h3>

                    <div className="mt-6 space-y-6">
                      <div>
                        <label className="block font-sans text-[10px] uppercase tracking-atelier text-ivory/65">
                          Select Occasion
                        </label>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {CONFIG_OCCASIONS.map((occ) => (
                            <motion.button
                              key={occ}
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              onClick={() => setOccasion(occ)}
                              className={`border px-3.5 py-2 font-sans text-[11px] transition-colors ${
                                occasion === occ
                                  ? "border-gold bg-gold text-charcoal font-medium"
                                  : "border-gold/25 bg-charcoal/45 text-ivory/80 hover:border-gold/60"
                              }`}
                            >
                              {occ}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="karigar-client-name"
                            className="block font-sans text-[10px] uppercase tracking-atelier text-ivory/65"
                          >
                            Your Name
                          </label>
                          <input
                            id="karigar-client-name"
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g. Aarav Mehra"
                            className="mt-2 w-full border border-gold/30 bg-charcoal/65 px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/35 focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="karigar-event-date"
                            className="block font-sans text-[10px] uppercase tracking-atelier text-ivory/65"
                          >
                            Event Date (Optional)
                          </label>
                          <input
                            id="karigar-event-date"
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="mt-2 w-full border border-gold/30 bg-charcoal/65 px-4 py-3 font-sans text-sm text-ivory [color-scheme:dark] focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Final Submit CTAs */}
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSubmit("enquiry")}
                          className="inline-flex items-center justify-center gap-2 border border-gold bg-gold px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-atelier text-charcoal transition-colors hover:bg-gold-light"
                        >
                          <span>Send to Karigar Couture</span>
                          <span>→</span>
                        </motion.button>

                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSubmit("fitting")}
                          className="inline-flex items-center justify-center border border-gold/75 px-6 py-3.5 font-sans text-[11px] font-medium uppercase tracking-atelier text-gold transition-colors hover:bg-gold hover:text-charcoal"
                        >
                          Book a Free Fitting
                        </motion.button>
                      </div>

                      {submittedNotice && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gold/35 bg-charcoal/80 p-4 text-xs text-ivory/85"
                        >
                          <p className="font-sans text-gold-light">
                            {submittedNotice.mode === "fitting"
                              ? "Your complimentary atelier fitting request is stitched and ready."
                              : "Your bespoke specification is stitched and ready."}
                          </p>
                          <a
                            href={submittedNotice.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1.5 inline-block underline decoration-gold/70 underline-offset-4 hover:text-gold-light"
                          >
                            Open WhatsApp (+91 85957 76323) if not redirected →
                          </a>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step Navigation Controls */}
            <div className="mt-8 flex items-center justify-between border-t border-gold/20 pt-6">
              <button
                type="button"
                disabled={activeStep === 1}
                onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
                className="font-sans text-[10px] uppercase tracking-atelier text-ivory/75 transition-colors hover:text-gold-light disabled:opacity-30"
              >
                ← Previous
              </button>

              {activeStep < 5 ? (
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveStep((s) => Math.min(5, s + 1))}
                  className="border border-gold/70 px-6 py-2.5 font-sans text-[10px] font-medium uppercase tracking-atelier text-gold transition-colors hover:bg-gold hover:text-charcoal"
                >
                  Continue →
                </motion.button>
              ) : (
                <span className="font-sans text-[10px] uppercase tracking-atelier text-gold/75">
                  Ready for Atelier Review
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
