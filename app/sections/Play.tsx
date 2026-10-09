import Image from "next/image";
import Icon, { type IconName } from "../components/Icon";
import { Head, PageEnd, PageHero } from "../components/PageParts";
import Reveal from "../components/Reveal";
import { getDictionary, type Locale } from "../i18n";
import portoRealeStrada from "../media/porto-reale-strada.jpg";
import enMenu from "../media/ui/en-menu.jpg";
import enSettings from "../media/ui/en-settings.jpg";
import itMenu from "../media/ui/it-menu.jpg";
import itSettings from "../media/ui/it-settings.jpg";

const ONLINE: { key: "multiplayer" | "boards" | "account" | "offline"; icon: IconName }[] = [
  { key: "multiplayer", icon: "users" },
  { key: "boards", icon: "trophy" },
  { key: "account", icon: "cloud" },
  { key: "offline", icon: "download" },
];

const DEVICES: { key: "keyboard" | "gamepad" | "touch"; icon: IconName }[] = [
  { key: "keyboard", icon: "keyboard" },
  { key: "gamepad", icon: "gamepad" },
  { key: "touch", icon: "touch" },
];

export default function PlayPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const p = t.pages.play;
  return (
    <>
      <PageHero lang={lang} {...p.hero} image={portoRealeStrada} facts={t.home.cards.play.facts} />

      <section className="band" aria-labelledby="aiuti-title">
        <div className="split split--tall">
          <Reveal className="head head--left">
            <h2 className="title" id="aiuti-title">
              {p.assists.title}
            </h2>
            <dl className="assists">
              {p.assists.items.map((a) => (
                <div key={a.term}>
                  <dt>{a.term}</dt>
                  <dd>{a.desc}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="frame frame--portrait" delay={90}>
            <Image src={lang === "it" ? itSettings : enSettings} alt={p.assists.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 40vw" />
          </Reveal>
        </div>
      </section>

      <section className="band" aria-labelledby="comandi-title">
        <Reveal>
          <Head id="comandi-title" title={p.controls.title} />
        </Reveal>
        <Reveal className="controls">
          <div className="devices">
            {DEVICES.map((d) => (
              <span key={d.key}>
                <Icon name={d.icon} /> {p.controls.devices[d.key]}
              </span>
            ))}
          </div>
          <ul className="keys keys--wide">
            {p.controls.keys.map((k) => (
              <li key={k.label}>
                <span className="keys__caps">
                  {k.keys.map((c) => (
                    <kbd key={c}>{c}</kbd>
                  ))}
                </span>
                <span className="keys__label">{k.label}</span>
              </li>
            ))}
          </ul>
          <p className="small">{p.controls.note}</p>
        </Reveal>
      </section>

      <section className="band" aria-labelledby="online-title">
        <div className="split">
          <Reveal className="head head--left">
            <p className="eyebrow">Online</p>
            <h2 className="title" id="online-title">
              {p.online.title}
            </h2>
            <div className="online">
              {ONLINE.map(({ key, icon }) => (
                <article className="online__item" key={key}>
                  <span className="tile__icon">
                    <Icon name={icon} />
                  </span>
                  <div>
                    <h3 className="online__title">{p.online.items[key].title}</h3>
                    <p className="tile__body">{p.online.items[key].body}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="small">{p.online.note}</p>
          </Reveal>
          <Reveal className="frame" delay={90}>
            <Image src={lang === "it" ? itMenu : enMenu} alt={p.online.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 55vw" />
          </Reveal>
        </div>
      </section>

      <PageEnd lang={lang} page="play" />
    </>
  );
}
