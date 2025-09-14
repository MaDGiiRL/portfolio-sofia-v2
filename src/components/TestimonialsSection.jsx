// src/components/TestimonialsSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/* Hook: media query (per mostrare 2 card su lg in su) */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* Hook: in viewport (pausa autoplay quando la sezione non è visibile) */
function useInView(ref, margin = "0px") {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      root: null,
      rootMargin: margin,
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}

export default function TestimonialsSection({
  kicker = "// TESTIMONIALS",
  titleLeft = "Voices of",
  titleRight = "Satisfaction",
  subtitle = "Dicono di me: esperienze reali e risultati concreti.",
  items = DEFAULT_ITEMS,
  interval = 3500,
}) {
  const n = items.length || 1;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef(null);
  const inView = useInView(rootRef);
  const showTwo = useMediaQuery("(min-width: 1024px)");

  const next = () => setIdx((i) => (i + 1) % n);
  const prev = () => setIdx((i) => (i - 1 + n) % n);

  // autoplay (pausa su hover o quando la sezione non è in viewport)
  useEffect(() => {
    if (paused || !inView || n <= 1) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [paused, inView, n, interval]);

  // 1 card su mobile, 2 su desktop
  const visible = useMemo(() => {
    if (!showTwo) return [items[idx]];
    return [items[idx], items[(idx + 1) % n]];
  }, [idx, n, items, showTwo]);

  // swipe touch
  const touchX = useRef(0);
  const onTouchStart = (e) => (touchX.current = e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 42) (dx < 0 ? next : prev)();
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="font-jbm text-sm font-semibold tracking-widest text-cyan-300/90">
            {kicker}
          </div>

          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            {titleLeft}{" "}
            <span className="bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(19,242,220,0.35)]">
              {titleRight}
            </span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
          <p className="mx-auto mt-5 max-w-3xl text-slate-300">{subtitle}</p>
        </div>

        {/* Slider */}
        <div className="relative mt-10">
          <div
            className={`grid grid-cols-1 gap-6 ${
              showTwo ? "lg:grid-cols-2" : ""
            }`}
          >
            {visible.map((t, i) => (
              <TestimonialCard
                key={`${idx}-${i}-${t?.name ?? i}`}
                data={t}
                accent={i === 0 ? "cyan" : "fuchsia"}
              />
            ))}
          </div>
        </div>

        {/* Dots */}
        {n > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Vai alla slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={[
                  "h-2 w-2 rounded-full transition",
                  idx === i ? "bg-cyan-300" : "bg-white/20 hover:bg-white/30",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* Card con animazione fade + slide-right on mount (e ad ogni cambio idx grazie alla key) */
function TestimonialCard({ data, accent = "cyan" }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const ring =
    accent === "fuchsia"
      ? "border-fuchsia-500/30 hover:border-fuchsia-400/50 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_24px_rgba(194,19,242,0.25)]"
      : "border-cyan-400/30 hover:border-cyan-300/50 shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_24px_rgba(19,242,220,0.25)]";

  const avatarRing =
    accent === "fuchsia"
      ? "from-fuchsia-500/40 to-fuchsia-400/20"
      : "from-cyan-400/40 to-cyan-300/20";

  return (
    <article
      className={[
        "rounded-2xl border bg-white/5 p-6 text-center text-slate-200 backdrop-blur-xl transition",
        ring,
        // ANIM: da sinistra verso destra
        "transform transition-all ease-out duration-[400ms]",
        show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3",
      ].join(" ")}
    >
      <div className="mx-auto -mt-12 mb-2 w-fit rounded-full bg-gradient-to-br p-[3px] shadow">
        <div
          className={[
            "rounded-full bg-gradient-to-br p-[2px]",
            avatarRing,
          ].join(" ")}
        >
          <img
            src={data.avatar}
            alt={data.name}
            className="h-16 w-16 rounded-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <Quote className="mx-auto mb-3 h-5 w-5 text-white/40" />

      <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-slate-200">
        “{data.quote}”
      </p>

      <div className="mt-4 font-semibold text-fuchsia-400">{data.name}</div>
      <div className="text-xs text-slate-400">{data.role}</div>
    </article>
  );
}

const DEFAULT_ITEMS = [
  {
    name: "James Carter",
    role: "Music Producer, SoundWave Studios",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    quote:
      "La piattaforma AI Synthia è stata un game-changer per il nostro studio: intuitiva, veloce e user-friendly.",
  },
  {
    name: "Emma Liu",
    role: "Curator, Digital Art Collective",
    avatar:
      "https://images.unsplash.com/photo-1544005316-04ce1f1a9b01?q=80&w=256&auto=format&fit=crop",
    quote:
      "La galleria 3D ha dato vita alle nostre mostre digitali. Esperienza e cura dei dettagli fuori scala.",
  },
  {
    name: "Luca Bianchi",
    role: "CTO, NeoCommerce",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop",
    quote:
      "Full-stack pulito, Core Web Vitals top e SEO tecnico: abbiamo visto conversioni in netto aumento.",
  },
  {
    name: "Sara Gomez",
    role: "Founder, XR Studio",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=256&auto=format&fit=crop",
    quote:
      "Le interfacce NUI per FiveM sono state perfette: HUD e inventory con design cyber e performance solide.",
  },
];
