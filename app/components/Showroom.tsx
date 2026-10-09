"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CategoryKey } from "../lib/catalog";
import Icon from "./Icon";

/** A catalogue vehicle with its texts already in the page's language. */
export type ShowroomVehicle = {
  id: string;
  category: CategoryKey;
  name: string;
  type: string;
  blurb: string;
  price: number;
  cls: string;
  pi: number;
  kw: number;
  kg: number;
  gears: number;
  bars: number[];
  garage: boolean;
  size: [number, number];
};

export type ShowroomLabels = {
  categoriesLabel: string;
  categories: Record<CategoryKey, string>;
  stats: string[];
  cls: string;
  power: string;
  mass: string;
  gears: string;
  tooBig: string;
  prev: string;
  next: string;
  all: string;
  modelAlt: string;
};

/**
 * The full dealership catalogue, laid out like the in-game showroom: categories,
 * the vehicle on the menu's orange slab, price, class and PI, and the six bars.
 */
export default function Showroom({
  vehicles,
  order,
  labels,
  numberLocale,
  initial = "azura",
}: {
  vehicles: ShowroomVehicle[];
  order: CategoryKey[];
  labels: ShowroomLabels;
  numberLocale: string;
  initial?: string;
}) {
  const nf = useMemo(() => new Intl.NumberFormat(numberLocale), [numberLocale]);
  const bar = (v: number) => (v / 10).toLocaleString(numberLocale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const start = vehicles.find((v) => v.id === initial) ?? vehicles[0];
  const [category, setCategory] = useState<CategoryKey>(start.category);
  const [id, setId] = useState(start.id);

  const list = useMemo(() => vehicles.filter((v) => v.category === category), [vehicles, category]);
  const index = Math.max(0, list.findIndex((v) => v.id === id));
  const v = list[index];

  const pick = (key: CategoryKey) => {
    setCategory(key);
    setId(vehicles.find((x) => x.category === key)!.id);
  };
  const step = (d: number) => setId(list[(index + d + list.length) % list.length].id);

  return (
    <div className="showroom">
      <div className="showroom__cats" role="group" aria-label={labels.categoriesLabel}>
        {order.map((key) => {
          const count = vehicles.filter((x) => x.category === key).length;
          return (
            <button key={key} type="button" className="chip" aria-pressed={key === category} onClick={() => pick(key)}>
              {labels.categories[key]} <span className="chip__count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="showroom__main">
        <div className="showroom__stage">
          <div className="slab slab--stage" aria-hidden="true" />
          <Image
            key={v.id}
            className="showroom__car"
            src={`/media/vehicles/${v.id}.webp`}
            alt={`${v.name}, ${v.type.toLowerCase()}: ${labels.modelAlt}`}
            width={v.size[0]}
            height={v.size[1]}
            unoptimized
            preload={v.id === initial}
          />
          <p className="tag tag--stage" aria-hidden="true">
            <b>{v.name}</b>
            <span>{v.type}</span>
          </p>
          <div className="showroom__nav">
            <button type="button" className="round" onClick={() => step(-1)} aria-label={labels.prev}>
              <Icon name="left" />
            </button>
            <span className="showroom__counter" aria-live="polite">
              {index + 1} / {list.length}
            </span>
            <button type="button" className="round" onClick={() => step(1)} aria-label={labels.next}>
              <Icon name="right" />
            </button>
          </div>
        </div>

        <div className="showroom__panel">
          <p className="showroom__price">{nf.format(v.price)} cr</p>
          <h3 className="showroom__name">{v.name}</h3>
          <p className="showroom__type">
            {v.type}
            {!v.garage && ` · ${labels.tooBig}`}
          </p>
          <p className="showroom__blurb">{v.blurb}</p>
          <dl className="showroom__specs">
            <div>
              <dt>{labels.cls}</dt>
              <dd>
                <span className={`pi pi--${v.cls.toLowerCase()}`}>{v.cls}</span> PI {v.pi}
              </dd>
            </div>
            <div>
              <dt>{labels.power}</dt>
              <dd>{nf.format(v.kw)} kW</dd>
            </div>
            <div>
              <dt>{labels.mass}</dt>
              <dd>{nf.format(v.kg)} kg</dd>
            </div>
            <div>
              <dt>{labels.gears}</dt>
              <dd>{v.gears}</dd>
            </div>
          </dl>
          <div className="bars" key={`bars-${v.id}`}>
            {labels.stats.map((label, i) => (
              <div className="bars__row" key={label} role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={10} aria-valuenow={v.bars[i] / 10}>
                <span className="bars__label">{label}</span>
                <span className="bars__value">{bar(v.bars[i])}</span>
                <span className="bars__track">
                  <span className="bars__fill" style={{ width: `${v.bars[i]}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className="showroom__strip" aria-label={`${labels.all}: ${labels.categories[category]}`}>
        {list.map((x) => (
          <li key={x.id}>
            <button type="button" className="thumb" aria-pressed={x.id === v.id} onClick={() => setId(x.id)}>
              <Image src={`/media/vehicles/sm/${x.id}.webp`} alt="" width={160} height={100} unoptimized loading="lazy" />
              <span className="thumb__name">{x.name}</span>
              <span className="thumb__meta">
                {x.cls} · {nf.format(x.price)} cr
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
