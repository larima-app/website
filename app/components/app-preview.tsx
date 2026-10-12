import { Icon, type IconName } from "./icons";

type Priority = "Muss" | "Wichtig" | "Nützlich";

const factors: { icon: IconName; name: string; meta: string; priority: Priority; ai?: boolean }[] = [
  { icon: "building", name: "Nutzung erlaubt Laden", meta: "MI, MU, MK, WA", priority: "Muss" },
  { icon: "ruler", name: "Fläche 100–150 m²", meta: "Eigene Angabe", priority: "Muss" },
  { icon: "users", name: "Einwohner 500 m", meta: "mehr ist besser", priority: "Wichtig" },
  { icon: "bus", name: "ÖPNV mit Frühverkehr", meta: "≤ 300 m, 6–9 Uhr", priority: "Wichtig", ai: true },
  { icon: "wallet", name: "Kaufkraft", meta: "mehr ist besser", priority: "Wichtig" },
  { icon: "car", name: "Kurzzeitparken", meta: "200-m-Umkreis", priority: "Nützlich", ai: true },
];

const results = [
  { place: "Mannheim-Neckarstadt", area: 140, score: 82, coverage: 71, plus: ["Frühverkehr ÖPNV", "Kaufkraft"], gap: "Stromkapazität" },
  { place: "Mannheim-Lindenhof", area: 120, score: 78, coverage: 88, plus: ["Einwohner 500 m", "Kurzzeitparken"], gap: null },
  { place: "Heidelberg-Bergheim", area: 135, score: 74, coverage: 64, plus: ["Frühverkehr ÖPNV"], gap: "Hebesatz" },
  { place: "Ludwigshafen-Mitte", area: 150, score: 69, coverage: 52, plus: ["Fläche"], gap: "B-Plan" },
];

const chip: Record<Priority, string> = {
  Muss: "bg-accent-soft text-ink",
  Wichtig: "border border-line text-muted",
  Nützlich: "bg-chip text-ink",
};

function Ring({ score, coverage, size = 40 }: { score: number; coverage: number; size?: number }) {
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth="2.5" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${(coverage / 100) * c} ${c}`}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[13px] font-semibold text-ink">{score}</span>
    </div>
  );
}

// Deterministische „Eignungs-Heatmap“: Summe weicher Hotspots auf einem Raster
const hotspots = [
  { x: 4, y: 3, s: 1 },
  { x: 9, y: 5, s: 0.8 },
  { x: 13, y: 2, s: 0.6 },
  { x: 6, y: 8, s: 0.55 },
];
const cols = 16;
const rows = 11;
const cells = Array.from({ length: cols * rows }, (_, i) => {
  const x = i % cols;
  const y = Math.floor(i / cols);
  const v = hotspots.reduce((sum, h) => sum + h.s * Math.exp(-((x - h.x) ** 2 + (y - h.y) ** 2) / 8), 0);
  return { x, y, v: Math.min(v, 1) };
});

const markers = [
  { x: 4.2, y: 3.1, score: 82, active: true },
  { x: 5.4, y: 4.4, score: 78 },
  { x: 9.2, y: 5.2, score: 74 },
  { x: 11.6, y: 2.6, score: 69 },
];

function Heatmap() {
  const cell = 24;
  return (
    <svg viewBox={`0 0 ${cols * cell} ${rows * cell}`} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="100%" height="100%" fill="#f3f6f8" />
      {cells.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x * cell + 1}
          y={c.y * cell + 1}
          width={cell - 2}
          height={cell - 2}
          rx="3"
          fill="var(--color-accent)"
          opacity={0.06 + c.v * 0.6}
        />
      ))}
      {/* Flusslauf als Orientierung */}
      <path
        d={`M -10 ${rows * cell * 0.75} C 90 200, 160 150, 220 170 S 330 110, ${cols * cell + 10} 60`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="10"
        opacity="0.9"
      />
      {markers.map((m) => (
        <g key={m.score} transform={`translate(${m.x * cell}, ${m.y * cell})`}>
          {m.active && <circle r="20" fill="var(--color-accent-strong)" opacity="0.15" />}
          <circle r="12" fill={m.active ? "var(--color-ink)" : "#ffffff"} stroke="var(--color-ink)" strokeOpacity="0.15" />
          <text
            textAnchor="middle"
            dy="4"
            fontSize="10"
            fontWeight="600"
            fill={m.active ? "#ffffff" : "var(--color-ink)"}
          >
            {m.score}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function AppPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="glow pointer-events-none absolute -inset-x-20 -top-20 bottom-0 -z-10" />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(15,26,31,0.35)] ring-1 ring-black/[0.02]">
        {/* Browser-Leiste */}
        <div className="flex items-center gap-3 border-b border-line bg-chip/60 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div className="mx-auto rounded-md bg-surface px-3 py-1 text-[11px] text-subtle">
            app.larima.de/suche/baeckerei-filiale-mannheim
          </div>
          <div className="w-12" />
        </div>

        {/* App-Kopf */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-2 py-1 text-[11px] font-medium text-ink">
              <Icon name="store" className="h-3 w-3" />
              Bäckerei-Filiale · Raum Mannheim
            </span>
            <span className="hidden text-[11px] text-subtle sm:inline">
              Profil › Faktoren › <span className="font-medium text-ink">Ergebnisse</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex rounded-md border border-line p-0.5 text-[11px]">
              <span className="rounded bg-ink px-2 py-0.5 font-medium text-white">Potenzialflächen</span>
              <span className="px-2 py-0.5 text-muted">Angebote</span>
            </div>
            <span className="text-[11px] text-muted">
              <span className="font-semibold text-ink">340</span> Treffer
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr_1fr]">
          {/* Faktoren */}
          <aside className="hidden border-r border-line p-3 lg:block">
            <p className="px-1 text-[11px] font-medium text-subtle">12 Faktoren erkannt</p>
            <ul className="mt-2 space-y-1">
              {factors.map((f) => (
                <li key={f.name} className="flex items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-chip">
                  <Icon name={f.icon} className="h-3.5 w-3.5 shrink-0 text-subtle" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1 truncate text-[11px] text-ink">
                      {f.name}
                      {f.ai && <Icon name="sparkles" className="h-2.5 w-2.5 shrink-0 text-accent-strong" />}
                    </p>
                    <p className="truncate text-[10px] text-subtle">{f.meta}</p>
                  </div>
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${chip[f.priority]}`}>{f.priority}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-md border border-dashed border-line px-2 py-1.5 text-[10px] text-muted">
              + Faktor hinzufügen
            </div>
          </aside>

          {/* Ergebnisliste */}
          <div className="space-y-2 border-r border-line bg-background/50 p-3">
            {results.map((r, i) => (
              <div
                key={r.place}
                className={`rounded-lg border bg-surface p-2.5 ${i === 0 ? "border-accent ring-2 ring-accent/15" : "border-line"} ${
                  r.coverage < 60 ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ring score={r.score} coverage={r.coverage} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-medium text-ink">{r.place}</p>
                    <p className="text-[10px] text-muted">
                      {r.area} m² · Abdeckung {r.coverage} %
                    </p>
                  </div>
                  <Icon name="bookmark" className="h-3.5 w-3.5 text-subtle" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
                  {r.plus.map((p) => (
                    <span key={p} className="rounded border border-line px-1.5 py-0.5 text-ink">
                      + {p}
                    </span>
                  ))}
                  {r.gap && (
                    <span className="rounded border border-dashed border-line px-1.5 py-0.5 text-subtle">○ {r.gap}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Karte */}
          <div className="relative hidden min-h-[300px] sm:block">
            <Heatmap />
            <div className="absolute left-3 top-3 rounded-md bg-surface/90 px-2 py-1 text-[10px] text-muted shadow-sm backdrop-blur">
              Eignungs-Heatmap
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-surface/90 px-2 py-1 text-[10px] text-muted shadow-sm backdrop-blur">
              niedrig
              <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-accent/10 to-accent" />
              hoch
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
