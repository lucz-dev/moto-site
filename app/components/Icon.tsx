// Inline SVG icons (24×24, stroked), like the game's own UI: no icon fonts, no emoji.
const PATHS = {
  play: <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  external: <path d="M14 5h5v5m0-5-8 8M18 14v5H5V6h5" />,
  left: <path d="m15 6-6 6 6 6" />,
  right: <path d="m9 6 6 6-6 6" />,
  flag: <path d="M5 21V4m0 0h11l-2 4 2 4H5" />,
  route: (
    <>
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />
    </>
  ),
  box: <path d="M4 8l8-4 8 4v8l-8 4-8-4zm0 0 8 4 8-4m-8 4v8" />,
  keys: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8-8m-3 3 2 2m-4 0 2 2" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="m12 17 4-5" />
    </>
  ),
  lights: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <circle cx="12" cy="7.5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="16.5" r="1.5" />
    </>
  ),
  drift: <path d="M4 18c3 0 4-3 7-3s3 3 6 3M6 12c2-4 5-6 9-6 2 0 3 1 4 2" />,
  siren: (
    <>
      <path d="M6 18v-5a6 6 0 0 1 12 0v5" />
      <path d="M4 21h16M12 3v2M4.5 6l1.5 1.5M19.5 6 18 7.5" />
    </>
  ),
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 1 5-5l-3 3 1 2 2 1z" />,
  home: <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" />,
  shirt: <path d="m8 4-5 3 2 4 2-1v10h10V10l2 1 2-4-5-3a4 4 0 0 1-8 0z" />,
  star: <path d="m12 4 2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 16.2 7 19l1.2-5.6L4 9.6 9.6 9z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6m2 9a6 6 0 0 0-2-4.5" />
    </>
  ),
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0zm0 2H4a3 3 0 0 0 4 4m8-4h4a3 3 0 0 1-4 4m-4 3v5m-4 3h8" />,
  cloud: <path d="M7 18a4 4 0 0 1-.5-8 6 6 0 0 1 11.5 1.5A3.5 3.5 0 0 1 17.5 18z" />,
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
  keyboard: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h.01M11 10h.01M15 10h.01M8 14h8" />
    </>
  ),
  gamepad: (
    <>
      <path d="M7 8h10a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L14.5 13h-5l-1.1 1.8A3 3 0 0 1 3 13v-1a4 4 0 0 1 4-4z" />
      <path d="M7 11v2m-1-1h2m7 0h.01M17 11h.01" />
    </>
  ),
  touch: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <path d="M7 12h.01M17 12h.01" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="16" r="3.5" />
      <circle cx="18" cy="16" r="3.5" />
      <path d="M6 16h5l3-6h3l1 6M9 8h3" />
    </>
  ),
  layers: <path d="m12 4 9 5-9 5-9-5zm-9 9 9 5 9-5" />,
  // the menu button: three bars leaning like the slab
  menu: <path d="M6 7h14M4.5 12h14M3 17h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  road: <path d="M8 4 5 20M16 4l3 16M12 5v2m0 4v2m0 4v2" />,
  back: <path d="M19 12H5m5-5-5 5 5 5" />,
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
