import Image from "next/image";
import Icon from "../components/Icon";
import { Head, PageEnd, PageHero } from "../components/PageParts";
import Reveal from "../components/Reveal";
import Showroom, { type ShowroomVehicle } from "../components/Showroom";
import { getDictionary, NUMBER_LOCALE, type Locale } from "../i18n";
import { CATEGORY_KEYS, VEHICLES } from "../lib/catalog";

/** The hero's line-up on the slab: a city car, a supercar and a bike, back to front. */
const LINEUP = ["centauri", "nausikaa", "pluton"].map((id) => VEHICLES.find((v) => v.id === id)!);

export default function DealershipPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const p = t.pages.dealership;
  // Only this language's texts go to the client component.
  const vehicles: ShowroomVehicle[] = VEHICLES.map(({ type, blurb, ...v }) => ({ ...v, type: type[lang], blurb: blurb[lang] }));

  return (
    <>
      <PageHero
        lang={lang}
        {...p.hero}
        facts={t.home.cards.dealership.facts}
        stage={
          <div className="lineup" role="img" aria-label={p.hero.alt}>
            <span className="slab lineup__slab" />
            {LINEUP.map((v, i) => (
              <Image
                key={v.id}
                className={`lineup__car lineup__car--${i}`}
                src={`/media/vehicles/${v.id}.webp`}
                alt=""
                width={v.size[0]}
                height={v.size[1]}
                unoptimized
                preload
              />
            ))}
          </div>
        }
      />

      <section className="band" aria-labelledby="catalogo-title">
        <Reveal>
          <Head id="catalogo-title" title={p.showroom.title} intro={p.showroom.intro} />
        </Reveal>
        <Reveal>
          <Showroom vehicles={vehicles} order={CATEGORY_KEYS} labels={p.labels} numberLocale={NUMBER_LOCALE[lang]} />
        </Reveal>
      </section>

      <section className="band" aria-labelledby="saloni-title">
        <Reveal>
          <Head id="saloni-title" title={p.dealers.title} />
        </Reveal>
        <ul className="dealers">
          {p.dealers.items.map((d, i) => (
            <Reveal as="li" key={d.name} className="dealer" delay={i * 70}>
              <span className="dealer__place">
                <Icon name="pin" /> {d.place}
              </span>
              <h3 className="dealer__name">{d.name}</h3>
              <p className="tile__body">{d.body}</p>
            </Reveal>
          ))}
        </ul>
        <p className="small band__note">{p.dealers.note}</p>
      </section>

      <PageEnd lang={lang} page="dealership" />
    </>
  );
}
