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
