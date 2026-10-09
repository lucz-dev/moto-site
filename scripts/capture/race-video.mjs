// Frame-exact race video: the game is paused and stepped by exactly 1/fps per frame,
// the chase camera is placed on that sim state, the frame is drawn and captured, and
// ffmpeg encodes a constant-rate H.264 MP4. Slower than real time, never stutters.
// The JPEG frames are kept in clips/<name>.mjpeg, so the MP4 can be re-encoded (encode.mjs).
// args: name place vehicle course kind rivals followId [chaseJson] [seconds] [fps] [leadIn]
import { createWriteStream, readFileSync } from 'node:fs';
import { encode } from './encode.mjs';
import { open, hideHud } from './lib.mjs';

const [name, place, vehicle, course, kind, rivals, followId, chaseJson = '{}', seconds = '11.5', fps = '60', leadIn = '0.6'] = process.argv.slice(2);
const SIM_HZ = 120;
const steps = SIM_HZ / +fps;
if (!Number.isInteger(steps)) throw new Error(`fps must divide ${SIM_HZ}`);

const { browser, page, errors } = await open({ width: 1920, height: 1080, init: [readFileSync('vclock.js', 'utf8')] });
await page.evaluate(() => GAME.setQuality('ultra', true));
await page.evaluate(({ place, vehicle }) => GAME.load({ map: 'island-empty', place, vehicle, seed: 11 }), { place, vehicle });
await page.addScriptTag({ content: readFileSync('chase.js', 'utf8') });
await hideHud(page);
await page.evaluate(() => GAME.pursuit?.({ enabled: false }));
console.log(await page.evaluate(({ course, kind, rivals }) => JSON.stringify(GAME.roadRace(course, { kind, rivals: +rivals })), { course, kind, rivals }));
for (let i = 0; i < 80; i++) { if ((await page.evaluate(() => GAME.roadRaceInfo()?.state)) === 'racing') break; await page.waitForTimeout(250); }

// From here the page clock is ours: every frame is exactly 1/fps of sim and client time.
const chase = Object.assign({ kind, id: +followId }, JSON.parse(chaseJson));
await page.evaluate((chase) => { GAME.pause(); __vclock.manual(true); window.__cam = __makeChase(chase); }, chase);
const frame = () => page.evaluate(({ steps, fps }) => { GAME.step(steps); __cam(1 / fps); __vclock.advance(1000 / fps); }, { steps, fps: +fps });
for (let i = 0; i < Math.round(+leadIn * +fps); i++) await frame();

const out = createWriteStream(`clips/${name}.mjpeg`);
const total = Math.round(+seconds * +fps);
const t0 = Date.now();
for (let i = 0; i < total; i++) {
  await frame();
  const jpg = await page.screenshot({ type: 'jpeg', quality: 95 });
  if (!out.write(jpg)) await new Promise((r) => out.once('drain', r));
  if (i % 60 === 0) console.log(`frame ${i}/${total}`, ((Date.now() - t0) / 1000).toFixed(0) + 's');
}
await new Promise((r) => out.end(r));
await encode(`clips/${name}.mjpeg`, `clips/${name}.mp4`, { fps: +fps });
console.log(await page.evaluate(() => { const i = GAME.roadRaceInfo(); return i.state + ' ' + i.standings.slice(0, 3).map((s) => s.name + ':' + Math.round(s.progress)).join(' '); }));
await browser.close(); console.log(errors.filter((e) => !e.includes('502') && !e.includes('404')));
