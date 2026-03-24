"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Quiz from "@/components/Quiz";
import { trackEvent } from "@/components/MetaPixel";
import {
  Check,
  Compass,
  HeartHandshake,
  Sparkles,
  Star,
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
    a: "Wir starten mit einem kostenlosen Kennenlerngespräch (15–20 Minuten). In diesem Gespräch geht es nicht darum, bereits etwas entscheiden zu müssen, sondern darum, in Ruhe zu schauen, wo du gerade stehst und was dich innerlich beschäftigt. Du kannst deine Fragen stellen und bekommst von mir ein paar klare, einfühlsame Impulse. Am Ende spürst du, ob sich eine 10-wöchige Begleitung für dich stimmig anfühlt. Oft ist dieses erste Gespräch bereits ein wichtiger Schritt, um innerlich wieder etwas ruhiger zu werden.",
  },
  {
    q: "Bist du für oder gegen Kinder?",
    a: "Weder noch. Ich habe keine Agenda und keine Erwartung an deine Entscheidung. In der Begleitung geht es nicht darum, dich in eine bestimmte Richtung zu führen, sondern dir einen Raum zu geben, in dem deine eigene Antwort entstehen kann. Ich stelle Fragen, die dich unterstützen, klarer zu sehen – nicht meine Wahrheit, nicht die deiner Familie oder deines Umfelds, sondern deine.",
  },
  {
    q: "Begleitest du auch Paare?",
    a: "Der Schwerpunkt meiner Arbeit liegt auf der 1:1-Begleitung von Frauen. Wenn du in einer Partnerschaft bist, fließt diese natürlich mit ein, denn unterschiedliche Wünsche oder Dynamiken spielen bei der Kinderfrage oft eine große Rolle. In manchen Fällen ist auch eine gemeinsame Begleitung sinnvoll. Ob und in welcher Form das für euch passt, klären wir in Ruhe im kostenlosen Kennenlerngespräch.",
  },
  {
    q: "Was ist, wenn ich mich nach 10 Wochen noch nicht entschieden habe?",
    a: "Das Ziel der Begleitung ist nicht, dich zu einer schnellen Entscheidung zu drängen, sondern die innere Anspannung und das Gedankenkarussell zu lösen, das dich gerade blockiert. Viele Frauen erleben, dass sich im Laufe der zehn Wochen eine klare innere Tendenz zeigt, weil sie sich selbst wieder besser spüren und nicht mehr gegen sich arbeiten. Und selbst wenn am Ende noch kein endgültiges Ja oder Nein da ist, stehst du innerlich an einem völlig anderen Punkt: ruhiger, sortierter und mit einem klaren Gefühl dafür, was für dich stimmig ist. Ob und wie du danach weitergehst, entscheidest du selbst – frei und selbstbestimmt.",
  },
  {
    q: "Ist das Coaching ein Ersatz für Psychotherapie?",
    a: "Nein, mein Coaching ersetzt keine Psychotherapie. Der Fokus liegt auf Entscheidungsfindung und innerer Klarheit rund um die Kinderfrage. Es richtet sich an psychisch stabile Frauen in einer Entscheidungsphase. Wenn tiefere psychische Themen im Vordergrund stehen, ist eine therapeutische Begleitung sinnvoll und empfehlenswert. Wenn du unsicher bist, ob das Coaching für dich passend ist, klären wir das gern im Kennenlerngespräch.",
  },
];

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
        <span className="font-semibold text-[15px] leading-snug" style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}>
          {q}
        </span>
        <ChevronDown
          className={`shrink-0 h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: accent }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-7" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
          {a}
        </div>
      )}
    </div>
  );
}

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const wordEls = container.querySelectorAll<HTMLSpanElement>("[data-word]");
      const vh = window.innerHeight;
      wordEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const revealed = elCenter < vh * 0.85 && elCenter > 0;
        el.style.color = revealed ? graphite : "#C0B8A8";
        el.style.opacity = revealed ? "1" : "0.35";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="leading-relaxed">
      {words.map((word, i) => (
        <span
          key={i}
          data-word
          className="inline transition-all duration-300"
          style={{ color: "#C0B8A8", opacity: 0.35 }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </div>
  );
}

export default function Page() {
  const scrollToQuiz = () => {
    document.getElementById("anfrage")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className="min-h-screen"
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
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: beige, borderColor: border }}>
        <div className={`${sectionWidth} flex h-20 items-center justify-between`}>
          <a href="#start" className="flex items-center">
            <Image src="/logo-header.webp" alt="Madeleine Maßmann" width={180} height={60} className="h-12 w-auto" />
          </a>
          <Button href="#anfrage" variant="accent" onClick={() => trackEvent("ClickCTA", { location: "header" })}>
            Kostenloses Kennenlerngespräch
          </Button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="start" className="relative">
        <div className="relative aspect-[4/5] w-full md:aspect-[21/9]">
          <Image src="/hero-mad.jpg" alt="Madeleine Maßmann – Coaching Kinderfrage" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0">
            <div className={`${sectionWidth} pb-10 md:pb-16`}>
              <div className="mx-auto max-w-4xl text-center text-white">
                <h1 className="text-3xl font-bold leading-tight md:text-5xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
                  Wenn dich die Kinderfrage nicht los lässt …
                </h1>
                <p className="mt-5 text-sm text-white/85 md:text-lg leading-8 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Es ist an der Zeit, deine eigene Wahrheit zu finden, losgelöst von Erwartungen anderer. Dabei möchte ich dir helfen.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button href="#anfrage" variant="accent" onClick={() => trackEvent("ClickCTA", { location: "hero" })} className="text-base px-8 py-4">
                    Jetzt Klarheit erhalten
                  </Button>
                </div>
                <div className="mt-5 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
                    100+ Frauen zu einer Antwort verholfen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ backgroundColor: accent }}>
        <div className={`${sectionWidth} py-8`}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { n: "5+", label: "Jahre Erfahrung mit der Kinderfrage" },
              { n: "100+", label: "Frauen auf dem Weg zur Klarheit begleitet" },
              { n: "95 %", label: "Weiterempfehlungsrate" },
              { n: "1.000+", label: "Stunden Coaching & Weiterbildung" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold" style={{ fontFamily: "'Mansory', Georgia, serif", color: "#fff" }}>
                  {s.n}
                </div>
                <div className="mt-1 text-xs leading-5" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pain-point cards ── */}
      <section className="pt-16 pb-14 md:pt-20 md:pb-20">
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              Plagen dich auch diese Gedanken?
            </h2>
            <p className="mt-3 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Wenn du dich in einem dieser Sätze wiedererkennst, bist du hier genau richtig.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative overflow-hidden rounded-3xl px-6 py-8 text-center" style={{ backgroundColor: "#fff", border: `1px solid ${border}` }}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: accent }}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: graphite, fontFamily: "'Mansory', Georgia, serif" }}>{item.title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4: Image + text (no bullets, button to quiz) ── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={`${sectionWidth} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image src="/madeleine-couch.jpg" alt="Madeleine Maßmann – Coaching" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              Du suchst schon lange nach einer Antwort – und je mehr du nachdenkst, desto unklarer wird es.
            </h2>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Der Druck wächst. Von außen und von innen. Vielleicht bist du in einer Partnerschaft mit
              unterschiedlichen Wünschen. Oder du trägst diese Frage ganz allein.
            </p>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Und dann kreisen die Gedanken: Was, wenn ich zu spät dran bin? Was, wenn ich später etwas
              bereue? Viele Frauen kommen genau an diesem Punkt zu mir.
            </p>
            <div className="mt-8">
              <Button onClick={scrollToQuiz} variant="accent">
                Jetzt eine Antwort finden
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width quote image with brand orange overlay ── */}
      <section>
        <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[16/6]">
          <Image src="/mad-zitat.jpg" alt="Madeleine Maßmann – Haltung" fill className="object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(215,135,66,0.75)" }} />
          <div className={`${sectionWidth} absolute inset-0 flex items-center`}>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Meine Haltung
              </p>
              <blockquote className="text-2xl font-bold leading-relaxed text-white md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
                „Das Problem ist nicht die Entscheidung. Sondern der Druck, unter dem du sie treffen sollst."
              </blockquote>
              <p className="mt-4 text-white/80 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                – Madeleine Maßmann
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Angebot / Process ── */}
      <section id="angebot" className="py-14 md:py-20">
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              Warum sich ein neuer Blick auf dein Gedankenchaos lohnt
            </h2>
            <p className="mt-3 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Ich bin weder für noch gegen Kinder – ich helfe dir, deine Wahrheit zu finden.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                step: "01",
                title: "Raus aus dem Gedankenkarussell",
                text: "Du erkennst, dass nicht „du das Problem bist", sondern der Druck und die vielen Stimmen in deinem Kopf – und beginnst, deine Gedanken endlich zu sortieren statt dich weiter im Kreis zu drehen.",
              },
              {
                step: "02",
                title: "Echte Orientierung",
                text: "Du schaffst Raum zwischen dir und deinen Ängsten, Zweifeln und Erwartungen – und kannst dadurch klarer spüren, was wirklich zu dir gehört.",
              },
              {
                step: "03",
                title: "Verstehen und Einordnen",
                text: "Aus dem inneren Hin und Her entsteht Schritt für Schritt Ruhe – und damit die Basis für eine Entscheidung, die sich für dich stimmig und richtig anfühlt.",
              },
            ].map((item) => (
              <div key={item.step} className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm" style={{ borderColor: border }}>
                <span className="absolute top-4 right-5 text-6xl font-bold leading-none select-none" style={{ color: accent, opacity: 0.18, fontFamily: "'Mansory', Georgia, serif" }}>
                  {item.step}
                </span>
                <h3 className="text-xl font-bold leading-tight pr-12" style={{ fontFamily: "'Mansory', Georgia, serif", color: graphite }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="#anfrage" variant="accent" onClick={() => trackEvent("ClickCTA", { location: "angebot" })}>
              Ja, das brauche ich
            </Button>
          </div>
        </div>
      </section>

      {/* ── Section 7: Über Madeleine (mirrored layout, new image & text) ── */}
      <section style={{ backgroundColor: "#fff" }} className="py-14 md:py-20">
        <div className={`${sectionWidth} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              Zwischen Zweifel, Sehnsucht und innerem Hin und Her
            </h2>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Vielleicht kennst du dieses Gefühl, dich bei der Kinderfrage immer wieder im Kreis zu drehen – als würden deine Gedanken keine klare Richtung finden. Da ist der Wunsch nach innerer Klarheit, nach einem Punkt, an dem sich nicht alles wie endloses Grübeln anfühlt.
            </p>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Gleichzeitig tauchen Fragen auf: Wie kannst du eine Entscheidung treffen – ohne Druck, ohne Angst vor Reue und ohne dich von den Erwartungen anderer leiten zu lassen? Vielleicht fühlst du dich hin- und hergerissen zwischen Vernunft, Angst und dem Wunsch nach Freiheit.
            </p>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Und während all das in dir arbeitet, merkst du, wie viel Energie dich diese Frage im Alltag kostet und wie sehr sie dir Leichtigkeit nimmt. Vielleicht ist da auch dieser leise Wunsch, dir selbst wieder mehr zu vertrauen – deinem Gefühl, deiner inneren Stimme, deiner eigenen Wahrheit.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image src="/madeleine-neu.jpg" alt="Madeleine Maßmann" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── Section 8: Scroll-reveal vision text ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: beige }}>
        <div className={sectionWidth}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              <ScrollRevealText text="Stell dir vor, du wachst morgens auf – und da ist kein innerer Druck mehr, der dich sofort einholt. Stattdessen spürst du Ruhe. Raum. Klarheit. Du beginnst zu erkennen, was wirklich zu dir gehört – und was du vielleicht lange aus Angst oder Erwartungen übernommen hast. Die Stimmen von außen verlieren an Gewicht, und du bleibst bei dir, auch wenn andere Meinungen laut werden. Deine Gedanken sortieren sich, werden ruhiger, greifbarer. Und aus diesem neuen inneren Raum heraus entsteht etwas Entscheidendes: Du triffst eine Entscheidung, die sich nicht erzwungen anfühlt, sondern stimmig. Klar. Deine eigene." />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 9: Quiz / Anfrage ── */}
      <section id="anfrage" className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              Das ist dein Zeichen
            </p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              Dein erster Schritt Richtung echter Klarheit beginnt hier.
            </h2>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Gemeinsam ordnen wir deine Gedanken ein, und helfen dir, deine innere Wahrheit zu finden.
            </p>
          </div>
          <Quiz />
        </div>
      </section>

      {/* ── Section 10: Reviews ── */}
      <section className="py-14 md:py-20" style={{ backgroundColor: beige }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              So fühlt es sich an, wenn innere Klarheit entsteht
            </h2>
            <p className="mt-3 text-sm" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Erfahrungen von Frauen, die einmal ähnlich gefühlt haben wie du
            </p>
          </div>
          <div className="overflow-x-auto pb-4 [scrollbar-width:none] md:overflow-visible">
            <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="min-w-[88%] rounded-3xl bg-white p-6 shadow-sm md:min-w-0" style={{ border: `1px solid ${border}` }}>
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-7" style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}>
                    „{review.text}"
                  </p>
                  <p className="mt-4 text-sm font-semibold" style={{ color: graphite, fontFamily: "'Inter', sans-serif" }}>
                    – {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 11: Über mich (no button) ── */}
      <section id="ueber-mich" className="py-14 md:py-20" style={{ backgroundColor: "#fff" }}>
        <div className={`${sectionWidth} grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image src="/madeleine-portrait2.jpg" alt="Madeleine Maßmann" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              Hi, ich bin Madeleine.
            </h2>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Ich weiß aus eigener Erfahrung, wie quälend die Kinderfrage sein kann, wenn man einfach
              keine klare Antwort in sich findet. Nicht, weil man sich nicht genug mit sich beschäftigt.
              Sondern weil zu viele Stimmen gleichzeitig mitreden.
            </p>
            <p className="mt-4 text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
              Als Neurobiologin (M.Sc.), zertifizierte Life Coachin und psychosoziale Beraterin
              verbinde ich wissenschaftliche Klarheit mit empathischer, strukturierter Begleitung.
            </p>
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
              {["Neurobiologin (M. Sc.)", "Zertifizierte Life Coachin", "Psychosoziale Beraterin", "Spezialisiert auf die Kinderfrage"].map((badge) => (
                <span key={badge} className="rounded-full px-4 py-1.5 text-xs font-semibold" style={{ backgroundColor: beige, color: graphite, border: `1px solid ${border}`, fontFamily: "'Inter', sans-serif" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 13: FAQ ── */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: beige }}>
        <div className={sectionWidth}>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
              Häufige Fragen zur Kinderfrage
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
      <section style={{ backgroundColor: "#fff" }}>
        <div className={sectionWidth}>
          <div className="grid items-stretch gap-8 md:grid-cols-3 md:gap-10">
            <div className="flex flex-col justify-center py-14 md:col-span-2 md:py-24 order-1">
              <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Mansory', Georgia, serif" }}>
                Wenn du das hier liest, bist du bereit für den nächsten Schritt.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
                Nicht bereit im Sinne von „perfekt vorbereitet". Sondern bereit im Sinne von: Ich möchte nicht mehr so weitermachen. Ich möchte Klarheit.
              </p>
              <p className="mt-4 max-w-lg text-base leading-8" style={{ color: lightGray, fontFamily: "'Inter', sans-serif" }}>
                Das Gespräch kostet dich nichts. Und es könnte der erste Moment sein, in dem du wieder anfängst, dir selbst zuzuhören.
              </p>
              <div className="mt-8">
                <Button href="#anfrage" variant="dark" onClick={() => trackEvent("ClickCTA", { location: "final-cta" })}>
                  Kostenloses Kennenlerngespräch
                </Button>
              </div>
            </div>
            <div className="order-2 md:order-none md:self-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
                <Image src="/madeleine-portrait.jpg" alt="Madeleine Maßmann" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: accent, color: "#fff" }}>
        <div className={`${sectionWidth} py-10`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-lg font-bold mb-1" style={{ fontFamily: "'Mansory', Georgia, serif", color: "#fff" }}>
                Madeleine Maßmann
              </p>
              <p className="text-sm opacity-85" style={{ fontFamily: "'Inter', sans-serif" }}>
                mail@madeleine-massmann.com
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              <a href="https://willichkinder.at/impressum/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition text-white">Impressum</a>
              <a href="https://willichkinder.at/datenschutz/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition text-white">Datenschutz</a>
            </div>
          </div>
          <div className="mt-8 pt-6 text-xs text-center text-white/70" style={{ borderTop: "1px solid rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Madeleine Maßmann. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </main>
  );
}
