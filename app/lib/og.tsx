import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const ink = "#0f1a1f";
const accent = "#2f7f99";
const accentLight = "#6fb8cf";

// Gemeinsames Layout für alle Social-Preview-Bilder
export function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #f8fafb 0%, #e6f2f6 100%)",
          color: ink,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>larima</div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: accent,
              border: `2px solid ${accentLight}`,
              borderRadius: 999,
              padding: "8px 20px",
              background: "#ffffff",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          <div style={{ marginTop: 24, fontSize: 30, lineHeight: 1.4, color: "#52616a", maxWidth: 960 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 999,
              border: `8px solid ${accentLight}`,
              fontSize: 38,
              fontWeight: 700,
              background: "#ffffff",
            }}
          >
            82
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 24, color: "#52616a" }}>
            <div style={{ color: ink, fontWeight: 700 }}>Match-Score · Datenabdeckung 71 %</div>
            <div>Amtliche Daten aus zehn Sektoren · jeder Wert mit Quelle</div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

export function renderMark(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ink,
          color: "#ffffff",
          borderRadius: size * 0.22,
          fontSize: size * 0.68,
          fontWeight: 700,
          fontFamily: "sans-serif",
          paddingBottom: size * 0.06,
        }}
      >
        l
      </div>
    ),
    { width: size, height: size },
  );
}
