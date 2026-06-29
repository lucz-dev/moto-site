import DriveClip from "./components/DriveClip";
import Reveal from "./components/Reveal";
import { FEATURED, ROSTER } from "./lib/vehicles";

// TODO: punta al build giocabile quando è online (Vercel/itch/store).
const PLAY_URL = "#gioca";

const TICKER = [
  "29 veicoli",
  "città-isola free-roam",
  "traffico & semafori",
  "consegne a domicilio",
  "officina & tuning",
  "ponti sul mare",
  "fisica arcade custom",
  "online — presto",
  "gira nel browser",
];

const WORLD = [
  {
    img: "/media/boulevard.jpg",
    sign: "Downtown",
    title: "Viali, incroci, semafori.",
    body: "Una griglia urbana con traffico vero: gli NPC frenano alla linea, si accodano, ti danno strada. Fermati alla pizzeria e parti con una consegna.",
  },
  {
    img: "/media/supercar.jpg",
    sign: "Tangenziale",
    title: "Esci dalla griglia.",
    body: "Oltre il centro: rotonde, una circonvallazione sopraelevata, un villaggio, una pista da corsa su un'isola a sé — collegata da un ponte sul mare.",
  },
  {
    img: "/media/canyon.jpg",
    sign: "A piedi",
    title: "Scendi e cammina.",
    body: "Parcheggia, scendi dall'auto, entra in casa. Compra una villa con showroom da 20 posti e riempila di quello che ti sei guadagnato su strada.",
  },
];

const PILLARS = [
  {
    sign: "01",
    title: "Fisica arcade, scritta a mano",
    body: "Niente motore esterno: sospensioni per asse, piega guidata dall'inclinazione, impennate, stoppie, derapate da freno a mano. Divertente, mai un simulatore.",
  },
  {
    sign: "02",
    title: "Free-roam, non un circuito",
    body: "Una città-isola intera con consegne, gare, officina e una vera economia: guida pulito, guadagna crediti, compra veicoli, case e upgrade.",
  },
  {
    sign: "03",
    title: "Browser & mobile, zero download",
    body: "Three.js + WebGL, installabile come PWA e giocabile offline. Apri il link su desktop o telefono e sei già in sella. Nessuno store obbligatorio.",
  },
  {
    sign: "04",
    title: "Online — presto",
    body: "Il cuore tecnico è pronto; il multiplayer è il prossimo traguardo, in arrivo con l'uscita sugli store di giochi indie.",
  },
];

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat">
      <span className="stat__label">{label}</span>
      <span className="stat__track">
        <span className="stat__fill" style={{ ["--v" as string]: `${value}%` }} />
      </span>
      <span className="stat__num">{String(value).padStart(2, "0")}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- top bar ---------- */}
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="MOTO — torna su">
          MOTO
        </a>
        <nav className="topnav">
          <a href="#mondo">Mondo</a>
          <a href="#garage">Garage</a>
          <a href="#guida">Guida</a>
        </nav>
        <a className="btn btn--play btn--sm" href={PLAY_URL}>
          Gioca
        </a>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="hero">
          <div className="hero__stage">
            <DriveClip className="hero__clip" />
            <div className="hero__scrim" />
            <div className="hero__grain" />
          </div>

          <div className="hero__inner">
            <p className="kicker kicker--light">Arcade · Free-roam · Browser</p>
            <h1 className="hero__title">
              Guida tutta
              <span className="hero__title-accent">la città.</span>
            </h1>
            <p className="hero__lede">
              Otto moto, ventuno auto e una città-isola intera da scorrazzare a tutto gas.
              Traffico, ponti, consegne, officina. Niente installazioni — apri il browser e parti.
            </p>
            <div className="hero__cta">
              <a className="btn btn--play" href={PLAY_URL}>
                <span className="btn__icon" aria-hidden="true">▶</span> Gioca nel browser
              </a>
              <a className="btn btn--ghost" href="#mondo">
                Esplora il mondo
              </a>
            </div>
            <p className="hero__note">Three.js · gira su desktop e mobile · installabile, anche offline</p>
          </div>

          <div className="hud" aria-hidden="true">
            <span className="hud__row">
              <span className="hud__k">VEICOLO</span>
              <span className="hud__v">APHRODITE · SUPERCAR</span>
            </span>
            <span className="hud__speed">
              <b>182</b>
              <span>km/h</span>
            </span>
          </div>

          <a className="scrollcue" href="#ticker" aria-label="Scorri">
            <span />
          </a>
        </section>

        {/* ---------- ticker ---------- */}
        <section id="ticker" className="ticker" aria-hidden="true">
          <div className="ticker__track">
            {[0, 1].map((dup) => (
              <span className="ticker__group" key={dup}>
                {TICKER.map((t, i) => (
                  <span className="ticker__item" key={i}>
                    {t}
                    <i className="ticker__dot" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- world ---------- */}
        <section id="mondo" className="band band--world">
          <Reveal as="div" className="band__head">
            <p className="sign">Il mondo</p>
            <h2 className="band__title">Un mondo, non un menu di livelli.</h2>
            <p className="band__intro">
              La mappa è un&apos;isola procedurale: centro a griglia, tangenziali sopraelevate,
              una costa sul mare, un villaggio e una pista da corsa. Ci si muove liberamente —
              in auto, in moto o a piedi.
            </p>
          </Reveal>

          <div className="world">
            {WORLD.map((w, i) => (
              <Reveal as="article" className="shot" key={w.sign} delay={i * 90}>
                <div className="shot__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.img} alt={w.title} loading="lazy" width={1440} height={900} />
                  <span className="shot__plate">{w.sign}</span>
                </div>
                <div className="shot__text">
                  <h3 className="shot__title">{w.title}</h3>
                  <p className="shot__body">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- garage ---------- */}
        <section id="garage" className="band band--garage">
          <div className="garage">
            <Reveal as="div" className="garage__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/garage.jpg" alt="Lo showroom della villa, pieno di auto" loading="lazy" width={1440} height={900} />
              <div className="garage__media-sign">
                <span className="sign sign--dark">Showroom</span>
                <p>La villa di lusso: due file da dieci, una collezione che ti sei guadagnato.</p>
              </div>
            </Reveal>

            <div className="garage__panel">
              <Reveal as="div" className="band__head band__head--left">
                <p className="sign">Il garage</p>
                <h2 className="band__title">
                  <span className="garage__count">{ROSTER.total}</span> veicoli da possedere.
                </h2>
                <p className="band__intro">
                  {ROSTER.bikes} moto e {ROSTER.cars} auto — dallo scooter alla Formula 1.
                  Ognuna ha il suo carattere. Verniciala, cambiale le ruote, potenzia motore,
                  freni e gomme in officina.
                </p>
              </Reveal>

              <div className="roster">
                {FEATURED.map((v, i) => (
                  <Reveal as="article" className="card" key={v.id} delay={i * 60}>
                    <header className="card__head">
                      <span className={`card__kind card__kind--${v.kind}`}>
                        {v.kind === "bike" ? "MOTO" : "AUTO"}
                      </span>
                      <h3 className="card__name">{v.name}</h3>
                      <span className="card__type">{v.type}</span>
                    </header>
                    <div className="card__stats">
                      <StatRow label="ACC" value={v.stats.acc} />
                      <StatRow label="VEL" value={v.stats.top} />
                      <StatRow label="MAN" value={v.stats.hand} />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- how it drives ---------- */}
        <section id="guida" className="band band--guida">
          <Reveal as="div" className="band__head">
            <p className="sign">Come si guida</p>
            <h2 className="band__title">Arcade nel feeling, serio sotto il cofano.</h2>
          </Reveal>
          <div className="pillars">
            {PILLARS.map((p, i) => (
              <Reveal as="article" className="pillar" key={p.sign} delay={i * 70}>
                <span className="pillar__sign">{p.sign}</span>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__body">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- final CTA ---------- */}
        <section id="gioca" className="band band--cta">
          <Reveal as="div" className="cta">
            <p className="sign">Semaforo verde</p>
            <h2 className="cta__title">Pronto a partire?</h2>
            <p className="cta__lede">
              MOTO arriva presto sugli store di giochi indie. Intanto gira già nel browser:
              nessun download, nessuna attesa.
            </p>
            <div className="cta__actions">
              <a className="btn btn--play btn--big" href={PLAY_URL}>
                <span className="btn__icon" aria-hidden="true">▶</span> Gioca ora
              </a>
              <a className="btn btn--ghost btn--big" href="#top">
                Torna su
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="foot">
        <span className="foot__brand">MOTO</span>
        <span className="foot__meta">Costruito con Three.js · una città-isola che gira nel browser</span>
        <span className="foot__meta">© 2026 · lucz</span>
      </footer>
    </>
  );
}
