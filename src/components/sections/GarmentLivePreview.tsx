"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import {
  ColorOption,
  DetailingOption,
  FabricOption,
  GarmentOption,
} from "@/data/configurator";
import { MandalaWatermark } from "@/components/svg/MandalaArt";

interface GarmentLivePreviewProps {
  garment: GarmentOption;
  fabric: FabricOption;
  color: ColorOption;
  detailing: DetailingOption;
  occasion: string;
  eventDate: string;
  clientName: string;
}

export function GarmentLivePreview({
  garment,
  fabric,
  color,
  detailing,
  occasion,
  eventDate,
  clientName,
}: GarmentLivePreviewProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `garment-grad-${uid}`;
  const fabricPatternId = `fabric-tex-${uid}`;

  const isLightGarment = color.id === "ivory" || color.id === "gold";
  const seamStroke = isLightGarment ? "rgba(18,18,18,0.28)" : "rgba(246,239,226,0.25)";
  const accentGold = "#DEC078";
  const threadAccent = isLightGarment ? "#7E5D20" : "#DEC078";
  const pipingStroke = color.contrastHex;

  const buttonYPositions =
    garment.id === "shirt"
      ? [118, 152, 186, 220, 254, 288]
      : garment.id === "kurta-set"
        ? [116, 148, 180]
        : [120, 155, 190, 225, 260];

  const renderTexturePattern = () => {
    switch (fabric.id) {
      case "raw-silk":
        return (
          <pattern
            id={fabricPatternId}
            width="24"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 3 H18 M6 8 H24"
              stroke={isLightGarment ? "#000" : "#fff"}
              strokeOpacity="0.11"
              strokeWidth="0.8"
            />
            <path
              d="M19 3 H22 M1 8 H4"
              stroke="#DEC078"
              strokeOpacity="0.14"
              strokeWidth="0.7"
            />
          </pattern>
        );
      case "velvet":
        return (
          <pattern
            id={fabricPatternId}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2.5" cy="2.5" r="1.1" fill="#000" fillOpacity="0.16" />
            <circle cx="7.5" cy="7.5" r="1.1" fill="#fff" fillOpacity="0.06" />
          </pattern>
        );
      case "jacquard":
        return (
          <pattern
            id={fabricPatternId}
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M13 2 L24 13 L13 24 L2 13 Z"
              fill="none"
              stroke={isLightGarment ? "#8B6924" : "#DEC078"}
              strokeOpacity="0.18"
              strokeWidth="0.8"
            />
            <circle
              cx="13"
              cy="13"
              r="2.2"
              fill={isLightGarment ? "#8B6924" : "#DEC078"}
              fillOpacity="0.15"
            />
          </pattern>
        );
      case "linen":
        return (
          <pattern
            id={fabricPatternId}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 5 H10 M5 0 V10"
              stroke={isLightGarment ? "#222" : "#fff"}
              strokeOpacity="0.1"
              strokeWidth="0.65"
            />
          </pattern>
        );
      case "cotton-silk":
        return (
          <pattern
            id={fabricPatternId}
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 16 L16 0"
              stroke="#fff"
              strokeOpacity="0.08"
              strokeWidth="0.7"
            />
          </pattern>
        );
    }
  };

  const renderSilhouette = () => {
    switch (garment.id) {
      case "sherwani":
        return (
          <g>
            {/* Churidar trousers underneath */}
            <path
              d="M124 310 L120 432 L145 432 L152 340 L160 432 L186 432 L180 310 Z"
              fill={color.shadeHex}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {/* Royal Sherwani body + sleeves */}
            <path
              d="M118 76 L62 110 L42 252 L68 258 L88 158 L86 356 Q152 370 218 356 L216 158 L236 258 L262 252 L242 110 L186 76 Q152 92 118 76 Z"
              fill={`url(#${gradId})`}
              stroke={seamStroke}
              strokeWidth="1.2"
            />
            {/* Textured weave overlay */}
            <path
              d="M118 76 L62 110 L42 252 L68 258 L88 158 L86 356 Q152 370 218 356 L216 158 L236 258 L262 252 L242 110 L186 76 Q152 92 118 76 Z"
              fill={`url(#${fabricPatternId})`}
            />
            {/* Mandarin Collar */}
            <path
              d="M122 76 L126 56 Q152 66 178 56 L182 76 Q152 88 122 76 Z"
              fill={color.highlightHex}
              stroke={seamStroke}
              strokeWidth="1.1"
            />
            {/* Placket & princess tailoring lines */}
            <line x1="152" y1="84" x2="152" y2="360" stroke={seamStroke} strokeWidth="1.2" />
            <path d="M108 118 Q114 210 106 348" fill="none" stroke={seamStroke} strokeWidth="0.8" />
            <path d="M196 118 Q190 210 198 348" fill="none" stroke={seamStroke} strokeWidth="0.8" />
            {/* Welt chest pocket */}
            <line x1="172" y1="138" x2="198" y2="134" stroke={seamStroke} strokeWidth="1.6" />
          </g>
        );

      case "indo-western":
        return (
          <g>
            {/* Structured trousers */}
            <path
              d="M118 296 L112 432 L144 432 L152 325 L160 432 L192 432 L186 296 Z"
              fill={color.shadeHex}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {/* Asymmetric Indo-Western Bandhgala Jacket */}
            <path
              d="M116 76 L60 112 L42 248 L68 254 L88 156 L92 318 L142 332 L212 310 L216 156 L236 254 L262 248 L244 112 L188 76 Q152 92 116 76 Z"
              fill={`url(#${gradId})`}
              stroke={seamStroke}
              strokeWidth="1.2"
            />
            <path
              d="M116 76 L60 112 L42 248 L68 254 L88 156 L92 318 L142 332 L212 310 L216 156 L236 254 L262 248 L244 112 L188 76 Q152 92 116 76 Z"
              fill={`url(#${fabricPatternId})`}
            />
            {/* Asymmetric Bandhgala collar & diagonal overlap lapel */}
            <path
              d="M122 76 L126 56 Q152 66 178 56 L182 76 Q152 88 122 76 Z"
              fill={color.highlightHex}
              stroke={seamStroke}
              strokeWidth="1.1"
            />
            <path
              d="M152 84 L170 165 L142 332"
              fill="none"
              stroke={seamStroke}
              strokeWidth="1.3"
            />
            <line x1="174" y1="132" x2="200" y2="128" stroke={seamStroke} strokeWidth="1.6" />
          </g>
        );

      case "safari":
        return (
          <g>
            {/* Matching trousers */}
            <path
              d="M116 298 L110 432 L144 432 L152 325 L160 432 L194 432 L188 298 Z"
              fill={color.shadeHex}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {/* Safari jacket body */}
            <path
              d="M116 76 L60 110 L42 248 L68 254 L88 156 L88 312 L216 312 L216 156 L236 254 L262 248 L244 110 L188 76 Q152 90 116 76 Z"
              fill={`url(#${gradId})`}
              stroke={seamStroke}
              strokeWidth="1.2"
            />
            <path
              d="M116 76 L60 110 L42 248 L68 254 L88 156 L88 312 L216 312 L216 156 L236 254 L262 248 L244 110 L188 76 Q152 90 116 76 Z"
              fill={`url(#${fabricPatternId})`}
            />
            {/* Spread shirt-jacket collar */}
            <path
              d="M120 74 L132 58 L152 84 L172 58 L184 74 L152 96 Z"
              fill={color.highlightHex}
              stroke={seamStroke}
              strokeWidth="1.1"
            />
            {/* 4 Safari Utility Bellows Pockets + Waist Belt */}
            <rect x="102" y="132" width="32" height="36" rx="2" fill="none" stroke={seamStroke} strokeWidth="1.1" />
            <rect x="170" y="132" width="32" height="36" rx="2" fill="none" stroke={seamStroke} strokeWidth="1.1" />
            <rect x="100" y="230" width="36" height="44" rx="2" fill="none" stroke={seamStroke} strokeWidth="1.1" />
            <rect x="168" y="230" width="36" height="44" rx="2" fill="none" stroke={seamStroke} strokeWidth="1.1" />
            <rect x="88" y="202" width="128" height="14" fill={color.shadeHex} stroke={seamStroke} strokeWidth="1" />
            <line x1="152" y1="96" x2="152" y2="312" stroke={seamStroke} strokeWidth="1.2" />
          </g>
        );

      case "kurta-set":
        return (
          <g>
            {/* Straight Aligarhi Pajama */}
            <path
              d="M118 336 L112 432 L144 432 L152 346 L160 432 L192 432 L186 336 Z"
              fill={isLightGarment ? "#DFD4BE" : "#E8DEC9"}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {/* Flowing Kurta silhouette */}
            <path
              d="M118 76 L62 110 L44 246 L70 252 L90 160 L88 352 L216 352 L214 160 L234 252 L260 246 L242 110 L186 76 Q152 90 118 76 Z"
              fill={`url(#${gradId})`}
              stroke={seamStroke}
              strokeWidth="1.2"
            />
            <path
              d="M118 76 L62 110 L44 246 L70 252 L90 160 L88 352 L216 352 L214 160 L234 252 L260 246 L242 110 L186 76 Q152 90 118 76 Z"
              fill={`url(#${fabricPatternId})`}
            />
            {/* Mandarin Collar + Kurta Half Placket */}
            <path
              d="M122 76 L126 58 Q152 68 178 58 L182 76 Q152 88 122 76 Z"
              fill={color.highlightHex}
              stroke={seamStroke}
              strokeWidth="1.1"
            />
            <rect
              x="145"
              y="84"
              width="14"
              height="112"
              fill={color.highlightHex}
              fillOpacity="0.45"
              stroke={seamStroke}
              strokeWidth="1"
            />
          </g>
        );

      case "shirt":
        return (
          <g>
            {/* Bespoke Tailored Dress Shirt */}
            <path
              d="M118 76 L62 108 L40 252 L66 258 L88 158 L90 318 Q152 342 214 318 L216 158 L238 258 L264 252 L242 108 L186 76 Q152 90 118 76 Z"
              fill={`url(#${gradId})`}
              stroke={seamStroke}
              strokeWidth="1.2"
            />
            <path
              d="M118 76 L62 108 L40 252 L66 258 L88 158 L90 318 Q152 342 214 318 L216 158 L238 258 L264 252 L242 108 L186 76 Q152 90 118 76 Z"
              fill={`url(#${fabricPatternId})`}
            />
            {/* Crisp Spread Collar */}
            <path
              d="M122 74 L132 54 L152 82 L172 54 L182 74 L164 96 L152 84 L140 96 Z"
              fill={color.highlightHex}
              stroke={seamStroke}
              strokeWidth="1.1"
            />
            {/* Center Placket */}
            <rect
              x="146"
              y="84"
              width="12"
              height="242"
              fill={color.highlightHex}
              fillOpacity="0.35"
              stroke={seamStroke}
              strokeWidth="0.9"
            />
          </g>
        );
    }
  };

  const renderDetailingOverlay = () => {
    return (
      <g className="pointer-events-none">
        {/* Buttons (Standard 4-hole gold/tonal OR Pearl Buttons) */}
        {buttonYPositions.map((by) =>
          detailing.id === "pearl-buttons" ? (
            <g key={by}>
              <circle
                cx="152"
                cy={by}
                r="4.2"
                fill="#FAF5EB"
                stroke="#C9A24D"
                strokeWidth="0.9"
              />
              <circle cx="150.8" cy={by - 1} r="1.1" fill="#FFFFFF" />
            </g>
          ) : (
            <circle
              key={by}
              cx="152"
              cy={by}
              r="3.2"
              fill={color.shadeHex}
              stroke={accentGold}
              strokeWidth="0.95"
            />
          )
        )}

        {/* Zardozi Metallic Embroidery */}
        {detailing.id === "zardozi" && (
          <g stroke={accentGold} fill="none" strokeLinecap="round">
            {/* Collar filigree */}
            <path d="M126 67 Q152 77 178 67" strokeWidth="2.2" strokeDasharray="3 2" />
            {/* Placket scrollwork */}
            <path
              d="M142 96 C135 112, 146 124, 139 140 C133 156, 146 170, 140 186 C134 202, 145 216, 140 232"
              strokeWidth="1.4"
              strokeDasharray="4 2.5"
            />
            <path
              d="M162 96 C169 112, 158 124, 165 140 C171 156, 158 170, 164 186 C170 202, 159 216, 164 232"
              strokeWidth="1.4"
              strokeDasharray="4 2.5"
            />
            {/* Cuff zardozi bands */}
            <path d="M44 242 L68 248 M43 248 L67 254" strokeWidth="1.8" />
            <path d="M236 248 L260 242 M237 254 L261 248" strokeWidth="1.8" />
          </g>
        )}

        {/* Resham Thread Work */}
        {detailing.id === "thread-work" && (
          <g stroke={threadAccent} fill="none" strokeLinecap="round">
            <path d="M125 71 Q152 80 179 71" strokeWidth="1.2" strokeDasharray="2 3" />
            {[112, 138, 164, 190].map((y) => (
              <g key={y}>
                <path d={`M144 ${y} Q132 ${y - 6} 126 ${y + 3}`} strokeWidth="1.1" />
                <path d={`M160 ${y} Q172 ${y - 6} 178 ${y + 3}`} strokeWidth="1.1" />
                <circle cx="126" cy={y + 3} r="1.5" fill={threadAccent} />
                <circle cx="178" cy={y + 3} r="1.5" fill={threadAccent} />
              </g>
            ))}
          </g>
        )}

        {/* Shisha Mirror Work */}
        {detailing.id === "mirror-work" && (
          <g>
            {[106, 134, 162, 190, 218].map((y) => (
              <g key={y}>
                <polygon
                  points={`136,${y} 140,${y - 5} 144,${y} 140,${y + 5}`}
                  fill="#F6EFE2"
                  fillOpacity="0.72"
                  stroke={accentGold}
                  strokeWidth="1"
                />
                <polygon
                  points={`160,${y} 164,${y - 5} 168,${y} 164,${y + 5}`}
                  fill="#F6EFE2"
                  fillOpacity="0.72"
                  stroke={accentGold}
                  strokeWidth="1"
                />
              </g>
            ))}
            <polygon
              points="152,63 156,67 152,71 148,67"
              fill="#F6EFE2"
              stroke={accentGold}
              strokeWidth="1"
            />
          </g>
        )}

        {/* Contrast Silk Piping */}
        {detailing.id === "contrast-piping" && (
          <g stroke={pipingStroke} fill="none" strokeWidth="1.8" strokeLinecap="round">
            <path d="M123 76 L126 57 Q152 67 178 57 L181 76" />
            <line x1="152" y1="84" x2="152" y2={garment.id === "kurta-set" ? 196 : 312} />
            <line x1="43" y1="248" x2="68" y2="254" />
            <line x1="236" y1="254" x2="261" y2="248" />
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="relative flex flex-col justify-between overflow-hidden border border-gold/30 bg-charcoal/95 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.65)] sm:p-8">
      {/* Subtle Mandala Watermark Behind Garment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      >
        <MandalaWatermark className="h-[420px] w-[420px] animate-mandala-slow" />
      </div>

      {/* Preview Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-gold/20 pb-4">
        <div>
          <p className="font-sans text-[9px] uppercase tracking-atelier text-gold">
            Live Atelier Draft
          </p>
          <p className="mt-1 font-display text-2xl font-light text-ivory">
            {garment.name}{" "}
            <span className="font-hindi text-base text-gold-light">
              · {garment.hindiName}
            </span>
          </p>
        </div>

        <span
          className="h-7 w-7 rounded-full border border-gold/50 shadow-inner"
          style={{ backgroundColor: color.hex }}
          title={color.name}
        />
      </div>

      {/* Stylised Garment SVG Stage */}
      <motion.div
        key={`${garment.id}-${fabric.id}-${color.id}-${detailing.id}`}
        initial={{ opacity: 0.72, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto my-6 flex w-full max-w-[300px] items-center justify-center"
      >
        <svg
          viewBox="0 0 304 452"
          className="h-[340px] w-full sm:h-[390px]"
          role="img"
          aria-label={`Live preview of ${color.name} ${fabric.name} ${garment.name} with ${detailing.name} detailing`}
        >
          <defs>
            <linearGradient id={gradId} x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor={color.highlightHex} />
              <stop offset="52%" stopColor={color.hex} />
              <stop offset="100%" stopColor={color.shadeHex} />
            </linearGradient>
            {renderTexturePattern()}
          </defs>

          {/* Architectural pedestal shadow */}
          <ellipse cx="152" cy="438" rx="68" ry="6" fill="#000000" fillOpacity="0.42" />

          {renderSilhouette()}
          {renderDetailingOverlay()}
        </svg>
      </motion.div>

      {/* Live Bespoke Summary Card */}
      <div className="relative z-10 border border-gold/25 bg-charcoal-elevated/90 p-5">
        <div className="flex items-center justify-between border-b border-gold/15 pb-3">
          <span className="font-sans text-[9px] uppercase tracking-atelier text-gold-light">
            Bespoke Specification
          </span>
          <span className="font-sans text-[10px] text-ivory/60">
            {clientName.trim() ? `For ${clientName.trim()}` : "Made to Measure"}
          </span>
        </div>

        <dl className="mt-3.5 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
          <div>
            <dt className="font-sans text-[9px] uppercase tracking-editorial text-ivory/65">
              Silhouette
            </dt>
            <dd className="mt-0.5 font-sans text-ivory">{garment.name}</dd>
          </div>
          <div>
            <dt className="font-sans text-[9px] uppercase tracking-editorial text-ivory/65">
              Textile
            </dt>
            <dd className="mt-0.5 font-sans text-ivory">{fabric.name}</dd>
          </div>
          <div>
            <dt className="font-sans text-[9px] uppercase tracking-editorial text-ivory/65">
              Palette
            </dt>
            <dd className="mt-0.5 flex items-center gap-2 font-sans text-ivory">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border border-gold/60"
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
            </dd>
          </div>
          <div>
            <dt className="font-sans text-[9px] uppercase tracking-editorial text-ivory/65">
              Detailing
            </dt>
            <dd className="mt-0.5 font-sans text-ivory">{detailing.name}</dd>
          </div>
          {occasion && (
            <div className="col-span-2 border-t border-gold/15 pt-2.5">
              <dt className="font-sans text-[9px] uppercase tracking-editorial text-ivory/65">
                Occasion{eventDate ? " & Date" : ""}
              </dt>
              <dd className="mt-0.5 font-sans text-gold-light">
                {occasion}
                {eventDate ? ` · ${eventDate}` : ""}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
