import Link from "next/link";

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>

        <div
          className="space-y-6 text-sm leading-7"
          style={{ color: "#5C5C5C", fontFamily: "'Inter', sans-serif" }}
        >
          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              1. Datenschutz auf einen Blick
            </h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              2. Verantwortliche Stelle
            </h2>
            <p>
              Madeleine Maßmann<br />
              E-Mail: mail@madeleine-massmann.com
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              3. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <p>
              Wenn Sie das Kontaktformular auf dieser Website ausfüllen, werden die von Ihnen
              angegebenen Daten (Name, E-Mail-Adresse, Telefonnummer) zum Zweck der Kontaktaufnahme
              verarbeitet. Die Daten werden nicht an Dritte weitergegeben.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertragsverhältnisses).
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              4. Meta Pixel (Facebook Pixel)
            </h2>
            <p>
              Diese Website nutzt den Meta Pixel der Meta Platforms Ireland Limited. Das Pixel wird
              nur nach Ihrer ausdrücklichen Einwilligung über das Cookie-Banner geladen.
            </p>
            <p className="mt-2">
              Weitere Informationen zu Meta:{" "}
              <a
                href="https://www.facebook.com/privacy/policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "#D78742" }}
              >
                Meta Datenschutzrichtlinie
              </a>
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              5. Cookies
            </h2>
            <p>
              Diese Website verwendet Cookies ausschließlich nach Ihrer Einwilligung.
              Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den Browser-Cache
              leeren oder uns kontaktieren.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung Ihrer personenbezogenen Daten sowie ein Widerspruchsrecht. Wenden Sie
              sich dazu an: mail@madeleine-massmann.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
