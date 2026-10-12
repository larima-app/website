import { branchen, getBranche } from "../../lib/branchen";
import { ogSize, renderOg } from "../../lib/og";

export const alt = "larima – Standortanalyse nach Branche";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return branchen.map((b) => ({ branche: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ branche: string }> }) {
  const { branche } = await params;
  const b = getBranche(branche);
  return renderOg({
    eyebrow: "Standortanalyse nach Branche",
    title: b?.h1 ?? "Standortanalyse nach Branche",
    subtitle: `Typische Standortfaktoren ${b?.forName ?? "für dein Vorhaben"} – mit erklärbarem Match-Score.`,
  });
}
