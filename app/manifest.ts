import type { MetadataRoute } from "next";
import { site } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    lang: site.language,
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafb",
    theme_color: "#0f1a1f",
    icons: [
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
