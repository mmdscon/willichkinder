export default function DankePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <div
        className="max-w-2xl w-full rounded-3xl p-10 text-center shadow-sm my-12"
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
          style={{ fontFamily: "'Mansory', Georgia, serif", fontWeight: 700, color: "#1E1E1E" }}
        >
          Ein letzter Schritt noch …
        </h1>
        <p
          className="text-base leading-7 mb-6"
          style={{ color: "#5C5C5C", fontFamily: "'Inter', sans-serif" }}
        >
          Buche dir jetzt direkt deinen Wunschtermin, um schon bald echte Klarheit zur Kinderfrage zu erhalten.
        </p>

        {/* Calendly inline embed */}
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{ minHeight: 650 }}
        >
          <iframe
            src="https://calendly.com/madeleine-massmann-coaching/20-30-minuten-erstgesprach"
            width="100%"
            height="650"
            frameBorder="0"
            style={{ border: "none" }}
            title="Termin buchen"
          />
        </div>
      </div>
    </main>
  );
}
