import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { removeBackground } from '@imgly/background-removal-node';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'looks');
const RAW_DIR = path.join(ROOT, 'scripts', '.tmp_raw_cutouts');

const LOOK_SOURCES = [
  { out: 'look-01.png', src: 'public/images/collection-sherwani.webp', name: 'Dulha Sherwani' },
  { out: 'look-02.png', src: 'public/images/occasion-baraati.webp', name: 'Baraati Bandhgala' },
  { out: 'look-03.png', src: 'public/images/collection-indowestern.webp', name: 'Sangeet Indo-Western' },
  { out: 'look-04.png', src: 'public/images/occasion-sangeet.webp', name: 'Cocktail Velvet Jacket' },
  { out: 'look-05.png', src: 'public/images/collection-safari.webp', name: 'Safari Suit' },
  { out: 'look-06.png', src: 'public/images/collection-kurta.webp', name: 'Festive Kurta Set' },
  { out: 'look-07.png', src: 'public/images/collection-nehru.webp', name: 'Boardroom Nehru Jacket' },
  { out: 'look-08.png', src: 'public/images/collection-shirts.webp', name: 'Classic Shirt & Trousers' },
];

const PYTHON_POSTPROCESS = `
import os, sys
from PIL import Image, ImageFilter

raw_dir = sys.argv[1]
out_dir = sys.argv[2]

CANVAS_W, CANVAS_H = 768, 1360
TARGET_H, MAX_W = 1230, 710
BASELINE_BOTTOM = 1312

for fname in sorted(os.listdir(raw_dir)):
    if not fname.endswith('.png'):
        continue
    img = Image.open(os.path.join(raw_dir, fname)).convert('RGBA')
    r, g, b, a = img.split()

    # 1) Erode alpha by 1px (MinFilter 3) to strip studio backdrop halo, then 1.2px Gaussian feather
    a_eroded = a.filter(ImageFilter.MinFilter(3))
    a_feathered = a_eroded.filter(ImageFilter.GaussianBlur(radius=1.1))
    # Keep core interior solid while preserving soft 1-2px edge
    a_clean = Image.eval(a_feathered, lambda v: 0 if v < 14 else (255 if v > 242 else v))

    cleaned = Image.merge('RGBA', (r, g, b, a_clean))
    bbox = a_clean.getbbox()
    if bbox:
        cleaned = cleaned.crop(bbox)

    cw, ch = cleaned.size
    scale = min(TARGET_H / ch, MAX_W / cw)
    rw = max(1, round(cw * scale))
    rh = max(1, round(ch * scale))
    resized = cleaned.resize((rw, rh), Image.Resampling.LANCZOS)

    canvas = Image.new('RGBA', (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    left = (CANVAS_W - rw) // 2
    top = max(20, BASELINE_BOTTOM - rh)
    canvas.paste(resized, (left, top), resized)

    out_path = os.path.join(out_dir, os.path.splitext(fname)[0] + '.webp')
    canvas = canvas.resize((640, 1133), Image.Resampling.LANCZOS)
    canvas.save(out_path, 'WEBP', quality=84, method=6)
    print(f'Post-processed {os.path.basename(out_path)}: {rw}x{rh} baseline={top + rh}')
`;

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(RAW_DIR, { recursive: true });

  // Delete old silhouette files
  for (const existing of fs.readdirSync(OUT_DIR)) {
    if (existing.endsWith('.png') || existing.endsWith('.webp')) {
      fs.unlinkSync(path.join(OUT_DIR, existing));
    }
  }
  console.log('Deleted old silhouettes in /public/looks.');

  for (const item of LOOK_SOURCES) {
    const srcPath = path.join(ROOT, item.src);
    if (!fs.existsSync(srcPath)) {
      console.error(`MISSING source image: ${srcPath}`);
      continue;
    }

    console.log(`Removing background for ${item.out} (${item.name})...`);
    const fileUrl = pathToFileURL(srcPath).href;
    const blob = await removeBackground(fileUrl, {
      model: 'medium',
      output: { format: 'image/png', quality: 1 },
    });

    const buf = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync(path.join(RAW_DIR, item.out), buf);
  }

  execFileSync('python', ['-c', PYTHON_POSTPROCESS, RAW_DIR, OUT_DIR], {
    stdio: 'inherit',
  });

  fs.rmSync(RAW_DIR, { recursive: true, force: true });
  console.log('ALL_CUTOUTS_COMPLETE');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
