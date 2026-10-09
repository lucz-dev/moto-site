"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import Icon from "./Icon";

type NavLink = { key: string; href: string; label: string; current: boolean };

/** The pages as a drop-down sheet, for screens too narrow for the top bar's links. */
export default function NavMenu({
  label,
  closeLabel,
  navLabel,
  links,
  children,
}: {
  label: string;
  closeLabel: string;
  navLabel: string;
  links: NavLink[];
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 1181px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? closeLabel : label}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      <div className={`sheet${open ? " is-open" : ""}`} id={id} hidden={!open}>
        <nav aria-label={navLabel}>
          <ul className="sheet__list">
            {links.map((l) => (
              <li key={l.key}>
                <Link href={l.href} aria-current={l.current ? "page" : undefined} onClick={() => setOpen(false)}>
                  {l.label}
                  <Icon name="arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </div>
    </>
  );
}
