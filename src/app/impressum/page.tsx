import Link from "next/link";

export default function Impressum() {
  return (
    <main className="min-h-screen px-4 py-16" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm underline underline-offset-4 mb-8 block"
          style={{ color: "#5C5C5C", fontFamily: "'Inter', sans-serif" }}
        >
          ← Zurück zur Startseite
        </Link>

        <h1
          className="text-3xl mb-8"
          style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
        >
          Impressum
        </h1>

        <div
          className="space-y-4 text-sm leading-7"
          style={{ color: "#5C5C5C", fontFamily: "'Inter', sans-serif" }}
        >
          <div>
            <strong style={{ color: "#1E1E1E" }}>Angaben gemäß § 5 TMG</strong>
            <p className="mt-2">
              Madeleine Maßmann<br />
              [Straße & Hausnummer]<br />
              [PLZ & Ort]
            </p>
          </div>

          <div>
            <strong style={{ color: "#1E1E1E" }}>Kontakt</strong>
            <p className="mt-2">
              E-Mail: mail@madeleine-massmann.com
            </p>
          </div>

          <div>
            <strong style={{ color: "#1E1E1E" }}>Berufsbezeichnung</strong>
            <p className="mt-2">
              Life Coach, Neurobiologin (M.Sc.), Psychosoziale Beraterin
            </p>
          </div>

          <div>
            <strong style={{ color: "#1E1E1E" }}>Haftungsausschluss</strong>
            <p className="mt-2">
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
              übernommen werden.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
