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
