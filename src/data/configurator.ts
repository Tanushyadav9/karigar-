export type GarmentId =
  | "sherwani"
  | "indo-western"
  | "safari"
  | "kurta-set"
  | "shirt";

export type FabricId =
  | "raw-silk"
  | "velvet"
  | "jacquard"
  | "linen"
  | "cotton-silk";

export type ColorId =
  | "ivory"
  | "maroon"
  | "midnight-teal"
  | "black"
  | "gold"
  | "sage"
  | "wine"
  | "navy";

export type DetailingId =
  | "none"
  | "zardozi"
  | "thread-work"
  | "mirror-work"
  | "pearl-buttons"
  | "contrast-piping";

export interface GarmentOption {
  id: GarmentId;
  name: string;
  hindiName: string;
  silhouetteNote: string;
}

export interface FabricOption {
  id: FabricId;
  name: string;
  origin: string;
  weight: string;
  sheen: string;
}

export interface ColorOption {
  id: ColorId;
  name: string;
  hex: string;
  shadeHex: string;
  highlightHex: string;
  contrastHex: string;
}

export interface DetailingOption {
  id: DetailingId;
  name: string;
  note: string;
}

export const CONFIG_GARMENTS: GarmentOption[] = [
  {
    id: "sherwani",
    name: "Sherwani",
    hindiName: "शेरवानी",
    silhouetteNote: "Mandarin collar · Knee-length royal cut · Churidar",
  },
  {
    id: "indo-western",
    name: "Indo-Western",
    hindiName: "इंडो-वेस्टर्न",
    silhouetteNote: "Structured bandhgala lapel · Asymmetric drape",
  },
  {
    id: "safari",
    name: "Safari",
    hindiName: "सफारी",
    silhouetteNote: "Tailored spread collar · Four-pocket utility silhouette",
  },
  {
    id: "kurta-set",
    name: "Kurta Set",
    hindiName: "कुर्ता सेट",
    silhouetteNote: "Relaxed side-slit cut · Fused collar · Straight trouser",
  },
  {
    id: "shirt",
    name: "Shirt",
    hindiName: "शर्ट",
    silhouetteNote: "22-SPI single-needle yoke · Mother-of-pearl placket",
  },
];

export const CONFIG_FABRICS: FabricOption[] = [
  {
    id: "raw-silk",
    name: "Raw Silk",
    origin: "Banarasi Handloom",
    weight: "Medium · Architectural Crispness",
    sheen: "Natural slubbed matte lustre",
  },
  {
    id: "velvet",
    name: "Velvet",
    origin: "Micro-Pile Silk Blend",
    weight: "Rich · Ceremonial Drape",
    sheen: "Deep directional shadow pile",
  },
  {
    id: "jacquard",
    name: "Jacquard",
    origin: "Bespoke Loom Brocade",
    weight: "Structured · Self-Woven Motif",
    sheen: "Subtle raised tonal relief",
  },
  {
    id: "linen",
    name: "Linen",
    origin: "European Flax Weave",
    weight: "Light · Breathable Day Luxury",
    sheen: "Crisp cross-woven natural matte",
  },
  {
    id: "cotton-silk",
    name: "Cotton Silk",
    origin: "Chanderi Mulberry Blend",
    weight: "Fluid · All-Season Comfort",
    sheen: "Soft pearlescent finish",
  },
];

export const CONFIG_COLORS: ColorOption[] = [
  {
    id: "ivory",
    name: "Ivory",
    hex: "#EDE3D0",
    shadeHex: "#CFC0A3",
    highlightHex: "#FAF5EB",
    contrastHex: "#4A0F1C",
  },
  {
    id: "maroon",
    name: "Maroon",
    hex: "#581322",
    shadeHex: "#360913",
    highlightHex: "#7A2034",
    contrastHex: "#DEC078",
  },
  {
    id: "midnight-teal",
    name: "Midnight Teal",
    hex: "#10454E",
    shadeHex: "#08292F",
    highlightHex: "#1C636F",
    contrastHex: "#DEC078",
  },
  {
    id: "black",
    name: "Black",
    hex: "#1D1D20",
    shadeHex: "#0E0E10",
    highlightHex: "#323238",
    contrastHex: "#C9A24D",
  },
  {
    id: "gold",
    name: "Gold",
    hex: "#B8903D",
    shadeHex: "#876624",
    highlightHex: "#DFBE74",
    contrastHex: "#121212",
  },
  {
    id: "sage",
    name: "Sage",
    hex: "#677C6C",
    shadeHex: "#46574A",
    highlightHex: "#899F8E",
    contrastHex: "#F6EFE2",
  },
  {
    id: "wine",
    name: "Wine",
    hex: "#6B1F35",
    shadeHex: "#42101F",
    highlightHex: "#8C2D49",
    contrastHex: "#F6EFE2",
  },
  {
    id: "navy",
    name: "Navy",
    hex: "#162742",
    shadeHex: "#0C1728",
    highlightHex: "#264069",
    contrastHex: "#DEC078",
  },
];

export const CONFIG_DETAILING: DetailingOption[] = [
  {
    id: "none",
    name: "None",
    note: "Pure architectural cut with tonal tailoring stitches",
  },
  {
    id: "zardozi",
    name: "Zardozi",
    note: "Antique metallic dabka & bullions on collar, placket, and cuffs",
  },
  {
    id: "thread-work",
    name: "Thread work",
    note: "Fine tonal resham botanical vines hand-embroidered along edges",
  },
  {
    id: "mirror-work",
    name: "Mirror work",
    note: "Hand-encased geometric shisha accents catching evening light",
  },
  {
    id: "pearl-buttons",
    name: "Pearl buttons",
    note: "Lustrous heirloom pearl-shank closures down placket & cuffs",
  },
  {
    id: "contrast-piping",
    name: "Contrast piping",
    note: "Razor-crisp silk cord edging along lapels, collar, and pockets",
  },
];

export const CONFIG_OCCASIONS = [
  "Wedding / Dulha",
  "Baraati",
  "Sangeet Night",
  "Cocktail & Reception",
  "Festive Function",
  "Boardroom / Formal",
] as const;

export const STEP_LABELS = [
  { step: 1, label: "Garment" },
  { step: 2, label: "Fabric" },
  { step: 3, label: "Colour" },
  { step: 4, label: "Detailing" },
  { step: 5, label: "Occasion" },
] as const;
