// src/components/SkillsSection.jsx
import { useEffect, useRef, useState } from "react";
import {
  FileCode2,
  Paintbrush,
  Braces,
  Server,
  GitBranch,
  Boxes,
  Wind,
  Code,
  Database,
  Github,
  Image,
  Palette,
  Atom,
  Terminal,
  Table,
  Code2,
  ServerCog,
  Sparkles,
  Figma as FigmaIcon,
} from "lucide-react";

/* --- Hooks utili --- */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.unobserve(el); // 1 volta
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* --- Barra animata --- */
function Progress({ value = 80, inView, accent = "cyan" }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start = 0;
    const dur = 1000;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const loop = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      setW(Math.round(value * ease(p)));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);

  const fill =
    accent === "fuchsia"
      ? "from-fuchsia-400 to-fuchsia-600 shadow-[0_0_16px_rgba(194,19,242,.35)]"
      : "from-cyan-300 to-cyan-500 shadow-[0_0_16px_rgba(19,242,220,.35)]";

  return (
    <div className="mt-3 h-2 w-full rounded-full bg-white/10">
      <div
        className={[
          "relative h-2 rounded-full bg-gradient-to-r transition-[width] duration-300",
          fill,
        ].join(" ")}
        style={{ width: `${w}%` }}
      >
        <span className="absolute -right-1.5 -top-1.5 block h-5 w-5 rounded-full bg-white/90 opacity-80" />
      </div>
    </div>
  );
}

/* --- Card singola skill --- */
function SkillCard({
  icon: Icon,
  title,
  desc,
  value,
  accent = "cyan",
  inView,
}) {
  const ring =
    accent === "fuchsia"
      ? "from-fuchsia-500/35 to-fuchsia-400/15 hover:shadow-[0_0_28px_rgba(194,19,242,.25)]"
      : "from-cyan-400/35 to-cyan-300/15 hover:shadow-[0_0_28px_rgba(19,242,220,.25)]";

  const titleClr = accent === "fuchsia" ? "text-fuchsia-300" : "text-cyan-200";

  return (
    <article className="group relative">
      <div
        className={["rounded-2xl p-[2px] bg-gradient-to-br", ring].join(" ")}
      >
        <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          {/* tinta soffusa */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen
                          bg-[radial-gradient(70%_70%_at_15%_15%,rgba(19,242,220,.10),transparent_55%),radial-gradient(70%_70%_at_85%_85%,rgba(194,19,242,.12),transparent_55%)]"
          />

          {/* header */}
          <div className="relative mb-3 flex items-center gap-3">
            <div
              className={[
                "grid h-9 w-9 place-items-center rounded-lg border bg-white/5",
                accent === "fuchsia"
                  ? "border-fuchsia-400/30"
                  : "border-cyan-300/30",
              ].join(" ")}
            >
              <Icon
                className={[
                  "h-5 w-5",
                  accent === "fuchsia" ? "text-fuchsia-300" : "text-cyan-300",
                ].join(" ")}
              />
            </div>
            <h3 className={["text-sm font-extrabold", titleClr].join(" ")}>
              {title}
            </h3>
          </div>

          <p className="relative text-sm text-slate-300">{desc}</p>

          <Progress value={value} inView={inView} accent={accent} />
        </div>
      </div>
    </article>
  );
}

/* --- Sezione completa --- */
export default function SkillsSection({
  kicker = "// SKILLS",
  titleLeft = "Tech",
  titleRight = "Stack",
  subtitle = "Competenze chiave per prodotti veloci, accessibili e dal look futuristico.",
  skills = DEFAULT_SKILLS,
}) {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className="relative w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="font-jbm text-sm font-semibold tracking-widest text-cyan-300/90">
            {kicker}
          </div>

          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            {titleLeft}{" "}
            <span className="bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(194,19,242,.35)]">
              {titleRight}
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
          <p className="mx-auto mt-5 max-w-3xl text-slate-300">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((s, i) => (
            <SkillCard
              key={s.title + i}
              icon={s.icon}
              title={s.title}
              desc={s.desc}
              value={s.value}
              accent={i % 2 === 0 ? "cyan" : "fuchsia"}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Dataset di default (modifica liberamente) --- */
const DEFAULT_SKILLS = [
  // ── Linguaggi & Sintassi ───────────────────────────────────────────────
  {
    icon: FileCode2,
    title: "HTML",
    desc: "Markup semantico, SEO e accessibilità (ARIA).",
    value: 92,
  },
  {
    icon: Braces,
    title: "Sass / SCSS",
    desc: "Struttura modulare, mixin e variabili.",
    value: 88,
  },
  {
    icon: Code,
    title: "JavaScript (ES+)",
    desc: "Interattività UI, DOM, performance e patterns.",
    value: 94,
  },
  {
    icon: Code2,
    title: "PHP",
    desc: "Scripting server-side, API, pattern MVC e integrazioni.",
    value: 88,
  },

  // ── Framework / Librerie / Runtime ─────────────────────────────────────
  {
    icon: Atom,
    title: "React",
    desc: "Componenti, hooks e SPA veloci (Vite).",
    value: 93,
  },
  {
    icon: Server,
    title: "Node.js",
    desc: "API, integrazioni e tooling per il front-end.",
    value: 72,
  },
  {
    icon: Boxes,
    title: "Laravel",
    desc: "MVC, Eloquent e API per progetti full-stack.",
    value: 70,
  },
  {
    icon: Paintbrush,
    title: "CSS / Tailwind / Bootstrap",
    desc: "Layout moderni, responsive e animazioni pulite.",
    value: 95,
  },
  {
    icon: Wind,
    title: "FiveM NUI",
    desc: "HUD/Inventory, UI cyber e ottimizzazioni lato front.",
    value: 96,
  },

  // ── Database & Back-end as a Service ───────────────────────────────────
  {
    icon: Database,
    title: "MySQL",
    desc: "Query, join e ottimizzazione essenziali.",
    value: 68,
  },
  {
    icon: Database,
    title: "Supabase",
    desc: "Postgres gestito, Auth, Storage, Realtime e Edge Functions.",
    value: 80,
  },

  // ── DevTools / Ambienti / DB Client / Versioning ───────────────────────
  {
    icon: ServerCog,
    title: "XAMPP",
    desc: "Ambiente locale (Apache, MySQL/MariaDB, PHP).",
    value: 78,
  },
  {
    icon: GitBranch,
    title: "Git / GitHub",
    desc: "Branching, PR e workflow collaborativi.",
    value: 90,
  },
  {
    icon: Terminal,
    title: "Git Bash",
    desc: "CLI per Git, scripting e gestione repository.",
    value: 90,
  },
  {
    icon: Table,
    title: "TablePlus",
    desc: "Client DB multipiattaforma: query, browsing e gestione.",
    value: 82,
  },
  {
    icon: Database,
    title: "HeidiSQL",
    desc: "Gestione MySQL/MariaDB, import/export e query runner.",
    value: 80,
  },

  // ── Design / Editing / Branding ────────────────────────────────────────
  {
    icon: FigmaIcon,
    title: "Figma",
    desc: "Prototipazione UI/UX e handoff pulito.",
    value: 88,
  },
  {
    icon: Image,
    title: "Photoshop / GIMP",
    desc: "Editing grafico e ritocchi professionali.",
    value: 86,
  },
  {
    icon: Sparkles,
    title: "Canva",
    desc: "Mockup rapidi, social assets e visual kit.",
    value: 85,
  },
  {
    icon: Palette,
    title: "Branding & Web Design",
    desc: "Template, wireframe e identità visiva.",
    value: 92,
  },
];
