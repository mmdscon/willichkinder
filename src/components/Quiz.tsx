"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { trackEvent } from "./MetaPixel";

const accent = "#D78742";
const graphite = "#1E1E1E";
const lightGray = "#5C5C5C";
const beige = "#F5F0E8";
const beigeLight = "#FAF7F2";
const border = "#E2D8C8";

type Step = 0 | "intro" | 1 | 2 | 3 | 4 | 5;

type Answers = {
  situation?: "Druck" | "Hin-und-Her" | "Zeitdruck";
  duration?: string;
  approach?: "Partnerschaft" | "Alleine";
};

const STEP_ORDER: Step[] = [0, "intro", 1, 2, 4, 5];

/* ── Primitives ── */

function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 rounded-full font-semibold tracking-wide active:scale-[0.99] disabled:opacity-60 transition"
      style={{
        backgroundColor: accent,
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        fontSize: "15px",
      }}
    >
      {children}
    </button>
  );
}

function ImageOption({
  title,
  subtitle,
  imageSrc,
  onClick,
}: {
  title: string;
  subtitle?: string;
  imageSrc: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl shadow-sm transition hover:shadow-md active:scale-[0.99]"
      style={{ border: `1px solid ${border}` }}
      aria-label={title}
    >
      <div className="relative aspect-square w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width:640px) 50vw, 33vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <div className="text-white text-[13px] sm:text-[15px] font-semibold leading-tight text-center">
            {title}
          </div>
          {subtitle && (
            <div className="mt-1 text-white/75 text-[11px] sm:text-[12px] leading-snug text-center">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        type="button"
        className="text-sm underline underline-offset-4 transition hover:opacity-70"
        style={{ color: lightGray }}
      >
        Zurück
      </button>
    </div>
  );
}

function ProgressBar({ step }: { step: Step }) {
  const pct =
    step === 0
      ? 12
      : step === "intro" || step === 1
      ? 30
      : step === 2
      ? 55
      : step === 4
      ? 82
      : 100;
  return (
    <div className="mt-6">
      <div
        className="h-1.5 w-full rounded-full"
        style={{ backgroundColor: border }}
      >
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h3
    className="text-center text-2xl sm:text-3xl leading-tight"
    style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
  >
    {children}
  </h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-center text-[15px] sm:text-base leading-7"
    style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
  >
    {children}
  </p>
);

/* ── Main ── */

export default function Quiz() {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [checking, setChecking] = useState(false);
  const sentLeadRef = useRef(false);

  const advanceStep = (current: Step) => {
    const idx = STEP_ORDER.indexOf(current);
    setStep(STEP_ORDER[Math.min(idx + 1, STEP_ORDER.length - 1)]);
  };

  const next = (data: Partial<Answers>, target?: Step) => {
    setAnswers((a) => ({ ...a, ...data }));
    if (target !== undefined) setStep(target);
    else advanceStep(step);
  };

  const back = () => {
    if (checking || step === 4) {
      setChecking(false);
      setStep(2);
      return;
    }
    const idx = STEP_ORDER.indexOf(step);
    setStep(STEP_ORDER[Math.max(idx - 1, 0)]);
  };

  const startChecking = () => {
    setChecking(true);
    setStep(4);
    setTimeout(() => {
      setChecking(false);
      setStep(5);
    }, 1800);
  };

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      ...answers,
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
    };
    if (!payload.name || !payload.email || !payload.phone) {
      alert("Bitte alle Felder ausfüllen.");
      return;
    }
    if (!sentLeadRef.current) {
      trackEvent("Lead", payload);
      sentLeadRef.current = true;
    }
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
    window.location.href = "/danke-termin";
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-3 sm:px-4">
      <div
        className="p-6 sm:p-8 space-y-6 rounded-3xl"
        style={{ backgroundColor: beigeLight, border: `1px solid ${border}` }}
      >
        {/* ── Step 0: Situation ── */}
        {step === 0 && (
          <>
            <div className="space-y-2">
              <H>Was beschäftigt dich bei der Kinderfrage am meisten?</H>
              <P>Klicke auf das Bild, das sich am stimmigsten anfühlt.</P>
            </div>
            {/* Mobile: 2 + 1 centered */}
            <div className="sm:hidden space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <ImageOption
                  title="Äußerer Druck"
                  subtitle="Familie, Partner, Zeit"
                  imageSrc="/q1.jpg"
                  onClick={() => next({ situation: "Druck" }, "intro")}
                />
                <ImageOption
                  title="Inneres Hin-und-Her"
                  subtitle="Ich weiß es einfach nicht"
                  imageSrc="/q2.jpg"
                  onClick={() => next({ situation: "Hin-und-Her" }, "intro")}
                />
              </div>
              <div className="mx-auto w-1/2">
                <ImageOption
                  title="Zeitdruck"
                  subtitle="Die biologische Uhr tickt"
                  imageSrc="/q3.jpg"
                  onClick={() => next({ situation: "Zeitdruck" }, "intro")}
                />
              </div>
            </div>
            {/* Desktop: 3 cols */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-3">
              <ImageOption
                title="Äußerer Druck"
                subtitle="Von Familie, Partner oder Gesellschaft"
                imageSrc="/q1.jpg"
                onClick={() => next({ situation: "Druck" }, "intro")}
              />
              <ImageOption
                title="Inneres Hin-und-Her"
                subtitle="Ich weiß einfach nicht, was ich will"
                imageSrc="/q2.jpg"
                onClick={() => next({ situation: "Hin-und-Her" }, "intro")}
              />
              <ImageOption
                title="Zeitdruck"
                subtitle="Die biologische Uhr spielt eine Rolle"
                imageSrc="/q3.jpg"
                onClick={() => next({ situation: "Zeitdruck" }, "intro")}
              />
            </div>
          </>
        )}

        {/* ── Intro + Step 1 ── */}
        {(step === "intro" || step === 1) && (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full sm:h-32 sm:w-32"
                style={{ border: `3px solid ${accent}` }}
              >
                <Image
                  src="/madeleine-portrait.jpg"
                  alt="Madeleine Maßmann"
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <p
                  className="font-bold text-lg"
                  style={{
                    color: graphite,
                    fontFamily: "'Mansory', Georgia, serif",
                  }}
                >
                  Hi, ich bin Madeleine.
                </p>
                <p
                  className="text-[14px] leading-6"
                  style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
                >
                  Ich begleite Frauen dabei, aus dem Gedankenchaos rund um die
                  Kinderfrage herauszufinden – ohne Druck, ohne Bewertung und
                  ohne eine Richtung vorzugeben.
                </p>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${border}` }} />

            <div className="space-y-2">
              <H>Wie lange trägst du die Frage schon mit dir?</H>
              <P>Es geht nur um ein Gefühl – keine genauen Daten nötig.</P>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { t: "Erst seit Kurzem", d: "Wenige Wochen oder Monate" },
                { t: "Schon länger", d: "Einige Monate bis ein Jahr" },
                { t: "Seit Jahren", d: "Sie begleitet mich schon lange" },
                { t: "Schwer zu sagen", d: "Ich kann es nicht genau benennen" },
              ].map((o) => (
                <button
                  key={o.t}
                  type="button"
                  onClick={() => next({ duration: o.t }, 2)}
                  className="w-full rounded-2xl px-5 py-4 text-center shadow-sm transition hover:shadow-md active:scale-[0.99]"
                  style={{ border: `1px solid ${border}`, backgroundColor: "#FFFFFF" }}
                >
                  <div
                    className="text-[15px] font-semibold"
                    style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
                  >
                    {o.t}
                  </div>
                  <div
                    className="mt-1 text-[13px] leading-5"
                    style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
                  >
                    {o.d}
                  </div>
                </button>
              ))}
            </div>

            <BackButton onClick={back} />
          </div>
        )}

        {/* ── Step 2: Partnerschaft ── */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <H>Trägst du die Frage alleine oder in einer Partnerschaft?</H>
              <P>Beide Wege sind möglich – ich möchte nur besser verstehen, wo du stehst.</P>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ImageOption
                title="In einer Partnerschaft"
                subtitle="Wir haben unterschiedliche Wünsche"
                imageSrc="/q4.jpg"
                onClick={() => {
                  setAnswers((a) => ({ ...a, approach: "Partnerschaft" }));
                  startChecking();
                }}
              />
              <ImageOption
                title="Ganz alleine"
                subtitle="Ich trage diese Frage für mich"
                imageSrc="/q5.jpg"
                onClick={() => {
                  setAnswers((a) => ({ ...a, approach: "Alleine" }));
                  startChecking();
                }}
              />
            </div>
            <BackButton onClick={back} />
          </div>
        )}

        {/* ── Step 4: Loading ── */}
        {step === 4 && checking && (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4"
              style={{ borderColor: border, borderTopColor: accent }}
            />
            <P>Einen Moment – ich schaue, was für dich passend ist …</P>
          </div>
        )}

        {/* ── Step 5: Kontakt ── */}
        {step === 5 && (
          <div className="space-y-5">
            <div className="flex justify-center">
              <div
                className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-full shrink-0"
                style={{ border: `3px solid ${accent}` }}
              >
                <Image
                  src="/madeleine-portrait.jpg"
                  alt="Madeleine Maßmann"
                  fill
                  className="object-cover object-top"
                  sizes="144px"
                />
              </div>
            </div>
            <div className="space-y-2">
              <H>Ein erster Schritt zu mehr Klarheit</H>
              <P>
                Ich lade dich herzlich zu einem kostenlosen Erstgespräch ein –
                persönlich, ohne Druck und ganz in deinem Tempo.
              </P>
            </div>
            <div
              className="rounded-2xl p-4 text-center"
              style={{ backgroundColor: beige, border: `1px solid ${border}` }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
              >
                ✓ Das Erstgespräch ist kostenlos & unverbindlich
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                15–20 Minuten · Online · Keine Verpflichtung
              </p>
            </div>
            <form onSubmit={submitLead} className="space-y-3 text-center">
              <input type="hidden" name="situation" value={answers.situation || ""} />
              <input type="hidden" name="duration" value={answers.duration || ""} />
              <input type="hidden" name="approach" value={answers.approach || ""} />
              <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />
              <div className="grid gap-3">
                <input
                  className="h-12 rounded-full px-4 text-center focus:outline-none w-full transition"
                  style={{
                    border: `1px solid ${border}`,
                    backgroundColor: "#FFFFFF",
                    color: graphite,
                    fontFamily: "'Inter', sans-serif",
                  }}
                  name="name"
                  placeholder="Dein Name"
                  required
                />
                <input
                  className="h-12 rounded-full px-4 text-center focus:outline-none w-full transition"
                  style={{
                    border: `1px solid ${border}`,
                    backgroundColor: "#FFFFFF",
                    color: graphite,
                    fontFamily: "'Inter', sans-serif",
                  }}
                  type="email"
                  name="email"
                  placeholder="Deine E-Mail"
                  required
                />
                <input
                  className="h-12 rounded-full px-4 text-center focus:outline-none w-full transition"
                  style={{
                    border: `1px solid ${border}`,
                    backgroundColor: "#FFFFFF",
                    color: graphite,
                    fontFamily: "'Inter', sans-serif",
                  }}
                  type="tel"
                  name="phone"
                  placeholder="Telefonnummer"
                  required
                  pattern="^[0-9+()\s-]{6,}$"
                />
              </div>
              <PrimaryButton type="submit">
                Kostenloses Erstgespräch anfragen →
              </PrimaryButton>
              <div className="flex flex-col items-center gap-1 pt-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill={accent}
                      />
                    </svg>
                  ))}
                </div>
                <p
                  className="text-[12px] font-semibold"
                  style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
                >
                  95 % Weiterempfehlungsrate · 100+ begleitete Frauen
                </p>
              </div>
              <p
                className="text-xs"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                🔒 Deine Daten werden vertraulich behandelt und nicht
                weitergegeben.
              </p>
              <BackButton
                onClick={() => {
                  setChecking(false);
                  setStep(2);
                }}
              />
            </form>
          </div>
        )}

        <ProgressBar step={step} />
      </div>
    </div>
  );
}
