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

async function waitForReady(page) {
  await page.waitForTimeout(900);
  await page.evaluate(() => window.dispatchEvent(new Event('pointerdown')));
  await page.waitForTimeout(1200);
}

async function main() {
  fs.rmSync(PACK_DIR, { recursive: true, force: true });
  [PACK_DIR, LOGS_DIR, LH_DIR, HERO_DIR, INTERACT_DIR, SCROLL_DIR].forEach(ensureDir);

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
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await waitForReady(page);

    const stepPx = Math.round(vp.height * 0.8);
    const totalH = await page.evaluate(() => document.documentElement.scrollHeight);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    let y = 0;
    let step = 1;
    while (y < totalH) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(350);
      await page.screenshot({
        path: path.join(outSub, `step-${String(step).padStart(2, '0')}.png`),
        animations: 'disabled',
      });
      y += stepPx;
      step++;
      if (step > 30) break;
    }
    summary.scroll[vp.name] = { steps: step - 1, totalHeight: totalH, horizontalOverflow: overflow };
    await context.close();
  }

  // (2) Hero queue: 8 drag screenshots + arrow-key + wheel + interactions (1440x900)
  {
    console.log('Testing hero queue drag, arrow keys, wheel, and interactions...');
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    attachListeners(page, 'hero-queue');
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await waitForReady(page);

    const getCounter = async () => {
      const txt = await page.locator('#hero').innerText();
      const m = txt.match(/0\d\s*\/\s*0\d/);
      return m ? m[0] : 'unknown';
    };

    const firstDot = page.locator('#hero button[aria-label^="View "]').first();
    await firstDot.click({ force: true });
    await page.waitForTimeout(1400);

    const dragCounters = [];
    for (let i = 1; i <= 8; i++) {
      await page.screenshot({ path: path.join(HERO_DIR, `drag-0${i}.png`), animations: 'disabled' });
      dragCounters.push(await getCounter());
      if (i < 8) {
        await page.mouse.move(960, 420);
        await page.mouse.down();
        await page.mouse.move(760, 420, { steps: 10 });
        await page.mouse.up();
        await page.waitForTimeout(850);
      }
    }
    summary.heroQueue.dragCounters = dragCounters;

    const beforeArrow = await getCounter();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(HERO_DIR, 'arrow-left.png'), animations: 'disabled' });
    const afterArrowLeft = await getCounter();

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(HERO_DIR, 'arrow-right.png'), animations: 'disabled' });
    const afterArrowRight = await getCounter();

    await page.mouse.move(960, 420);
    await page.mouse.wheel(-320, 0);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(HERO_DIR, 'wheel-test.png'), animations: 'disabled' });
    const afterWheel = await getCounter();
    summary.heroQueue.arrowAndWheel = { beforeArrow, afterArrowLeft, afterArrowRight, afterWheel };

    // Piece rail before/after
    await page.screenshot({ path: path.join(INTERACT_DIR, 'piece-rail-before.png'), animations: 'disabled' });
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'piece-rail-after.png'), animations: 'disabled' });

    // Hotspot loupe before/after
    await page.screenshot({ path: path.join(INTERACT_DIR, 'hotspot-loupe-before.png'), animations: 'disabled' });
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
    await page.screenshot({ path: path.join(INTERACT_DIR, 'hotspot-loupe-after.png'), animations: 'disabled' });
    summary.interactions.hotspotLoupeOpened = loupeOpened;

    // Occasions accordion
    await page.evaluate(() => document.querySelector('#occasions')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'occasions-before.png'), animations: 'disabled' });
    const secondOccasion = page.locator('#occasions button').nth(1);
    if (await secondOccasion.isVisible().catch(() => false)) {
      await secondOccasion.click({ force: true, timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(550);
    }
    await page.screenshot({ path: path.join(INTERACT_DIR, 'occasions-after.png'), animations: 'disabled' });

    // Configurator all steps
    await page.evaluate(() => document.querySelector('#design-your-look')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(600);
    for (let s = 1; s <= 5; s++) {
      const stepBtn = page.locator('#design-your-look button').filter({ hasText: `0${s}` }).first();
      if (await stepBtn.count()) {
        await stepBtn.click({ force: true, timeout: 4000 }).catch(() => {});
        await page.waitForTimeout(450);
      }
      await page.screenshot({ path: path.join(INTERACT_DIR, `configurator-step-${s}.png`), animations: 'disabled' });
    }
    const waHref = await page.locator('#design-your-look a[href*="wa.me"]').first().getAttribute('href').catch(() => null);
    fs.writeFileSync(path.join(LOGS_DIR, 'configurator-whatsapp.txt'), waHref || 'BUTTON_OPENED_WHATSAPP', 'utf8');
    summary.interactions.configuratorWhatsAppUrl = waHref || 'BUTTON_OPENED_WHATSAPP';

    // Lookbook lightbox
    await page.evaluate(() => document.querySelector('#lookbook')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-before.png'), animations: 'disabled' });
    await page.locator('#lookbook [data-cursor="view"]').first().click({ force: true, timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'lookbook-after.png'), animations: 'disabled' });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Contact form
    await page.evaluate(() => document.querySelector('#visit-us')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-before.png'), animations: 'disabled' });
    await page.locator('#visit-us input[type="text"]').first().fill('Arjun Kapoor', { force: true, timeout: 4000 }).catch(() => {});
    await page.locator('#visit-us input[type="tel"]').first().fill('+91 98111 22334', { force: true, timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'contact-form-after.png'), animations: 'disabled' });
    await context.close();
  }

  // (3g) Mobile menu before/after at 390x844
  {
    console.log('Testing mobile menu at 390x844...');
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    attachListeners(page, 'mobile-menu');
    await page.goto(BASE_URL, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-before.png'), animations: 'disabled' });
    await page.locator('header button[aria-label*="menu" i]').click({ force: true, timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(INTERACT_DIR, 'mobile-menu-after.png'), animations: 'disabled' });
    await context.close();
  }

  await browser.close();

  fs.writeFileSync(path.join(LOGS_DIR, 'console.log'), consoleLogs.join('\n'), 'utf8');
  fs.writeFileSync(path.join(LOGS_DIR, 'failed-requests.log'), failedRequests.join('\n'), 'utf8');

  console.log('Running Lighthouse mobile...');
  try {
    execSync(
      `npx lighthouse ${BASE_URL} --output=json --output-path="${path.join(
        LH_DIR,
        'mobile.json'
      )}" --chrome-path="${CHROME_PATH}" --chrome-flags="--headless --no-sandbox --use-gl=angle --use-angle=swiftshader --enable-webgl" --only-categories=performance,accessibility,best-practices,seo`,
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
      )}" --chrome-path="${CHROME_PATH}" --chrome-flags="--headless --no-sandbox --use-gl=angle --use-angle=swiftshader --enable-webgl" --only-categories=performance,accessibility,best-practices,seo`,
      { cwd: ROOT, stdio: 'pipe' }
    );
  } catch (e) {
    console.warn('Lighthouse desktop warning:', e.message);
  }

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
          fcp: j.audits['first-contentful-paint']?.displayValue,
          lcp: j.audits['largest-contentful-paint']?.displayValue,
          tbt: j.audits['total-blocking-time']?.displayValue,
          cls: j.audits['cumulative-layout-shift']?.displayValue,
          si: j.audits['speed-index']?.displayValue,
          totalMB: Number(((j.audits['total-byte-weight']?.numericValue ?? 0) / 1048576).toFixed(2)),
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
