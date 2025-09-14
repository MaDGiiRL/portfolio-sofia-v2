import { useEffect, useRef, useState } from "react";

/* Hook: osserva quando il blocco entra in viewport */
function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.unobserve(el); // fire once
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return [ref, inView];
}

/* Counter animato */
function Counter({
  from = 0,
  to = 100,
  duration = 1400,
  suffix = "",
  prefix = "",
  inView,
}) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!inView) return;
    let raf = 0,
      start = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const loop = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setVal(Math.round(from + (to - from) * ease(p)));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, inView]);
  return (
    <span>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export default function AboutSection({
  // numeri dinamici
  years = 8,
  projects = 200,
  // competenze dinamiche
  skills = [
    { label: "Frontend Development", value: 95 },
    { label: "Backend Systems", value: 90 },
    { label: "3D & Interactive Visuals", value: 85 },
    { label: "AI Integration", value: 80 },
  ],
  // URL documenti
  cvUrl = "/cv/sofia-vidotto-cv.pdf",
  diplomaFullStackUrl = "https://www.credential.net/9bcc06d6-6d2c-4a95-aff9-c03874c1bdf9#acc.iZsw3pbr",
  diplomaReactUrl = "https://www.credential.net/f75b7cb6-5d49-46f3-9893-9946b64298be#acc.pyQNCgRZ",
}) {
  const [rootRef, inView] = useInView();

  const safeCvUrl =
    typeof cvUrl === "string" && cvUrl ? cvUrl : "/cv/sofia-vidotto-cv.pdf";
  const safeDiplomaFsUrl =
    typeof diplomaFullStackUrl === "string" && diplomaFullStackUrl
      ? diplomaFullStackUrl
      : "https://www.credential.net/9bcc06d6-6d2c-4a95-aff9-c03874c1bdf9#acc.iZsw3pbr";
  const safeDiplomaReactUrl =
    typeof diplomaReactUrl === "string" && diplomaReactUrl
      ? diplomaReactUrl
      : "https://www.credential.net/f75b7cb6-5d49-46f3-9893-9946b64298be#acc.pyQNCgRZ";

  return (
    <section ref={rootRef} className="relative w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* titolo */}
        <div className="mb-10 text-center">
          <div className="text-sm font-semibold tracking-widest text-cyan-300/90">
            // ABOUT
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            La mente dietro{" "}
            <span className="relative">
              <span className="bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                il codice
              </span>
              <i className="absolute -bottom-2 left-1/2 h-1 w-20 -translate-x-1/2 rounded bg-fuchsia-500/70" />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* LEFT: cover con immagine */}
          <div className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-[2px] shadow-[0_0_40px_rgba(19,242,220,0.25)]">
              <figure className="relative rounded-2xl bg-[#0f1722]/95 p-6">
                <div className="bg-image aspect-[3/3] w-full overflow-hidden rounded-xl border border-cyan-300/30" />
                {/* BADGE: anni */}
                <div className="pointer-events-none absolute -right-4 -top-6 rounded-xl border border-white/10 bg-[#0f1722]/95 px-4 py-3 text-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <div className="text-2xl font-extrabold text-cyan-300 drop-shadow-[0_0_10px_rgba(19,242,220,0.6)]">
                    <Counter to={years} suffix="+" inView={inView} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">
                    Anni di esperienza
                  </div>
                </div>
                {/* BADGE: progetti */}
                <div className="pointer-events-none absolute -bottom-8 -left-4 rounded-xl border border-white/10 bg-[#0f1722]/95 px-4 py-3 text-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <div className="text-2xl font-extrabold text-fuchsia-400 drop-shadow-[0_0_10px_rgba(194,19,242,0.6)]">
                    <Counter to={projects} suffix="+" inView={inView} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">
                    Progetti completati
                  </div>
                </div>
              </figure>
            </div>
          </div>

          {/* RIGHT: testo + barre */}
          <div>
            <h3 className="text-xl font-extrabold text-cyan-300">
              Digital Architect{" "}
              <span className="text-fuchsia-400">&amp; Problem Solver</span>
            </h3>

            <p className="mt-4 text-slate-300">
              Sono <span className="font-semibold text-white">MaDGiiRL</span>,
              <span className="font-semibold text-fuchsia-400 glow-fuchsia">
                {" "}
                sviluppatrice full-stack
              </span>{" "}
              specializzata nella creazione di{" "}
              <span className="font-semibold text-cyan-200 glow-cyan">
                esperienze digitali immersive
              </span>{" "}
              che fondono
              <span className="text-cyan-300 glow-cyan">
                {" "}
                tecnologia d’avanguardia
              </span>{" "}
              e
              <span className="text-fuchsia-400 glow-fuchsia">
                {" "}
                design futuristico
              </span>
              . Con una visione end-to-end che spazia dalla
              <span className="mx-1 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-jbm text-xs text-cyan-200">
                UI
              </span>
              al
              <span className="mx-1 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-jbm text-xs text-cyan-200">
                back-end
              </span>
              , trasformo idee ambiziose in prodotti
              <span className="text-cyan-200"> rapidi</span>,
              <span className="text-cyan-200"> accessibili</span> e
              <span className="text-fuchsia-300"> curati nei dettagli</span>.
            </p>

            <p className="mt-4 text-slate-300">
              Su <span className="font-semibold text-cyan-200">FiveM</span>{" "}
              lavoro come
              <span className="font-semibold text-fuchsia-400">
                {" "}
                Frontend Developer NUI
              </span>
              : progetto e realizzo HUD, inventory, telefoni, menu e sistemi di
              notifica in{" "}
              <span className="mx-1 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-jbm text-xs text-cyan-200">
                HTML/CSS/JS
              </span>{" "}
              (React, Tailwind), mantenendo coerenza visiva, accessibilità e
              prestazioni elevate. Mi occupo anche di
              <span className="font-semibold text-cyan-200 glow-cyan">
                {" "}
                assistenza tecnica end-to-end
              </span>
              .
            </p>

            <div className="mt-8 space-y-5">
              {skills.map((s, i) => (
                <SkillBar
                  key={i}
                  label={s.label}
                  value={s.value}
                  inView={inView}
                />
              ))}
            </div>

            {/* CTA: documenti */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* CV */}
              <a
                href={safeCvUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                type="application/pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/60 bg-white/5 px-5 py-3 font-semibold text-cyan-200 shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:drop-shadow-[0_0_12px_rgba(19,242,220,0.65)]"
                aria-label="Scarica il CV (PDF)"
              >
                CV
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Diploma Full-Stack */}
              <a
                href={safeDiplomaFsUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                type="application/pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/60 bg-white/5 px-5 py-3 font-semibold text-fuchsia-300 shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:drop-shadow-[0_0_12px_rgba(194,19,242,0.55)]"
                aria-label="Scarica il Diploma Full-Stack (PDF)"
              >
                Diploma Full-Stack
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Diploma React */}
              <a
                href={safeDiplomaReactUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                type="application/pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/60 bg-white/5 px-5 py-3 font-semibold text-fuchsia-300 shadow-[0_8px_20px_rgba(0,0,0,0.35)] hover:drop-shadow-[0_0_12px_rgba(194,19,242,0.55)]"
                aria-label="Scarica il Diploma React (PDF)"
              >
                Diploma React
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Barra competenza con animazione percentuale */
function SkillBar({ label, value, inView }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    let raf = 0,
      start = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const loop = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setW(Math.round(value * ease(p)));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-cyan-200">{label}</span>
        <span className="font-bold text-fuchsia-400">{w}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_12px_rgba(19,242,220,0.35)] transition-[width]"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}
