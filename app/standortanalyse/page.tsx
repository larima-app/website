import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "../components/icons";
import { container, Cta, Eyebrow, Footer, Header } from "../components/site-chrome";
import { branchen } from "../lib/branchen";
import { breadcrumbLd, graph, JsonLd, organizationLd, webPageLd, websiteLd } from "../lib/json-ld";
import { pageMetadata } from "../lib/metadata";
import { absoluteUrl } from "../lib/site";

export const ensureStatic = "navigation";

const title = "Standortanalyse nach Branche: Standortfaktoren im Überblick";
const description =
  "Welche Standortfaktoren zählen für Bäckerei, Arztpraxis, Kita, Lager, Büro oder Einfamilienhaus? Startvorlagen mit Muss-Kriterien, Gewichtung und Datensektoren – direkt in larima anpassbar.";

export const metadata: Metadata = pageMetadata({ path: "/standortanalyse", title, description, absoluteTitle: true });

export default function StandortanalysePage() {
  const path = "/standortanalyse";
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={graph(
          organizationLd(),
          websiteLd(),
          webPageLd({ path, name: title, description }),
          breadcrumbLd([
            { name: "Startseite", path: "/" },
            { name: "Standortanalyse", path },
          ]),
          {
            "@type": "ItemList",
            name: "Standortanalyse nach Branche",
            itemListElement: branchen.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.h1,
              url: absoluteUrl(`/standortanalyse/${b.slug}`),
            })),
          },
        )}
      />
      <Header />
      <main className="flex-1">
        <section aria-labelledby="index-heading" className="relative overflow-hidden border-b border-line">
          <div className="bg-grid pointer-events-none absolute inset-0" />
          <div className={`${container} relative pb-16 pt-16 text-center`}>
            <Eyebrow>Branchen</Eyebrow>
            <h1
              id="index-heading"
              className="mx-auto mt-3 max-w-3xl text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[48px]"
            >
              Standortanalyse nach Branche
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Jede Branche hat ihre eigenen Standortfaktoren. Eine Bäckerei braucht Pendler und Laufkundschaft, ein Lager
              die Autobahn. Wähle eine Startvorlage – und passe sie an dein Vorhaben an.
            </p>
          </div>
        </section>

        <section aria-label="Alle Branchen" className={`${container} py-16`}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branchen.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/standortanalyse/${b.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white">
                    <Icon name={b.icon} className="h-4 w-4" />
                  </span>
                  <h2 className="mt-5 text-[15px] font-semibold text-ink">{b.h1}</h2>
                  <p className="mt-1.5 line-clamp-3 text-sm leading-6 text-muted">{b.intro}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {b.factors
                      .filter((f) => f.priority !== "Nützlich")
                      .slice(0, 3)
                      .map((f) => (
                        <li key={f.name} className="rounded bg-chip px-1.5 py-0.5 text-[11px] text-ink">
                          {f.name}
                        </li>
                      ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-medium text-accent-strong">
                    Faktoren ansehen
                    <Icon name="arrowRight" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Cta title="Deine Branche ist nicht dabei?" text="Beschreibe dein Vorhaben frei – larima leitet die Faktoren trotzdem ab." />
      </main>
      <Footer />
    </div>
  );
}
