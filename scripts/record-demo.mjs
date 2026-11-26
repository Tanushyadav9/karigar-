import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const VIDEO_DIR = path.join(ROOT, 'test-pack', 'video');
const FINAL_VIDEO = path.join(ROOT, 'karigar-desktop-demo.webm');
const PACK_VIDEO = path.join(ROOT, 'test-pack', 'karigar-desktop-demo.webm');
const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  fs.rmSync(VIDEO_DIR, { recursive: true, force: true });
  fs.mkdirSync(VIDEO_DIR, { recursive: true });
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: VIDEO_DIR, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();
  const start = Date.now();

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  // Trigger 3D WebGL stage and jump to Look 01
  console.log('1/3 Hero queue 8 looks...');
  await page.locator('#hero button[aria-label^="View "]').first().click({ force: true });
  await page.waitForTimeout(1600);

  for (let i = 1; i < 8; i++) {
    await page.mouse.move(960, 420);
    await page.mouse.down();
    await page.mouse.move(760, 420, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(1050);
  }
  await page.waitForTimeout(600);

  // 2. Scroll to Design Your Look & complete one full configurator run
  console.log('2/3 Configurator run...');
  await page.evaluate(() => document.querySelector('#design-your-look')?.scrollIntoView({ behavior: 'smooth' }));
  await page.waitForTimeout(1100);

  await page.locator('#design-your-look button', { hasText: 'Indo-Western' }).first().click({ force: true });
  await page.waitForTimeout(800);

  await page.locator('#design-your-look button', { hasText: '02' }).first().click({ force: true });
  await page.waitForTimeout(500);
  await page.locator('#design-your-look button', { hasText: 'Jacquard' }).first().click({ force: true });
  await page.waitForTimeout(800);

  await page.locator('#design-your-look button', { hasText: '03' }).first().click({ force: true });
  await page.waitForTimeout(500);
  await page.locator('#design-your-look button', { hasText: 'Midnight Teal' }).first().click({ force: true });
  await page.waitForTimeout(850);

  await page.locator('#design-your-look button', { hasText: '04' }).first().click({ force: true });
  await page.waitForTimeout(500);
  await page.locator('#design-your-look button', { hasText: 'Zardozi' }).first().click({ force: true });
  await page.waitForTimeout(800);

  await page.locator('#design-your-look button', { hasText: '05' }).first().click({ force: true });
  await page.waitForTimeout(1100);

  // 3. Scroll down to Contact / Visit the Atelier section
  console.log('3/3 Visit the Atelier...');
  await page.evaluate(() => document.querySelector('#visit-us')?.scrollIntoView({ behavior: 'smooth' }));
  await page.waitForTimeout(2000);
  await page.locator('#visit-us input[type="text"]').first().fill('Arjun Kapoor', { force: true });
  await page.waitForTimeout(500);
  await page.locator('#visit-us input[type="tel"]').first().fill('+91 98111 22334', { force: true });
  await page.waitForTimeout(1100);

  const videoPath = await page.video()?.path();
  await context.close();
  await browser.close();

  const elapsedSec = ((Date.now() - start) / 1000).toFixed(1);
  if (videoPath && fs.existsSync(videoPath)) {
    fs.copyFileSync(videoPath, FINAL_VIDEO);
    fs.copyFileSync(videoPath, PACK_VIDEO);
    fs.rmSync(VIDEO_DIR, { recursive: true, force: true });
    console.log(`VIDEO_RECORDED: ${FINAL_VIDEO} (${elapsedSec}s, ${Math.round(fs.statSync(FINAL_VIDEO).size / 1024)} KB)`);
  } else {
    throw new Error('Video file was not generated');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
