import Link from "next/link";
import { branchen } from "../lib/branchen";
import type { Faq } from "../lib/faqs";
import { Icon } from "./icons";

export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

export const nav = [
  { href: "/#so-funktionierts", label: "So funktioniert’s" },
  { href: "/#funktionen", label: "Funktionen" },
  { href: "/standortanalyse", label: "Branchen" },
  { href: "/#methodik", label: "Methodik" },
  { href: "/#faq", label: "FAQ" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="larima – zur Startseite" className={`text-lg font-semibold tracking-tight ${className}`}>
      larima
    </Link>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-medium text-accent-strong">
      <span className="h-px w-5 bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[36px]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[15px] leading-7 text-muted sm:text-base">{lead}</p>}
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-background/80 backdrop-blur-md">
      <div className={`${container} flex h-14 items-center justify-between`}>
        <Logo className="text-ink" />
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/anmelden" data-beta="" className="hidden px-3 py-1.5 text-sm text-muted transition hover:text-ink sm:block">
            Anmelden
          </Link>
          <Link
            href="/#vorhaben"
            data-beta=""
            className="inline-flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent-strong"
          >
            Jetzt starten
          </Link>
        </div>
      </div>
    </header>
  );
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-surface px-5">
      {faqs.map((f, i) => (
        <details key={f.q} name="faq" open={i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
            <h3>{f.q}</h3>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-chip text-muted transition group-open:rotate-45">
              <Icon name="plus" className="h-3 w-3" />
            </span>
          </summary>
          <p className="pb-5 pr-10 text-sm leading-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Cta({
  title = "Beschreibe, was du vorhast.",
  text = "Wir zeigen dir, wo es passt – und warum.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-label="Jetzt starten" className={`${container} pb-24`}>
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,#000,transparent)]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative">
          <h2 className="mx-auto max-w-xl text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-[40px]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-white/60">{text}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#vorhaben"
              data-beta=""
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-white px-4 text-sm font-medium text-ink transition hover:bg-accent-soft"
            >
              Standortsuche starten
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-10 items-center rounded-lg border border-white/15 px-4 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Demo für Teams
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const footerCols = [
  { title: "Produkt", links: nav.filter((n) => n.href !== "/standortanalyse") },
  {
    title: "Standortanalyse",
    links: branchen.map((b) => ({ href: `/standortanalyse/${b.slug}`, label: `Standort für ${b.short}` })),
  },
  {
    title: "Unternehmen",
    links: [
      { href: "/kontakt", label: "Kontakt" },
      { href: "/anmelden", label: "Anmelden" },
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className={`${container} grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]`}>
        <div>
          <Logo className="text-ink" />
          <p className="mt-3 max-w-xs text-[13px] leading-5 text-muted">
            Standortanalyse und Grundstückssuche nach Nutzungsprofil – mit erklärbarem Match-Score auf Basis amtlicher
            Daten für Deutschland.
          </p>
        </div>
        {footerCols.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-xs font-semibold text-ink">{col.title}</p>
            <ul className="mt-3 space-y-2 text-[13px] text-muted">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} data-beta={l.href === "/anmelden" ? "" : undefined} className="transition hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className={`${container} flex flex-col gap-2 py-5 text-[11px] text-subtle sm:flex-row sm:justify-between`}>
          <p>© 2026 larima</p>
          <p>Werkzeug zur Standortvorauswahl. Ersetzt weder Bauvoranfrage, Verkehrswertgutachten noch Anschlussbestätigung.</p>
        </div>
      </div>
    </footer>
  );
}
