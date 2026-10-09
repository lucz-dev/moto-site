import Image from "next/image";
import Icon from "../components/Icon";
import { PageEnd, PageHero } from "../components/PageParts";
import Reveal from "../components/Reveal";
import { getDictionary, type Locale } from "../i18n";
import attico from "../media/attico.jpg";
import valdoriaStrada from "../media/valdoria-strada.jpg";

export default function LifePage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const p = t.pages.life;
  return (
    <>
      <PageHero lang={lang} {...p.hero} image={valdoriaStrada} facts={t.home.cards.life.facts} />

      <section className="band" aria-label={p.hero.eyebrow}>
        <div className="life">
          <Reveal as="article" className="life__main">
            <Image src={attico} alt={p.homes.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 58vw" className="life__img" />
            <div className="life__text">
              <h2 className="tile__title">
                <Icon name="home" /> {p.homes.title}
              </h2>
              <p className="tile__body">{p.homes.body}</p>
              <ul className="kit kit--tight">
                {p.homes.list.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="life__side">
            <Reveal as="article" className="tile">
              <span className="tile__icon">
                <Icon name="shirt" />
              </span>
              <h2 className="tile__title">{p.character.title}</h2>
              <p className="tile__body">{p.character.body}</p>
            </Reveal>
            <Reveal as="article" className="tile" delay={70}>
              <span className="tile__icon">
                <Icon name="star" />
              </span>
              <h2 className="tile__title">{p.levels.title}</h2>
              <p className="tile__body">{p.levels.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <PageEnd lang={lang} page="life" />
    </>
  );
}
