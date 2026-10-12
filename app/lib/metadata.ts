import type { Metadata } from "next";
import { site } from "./site";

// openGraph/twitter eines Segments ersetzen die des Layouts komplett – deshalb hier vollständig aufbauen.
export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: { "de-DE": path, "x-default": path } },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
