// Screenshots every section of the site's pages and reports horizontal overflow.
//   node site-check.mjs [width] [height] [tag] [path ...]
// Without paths it checks both home pages and the twelve preview pages. Paths may
// drop the leading slash (Git Bash rewrites "/it" into a Windows path).
import fs from 'node:fs';
import { chromium, CHROME, SITE_URL } from './env.mjs';

const [w = 1440, h = 900, tag = 'desk', ...given] = process.argv.slice(2);
const PATHS = given.length
  ? given.map((p) => '/' + p.replace(/^\/+/, ''))
  : ['/it', '/it/isola', '/it/attivita', '/it/concessionaria', '/it/officina', '/it/vita', '/it/come-si-gioca',
     '/en', '/en/island', '/en/activities', '/en/dealership', '/en/workshop', '/en/life', '/en/how-to-play'];
const base = SITE_URL.replace(/\/$/, '');
fs.mkdirSync('site', { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: CHROME, args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });

for (const p of PATHS) {
  const name = p.replace(/^\//, '').replaceAll('/', '-') || 'root';
  errors.length = 0;
  await page.goto(base + p, { waitUntil: 'networkidle', timeout: 180000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `site/${tag}-${name}-0.png` });
  // Scroll once so lazy images load, then show every revealed block.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
    document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in'));
  });
  await page.waitForTimeout(1200);
  const blocks = await page.$$('main > section, main > nav, footer');
  for (const [i, el] of blocks.entries()) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await el.screenshot({ path: `site/${tag}-${name}-${i + 1}.png` });
  }
  const report = await page.evaluate(() => {
    const wide = [...document.querySelectorAll('body *')]
      .filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && !e.closest('[hidden]'))
      .slice(0, 6)
      .map((e) => String(e.className || e.tagName));
    // Headings whose longest word does not fit their box.
    const clipped = [...document.querySelectorAll('h1, h2, h3, .pager__title')]
      .filter((e) => e.scrollWidth > e.clientWidth + 1)
      .map((e) => `${e.textContent.trim().slice(0, 24)} +${e.scrollWidth - e.clientWidth}px`);
    return { sw: document.documentElement.scrollWidth, iw: innerWidth, H: document.body.scrollHeight, wide, clipped };
  });
  console.log(p, JSON.stringify(report), errors.slice(0, 6));
}
await browser.close();
