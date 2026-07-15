"use client";

import { Languages, Menu, Play, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { GAME_URL } from "@/app/lib/content";

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const otherLocale: Locale = locale === "it" ? "en" : "it";
  const navItems = ["features", "world", "garage", "gallery", "roadmap"] as const;

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={t("homeAria")} onClick={close}>
        <span>MOTO</span>
        <i aria-hidden="true" />
      </a>

      <nav className={`site-nav${open ? " is-open" : ""}`} aria-label={t("aria")}>
        {navItems.map((item) => (
          <a key={item} href={`#${item}`} onClick={close}>
            {t(item)}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <Link
          className="language-switch"
          href={pathname}
          locale={otherLocale}
          aria-label={`${t("language")} — ${otherLocale.toUpperCase()}`}
          title={t("language")}
        >
          <Languages aria-hidden="true" />
          <span>{otherLocale.toUpperCase()}</span>
        </Link>
        <a className="button button--primary button--small header-play" href={GAME_URL} aria-label={t("play")}>
          <Play aria-hidden="true" fill="currentColor" />
          <span>{t("play")}</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("menu")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
