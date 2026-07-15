"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { gallery } from "@/app/lib/content";

export default function Gallery() {
  const t = useTranslations("Gallery");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setActive(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  }, []);
  const move = useCallback((direction: number) => {
    setActive((current) => {
      if (current === null) return null;
      return (current + direction + gallery.length) % gallery.length;
    });
  }, []);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Tab") {
        const controls = Array.from(
          lightboxRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
        );
        if (!controls.length) return;
        const current = controls.indexOf(document.activeElement as HTMLButtonElement);
        const next = event.shiftKey
          ? (current - 1 + controls.length) % controls.length
          : (current + 1) % controls.length;
        event.preventDefault();
        controls[next].focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close, move]);

  return (
    <>
      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <button
            type="button"
            className={`gallery-card${item.featured ? " gallery-card--wide" : ""}`}
            key={item.id}
            onClick={(event) => {
              openerRef.current = event.currentTarget;
              setActive(index);
            }}
            aria-label={t("open", { title: t(`${item.id}.title`) })}
          >
            <Image
              src={item.src}
              alt={t(`${item.id}.alt`)}
              width={item.width}
              height={item.height}
              sizes={item.featured ? "(max-width: 760px) 100vw, 66vw" : "(max-width: 760px) 100vw, 33vw"}
            />
            <span className="gallery-card__shade" aria-hidden="true" />
            <span className="gallery-card__label">{t(`${item.id}.title`)}</span>
            <Expand className="gallery-card__icon" aria-hidden="true" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <m.div
            ref={lightboxRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t(`${gallery[active].id}.title`)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <button ref={closeRef} className="lightbox__close" type="button" onClick={close} aria-label={t("close")}>
              <X aria-hidden="true" />
            </button>
            <button className="lightbox__nav lightbox__nav--prev" type="button" onClick={() => move(-1)} aria-label={t("previous")}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <m.figure
              className="lightbox__figure"
              key={gallery[active].id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={gallery[active].src}
                alt={t(`${gallery[active].id}.alt`)}
                width={gallery[active].width}
                height={gallery[active].height}
                sizes="95vw"
              />
              <figcaption>
                <span>{t(`${gallery[active].id}.title`)}</span>
                <span>{t("counter", { current: active + 1, total: gallery.length })}</span>
              </figcaption>
            </m.figure>
            <button className="lightbox__nav lightbox__nav--next" type="button" onClick={() => move(1)} aria-label={t("next")}>
              <ChevronRight aria-hidden="true" />
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
