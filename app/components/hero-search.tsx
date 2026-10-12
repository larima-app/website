"use client";

import { useState } from "react";
import { openBetaDialog } from "./beta-dialog";
import { Icon, type IconName } from "./icons";

const quickStarts: { label: string; icon: IconName; text: string }[] = [
  { label: "Bäckerei", icon: "store", text: "Bäckerei mit kleinem Café, 100–150 m², Raum Mannheim" },
  { label: "Arztpraxis", icon: "stethoscope", text: "Arztpraxis, 150–250 m², gut mit ÖPNV erreichbar" },
  { label: "Kita", icon: "smile", text: "Kita für 40 Kinder mit Außenfläche" },
  { label: "Lager", icon: "package", text: "Lager mit Lkw-Zufahrt, 1.000–2.000 m²" },
  { label: "Büro", icon: "monitor", text: "Büro für ein IT-Team mit 25 Personen" },
  { label: "Einfamilienhaus", icon: "home", text: "Baugrundstück für ein Einfamilienhaus, 500–700 m²" },
];

export function HeroSearch() {
  const [value, setValue] = useState("");
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Übergabe an den Profil-Wizard (S2), der die Felder aus dem Freitext vorbefüllt */}
      <form
        action="/suche"
        method="get"
        onSubmit={(e) => {
          // Geschlossene Beta: statt zur Suche zu wechseln, Beta-Dialog öffnen
          e.preventDefault();
          openBetaDialog(value.trim() || undefined);
        }}
        className="flex items-center gap-2 rounded-xl border border-line bg-surface p-1.5 pl-4 shadow-[0_8px_30px_-12px_rgba(15,26,31,0.18)] transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/15"
      >
        <Icon name="search" className="h-4 w-4 shrink-0 text-subtle" />
        <label htmlFor="vorhaben" className="sr-only">
          Was hast du vor?
        </label>
        <input
          id="vorhaben"
          name="vorhaben"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setActive(null);
          }}
          placeholder="Was hast du vor? z. B. Bäckerei mit Café, 120 m², Raum Mannheim"
          className="h-10 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle"
        />
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-ink px-4 text-sm font-medium text-white transition hover:bg-accent-strong"
        >
          <span className="hidden sm:inline">Standorte finden</span>
          <span className="sm:hidden">Suchen</span>
          <Icon name="arrowRight" className="h-3.5 w-3.5" />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
        <span className="mr-1 text-xs text-subtle">Beliebt:</span>
        {quickStarts.map((q) => (
          <button
            key={q.label}
            type="button"
            onClick={() => {
              setValue(q.text);
              setActive(q.label);
            }}
            aria-pressed={active === q.label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-ink transition hover:border-accent hover:bg-accent-soft ${
              active === q.label ? "border-accent bg-accent-soft" : "border-line bg-surface"
            }`}
          >
            <Icon name={q.icon} className="h-3 w-3 text-muted" />
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}
