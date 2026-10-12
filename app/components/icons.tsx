import type { SVGProps } from "react";

// Schlanke Strich-Icons im Lucide-Stil, inline gehalten, damit keine Abhängigkeit nötig ist.
const paths = {
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M5 12v8h14v-8" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M5 3v5a5 5 0 0 0 10 0V3" />
      <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="11" r="2" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14a4 4 0 0 0 7 0" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  package: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
      <path d="M7.5 5.5l9 5" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  building: (
    <>
      <path d="M4 21V8l6-4v17" />
      <path d="M10 21V10h10v11" />
      <path d="M3 21h18M14 14h2M14 17h2M6.5 11h1M6.5 14h1M6.5 17h1" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 15L15 3l6 6L9 21z" />
      <path d="M7 11l2 2M10 8l2 2M13 5l2 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14a5 5 0 0 1 5 5" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="3" />
      <path d="M4 11h16M8 18v3M16 18v3" />
      <path d="M8 14.5h.01M16 14.5h.01" />
    </>
  ),
  car: (
    <>
      <path d="M5 16V11l2-5h10l2 5v5" />
      <path d="M3 16h18v3H3zM5 11h14" />
      <path d="M7.5 13.5h.01M16.5 13.5h.01" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  message: (
    <>
      <path d="M4 4h16v12H8l-4 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  listChecks: (
    <>
      <path d="M3 6l2 2 3-3M3 13l2 2 3-3" />
      <path d="M11 6h10M11 13h10M11 19h10M4 19h.01" />
    </>
  ),
  sliders: (
    <>
      <path d="M3 7h11M18 7h3M3 17h3M10 17h11" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </>
  ),
  map: (
    <>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" />
      <path d="M8 12l3 3 5-6" stroke="white" />
    </>
  ),
  halfCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l5 5v13H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  dashedCircle: <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  graduation: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6" />
    </>
  ),
  health: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0z" />
      <path d="M12 17v4" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="6" ry="3" />
      <path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7" />
      <path d="M9 14v3c0 1.7 2.7 3 6 3s6-1.3 6-3v-4c0-1.6-2.4-2.9-5.5-3" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 10l9-6 9 6z" />
      <path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15z" />
      <path d="M5 19l8-8" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4z" />
      <path d="M4 6a2 2 0 0 1 2-2h10v2M16 13h.01" />
    </>
  ),
  grid: (
    <path d="M5 5h.01M12 5h.01M19 5h.01M5 12h.01M12 12h.01M19 12h.01M5 19h.01M12 19h.01M19 19h.01" />
  ),
  check: <path d="M5 12l4.5 4.5L19 7" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  rocket: (
    <>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M9 15l-3-3c1-4 4.5-8 12-9-1 7.5-5 11-9 12z" />
      <circle cx="14.5" cy="9.5" r="1.5" />
    </>
  ),
  trending: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  columns: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M15 4v16" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11M7 10l5 5 5-5" />
      <path d="M4 20h16" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "h-4 w-4",
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
