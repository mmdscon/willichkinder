"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (!stored) setVisible(true);
  }, []);

  const respond = (accepted: boolean) => {
    localStorage.setItem("cookie_consent", accepted ? "accepted" : "declined");
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("cookieConsentChange", { detail: { accepted } })
    );
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      role="dialog"
      aria-label="Cookie-Einwilligung"
    >
      <div
        className="mx-auto max-w-4xl rounded-2xl shadow-2xl border flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
        style={{
          backgroundColor: "#1E1E1E",
          borderColor: "#333",
          color: "#F5F0E8",
        }}
      >
        <div className="flex-1">
          <p
            className="text-sm font-semibold mb-1"
            style={{ fontFamily: "'Mansory', Georgia, serif", color: "#D78742" }}
          >
            Cookies & Datenschutz
          </p>
          <p className="text-sm leading-6" style={{ color: "#C8C0B0" }}>
            Diese Website nutzt Cookies und den Meta Pixel, um das Angebot zu
            verbessern und dir relevante Inhalte zu zeigen. Weitere Infos in der{" "}
            <a
              href="/datenschutz"
              className="underline underline-offset-2 hover:opacity-80"
              style={{ color: "#D78742" }}
            >
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>

        <div className="flex gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => respond(false)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold border transition hover:opacity-80"
            style={{
              borderColor: "#5C5C5C",
              color: "#C8C0B0",
              backgroundColor: "transparent",
            }}
          >
            Ablehnen
          </button>
          <button
            onClick={() => respond(true)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: "#D78742",
              color: "#1E1E1E",
            }}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
