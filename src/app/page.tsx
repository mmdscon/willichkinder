"use client";

import Image from "next/image";
import { useState } from "react";
import Quiz from "@/components/Quiz";
import { trackEvent } from "@/components/MetaPixel";
import {
  Check,
  Compass,
  HeartHandshake,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  ChevronDown,
} from "lucide-react";

/* ── Design tokens ── */
const accent = "#D78742";
const graphite = "#1E1E1E";
const lightGray = "#5C5C5C";
const beige = "#F5F0E8";
const beigeLight = "#FAF7F2";
const border = "#E2D8C8";
const sectionWidth = "mx-auto w-full max-w-[1200px] px-4 md:px-6";

/* ── Data ── */
const featureCards = [
  {
    icon: Compass,
    title: "Du drehst dich seit Monaten im Kreis",
    text: "Mal kannst du dir Kinder vorstellen. Mal fühlt sich genau das völlig falsch an. Dieses Hin-und-Her kostet enorm viel Kraft.",
  },
  {
    icon: HeartHandshake,
    title: "Der Druck wächst – von außen und innen",
    text: "Familie, Partner, die biologische Uhr. Und gleichzeitig weißt du, dass du diese Entscheidung nur für dich treffen kannst.",
  },
  {
    icon: Sparkles,
    title: "Jede mögliche Entscheidung fühlt sich falsch an",
    text: "Was, wenn du später bereust? Was, wenn du in ein Leben rutschst, das sich nicht richtig anfühlt? Diese Fragen lassen dich nicht los.",
  },
];

const processCards = [
  {
    icon: MessageCircleHeart,
    title: "Du wirst gehört",
    text: "Bring alles mit – Erschöpfung, Zweifel, Sehnsucht oder einfach dieses diffuse Gefühl, nicht weiterzukommen.",
  },
  {
    icon: Compass,
    title: "Wir sortieren gemeinsam",
    text: "Nicht nur das, was sich zeigt – sondern was wirklich dahintersteckt. Sanft, klar und ohne eine Richtung vorzugeben.",
  },
  {
    icon: ShieldCheck,
    title: "Kein Druck, keine Erwartung",
    text: "Du musst dich zu nichts entscheiden. Das Gespräch gehört dir – ganz.",
  },
  {
    icon: Users,
    title: "Wir spüren, ob es passt",
    text: "Eine gute Begleitung entsteht aus Vertrauen. Das erste Gespräch ist der Moment, in dem wir das gemeinsam wahrnehmen.",
  },
];

const reviews = [
  {
    text: "Ich bin so froh, dass ich auf Madeleine gestoßen bin. Jetzt, nach dem Coaching, fühlt es sich an, als wäre mir ein Stein vom Herzen gefallen. Ich habe so viel mehr Klarheit – nicht nur bzgl. der Kinderfrage, sondern auch über mich als Person.",
    author: "Katja, 34",
  },
  {
    text: "Madeleine ist eine wundervolle und super professionelle Coachin! Sie coacht mit einem tollen Mix aus analytischen und emotionaleren Methoden. Von Herzen danke!",
    author: "D., 36",
  },
  {
    text: "Ich habe endlich das Gefühl, meiner eigenen Wahrheit näher zu sein. Madeleine hat mir einen Raum gegeben, in dem ich alles aussprechen durfte – ohne bewertet zu werden.",
    author: "Lena, 31",
  },
];

const faqs = [
  {
    q: "Ist der Einstieg bewusst einfach und unverbindlich gehalten?",
    a: "Ja. Das Erstgespräch ist kostenlos und dauert 15–20 Minuten. Es gibt keine Verpflichtung und keinen Druck, direkt ein Coaching zu buchen. Du entscheidest, ob und wie wir weitermachen.",
  },
  {
    q: "Bist du für oder gegen Kinder?",
    a: "Weder noch. Meine Arbeit ist vollständig neutral. Es geht nicht darum, dich in eine Richtung zu drängen, sondern dir zu helfen, deine eigene Wahrheit zu finden.",
  },
  {
    q: "Begleitest du auch Paare?",
    a: "Ja. Wenn ihr als Paar unterschiedliche Wünsche habt oder gemeinsam Klarheit sucht, begleite ich euch gerne. Sprich mich im Erstgespräch darauf an.",
  },
  {
    q: "Was ist, wenn ich mich nach 10 Wochen noch nicht entschieden habe?",
    a: "Das ist völlig in Ordnung. Das Ziel ist nicht, dass du am Ende eine Entscheidung unterschreibst, sondern dass du aus dem inneren Druck und dem Gedankenchaos herauskommst. Viele Frauen treffen ihre Entscheidung erst später – aber aus einer ganz anderen inneren Position.",
  },
  {
    q: "Ist das Coaching ein Ersatz für Psychotherapie?",
    a: "Nein. Life Coaching ist keine Therapie und kein Ersatz für therapeutische oder medizinische Behandlung. Wenn du dir unsicher bist, ob Coaching oder Therapie das Richtige für dich ist, sprechen wir im Erstgespräch darüber.",
  },
];

/* ── Components ── */

function Button({
  children,
  href,
  onClick,
  variant = "accent",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "accent" | "dark" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-sm transition hover:opacity-90 active:scale-[0.98]";
  const styles =
    variant === "accent"
      ? { backgroundColor: accent, color: "#fff" }
      : variant === "dark"
      ? { backgroundColor: graphite, color: "#fff" }
      : { backgroundColor: "transparent", border: `2px solid ${accent}`, color: accent };

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`} style={styles}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${className}`} style={styles}>
      {children}
    </button>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition"
      style={{ borderColor: border, backgroundColor: open ? "#fff" : beigeLight }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span
          className="font-semibold text-[15px] leading-snug"
          style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
        >
          {q}
        </span>
        <ChevronDown
          className={`shrink-0 h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: accent }}
        />
      </button>
      {open && (
        <div
          className="px-6 pb-5 text-sm leading-7"
          style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

/* ── Page ── */

export default function Page() {
  return (
    <main
      className="min-h-screen text-[color:var(--graphite)]"
      style={
        {
          "--accent": accent,
          "--graphite": graphite,
          "--lightGray": lightGray,
          "--beige": beige,
          "--border": border,
          backgroundColor: beige,
        } as React.CSSProperties
      }
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: graphite, borderColor: "#2A2A2A" }}
      >
        <div className={`${sectionWidth} flex h-20 items-center justify-between`}>
          <a href="#start" className="flex items-center">
            <Image
              src="/logo-header.webp"
              alt="Madeleine Maßmann – Entscheiden ohne Druck"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#C8C0B0" }}>
            <a href="#angebot" className="hover:text-white transition">Angebot</a>
            <a href="#ueber-mich" className="hover:text-white transition">Über mich</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </nav>

          <Button
            href="#anfrage"
            variant="accent"
            onClick={() => trackEvent("ClickCTA", { location: "header" })}
          >
            Kostenloses Erstgespräch
          </Button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="start" className="relative">
        <div className="relative aspect-[4/5] w-full md:aspect-[16/9]">
          <Image
            src="/hero.jpg"
            alt="Madeleine Maßmann – Coaching Kinderfrage"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

          <div className="absolute inset-x-0 bottom-0">
            <div className={`${sectionWidth} pb-10 md:pb-16`}>
              <div className="mx-auto max-w-4xl text-center text-white">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.22em] mb-4 opacity-80"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  10-wöchige 1:1-Begleitung
                </p>
                <h1
                  className="text-3xl font-bold leading-tight md:text-5xl"
                  style={{ fontFamily: "'Mansory', Georgia, serif" }}
                >
                  Entscheiden ohne{" "}
                  <span
                    style={{
                      textDecoration: "underline",
                      textDecorationColor: accent,
                      textDecorationThickness: "3px",
                    }}
                  >
                    Druck
                  </span>
                  <br />
                  <span className="opacity-90">– die Kinderfrage klären</span>
                </h1>

                <p
                  className="mt-5 text-sm text-white/85 md:text-lg leading-8 max-w-2xl mx-auto"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Du weißt nicht, ob du Kinder willst – und das Hin-und-Her raubt dir Energie. In
                  meinem Coaching sortieren wir gemeinsam, was wirklich in dir steckt. Ohne Bewertung.
                  Ohne Richtung vorzugeben.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    href="#anfrage"
                    variant="accent"
                    onClick={() => trackEvent("ClickCTA", { location: "hero" })}
                    className="text-base px-8 py-4"
                  >
                    Kostenloses Erstgespräch vereinbaren
                  </Button>
                </div>

                <div className="mt-5 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p
                    className="text-sm font-semibold text-white/90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    100+ Frauen begleitet · 95 % Weiterempfehlungsrate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ backgroundColor: graphite }}>
        <div className={`${sectionWidth} py-8`}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: "5+", label: "Jahre Erfahrung mit der Kinderfrage" },
              { n: "100+", label: "Frauen auf dem Weg zur Klarheit" },
              { n: "95 %", label: "Weiterempfehlungsrate" },
              { n: "1.000+", label: "Stunden Coaching & Weiterbildung" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "'Mansory', Georgia, serif", color: accent }}
                >
                  {s.n}
                </div>
                <div
                  className="mt-1 text-xs leading-5"
                  style={{ color: "#C8C0B0", fontFamily: "'Inter', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 pain-point cards ── */}
      <section className="pt-16 pb-14 md:pt-20 md:pb-20">
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              Kennst du das?
            </h2>
            <p
              className="mt-3 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Wenn du dich in einem dieser Sätze wiedererkennst, bist du hier genau richtig.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-3xl px-6 py-8 text-center"
                  style={{ backgroundColor: "#fff", border: `1px solid ${border}` }}
                >
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: accent }}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: graphite, fontFamily: "'Mansory', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-7"
                    style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Image + text ── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={`${sectionWidth} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src="/madeleine-couch.jpg"
              alt="Madeleine Maßmann – Coaching"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60 mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Warum Grübeln allein nicht reicht
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              Du suchst schon lange nach einer Antwort – und je mehr du nachdenkst, desto unklarer wird es.
            </h2>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Der Druck wächst. Von außen und von innen. Vielleicht bist du in einer Partnerschaft mit
              unterschiedlichen Wünschen. Oder du trägst diese Frage ganz allein.
            </p>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Und dann kreisen die Gedanken: Was, wenn ich zu spät dran bin? Was, wenn ich später etwas
              bereue? Viele Frauen kommen genau an diesem Punkt zu mir.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Aus dem Gedankenchaos herausfinden",
                "Ängste und Blockaden sanft auflösen",
                "Eine Entscheidung treffen, die sich stimmig anfühlt",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: accent }}
                  >
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <p
                    className="text-sm leading-7"
                    style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width quote image ── */}
      <section>
        <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[16/6]">
          <Image
            src="/madeleine-couch2.jpg"
            alt="Madeleine Maßmann – Haltung"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className={`${sectionWidth} absolute inset-0 flex items-center`}>
            <div className="max-w-3xl">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Meine Haltung
              </p>
              <blockquote
                className="text-2xl font-bold leading-relaxed text-white md:text-4xl"
                style={{ fontFamily: "'Mansory', Georgia, serif" }}
              >
                „Das Problem ist nicht die Entscheidung. Sondern der Druck, unter dem du sie treffen sollst."
              </blockquote>
              <p
                className="mt-4 text-white/80 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                – Madeleine Maßmann
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Angebot / Process ── */}
      <section id="angebot" className="py-14 md:py-20">
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60 mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Entscheiden ohne Druck
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              Dein Weg zur Klarheit in drei Schritten
            </h2>
            <p
              className="mt-3 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Ich bin weder für noch gegen Kinder – ich helfe dir, deine Wahrheit zu finden.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                step: "01",
                title: "Kostenloses Kennenlerngespräch",
                text: "In einem unverbindlichen 15–20-minütigen Gespräch analysieren wir deine aktuelle Situation. Du schilderst, was dich blockiert. Durch gezielte, einfühlsame Fragen gewinnst du bereits während unseres Austauschs an Klarheit.",
              },
              {
                step: "02",
                title: "10 Wochen 1:1-Begleitung",
                text: "In regelmäßigen 1:1-Video-Sessions erarbeiten wir Lösungen. Du erhältst individuell abgestimmte Übungen und Reflexionsfragen, um innere Blockaden zu lösen und festgefahrene Muster in Bewegung zu bringen.",
              },
              {
                step: "03",
                title: "Klar. Sortiert. Entschieden.",
                text: "Nach zehn Wochen spürst du eine deutliche innere Veränderung. Der innere Druck nachlässt. Die Frage dominiert nicht länger deinen Alltag. Aus dieser gestärkten Position wird eine klare, selbstbestimmte Entscheidung möglich.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm"
                style={{ borderColor: border }}
              >
                <span
                  className="absolute top-4 right-5 text-6xl font-bold leading-none select-none"
                  style={{ color: accent, opacity: 0.18, fontFamily: "'Mansory', Georgia, serif" }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-xl font-bold leading-tight pr-12"
                  style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="#anfrage" variant="accent" onClick={() => trackEvent("ClickCTA", { location: "angebot" })}>
              Kostenloses Erstgespräch vereinbaren
            </Button>
          </div>
        </div>
      </section>

      {/* ── For whom ── */}
      <section style={{ backgroundColor: "#fff" }} className="py-14 md:py-20">
        <div className={sectionWidth}>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl"
                style={{ fontFamily: "'Mansory', Georgia, serif" }}
              >
                Dieses Coaching ist für dich, wenn …
              </h2>
              <div className="mt-6 space-y-3">
                {[
                  "du dich bei der Kinderfrage gedanklich im Kreis drehst",
                  "du dich nach innerer Klarheit sehnst, anstatt endlos zu grübeln",
                  "du eine Entscheidung ohne Druck, Angst vor Reue oder fremde Erwartungen treffen willst",
                  "du zwischen Vernunft, Angst und dem Wunsch nach Freiheit feststeckst",
                  "die Kinderfrage dir im Alltag Energie und Leichtigkeit raubt",
                  "du dir wünschst, wieder Vertrauen in dich und dein Bauchgefühl zu haben",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: accent }}
                    >
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <p
                      className="text-sm leading-7"
                      style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                className="text-3xl md:text-4xl mb-6"
                style={{ fontFamily: "'Mansory', Georgia, serif" }}
              >
                Das verändert sich für dich
              </h2>
              {[
                "Du wachst morgens ohne inneren Druck auf",
                "Du erkennst, was wirklich zu dir gehört",
                "Äußere Einflüsse bringen dich nicht mehr aus der Ruhe",
                "Deine Gedanken klären sich",
                "Du triffst eine Entscheidung, die sich stimmig anfühlt",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 mb-3">
                  <div
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: beigeLight, border: `2px solid ${accent}` }}
                  >
                    <Check className="h-3 w-3" style={{ color: accent }} />
                  </div>
                  <p
                    className="text-sm leading-7"
                    style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How the initial call works ── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: beige }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              So läuft das Erstgespräch ab
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {processCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl p-6 text-center"
                  style={{ backgroundColor: "#fff", border: `1px solid ${border}` }}
                >
                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: accent }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3
                    className="font-bold text-base"
                    style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quiz / Anfrage ── */}
      <section id="anfrage" className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60 mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Erster Schritt
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              Finde heraus, ob meine Begleitung zu dir passt
            </h2>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Beantworte drei kurze Fragen – und wir schauen gemeinsam, wie ich dir helfen kann.
            </p>
          </div>
          <Quiz />
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: beige }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              So fühlt es sich an, wenn innere Klarheit entsteht
            </h2>
            <p
              className="mt-3 text-sm"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Erfahrungen von Frauen aus der 10-wöchigen Begleitung
            </p>
          </div>

          <div className="overflow-x-auto pb-4 [scrollbar-width:none] md:overflow-visible">
            <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-[88%] rounded-3xl bg-white p-6 shadow-sm md:min-w-0"
                  style={{ border: `1px solid ${border}` }}
                >
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p
                    className="text-sm leading-7"
                    style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
                  >
                    „{review.text}"
                  </p>
                  <p
                    className="mt-4 text-sm font-semibold"
                    style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}
                  >
                    – {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Über mich ── */}
      <section id="ueber-mich" className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={`${sectionWidth} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src="/madeleine-portrait.jpg"
              alt="Madeleine Maßmann"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60 mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Über Madeleine Maßmann
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              Hi, ich bin Madeleine.
            </h2>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Ich weiß aus eigener Erfahrung, wie quälend die Kinderfrage sein kann, wenn man einfach
              keine klare Antwort in sich findet. Nicht, weil man sich nicht genug mit sich beschäftigt.
              Sondern weil zu viele Stimmen gleichzeitig mitreden.
            </p>
            <p
              className="mt-4 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Als Neurobiologin (M.Sc.), zertifizierte Life Coachin und psychosoziale Beraterin
              verbinde ich wissenschaftliche Klarheit mit empathischer, strukturierter Begleitung.
            </p>

            {/* Press logos */}
            <div className="mt-6 mb-1">
              <p className="text-xs uppercase tracking-widest opacity-40 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                Über meine Arbeit wurde berichtet in
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <Image src="/press-kurier.webp" alt="Kurier" width={80} height={28} className="h-7 w-auto object-contain opacity-60" />
                <Image src="/press-oon.webp" alt="OÖNachrichten" width={80} height={28} className="h-7 w-auto object-contain opacity-60" />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Neurobiologin (M. Sc.)",
                "Zertifizierte Life Coachin",
                "Psychosoziale Beraterin",
                "Spezialisiert auf die Kinderfrage",
              ].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor: beige,
                    color: graphite,
                    border: `1px solid ${border}`,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Button href="#anfrage" variant="accent" onClick={() => trackEvent("ClickCTA", { location: "ueber-mich" })}>
                Kostenloses Erstgespräch vereinbaren
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Investition ── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: beige }}>
        <div className={sectionWidth}>
          <div className="mx-auto max-w-2xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60 mb-3"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Investition
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              10 Wochen 1:1-Begleitung
            </h2>
            <p
              className="mt-3 text-base leading-8"
              style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
            >
              Intensiv, individuell abgestimmt – mit persönlicher Unterstützung auch zwischen den Sitzungen.
            </p>

            <div
              className="mt-8 rounded-3xl p-8 md:p-10"
              style={{ backgroundColor: "#fff", border: `1px solid ${border}` }}
            >
              <div
                className="text-5xl font-bold mb-1"
                style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}
              >
                1.397 €
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                Gesamtinvestition · Ratenzahlung möglich: 3 × 499 €
              </p>
              <Button href="#anfrage" variant="accent" onClick={() => trackEvent("ClickCTA", { location: "investition" })}>
                Kostenloses Erstgespräch vereinbaren
              </Button>
              <p
                className="mt-3 text-xs"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                Das Erstgespräch ist kostenlos & unverbindlich.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Mansory', Georgia, serif" }}
            >
              Häufige Fragen
            </h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ backgroundColor: beige }}>
        <div className={sectionWidth}>
          <div className="grid items-stretch gap-8 md:grid-cols-3 md:gap-10">
            <div className="flex flex-col justify-center py-14 md:col-span-2 md:py-24 order-1">
              <h2
                className="text-3xl md:text-4xl"
                style={{ fontFamily: "'Mansory', Georgia, serif" }}
              >
                Wenn du das hier liest, bist du bereit für den nächsten Schritt.
              </h2>
              <p
                className="mt-4 max-w-lg text-base leading-8"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                Nicht bereit im Sinne von „perfekt vorbereitet". Sondern bereit im Sinne von: Ich möchte
                nicht mehr so weitermachen. Ich möchte Klarheit.
              </p>
              <p
                className="mt-4 max-w-lg text-base leading-8"
                style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}
              >
                Das Gespräch kostet dich nichts. Und es könnte der erste Moment sein, in dem du wieder
                anfängst, dir selbst zuzuhören.
              </p>
              <div className="mt-8">
                <Button href="#anfrage" variant="dark" onClick={() => trackEvent("ClickCTA", { location: "final-cta" })}>
                  Kostenloses Erstgespräch vereinbaren
                </Button>
              </div>
            </div>

            <div className="order-2 md:order-none md:self-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
                <Image
                  src="/madeleine-portrait.jpg"
                  alt="Madeleine Maßmann"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: graphite, color: "#C8C0B0" }}>
        <div className={`${sectionWidth} py-10`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p
                className="text-lg font-bold mb-1"
                style={{ fontFamily: "'Mansory', Georgia, serif", color: "#FAF7F2" }}
              >
                Madeleine Maßmann
              </p>
              <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                mail@madeleine-massmann.com
              </p>
            </div>

            <div
              className="flex flex-wrap gap-4 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <a href="/impressum" className="hover:text-white transition">Impressum</a>
              <a href="/datenschutz" className="hover:text-white transition">Datenschutz</a>
              <a href="/cookies" className="hover:text-white transition">Cookie-Richtlinien</a>
            </div>
          </div>
          <div
            className="mt-8 pt-6 text-xs text-center"
            style={{ borderTop: "1px solid #2A2A2A", fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} Madeleine Maßmann. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </main>
  );
}
