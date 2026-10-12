import type { Faq } from "./faqs";
import { absoluteUrl, site } from "./site";

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      // `<` escapen, damit kein </script> aus Inhalten ausbrechen kann
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  software: `${site.url}/#software`,
};

export const organizationLd = (): Json => ({
  "@type": "Organization",
  "@id": ids.organization,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 512, height: 512 },
  description: site.description,
  areaServed: { "@type": "Country", name: "Deutschland" },
});

export const websiteLd = (): Json => ({
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  alternateName: `${site.name} – ${site.shortTitle}`,
  description: site.description,
  inLanguage: site.language,
  publisher: { "@id": ids.organization },
});

export const softwareLd = (): Json => ({
  "@type": "SoftwareApplication",
  "@id": ids.software,
  name: site.name,
  url: site.url,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Standortanalyse",
  operatingSystem: "Web",
  inLanguage: site.language,
  description: site.description,
  publisher: { "@id": ids.organization },
  featureList: [
    "KI-gestützte Ableitung von Standortfaktoren aus einer Freitext-Beschreibung",
    "Gewichtung nach Muss, Wichtig und Nützlich",
    "Erklärbarer Match-Score mit Datenabdeckung",
    "Eignungs-Heatmap und Kartenansicht",
    "Amtliche Daten aus zehn Sektoren: Verkehr, Bildung & Soziales, Gesundheit, Infrastruktur, Förderung & Steuern, Baurecht, Grundstücksdaten, Demographie, Umwelt, Einkommen & Vermögen",
    "Vergleich von Grundstücken",
  ],
});

export const webPageLd = ({ path, name, description }: { path: string; name: string; description: string }): Json => ({
  "@type": "WebPage",
  "@id": `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name,
  description,
  inLanguage: site.language,
  isPartOf: { "@id": ids.website },
  about: { "@id": ids.software },
});

export const faqLd = (faqs: Faq[], path: string): Json => ({
  "@type": "FAQPage",
  "@id": `${absoluteUrl(path)}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]): Json => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const graph = (...nodes: Json[]): Json => ({ "@context": "https://schema.org", "@graph": nodes });
