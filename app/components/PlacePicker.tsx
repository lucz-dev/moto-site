"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import type { PlaceText } from "../lib/places";

export type PickerPlace = PlaceText & { id: string; image: StaticImageData };

/** The island, browsed like the game's start menu: pick a start, see where you land. */
export default function PlacePicker({ places, label, loading }: { places: PickerPlace[]; label: string; loading: string }) {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const place = places[index];

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + places.length) % places.length;
    setIndex(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="places">
      <div className="places__menu">
        <p className="places__label" id="places-label">
          {label}
        </p>
        <div className="places__list" role="tablist" aria-labelledby="places-label" aria-orientation="vertical" onKeyDown={onKey}>
          {places.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`place-tab-${p.id}`}
              aria-selected={i === index}
              aria-controls="place-panel"
              tabIndex={i === index ? 0 : -1}
              className="places__tab"
              onClick={() => setIndex(i)}
            >
              <span className="places__tab-name">{p.name}</span>
              <span className="places__tab-start">{p.start}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="places__view" id="place-panel" role="tabpanel" aria-labelledby={`place-tab-${place.id}`}>
        <div className="places__frame">
          {places.map((p, i) => (
            <Image
              key={p.id}
              src={p.image}
              alt={i === index ? p.alt : ""}
              aria-hidden={i === index ? undefined : true}
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, 62vw"
              className={`places__img${i === index ? " is-on" : ""}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <span className="places__loading" aria-hidden="true">
            {loading} · {place.name}
          </span>
        </div>
        <div className="places__caption">
          <h3 className="places__name">{place.name}</h3>
          <p className="places__body">{place.body}</p>
          <ul className="places__facts">
            {place.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
