# Karigar Couture — Assets & Content Guide

This guide explains how to replace placeholder images, update product/occasion catalogues, and edit contact details or atelier statistics.

---

## 1. Swapping Images (`/public/images/`)

Replace any file in `public/images/` while keeping the exact filename (recommended `.jpg` / `.webp`, portrait `3:4` for garments/lookbook, landscape `4:3` for craft timeline steps):

### Hero Section (`src/components/sections/HeroSection.tsx`)
- `hero-sherwani.jpg` — Primary tall mehrab arch (Sherwani)
- `hero-indowestern.jpg` — Secondary overlapping arch (Indo-Western)
- `hero-kurta.jpg` — Secondary overlapping arch (Kurta detail)

### Collections Gallery (`src/data/collections.ts`)
- `collection-sherwani.jpg`
- `collection-indowestern.jpg`
- `collection-safari.jpg`
- `collection-kurta.jpg`
- `collection-shirts.jpg`
- `collection-trousers.jpg`

### Dress for the Occasion (`src/data/occasions.ts`)
- `occasion-baraati.jpg`
- `occasion-sangeet.jpg`
*(Other occasions reuse `collection-*.jpg` or can be pointed to dedicated files.)*

### The Craft Timeline (`src/data/craft.ts`)
- `craft-consultation.jpg` — Step 01 (Salah)
- `craft-fabric.jpg` — Step 02 (Kapda)
- `craft-measurement.jpg` — Step 03 (Naap)
- `craft-cutting.jpg` — Step 04 (Katai-Silai)
- `craft-embroidery.jpg` — Step 05 (Kadhai)
- `craft-fitting.jpg` — Step 06 (Tayyari)

---

## 2. Editing Products, Occasions & Configurator

- **Collections**: Edit the `COLLECTIONS` array in `src/data/collections.ts` to add, remove, or reorder garments (`name`, `hindiName`, `description`, `fabric`, `image`, `whatsappText`).
- **Occasions**: Edit `OCCASIONS` in `src/data/occasions.ts` to update look stories, included garments, or images.
- **Design Your Look Configurator**: Edit garments, fabrics, colours, detailing, or occasion tags in `src/data/configurator.ts`.
- **Craft Timeline & Counters**: Update the 6 steps (`CRAFT_STEPS`) or milestone counters (`CRAFT_STATS`: `10+`, `1000+`, `100%`, `Delhi-born`) in `src/data/craft.ts`.
- **Lookbook & Sample Testimonials**: Edit `LOOKBOOK_ITEMS`, `SAMPLE_CLIENT_STORIES`, and `INSTAGRAM_TILES` in `src/data/lookbook.ts`.

---

## 3. Updating Contact Details, Hours & WhatsApp

- **Atelier Contact & Hours**: Edit `ATELIER_CONTACT` in `src/data/lookbook.ts` (address, phone links for Anish, Rohit, and Shop, `whatsappNumber`, Instagram handle/URL, and salon `hours`).
- **Collection WhatsApp Number**: Update `ATELIER_WHATSAPP_NUMBER` in `src/data/collections.ts` and `SHOP_WHATSAPP_NUMBER` in `src/components/sections/DesignYourLookSection.tsx` if the booking number changes.
- **SEO & Schema**: Update `SITE_URL` (`NEXT_PUBLIC_SITE_URL`) and `LOCAL_BUSINESS_JSON_LD` in `src/app/layout.tsx` before deploying to your custom domain.
