import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "../../components/icons";
import { container, Cta, Eyebrow, FaqList, Footer, Header, SectionHeading } from "../../components/site-chrome";
import { branchen, getBranche, sectorList, type Priority, type Relevance } from "../../lib/branchen";
import { breadcrumbLd, faqLd, graph, JsonLd, organizationLd, webPageLd, websiteLd } from "../../lib/json-ld";
import { pageMetadata } from "../../lib/metadata";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return branchen.map((b) => ({ branche: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/standortanalyse/[branche]">): Promise<Metadata> {
  const { branche } = await params;
  const b = getBranche(branche);
  if (!b) return {};
  return {
    ...pageMetadata({
      path: `/standortanalyse/${b.slug}`,
      title: b.metaTitle,
      description: b.metaDescription,
      absoluteTitle: true,
    }),
    keywords: [
      `Standortanalyse ${b.short}`,
      `Standort ${b.short}`,
      `${b.short} Standort finden`,
      `Standortfaktoren ${b.short}`,
      `Grundstück ${b.short}`,
    ],
  };
}

const relevanceInfo: Record<Relevance, { label: string; width: string }> = {
  H: { label: "Hoch", width: "100%" },
  M: { label: "Mittel", width: "62%" },
  G: { label: "Gering", width: "28%" },
  "–": { label: "Nicht relevant", width: "0%" },
};

const priorityStyle: Record<Priority, string> = {
  Muss: "bg-accent-soft text-ink",
  Wichtig: "border border-accent text-accent-strong",
  Nützlich: "bg-chip text-ink",
};

const priorityLead: Record<Priority, string> = {
  Muss: "Schließen Flächen aus, die nicht passen",
  Wichtig: "Zählen dreifach in den Match-Score",
  Nützlich: "Zählen einfach in den Match-Score",
};

export default async function BranchePage({ params }: PageProps<"/standortanalyse/[branche]">) {
  const { branche } = await params;
  const b = getBranche(branche);
  if (!b) notFound();

  const path = `/standortanalyse/${b.slug}`;
  const crumbs = [
    { name: "Startseite", path: "/" },
    { name: "Standortanalyse", path: "/standortanalyse" },
    { name: b.name, path },
  ];
  const others = branchen.filter((o) => o.slug !== b.slug);
  const sortedSectors = [...sectorList].sort(
    (x, y) => "HMG–".indexOf(b.relevance[x.key]) - "HMG–".indexOf(b.relevance[y.key]),
  );

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={graph(
          organizationLd(),
          websiteLd(),
          webPageLd({ path, name: b.metaTitle, description: b.metaDescription }),
          breadcrumbLd(crumbs),
          faqLd(b.faqs, path),
        )}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section aria-labelledby="branche-heading" className="relative overflow-hidden border-b border-line">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className={`${container} relative pb-16 pt-10`}>
            <nav aria-label="Brotkrumen" className="text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-1.5">
                {crumbs.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {i > 0 && <span aria-hidden="true">›</span>}
                    {i < crumbs.length - 1 ? (
                      <Link href={c.path} className="hover:text-ink">
                        {c.name}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ink">
                        {c.name}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <Eyebrow>Standortanalyse nach Branche</Eyebrow>
                <h1
                  id="branche-heading"
                  className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[46px]"
                >
                  {b.h1}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted">{b.intro}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/suche?vorhaben=${encodeURIComponent(b.example)}`}
                    rel="nofollow"
                    data-beta={b.example}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-sm font-medium text-white transition hover:bg-accent-strong"
                  >
                    Standortsuche {b.forName} starten
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href="#faktoren"
                    className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink transition hover:border-accent"
                  >
                    Faktoren ansehen
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_24px_48px_-28px_rgba(15,26,31,0.25)]">
                <p className="text-xs text-subtle">So könntest du dein Vorhaben beschreiben</p>
                <p className="mt-2 flex items-start gap-2 rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-ink">
                  <Icon name="search" className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />„{b.example}“
                </p>
                <p className="mt-4 text-xs text-subtle">larima erkennt daraus u. a.</p>
                <ul className="mt-2 space-y-1.5">
                  {b.factors.slice(0, 4).map((f) => (
                    <li key={f.name} className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="truncate text-ink">{f.name}</span>
                      <span className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] ${priorityStyle[f.priority]}`}>
                        {f.priority}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-line pt-3 text-[11px] text-muted">
                  + {b.factors.length - 4} weitere Faktoren · jeder mit Begründung und änderbar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Faktoren */}
        <section id="faktoren" aria-labelledby="faktoren-heading" className="scroll-mt-14">
          <div className={`${container} py-20`}>
            <SectionHeading
              id="faktoren-heading"
              eyebrow="Startvorlage"
              title={`Typische Standortfaktoren ${b.forName}`}
              lead="Diese Vorlage ist der Ausgangspunkt. Im Faktor-Review änderst du Prioritäten, Schwellenwerte oder verwirfst Faktoren ganz."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {(["Muss", "Wichtig", "Nützlich"] as Priority[]).map((p) => {
                const list = b.factors.filter((f) => f.priority === p);
                return (
                  <div key={p} className="rounded-2xl border border-line bg-surface p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[15px] font-semibold text-ink">
                        {p === "Muss" ? "Muss-Kriterien" : p}
                      </h3>
                      <span className={`rounded px-1.5 py-0.5 text-[11px] ${priorityStyle[p]}`}>{list.length}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted">{priorityLead[p]}</p>
                    <ul className="mt-4 space-y-4 border-t border-line pt-4">
                      {list.map((f) => (
                        <li key={f.name}>
                          <p className="text-sm font-medium text-ink">{f.name}</p>
                          <p className="mt-0.5 text-xs text-subtle">{f.sector}</p>
                          <p className="mt-1 text-[13px] leading-5 text-muted">{f.why}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sektoren */}
        <section aria-labelledby="sektoren-heading" className="border-y border-line bg-surface">
          <div className={`${container} grid gap-12 py-20 lg:grid-cols-2`}>
            <div>
              <SectionHeading
                id="sektoren-heading"
                eyebrow="Relevanz der Datensektoren"
                title={`Welche Daten ${b.forName} zählen`}
                lead="larima nutzt zehn Datensektoren. Wie stark jeder Sektor in die Bewertung einfließt, hängt vom Vorhaben ab."
              />
              <div className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft/40 p-5">
                <h3 className="text-[15px] font-semibold text-ink">{b.insight.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{b.insight.text}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {sortedSectors.map((s) => {
                const rel = b.relevance[s.key];
                return (
                  <li key={s.key} className="grid grid-cols-[1.25rem_10rem_1fr_6rem] items-center gap-3 text-[13px]">
                    <Icon name={s.icon} className="h-4 w-4 text-subtle" />
                    <span className="text-ink">{s.label}</span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-chip">
                      <span className="block h-full rounded-full bg-accent" style={{ width: relevanceInfo[rel].width }} />
                    </span>
                    <span className="text-right text-muted">{relevanceInfo[rel].label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="branche-faq-heading">
          <div className={`${container} grid gap-10 py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16`}>
            <SectionHeading
              id="branche-faq-heading"
              eyebrow="FAQ"
              title={`Häufige Fragen zur Standortwahl ${b.forName}`}
            />
            <FaqList faqs={b.faqs} />
          </div>
        </section>

        {/* Weitere Branchen */}
        <section aria-labelledby="weitere-heading" className="border-t border-line">
          <div className={`${container} py-16`}>
            <h2 id="weitere-heading" className="text-lg font-semibold text-ink">
              Standortanalyse für weitere Branchen
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/standortanalyse/${o.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-ink transition hover:border-accent hover:bg-accent-soft"
                  >
                    <Icon name={o.icon} className="h-3.5 w-3.5 text-muted" />
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Cta title={`Finde den Standort ${b.forName}.`} />
      </main>
      <Footer />
    </div>
  );
}
