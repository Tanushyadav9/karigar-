# Karigar Couture — Assets & Content Guide

This guide explains how to replace photographs, swap 3D hero cutouts, and edit all site content from the single typed data file.

---

## 1. Swapping Section Photography (`/public/images/`)

All section photography uses optimized `.webp` files in `public/images/`. Replace any file while keeping the exact filename (portrait `3:4` for garments/lookbook, landscape `4:3` for craft timeline steps):

### Collections Gallery (`COLLECTIONS` in `src/data/karigarData.ts`)
- `collection-sherwani.webp`
- `collection-indowestern.webp`
- `collection-safari.webp`
- `collection-kurta.webp`
- `collection-shirts.webp`
- `collection-trousers.webp`

### Dress for the Occasion (`OCCASIONS` in `src/data/karigarData.ts`)
- `occasion-baraati.webp`
- `occasion-sangeet.webp`
*(Other occasions reference `collection-*.webp`.)*

### The Craft Timeline (`CRAFT_STEPS` in `src/data/karigarData.ts`)
- `craft-consultation.webp` — Step 01 (Salah)
- `craft-fabric.webp` — Step 02 (Kapda)
- `craft-measurement.webp` — Step 03 (Naap)
- `craft-cutting.webp` — Step 04 (Katai-Silai)
- `craft-embroidery.webp` — Step 05 (Kadhai)
- `craft-fitting.webp` — Step 06 (Tayyari)

### Lookbook (`LOOKBOOK_ITEMS` in `src/data/karigarData.ts`)
Uses 10 distinct `.webp` images including `lookbook-kurta-drape.webp`, `lookbook-zardozi-placket.webp`, `lookbook-emerald-bandi.webp`, `lookbook-bandhgala-collar.webp`, and the collection/craft/occasion photos.

---

## 2. Editing All Content (`src/data/karigarData.ts`)

All site data lives in **one typed file**: `src/data/karigarData.ts`:
- **3D Hero Looks (`looks`)**: Edit `name`, `hindiName`, `image` (`/looks/look-01.png`–`look-08.png`), `fabricLine`, `accentColor`, `pieces[]`, and `hotspots[]`.
- **Collections (`COLLECTIONS`)**: Edit the 6 garments (`name`, `hindiName`, `description`, `fabric`, `image`, `whatsappText`).
- **Occasions (`OCCASIONS`)**: Edit look stories, included garments, or images.
- **Design Your Look Configurator**: Edit `CONFIG_GARMENTS`, `CONFIG_FABRICS`, `CONFIG_COLORS`, `CONFIG_DETAILING`, and `CONFIG_OCCASIONS`.
- **Craft Timeline & Counters**: Update `CRAFT_STEPS` and `CRAFT_STATS` (`10+`, `1000+`, `100%`, `Delhi-born`).
- **Lookbook, Sample Testimonials & Instagram**: Edit `LOOKBOOK_ITEMS`, `SAMPLE_CLIENT_STORIES`, and `INSTAGRAM_TILES`.
- **Atelier Contact & Hours**: Edit `ATELIER_CONTACT` (address, phone links for Anish, Rohit, and Shop, `whatsappNumber`, Instagram handle/URL, and salon `hours`).

---

## 3. SEO & Schema
Update `SITE_URL` (`NEXT_PUBLIC_SITE_URL`) and `LOCAL_BUSINESS_JSON_LD` in `src/app/layout.tsx` before deploying to your custom domain.
