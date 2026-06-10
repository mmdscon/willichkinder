"use client";

import Image from "next/image";

const accent = "#D78742";
const graphite = "#1E1E1E";
const lightGray = "#5C5C5C";
const beige = "#F5F0E8";
const beigeLight = "#FAF7F2";
const border = "#E2D8C8";
const sectionWidth = "mx-auto w-full max-w-[1200px] px-4 md:px-6";

export default function ErgebnisB() {
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
        <div className={`${sectionWidth} flex h-20 items-center justify-center`}>
          <a href="/">
            <Image src="/logo-header.webp" alt="Madeleine Maßmann" width={180} height={60} className="h-12 w-auto" />
          </a>
        </div>
      </header>

      {/* Result content */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#fff" }}>
        <div className="mx-auto w-full max-w-[760px] px-4 md:px-6">
          <div className="text-center mb-10">
            <div
              className="inline-block rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] mb-5"
              style={{ backgroundColor: beige, color: accent, border: `1px solid ${border}`, fontFamily: "'Inter', sans-serif" }}
            >
              Dein Ergebnis
            </div>
            <h1
              className="text-3xl md:text-4xl mb-4"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
            >
              Die Angst vor Reue hält dich zurück.
            </h1>
          </div>

          <div
            className="rounded-3xl p-8 md:p-10 mb-8"
            style={{ backgroundColor: beigeLight, border: `1px solid ${border}` }}
          >
            <p
              className="text-base leading-8 mb-5"
              style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
            >
              Vielleicht erkennst du dich in diesem Ergebnis mehr wieder, als dir gerade lieb ist.
            </p>
            <p
              className="text-base leading-8 mb-5"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Vielleicht glaubst du, dass du noch nicht weißt, ob du Kinder möchtest.
            </p>
            <p
              className="text-base leading-8 mb-5 font-semibold"
              style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
            >
              Ich glaube, dass du vor allem Angst hast, die falsche Entscheidung zu treffen.
            </p>
            <p
              className="text-base leading-8 mb-5"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Du stellst dir vor, wie es wäre, keine Kinder zu bekommen.
              Und du fragst dich, ob du es mit 60 bereuen würdest.
              Dann stellst du dir vor, Mutter zu sein.
              Und fragst dich, ob du dein jetziges Leben vermissen würdest.
            </p>
            <p
              className="text-base leading-8 mb-5"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              So wird jede Richtung zu einem Risiko.
              Und genau deshalb bleibst du stehen.
            </p>
            <p
              className="text-base leading-8 mb-5 font-semibold"
              style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
            >
              Nicht weil du unentschlossen bist.
              Sondern weil dir diese Entscheidung unglaublich wichtig ist.
            </p>
            <p
              className="text-base leading-8 mb-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Mit dir ist nichts falsch.
              Du wünschst dir keine perfekte Entscheidung.
              Du wünschst dir die Sicherheit, sie niemals zu bereuen.
            </p>

            <div
              className="rounded-2xl p-5 mb-8 text-center"
              style={{ backgroundColor: "#fff", border: `1.5px solid ${accent}` }}
            >
              <p
                className="text-base leading-7"
                style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
              >
                Wenn du beim Lesen gemerkt hast:<br />
                <em className="font-semibold" style={{ fontFamily: "'Mansory', Georgia, serif" }}>„Genau so fühlt es sich an."</em><br />
                Dann musst du mit dieser Frage nicht länger allein bleiben.
              </p>
            </div>

            <div className="text-center mb-6">
              <a
                onClick={() => document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-sm transition hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: accent, color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                Unverbindliches Erstgespräch anfragen
              </button>
            </div>

            <p
              className="text-sm leading-7 text-center"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Du musst heute keine Entscheidung treffen.<br />
              In den nächsten Tagen bekommst du von mir ein paar E-Mails mit Gedanken und Impulsen,
              die vielen Frauen geholfen haben zu verstehen, warum sie in der Kinderfrage feststecken
              und wie sie ihrer eigenen Antwort wieder näherkommen.
            </p>
          </div>
        </div>
      </section>

      {/* CTA – Madeleine */}
      <section className="py-14 md:py-20" style={{ backgroundColor: beige }}>
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 mb-14">
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
                Ich bin Madeleine – Spezialistin für die Kinderfrage. In einem kostenlosen Erstgespräch schauen wir gemeinsam, wie du die Angst vor Reue loslässt und zu einer Entscheidung kommst, hinter der du wirklich stehst.
              </p>
              <a
                onClick={() => document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-sm transition hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: accent, color: "#fff", fontFamily: "'Inter', sans-serif" }}
              >
                Kostenloses Gespräch buchen
              </button>
            </div>
          </div>

          <h3
            className="text-xl mb-6 text-center"
            style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
          >
            Direkt einen Termin auswählen
          </h3>
          <div id="termin" className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${border}`, minHeight: 650 }}>
            <iframe
              src="https://calendly.com/willichkinder/20-minuten-erstgesprach"
              width="100%"
              height="650"
              frameBorder="0"
              title="Termin buchen mit Madeleine"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#374C7C", color: "#fff" }}>
        <div className={`${sectionWidth} py-10`}>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="mb-1 text-lg font-bold" style={{ fontFamily: "'Mansory', Georgia, serif" }}>Madeleine Maßmann</p>
              <p className="text-sm opacity-85" style={{ fontFamily: "'Inter', sans-serif" }}>mail@madeleine-massmann.com</p>
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
