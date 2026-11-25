import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Jost,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingActions } from "@/components/ui/FloatingActions";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-hindi",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karigarcouture.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Karigar Couture (कारीगर Couture) | Creating Stylish Indian Outfits",
  description:
    "Delhi-based bespoke menswear atelier specialising in Sherwanis, Indo-western suits, Safari suits, Kurtas, Shirts and Trousers. F-6/9, Mandir Marg, Krishna Nagar, Delhi 110051.",
  keywords: [
    "Karigar Couture",
    "कारीगर Couture",
    "Bespoke Sherwani Delhi",
    "Indo-Western Suits Delhi",
    "Indian Menswear Atelier",
    "Safari Suits Krishna Nagar",
    "Custom Kurta Set Delhi",
    "Made to Measure Menswear Delhi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Karigar Couture (कारीगर Couture) | Creating Stylish Indian Outfits",
    description:
      "Bespoke Sherwanis, Indo-western suits, Safari suits, Kurtas, Shirts and Trousers crafted in Krishna Nagar, New Delhi.",
    type: "website",
    locale: "en_IN",
    siteName: "Karigar Couture",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karigar Couture | Creating Stylish Indian Outfits",
    description:
      "Delhi-based bespoke menswear atelier specialising in Sherwanis, Indo-western suits, Safari suits, Kurtas, Shirts and Trousers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ClothingStore"],
  name: "Karigar Couture",
  alternateName: "कारीगर Couture",
  description:
    "Creating Stylish Indian Outfits — Delhi-based bespoke menswear atelier specialising in Sherwanis, Indo-western suits, Safari suits, Kurtas, Shirts and Trousers.",
  url: SITE_URL,
  telephone: "+91-85957-76323",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "F-6/9, Mandir Marg, Krishna Nagar",
    addressLocality: "Delhi",
    addressRegion: "DL",
    postalCode: "110051",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-88004-55896",
      contactType: "atelier concierge",
      name: "Anish",
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-75039-76323",
      contactType: "atelier concierge",
      name: "Rohit",
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-85957-76323",
      contactType: "customer service",
      name: "Karigar Couture Shop",
      areaServed: "IN",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "20:30",
    },
  ],
  sameAs: ["https://www.instagram.com/karigar.couture/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${tiroHindi.variable} antialiased`}
    >
      <body className="min-h-screen bg-charcoal font-sans text-ivory selection:bg-gold selection:text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[150] focus:border focus:border-gold focus:bg-charcoal focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:uppercase focus:tracking-atelier focus:text-gold-light"
        >
          Skip to main content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
          }}
        />

        <SmoothScrollProvider>
          <GrainOverlay />
          <CustomCursor />
          <Preloader />
          <Navbar />
          {children}
          <FloatingActions />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
