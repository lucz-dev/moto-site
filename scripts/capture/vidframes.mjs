import { chromium, CHROME } from './env.mjs';
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const [f, ...times] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, executablePath: CHROME, args: ['--use-angle=d3d11','--enable-gpu','--ignore-gpu-blocklist','--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const html = f.replace('.mp4', '.html'); writeFileSync(html, `<style>body{margin:0;background:#f0f}</style><video id=v muted playsinline style="width:1920px;height:1080px;display:block" src="${f.split('/').pop()}"></video>`);
await page.goto(pathToFileURL(html).href);
await page.waitForFunction(() => document.getElementById('v').readyState >= 2);
for (const t of times) {
  await page.evaluate((t) => new Promise((r) => { const v = document.getElementById('v'); v.onseeked = () => r(); v.currentTime = +t; setTimeout(r, 4000); }), t);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${f.replace('.mp4', '')}-t${t}.png` });
}
await browser.close(); console.log('ok');
