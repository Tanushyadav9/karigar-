import React from "react";

interface MandalaWatermarkProps {
  className?: string;
  strokeColor?: string;
}

export function MandalaWatermark({
  className = "",
  strokeColor = "#C9A24D",
}: MandalaWatermarkProps) {
  const petals = Array.from({ length: 12 }, (_, idx) => idx * 30);
  const outerRays = Array.from({ length: 24 }, (_, idx) => idx * 15);

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Concentric filigree rings */}
      <circle cx="200" cy="200" r="190" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="3 5" />
      <circle cx="200" cy="200" r="172" stroke={strokeColor} strokeWidth="0.75" />
      <circle cx="200" cy="200" r="144" stroke={strokeColor} strokeWidth="0.6" strokeOpacity="0.7" />
      <circle cx="200" cy="200" r="108" stroke={strokeColor} strokeWidth="0.75" />
      <circle cx="200" cy="200" r="68" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="2 4" />
      <circle cx="200" cy="200" r="34" stroke={strokeColor} strokeWidth="0.8" />
      <circle cx="200" cy="200" r="10" stroke={strokeColor} strokeWidth="0.8" />

      {/* 12 primary lotus petals */}
      {petals.map((angle) => (
        <g key={`petal-${angle}`} transform={`rotate(${angle} 200 200)`}>
          <path
            d="M200 166 C214 140 218 112 200 92 C182 112 186 140 200 166 Z"
            stroke={strokeColor}
            strokeWidth="0.8"
          />
          <path
            d="M200 132 C222 104 226 68 200 38 C174 68 178 104 200 132 Z"
            stroke={strokeColor}
            strokeWidth="0.7"
            strokeOpacity="0.85"
          />
          <circle cx="200" cy="28" r="2.2" fill={strokeColor} fillOpacity="0.7" />
        </g>
      ))}

      {/* 24 outer crown arcs */}
      {outerRays.map((angle) => (
        <g key={`ray-${angle}`} transform={`rotate(${angle} 200 200)`}>
          <line
            x1="200"
            y1="56"
            x2="200"
            y2="28"
            stroke={strokeColor}
            strokeWidth="0.5"
            strokeOpacity="0.55"
          />
        </g>
      ))}
    </svg>
  );
}

export function MandalaDivider({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, idx) => idx * 45);

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-gold"
      >
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.55" />
        <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="32" cy="32" r="2" fill="currentColor" />
        {petals.map((angle) => (
          <path
            key={angle}
            d="M32 24 C35 18 35 12 32 8 C29 12 29 18 32 24 Z"
            stroke="currentColor"
            strokeWidth="0.75"
            transform={`rotate(${angle} 32 32)`}
          />
        ))}
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
    </div>
  );
}
