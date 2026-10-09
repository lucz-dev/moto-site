# Capture pipeline

Every image, the hero video and the vehicle catalogue on the site come from the
real game (Motor District v2), driven headless through its `window.GAME` debug
API. None of it is a mockup.

## Requirements

- The game repo (`../moto`) running its dev server:
  `npx vite --port 5231 --strictPort --host 127.0.0.1`
- Playwright and a Chrome with WebGL. Point the scripts at them with
  environment variables (see `env.mjs`):
  - `PLAYWRIGHT`: module or `file:///…/playwright/index.mjs` (default `playwright`)
  - `CHROME_PATH`: Chrome executable (default: Playwright's own browser)
  - `GAME_URL`: default `http://127.0.0.1:5231`
- `sharp` comes from this site's `node_modules`.
- `FFMPEG`: an ffmpeg with libx264, for `race-video.mjs` and `media.mjs` (default `ffmpeg`).

Run every script **from this folder**. Raw output lands in subfolders here
(git-ignored); only the processing scripts write into the site.

## Steps

| Step | Command | Output |
| --- | --- | --- |
| 1. Catalogue | `node catalog.mjs` | `catalog.json`: dealership catalogue plus it/en names |
| 2. Vehicle renders | `node render-all.mjs [id,id]` | `renders/all2/<id>.png`, transparent, via CarPreview |
| 3. Vehicle images | `node process-vehicles.mjs` | `public/media/vehicles/<id>.webp` and `sm/`, plus `dims.json` |
| 4. Catalogue module | `node gen-catalog.mjs` | `app/lib/catalog.ts` |
| 5. Island views | `node scenes.mjs shots1.json`, `node scenes.mjs shots2.json` | `scenes/*.png`, free camera, HUD hidden |
| 6. Races and video | see below | `clips/*.mp4` (frame-exact), `clips/*.png` |
| 7. Police chase | `node action.mjs` | `action/police-*.png` |
| 8. Buildings | `node bld.mjs metropolis-house-tower:roof` | `bld/*.png` via `?preview=` |
| 9. Game UI | `node ui.mjs it`, `node ui.mjs en` | `ui/{it,en}-*.png`: menu, dealership, workshop, championships, settings… |
| 10. Site media | `node media.mjs` | `app/media/*.jpg`, `app/media/ui/{it,en}-*.jpg`, `public/media/hero/*` |

Create the output folders first: `mkdir renders/all2 scenes clips action bld ui site`.

Step 6, the races used on the site:

```bash
# hero: bike race on the coast (Nausikaa), 11.5 s at 60 fps, frame-exact
node race-video.mjs coastbc porto-badisco nausikaa coast.bc bike 5 3 '{"dist":5.2,"height":1.45,"side":1.1,"look":10,"lookY":0.9}' 11.5 60 0.6
# stills: grid start at the Mugello, and coast frames at fixed times (ms)
node race.mjs mugello mugello azura mugello car 9 3 '{"dist":7,"height":2.0,"side":1.5,"look":10,"lookY":0.8}' 0 '[1500,3500,5500,7500,9500,11500]'
node race.mjs coastbc porto-badisco nausikaa coast.bc bike 5 3 '{"dist":5.2,"height":1.45,"side":1.1,"look":10,"lookY":0.9}' 0 '[2500,5000,7500,10000,12000]'
```

Arguments for `race-video.mjs`: `name place vehicle course kind rivals followId chaseJson seconds fps leadIn`.
For `race.mjs`: `name place vehicle course kind rivals followId chaseJson recordMs stillsJson`.

**How videos are recorded.** `race-video.mjs` doesn't record in real time. Once the race goes
green, it pauses the game (`GAME.pause`) and for every frame:

1. steps the sim exactly 1/fps (`GAME.step(120 / fps)`, the sim runs at 120 Hz);
2. places the chase camera on that state;
3. advances the page clock by 1/fps (`vclock.js` takes over `requestAnimationFrame`, `performance.now` and `Date.now`), so the game draws the frame;
4. screenshots it.

The JPEG frames go to `clips/<name>.mjpeg`, and `encode.mjs` turns them into a constant 60 fps H.264 MP4.
Re-encode without recapturing: `node encode.mjs clips/coastbc.mjpeg out.mp4 60 23 1600`.

Don't use `race.mjs`'s `MediaRecorder` capture (`recordMs` > 0) for the site. Headless Chrome
can't render ultra 1080p in real time, so the recording gets uneven frame times, from
18 to 633 ms. The chase camera also ran on its own animation frame, reading the
un-interpolated sim position while the game drew the interpolated one. Together they made
the vehicles visibly stutter.

## Checking the site

With the site's dev server on port 3217, `node site-check.mjs 1440 900 desk` and
`node site-check.mjs 390 844 mob` save one screenshot per section of every page
(both languages) in `site/`. Add paths to check only some pages, without the
leading slash under Git Bash: `node site-check.mjs 390 844 mob it/officina en`.
For each page they print the page width, so you can spot horizontal overflow,
and the headings whose longest word does not fit.

## Notes

- Road races go into cooldown after about 13 s if the player stays idle, so
  clips stay under 12 s.
- `media.mjs` copies `clips/coastbc.mp4` to the hero and takes the poster at 1.6 s, where
  `HeroVideo` starts its loop.
- The game starts in English. `ui.mjs` sets the language through saved
  settings and then reloads the page; `catalog.mjs` imports the locale modules
  directly.
- The drag start could not be triggered through `setInput`, so the site has no
  drag-race images.
