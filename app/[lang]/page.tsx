import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeroVideo from "../components/HeroVideo";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { formatDate, getDictionary, hasLocale, PAGE_KEYS, pathOf, type Locale, type PageKey } from "../i18n";
import { pageMetadata } from "../i18n/metadata";
import { VEHICLES } from "../lib/catalog";
import { PLAY_URL, RELEASE_DATE, STUDIO_ITCH_URL } from "../lib/site";
import attico from "../media/attico.jpg";
import costaMoto from "../media/costa-moto.jpg";
import isola from "../media/isola.jpg";
import portoReale from "../media/porto-reale.jpg";
import enMenu from "../media/ui/en-menu.jpg";
import enWorkshop from "../media/ui/en-workshop.jpg";
import itMenu from "../media/ui/it-menu.jpg";
import itWorkshop from "../media/ui/it-workshop.jpg";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params) {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang) : {};
}

/** The picture of each summary card; the dealership card is drawn (slab + render) instead. */
const CARD_IMAGES: Record<Locale, Partial<Record<PageKey, StaticImageData>>> = {
  it: { island: portoReale, activities: costaMoto, workshop: itWorkshop, life: attico, play: itMenu },
  en: { island: portoReale, activities: costaMoto, workshop: enWorkshop, life: attico, play: enMenu },
};

const CARD_CAR = VEHICLES.find((v) => v.id === "centauri")!;

export default async function Home({ params }: Params) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} />

      <main id="main">
        {/* ---------- hero: the game's start menu, over in-engine footage ---------- */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__media">
            <HeroVideo className="hero__video" playLabel={t.ui.videoPlay} pauseLabel={t.ui.videoPause} />
            <div className="hero__scrim" aria-hidden="true" />
          </div>

          <div className="hero__copy">
            <p className="eyebrow">{t.home.eyebrow}</p>
            <h1 className="hero__title" id="hero-title">
              {t.home.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero__lede">{t.home.lede}</p>
            <div className="hero__actions">
              <a className="slab-btn" href={PLAY_URL} target="_blank" rel="noopener">
                <span className="slab-btn__face">
                  <Icon name="play" /> {t.ui.playFree}
                </span>
              </a>
              <a className="btn btn--ghost" href="#scopri">
                {t.home.secondary} <Icon name="arrow" />
              </a>
            </div>
            <p className="hero__note">{t.ui.release(formatDate(lang, RELEASE_DATE))}</p>
          </div>

          <p className="tag tag--hero" aria-hidden="true">
            <b>{t.home.tag.name}</b>
            <span>{t.home.tag.caption}</span>
          </p>
        </section>

        {/* ---------- what's on the island: one card per preview page ---------- */}
        <section className="band" id="scopri" aria-labelledby="scopri-title">
          <Reveal className="head head--split">
            <div>
              <p className="eyebrow">{t.home.summary.eyebrow}</p>
              <h2 className="title" id="scopri-title">
                {t.home.summary.title}
              </h2>
            </div>
            <p className="intro">{t.home.summary.intro}</p>
          </Reveal>

          <ul className="cards">
            {PAGE_KEYS.map((key, i) => {
              const card = t.home.cards[key];
              const image = CARD_IMAGES[lang][key];
              return (
                <Reveal as="li" key={key} className={`card card--${key}`} delay={(i % 3) * 70}>
                  <Link className="card__link" href={pathOf(lang, key)}>
                    {image ? (
                      <Image src={image} alt="" placeholder="blur" sizes={key === "play" ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 60vw"} className="card__img" />
                    ) : (
                      <span className="card__stage" aria-hidden="true">
                        <span className="slab card__slab" />
                        <Image src={`/media/vehicles/${CARD_CAR.id}.webp`} alt="" width={CARD_CAR.size[0]} height={CARD_CAR.size[1]} unoptimized className="card__car" />
                      </span>
                    )}
                    <span className="card__body">
                      <span className="card__title">{card.title}</span>
                      <span className="card__text">{card.body}</span>
                      <span className="card__facts">
                        {card.facts.map((f) => (
                          <span key={f}>{f}</span>
                        ))}
                      </span>
                      <span className="card__go">
                        {t.ui.discover} <Icon name="arrow" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* ---------- final call ---------- */}
        <section className="finale" id="gioca" aria-labelledby="finale-title">
          <Image src={isola} alt="" placeholder="blur" sizes="100vw" className="finale__img" />
          <div className="finale__scrim" aria-hidden="true" />
          <Reveal className="finale__copy">
            <Image className="finale__logo" src="/brand/logo-title.webp" alt={t.finale.logoAlt} width={1238} height={570} unoptimized />
            <h2 className="finale__title" id="finale-title">
              {t.finale.title}
            </h2>
            <p className="finale__lede">{t.finale.lede}</p>
            <div className="hero__actions">
              <a className="slab-btn slab-btn--big" href={PLAY_URL} target="_blank" rel="noopener">
                <span className="slab-btn__face">
                  <Icon name="play" /> {t.ui.playItch}
                </span>
              </a>
              <a className="btn btn--ghost" href={STUDIO_ITCH_URL} target="_blank" rel="noopener">
                {t.ui.moreGames} <Icon name="external" />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
