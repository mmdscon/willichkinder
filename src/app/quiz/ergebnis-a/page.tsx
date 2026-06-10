"use client";

import Image from "next/image";

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
              Du steckst im Gedankenkarussell fest.
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
              Vielleicht dachtest du bisher, du könntest die Kinderfrage einfach noch ein bisschen länger durchdenken.
            </p>
            <p
              className="text-base leading-8 mb-5 italic"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Noch ein Podcast.<br />
              Noch ein Gespräch.<br />
              Noch ein Wochenende zum Nachdenken.
            </p>
            <p
              className="text-base leading-8 mb-5"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Aber wenn du ehrlich bist, drehst du dich wahrscheinlich schon seit Monaten immer wieder um dieselben Gedanken.
            </p>
            <p
              className="text-base leading-8 mb-5"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Mal fühlt sich ein Leben mit Kind richtig an.
              Ein paar Stunden später bist du erleichtert, keines zu haben.
              Du hoffst auf den Moment, in dem plötzlich alles klar ist.
            </p>
            <p
              className="text-base leading-8 mb-5 font-semibold"
              style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
            >
              Diesen Moment gibt es für die meisten Frauen nicht.
            </p>
            <p
              className="text-base leading-8 mb-5"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Nicht weil mit ihnen etwas nicht stimmt.
              Sondern weil Klarheit selten entsteht, indem wir noch länger nachdenken.
            </p>
            <p
              className="text-base leading-8 mb-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Mit dir ist nichts falsch.
              Du steckst gerade in einem Gedankenkarussell fest, aus dem du allein nur schwer aussteigen kannst.
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
                Ich bin Madeleine – Spezialistin für die Kinderfrage. In einem kostenlosen Erstgespräch schauen wir gemeinsam, was dich im Gedankenkarussell festhält und wie du wieder herauskommst.
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
