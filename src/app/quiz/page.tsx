"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import SelfQuiz from "@/components/SelfQuiz";
import { Star } from "lucide-react";
import { trackEvent } from "@/components/MetaPixel";

/* ── Design tokens (same as homepage) ── */
const accent = "#D78742";
const graphite = "#1E1E1E";
const lightGray = "#5C5C5C";
const beige = "#F5F0E8";
const beigeLight = "#FAF7F2";
const border = "#E2D8C8";
const sectionWidth = "mx-auto w-full max-w-[1200px] px-4 md:px-6";

export default function QuizPage() {
  const mainStyle: CSSProperties = {
    backgroundColor: beige,
  };

  return (
    <main className="min-h-screen" style={mainStyle}>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "rgba(245, 240, 232, 0.75)",
          borderColor: border,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className={`${sectionWidth} flex h-20 items-center justify-between`}>
          <a href="/" className="flex items-center">
            <Image
              src="/logo-header.webp"
              alt="Madeleine Maßmann"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </a>
          <a
            href="/#anfrage"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-sm transition hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: accent, color: "#fff", fontFamily: "'Inter', sans-serif" }}
            onClick={() => trackEvent("ClickCTA", { location: "quiz-header" })}
          >
            Kostenloses Kennenlerngespräch
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative">
        <div className="relative aspect-[4/5] w-full md:aspect-[21/9]">
          <Image
            src="/hero-mad.jpg"
            alt="Madeleine Maßmann – Coaching Kinderfrage"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0">
            <div className={`${sectionWidth} pb-10 md:pb-16`}>
              <div className="mx-auto max-w-4xl text-center text-white">
                <h1
                  className="text-3xl font-bold leading-tight md:text-5xl"
                  style={{ fontFamily: "'Mansory', Georgia, serif" }}
                >
                  Warum kommst du bei der Kinderfrage einfach nicht weiter?
                </h1>
                <p
                  className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-white/85 md:text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Beantworte 5 kurze Fragen und finde heraus, was dich gerade wirklich festhält.
                </p>
                <div className="mt-5 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p
                    className="text-sm font-semibold text-white/90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    100+ Frauen zu einer Antwort verholfen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ backgroundColor: accent }}>
        <div className={`${sectionWidth} py-8`}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: "5+", label: "Jahre Erfahrung mit der Kinderfrage" },
              { n: "100+", label: "Frauen auf dem Weg zur Klarheit begleitet" },
              { n: "95 %", label: "Weiterempfehlungsrate" },
              { n: "1.000+", label: "Stunden Coaching & Weiterbildung" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "'Mansory', Georgia, serif", color: "#fff" }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-1 text-xs leading-5"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SelfQuiz ── */}
      <section id="quiz" className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] opacity-60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Selbst-Quiz
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
            >
              Was beschäftigt dich wirklich?
            </h2>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              5 kurze Fragen, dann kommt dein persönliches Ergebnis.
            </p>
          </div>
          <SelfQuiz />
        </div>
      </section>

      {/* ── "Du suchst schon lange" section ── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#F4F4F4" }}>
        <div className={`${sectionWidth} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src="/madeleine-couch.jpg"
              alt="Madeleine Maßmann – Coaching"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
            >
              Du suchst schon lange nach einer Antwort – und je mehr du nachdenkst,
              desto unklarer wird es.
            </h2>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Der Druck wächst. Von außen und von innen. Vielleicht bist du in einer
              Partnerschaft mit unterschiedlichen Wünschen. Oder du trägst diese Frage
              ganz allein.
            </p>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Und dann kreisen die Gedanken: Was, wenn ich zu spät dran bin? Was, wenn
              ich später etwas bereue? Viele Frauen kommen genau an diesem Punkt zu mir.
            </p>
            <div className="mt-8">
              <a
                href="#quiz"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-sm transition hover:opacity-90"
                style={{ backgroundColor: accent, color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                Zum Quiz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote / Haltung section ── */}
      <section>
        <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[16/6]">
          <Image
            src="/mad-zitat.jpg"
            alt="Madeleine Maßmann – Haltung"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(215,135,66,0.4) 0%, rgba(30,20,10,0.78) 100%)",
            }}
          />
          <div className={`${sectionWidth} absolute inset-0 flex items-center`}>
            <div className="max-w-3xl">
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Meine Haltung
              </p>
              <blockquote
                className="text-2xl font-bold leading-relaxed text-white md:text-4xl"
                style={{ fontFamily: "'Mansory', Georgia, serif" }}
              >
                „Das Problem ist nicht die Entscheidung. Sondern der Druck, unter dem du
                sie treffen sollst."
              </blockquote>
              <p
                className="mt-4 text-sm text-white/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                – Madeleine Maßmann, Expertin für die Kinderfrage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Über mich / Hi ich bin Madeleine ── */}
      <section id="ueber-mich" className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={`${sectionWidth} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src="/madeleine-portrait2.jpg"
              alt="Madeleine Maßmann"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
            >
              Hi, ich bin Madeleine.
            </h2>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Ich weiß aus eigener Erfahrung, wie quälend die Kinderfrage sein kann,
              wenn man einfach keine klare Antwort in sich findet. Nicht, weil man sich
              nicht genug mit sich beschäftigt. Sondern weil zu viele Stimmen
              gleichzeitig mitreden.
            </p>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Als Neurobiologin (M.Sc.), zertifizierte Life Coachin und psychosoziale
              Beraterin verbinde ich wissenschaftliche Klarheit mit empathischer,
              strukturierter Begleitung.
            </p>
            <div className="mb-1 mt-6">
              <p
                className="mb-3 text-xs uppercase tracking-widest opacity-40"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Über meine Arbeit wurde berichtet in
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Image
                  src="/press-kurier.webp"
                  alt="Kurier"
                  width={80}
                  height={28}
                  className="h-7 w-auto object-contain opacity-60"
                />
                <Image
                  src="/press-oon.webp"
                  alt="OÖNachrichten"
                  width={80}
                  height={28}
                  className="h-7 w-auto object-contain opacity-60"
                />
                <Image
                  src="/DER_STANDARD_LOGO_schwarz.svg-2.png"
                  alt="Der Standard"
                  width={120}
                  height={28}
                  className="h-7 w-auto object-contain opacity-60"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Neurobiologin (M. Sc.)",
                "Zertifizierte Life Coachin",
                "Psychosoziale Beraterin",
                "Spezialisiert auf die Kinderfrage",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor: beige,
                    color: graphite,
                    border: `1px solid ${border}`,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "#374C7C", color: "#fff" }}>
        <div className={`${sectionWidth} py-10`}>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p
                className="mb-1 text-lg font-bold"
                style={{ fontFamily: "'Mansory', Georgia, serif", color: "#fff" }}
              >
                Madeleine Maßmann
              </p>
              <p className="text-sm opacity-85" style={{ fontFamily: "'Inter', sans-serif" }}>
                mail@madeleine-massmann.com
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <a
                href="https://willichkinder.at/impressum/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition hover:opacity-70"
              >
                Impressum
              </a>
              <a
                href="https://willichkinder.at/datenschutz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition hover:opacity-70"
              >
                Datenschutz
              </a>
            </div>
          </div>
          <div
            className="mt-8 border-t pt-6 text-center text-xs text-white/70"
            style={{ borderTop: "1px solid rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} Madeleine Maßmann. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </main>
  );
}
