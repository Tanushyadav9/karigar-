import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PACK_DIR = path.join(ROOT, 'test-pack');
const LOGS_DIR = path.join(PACK_DIR, 'logs');
const LH_DIR = path.join(PACK_DIR, 'lighthouse');
const HERO_DIR = path.join(PACK_DIR, 'hero-queue');
const INTERACT_DIR = path.join(PACK_DIR, 'interactions');
const SCROLL_DIR = path.join(PACK_DIR, 'scroll');

const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function waitForPreloader(page) {
  await page.waitForTimeout(3800);
  const skipBtn = page.getByRole('button', { name: /enter atelier/i });
  if (await skipBtn.isVisible().catch(() => false)) {
    await skipBtn.click().catch(() => {});
    await page.waitForTimeout(1000);
  }
}

async function main() {
  fs.rmSync(PACK_DIR, { recursive: true, force: true });
  [PACK_DIR, LOGS_DIR, LH_DIR, HERO_DIR, INTERACT_DIR, SCROLL_DIR].forEach(ensureDir);

  // 4a. Run npm run lint & npm run build and save logs
  console.log('Running npm run lint...');
  let lintOutput = '';
  try {
    lintOutput = execSync('npm run lint', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
  } catch (e) {
    lintOutput = (e.stdout || '') + '\n' + (e.stderr || '');
  }
  fs.writeFileSync(path.join(LOGS_DIR, 'lint.log'), lintOutput, 'utf8');

  console.log('Running npm run build...');
  let buildOutput = '';
  try {
    buildOutput = execSync('npm run build', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
  } catch (e) {
    buildOutput = (e.stdout || '') + '\n' + (e.stderr || '');
  }
  fs.writeFileSync(path.join(LOGS_DIR, 'build.log'), buildOutput, 'utf8');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const consoleLogs = [];
  const failedRequests = [];
  const summary = {
    scroll: {},
    heroQueue: {},
    interactions: {},
    consoleErrorCount: 0,
    failedRequestCount: 0,
  };

  const attachListeners = (page, label) => {
    page.on('console', (msg) => {
      const entry = `[${label}] [${msg.type()}] ${msg.text()}`;
      consoleLogs.push(entry);
      if (msg.type() === 'error') summary.consoleErrorCount++;
    });
    page.on('pageerror', (err) => {
      consoleLogs.push(`[${label}] [pageerror] ${err.message}`);
      summary.consoleErrorCount++;
    });
    page.on('requestfailed', (req) => {
      const entry = `[${label}] FAILED ${req.method()} ${req.url()} -> ${req.failure()?.errorText}`;
      failedRequests.push(entry);
      summary.failedRequestCount++;
    });
    page.on('response', (res) => {
      if (res.status() >= 400) {
        const entry = `[${label}] HTTP ${res.status()} ${res.url()}`;
        failedRequests.push(entry);
        summary.failedRequestCount++;
      }
    });
  };

  // (1) Scroll whole page in 80%-viewport steps at 390x844, 768x1024, 1440x900
  for (const vp of [
    { name: '390x844', width: 390, height: 844 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '1440x900', width: 1440, height: 900 },
  ]) {
    console.log(`Scrolling ${vp.name}...`);
    const outSub = path.join(SCROLL_DIR, vp.name);
    ensureDir(outSub);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    attachListeners(page, `scroll-${vp.name}`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await waitForPreloader(page);

    const stepPx = Math.round(vp.height * 0.8);
    const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    let y = 0;
    let step = 1;
    while (y < totalH) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(450);
      await page.screenshot({
        path: path.join(outSub, `step-${String(step).padStart(2, '0')}.png`),
      });
      y += stepPx;
      step++;
      if (step > 30) break;
    }
    summary.scroll[vp.name] = { steps: step - 1, totalHeight: totalH, horizontalOverflow: overflow };
    await context.close();
  }

  // (2) Hero queue: 8 drag screenshots + arrow-key + wheel tests (1440x900)
  {
    console.log('Testing hero queue drag, arrow keys, and wheel...');
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    attachListeners(page, 'hero-queue');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await waitForPreloader(page);

    const getCounter = async () => {
      const txt = await page.locator('#hero').innerText();
      const m = txt.match(/0\d\s*\/\s*0\d/);
      return m ? m[0] : 'unknown';
    };

    // Jump to 01 / 08 first via first dot
    const firstDot = page.locator('#hero button[aria-label^="View "]').first();
    await firstDot.click();
    await page.waitForTimeout(900);

    const dragCounters = [];
    for (let i = 1; i <= 8; i++) {
      await page.screenshot({ path: path.join(HERO_DIR, `drag-0${i}.png`) });
      dragCounters.push(await getCounter());
      if (i < 8) {
        await page.mouse.move(960, 420);
        await page.mouse.down();
        await page.mouse.move(760, 420, { steps: 12 });
        await page.mouse.up();
        await page.waitForTimeout(950);
      }
    }
    summary.heroQueue.dragCounters = dragCounters;

    // Arrow key test
    const beforeArrow = await getCounter();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(HERO_DIR, 'arrow-left.png') });
    const afterArrowLeft = await getCounter();

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(HERO_DIR, 'arrow-right.png') });
    const afterArrowRight = await getCounter();

    // Wheel test (horizontal deltaX)
    await page.mouse.move(960, 420);
    await page.mouse.wheel(-320, 0);
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(HERO_DIR, 'wheel-test.png') });
    const afterWheel = await getCounter();

    summary.heroQueue.arrowAndWheel = {
      beforeArrow,
      afterArrowLeft,
      afterArrowRight,
      afterWheel,
    };

    // (3a) Piece rail before/after
    await page.screenshot({ path: path.join(INTERACT_DIR, 'piece-rail-before.png') });
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'piece-rail-after.png') });

    // (3b) Hotspot loupe before/after
    await page.screenshot({ path: path.join(INTERACT_DIR, 'hotspot-loupe-before.png') });
    const dotCandidates = page.locator('#hero button[aria-label]');
    const dotCount = await dotCandidates.count();
    let loupeOpened = false;
    for (let d = 0; d < dotCount; d++) {
      const btn = dotCandidates.nth(d);
      const label = await btn.getAttribute('aria-label');
      if (label && !label.startsWith('View ')) {
        await btn.hover({ force: true, timeout: 4000 }).catch(() => {});
        await page.waitForTimeout(450);
        loupeOpened = true;
        break;
      }
    }
    await page.screenshot({ path: path.join(INTERACT_DIR, 'hotspot-loupe-after.png') });
    summary.interactions.hotspotLoupeOpened = loupeOpened;

    // (3c) Occasions accordion before/after
    const occasionsSec = page.locator('#occasions');
    await occasionsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'occasions-before.png') });
    const secondOccasion = occasionsSec.locator('button').nth(1);
    if (await secondOccasion.isVisible().catch(() => false)) {
      await secondOccasion.click({ force: true, timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(700);
    }
    await page.screenshot({ path: path.join(INTERACT_DIR, 'occasions-after.png') });

    // (3d) Configurator all steps + log final WhatsApp URL
    const configSec = page.locator('#design-your-look');
    await configSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'configurator-step-1.png') });

    for (let s = 2; s <= 5; s++) {
      const nextBtn = configSec.getByRole('button', { name: /next|continue/i }).first();
      if (await nextBtn.isVisible().catch(() => false)) {
        await nextBtn.click({ force: true, timeout: 5000 }).catch(() => {});
        await page.waitForTimeout(550);
      }
      await page.screenshot({ path: path.join(INTERACT_DIR, `configurator-step-${s}.png`) });
    }
    const waLink = configSec.locator('a[href*="wa.me"]').first();
    const waHref = (await waLink.count()) > 0 ? await waLink.getAttribute('href') : 'NOT_FOUND';
    fs.writeFileSync(path.join(LOGS_DIR, 'configurator-whatsapp.txt'), waHref || 'EMPTY', 'utf8');
    summary.interactions.configuratorWhatsAppUrl = waHref;

    // (3e) Lookbook lightbox before/after
    const lookbookSec = page.locator('#lookbook');
    await lookbookSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-before.png') });
    const firstLbCard = lookbookSec.locator('[data-cursor="view"]').first();
    if (await firstLbCard.isVisible().catch(() => false)) {
      await firstLbCard.click({ force: true, timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-after.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // (3f) Contact form before/after
    const visitSec = page.locator('#visit-us');
    await visitSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-before.png') });
    const nameInput = visitSec.locator('input[type="text"]').first();
    const phoneInput = visitSec.locator('input[type="tel"]').first();
    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill('Arjun Kapoor');
      if (await phoneInput.isVisible().catch(() => false)) {
        await phoneInput.fill('+91 98111 22334');
      }
      await page.waitForTimeout(350);
    }
    await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-after.png') });

    await context.close();
  }

  // (3g) Mobile menu before/after at 390x844
  {
    console.log('Testing mobile menu at 390x844...');
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    attachListeners(page, 'mobile-menu');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await waitForPreloader(page);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-before.png') });
    const menuBtn = page.locator('header button[aria-label*="menu" i]');
    if (await menuBtn.isVisible().catch(() => false)) {
      await menuBtn.click();
      await page.waitForTimeout(800);
    }
    await page.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-after.png') });
    await context.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(LOGS_DIR, 'console.log'), consoleLogs.join('\n'), 'utf8');
  fs.writeFileSync(path.join(LOGS_DIR, 'failed-requests.log'), failedRequests.join('\n'), 'utf8');

  // (4b) Run Lighthouse mobile & desktop JSON
  console.log('Running Lighthouse mobile...');
  try {
    execSync(
      `npx lighthouse ${BASE_URL} --output=json --output-path="${path.join(
        LH_DIR,
        'mobile.json'
      )}" --chrome-path="${CHROME_PATH}" --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo`,
      { cwd: ROOT, stdio: 'pipe' }
    );
  } catch (e) {
    console.warn('Lighthouse mobile warning:', e.message);
  }

  console.log('Running Lighthouse desktop...');
  try {
    execSync(
      `npx lighthouse ${BASE_URL} --preset=desktop --output=json --output-path="${path.join(
        LH_DIR,
        'desktop.json'
      )}" --chrome-path="${CHROME_PATH}" --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo`,
      { cwd: ROOT, stdio: 'pipe' }
    );
  } catch (e) {
    console.warn('Lighthouse desktop warning:', e.message);
  }

  // Extract Lighthouse scores if generated
  for (const kind of ['mobile', 'desktop']) {
    const lp = path.join(LH_DIR, `${kind}.json`);
    if (fs.existsSync(lp)) {
      try {
        const j = JSON.parse(fs.readFileSync(lp, 'utf8'));
        summary[`lighthouse_${kind}`] = {
          performance: Math.round((j.categories?.performance?.score ?? 0) * 100),
          accessibility: Math.round((j.categories?.accessibility?.score ?? 0) * 100),
          bestPractices: Math.round((j.categories?.['best-practices']?.score ?? 0) * 100),
          seo: Math.round((j.categories?.seo?.score ?? 0) * 100),
        };
      } catch {}
    }
  }

  fs.writeFileSync(path.join(LOGS_DIR, 'summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('TEST_PACK_DONE', JSON.stringify(summary));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
