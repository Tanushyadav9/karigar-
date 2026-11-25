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
