import React from "react";

interface ButtonMarkProps {
  size?: number;
  className?: string;
  showStitch?: boolean;
  tone?: "gold" | "ivory" | "maroon";
}

export function ButtonMark({
  size = 36,
  className = "",
  showStitch = true,
  tone = "gold",
}: ButtonMarkProps) {
  const strokeColor =
    tone === "ivory"
      ? "#F6EFE2"
      : tone === "maroon"
        ? "#4A0F1C"
        : "#C9A24D";

  const holeFill = tone === "maroon" ? "#320812" : "#121212";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer beveled rim */}
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke={strokeColor}
        strokeWidth="1.6"
      />
      {/* Inner recessed couture dish */}
      <circle
        cx="32"
        cy="32"
        r="22.5"
        stroke={strokeColor}
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      {/* Four symmetrical thread holes */}
      <circle cx="24.5" cy="24.5" r="2.6" fill={holeFill} stroke={strokeColor} strokeWidth="1.2" />
      <circle cx="39.5" cy="24.5" r="2.6" fill={holeFill} stroke={strokeColor} strokeWidth="1.2" />
      <circle cx="24.5" cy="39.5" r="2.6" fill={holeFill} stroke={strokeColor} strokeWidth="1.2" />
      <circle cx="39.5" cy="39.5" r="2.6" fill={holeFill} stroke={strokeColor} strokeWidth="1.2" />

      {/* Crossed couture gold stitch */}
      {showStitch && (
        <g stroke={strokeColor} strokeWidth="1.75" strokeLinecap="round">
          <path d="M24.5 24.5 L39.5 39.5" />
          <path d="M39.5 24.5 L24.5 39.5" />
        </g>
      )}
    </svg>
  );
}
