// KARIGAR COUTURE - UNIFIED TYPED CONTENT DATA

// --- Source: src/data/looks.ts ---
export interface LookPiece {
  name: string;
  image: string;
}

export interface LookHotspot {
  /** Normalized horizontal coordinate over the front model card (0 to 100%) */
  x: number;
  /** Normalized vertical coordinate over the front model card (0 to 100%) */
  y: number;
  label: string;
  closeupImage: string;
}

export interface LookItem {
  id: string;
  name: string;
  hindiName: string;
  image: string;
  fabricLine: string;
  accentColor: string;
  pieces: LookPiece[];
  hotspots: LookHotspot[];
}

export const looks: LookItem[] = [
  {
    id: 'look-01',
    name: 'Dulha Sherwani',
    hindiName: 'दूल्हा शेरवानी',
    image: '/looks/look-01.png',
    fabricLine: 'Hand-woven Raw Silk · Antique Zardozi',
    accentColor: '#4A0F1C',
    pieces: [
      { name: 'Ivory Zardozi Sherwani', image: '/images/hero-sherwani.jpg' },
      { name: 'Maroon Jamawar Stole', image: '/images/craft-embroidery.jpg' },
      { name: 'Chanderi Silk Kurta', image: '/images/collection-kurta.jpg' },
      { name: 'Tailored Aligarh Churidar', image: '/images/collection-trousers.jpg' },
      { name: 'Hand-stitched Gold Mojari', image: '/images/occasion-baraati.jpg' },
      { name: 'Kalangi Heritage Brooch', image: '/images/craft-fabric.jpg' },
    ],
    hotspots: [
      { x: 50, y: 18, label: 'Zardozi on raw silk', closeupImage: '/images/craft-embroidery.jpg' },
      { x: 38, y: 36, label: 'Maroon Jamawar drape', closeupImage: '/images/occasion-baraati.jpg' },
      { x: 50, y: 42, label: 'Hand-cast brass buttons', closeupImage: '/images/craft-fabric.jpg' },
      { x: 56, y: 63, label: 'Gota patti hem border', closeupImage: '/images/hero-sherwani.jpg' },
    ],
  },
  {
    id: 'look-02',
    name: 'Baraati Bandhgala',
    hindiName: 'बाराती बंदगला',
    image: '/looks/look-02.png',
    fabricLine: 'Super 150s Wool · Midnight Teal Silk Lining',
    accentColor: '#0E3B43',
    pieces: [
      { name: 'Charcoal Jodhpuri Bandhgala', image: '/images/occasion-baraati.jpg' },
      { name: 'Teal Jacquard Pocket Square', image: '/images/craft-fabric.jpg' },
      { name: 'Crisp Egyptian Cotton Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Pleated Wool Barathea Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Polished Oxford Brogue', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 50, y: 17, label: 'High-stand Bandhgala collar', closeupImage: '/images/occasion-baraati.jpg' },
      { x: 50, y: 31, label: 'Antique gold crest buttons', closeupImage: '/images/craft-fabric.jpg' },
      { x: 60, y: 26, label: 'Hand-rolled silk pocket square', closeupImage: '/images/craft-cutting.jpg' },
      { x: 46, y: 53, label: 'Double-welt tailored hem', closeupImage: '/images/collection-trousers.jpg' },
    ],
  },
  {
    id: 'look-03',
    name: 'Sangeet Indo-Western',
    hindiName: 'संगीत इंडो-वेस्टर्न',
    image: '/looks/look-03.png',
    fabricLine: 'Midnight Teal Velvet · Asymmetric Drape',
    accentColor: '#0E3B43',
    pieces: [
      { name: 'Asymmetric Teal Achkan', image: '/images/hero-indowestern.jpg' },
      { name: 'Ivory Pleated Drape Kurta', image: '/images/collection-indowestern.jpg' },
      { name: 'Slim Tapered Jodhpur Pant', image: '/images/collection-trousers.jpg' },
      { name: 'Embroidered Velvet Loafer', image: '/images/occasion-sangeet.jpg' },
    ],
    hotspots: [
      { x: 48, y: 18, label: 'Sculpted mandarin neckline', closeupImage: '/images/hero-indowestern.jpg' },
      { x: 56, y: 34, label: 'Tone-on-tone resham stitch', closeupImage: '/images/craft-embroidery.jpg' },
      { x: 50, y: 44, label: 'Concealed placket closures', closeupImage: '/images/collection-indowestern.jpg' },
      { x: 44, y: 63, label: 'Asymmetric layered hem', closeupImage: '/images/occasion-sangeet.jpg' },
    ],
  },
  {
    id: 'look-04',
    name: 'Cocktail Velvet Jacket',
    hindiName: 'कॉकटेल वेलवेट जैकेट',
    image: '/looks/look-04.png',
    fabricLine: 'Deep Wine Silk Velvet · Satin Shawl Lapel',
    accentColor: '#4A0F1C',
    pieces: [
      { name: 'Wine Silk Velvet Dinner Jacket', image: '/images/occasion-sangeet.jpg' },
      { name: 'Black Wing-Collar Dress Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Satin-Stripe Tuxedo Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Silk Cummerbund & Bow', image: '/images/craft-fabric.jpg' },
    ],
    hotspots: [
      { x: 47, y: 20, label: 'Silk-faced shawl lapel', closeupImage: '/images/occasion-sangeet.jpg' },
      { x: 50, y: 35, label: 'French-knot cuff embroidery', closeupImage: '/images/craft-embroidery.jpg' },
      { x: 50, y: 40, label: 'Silk-covered dome button', closeupImage: '/images/craft-fabric.jpg' },
      { x: 54, y: 52, label: 'Hand-basted vent finish', closeupImage: '/images/craft-fitting.jpg' },
    ],
  },
  {
    id: 'look-05',
    name: 'Safari Suit',
    hindiName: 'सफारी सूट',
    image: '/looks/look-05.png',
    fabricLine: 'Belgian Linen-Cotton · Four-Pocket Utility Cut',
    accentColor: '#2E261B',
    pieces: [
      { name: 'Sand Linen Safari Jacket', image: '/images/collection-safari.jpg' },
      { name: 'Horn-Buttoned Waist Belt', image: '/images/craft-cutting.jpg' },
      { name: 'Relaxed Linen Pleat Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Suede Penny Loafer', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 49, y: 18, label: 'Open camp collar', closeupImage: '/images/collection-safari.jpg' },
      { x: 40, y: 34, label: 'Bellows chest pocket stitch', closeupImage: '/images/craft-cutting.jpg' },
      { x: 50, y: 38, label: 'Natural buffalo horn buttons', closeupImage: '/images/craft-fabric.jpg' },
      { x: 54, y: 52, label: 'Double-needle felled seam', closeupImage: '/images/craft-measurement.jpg' },
    ],
  },
  {
    id: 'look-06',
    name: 'Festive Kurta Set',
    hindiName: 'उत्सव कुर्ता सेट',
    image: '/looks/look-06.png',
    fabricLine: 'Saffron Mulberry Silk · Mirror & Resham Work',
    accentColor: '#5B3410',
    pieces: [
      { name: 'Saffron Mulberry Silk Kurta', image: '/images/hero-kurta.jpg' },
      { name: 'Ivory Raw Silk Pyjama', image: '/images/collection-kurta.jpg' },
      { name: 'Printed Organza Nehru Stole', image: '/images/craft-embroidery.jpg' },
      { name: 'Tan Leather Kolhapuri', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 50, y: 18, label: 'Resham collar piping', closeupImage: '/images/hero-kurta.jpg' },
      { x: 50, y: 30, label: 'Hand-loomed mulberry weave', closeupImage: '/images/craft-fabric.jpg' },
      { x: 50, y: 40, label: 'Mother-of-pearl studs', closeupImage: '/images/collection-kurta.jpg' },
      { x: 46, y: 63, label: 'Side-slit tassel finish', closeupImage: '/images/craft-embroidery.jpg' },
    ],
  },
  {
    id: 'look-07',
    name: 'Boardroom Nehru Jacket',
    hindiName: 'बोर्डरूम नेहरू जैकेट',
    image: '/looks/look-07.png',
    fabricLine: 'Slate Worsted Wool · Structured Waistcoat',
    accentColor: '#0E3B43',
    pieces: [
      { name: 'Slate Worsted Nehru Modi Jacket', image: '/images/collection-indowestern.jpg' },
      { name: 'Ivory Giza Cotton Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Charcoal Cavalry Twill Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Brushed Brass Tie Pin', image: '/images/craft-fabric.jpg' },
    ],
    hotspots: [
      { x: 50, y: 18, label: 'Crisp fused band collar', closeupImage: '/images/craft-cutting.jpg' },
      { x: 58, y: 27, label: 'Slanted welt breast pocket', closeupImage: '/images/craft-measurement.jpg' },
      { x: 50, y: 37, label: 'Matte horn five-button front', closeupImage: '/images/craft-fabric.jpg' },
      { x: 48, y: 52, label: 'Tailored waist suppression', closeupImage: '/images/craft-fitting.jpg' },
    ],
  },
  {
    id: 'look-08',
    name: 'Classic Shirt & Trousers',
    hindiName: 'क्लासिक शर्ट और ट्राउज़र',
    image: '/looks/look-08.png',
    fabricLine: '2-Ply Giza Cotton · Gurkha High-Rise Trouser',
    accentColor: '#24201C',
    pieces: [
      { name: 'Ivory 2-Ply Giza Dress Shirt', image: '/images/collection-shirts.jpg' },
      { name: 'Charcoal Gurkha Pleat Trouser', image: '/images/collection-trousers.jpg' },
      { name: 'Monogrammed French Cuff', image: '/images/craft-measurement.jpg' },
      { name: 'Hand-welted Derby Shoe', image: '/images/craft-fitting.jpg' },
    ],
    hotspots: [
      { x: 50, y: 17, label: 'Hand-turned spread collar', closeupImage: '/images/collection-shirts.jpg' },
      { x: 50, y: 34, label: 'Single-needle 22 SPI seam', closeupImage: '/images/craft-measurement.jpg' },
      { x: 45, y: 50, label: 'Extended Gurkha waistband', closeupImage: '/images/collection-trousers.jpg' },
      { x: 54, y: 86, label: 'Turn-up cuff trouser break', closeupImage: '/images/craft-fitting.jpg' },
    ],
  },
];

// --- Source: src/data/collections.ts ---
export interface CollectionGarment {
  id: string;
  index: string;
  name: string;
  hindiName: string;
  description: string;
  fabric: string;
  image: string;
  alt: string;
  whatsappText: string;
}

/** Atelier live WhatsApp business number (country code + number, no +) */
export const ATELIER_WHATSAPP_NUMBER = "918595776323";

export function buildWhatsAppEnquiryUrl(message: string): string {
  return `https://wa.me/${ATELIER_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

export const COLLECTIONS: CollectionGarment[] = [
  {
    id: "sherwani",
    index: "०१",
    name: "Sherwani",
    hindiName: "शेरवानी",
    description:
      "Architectural royal silhouettes sculpted with hand-padded shoulders and heirloom collar proportions. Cut from a single continuous pattern for ceremonial poise.",
    fabric: "Handwoven Raw Silk • Antique Zardozi Embroidery",
    image: "/images/collection-sherwani.jpg",
    alt: "Karigar Couture ivory raw-silk Sherwani with antique-gold zardozi embroidery",
    whatsappText:
      "Namaste Karigar Couture, I would like to enquire about a bespoke Sherwani fitting at your Delhi atelier.",
  },
  {
    id: "indo-western",
    index: "०२",
    name: "Indo-Western Suit",
    hindiName: "इंडो-वेस्टर्न",
    description:
      "Sharp Savile-inspired lapel geometry fused with structured bandhgala collars and draped plackets. Tailored for receptions, sangeets, and modern black-tie evenings.",
    fabric: "Midnight Jacquard Wool-Silk • Hand-Piped Zari",
    image: "/images/collection-indowestern.jpg",
    alt: "Karigar Couture midnight-teal Indo-Western bandhgala suit",
    whatsappText:
      "Namaste Karigar Couture, I would like to enquire about a bespoke Indo-Western Suit fitting.",
  },
  {
    id: "safari-suit",
    index: "०३",
    name: "Safari Suit",
    hindiName: "सफारी सूट",
    description:
      "Structured four-pocket utility jackets refined with concealed horn plackets and breathable tropical drape. Effortless authority from sunlit gardens to evening salons.",
    fabric: "Irish Linen-Wool • Hand-Stitched Horn Buttons",
    image: "/images/collection-safari.jpg",
    alt: "Karigar Couture tailored charcoal-olive bespoke Safari Suit",
    whatsappText:
      "Namaste Karigar Couture, I would like to enquire about a custom Safari Suit.",
  },
  {
    id: "kurta-set",
    index: "०४",
    name: "Kurta Set",
    hindiName: "कुर्ता सेट",
    description:
      "Fluid festive drapes anchored by crisp fused mandarin collars and bespoke four-hole metallic buttons. Paired with tapered churidars or relaxed Aligarhi trousers.",
    fabric: "Pure Mulberry Silk-Linen • Resham & Tilla Edge",
    image: "/images/collection-kurta.jpg",
    alt: "Karigar Couture deep maroon silk-linen Kurta Set with gold buttons",
    whatsappText:
      "Namaste Karigar Couture, I would like to enquire about a bespoke Kurta Set.",
  },
  {
    id: "premium-shirts",
    index: "०५",
    name: "Premium Shirts",
    hindiName: "प्रीमियम शर्ट्स",
    description:
      "Single-needle 22-stitches-per-inch dress shirts with split yokes, mother-of-pearl shanks, and hand-turned cuffs. Engineered for zero-pull comfort under tailored jackets.",
    fabric: "Two-Ply Giza Cotton • Mother-of-Pearl Buttons",
    image: "/images/collection-shirts.jpg",
    alt: "Karigar Couture ivory Egyptian Giza cotton bespoke dress shirt",
    whatsappText:
      "Namaste Karigar Couture, I would like to enquire about bespoke Premium Shirts.",
  },
  {
    id: "tailored-trousers",
    index: "०६",
    name: "Tailored Trousers",
    hindiName: "टेलर्ड ट्राउज़र्स",
    description:
      "High-waisted double-pleated trousers with side-tab adjusters, hand-pick-stitched seams, and a clean full-drape break. Built to balance every jacket and kurta silhouette.",
    fabric: "Super 140s Worsted Merino • Cupro Knee Lining",
    image: "/images/collection-trousers.jpg",
    alt: "Karigar Couture charcoal worsted-wool double-pleated Tailored Trousers",
    whatsappText:
      "Namaste Karigar Couture, I would like to enquire about bespoke Tailored Trousers.",
  },
];

// --- Source: src/data/occasions.ts ---
export interface OccasionLook {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  story: string;
  garments: string[];
  fabricNote: string;
  image: string;
  alt: string;
  accentTone: string;
}

export const OCCASIONS: OccasionLook[] = [
  {
    id: "dulha",
    index: "०१",
    title: "Dulha",
    subtitle: "The Groom",
    story: "Walk into your own wedding like royalty.",
    garments: [
      "Ivory Raw-Silk Sherwani",
      "Hand-Draped Zardozi Stole",
      "Tailored Silk Churidar",
      "Antique-Gold Safa",
    ],
    fabricNote: "Banarasi Katan Silk • Hand-Embroidered Dabka & Resham",
    image: "/images/collection-sherwani.jpg",
    alt: "Karigar Couture Dulha groom ivory embroidered raw-silk sherwani look",
    accentTone: "from-maroon/90 via-charcoal/55 to-charcoal/25",
  },
  {
    id: "baraati",
    index: "०२",
    title: "Baraati",
    subtitle: "Groom's Party",
    story: "Brotherhood dressed in celebratory heritage.",
    garments: [
      "Embroidered Bandi Jacket",
      "Chanderi Silk Kurta",
      "Tapered Straight Pajama",
      "Brass Button Pocket Square",
    ],
    fabricNote: "Handloom Chanderi • Tonal Floral Threadwork",
    image: "/images/occasion-baraati.jpg",
    alt: "Karigar Couture Baraati embroidered silk bandi and kurta ensemble",
    accentTone: "from-teal-deep/90 via-charcoal/55 to-charcoal/25",
  },
  {
    id: "sangeet-night",
    index: "०३",
    title: "Sangeet Night",
    subtitle: "Music & Revelry",
    story: "Fluid tailoring cut to move until dawn.",
    garments: [
      "Asymmetric Draped Kurta",
      "Mirror-Trimmed Achkan Vest",
      "Pleated Dhoti Trouser",
      "Hand-Finished Mojari",
    ],
    fabricNote: "Midnight Georgette Silk • Subtle Antique Mirror & Tilla",
    image: "/images/occasion-sangeet.jpg",
    alt: "Karigar Couture Sangeet Night draped festive achkan and kurta look",
    accentTone: "from-maroon-deep/90 via-charcoal/55 to-charcoal/25",
  },
  {
    id: "cocktail-reception",
    index: "०४",
    title: "Cocktail & Reception",
    subtitle: "Black-Tie Evening",
    story: "Razor-sharp Indo-western poise after sundown.",
    garments: [
      "Midnight Jacquard Bandhgala",
      "Giza Cotton Concealed Shirt",
      "Double-Pleated Wool Trouser",
      "Four-Hole Horn Cufflinks",
    ],
    fabricNote: "Italian Jacquard Wool-Silk • Hand-Piped Zari Lapel",
    image: "/images/collection-indowestern.jpg",
    alt: "Karigar Couture Cocktail and Reception midnight-teal bandhgala suit",
    accentTone: "from-teal/90 via-charcoal/55 to-charcoal/25",
  },
  {
    id: "festive-family",
    index: "०५",
    title: "Festive & Family Functions",
    subtitle: "Puja & Celebrations",
    story: "Quiet luxury woven for generations together.",
    garments: [
      "Deep Maroon Silk Kurta",
      "Four-Hole Gold Placket",
      "Aligarhi Tailored Trouser",
      "Woven Pashmina Shawl",
    ],
    fabricNote: "Pure Mulberry Silk-Linen • Hand-Turned Mandarin Collar",
    image: "/images/collection-kurta.jpg",
    alt: "Karigar Couture Festive deep maroon silk kurta with gold buttons",
    accentTone: "from-maroon/90 via-charcoal/55 to-charcoal/25",
  },
  {
    id: "boardroom-indian",
    index: "०६",
    title: "Boardroom Indian",
    subtitle: "Modern Leadership",
    story: "Command the room without saying a word.",
    garments: [
      "Structured Linen Safari Jacket",
      "Two-Ply Giza Dress Shirt",
      "Super 140s Worsted Trouser",
      "Horn Side-Tab Finish",
    ],
    fabricNote: "Irish Linen-Wool & Merino • Single-Needle Tailoring",
    image: "/images/collection-safari.jpg",
    alt: "Karigar Couture Boardroom Indian charcoal-olive bespoke safari suit",
    accentTone: "from-charcoal/95 via-charcoal/55 to-charcoal/25",
  },
];

// --- Source: src/data/configurator.ts ---
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

// --- Source: src/data/craft.ts ---
export interface CraftStep {
  id: string;
  number: string;
  title: string;
  hindiLabel: string;
  transliteration: string;
  description: string;
  craftDetail: string;
  image: string;
  alt: string;
}

export interface CraftStat {
  id: string;
  /** Editable numeric target for animated count-up (omit for text-only badges) */
  numericValue?: number;
  suffix?: string;
  staticDisplay?: string;
  label: string;
  sublabel: string;
}

/**
 * Editable Craft Statistics — update numbers or labels here to reflect live atelier milestones.
 */
export const CRAFT_STATS: CraftStat[] = [
  {
    id: "years",
    numericValue: 10,
    suffix: "+",
    label: "Years of craft",
    sublabel: "Heritage Menswear Lineage",
  },
  {
    id: "garments",
    numericValue: 1000,
    suffix: "+",
    label: "Garments tailored",
    sublabel: "Bespoke Commissions Delivered",
  },
  {
    id: "bespoke",
    numericValue: 100,
    suffix: "%",
    label: "Made to measure",
    sublabel: "Individual Paper Patterns",
  },
  {
    id: "origin",
    staticDisplay: "Delhi-born",
    label: "Krishna Nagar Atelier",
    sublabel: "Mandir Marg · Est. Craft",
  },
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    id: "salah",
    number: "01",
    title: "Consultation & Design",
    hindiLabel: "सलाह",
    transliteration: "Salah",
    description:
      "Every garment begins as an unhurried dialogue in our Delhi salon—mapping your posture, ceremony lighting, and silhouette proportions onto bespoke sketches.",
    craftDetail: "Personal styling brief & moodboard curation",
    image: "/images/craft-consultation.jpg",
    alt: "Karigar Couture design consultation table with garment sketches and antique-gold trimmings",
  },
  {
    id: "kapda",
    number: "02",
    title: "Fabric Selection",
    hindiLabel: "कपड़ा",
    transliteration: "Kapda",
    description:
      "Handpicked Banarasi raw silks, European linens, deep velvets, and jacquards are draped against natural light to verify weight, breathability, and tonal richness.",
    craftDetail: "Archival handloom & Italian worsted library",
    image: "/images/craft-fabric.jpg",
    alt: "Bolts of antique raw silk, velvet, and jacquard textiles in warm studio light",
  },
  {
    id: "naap",
    number: "03",
    title: "Precision Measurement",
    hindiLabel: "नाप",
    transliteration: "Naap",
    description:
      "Over twenty-four anatomical checkpoints capture shoulder slope, chest stance, and natural arm pitch so the finished garment moves effortlessly without pull.",
    craftDetail: "24-point individual paper pattern drafting",
    image: "/images/craft-measurement.jpg",
    alt: "Master tailor taking precision shoulder measurements with brass-tipped measuring tape",
  },
  {
    id: "katai-silai",
    number: "04",
    title: "Cutting & Stitching",
    hindiLabel: "कटाई-सिलाई",
    transliteration: "Katai-Silai",
    description:
      "Tailor's chalk traces each bespoke pattern by hand before heavy shears cut the cloth and master karigars baste canvas chest pieces into sculptural form.",
    craftDetail: "Hand-padded canvas & single-needle construction",
    image: "/images/craft-cutting.jpg",
    alt: "Tailor cutting dark silk with brass shears and chalk marks on bespoke atelier table",
  },
  {
    id: "kadhai",
    number: "05",
    title: "Hand Embroidery & Finishing",
    hindiLabel: "कढ़ाई",
    transliteration: "Kadhai",
    description:
      "Stretched across wooden adda frames, artisans stitch zardozi, dabka, resham, and four-hole horn buttons using fine needles guided by a single unbroken thread.",
    craftDetail: "Adda handwork · 40–180 artisan hours per piece",
    image: "/images/craft-embroidery.jpg",
    alt: "Close-up of Indian artisan hands stitching antique-gold zardozi embroidery on silk",
  },
  {
    id: "tayyari",
    number: "06",
    title: "Final Fitting & Delivery",
    hindiLabel: "तैयारी",
    transliteration: "Tayyari",
    description:
      "During your final fitting, every cuff, drape, and hem is steamed and calibrated to millimetre precision before presentation in breathable muslin garment covers.",
    craftDetail: "Final posture calibration & signature garment bag",
    image: "/images/craft-fitting.jpg",
    alt: "Finished bespoke ivory sherwani inspected on atelier form before final fitting",
  },
];

// --- Source: src/data/lookbook.ts ---
export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  frame: "arch" | "rect";
  aspectClass: string;
  column: 0 | 1 | 2;
  image: string;
  alt: string;
}

export interface ClientStory {
  id: string;
  quote: string;
  clientName: string;
  occasion: string;
  garment: string;
  city: string;
}

export interface InstagramTile {
  id: string;
  image: string;
  alt: string;
  caption: string;
}

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: "lb-1",
    title: "The Ivory Maharaja Sherwani",
    category: "Dulha · Raw Silk & Zardozi",
    frame: "arch",
    aspectClass: "aspect-[3/4]",
    column: 0,
    image: "/images/hero-sherwani.jpg",
    alt: "Ivory raw-silk sherwani with antique-gold embroidery and maroon shawl",
  },
  {
    id: "lb-2",
    title: "Evening Jacquard Bandhgala",
    category: "Cocktail · Midnight Teal",
    frame: "rect",
    aspectClass: "aspect-[4/5]",
    column: 1,
    image: "/images/hero-indowestern.jpg",
    alt: "Midnight-teal Indo-western bandhgala suit with zari piping",
  },
  {
    id: "lb-3",
    title: "Baraat Emerald Bandi",
    category: "Baraati · Chanderi Silk",
    frame: "arch",
    aspectClass: "aspect-[3/4]",
    column: 2,
    image: "/images/occasion-baraati.jpg",
    alt: "Emerald-teal embroidered silk bandi waistcoat over ivory kurta",
  },
  {
    id: "lb-4",
    title: "Tailor's Brass Shears Ritual",
    category: "Craft · Katai-Silai",
    frame: "rect",
    aspectClass: "aspect-[4/3]",
    column: 0,
    image: "/images/craft-cutting.jpg",
    alt: "Master tailor cutting dark raw silk with vintage brass shears",
  },
  {
    id: "lb-5",
    title: "Sangeet Draped Achkan",
    category: "Sangeet Night · Charcoal Silk",
    frame: "arch",
    aspectClass: "aspect-[3/4]",
    column: 1,
    image: "/images/occasion-sangeet.jpg",
    alt: "Charcoal-black asymmetric draped silk achkan jacket with gold collar work",
  },
  {
    id: "lb-6",
    title: "Boardroom Irish Linen Safari",
    category: "Formal · Linen-Wool",
    frame: "rect",
    aspectClass: "aspect-[3/4]",
    column: 2,
    image: "/images/collection-safari.jpg",
    alt: "Charcoal-olive bespoke safari suit jacket with horn buttons",
  },
  {
    id: "lb-7",
    title: "Two-Ply Giza Cotton Poise",
    category: "Bespoke Shirting · Ivory",
    frame: "rect",
    aspectClass: "aspect-[4/5]",
    column: 0,
    image: "/images/collection-shirts.jpg",
    alt: "Ivory Egyptian Giza cotton dress shirt with mother-of-pearl buttons",
  },
  {
    id: "lb-8",
    title: "Adda Zardozi Detail",
    category: "Kadhai · Handwork",
    frame: "arch",
    aspectClass: "aspect-[4/3]",
    column: 1,
    image: "/images/craft-embroidery.jpg",
    alt: "Close-up of antique-gold zardozi embroidery on raw silk",
  },
  {
    id: "lb-9",
    title: "Pleated Worsted Drape",
    category: "Tailored Trousers · Super 140s",
    frame: "rect",
    aspectClass: "aspect-[3/4]",
    column: 2,
    image: "/images/collection-trousers.jpg",
    alt: "Charcoal worsted-wool double-pleated tailored trousers",
  },
  {
    id: "lb-10",
    title: "Maroon Silk Kurta Placket",
    category: "Festive · Four-Hole Gold Buttons",
    frame: "arch",
    aspectClass: "aspect-[3/4]",
    column: 1,
    image: "/images/hero-kurta.jpg",
    alt: "Deep maroon silk kurta placket with four-hole antique-gold horn buttons",
  },
];

/**
 * Sample Client Testimonials — replace with verified client quotes & names.
 */
export const SAMPLE_CLIENT_STORIES: ClientStory[] = [
  {
    id: "story-1",
    quote:
      "My wedding sherwani felt weightless from the morning pheras to midnight portraits. Anish and Rohit understood exact shoulder poise on the very first basted fitting.",
    clientName: "Raghavendra Singhania",
    occasion: "Dulha · Winter Wedding",
    garment: "Ivory Raw-Silk Sherwani",
    city: "New Delhi",
  },
  {
    id: "story-2",
    quote:
      "We commissioned matching bandis and kurtas for seven baraatis. Every single collar sat razor-clean without stiffness—pure Delhi karigari.",
    clientName: "Kabir & Dev Malhotra",
    occasion: "Baraati · Destination Udaipur",
    garment: "Chanderi Bandi & Kurta Set",
    city: "South Delhi",
  },
  {
    id: "story-3",
    quote:
      "The midnight-teal Indo-western bandhgala turned heads across the entire reception. The piping and horn button details look even richer in person.",
    clientName: "Siddharth Kapoor",
    occasion: "Cocktail & Reception",
    garment: "Midnight Jacquard Indo-Western",
    city: "Gurugram",
  },
  {
    id: "story-4",
    quote:
      "From bespoke linen safaris for board meetings to festive silk kurtas, Karigar Couture has replaced every off-the-rack suit in my wardrobe.",
    clientName: "Vikramaditya Khanna",
    occasion: "Boardroom & Festive Wardrobe",
    garment: "Irish Linen Safari & Shirts",
    city: "East Delhi",
  },
];

export const INSTAGRAM_TILES: InstagramTile[] = [
  {
    id: "ig-1",
    image: "/images/hero-sherwani.jpg",
    alt: "Karigar Couture ivory wedding sherwani look on Instagram",
    caption: "Dulha Archive · Ivory & Zari",
  },
  {
    id: "ig-2",
    image: "/images/occasion-baraati.jpg",
    alt: "Karigar Couture emerald bandi waistcoat on Instagram",
    caption: "Baraati Stories",
  },
  {
    id: "ig-3",
    image: "/images/craft-consultation.jpg",
    alt: "Karigar Couture atelier sketch table on Instagram",
    caption: "Inside Krishna Nagar Atelier",
  },
  {
    id: "ig-4",
    image: "/images/occasion-sangeet.jpg",
    alt: "Karigar Couture charcoal Sangeet achkan on Instagram",
    caption: "After-Hours Achkan",
  },
  {
    id: "ig-5",
    image: "/images/craft-fabric.jpg",
    alt: "Banarasi silk and velvet textile bolts on Instagram",
    caption: "Textiles of Heritage",
  },
  {
    id: "ig-6",
    image: "/images/collection-safari.jpg",
    alt: "Karigar Couture tailored safari jacket on Instagram",
    caption: "Boardroom Indian",
  },
];

export const ATELIER_CONTACT = {
  address: "F-6/9, Mandir Marg, Krishna Nagar, Delhi 110051",
  instagramHandle: "@karigar.couture",
  instagramUrl: "https://www.instagram.com/karigar.couture/",
  phones: [
    { label: "Anish", display: "88004 55896", href: "tel:+918800455896" },
    { label: "Rohit", display: "75039 76323", href: "tel:+917503976323" },
    { label: "Shop", display: "85957 76323", href: "tel:+918595776323" },
  ],
  whatsappNumber: "918595776323",
  /** Placeholder working hours — update to match exact salon timings */
  hours: [
    { days: "Tuesday – Sunday", time: "11:00 AM – 8:30 PM" },
    { days: "Monday", time: "By Prior Appointment" },
  ],
} as const;
