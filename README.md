# Karigar Couture (कारीगर Couture)

> **Creating Stylish Indian Outfits**  
> Bespoke Menswear Atelier — Sherwanis, Indo-Western Suits, Safari Suits, Kurtas, Shirts & Trousers  
> **Address:** F-6/9, Mandir Marg, Krishna Nagar, Delhi 110051  
> **Instagram:** [@karigar.couture](https://instagram.com/karigar.couture)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **3D Hero ("The Queue of Karigars"):** React Three Fiber (`@react-three/fiber`), `@react-three/drei`, `@react-three/postprocessing`, custom GLSL alpha-weighted Depth-of-Field `ShaderMaterial`
- **Styling & Typography:** Tailwind CSS v4, `Cormorant Garamond`, `Jost`, `Tiro Devanagari Hindi`
- **Motion & Smooth Scroll:** Framer Motion, GSAP (`ScrollTrigger`), Lenis

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Lint & verify production build
npm run lint
npm run build

# 4. Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Swapping Photos

### 1. 3D Hero Runway Looks (`/public/looks/`)
The 3D queue renders 8 transparent-background PNG/WebP cutouts (`look-01.png` through `look-08.png`):
- Export each model on a **transparent alpha background** (recommended `768×1360` or `1024×1800`, ~9:16 portrait).
- Overwrite `public/looks/look-01.png` … `public/looks/look-08.png` (or update paths in `src/data/karigarData.ts`).

### 2. Collections, Occasions, Craft & Lookbook (`/public/images/`)
Replace any `.jpg` / `.webp` file inside `public/images/` while preserving the filename, or update the image paths in `src/data/karigarData.ts`.

---

## Editing Content (`src/data/karigarData.ts`)

All copy, looks, pieces, hotspots, collections, occasions, configurator options, craft timeline steps, sample testimonials, Instagram tiles, and atelier contact details live in **one typed file**:

```
src/data/karigarData.ts
```

- `looks` — The 8 3D Hero looks, Hindi names, fabric lines, accent colors, lockstep `pieces[]`, and circular loupe `hotspots[]`.
- `COLLECTIONS` — The 6 garments in the pinned horizontal Collections gallery.
- `OCCASIONS` — The accordion panels for *Dress for the Occasion*.
- `CONFIG_GARMENTS`, `CONFIG_FABRICS`, `CONFIG_COLORS`, `CONFIG_DETAILING` — Steps for the *Design Your Look* WhatsApp configurator.
- `CRAFT_STATS` & `CRAFT_STEPS` — Scroll timeline stages connected by the continuous *Ek Dhaaga* golden thread.
- `LOOKBOOK_ITEMS`, `SAMPLE_CLIENT_STORIES`, `INSTAGRAM_TILES`, `ATELIER_CONTACT` — Lookbook, sample testimonials, Instagram strip, and Krishna Nagar salon contact & tap-to-call numbers.

---

## Accessibility, Performance & SEO

- **Reduced Motion:** Honours `prefers-reduced-motion: reduce` (switches the 3D queue to a clean crossfade and disables ambient animations).
- **Keyboard Navigation:** High-contrast `#DEC078` `:focus-visible` outlines, plus `ArrowLeft` / `ArrowRight` support in the 3D Hero.
- **Performance:** DPR capped (`2` desktop, `1.5` mobile), `IntersectionObserver` pauses 3D rendering off-screen, post-processing disabled on mobile/low-power devices, and texture preloading integrated into the 4-hole button preloader.
- **SEO:** Full OpenGraph metadata (`src/app/opengraph-image.tsx`), SVG/ICO favicon (`src/app/icon.svg`, `src/app/favicon.ico`), and `LocalBusiness` JSON-LD in `src/app/layout.tsx`.
