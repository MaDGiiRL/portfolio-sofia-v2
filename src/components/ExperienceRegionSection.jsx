import { useEffect, useMemo, useRef, useState } from "react";
import { Shield, Code2, RefreshCw, Users } from "lucide-react";

/* Hook: in-view solo dopo scroll (stesso approccio del tuo About) */
function useInView(
  ioOptions = { threshold: 0.2, rootMargin: "0px 0px -15% 0px" },
  opts = { requireScroll: true, once: true }
) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(!opts?.requireScroll);

  const options = useMemo(
    () => ({
      threshold: ioOptions.threshold ?? 0.2,
      rootMargin: ioOptions.rootMargin ?? "0px",
    }),
    [ioOptions.threshold, ioOptions.rootMargin]
  );

  useEffect(() => {
    if (!opts?.requireScroll) return;
    let done = false;
    const onScroll = () => {
      if (!done) {
        done = true;
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll, { passive: true });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", onScroll, { passive: true });
  }, [opts?.requireScroll]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasScrolled) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (opts?.once !== false) io.unobserve(el);
      } else if (opts?.once === false) {
        setInView(false);
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [hasScrolled, options, opts?.once]);

  return [ref, inView];
}

export default function ExperienceRegionSection() {
  const [rootRef, inView] = useInView(
    { threshold: 0.2, rootMargin: "0px 0px -15% 0px" },
    { requireScroll: true, once: true }
  );

  return (
    <section ref={rootRef} className="relative w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="text-sm font-semibold tracking-widest text-cyan-300/90">
            // EXPERIENCE
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            L’esperienza in{" "}
            <span className="bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Regione
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
          <p className="mx-auto mt-5 max-w-3xl text-slate-300">
            Web Developer{" "}
            <span className="text-fuchsia-300 glow-fuchsia">PHP</span> per la{" "}
            <span className="text-cyan-200 glow-cyan">
              Protezione Civile — Regione Veneto
            </span>
            : sto rifacendo e modernizzando applicativi interni, migliorando UX,
            stabilità e manutenzione.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card principale */}
          <div
            className={[
              "lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl",
              "shadow-[0_10px_26px_rgba(0,0,0,0.35)]",
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              "transition-all duration-700",
            ].join(" ")}
          >
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-cyan-300/30 bg-[#0f1722]/70 p-3">
                <Shield className="h-6 w-6 text-cyan-200" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-cyan-300">
                  Protezione Civile — Regione Veneto
                </h3>
                <p className="mt-2 text-slate-300">
                  Lavoro su applicativi web in{" "}
                  <span className="font-semibold text-white">PHP</span>,
                  contribuendo a un processo di{" "}
                  <span className="font-semibold text-fuchsia-300 glow-fuchsia">
                    refactoring
                  </span>{" "}
                  e{" "}
                  <span className="font-semibold text-cyan-200 glow-cyan">
                    modernizzazione
                  </span>{" "}
                  dei software: interfacce più chiare, flussi più solidi e
                  codice più manutenibile.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "PHP",
                    "Manutenzione & Refactoring",
                    "UX/UI Improvement",
                    "Ottimizzazione flussi",
                    "Stabilità & Bugfix",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-cyan-400/35 bg-white/5 px-3 py-1 text-xs text-cyan-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini timeline */}
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <MiniStep
                icon={<RefreshCw className="h-5 w-5 text-fuchsia-300" />}
                title="Rebuild"
                text="Riscrittura e pulizia progressiva di tutti gli applicativi."
              />
              <MiniStep
                icon={<Code2 className="h-5 w-5 text-cyan-200" />}
                title="Quality"
                text="Struttura più chiara, componenti riusabili, meno regressioni."
              />
              <MiniStep
                icon={<Users className="h-5 w-5 text-cyan-200" />}
                title="Operatività"
                text="Focus su flussi reali: velocità, chiarezza e affidabilità."
              />
            </div>
          </div>

          {/* Side card “highlights” */}
          <div
            className={[
              "rounded-2xl border border-white/10 bg-[#0f1722]/70 p-6",
              "shadow-[0_10px_26px_rgba(0,0,0,0.35)]",
              inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              "transition-all duration-700 delay-150",
            ].join(" ")}
          >
            <h4 className="text-lg font-extrabold text-fuchsia-300">
              Cosa porto nel team
            </h4>

            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(19,242,220,0.5)]" />
                Approccio pragmatico: risultati concreti, iterazioni rapide.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(194,19,242,0.45)]" />
                Refactor con criterio: prima stabilità, poi miglioramenti
                continui.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(19,242,220,0.5)]" />
                Focus UX: interfacce più leggibili e workflow più veloci.
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-widest text-slate-400">
                Ruolo
              </div>
              <div className="mt-1 text-sm font-bold text-white">
                Web Developer (PHP)
              </div>
            </div>
          </div>
        </div>

        {/* ✅ STACK BOXES */}
        <div
          className={[
            "mt-10 grid grid-cols-1 gap-6 md:grid-cols-3",
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            "transition-all duration-700 delay-200",
          ].join(" ")}
        >
          <StackBox
            title="Laravel"
            accent="fuchsia"
            items={[
              "MVC Architecture",
              "Routing & Middleware",
              "Eloquent ORM",
              "Auth & Security",
            ]}
          />

          <StackBox
            title="PHP"
            accent="cyan"
            items={[
              "Refactoring codice legacy",
              "Logica business",
              "Validazioni & sicurezza",
              "Manutenzione evolutiva",
            ]}
          />

          <StackBox
            title="PostgreSQL + pgAdmin"
            accent="fuchsia"
            items={[
              "Database relazionali",
              "Query ottimizzate",
              "Gestione dati critici",
              "Monitoring via pgAdmin",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function MiniStep({ icon, title, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <div className="rounded-lg border border-white/10 bg-[#0f1722]/70 p-2">
          {icon}
        </div>
        <div className="font-extrabold text-white">{title}</div>
      </div>
      <p className="mt-2 text-sm text-slate-300">{text}</p>
    </div>
  );
}

function StackBox({ title, items = [], accent = "cyan" }) {
  const accentStyles =
    accent === "fuchsia"
      ? {
          border: "border-fuchsia-400/40",
          title: "text-fuchsia-300 glow-fuchsia",
          dot: "bg-fuchsia-400 shadow-[0_0_10px_rgba(194,19,242,0.5)]",
        }
      : {
          border: "border-cyan-300/40",
          title: "text-cyan-200 glow-cyan",
          dot: "bg-cyan-300 shadow-[0_0_10px_rgba(19,242,220,0.5)]",
        };

  return (
    <div
      className={[
        "rounded-2xl border bg-white/5 p-6 backdrop-blur-xl",
        "shadow-[0_10px_26px_rgba(0,0,0,0.35)]",
        accentStyles.border,
      ].join(" ")}
    >
      <h4 className={`text-lg font-extrabold ${accentStyles.title}`}>
        {title}
      </h4>

      <ul className="mt-4 space-y-2 text-slate-300">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className={`mt-2 h-2 w-2 flex-none rounded-full ${accentStyles.dot}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
