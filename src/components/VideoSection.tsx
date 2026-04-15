'use client';
import { useRef, useState } from 'react';

const accent = '#D78742';
const graphite = '#1E1E1E';
const lightGray = '#5C5C5C';
const beige = '#F5F0E8';
const border = '#E2D8C8';

const VIDEOS = [
  {
    src: '/Viele_Frauen_glauben__die_Kinderfrage_sei_nur_eine_Entscheidung_über_ein_Baby__Aber_oft_geht_es_.mp4',
    label: 'Viele Frauen glauben, die Kinderfrage sei nur eine Entscheidung über ein Baby. Aber oft geht es um viel mehr.',
  },
  {
    src: '/Du_sagst_seit_Monaten-_Ich_weiß_nicht__was_ich_will__Aber_ich_frage_dich_mal_ganz_ehrlich-Weißt_.mp4',
    label: 'Du sagst seit Monaten: „Ich weiß nicht, was ich will." Aber weißt du es wirklich nicht?',
  },
  {
    src: '/Du_glaubst-__Alle_anderen_wissen_doch_auch__ob_sie_Kinder_haben_wollen_oder_nicht__Dann_lies_jet.mp4',
    label: 'Du glaubst: „Alle anderen wissen doch auch, ob sie Kinder haben wollen oder nicht." Dann lies jetzt weiter.',
  },
];

function VideoCard({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else         { ref.current.play();  setPlaying(true);  }
  };

  const onTimeUpdate = () => {
    if (!ref.current || !ref.current.duration) return;
    setProgress(ref.current.currentTime / ref.current.duration);
  };

  const onLoadedMetadata = () => {
    if (ref.current) setDuration(ref.current.duration);
  };

  const onEnded = () => setPlaying(false);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    ref.current.currentTime = ratio * ref.current.duration;
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ref.current) return;
    ref.current.muted = !ref.current.muted;
    setMuted(ref.current.muted);
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div style={{
      borderRadius: 24,
      overflow: 'hidden',
      position: 'relative',
      background: graphite,
      border: `1px solid ${border}`,
      boxShadow: '0 4px 24px rgba(30,20,10,0.10)',
    }}>
      {/* 9:16 Hochformat */}
      <div
        style={{ aspectRatio: '9/16', position: 'relative', cursor: 'pointer' }}
        onClick={toggle}
      >
        <video
          ref={ref}
          src={src}
          preload="metadata"
          playsInline
          muted={muted}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Beige-Gradient Overlay oben mit Label */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: `linear-gradient(to bottom, rgba(215,135,66,0.88) 0%, rgba(215,135,66,0.55) 70%, rgba(215,135,66,0) 100%)`,
          padding: '20px 18px 36px',
          zIndex: 2,
        }}>
          <p style={{
            color: '#fff',
            fontFamily: "'Mansory', Georgia, serif",
            fontWeight: 700,
            fontSize: '0.92rem',
            lineHeight: 1.5,
            textAlign: 'center',
            textShadow: '0 1px 4px rgba(0,0,0,0.18)',
          }}>
            {label}
          </p>
        </div>

        {/* Play-Button */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 3, pointerEvents: 'none',
        }}>
          {!playing && (
            <div style={{
              width: 62, height: 62, borderRadius: 999,
              background: accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 28px rgba(215,135,66,0.45)',
            }}>
              <span style={{
                display: 'inline-block', width: 0, height: 0,
                borderTop: '12px solid transparent',
                borderBottom: '12px solid transparent',
                borderLeft: '20px solid #fff',
                marginLeft: 5,
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        background: '#fff',
        padding: '12px 16px',
        display: 'flex', flexDirection: 'column', gap: 8,
        borderTop: `1px solid ${border}`,
      }}>
        {/* Fortschrittsbalken */}
        <div
          onClick={seek}
          style={{
            height: 4, background: beige, borderRadius: 999,
            cursor: 'pointer', position: 'relative',
            border: `1px solid ${border}`,
          }}
        >
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: accent,
            borderRadius: 999,
            transition: 'width 0.1s linear',
          }} />
        </div>

        {/* Steuerelemente-Zeile */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={toggle}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: graphite, display: 'flex', alignItems: 'center', gap: 6, padding: 0,
            }}
          >
            {playing
              ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill={graphite}>
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              )
              : (
                <span style={{
                  display: 'inline-block', width: 0, height: 0,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderLeft: `11px solid ${graphite}`,
                }} />
              )
            }
          </button>

          <span style={{
            color: lightGray,
            fontSize: '0.72rem',
            fontFamily: "'Inter', sans-serif",
          }}>
            {fmt(duration * progress)} / {fmt(duration)}
          </span>

          <button
            onClick={toggleMute}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, display: 'flex', alignItems: 'center',
            }}
          >
            {muted
              ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={lightGray} strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              )
              : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={lightGray} strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-14 md:py-20" style={{ backgroundColor: beige }}>
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        {/* Überschrift */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{
            color: accent,
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 12,
            fontFamily: "'Inter', sans-serif",
          }}>
            Häufige Gedanken
          </p>
          <h2 style={{
            fontFamily: "'Mansory', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            color: graphite,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}>
            Erkennst du dich{' '}
            <span style={{ color: accent }}>darin wieder?</span>
          </h2>
          <p style={{
            marginTop: 14,
            fontSize: '0.97rem',
            lineHeight: 1.8,
            color: lightGray,
            fontFamily: "'Inter', sans-serif",
            maxWidth: 560,
            margin: '14px auto 0',
          }}>
            Gedanken, die viele Frauen kennen – und mit denen du nicht allein bist.
          </p>
        </div>

        {/* Desktop: 3-Spalten-Grid */}
        <div className="wik-vid-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {VIDEOS.map(v => <VideoCard key={v.src} {...v} />)}
        </div>

        {/* Mobile: Karussell */}
        <div className="wik-vid-carousel" style={{ display: 'none' }}>
          <div style={{ overflow: 'hidden', borderRadius: 24 }}>
            <div style={{
              display: 'flex',
              transform: `translateX(calc(-${active * 100}%))`,
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {VIDEOS.map(v => (
                <div key={v.src} style={{ minWidth: '100%' }}>
                  <VideoCard {...v} />
                </div>
              ))}
            </div>
          </div>

          {/* Pfeil-Navigation */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 16, marginTop: 24,
          }}>
            <button
              onClick={() => setActive(a => Math.max(0, a - 1))}
              disabled={active === 0}
              style={{
                width: 40, height: 40, borderRadius: 999,
                background: active === 0 ? border : accent,
                border: 'none',
                cursor: active === 0 ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <span style={{
                display: 'inline-block', width: 0, height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: `9px solid ${active === 0 ? '#bbb' : '#fff'}`,
              }} />
            </button>

            <div style={{ display: 'flex', gap: 8 }}>
              {VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 24 : 8, height: 8,
                    borderRadius: 999,
                    background: i === active ? accent : border,
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s', padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActive(a => Math.min(VIDEOS.length - 1, a + 1))}
              disabled={active === VIDEOS.length - 1}
              style={{
                width: 40, height: 40, borderRadius: 999,
                background: active === VIDEOS.length - 1 ? border : accent,
                border: 'none',
                cursor: active === VIDEOS.length - 1 ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
            >
              <span style={{
                display: 'inline-block', width: 0, height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: `9px solid ${active === VIDEOS.length - 1 ? '#bbb' : '#fff'}`,
              }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .wik-vid-grid     { display: none !important; }
          .wik-vid-carousel { display: block !important; }
        }
      `}</style>
    </section>
  );
}
