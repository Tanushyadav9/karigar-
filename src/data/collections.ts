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
