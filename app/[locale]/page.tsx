import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleGauge,
  Flag,
  Gauge,
  MapPin,
  PackageCheck,
  Play,
  Route,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Gallery from "@/app/components/Gallery";
import Header from "@/app/components/Header";
import HeroMedia from "@/app/components/HeroMedia";
import Reveal from "@/app/components/Reveal";
import {
  features,
  GAME_URL,
  roadmap,
  roadmapIcons,
  stats,
} from "@/app/lib/content";
import { routing, type Locale } from "@/i18n/routing";

const activityIcons = [PackageCheck, Sparkles, Gauge, Flag, Route] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(routing.locales, rawLocale)) notFound();
  const locale: Locale = rawLocale;
  setRequestLocale(locale);

  const [nav, hero, statsT, featureT, world, garage, galleryT, roadmapT, final, footer] =
    await Promise.all([
      getTranslations({ locale, namespace: "Navigation" }),
      getTranslations({ locale, namespace: "Hero" }),
      getTranslations({ locale, namespace: "Stats" }),
      getTranslations({ locale, namespace: "Features" }),
      getTranslations({ locale, namespace: "World" }),
      getTranslations({ locale, namespace: "Garage" }),
      getTranslations({ locale, namespace: "Gallery" }),
      getTranslations({ locale, namespace: "Roadmap" }),
      getTranslations({ locale, namespace: "Final" }),
      getTranslations({ locale, namespace: "Footer" }),
    ]);
  const activities = world.raw("activities") as string[];

  return (
    <>
      <a className="skip-link" href="#content">{nav("skip")}</a>
      <Header locale={locale} />

      <main id="content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <HeroMedia posterAlt={hero("posterAlt")} videoLabel={hero("videoLabel")} />
          <div className="hero__content shell">
            <p className="eyebrow eyebrow--light">{hero("eyebrow")}</p>
            <h1 id="hero-title" className="hero__title">
              {hero("titleStart")}
              <strong>{hero("titleAccent")}</strong>
            </h1>
            <p className="hero__copy">{hero("description")}</p>
            <div className="hero__actions">
              <a className="button button--primary button--large" href={GAME_URL}>
                <Play aria-hidden="true" fill="currentColor" />
                {hero("play")}
              </a>
              <a className="button button--ghost button--large" href="#world">
                {hero("discover")}
                <ArrowDown className="button__tail" aria-hidden="true" />
              </a>
            </div>
            <p className="hero__note"><ShieldCheck aria-hidden="true" />{hero("note")}</p>
          </div>
          <div className="road-edge" aria-hidden="true"><span /><span /><span /></div>
        </section>

        <section className="stats-strip" aria-label={statsT("aria")}>
          <div className="stats-strip__grid shell">
            {stats.map(({ value, key, icon: Icon }) => (
              <div className="stat" key={key}>
                <Icon aria-hidden="true" />
                <strong>{value}</strong>
                <span>{statsT(key)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section section--features" id="features" aria-labelledby="features-title">
          <div className="shell">
            <Reveal className="section-heading">
              <p className="eyebrow"><span aria-hidden="true" />{featureT("eyebrow")}</p>
              <h2 id="features-title">{featureT("title")}</h2>
              <p>{featureT("intro")}</p>
            </Reveal>
            <div className="feature-grid">
              {features.map(({ id, icon: Icon }, index) => (
                <Reveal className="feature-reveal" delay={Math.min(index * 0.045, 0.22)} key={id}>
                  <article className="feature-card">
                    <span className="feature-card__number">{String(index + 1).padStart(2, "0")}</span>
                    <Icon className="feature-card__icon" aria-hidden="true" />
                    <h3>{featureT(`${id}.title`)}</h3>
                    <p>{featureT(`${id}.body`)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--world" id="world" aria-labelledby="world-title">
          <div className="world-layout shell">
            <Reveal className="world-copy">
              <p className="eyebrow"><span aria-hidden="true" />{world("eyebrow")}</p>
              <h2 id="world-title">{world("title")}</h2>
              <p className="section-lede">{world("body")}</p>
              <div className="world-signs" aria-label={world("areasAria")}>
                <span><MapPin aria-hidden="true" />{world("labels.city")}</span>
                <span><Route aria-hidden="true" />{world("labels.coast")}</span>
                <span><Flag aria-hidden="true" />{world("labels.track")}</span>
              </div>
            </Reveal>
            <Reveal className="world-visual">
              <Image
                src="/media/city-traffic.webp"
                alt={galleryT("city.alt")}
                width={1920}
                height={1080}
                sizes="(max-width: 900px) 100vw, 58vw"
              />
              <span className="corner-label">{world("corner")}</span>
            </Reveal>
          </div>
          <div className="activities shell">
            <Reveal className="activities__intro">
              <p className="eyebrow"><span aria-hidden="true" />{world("activityEyebrow")}</p>
              <h3>{world("activityTitle")}</h3>
              <p>{world("activityBody")}</p>
            </Reveal>
            <div className="activity-list">
              {activities.map((activity, index) => {
                const Icon = activityIcons[index];
                return <div className="activity" key={activity}><Icon aria-hidden="true" /><span>{activity}</span><ChevronRight aria-hidden="true" /></div>;
              })}
            </div>
          </div>
        </section>

        <section className="section section--garage" id="garage" aria-labelledby="garage-title">
          <div className="garage-layout shell">
            <Reveal className="garage-visual">
              <Image
                src="/media/villa-showroom.webp"
                alt={garage("imageAlt")}
                width={1920}
                height={1080}
                sizes="(max-width: 900px) 100vw, 60vw"
              />
              <div className="garage-visual__caption"><span>20 / 20</span>{garage("caption")}</div>
            </Reveal>
            <Reveal className="garage-copy">
              <p className="eyebrow"><span aria-hidden="true" />{garage("eyebrow")}</p>
              <h2 id="garage-title">{garage("title")}</h2>
              <p className="section-lede">{garage("body")}</p>
              <div className="garage-numbers">
                <span><b>08</b>{garage("bikes")}</span>
                <span><b>21</b>{garage("cars")}</span>
                <span><b>20</b>{garage("slots")}</span>
              </div>
              <ul className="garage-tags">
                <li><Wrench aria-hidden="true" />{garage("workshop")}</li>
                <li><CircleGauge aria-hidden="true" />{garage("dealer")}</li>
                <li><MapPin aria-hidden="true" />{garage("homes")}</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section section--gallery" id="gallery" aria-labelledby="gallery-title">
          <div className="shell">
            <Reveal className="section-heading section-heading--split">
              <p className="eyebrow"><span aria-hidden="true" />{galleryT("eyebrow")}</p>
              <h2 id="gallery-title">{galleryT("title")}</h2>
            </Reveal>
            <Gallery />
          </div>
        </section>

        <section className="section section--roadmap" id="roadmap" aria-labelledby="roadmap-title">
          <div className="shell">
            <Reveal className="section-heading">
              <p className="eyebrow"><span aria-hidden="true" />{roadmapT("eyebrow")}</p>
              <h2 id="roadmap-title">{roadmapT("title")}</h2>
              <p>{roadmapT("intro")}</p>
            </Reveal>
            <div className="roadmap-grid">
              {roadmap.map((phase, index) => {
                const Icon = roadmapIcons[phase.status];
                return (
                  <Reveal className="roadmap-reveal" delay={index * 0.08} key={phase.status}>
                    <article className={`roadmap-card roadmap-card--${phase.status}`}>
                      <header>
                        <span className="roadmap-card__icon"><Icon aria-hidden="true" /></span>
                        <span className="roadmap-card__index">0{index + 1}</span>
                        <h3>{roadmapT(`${phase.status}.title`)}</h3>
                        <p>{roadmapT(`${phase.status}.description`)}</p>
                      </header>
                      <ul>
                        {phase.items.map((item) => <li key={item}><Check aria-hidden="true" />{roadmapT(`items.${item}`)}</li>)}
                      </ul>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <Image src="/media/wheelie-hero-poster.webp" alt="" fill sizes="100vw" />
          <div className="final-cta__scrim" aria-hidden="true" />
          <Reveal className="final-cta__content shell">
            <p className="eyebrow eyebrow--light"><span aria-hidden="true" />{final("eyebrow")}</p>
            <h2 id="final-title">{final("title")}</h2>
            <p>{final("body")}</p>
            <div className="final-cta__actions">
              <a className="button button--primary button--large" href={GAME_URL}>
                <Play aria-hidden="true" fill="currentColor" />{final("play")}<ArrowUpRight className="button__tail" aria-hidden="true" />
              </a>
              <a className="button button--ghost button--large" href="#roadmap">{final("secondary")}<ArrowRight className="button__tail" aria-hidden="true" /></a>
            </div>
            <p className="migration-note">{final("transition")}</p>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__main shell">
          <div><span className="footer__logo">MOTO</span><p>{footer("tagline")}</p></div>
          <nav aria-label={footer("aria")}>
            <a href={GAME_URL}>{footer("play")}<ArrowUpRight aria-hidden="true" /></a>
            <a href={GAME_URL}>{footer("account")}<ArrowUpRight aria-hidden="true" /></a>
            <a href={`${GAME_URL}/privacy.html`}>{footer("privacy")}<ArrowUpRight aria-hidden="true" /></a>
            <a href="#roadmap">{footer("roadmap")}<ArrowRight aria-hidden="true" /></a>
          </nav>
        </div>
        <div className="footer__bottom shell"><span>{footer("copyright", { year: new Date().getFullYear() })}</span><span>moto.lucz.dev</span></div>
      </footer>
    </>
  );
}
