import type { Metadata } from "next";
import Link from "next/link";
import { container, Footer, Header } from "./components/site-chrome";
import { branchen } from "./lib/branchen";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className={`${container} flex-1 py-24 text-center`}>
        <p className="text-sm font-medium text-accent-strong">404</p>
        <h1 className="mt-3 text-[32px] font-semibold tracking-tight text-ink sm:text-[40px]">Diese Seite gibt es (noch) nicht.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-muted">
          Vielleicht hilft dir einer dieser Einstiege in die Standortanalyse weiter.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link href="/" className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-accent-strong">
            Zur Startseite
          </Link>
          {branchen.slice(0, 4).map((b) => (
            <Link
              key={b.slug}
              href={`/standortanalyse/${b.slug}`}
              className="rounded-lg border border-line bg-surface px-4 py-2 text-sm text-ink hover:border-accent"
            >
              Standort für {b.short}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
