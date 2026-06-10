"use client";

import { useState } from "react";
import { trackEvent } from "./MetaPixel";

const accent = "#D78742";
const graphite = "#1E1E1E";
const lightGray = "#5C5C5C";
const beige = "#F5F0E8";
const beigeLight = "#FAF7F2";
const border = "#E2D8C8";

const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL || "";

type Outcome = 1 | 2 | 3;

interface Question {
  text: string;
  image?: string;
  options: { label: string; outcome: Outcome }[];
}

const questions: Question[] = [
  {
    text: "Welcher Gedanke beschreibt deine Situation am besten?",
    options: [
      { label: "Ich warte darauf, dass ich irgendwann einfach weiß, ob ich Kinder will.", outcome: 1 },
      { label: "Ich habe das Gefühl, dass ich mich endlich entscheiden müsste, aber ich komme einfach nicht zu einer Antwort.", outcome: 2 },
      { label: "Mal kann ich mir ein Kind vorstellen. Im nächsten Moment fühlt sich ein Leben ohne Kinder viel stimmiger an.", outcome: 3 },
    ],
  },
  {
    text: "Was macht dir im Moment am meisten Druck?",
    options: [
      { label: "Dass die Kinderfrage immer öfter zwischen mir und meinem Partner steht.", outcome: 1 },
      { label: "Dass ich Angst habe, meine Entscheidung irgendwann zu bereuen.", outcome: 2 },
      { label: "Dass ich nicht weiß, wie viel Zeit mir für diese Entscheidung noch bleibt.", outcome: 3 },
    ],
  },
  {
    text: "Was passiert, wenn du glaubst, eine Antwort gefunden zu haben?",
    options: [
      { label: "Ich drehe mich seit Monaten immer wieder um dieselben Gedanken.", outcome: 1 },
      { label: "Kurz fühlt sie sich richtig an. Und dann kommen sofort wieder Zweifel.", outcome: 2 },
      { label: "Plötzlich finde ich wieder tausend Gründe für die andere Richtung.", outcome: 3 },
    ],
  },
  {
    text: "Welcher Satz könnte von dir stammen?",
    options: [
      { label: "Ich beneide Frauen, die sich einfach sicher sind.", outcome: 1 },
      { label: "Ich habe das Gefühl, dass alle anderen eine Meinung dazu haben, nur ich nicht.", outcome: 2 },
      { label: "Ich frage mich manchmal, ob ich überhaupt noch weiß, was ich selbst will.", outcome: 3 },
    ],
  },
  {
    text: "Was wünschst du dir gerade am meisten?",
    options: [
      { label: "Dass dieses tägliche Gedankenkarussell endlich aufhört.", outcome: 1 },
      { label: "Endlich eine Entscheidung treffen zu können, hinter der ich wirklich stehe.", outcome: 2 },
      { label: "Wieder zu spüren, was ich selbst will, ohne Angst, Druck oder Erwartungen von außen.", outcome: 3 },
    ],
  },
];

function determineOutcome(scores: Record<Outcome, number>): Outcome {
  const max = Math.max(scores[1], scores[2], scores[3]);
  const tied = ([1, 2, 3] as Outcome[]).filter((o) => scores[o] === max);
  if (tied.length === 1) return tied[0];
  // Bei Gleichstand immer Ergebnis 1
  return 1;
}

export default function SelfQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<Outcome, number>>({ 1: 0, 2: 0, 3: 0 });
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAnswer = (o: Outcome) => {
    const newScores = { ...scores, [o]: scores[o] + 1 };
    setScores(newScores);

    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      const result = determineOutcome(newScores);
      setOutcome(result);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowContact(true);
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);

    const payload = { name, email, quizOutcome: outcome, scores };

    trackEvent("Lead", payload);

    if (MAKE_WEBHOOK_URL) {
      try {
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {}
    }
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}

    const slug = outcome === 1 ? "ergebnis-a" : outcome === 2 ? "ergebnis-b" : "ergebnis-c";
    window.location.href = `/quiz/${slug}`;
  };

  const progressPct = Math.round((currentQ / questions.length) * 100);

  // Loading state
  if (loading) {
    return (
      <div
        className="mx-auto w-full max-w-2xl rounded-3xl px-6 py-16 text-center"
        style={{ backgroundColor: beigeLight, border: `1px solid ${border}` }}
      >
        <div
          className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4"
          style={{ borderColor: border, borderTopColor: accent }}
        />
        <p
          className="text-base leading-8"
          style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
        >
          Ich werte deine Antworten aus …
        </p>
      </div>
    );
  }

  // Contact form
  if (showContact) {
    return (
      <div
        className="mx-auto w-full max-w-2xl rounded-3xl px-6 py-10"
        style={{ backgroundColor: beigeLight, border: `1px solid ${border}` }}
      >
        <div className="mb-8 text-center space-y-3">
          <div
            className="inline-block text-2xl"
            role="img"
            aria-label="Herz"
          >
            💛
          </div>
          <h3
            className="text-2xl md:text-3xl leading-tight"
            style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
          >
            Fast geschafft.
          </h3>
          <p
            className="text-sm leading-7 max-w-md mx-auto"
            style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
          >
            Vielleicht hast du beim Beantworten der Fragen gemerkt:
            <br />
            <em>„Genau das geht seit Monaten in meinem Kopf vor."</em>
          </p>
          <p
            className="text-sm leading-7 max-w-md mx-auto"
            style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
          >
            Trag jetzt deinen Vornamen und deine E-Mail-Adresse ein und erfahre sofort,
            was dich bei der Kinderfrage gerade wirklich festhält.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Dein Vorname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-12 rounded-full px-5 text-center focus:outline-none transition"
            style={{
              border: `1px solid ${border}`,
              backgroundColor: "#fff",
              color: graphite,
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <input
            type="email"
            placeholder="Deine E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 rounded-full px-5 text-center focus:outline-none transition"
            style={{
              border: `1px solid ${border}`,
              backgroundColor: "#fff",
              color: graphite,
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-full font-semibold text-sm transition hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
            style={{
              backgroundColor: accent,
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {submitting ? "Wird gesendet …" : "Mein Ergebnis anzeigen →"}
          </button>
          <p
            className="text-center text-xs"
            style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
          >
            🔒 Deine Daten werden vertraulich behandelt und nicht weitergegeben.
          </p>
        </form>
      </div>
    );
  }

  // Quiz questions
  const q = questions[currentQ];

  return (
    <div
      className="mx-auto w-full max-w-2xl rounded-3xl px-6 py-8"
      style={{ backgroundColor: beigeLight, border: `1px solid ${border}` }}
    >
      {/* Header */}
      <div className="mb-6 text-center space-y-1">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] opacity-50"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Frage {currentQ + 1} von {questions.length}
        </p>
        <h3
          className="text-xl md:text-2xl leading-snug"
          style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
        >
          {q.text}
        </h3>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: border }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, backgroundColor: accent }}
          />
        </div>
      </div>

      {/* Answer options */}
      <div className="space-y-3">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAnswer(opt.outcome)}
            className="w-full rounded-2xl px-5 py-4 text-left transition hover:shadow-md active:scale-[0.99]"
            style={{
              backgroundColor: "#fff",
              border: `1px solid ${border}`,
            }}
          >
            <span
              className="text-[15px] leading-6"
              style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
            >
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {currentQ > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm underline underline-offset-4 transition hover:opacity-70"
            style={{ color: lightGray }}
          >
            Zurück
          </button>
        </div>
      )}
    </div>
  );
}
