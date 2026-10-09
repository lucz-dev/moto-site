# Motor District — sito

Sito di anteprima di **Motor District**, il sandbox di guida open world di LuCz
che gira nel browser: un'isola mediterranea da girare in auto, in moto e a piedi.
È fatto con **Next.js 16** (App Router) e CSS scritto a mano, senza framework
di stile, in **italiano e inglese**.

La home riassume il gioco in sei schede; ognuna apre una pagina di anteprima:

| Pagina | Italiano | English |
| --- | --- | --- |
| Isola e punti di partenza | `/it/isola` | `/en/island` |
| Attività | `/it/attivita` | `/en/activities` |
| Concessionaria | `/it/concessionaria` | `/en/dealership` |
| Officina | `/it/officina` | `/en/workshop` |
| Vita sull'isola | `/it/vita` | `/en/life` |
| Come si gioca | `/it/come-si-gioca` | `/en/how-to-play` |

L'identità grafica segue l'interfaccia "Street Pop" del gioco: titoli italici
pesanti, la lastra arancione inclinata del menu (pulsante Gioca e piedistallo
della concessionaria), blu notte e i badge di classe del gioco.

## Sviluppo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build di produzione (statica)
npm run lint
```

## Lingue

- `/` porta a `/it` o `/en`: vale la lingua scelta l'ultima volta (cookie
  `NEXT_LOCALE`), poi quella del browser; l'inglese è il default. Lo fa
  `proxy.ts` (il vecchio middleware).
- Gli slug sono tradotti: il selettore IT/EN porta alla stessa pagina
  nell'altra lingua, e ogni pagina dichiara le alternative `hreflang`.
- Tutti i testi stanno in `app/i18n/it.ts` (riferimento, da cui deriva il tipo
  `Dictionary`) e `app/i18n/en.ts`: TypeScript segnala le chiavi mancanti.
- Gli slug sono in `SLUGS` di `app/i18n/config.ts`; per aggiungere una pagina
  servono una chiave in `PAGE_KEYS`, i due slug, i testi nei dizionari e un
  componente in `app/sections/`.

## Struttura

- `app/[lang]/layout.tsx` — layout radice (font, `<html lang>`), una versione per lingua.
- `app/[lang]/page.tsx` — home: video, schede riassuntive, finale.
- `app/[lang]/[section]/page.tsx` — le pagine di anteprima, risolte dallo slug.
- `app/sections/` — il contenuto di ogni pagina (`Island`, `Activities`, `Dealership`, `Workshop`, `Life`, `Play`).
- `app/i18n/` — configurazione delle lingue, dizionari, date e metadati (`pageMetadata`: titolo, canonical, `hreflang`, Open Graph).
- `app/global-not-found.tsx` — 404 bilingue per gli indirizzi che non esistono.
- `app/sitemap.ts`, `app/robots.ts` — sitemap con le alternative di lingua.
- `app/components/`:
  - `SiteHeader` (con `LangSwitch`), `NavMenu` (menu a tendina sotto i 1180 px), `SiteFooter`;
  - `PageParts` — apertura delle pagine, intestazioni, pagina precedente/successiva e invito a giocare;
  - `HeroVideo` — clip della gara in costa, in loop; si mette in pausa fuori schermo e rispetta `prefers-reduced-motion`;
  - `PlacePicker` — i punti di partenza del menu del gioco;
  - `Showroom` — concessionaria con i veicoli, le statistiche e le barre del gioco;
  - i componenti client ricevono i testi già tradotti, così al browser arriva una sola lingua;
  - `Wordmark` — logo ufficiale;
  - `Icon`;
  - `Reveal`.
- `app/lib/catalog.ts` — catalogo veicoli **generato** dal gioco (tipo e descrizione in entrambe le lingue); non va modificato a mano.
- `app/lib/places.ts` — luoghi di partenza.
- `app/lib/site.ts` — link (itch.io, studio), stato della release e numeri dell'isola.
- `app/media/` — scene del gioco (import statici, con placeholder sfocato); in `app/media/ui/` le schermate dell'interfaccia, una per lingua.
- `public/media/` — video hero e render dei veicoli.
- `public/brand/` — loghi ufficiali, ritagliati da `moto/marketing/branding/`.
- `app/icon.png`, `app/apple-icon.png` — icone; `public/og-image.jpg` — anteprima social, impostata da `pageMetadata`.
- `scripts/capture/` — la pipeline che genera immagini, video e catalogo dal gioco (vedi il suo README).

## Aggiornare i contenuti dal gioco

Quando cambiano veicoli, prezzi o statistiche, avvia il dev server del gioco e
rigenera il catalogo:

```bash
node catalog.mjs
node render-all.mjs
node process-vehicles.mjs
node gen-catalog.mjs
```

I comandi vanno lanciati dentro `scripts/capture/`; i dettagli sono in
[scripts/capture/README.md](scripts/capture/README.md).

## Deploy

Il sito è pensato per **Vercel**: importa la repo con framework _Next.js_ e la
build di default. Il dominio di produzione è **moto.lucz.dev**; la variabile
`NEXT_PUBLIC_SITE_URL` (vedi `.env.example`) lo cambia per canonical, `hreflang`,
sitemap e Open Graph.

`public/sw.js` va lasciato: su moto.lucz.dev prima c'era la PWA del gioco, e le
installazioni rimaste lo usano per cancellare la cache e disinstallarsi.

Il pulsante **Gioca** punta alla pagina itch.io del gioco (`PLAY_URL` in
`app/lib/site.ts`).
