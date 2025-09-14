// src/components/FAQSection.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection({
  kicker = "// FAQ",
  titleLeft = "Answers to",
  titleRight = "Your Queries",
  subtitle = "Trova risposte rapide su servizi, processi e approccio allo sviluppo.",
  items = DEFAULT_ITEMS,
}) {
  // uno aperto alla volta (tutti chiusi inizialmente)
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (idx) => setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="font-jbm text-sm font-semibold tracking-widest text-cyan-300/90">
            {kicker}
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            {titleLeft}{" "}
            <span className="bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(194,19,242,0.35)]">
              {titleRight}
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
          <p className="mx-auto mt-5 max-w-3xl text-slate-300">{subtitle}</p>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-10 space-y-4">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;

            return (
              <article
                key={i}
                className={[
                  "rounded-xl border  backdrop-blur-xl transition",
                  isOpen
                    ? "border-cyan-300/50 shadow-[0_0_24px_rgba(19,242,220,0.25)]"
                    : "border-cyan-400/25 hover:border-cyan-300/40 hover:shadow-[0_0_20px_rgba(19,242,220,0.18)]",
                ].join(" ")}
              >
                <button
                  id={btnId}
                  type="button"
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left"
                >
                  <span className="font-semibold text-cyan-200">{item.q}</span>
                  <ChevronDown
                    className={[
                      "h-5 w-5 flex-none text-cyan-300 transition-transform",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                {/* Pannello: chiuso = max-h-0 + opacity-0 (non si vede fin da subito) */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  aria-hidden={!isOpen}
                  className={[
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-[60rem] opacity-100" : "max-h-0 opacity-0",
                  ].join(" ")}
                >
                  <div className="px-5 pb-5 pt-0 text-slate-300">
                    {typeof item.a === "string" ? <p>{item.a}</p> : item.a}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const DEFAULT_ITEMS = [
  {
    q: "Quali servizi offri?",
    a: (
      <>
        <p className="mb-3">
          Offro una gamma completa di servizi per privati, professionisti e
          aziende.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-cyan-300">
              Sviluppo web full-stack
            </span>
            : siti statici/dinamici, web app e sistemi complessi lato{" "}
            <span className="text-fuchsia-400 font-semibold">frontend</span> e{" "}
            <span className="text-fuchsia-400 font-semibold">backend</span>, con
            focus su velocità, sicurezza e scalabilità.
          </li>
          <li>
            <span className="font-semibold text-cyan-300">
              Web design personalizzato
            </span>
            : UI/UX su misura, layout responsive e coerenti con il brand.
          </li>
          <li>
            <span className="font-semibold text-cyan-300">Restyling siti</span>:
            refresh grafico, miglioramento performance e nuove funzionalità.
          </li>
          <li>
            <span className="font-semibold text-cyan-300">
              Branding & consulenza tecnica
            </span>
            : supporto strategico e scelte tecnologiche.
          </li>
          <li>
            <span className="font-semibold text-cyan-300">
              FiveM UI/UX customization
            </span>
            : HUD, menu, login, inventari e moduli grafici con tecnologie web
            (HTML/CSS/JS) perfettamente integrati nel tuo server.
          </li>
        </ul>
      </>
    ),
  },
  {
    q: "Come svolgi il lavoro?",
    a: (
      <>
        <p className="mb-3">Un processo chiaro, iterativo e trasparente:</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            <span className="font-semibold text-fuchsia-400">
              Analisi & brief
            </span>
            : obiettivi, requisiti e contesto.
          </li>
          <li>
            <span className="font-semibold text-fuchsia-400">
              Pianificazione
            </span>
            : fasi, milestone e tempistiche.
          </li>
          <li>
            <span className="font-semibold text-fuchsia-400">
              Mockup / prototipi
            </span>
            : anteprima concreta dell’idea.
          </li>
          <li>
            <span className="font-semibold text-fuchsia-400">
              Sviluppo iterativo
            </span>
            : aggiornamenti costanti e raccolta feedback.
          </li>
          <li>
            <span className="font-semibold text-fuchsia-400">
              Test & revisione finale
            </span>
            : funzionalità, compatibilità, usabilità.
          </li>
          <li>
            <span className="font-semibold text-fuchsia-400">
              Consegna & supporto
            </span>
            : progetto pronto all’uso + guida iniziale.
          </li>
        </ol>
      </>
    ),
  },
  {
    q: "Con quali strumenti lavori?",
    a: (
      <>
        <p className="mb-3">
          Scelgo strumenti moderni per qualità, flessibilità e tempi rapidi.
        </p>
        <div className="space-y-2">
          <p className="font-semibold text-cyan-200">Tecnologie di sviluppo</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="text-cyan-300 font-semibold">Frontend</span>:
              HTML5, CSS3, JavaScript{" "}
              <span className="text-fuchsia-400 font-semibold">(React)</span>.
            </li>
            <li>
              <span className="text-cyan-300 font-semibold">Backend</span>: PHP{" "}
              <span className="text-fuchsia-400 font-semibold">(Laravel)</span>,
              DB <span className="font-semibold">MySQL / PostgreSQL</span>.
            </li>
            <li>
              <span className="text-cyan-300 font-semibold">
                CSS Frameworks
              </span>
              : Tailwind CSS, Bootstrap.
            </li>
          </ul>
          <p className="mt-3 font-semibold text-cyan-200">
            Design & prototipazione
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Figma (layout/prototipi interattivi)</li>
            <li>Photoshop & Illustrator (grafiche, loghi)</li>
            <li>Canva (contenuti visivi rapidi)</li>
          </ul>
          <p className="mt-3 font-semibold text-cyan-200">
            Versionamento & collaborazione
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Git & GitHub (branching, PR, deploy)</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    q: "Quanto tempo impieghi per completare un progetto?",
    a: (
      <>
        <p className="mb-3">
          Dipende da complessità, funzionalità e personalizzazione.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <span className="font-semibold text-cyan-300">🎨 Design</span>: ~{" "}
            <span className="font-semibold">2–7 giorni lavorativi</span> (mockup
            & layout).
          </li>
          <li>
            <span className="font-semibold text-cyan-300">💻 Sviluppo</span>: ~{" "}
            <span className="font-semibold">1–4 settimane</span> (feature,
            integrazioni, test).
          </li>
        </ul>
        <p className="mt-3">
          Le tempistiche sono concordate in anticipo con{" "}
          <span className="font-semibold">roadmap</span> e{" "}
          <span className="font-semibold">milestone</span>.
        </p>
      </>
    ),
  },
  {
    q: "Quali sono i costi?",
    a: (
      <>
        <p className="mb-2">
          I costi dipendono da tipologia, complessità e livello di
          personalizzazione.
        </p>
        <p>
          Fornisco sempre un{" "}
          <span className="font-semibold text-cyan-300">
            preventivo personalizzato
          </span>{" "}
          in base alle tue esigenze. Apri un{" "}
          <span className="font-semibold">ticket</span> nella categoria corretta
          e analizzeremo insieme ogni dettaglio.
        </p>
      </>
    ),
  },
  {
    q: "Offri supporto post-consegna?",
    a: (
      <>
        <p className="mb-2">
          Sì. La soddisfazione del cliente prosegue anche dopo la consegna:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Assistenza tecnica gratuita per{" "}
            <span className="font-semibold">7 giorni</span> dopo la consegna.
          </li>
          <li>
            Pacchetti di <span className="font-semibold">manutenzione</span> per
            aggiornamenti e supporto continuativi.
          </li>
        </ul>
      </>
    ),
  },
  {
    q: "Come posso richiedere un servizio?",
    a: (
      <>
        <p className="mb-2">Per organizzare al meglio le richieste:</p>
        <p className="mb-3">
          Apri un <span className="font-semibold">ticket</span> nel nostro
          server{" "}
          <a
            href="https://discord.gg/DhDfTWPucn"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-cyan-300/60 text-cyan-300 hover:text-white"
          >
            Discord
          </a>
          .
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Seleziona la categoria corretta:</li>
        </ol>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Web Developer → sviluppo e programmazione</li>
          <li>Web Design → grafica, UI/UX e design</li>
          <li>FiveM UI/UX Customization → personalizzazioni per FiveM</li>
        </ul>
        <p className="mt-3">
          Descrivi nel dettaglio il progetto o la richiesta: così posso
          risponderti con una{" "}
          <span className="font-semibold text-cyan-300">proposta mirata</span>.
        </p>
      </>
    ),
  },
];
