# MOTO — sito pubblico

Landing ufficiale di [MOTO](https://moto.lucz.dev), il free-roam arcade di moto e auto. Il sito pubblico e il gioco sono due applicazioni separate:

- sito: `https://moto.lucz.dev`
- gioco: `https://moto-game-eta.vercel.app`

Il concept visivo è “la pagina è una strada”: fondo asfalto, segnaletica, tagli diagonali e accento arancione-rosso `#ff5a1f`.

## Stack

- Next.js 16 App Router + TypeScript
- CSS artigianale, senza framework UI
- `next-intl` per italiano e inglese
- `motion/react` con `LazyMotion`, `domAnimation` e reduced motion
- `lucide-react` con import statici
- `next/image` per screenshot e poster

## Sviluppo

```bash
npm install
cp .env.example .env.local
npm run dev
npm run lint
npm run build
npm run start
```

Variabili pubbliche richieste:

```dotenv
NEXT_PUBLIC_SITE_URL=https://moto.lucz.dev
NEXT_PUBLIC_GAME_URL=https://moto-game-eta.vercel.app
```

I valori di produzione sono anche i fallback sicuri del codice, così metadata e CTA non puntano mai a un deployment estraneo.

## Struttura

- `app/[locale]/` — layout, metadata e landing localizzati.
- `messages/it.json`, `messages/en.json` — tutto il testo visibile, alt text inclusi.
- `i18n/` + `proxy.ts` — routing `/it` e `/en`; `/` rileva `Accept-Language`, fallback italiano, nessun cookie lingua.
- `app/lib/content.ts` — tipi e dati strutturali separati dalla UI.
- `app/components/` — header, gallery, video hero e animazioni client isolate.
- `app/sitemap.ts`, `app/robots.ts` — SEO tecnica e alternate localizzati.
- `public/media/` — catture reali del gioco, video ottimizzati e poster.

## Media reali

Il video hero dura 11 secondi e combina la parte finale dell'impennata in terza persona, con il pilota sempre visibile, la guida in città e lo showroom della Villa. È servito in WebM e MP4, senza audio, con poster WebP e preload limitato.

Le catture sono state realizzate a 1920×1080 in un profilo locale isolato tramite `window.GAME`. Il profilo aveva Villa acquistata, tutti i 29 mezzi sbloccati e 20 slot riempiti con 8 moto e 12 auto. Non sono stati creati account backend e non sono state usate credenziali.

## Deploy

Il progetto è pensato per Vercel. Configurare entrambe le variabili pubbliche negli ambienti Preview e Production prima del deploy. La migrazione di `moto.lucz.dev` richiede che il dominio del gioco e gli URL pubblici del servizio account siano già impostati su `https://moto-game-eta.vercel.app`.

Chi aveva installato la vecchia PWA da `moto.lucz.dev` potrebbe dover reinstallare il gioco dal nuovo origin; la landing mostra un avviso esplicito durante la transizione.
