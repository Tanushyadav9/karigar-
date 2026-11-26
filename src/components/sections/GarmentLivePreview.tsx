"use client";

import React, { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ColorOption,
  DetailingOption,
  FabricOption,
  GarmentOption,
} from "@/data/karigarData";
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
  const drapeGradId = `garment-drape-${uid}`;
  const realTexPatternId = `real-fabric-tex-${uid}`;
  const fabricPatternId = `fabric-tex-${uid}`;

  const isLightGarment = color.id === "ivory" || color.id === "gold";
  const seamStroke = isLightGarment
    ? "rgba(22,12,15,0.34)"
    : "rgba(246,239,226,0.28)";
  const accentGold = isLightGarment ? "#B88E32" : "#E6CA82";
  const accentGoldBright = isLightGarment ? "#9B7320" : "#F5DF9E";
  const threadAccent = isLightGarment ? "#8A631B" : "#DEC078";
  const pipingStroke = color.contrastHex;

  const textureTileSize =
    fabric.id === "linen"
      ? 105
      : fabric.id === "cotton-silk"
        ? 135
        : fabric.id === "velvet"
          ? 185
          : 155;

  const realTexOpacity =
    fabric.id === "velvet"
      ? 0.28
      : fabric.id === "linen"
        ? 0.48
        : fabric.id === "raw-silk"
          ? 0.44
          : fabric.id === "jacquard"
            ? 0.38
            : 0.34;

  const buttonYPositions =
    garment.id === "shirt"
      ? [114, 148, 182, 216, 250, 284]
      : garment.id === "kurta-set"
        ? [114, 144, 174]
        : [118, 152, 186, 220, 254];

  const renderTexturePattern = () => {
    switch (fabric.id) {
      case "raw-silk":
        return (
          <pattern
            id={fabricPatternId}
            width="28"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 3.5 H20 M7 9.5 H28"
              stroke={isLightGarment ? "#1a120b" : "#fff"}
              strokeOpacity="0.12"
              strokeWidth="0.9"
            />
            <path
              d="M21 3.5 H25 M1 9.5 H5"
              stroke="#DEC078"
              strokeOpacity="0.22"
              strokeWidth="0.8"
            />
          </pattern>
        );
      case "velvet":
        return (
          <pattern
            id={fabricPatternId}
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1.3" fill="#000" fillOpacity="0.22" />
            <circle cx="9" cy="9" r="1.2" fill="#fff" fillOpacity="0.08" />
          </pattern>
        );
      case "jacquard":
        return (
          <pattern
            id={fabricPatternId}
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M12 2 L22 12 L12 22 L2 12 Z"
              fill="none"
              stroke={isLightGarment ? "#8B6924" : "#E6CA82"}
              strokeOpacity="0.26"
              strokeWidth="0.9"
            />
            <circle
              cx="12"
              cy="12"
              r="2.4"
              fill={isLightGarment ? "#8B6924" : "#E6CA82"}
              fillOpacity="0.2"
            />
          </pattern>
        );
      case "linen":
        return (
          <pattern
            id={fabricPatternId}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 4.5 H9 M4.5 0 V9"
              stroke={isLightGarment ? "#222" : "#fff"}
              strokeOpacity="0.14"
              strokeWidth="0.7"
            />
          </pattern>
        );
      case "cotton-silk":
        return (
          <pattern
            id={fabricPatternId}
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 18 L18 0"
              stroke="#fff"
              strokeOpacity="0.11"
              strokeWidth="0.75"
            />
          </pattern>
        );
    }
  };

  const renderGarmentLayers = (bodyPath: string) => (
    <>
      {/* 1. Base colour tint gradient */}
      <path
        d={bodyPath}
        fill={`url(#${gradId})`}
        stroke={seamStroke}
        strokeWidth="1.2"
      />
      {/* 2. Real cropped craft-fabric woven texture overlay */}
      <path
        d={bodyPath}
        fill={`url(#${realTexPatternId})`}
        opacity={realTexOpacity}
        style={{
          mixBlendMode: isLightGarment ? "multiply" : "soft-light",
        }}
      />
      {/* 3. Fabric-specific weave / pile / jacquard relief */}
      <path d={bodyPath} fill={`url(#${fabricPatternId})`} />
      {/* 4. Tailoring drapery shading */}
      <path
        d={bodyPath}
        fill={`url(#${drapeGradId})`}
        style={{ mixBlendMode: "multiply" }}
      />
    </>
  );

  const renderSilhouette = () => {
    switch (garment.id) {
      case "sherwani": {
        const bodyPath =
          "M118 76 L62 110 L42 252 L68 258 L88 158 L86 356 Q152 370 218 356 L216 158 L236 258 L262 252 L242 110 L186 76 Q152 92 118 76 Z";
        return (
          <g>
            {/* Churidar trousers underneath */}
            <path
              d="M124 310 L120 432 L145 432 L152 340 L160 432 L186 432 L180 310 Z"
              fill={color.shadeHex}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {renderGarmentLayers(bodyPath)}
            {/* Mandarin Collar */}
            <path
              d="M122 76 L126 56 Q152 66 178 56 L182 76 Q152 88 122 76 Z"
              fill={color.highlightHex}
              stroke={seamStroke}
              strokeWidth="1.1"
            />
            {/* Placket & princess tailoring lines */}
            <line x1="152" y1="84" x2="152" y2="360" stroke={seamStroke} strokeWidth="1.2" />
            <path d="M108 118 Q114 210 106 348" fill="none" stroke={seamStroke} strokeWidth="0.85" />
            <path d="M196 118 Q190 210 198 348" fill="none" stroke={seamStroke} strokeWidth="0.85" />
            {/* Welt chest pocket */}
            <line x1="172" y1="138" x2="198" y2="134" stroke={seamStroke} strokeWidth="1.6" />
          </g>
        );
      }

      case "indo-western": {
        const bodyPath =
          "M116 76 L60 112 L42 248 L68 254 L88 156 L92 318 L142 332 L212 310 L216 156 L236 254 L262 248 L244 112 L188 76 Q152 92 116 76 Z";
        return (
          <g>
            {/* Structured trousers */}
            <path
              d="M118 296 L112 432 L144 432 L152 325 L160 432 L192 432 L186 296 Z"
              fill={color.shadeHex}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {renderGarmentLayers(bodyPath)}
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
      }

      case "safari": {
        const bodyPath =
          "M116 76 L60 110 L42 248 L68 254 L88 156 L88 312 L216 312 L216 156 L236 254 L262 248 L244 110 L188 76 Q152 90 116 76 Z";
        return (
          <g>
            {/* Matching trousers */}
            <path
              d="M116 298 L110 432 L144 432 L152 325 L160 432 L194 432 L188 298 Z"
              fill={color.shadeHex}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {renderGarmentLayers(bodyPath)}
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
      }

      case "kurta-set": {
        const bodyPath =
          "M118 76 L62 110 L44 246 L70 252 L90 160 L88 352 L216 352 L214 160 L234 252 L260 246 L242 110 L186 76 Q152 90 118 76 Z";
        return (
          <g>
            {/* Straight Aligarhi Pajama */}
            <path
              d="M118 336 L112 432 L144 432 L152 346 L160 432 L192 432 L186 336 Z"
              fill={isLightGarment ? "#DFD4BE" : "#E8DEC9"}
              stroke={seamStroke}
              strokeWidth="1"
            />
            {renderGarmentLayers(bodyPath)}
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
      }

      case "shirt": {
        const bodyPath =
          "M118 76 L62 108 L40 252 L66 258 L88 158 L90 318 Q152 342 214 318 L216 158 L238 258 L264 252 L242 108 L186 76 Q152 90 118 76 Z";
        return (
          <g>
            {renderGarmentLayers(bodyPath)}
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
    }
  };

  const renderDetailingOverlay = () => {
    const placketEndY =
      garment.id === "kurta-set" ? 196 : garment.id === "sherwani" ? 318 : 292;
    const isAsymmetric = garment.id === "indo-western";

    return (
      <g className="pointer-events-none">
        {/* Buttons (Standard 4-hole gold/tonal OR Pearl Buttons) */}
        {buttonYPositions.map((by, idx) => {
          const bx = isAsymmetric ? 152 + Math.min(idx * 3.5, 14) : 152;
          return detailing.id === "pearl-buttons" ? (
            <g key={by}>
              <circle
                cx={bx}
                cy={by}
                r="4.4"
                fill="#FAF5EB"
                stroke={accentGold}
                strokeWidth="1.1"
              />
              <circle cx={bx - 1.2} cy={by - 1.1} r="1.2" fill="#FFFFFF" />
            </g>
          ) : (
            <g key={by}>
              <circle
                cx={bx}
                cy={by}
                r="3.4"
                fill={color.shadeHex}
                stroke={accentGoldBright}
                strokeWidth="1.1"
              />
              <circle cx={bx} cy={by} r="1" fill={accentGoldBright} />
            </g>
          );
        })}

        {/* Zardozi Metallic Embroidery — visible gold pattern along collar, placket & cuffs */}
        {detailing.id === "zardozi" && (
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Collar double-rail filigree */}
            <path
              d="M124 66 Q152 78 180 66"
              stroke={accentGoldBright}
              strokeWidth="2.4"
              strokeDasharray="3.5 2"
            />
            <path
              d="M125 72 Q152 84 179 72"
              stroke={accentGold}
              strokeWidth="1.2"
            />

            {/* Placket ornate gold scrollwork */}
            {isAsymmetric ? (
              <>
                <path
                  d="M144 92 L162 164 L136 312"
                  stroke={accentGoldBright}
                  strokeWidth="1.8"
                  strokeDasharray="4 2.5"
                />
                <path
                  d="M160 92 L177 164 L151 312"
                  stroke={accentGold}
                  strokeWidth="1.4"
                  strokeDasharray="2.5 3"
                />
              </>
            ) : (
              <>
                <path
                  d={`M141 94 C132 110, 146 124, 138 140 C131 156, 145 170, 138 186 ${
                    placketEndY > 200
                      ? "C132 204, 145 220, 138 238 C132 256, 144 272, 139 288"
                      : ""
                  }`}
                  stroke={accentGoldBright}
                  strokeWidth="1.9"
                />
                <path
                  d={`M163 94 C172 110, 158 124, 166 140 C173 156, 159 170, 166 186 ${
                    placketEndY > 200
                      ? "C172 204, 159 220, 166 238 C172 256, 160 272, 165 288"
                      : ""
                  }`}
                  stroke={accentGoldBright}
                  strokeWidth="1.9"
                />
                {/* Gold paisley / floral dots along placket */}
                {[108, 138, 168, ...(placketEndY > 200 ? [202, 236, 270] : [])].map(
                  (py) => (
                    <g key={py}>
                      <circle cx="136" cy={py} r="2.2" fill={accentGoldBright} />
                      <circle cx="168" cy={py} r="2.2" fill={accentGoldBright} />
                    </g>
                  )
                )}
              </>
            )}

            {/* Visible gold embroidery bands & motifs on both cuffs */}
            <path d="M44 236 L68 242 M43 243 L67 249 M42 250 L66 256" stroke={accentGoldBright} strokeWidth="2.1" />
            <path d="M46 239 L51 235 L56 241 L61 237 L66 243" stroke={accentGold} strokeWidth="1.3" />
            <path d="M236 242 L260 236 M237 249 L261 243 M238 256 L262 250" stroke={accentGoldBright} strokeWidth="2.1" />
            <path d="M238 243 L243 237 L248 241 L253 235 L258 239" stroke={accentGold} strokeWidth="1.3" />
          </g>
        )}

        {/* Resham Thread Work — gold & champagne motifs along collar, placket & cuffs */}
        {detailing.id === "thread-work" && (
          <g stroke={threadAccent} fill="none" strokeLinecap="round">
            <path d="M125 69 Q152 80 179 69" strokeWidth="1.6" strokeDasharray="2.5 2.5" />
            {[106, 134, 162, 190, ...(placketEndY > 210 ? [218, 246] : [])].map((y) => (
              <g key={y}>
                <path d={`M143 ${y} Q130 ${y - 7} 124 ${y + 3}`} strokeWidth="1.4" />
                <path d={`M161 ${y} Q174 ${y - 7} 180 ${y + 3}`} strokeWidth="1.4" />
                <circle cx="124" cy={y + 3} r="1.9" fill={accentGoldBright} />
                <circle cx="180" cy={y + 3} r="1.9" fill={accentGoldBright} />
              </g>
            ))}
            {/* Cuff threadwork trim */}
            <path d="M44 240 L68 246 M43 247 L67 253" stroke={accentGoldBright} strokeWidth="1.6" strokeDasharray="3 2" />
            <path d="M236 246 L260 240 M237 253 L261 247" stroke={accentGoldBright} strokeWidth="1.6" strokeDasharray="3 2" />
          </g>
        )}

        {/* Shisha Mirror Work — gold bezels along collar, placket & cuffs */}
        {detailing.id === "mirror-work" && (
          <g>
            {[104, 132, 160, 188, ...(placketEndY > 210 ? [216, 244] : [])].map((y) => (
              <g key={y}>
                <polygon
                  points={`135,${y} 140,${y - 5.5} 145,${y} 140,${y + 5.5}`}
                  fill="#F6EFE2"
                  fillOpacity="0.82"
                  stroke={accentGoldBright}
                  strokeWidth="1.2"
                />
                <polygon
                  points={`159,${y} 164,${y - 5.5} 169,${y} 164,${y + 5.5}`}
                  fill="#F6EFE2"
                  fillOpacity="0.82"
                  stroke={accentGoldBright}
                  strokeWidth="1.2"
                />
              </g>
            ))}
            <polygon
              points="152,62 157,67 152,72 147,67"
              fill="#F6EFE2"
              stroke={accentGoldBright}
              strokeWidth="1.2"
            />
            {/* Cuff mirror diamonds */}
            {[50, 60].map((cx, i) => (
              <polygon
                key={`lc-${cx}`}
                points={`${cx},${243 + i * 2} ${cx + 3},${239 + i * 2} ${cx + 6},${243 + i * 2} ${cx + 3},${247 + i * 2}`}
                fill="#F6EFE2"
                stroke={accentGoldBright}
                strokeWidth="1"
              />
            ))}
            {[242, 252].map((cx, i) => (
              <polygon
                key={`rc-${cx}`}
                points={`${cx},${245 - i * 2} ${cx + 3},${241 - i * 2} ${cx + 6},${245 - i * 2} ${cx + 3},${249 - i * 2}`}
                fill="#F6EFE2"
                stroke={accentGoldBright}
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* Pearl Buttons — gold cufflink accents */}
        {detailing.id === "pearl-buttons" && (
          <g>
            <circle cx="55" cy="246" r="3" fill="#FAF5EB" stroke={accentGoldBright} strokeWidth="1" />
            <circle cx="249" cy="246" r="3" fill="#FAF5EB" stroke={accentGoldBright} strokeWidth="1" />
          </g>
        )}

        {/* Contrast Silk Piping — collar, placket & cuffs */}
        {detailing.id === "contrast-piping" && (
          <g fill="none" strokeLinecap="round">
            <path d="M123 76 L126 57 Q152 67 178 57 L181 76" stroke={pipingStroke} strokeWidth="2.2" />
            <line
              x1="152"
              y1="84"
              x2={isAsymmetric ? 168 : 152}
              y2={placketEndY}
              stroke={pipingStroke}
              strokeWidth="2.2"
            />
            <line x1="43" y1="244" x2="68" y2="250" stroke={pipingStroke} strokeWidth="2.2" />
            <line x1="43" y1="248" x2="68" y2="254" stroke={accentGoldBright} strokeWidth="1" />
            <line x1="236" y1="250" x2="261" y2="244" stroke={pipingStroke} strokeWidth="2.2" />
            <line x1="236" y1="254" x2="261" y2="248" stroke={accentGoldBright} strokeWidth="1" />
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
            Live Atelier Draft · {fabric.name}
          </p>
          <p className="mt-1 font-display text-2xl font-light text-ivory">
            {garment.name}{" "}
            <span className="font-hindi text-base text-gold-light">
              · {garment.hindiName}
            </span>
          </p>
        </div>

        <span
          className="h-7 w-7 rounded-full border border-gold/50 shadow-inner transition-colors duration-500 ease-atelier"
          style={{ backgroundColor: color.hex }}
          title={color.name}
        />
      </div>

      {/* Stylised Garment SVG Stage with Soft Cross-Fade */}
      <div className="relative z-10 mx-auto my-6 h-[340px] w-full max-w-[300px] sm:h-[390px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`${garment.id}-${fabric.id}-${color.id}-${detailing.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 304 452"
              className="h-full w-full"
              role="img"
              aria-label={`Live preview of ${color.name} ${fabric.name} ${garment.name} with ${detailing.name} detailing`}
            >
              <defs>
                <linearGradient id={gradId} x1="15%" y1="0%" x2="85%" y2="100%">
                  <stop offset="0%" stopColor={color.highlightHex} />
                  <stop offset="52%" stopColor={color.hex} />
                  <stop offset="100%" stopColor={color.shadeHex} />
                </linearGradient>
                <linearGradient id={drapeGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.22" />
                  <stop offset="28%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#000000" stopOpacity="0.06" />
                  <stop offset="72%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.26" />
                </linearGradient>
                <pattern
                  id={realTexPatternId}
                  width={textureTileSize}
                  height={textureTileSize}
                  patternUnits="userSpaceOnUse"
                >
                  <image
                    href="/images/fabric-texture-tile.webp"
                    width={textureTileSize}
                    height={textureTileSize}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
                {renderTexturePattern()}
              </defs>

              {/* Architectural pedestal shadow */}
              <ellipse cx="152" cy="438" rx="68" ry="6" fill="#000000" fillOpacity="0.42" />

              {renderSilhouette()}
              {renderDetailingOverlay()}
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>

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
