// Shared settings for the capture scripts. Override with environment variables:
//   PLAYWRIGHT   module specifier or file:// URL of Playwright (default "playwright")
//   CHROME_PATH  Chrome/Chromium executable; leave unset to use Playwright's own browser
//   GAME_URL     the game's Vite dev server (default http://127.0.0.1:5231)
//   FFMPEG       ffmpeg executable with libx264, for race-video.mjs (default "ffmpeg")
//   SITE_URL     this site's dev server, for site-check.mjs (default http://localhost:3217)
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Only the capture scripts need a browser: the processing ones run without Playwright.
const playwright = await import(process.env.PLAYWRIGHT ?? 'playwright').catch(() => null);
export const chromium = playwright?.chromium ?? new Proxy({}, { get() { throw new Error('Playwright not found: set PLAYWRIGHT (see README.md)'); } });
export const CHROME = process.env.CHROME_PATH || undefined;
export const GAME_URL = (process.env.GAME_URL ?? 'http://127.0.0.1:5231').replace(/\/$/, '');
export const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
export const SITE_URL = process.env.SITE_URL ?? 'http://localhost:3217/';
/** The moto-site project root (forward slashes, so it can sit in template paths). */
export const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..').replaceAll('\\', '/');
