"use client";

import { useEffect, useRef, useState } from "react";
import { submitBetaRequest } from "../actions/beta";
import { Icon } from "./icons";

// Solange die App in der geschlossenen Beta ist, öffnen alle Einstiege (Anmelden, Starten, Suche) diesen Dialog.
// Auslösen per Attribut `data-beta` an Link/Button oder per `openBetaDialog()` aus Client-Komponenten.
const OPEN_EVENT = "larima:beta-open";

export function openBetaDialog(message?: string) {
  window.dispatchEvent(new CustomEvent<string | undefined>(OPEN_EVENT, { detail: message }));
}

type Status = "idle" | "sending" | "sent";

export function BetaDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const open = (prefill?: string) => {
      if (prefill) setMessage((m) => m || `Mein Vorhaben: ${prefill}`);
      ref.current?.showModal();
    };
    const onEvent = (e: Event) => open((e as CustomEvent<string | undefined>).detail);
    // Capture-Phase auf window: läuft vor dem Klick-Handler von next/link, der sonst navigiert
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const trigger = (e.target as Element | null)?.closest("[data-beta]");
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      open(trigger.getAttribute("data-beta") || undefined);
    };
    window.addEventListener(OPEN_EVENT, onEvent);
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener(OPEN_EVENT, onEvent);
      window.removeEventListener("click", onClick, true);
    };
  }, []);

  const close = () => ref.current?.close();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await submitBetaRequest(new FormData(e.currentTarget));
      if (res.ok) {
        setStatus("sent");
      } else {
        setError(res.error);
        setStatus("idle");
      }
    } catch {
      setError("Senden ist fehlgeschlagen. Bitte versuch es später erneut.");
      setStatus("idle");
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="beta-title"
      onClose={() => {
        setError(null);
        if (status === "sent") {
          setStatus("idle");
          setEmail("");
          setMessage("");
        }
      }}
      onClick={(e) => {
        // Klick auf den Backdrop schließt
        if (e.target === e.currentTarget) close();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-surface p-0 text-ink shadow-[0_24px_60px_-20px_rgba(15,26,31,0.35)] backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-7">
        <button
          type="button"
          onClick={close}
          aria-label="Schließen"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-chip hover:text-ink"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>

        {status === "sent" ? (
          <div className="py-6 text-center">
            <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent-strong">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <h2 id="beta-title" className="mt-4 text-lg font-semibold tracking-tight">
              Danke, wir melden uns!
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
              Wir haben deine Nachricht erhalten und kommen mit den nächsten Beta-Plätzen auf dich zu.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 inline-flex h-10 items-center rounded-lg border border-line px-4 text-sm font-medium transition hover:border-accent"
            >
              Schließen
            </button>
          </div>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-strong">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" aria-hidden="true" />
              Geschlossene Beta
            </span>
            <h2 id="beta-title" className="mt-3 pr-8 text-xl font-semibold leading-tight tracking-tight">
              larima ist gerade in der geschlossenen Beta.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Wir suchen Tester:innen und Gesprächspartner:innen für kurze Interviews. Hinterlass uns deine E-Mail –
              wir melden uns, sobald ein Platz frei ist.
            </p>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              {/* Honeypot gegen Spam-Bots, für Menschen unsichtbar */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div>
                <label htmlFor="beta-email" className="text-xs font-medium text-ink">
                  E-Mail
                </label>
                <input
                  id="beta-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="du@firma.de"
                  className="mt-1 h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm outline-none transition placeholder:text-subtle focus:border-accent focus:ring-4 focus:ring-accent/15"
                />
              </div>
              <div>
                <label htmlFor="beta-message" className="text-xs font-medium text-ink">
                  Nachricht <span className="font-normal text-subtle">(optional)</span>
                </label>
                <textarea
                  id="beta-message"
                  name="message"
                  maxLength={5000}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Was möchtest du mit larima finden? Wärst du auch für ein kurzes Interview offen?"
                  className="mt-1 w-full resize-none rounded-lg border border-line bg-surface px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-subtle focus:border-accent focus:ring-4 focus:ring-accent/15"
                />
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-warn/10 px-3 py-2 text-xs text-warn">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-ink px-4 text-sm font-medium text-white transition hover:bg-accent-strong disabled:opacity-60"
              >
                {status === "sending" ? "Wird gesendet …" : "Absenden"}
                {status !== "sending" && <Icon name="arrowRight" className="h-3.5 w-3.5" />}
              </button>
              <p className="text-center text-[11px] text-subtle">
                Wir nutzen deine Angaben nur, um dich zur Beta zu kontaktieren.
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
