import Link from "next/link";

export default function DankePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <div
        className="max-w-lg w-full rounded-3xl p-10 text-center shadow-sm"
        style={{ backgroundColor: "#fff", border: "1px solid #E2D8C8" }}
      >
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "#D78742" }}
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>

        <h1
          className="text-3xl mb-4"
          style={{ fontFamily: "'Mansory', Georgia, serif", color: "#1E1E1E" }}
        >
          Vielen Dank!
        </h1>
        <p
          className="text-base leading-7 mb-2"
          style={{ color: "#5C5C5C", fontFamily: "'Inter', sans-serif" }}
        >
          Ich habe deine Anfrage erhalten und melde mich in Kürze bei dir.
        </p>
        <p
          className="text-sm leading-6 mb-8"
          style={{ color: "#5C5C5C", fontFamily: "'Inter', sans-serif" }}
        >
          Das Erstgespräch ist kostenlos, unverbindlich und findet online statt.
          Ich freue mich darauf, dich kennenzulernen.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
          style={{
            backgroundColor: "#1E1E1E",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
