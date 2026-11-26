import React from "react";

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden opacity-[0.03] md:block"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.6) 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}
