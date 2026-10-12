"use server";

import { headers } from "next/headers";

export type BetaResult = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Öffentlich erreichbar (Server Actions sind per POST aufrufbar): Eingaben hart begrenzen.
export async function submitBetaRequest(formData: FormData): Promise<BetaResult> {
  // Honeypot: echte Nutzer füllen das versteckte Feld nicht aus
  if (formData.get("company")) return { ok: true };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const message = String(formData.get("message") ?? "").trim();

  if (!EMAIL_RE.test(email) || email.length > 320) {
    return { ok: false, error: "Bitte gib eine gültige E-Mail-Adresse ein." };
  }
  if (message.length > 5000) {
    return { ok: false, error: "Deine Nachricht ist zu lang (max. 5.000 Zeichen)." };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("[beta] SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt");
    return { ok: false, error: "Senden ist gerade nicht möglich. Bitte versuch es später erneut." };
  }

  const referer = (await headers()).get("referer");
  const source = referer ? new URL(referer).pathname.slice(0, 500) : null;

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/beta_requests`, {
    method: "POST",
    headers: {
      apikey: key,
      // Legacy-Keys (JWT) zusätzlich als Bearer; neue sb_secret_-Keys reichen im apikey-Header
      ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, message: message || null, source }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[beta] Supabase-Insert fehlgeschlagen", res.status, await res.text());
    return { ok: false, error: "Senden ist fehlgeschlagen. Bitte versuch es später erneut." };
  }
  return { ok: true };
}
