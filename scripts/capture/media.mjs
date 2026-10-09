// Turns the raw captures (scenes/, clips/, action/, bld/, ui/) into app/media/*.jpg
// and the hero video + poster into public/media/hero/. Run after the capture scripts.
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { FFMPEG, SITE } from './env.mjs';
const require = createRequire(`${SITE}/package.json`);
const sharp = require('sharp');

mkdirSync(`${SITE}/app/media`, { recursive: true });
const SCENES = {
  'porto-reale': 'scenes/pr-aerial.png', 'porto': 'scenes/harbor-aerial.png',
  'valdoria': 'scenes/valdoria-aerial.png', 'val-chiaro': 'scenes/masseria-aerial.png',
  'santa-cesarea': 'scenes/santa-aerial.png', 'porto-badisco': 'scenes/badisco-aerial.png', 'mugello': 'scenes/mugello-aerial.png',
  'aeroporto': 'scenes/airport-d.png', 'isola': 'scenes/island-high.png',
  'mugello-via': 'clips/mugello-1500.png', 'costa-moto': 'clips/coastbc-5000.png', 'costa-curva': 'clips/coastcb-10000.png',
  'porto-reale-strada': 'scenes/pr-street.png', 'valdoria-strada': 'scenes/valdoria-street.png',
  'polizia': 'action/police-4.png', 'attico': 'bld/metropolis-house-tower-roof.png',
};
// In-game panels, cropped to the panel itself (1920×1080 sources), in both languages (ui.mjs it / en).
const CROPS = {
  menu: ['menu', { left: 300, top: 60, width: 1320, height: 960 }],
  workshop: ['workshop', { left: 330, top: 96, width: 1260, height: 940 }],
  championships: ['championships', { left: 700, top: 262, width: 520, height: 640 }],
  settings: ['settings', { left: 570, top: 40, width: 780, height: 1000 }],
};
mkdirSync(`${SITE}/app/media/ui`, { recursive: true });
let n = 0;
for (const [name, src] of Object.entries(SCENES)) {
  if (!existsSync(src)) { console.log('missing', src); continue; }
  await sharp(src).jpeg({ quality: 86, mozjpeg: true }).toFile(`${SITE}/app/media/${name}.jpg`); n++;
}
for (const lang of ['it', 'en']) {
  for (const [name, [shot, box]] of Object.entries(CROPS)) {
    const src = `ui/${lang}-${shot}.png`;
    if (!existsSync(src)) { console.log('missing', src); continue; }
    await sharp(src).extract(box).jpeg({ quality: 88, mozjpeg: true }).toFile(`${SITE}/app/media/ui/${lang}-${name}.jpg`); n++;
  }
}
console.log('app/media', n);

// Hero: the coastal bike race clip (race-video.mjs coastbc); poster = frame at 1.6 s,
// where HeroVideo starts its loop.
if (existsSync('clips/coastbc.mp4')) {
  mkdirSync(`${SITE}/public/media/hero`, { recursive: true });
  copyFileSync('clips/coastbc.mp4', `${SITE}/public/media/hero/costa.mp4`);
  execFileSync(FFMPEG, ['-y', '-v', 'error', '-ss', '1.6', '-i', 'clips/coastbc.mp4', '-frames:v', '1', 'clips/coastbc-poster.png']);
  await sharp('clips/coastbc-poster.png').jpeg({ quality: 80, mozjpeg: true }).toFile(`${SITE}/public/media/hero/costa-poster.jpg`);
  console.log('hero ok');
}
