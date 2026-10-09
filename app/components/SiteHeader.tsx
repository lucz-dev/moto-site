import Link from "next/link";
import { getDictionary, LOCALES, PAGE_KEYS, pathOf, type Locale, type PageKey } from "../i18n";
import { PLAY_URL } from "../lib/site";
import Icon from "./Icon";
import NavMenu from "./NavMenu";
import Wordmark from "./Wordmark";

const LANGUAGE_NAMES: Record<Locale, string> = { it: "Italiano", en: "English" };

/** IT · EN: links to the same page in the other language. */
export function LangSwitch({ lang, page, className }: { lang: Locale; page?: PageKey; className?: string }) {
  const t = getDictionary(lang);
  return (
    <nav className={className ? `lang ${className}` : "lang"} aria-label={t.ui.language}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={pathOf(l, page)}
          hrefLang={l}
          lang={l}
          aria-label={LANGUAGE_NAMES[l]}
          aria-current={l === lang ? "true" : undefined}
          className="lang__link"
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

/** Fixed top bar: logo home, the six preview pages, language, Play; a menu below 1180 px. */
export default function SiteHeader({ lang, page }: { lang: Locale; page?: PageKey }) {
  const t = getDictionary(lang);
  const links = PAGE_KEYS.map((key) => ({ key, href: pathOf(lang, key), label: t.nav[key], current: key === page }));
  return (
    <>
      <a className="skip" href="#main">
        {t.ui.skip}
      </a>
      <header className="topbar">
        <Link className="topbar__brand" href={pathOf(lang)} aria-label={t.ui.home}>
          <Wordmark />
        </Link>
        <nav className="topnav" aria-label={t.ui.sections}>
          {links.map((l) => (
            <Link key={l.key} href={l.href} aria-current={l.current ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <LangSwitch lang={lang} page={page} className="lang--bar" />
        <a className="btn btn--primary btn--sm topbar__play" href={PLAY_URL} target="_blank" rel="noopener">
          <Icon name="play" /> {t.ui.play}
        </a>
        <NavMenu label={t.ui.menu} closeLabel={t.ui.closeMenu} navLabel={t.ui.sections} links={links}>
          <LangSwitch lang={lang} page={page} className="lang--menu" />
        </NavMenu>
      </header>
    </>
  );
}
