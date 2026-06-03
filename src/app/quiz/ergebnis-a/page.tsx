import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dein Ergebnis: Äußerer Druck – Madeleine Maßmann",
  description: "Dein Quiz-Ergebnis zeigt: Die Hauptbelastung entsteht durch äußere Erwartungen.",
};

const accent = "#D78742";
const graphite = "#1E1E1E";
const lightGray = "#5C5C5C";
const beige = "#F5F0E8";
const beigeLight = "#FAF7F2";
const border = "#E2D8C8";
const sectionWidth = "mx-auto w-full max-w-[1200px] px-4 md:px-6";

export default function ErgebnisA() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: beige }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "rgba(245, 240, 232, 0.75)",
          borderColor: border,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className={`${sectionWidth} flex h-20 items-center`}>
          <a href="/">
            <Image src="/logo-header.webp" alt="Madeleine Maßmann" width={180} height={60} className="h-12 w-auto" />
          </a>
        </div>
      </header>

      {/* Result Hero */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#fff" }}>
        <div className={`${sectionWidth} max-w-3xl mx-auto`}>
          <div className="text-center mb-10">
            <div
              className="inline-block rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ backgroundColor: beige, color: accent, border: `1px solid ${border}`, fontFamily: "'Inter', sans-serif" }}
            >
              Dein Ergebnis
            </div>
            <h1
              className="text-3xl md:text-4xl mb-5"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
            >
              Äußerer Druck und Anpassung
            </h1>
            <div
              className="rounded-3xl p-6 md:p-8 text-left"
              style={{ backgroundColor: beigeLight, border: `1px solid ${border}` }}
            >
              <p
                className="text-base leading-8 mb-4"
                style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
              >
                Die Hauptbelastung in deiner Situation entsteht durch <strong>äußere Erwartungen, Beziehungskontexte oder gesellschaftliche Normen</strong>. Du definierst deine eigene Position stark im Verhältnis zu anderen – und das kostet enorm viel Kraft.
              </p>
              <p
                className="text-base leading-8 mb-4"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                Du orientierst dich an dem, was andere von dir erwarten, hast Angst vor Bewertung und bist unsicher, was „richtig" ist. Deine eigene innere Stimme geht dabei oft unter.
              </p>
              <div
                className="rounded-2xl p-5 mt-6"
                style={{ backgroundColor: "#fff", border: `1.5px solid ${accent}` }}
              >
                <p
                  className="text-base font-semibold italic text-center"
                  style={{ color: graphite, fontFamily: "'Mansory', Georgia, serif" }}
                >
                  „Ich versuche, eine richtige Entscheidung im Außen zu treffen, statt bei mir selbst zu bleiben."
                </p>
              </div>
            </div>
          </div>

          {/* What this means */}
          <div className="mb-12 space-y-4">
            <h2
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
            >
              Was das für dich bedeutet
            </h2>
            {[
              {
                title: "Du weißt eigentlich mehr, als du denkst",
                text: "Die Unklarheit kommt nicht davon, dass du deine eigene Wahrheit nicht kennst – sondern davon, dass zu viele andere Stimmen gleichzeitig mitreden. Das erzeugt Lärm, keine Klarheit.",
              },
              {
                title: "Der Druck von außen ist real – aber nicht deine Wahrheit",
                text: "Gesellschaftliche Erwartungen, Familiendinmaik, Partnerschaftswünsche: All das hat Gewicht. Aber keine dieser Erwartungen gehört dir. In der Begleitung lernst du, beides zu unterscheiden.",
              },
              {
                title: "Klarheit entsteht durch Abgrenzung",
                text: "Sobald du den äußeren Lärm reduzierst und wieder bei dir selbst ankommst, taucht oft überraschend schnell eine innere Antwort auf – die schon lange da war.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: beigeLight, border: `1px solid ${border}` }}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: graphite, fontFamily: "'Mansory', Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-7" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA – Madeleine */}
      <section className="py-14 md:py-20" style={{ backgroundColor: beige }}>
        <div className={`${sectionWidth} max-w-3xl mx-auto`}>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Image src="/madeleine-portrait2.jpg" alt="Madeleine Maßmann" fill className="object-cover" />
            </div>
            <div>
              <h2
                className="text-2xl md:text-3xl mb-4"
                style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
              >
                Möchtest du dein Ergebnis mit einer Expertin besprechen?
              </h2>
              <p
                className="text-base leading-8 mb-6"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                Ich bin Madeleine – Spezialistin für die Kinderfrage. In einem kostenlosen Erstgespräch schauen wir gemeinsam, was hinter deinem äußeren Druck steckt – und was du wirklich brauchst, um wieder bei dir anzukommen.
              </p>
              <a
                href="/#anfrage"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-sm transition hover:opacity-90"
                style={{ backgroundColor: accent, color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                Kostenloses Gespräch buchen
              </a>
            </div>
          </div>

          {/* Calendly embed */}
          <div className="mt-14">
            <h3
              className="text-xl mb-6 text-center"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
            >
              Direkt einen Termin auswählen
            </h3>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${border}`, minHeight: 650 }}
            >
              <iframe
                src="https://calendly.com/madeleine-massmann/kennenlernen"
                width="100%"
                height="650"
                frameBorder="0"
                title="Termin buchen mit Madeleine"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#374C7C", color: "#fff" }}>
        <div className={`${sectionWidth} py-10`}>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="mb-1 text-lg font-bold" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
                Madeleine Maßmann
              </p>
              <p className="text-sm opacity-85" style={{ fontFamily: "'Inter', sans-serif" }}>
                mail@madeleine-massmann.com
              </p>
            </div>
            <div className="flex gap-4 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <a href="https://willichkinder.at/impressum/" target="_blank" rel="noopener noreferrer" className="text-white transition hover:opacity-70">Impressum</a>
              <a href="https://willichkinder.at/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-white transition hover:opacity-70">Datenschutz</a>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-white/70" style={{ borderTop: "1px solid rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Madeleine Maßmann. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </main>
  );
}
