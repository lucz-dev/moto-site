import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { getDictionary, PAGE_KEYS, pathOf, type Locale, type PageKey } from "../i18n";
import { PLAY_URL } from "../lib/site";
import Icon from "./Icon";

type Tag = { name: string; caption: string };

/**
 * Opening of a preview page: an in-game shot (or a custom stage) behind the title,
 * the breadcrumb back home, the lede and a few facts as chips.
 */
export function PageHero({
  lang,
  eyebrow,
  title,
  lede,
  image,
  alt,
  tag,
  facts,
  stage,
}: {
  lang: Locale;
  eyebrow: string;
  title: string;
  lede: string;
  image?: StaticImageData;
  alt?: string;
  tag?: Tag;
  facts?: string[];
  stage?: React.ReactNode;
}) {
  return (
    <section className={`phero${stage ? " phero--stage" : ""}`} aria-labelledby="page-title">
      {image && (
        <div className="phero__media">
          <Image src={image} alt={alt ?? ""} placeholder="blur" preload sizes="100vw" className="phero__img" />
          <div className="phero__scrim" aria-hidden="true" />
        </div>
      )}
      {stage && <div className="phero__stage">{stage}</div>}
      <div className="phero__copy">
        <p className="crumbs">
          <Link href={pathOf(lang)}>Motor District</Link>
          <span aria-hidden="true">/</span>
          <span className="crumbs__here">{eyebrow}</span>
        </p>
        <h1 className="phero__title" id="page-title">
          {title}
        </h1>
        <p className="phero__lede">{lede}</p>
        {facts && facts.length > 0 && (
          <ul className="facts">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </div>
      {tag && (
        <p className="tag tag--phero" aria-hidden="true">
          <b>{tag.name}</b>
          <span>{tag.caption}</span>
        </p>
      )}
    </section>
  );
}

/** Previous / next preview page (home at either end), then the call to play. */
export function PageEnd({ lang, page }: { lang: Locale; page: PageKey }) {
  const t = getDictionary(lang);
  const i = PAGE_KEYS.indexOf(page);
  const prev = PAGE_KEYS[i - 1];
  const next = PAGE_KEYS[i + 1];
  return (
    <>
      <nav className="pager" aria-label={t.ui.sections}>
        <Link className="pager__link pager__link--prev" href={pathOf(lang, prev)} rel={prev ? "prev" : undefined}>
          <span className="pager__dir">
            <Icon name="back" /> {t.ui.prev}
          </span>
          <span className="pager__title">{prev ? t.nav[prev] : "Motor District"}</span>
        </Link>
        <Link className="pager__link pager__link--next" href={pathOf(lang, next)} rel={next ? "next" : undefined}>
          <span className="pager__dir">
            {t.ui.next} <Icon name="arrow" />
          </span>
          <span className="pager__title">{next ? t.nav[next] : "Motor District"}</span>
        </Link>
      </nav>
      <section className="ctaband" aria-labelledby="cta-title">
        <div>
          <h2 className="ctaband__title" id="cta-title">
            {t.cta.title}
          </h2>
          <p className="ctaband__body">{t.cta.body}</p>
        </div>
        <a className="slab-btn" href={PLAY_URL} target="_blank" rel="noopener">
          <span className="slab-btn__face">
            <Icon name="play" /> {t.ui.playFree}
          </span>
        </a>
      </section>
    </>
  );
}

/** Section heading used inside the preview pages. */
export function Head({
  id,
  eyebrow,
  title,
  intro,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className ? `head ${className}` : "head"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="title" id={id}>
        {title}
      </h2>
      {intro && <p className="intro">{intro}</p>}
    </div>
  );
}
