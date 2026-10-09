import Icon from "../components/Icon";
import { Head, PageEnd, PageHero } from "../components/PageParts";
import PlacePicker from "../components/PlacePicker";
import Reveal from "../components/Reveal";
import { getDictionary, type Locale } from "../i18n";
import { PLACE_IDS, PLACE_IMAGES } from "../lib/places";
import { ISLAND } from "../lib/site";
import isola from "../media/isola.jpg";

export default function IslandPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const p = t.pages.island;
  const places = PLACE_IDS.map((id) => ({ id, image: PLACE_IMAGES[id], ...p.places[id] }));
  return (
    <>
      <PageHero
        lang={lang}
        {...p.hero}
        image={isola}
        facts={[`${ISLAND.areaKm2} km²`, ...t.home.cards.island.facts.slice(1)]}
      />

      <section className="band" aria-labelledby="partenze-title">
        <Reveal>
          <Head id="partenze-title" title={p.picker.title} intro={p.picker.intro} />
        </Reveal>
        <Reveal>
          <PlacePicker places={places} label={p.picker.label} loading={p.picker.loading} />
        </Reveal>
      </section>

      <section className="band" aria-labelledby="strade-title">
        <Reveal>
          <Head id="strade-title" eyebrow={p.roads.eyebrow} title={p.roads.title} intro={p.roads.intro} />
        </Reveal>
        <ul className="roads">
          {p.roads.items.map((r, i) => (
            <Reveal as="li" key={r.name} className="road" delay={(i % 3) * 70}>
              <span className="tile__icon">
                <Icon name="road" />
              </span>
              <h3 className="road__name">{r.name}</h3>
              <p className="tile__body">{r.body}</p>
              <p className="road__meta">{r.meta}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <PageEnd lang={lang} page="island" />
    </>
  );
}
