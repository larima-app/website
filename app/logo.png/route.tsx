import { renderMark } from "../lib/og";

// Stabile Logo-URL für strukturierte Daten (Organization.logo) und das Web-App-Manifest
export function GET() {
  return renderMark(512);
}
