import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // App-Bereiche und Suchergebnisse mit Query-Parametern nicht indexieren
        disallow: ["/suche", "/anmelden", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
