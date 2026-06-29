# MOTO — sito / landing page

Landing page per **MOTO**, un gioco arcade free-roam di moto e auto che gira nel
browser (Three.js + WebGL). Costruita con **Next.js 16** (App Router) e CSS
artigianale — nessun framework di stile.

> Concept: _la pagina è una strada._ Il gioco è guida libera, quindi il sito
> guida — una clip in-engine come hero e la segnaletica stradale del gioco
> (linee gialle di mezzeria, strisce pedonali) come sistema strutturale tra le
> sezioni.

## Sviluppo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build di produzione (statica)
npm run start      # serve la build
```

## Struttura

- `app/page.tsx` — composizione della pagina (server component).
- `app/components/DriveClip.tsx` — player a frame della clip di guida (canvas, loop, rispetta `prefers-reduced-motion`).
- `app/components/Reveal.tsx` — reveal allo scroll (IntersectionObserver, con fallback).
- `app/lib/vehicles.ts` — dati reali dei veicoli (statistiche dal catalogo del gioco).
- `app/globals.css` — token di colore/tipografia + tutti gli stili.
- `public/media/` — screenshot e frame della clip, catturati direttamente dal gioco in free-roam.

## Asset

Gli screenshot e i frame della clip sono **catturati dal gioco vero** (modalità
free-roam: città, guida, showroom della villa), non mockup.

## Deploy

Pensato per **Vercel**: importa la repo, framework _Next.js_, build di default.
La variabile opzionale `NEXT_PUBLIC_SITE_URL` imposta il dominio per i meta
Open Graph.

> Il pulsante **Gioca** punta a un segnaposto (`PLAY_URL` in `app/page.tsx`):
> aggiornalo con l'URL del build giocabile quando è online.
