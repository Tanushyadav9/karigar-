import { ImageResponse } from "next/og";

export const alt = "Karigar Couture — Creating Stylish Indian Outfits";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 70% 30%, #4A0F1C 0%, #1F080D 50%, #121212 100%)",
          color: "#F6EFE2",
          padding: "64px",
          border: "1px solid rgba(201,162,77,0.4)",
        }}
      >
        {/* 4-hole button mark */}
        <svg
          width="88"
          height="88"
          viewBox="0 0 64 64"
          fill="none"
          style={{ marginBottom: "28px" }}
        >
          <circle cx="32" cy="32" r="28" stroke="#C9A24D" strokeWidth="1.8" />
          <circle cx="32" cy="32" r="21" stroke="#DEC078" strokeOpacity="0.4" strokeWidth="1" />
          <circle cx="25" cy="25" r="2.6" fill="#121212" stroke="#C9A24D" strokeWidth="1.2" />
          <circle cx="39" cy="25" r="2.6" fill="#121212" stroke="#C9A24D" strokeWidth="1.2" />
          <circle cx="25" cy="39" r="2.6" fill="#121212" stroke="#C9A24D" strokeWidth="1.2" />
          <circle cx="39" cy="39" r="2.6" fill="#121212" stroke="#C9A24D" strokeWidth="1.2" />
          <path d="M25 25 L39 39 M39 25 L25 39" stroke="#DEC078" strokeWidth="1.8" strokeLinecap="round" />
        </svg>

        <div
          style={{
            fontSize: "64px",
            letterSpacing: "14px",
            textTransform: "uppercase",
            color: "#DEC078",
            fontWeight: 400,
          }}
        >
          KARIGAR COUTURE
        </div>

        <div
          style={{
            marginTop: "18px",
            fontSize: "24px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#F6EFE2",
            opacity: 0.9,
          }}
        >
          Creating Stylish Indian Outfits
        </div>

        <div
          style={{
            marginTop: "42px",
            fontSize: "16px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#C9A24D",
          }}
        >
          Sherwanis · Indo-Western · Safari · Kurtas · Delhi 110051
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
