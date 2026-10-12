import type { Metadata } from "next";
import Link from "next/link";
import { AppPreview } from "./components/app-preview";
import { HeroSearch } from "./components/hero-search";
import { Icon, type IconName } from "./components/icons";
import { container, Cta, FaqList, Footer, Header, SectionHeading } from "./components/site-chrome";
import { branchen } from "./lib/branchen";
import { homeFaqs } from "./lib/faqs";
import { faqLd, graph, JsonLd, organizationLd, softwareLd, webPageLd, websiteLd } from "./lib/json-ld";
import { pageMetadata } from "./lib/metadata";
import { site } from "./lib/site";

export const ensureStatic = "navigation";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: site.title,
  description: site.description,
  absoluteTitle: true,
});

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={graph(
          organizationLd(),
          websiteLd(),
          softwareLd(),
          webPageLd({ path: "/", name: site.title, description: site.description }),
          faqLd(homeFaqs, "/"),
        )}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <Sources />
        <Problem />
        <Steps />
        <Features />
        <Score />
        <Audiences />
        <Industries />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------------- Branchen --------------------------------- */

function Industries() {
  return (
    <section aria-labelledby="branchen-heading" className="border-t border-line bg-surface">
      <div className={`${container} py-24`}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="branchen-heading"
            eyebrow="Standortanalyse nach Branche"
            title="Startvorlagen für jedes Vorhaben."
            lead="Jede Branche bringt ihre eigenen Standortfaktoren mit. Wähle eine Vorlage – und passe sie im Faktor-Review an."
          />
          <Link href="/standortanalyse" className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline">
            Alle Branchen
            <Icon name="arrowRight" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {branchen.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/standortanalyse/${b.slug}`}
                className="group flex h-full items-start gap-3 rounded-xl border border-line bg-background p-4 transition hover:border-accent hover:bg-accent-soft/40"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-muted ring-1 ring-line">
                  <Icon name={b.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">Standort für {b.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">{b.factors.length} typische Faktoren</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ---------------------------------- */

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-14 border-t border-line">
      <div className={`${container} grid gap-10 py-24 lg:grid-cols-[1fr_1.5fr] lg:gap-16`}>
        <div>
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Häufige Fragen zur Standortanalyse"
            lead="Was larima kann – und was ausdrücklich nicht."
          />
          <p className="mt-6 text-sm text-muted">
            Noch Fragen?{" "}
            <Link href="/kontakt" className="font-medium text-accent-strong hover:underline">
              Schreib uns
            </Link>
          </p>
        </div>
        <FaqList faqs={homeFaqs} />
      </div>
    </section>
  );
}

/* ----------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className={`${container} relative pb-20 pt-16 text-center sm:pt-24`}>
        <h1 id="hero-heading" className="mx-auto max-w-3xl text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[56px] lg:text-[64px]">
          Dein Vorhaben.{" "}<br />
          <span className="bg-gradient-to-r from-accent-strong to-accent bg-clip-text text-transparent">
            Der passende Standort.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-[17px]">
          Standortanalyse nach Nutzungsprofil: Beschreibe, was du vorhast – larima findet passende Grundstücke und Gewerbeflächen
          in Deutschland und zeigt dir mit amtlichen Daten aus zehn Sektoren, warum.
        </p>

        <div className="mt-9">
          <HeroSearch />
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
          {["Kein Filter-Dschungel", "Jeder Score bis zur Quelle erklärbar", "Amtliche Daten aus 10 Sektoren"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-accent-strong" />
              {t}
            </li>
          ))}
        </ul>

        <figure className="mt-16 text-left" aria-label="Produktvorschau: Ergebnisansicht einer Standortsuche für eine Bäckerei-Filiale">
          <AppPreview />
        </figure>
      </div>
    </section>
  );
}

/* --------------------------------- Quellen --------------------------------- */

const sources = [
  { name: "BORIS", hint: "Bodenrichtwerte" },
  { name: "XPlanung", hint: "Bebauungspläne" },
  { name: "Zensus", hint: "Demographie" },
  { name: "OpenStreetMap", hint: "POIs & Wege" },
  { name: "ÖPNV-Fahrpläne", hint: "Haltestellen & Takt" },
  { name: "Länderkarten", hint: "Hochwasser & Lärm" },
];

function Sources() {
  return (
    <section className="border-y border-line bg-surface">
      <div className={`${container} py-10`}>
        <p className="text-center text-sm text-subtle">
          Gebaut auf amtlichen und offenen Daten
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {sources.map((s) => (
            <li key={s.name} className="text-center">
              <p className="text-[15px] font-semibold tracking-tight text-muted">{s.name}</p>
              <p className="mt-0.5 text-[11px] text-subtle">{s.hint}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------- Problem --------------------------------- */

const before = [
  "Bodenrichtwerte in BORIS nachschlagen",
  "Bebauungspläne im Kommunalportal suchen",
  "Lärm- und Hochwasserkarten beim Land prüfen",
  "Kaufkraft beim kommerziellen Anbieter einkaufen",
  "Alles per Hand in Excel zusammenführen",
];

const after = [
  "Vorhaben in einem Satz beschreiben",
  "Relevante Faktoren werden abgeleitet und begründet",
  "Alle zehn Sektoren auf einer Karte",
  "Ein Score, der sich bis zur Quelle aufschlüsseln lässt",
  "Treffer vergleichen, merken und teilen",
];

function Problem() {
  return (
    <section className={`${container} py-24`}>
      <SectionHeading
        center
        eyebrow="Das Problem"
        title="Standortsuche ist heute Detektivarbeit."
        lead="Wer gründet oder expandiert, kennt sein Geschäft – aber nicht unbedingt die Standortfaktoren, die dafür entscheidend sind, und erst recht nicht, wo diese Daten liegen."
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm font-semibold text-muted">Ohne larima</p>
          <ul className="mt-4 space-y-3">
            {before.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-chip">
                  <Icon name="x" className="h-2.5 w-2.5 text-subtle" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-2xl border border-accent/40 bg-surface p-6 shadow-[0_20px_40px_-24px_rgba(47,127,153,0.45)]">
          <p className="text-sm font-semibold text-ink">Mit larima</p>
          <ul className="mt-4 space-y-3">
            {after.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-ink">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent-strong">
                  <Icon name="check" className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Schritte -------------------------------- */

const steps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "message",
    title: "Vorhaben beschreiben",
    text: "Branche, Fläche, Suchraum und Budget – in eigenen Worten oder geführt im Wizard.",
  },
  {
    icon: "listChecks",
    title: "Faktoren prüfen",
    text: "Wir leiten die relevanten Standortfaktoren ab und begründen jeden. Du bestätigst, verwirfst oder ergänzt.",
  },
  {
    icon: "sliders",
    title: "Gewichten",
    text: "Muss, Wichtig oder Nützlich. Ein Live-Zähler zeigt sofort, wie viele Flächen übrig bleiben.",
  },
  {
    icon: "map",
    title: "Treffer verstehen",
    text: "Liste, Karte und Heatmap – jeder Treffer mit Score, Datenabdeckung, Stärken und Schwächen.",
  },
];

function Steps() {
  return (
    <section id="so-funktionierts" className="scroll-mt-14 bg-wash/60">
      <div className={`${container} py-24`}>
        <SectionHeading
          eyebrow="So funktioniert’s"
          title="Vom Vorhaben zum ersten Treffer in vier Schritten."
          lead="Jede automatische Entscheidung bleibt sichtbar – und hat einen Ausweg."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent-strong">
                  <Icon name={s.icon} className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium tabular-nums text-subtle">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-[15px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------- Funktionen ------------------------------- */

function BentoCard({
  title,
  text,
  children,
  className = "",
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-surface ${className}`}>
      <div className="p-6">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 max-w-md text-sm leading-6 text-muted">{text}</p>
      </div>
      {children && <div className="mt-auto px-6 pb-6">{children}</div>}
    </div>
  );
}

function ProfileVisual() {
  const rows = [
    { name: "Einwohner im 500-m-Umkreis", origin: "Vorlage", icon: "layers" as IconName, badge: "Wichtig · ×3", style: "border border-accent text-accent-strong" },
    { name: "ÖPNV-Haltestelle mit Frühverkehr", origin: "KI-Vorschlag", icon: "sparkles" as IconName, badge: "Wichtig · ×3", style: "border border-accent text-accent-strong" },
    { name: "Kurzzeitparken im 200-m-Umkreis", origin: "KI-Vorschlag", icon: "sparkles" as IconName, badge: "Nützlich · ×1", style: "bg-chip text-ink" },
  ];
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-3 rounded-lg border border-line bg-background px-3 py-2">
          <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{r.name}</span>
          <span className="hidden items-center gap-1 text-[11px] text-subtle sm:inline-flex">
            <Icon name={r.icon} className="h-3 w-3" />
            {r.origin}
          </span>
          <span className={`rounded px-1.5 py-0.5 text-[11px] ${r.style}`}>{r.badge}</span>
        </div>
      ))}
      <div className="flex items-center justify-between rounded-lg border border-dashed border-line px-3 py-2">
        <span className="text-[13px] text-ink">„Laufkundschaft“</span>
        <span className="text-[11px] text-subtle">Faktor ohne Datenquelle</span>
      </div>
    </div>
  );
}

const breakdown = [
  { label: "Einwohner 500 m", value: 92, delta: "+18" },
  { label: "ÖPNV Frühverkehr", value: 85, delta: "+15" },
  { label: "Kaufkraft", value: 70, delta: "+12" },
  { label: "Stromanschluss", value: null, delta: "–" },
];

function BreakdownVisual() {
  return (
    <div className="rounded-xl border border-line bg-background p-4">
      <ul className="space-y-3">
        {breakdown.map((b) => (
          <li key={b.label} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-[12px]">
            <span className="text-ink">{b.label}</span>
            {b.value === null ? (
              <span className="h-1.5 rounded-full border border-dashed border-subtle/50" aria-label="Keine Daten" />
            ) : (
              <span className="h-1.5 overflow-hidden rounded-full bg-chip">
                <span className="block h-full rounded-full bg-accent" style={{ width: `${b.value}%` }} />
              </span>
            )}
            <span className="text-right tabular-nums text-muted">{b.delta}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-line pt-3 text-[11px] text-muted">
        Kaufkraft 26.400 € · <span className="text-ink">Gemeinde</span> · Stand 2025 ·{" "}
        <span className="text-accent-strong underline underline-offset-2">Quelle</span>
      </p>
    </div>
  );
}

const qualityBadges: { icon: IconName; label: string; style: string }[] = [
  { icon: "checkCircle", label: "Bestätigt", style: "bg-accent-soft text-ink" },
  { icon: "halfCircle", label: "Automatisch ermittelt", style: "border border-accent text-ink" },
  { icon: "file", label: "Nur im Dokument", style: "bg-chip text-ink" },
  { icon: "dashedCircle", label: "Keine Daten", style: "border border-dashed border-subtle/60 text-ink" },
  { icon: "minus", label: "Trifft nicht zu", style: "bg-chip text-muted" },
];

const sectors: { icon: IconName; label: string }[] = [
  { icon: "bus", label: "Verkehr" },
  { icon: "graduation", label: "Bildung & Soziales" },
  { icon: "health", label: "Gesundheit" },
  { icon: "plug", label: "Infrastruktur" },
  { icon: "coins", label: "Förderung & Steuern" },
  { icon: "landmark", label: "Baurecht" },
  { icon: "mapPin", label: "Grundstücksdaten" },
  { icon: "users", label: "Demographie" },
  { icon: "leaf", label: "Umwelt" },
  { icon: "wallet", label: "Einkommen & Vermögen" },
];

const extras: { icon: IconName; title: string; text: string; soon?: boolean }[] = [
  { icon: "columns", title: "Vergleich", text: "Bis zu vier Grundstücke nebeneinander, bester Wert je Zeile hervorgehoben." },
  { icon: "bookmark", title: "Projekte & Merkliste", text: "Treffer merken, Status pflegen und bei geänderten Daten benachrichtigt werden." },
  { icon: "download", title: "PDF-Standortreport", text: "Profil, Score-Aufschlüsselung und Quellen – fertig für Bank oder Partner.", soon: true },
];

function Features() {
  return (
    <section id="funktionen" className="scroll-mt-14">
      <div className={`${container} py-24`}>
        <SectionHeading
          eyebrow="Funktionen"
          title={
            <>
              Ein Analysewerkzeug.
              <br className="hidden sm:block" /> Kein Immobilienportal.
            </>
          }
          lead="Ruhig, kartenzentriert und mit klarer Hierarchie – vom Score über den Sektor bis zum einzelnen Datenpunkt."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <BentoCard
            className="lg:col-span-2"
            title="Profil vor Filter"
            text="Statt 150 Einzelfilter beschreibst du dein Vorhaben. Branchenvorlage und KI leiten die relevanten Faktoren ab – mit Begründung zu jedem Vorschlag."
          >
            <ProfileVisual />
          </BentoCard>

          <BentoCard
            title="Ehrlich über Datenlücken"
            text="„Keine Daten“ heißt nie „schlecht“. Jeder Wert trägt seinen Qualitätsstatus sichtbar mit."
          >
            <div className="flex flex-wrap gap-1.5">
              {qualityBadges.map((b) => (
                <span key={b.label} className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] ${b.style}`}>
                  <Icon name={b.icon} className="h-3 w-3" />
                  {b.label}
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            title="Zehn Sektoren, eine Karte"
            text="Bodenrichtwerte, B-Pläne, Lärm, ÖPNV und Kaufkraft – zusammengeführt als Liste, Karte und Heatmap."
          >
            <div className="flex flex-wrap gap-1.5">
              {sectors.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-1.5 rounded bg-chip px-2 py-1 text-[11px] text-ink">
                  <Icon name={s.icon} className="h-3 w-3 text-muted" />
                  {s.label}
                </span>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            className="lg:col-span-2"
            title="Erklärbarkeit vor Blackbox"
            text="Jeder Score lässt sich bis zum einzelnen Datenpunkt zurückverfolgen – mit Quelle, Stand und räumlicher Auflösung."
          >
            <BreakdownVisual />
          </BentoCard>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {extras.map((e) => (
            <div key={e.title} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-chip text-ink">
                <Icon name={e.icon} className="h-4 w-4" />
              </span>
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {e.title}
                  {e.soon && (
                    <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-accent-strong">
                      Bald
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-muted">{e.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Score --------------------------------- */

const scorePoints: { icon: IconName; title: string; text: string; tags?: { label: string; style: string }[] }[] = [
  {
    icon: "sliders",
    title: "Du bestimmst, was zählt",
    text: "Muss-Kriterien filtern aus. Alles andere fließt gewichtet in den Score ein.",
    tags: [
      { label: "Muss · Filter", style: "bg-accent-soft text-ink" },
      { label: "Wichtig · ×3", style: "border border-accent text-accent-strong" },
      { label: "Nützlich · ×1", style: "bg-chip text-ink" },
    ],
  },
  {
    icon: "dashedCircle",
    title: "Lücken bestrafen nicht",
    text: "Fehlt ein Wert, sinkt der Score nicht – aber die Datenabdeckung. So siehst du, wie belastbar ein Treffer ist.",
  },
  {
    icon: "check",
    title: "Gleiche Eingabe, gleiches Ergebnis",
    text: "Die KI wählt nur Faktoren aus einem geschlossenen Katalog. Gerechnet wird deterministisch und reproduzierbar.",
  },
];

function BigRing({ value, label, sub, dashed = false }: { value: number; label: string; sub: string; dashed?: boolean }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={dashed ? "var(--color-accent)" : "var(--color-accent-strong)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(value / 100) * c} ${c}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-semibold tracking-tight text-ink">
          {value}
          {dashed && <span className="ml-0.5 text-base font-medium text-muted">%</span>}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
      <p className="mt-0.5 max-w-[11rem] text-xs leading-5 text-muted">{sub}</p>
    </div>
  );
}

function Score() {
  return (
    <section id="methodik" className="scroll-mt-14 border-y border-line bg-surface">
      <div className={`${container} grid items-center gap-14 py-24 lg:grid-cols-2`}>
        <div>
          <SectionHeading
            eyebrow="Wie der Score entsteht"
            title="Zwei Zahlen. Keine Blackbox."
            lead="Jeder Treffer zeigt, wie gut er zu deinem Vorhaben passt – und wie sicher wir uns dabei sind."
          />
          <ul className="mt-10 space-y-6">
            {scorePoints.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-strong">
                  <Icon name={p.icon} className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{p.text}</p>
                  {p.tags && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t.label} className={`rounded px-1.5 py-0.5 text-[11px] ${t.style}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="glow pointer-events-none absolute -inset-10 -z-0" />
          <div className="relative rounded-2xl border border-line bg-background p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink">Mannheim-Neckarstadt</p>
                <p className="text-xs text-muted">140 m² · Potenzialfläche</p>
              </div>
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent-strong">
                Top-Treffer
              </span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <BigRing value={82} label="Match-Score" sub="Wie gut der Standort zu deinem Profil passt" />
              <BigRing value={71} label="Datenabdeckung" sub="Für wie viel deiner Gewichtung Daten vorliegen" dashed />
            </div>
            <div className="mt-8 space-y-2 border-t border-line pt-5 text-[13px]">
              <p className="flex items-center justify-between">
                <span className="text-muted">Stärkste Faktoren</span>
                <span className="text-ink">Einwohner 500 m · ÖPNV Frühverkehr</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted">Datenlücke</span>
                <span className="inline-flex items-center gap-1 text-ink">
                  <Icon name="dashedCircle" className="h-3 w-3 text-subtle" /> Stromanschluss – beim Netzbetreiber anfragen
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Für wen --------------------------------- */

const audiences: { icon: IconName; title: string; goal: string; points: string[]; soon?: boolean }[] = [
  {
    icon: "rocket",
    title: "Gründer:innen",
    goal: "Den ersten Standort finden",
    points: ["Geführter Einstieg", "Klartext statt Fachbegriffe", "Klare Ampel je Faktor"],
  },
  {
    icon: "trending",
    title: "Filialexpansion",
    goal: "Weiße Flecken in einer Region finden",
    points: ["Heatmap über ganze Regionen", "Eigene Gewichtungen speichern", "Vergleich & Export"],
  },
  {
    icon: "building",
    title: "Projektentwicklung",
    goal: "Flächen mit Potenzial bewerten",
    points: ["GRZ, GFZ und Baufenster", "Bodenrichtwert mit Stichtag", "Rohdaten und Quellen"],
  },
  {
    icon: "landmark",
    title: "Wirtschaftsförderung",
    goal: "Eigene Flächen passenden Branchen zeigen",
    points: ["Umkehrsicht: Welche Profile passen?", "Lokale Datenhoheit", "Teilbare Standortprofile"],
    soon: true,
  },
];

function Audiences() {
  return (
    <section className={`${container} py-24`}>
      <SectionHeading
        center
        eyebrow="Für wen"
        title="Für alle, die einen Standort entscheiden müssen."
        lead="Vom ersten Laden bis zur Filialkette mit 40 Standorten."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a) => (
          <div key={a.title} className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white">
                <Icon name={a.icon} className="h-4 w-4" />
              </span>
              {a.soon && (
                <span className="rounded-full bg-chip px-2 py-0.5 text-[10px] font-medium text-muted">Bald</span>
              )}
            </div>
            <h3 className="mt-5 text-[15px] font-semibold text-ink">{a.title}</h3>
            <p className="mt-1 text-sm text-muted">{a.goal}</p>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {a.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] text-ink">
                  <Icon name="check" className="h-3.5 w-3.5 text-accent-strong" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}


