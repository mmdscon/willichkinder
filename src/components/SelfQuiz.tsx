"use client";

import { useState } from "react";

const accent = "#D78742";
const graphite = "#1E1E1E";
const lightGray = "#5C5C5C";
const beige = "#F5F0E8";
const beigeLight = "#FAF7F2";
const border = "#E2D8C8";

type Outcome = "A" | "B" | "C";

interface Question {
  text: string;
  options: { label: string; emoji: string; outcome: Outcome }[];
}

const questions: Question[] = [
  {
    text: "Was ist das stärkste Gefühl beim Nachdenken über die Kinderfrage?",
    options: [
      { emoji: "😰", label: "Unsicherheit darüber, was richtig oder erwartet wird", outcome: "A" },
      { emoji: "🔄", label: "Gleichzeitiges Ziehen in zwei Richtungen", outcome: "B" },
      { emoji: "⏰", label: "Gefühl von Zeitdruck oder Dringlichkeit", outcome: "C" },
    ],
  },
  {
    text: "Was verursacht den größten inneren Druck?",
    options: [
      { emoji: "👥", label: "Erwartungen von Partner, Familie oder Gesellschaft", outcome: "A" },
      { emoji: "💭", label: "Eigene widersprüchliche Gefühle", outcome: "B" },
      { emoji: "😟", label: "Angst vor späterer Reue", outcome: "C" },
    ],
  },
  {
    text: "Wie erlebst du deine Gedanken zur Kinderfrage überwiegend?",
    options: [
      { emoji: "🧭", label: "Orientierung an Normen und äußeren Vorstellungen", outcome: "A" },
      { emoji: "⚖️", label: "Wechsel zwischen zwei inneren Positionen ohne Stabilisierung", outcome: "B" },
      { emoji: "🕰️", label: 'Denken in zeitlichen Grenzen oder "jetzt oder nie"-Rahmen', outcome: "C" },
    ],
  },
  {
    text: "Was trifft am ehesten auf dein inneres Erleben zu?",
    options: [
      { emoji: "😔", label: "Angst, Erwartungen nicht gerecht zu werden", outcome: "A" },
      { emoji: "🌊", label: "Beide Lebensentwürfe wirken emotional nachvollziehbar", outcome: "B" },
      { emoji: "🏃", label: "Angst, eine Entscheidung zeitlich zu verpassen", outcome: "C" },
    ],
  },
  {
    text: "Was ist aktuell am schwersten?",
    options: [
      { emoji: "🚧", label: "Eine Entscheidung gegen Erwartungen zu treffen", outcome: "A" },
      { emoji: "🔀", label: "Sich für eine der beiden inneren Seiten festzulegen", outcome: "B" },
      { emoji: "⌛", label: "Im Zustand der Unklarheit zu bleiben", outcome: "C" },
    ],
  },
];

function determineOutcome(scores: Record<Outcome, number>): Outcome {
  const { A, B, C } = scores;
  const max = Math.max(A, B, C);
  const tied = (["A", "B", "C"] as Outcome[]).filter((o) => scores[o] === max);
  if (tied.length === 1) return tied[0];
  // Tiebreaker rules
  if (tied.includes("A") && tied.includes("C")) return "C";
  if (tied.includes("A") && tied.includes("B")) return "B";
  if (tied.includes("B") && tied.includes("C")) return "B";
  return tied[0];
}

export default function SelfQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<Outcome, number>>({ A: 0, B: 0, C: 0 });
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
      // Last question answered → show loading then contact
      const result = determineOutcome(newScores);
      setOutcome(result);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowContact(true);
      }, 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);

    const payload = { name, email, quizOutcome: outcome, scores };
    const webhookUrl = process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
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

    window.location.href = `/quiz/ergebnis-${outcome?.toLowerCase()}`;
  };

  const progressPct = Math.round(((currentQ) / questions.length) * 100);

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
        <div className="mb-6 text-center space-y-2">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Fast geschafft
          </p>
          <h3
            className="text-2xl md:text-3xl leading-tight"
            style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
          >
            Dein Ergebnis kommt gleich.
          </h3>
          <p
            className="text-sm leading-7 max-w-md mx-auto"
            style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
          >
            Gib mir kurz deinen Namen und deine E-Mail-Adresse – dann zeige ich dir,
            was dich wirklich gerade innerlich beschäftigt.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Dein Name"
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
            placeholder="Deine E-Mail"
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
            🔒 Deine Daten werden vertraulich behandelt.
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
        {q.options.map((opt) => (
          <button
            key={opt.outcome}
            type="button"
            onClick={() => handleAnswer(opt.outcome)}
            className="w-full rounded-2xl px-5 py-4 text-center transition hover:opacity-90 active:scale-[0.99]"
            style={{
              backgroundColor: accent,
              border: `1.5px solid ${accent}`,
            }}
          >
            <span
              className="text-[15px] leading-6 font-medium"
              style={{ color: "#fff", fontFamily: "'Inter', sans-serif" }}
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
            onClick={() => {
              // Undo last answer
              setCurrentQ((q) => q - 1);
            }}
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
