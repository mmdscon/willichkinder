import Link from "next/link";

export default function Cookies() {
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
          Cookie-Richtlinien
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
              Was sind Cookies?
            </h2>
            <p>
              Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden, wenn
              Sie eine Website besuchen. Sie helfen dabei, bestimmte Einstellungen zu speichern
              und die Nutzererfahrung zu verbessern.
            </p>
          </section>

          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              Welche Cookies verwenden wir?
            </h2>

            <div
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: "#E2D8C8" }}
            >
              <table className="w-full text-xs">
                <thead style={{ backgroundColor: "#EDE6D6" }}>
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "#1E1E1E" }}>Name</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "#1E1E1E" }}>Anbieter</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "#1E1E1E" }}>Zweck</th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: "#1E1E1E" }}>Laufzeit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: "1px solid #E2D8C8" }}>
                    <td className="px-4 py-3">cookie_consent</td>
                    <td className="px-4 py-3">Eigener</td>
                    <td className="px-4 py-3">Speichert Ihre Cookie-Einwilligung</td>
                    <td className="px-4 py-3">Unbegrenzt</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid #E2D8C8" }}>
                    <td className="px-4 py-3">_fbp</td>
                    <td className="px-4 py-3">Meta (Facebook)</td>
                    <td className="px-4 py-3">Marketing & Remarketing (nur nach Einwilligung)</td>
                    <td className="px-4 py-3">90 Tage</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid #E2D8C8" }}>
                    <td className="px-4 py-3">_fbc</td>
                    <td className="px-4 py-3">Meta (Facebook)</td>
                    <td className="px-4 py-3">Conversion-Tracking (nur nach Einwilligung)</td>
                    <td className="px-4 py-3">90 Tage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2
              className="text-xl mb-3"
              style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
            >
              Einwilligung verwalten
            </h2>
            <p>
              Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie Ihren Browser-Speicher
              (localStorage) leeren. Die Marketing-Cookies (Meta Pixel) werden ausschließlich nach
              ausdrücklicher Einwilligung über unser Cookie-Banner gesetzt.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
