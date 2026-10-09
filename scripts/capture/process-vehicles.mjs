import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { SITE } from './env.mjs';
const require = createRequire(`${SITE}/package.json`);
const sharp = require('sharp');
const cat = JSON.parse(readFileSync('catalog.json', 'utf8'));
mkdirSync(`${SITE}/public/media/vehicles/sm`, { recursive: true });
let big = 0, sm = 0; const dims = {};
for (const v of cat) {
  const t = await sharp(`renders/all2/${v.preset}.png`).trim({ threshold: 4 }).toBuffer({ resolveWithObject: true });
  const pad = Math.round(Math.max(t.info.width, t.info.height) * 0.02);
  const base = sharp(t.data).extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const b = await base.clone().resize({ width: 960, height: 640, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, alphaQuality: 92, effort: 6 }).toBuffer({ resolveWithObject: true });
  writeFileSync(`${SITE}/public/media/vehicles/${v.preset}.webp`, b.data); big += b.data.length; dims[v.preset] = [b.info.width, b.info.height];
  const s = await base.clone().resize({ width: 320, height: 200, fit: 'inside' }).webp({ quality: 76, alphaQuality: 88, effort: 6 }).toBuffer();
  writeFileSync(`${SITE}/public/media/vehicles/sm/${v.preset}.webp`, s); sm += s.length;
}
writeFileSync('dims.json', JSON.stringify(dims));
console.log('big', (big / 1048576).toFixed(2), 'MB; sm', (sm / 1048576).toFixed(2), 'MB');
