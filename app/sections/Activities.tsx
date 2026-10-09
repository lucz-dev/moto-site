import Image from "next/image";
import Icon, { type IconName } from "../components/Icon";
import { PageEnd, PageHero } from "../components/PageParts";
import Reveal from "../components/Reveal";
import { getDictionary, type Locale } from "../i18n";
import costaCurva from "../media/costa-curva.jpg";
import costaMoto from "../media/costa-moto.jpg";
import mugelloVia from "../media/mugello-via.jpg";
import polizia from "../media/polizia.jpg";
import enChampionships from "../media/ui/en-championships.jpg";
import itChampionships from "../media/ui/it-championships.jpg";

// Activity copy follows the game's own texts (src/locales/*.ts) and docs/sintesi/gameplay.md.
const ITEMS: { key: "races" | "deliveries" | "transfers" | "speedTraps" | "drag" | "zones"; icon: IconName }[] = [
  { key: "races", icon: "route" },
  { key: "deliveries", icon: "box" },
  { key: "transfers", icon: "keys" },
  { key: "speedTraps", icon: "gauge" },
  { key: "drag", icon: "lights" },
  { key: "zones", icon: "drift" },
];

export default function ActivitiesPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const p = t.pages.activities;
  return (
    <>
      <PageHero lang={lang} {...p.hero} image={costaCurva} facts={t.home.cards.activities.facts} />

      <section className="band" aria-label={p.hero.eyebrow}>
        <div className="bento">
          <Reveal as="article" className="tile tile--feature">
            <Image src={costaMoto} alt={p.championships.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 66vw" className="tile__img" />
            <div className="tile__over">
              <span className="tile__icon">
                <Icon name="flag" />
              </span>
              <h2 className="tile__title">{p.championships.title}</h2>
              <p className="tile__body">{p.championships.body}</p>
              <p className="tile__meta">{p.championships.meta}</p>
            </div>
          </Reveal>

          <Reveal as="article" className="tile tile--shot">
            <Image
              src={lang === "it" ? itChampionships : enChampionships}
              alt={p.panel.alt}
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, 33vw"
              className="tile__img tile__img--ui"
            />
            <p className="tile__caption">{p.panel.caption}</p>
          </Reveal>

          {ITEMS.map(({ key, icon }, i) => {
            const a = p.items[key];
            return (
              <Reveal as="article" className="tile" key={key} delay={(i % 3) * 70}>
                <span className="tile__icon">
                  <Icon name={icon} />
                </span>
                <h2 className="tile__title">{a.title}</h2>
                <p className="tile__body">{a.body}</p>
                <p className="tile__meta">{a.meta}</p>
              </Reveal>
            );
          })}

          <Reveal as="article" className="tile tile--wide tile--police">
            <Image src={polizia} alt={p.police.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 66vw" className="tile__img" />
            <div className="tile__over">
              <span className="tile__icon">
                <Icon name="siren" />
              </span>
              <h2 className="tile__title">{p.police.title}</h2>
              <p className="tile__body">{p.police.body}</p>
            </div>
          </Reveal>

          <Reveal as="article" className="tile tile--shot">
            <Image src={mugelloVia} alt={p.start.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 33vw" className="tile__img" />
            <p className="tile__caption">{p.start.caption}</p>
          </Reveal>
        </div>
      </section>

      <PageEnd lang={lang} page="activities" />
    </>
  );
}
