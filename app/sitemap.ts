import type { MetadataRoute } from "next";
import { branchen } from "./lib/branchen";
import { absoluteUrl } from "./lib/site";

// Bei inhaltlichen Änderungen anheben – lastModified wird sonst bei jedem Build neu gesetzt
const lastModified = new Date("2026-10-09");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/standortanalyse"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...branchen.map((b) => ({
      url: absoluteUrl(`/standortanalyse/${b.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
