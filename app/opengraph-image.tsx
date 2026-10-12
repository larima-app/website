import { ogSize, renderOg } from "./lib/og";

export const alt = "larima – Standortanalyse & Grundstückssuche nach Nutzungsprofil";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Standortanalyse für Deutschland",
    title: "Dein Vorhaben. Der passende Standort.",
    subtitle: "Beschreibe, was du vorhast – larima bewertet Grundstücke mit einem erklärbaren Match-Score.",
  });
}
