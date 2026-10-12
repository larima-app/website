// Zentrale Angaben für Metadaten, Sitemap und strukturierte Daten.
// Produktions-Domain über NEXT_PUBLIC_SITE_URL setzen (ohne Slash am Ende).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://larima.de").replace(/\/$/, "");

export const site = {
  name: "larima",
  url: siteUrl,
  locale: "de_DE",
  language: "de-DE",
  title: "larima: Standortanalyse & Grundstückssuche in Deutschland",
  shortTitle: "Standortanalyse & Grundstückssuche",
  description:
    "Standortanalyse nach Nutzungsprofil: larima bewertet Grundstücke in Deutschland mit erklärbarem Match-Score – auf Basis amtlicher Daten aus zehn Sektoren.",
  keywords: [
    "Standortanalyse",
    "Standortsuche",
    "Grundstückssuche",
    "Standortbewertung",
    "Gewerbeflächen finden",
    "Gewerbegrundstück finden",
    "Standortanalyse Einzelhandel",
    "Standortfaktoren",
    "Match-Score Standort",
    "Bodenrichtwert",
    "Bebauungsplan prüfen",
    "Potenzialflächen",
    "Eignungsanalyse",
    "Standortplanung",
    "Filialexpansion",
    "Geodaten Standort",
  ],
} as const;

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
