# Karigar Couture — 3D Look Textures (`/public/looks`)

This directory stores the 8 transparent-background model PNG/WebP/KTX2 textures used by **The Queue of Karigars** 3D Hero Section (`src/components/hero3d/QueueScene.tsx` & `LookPlane.tsx`).

## Swapping Photos
1. Export each studio-cutout model on a **transparent background** (`PNG` with alpha channel, `WebP`, or `KTX2`) at an aspect ratio of roughly `9:16` (recommended `768×1360` or `1024×1800` px).
2. Name the files sequentially:
   - `look-01.png` — Dulha Sherwani
   - `look-02.png` — Baraati Bandhgala
   - `look-03.png` — Sangeet Indo-Western
   - `look-04.png` — Cocktail Velvet Jacket
   - `look-05.png` — Safari Suit
   - `look-06.png` — Festive Kurta Set
   - `look-07.png` — Boardroom Nehru Jacket
   - `look-08.png` — Classic Shirt & Trousers
3. Place them in `public/looks/` (overwriting the existing files) or update the `image` paths in `src/data/looks.ts`.

## Editing Looks, Pieces & Hotspots
Open `src/data/looks.ts` and edit the `looks` array:
- `name` & `hindiName`: Displayed in the left HUD with mask-reveal animation.
- `accentColor`: Shifts the background radial atelier tint when the look steps forward.
- `pieces[]`: Rendered in the bottom infinite lockstep rail with WhatsApp `+ Enquire` links.
- `hotspots[]`: Normalized `x` / `y` percentages (`0–100`) for the circular fabric loupe dots on the active foreground silhouette.
