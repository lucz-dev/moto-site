import Image from "next/image";
import { PageEnd, PageHero } from "../components/PageParts";
import Reveal from "../components/Reveal";
import { getDictionary, type Locale } from "../i18n";
import { VEHICLES } from "../lib/catalog";
import enWorkshop from "../media/ui/en-workshop.jpg";
import itWorkshop from "../media/ui/it-workshop.jpg";

// Car performance-index classes (src/sim/vehicle/car/performance.ts).
const PI_CLASSES = [
  { cls: "D", range: "100–500" },
  { cls: "C", range: "501–600" },
  { cls: "B", range: "601–700" },
  { cls: "A", range: "701–800" },
  { cls: "S1", range: "801–900" },
  { cls: "S2", range: "901–998" },
  { cls: "X", range: "999" },
];

/** The game's menu car, on the workshop stand. */
const STAND = VEHICLES.find((v) => v.id === "pluton")!;

export default function WorkshopPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const p = t.pages.workshop;
  return (
    <>
      <PageHero
        lang={lang}
        {...p.hero}
        facts={t.home.cards.workshop.facts}
        stage={
          <div className="stand" role="img" aria-label={p.hero.alt}>
            <span className="stand__floor" />
            <Image className="stand__car" src={`/media/vehicles/${STAND.id}.webp`} alt="" width={STAND.size[0]} height={STAND.size[1]} unoptimized preload />
            <p className="tag stand__tag" aria-hidden="true">
              <b>{STAND.name}</b>
              <span>
                <span className={`pi pi--${STAND.cls.toLowerCase()}`}>{STAND.cls}</span> {p.hero.badge}
              </span>
            </p>
          </div>
        }
      />

      <section className="band" aria-labelledby="kit-title">
        <div className="split">
          <Reveal className="head head--left">
            <h2 className="title" id="kit-title">
              {p.kits.title}
            </h2>
            <p className="intro">{p.kits.intro}</p>
            <ul className="kit" aria-label={p.kits.label}>
              {p.kits.items.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
            <p className="small">{p.kits.shopsNote}</p>
          </Reveal>
          <Reveal className="frame" delay={90}>
            <Image src={lang === "it" ? itWorkshop : enWorkshop} alt={p.kits.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 55vw" />
          </Reveal>
        </div>
      </section>

      <section className="band" aria-labelledby="pi-title">
        <Reveal className="piscale">
          <div className="piscale__head">
            <h2 className="piscale__title" id="pi-title">
              {p.pi.title}
            </h2>
            <p className="small">{p.pi.body}</p>
          </div>
          <ol className="piscale__bar" aria-label={p.pi.label}>
            {PI_CLASSES.map((c) => (
              <li key={c.cls} className={`pi-band pi-band--${c.cls.toLowerCase()}`}>
                <span className={`pi pi--${c.cls.toLowerCase()}`}>{c.cls}</span>
                <span className="pi-band__range">{c.range}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <PageEnd lang={lang} page="workshop" />
    </>
  );
}

