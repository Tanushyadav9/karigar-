import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F6EFE2",
          muted: "#E5DBC8",
        },
        gold: {
          DEFAULT: "#C9A24D",
          light: "#DEC078",
          dark: "#9D7B32",
        },
        maroon: {
          DEFAULT: "#4A0F1C",
          deep: "#320812",
          soft: "#641728",
        },
        teal: {
          DEFAULT: "#0E3B43",
          deep: "#09272D",
        },
        charcoal: {
          DEFAULT: "#121212",
          elevated: "#1A1816",
          soft: "#26221F",
        },
        rose: {
          DEFAULT: "#B5475B",
        },
        saffron: {
          DEFAULT: "#D98324",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
        hindi: ["var(--font-hindi)", "serif"],
      },
      spacing: {
        section: "clamp(5.5rem, 11vw, 10rem)",
        "section-sm": "clamp(3.5rem, 7vw, 6rem)",
        gutter: "clamp(1.25rem, 4vw, 4rem)",
        nav: "5.25rem",
      },
      letterSpacing: {
        atelier: "0.24em",
        editorial: "0.16em",
        "tight-display": "-0.025em",
      },
      transitionTimingFunction: {
        atelier: "cubic-bezier(0.16, 1, 0.3, 1)",
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
        stitch: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        700: "700ms",
        900: "900ms",
        1200: "1200ms",
        1500: "1500ms",
      },
      maxWidth: {
        atelier: "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
