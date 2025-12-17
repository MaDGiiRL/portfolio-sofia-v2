// src/components/Hero.jsx
export default function Hero() {
  // helper: smooth scroll + aggiorna hash
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  // ⬇️ markup del codice invariato
  const codeHtml = `
<div class="font-code text-xs p-4 text-white">
  <div class="mb-2 text-gray-500">&lt;!-- MaDGiiRL --&gt;</div>
  <div class="mb-2 text-neon-purple">&lt;div <span class="text-lime-300">class=</span><span class="text-yellow-300">"developer-mode"</span>&gt;</div>
  <div class="pl-6 mb-2">
    <span class="text-blue-400">const</span> <span class="text-white">startWebsite</span> = () <span class="text-pink-400">→</span> <span class="text-yellow-300">{</span>
  </div>
  <div class="pl-12 mb-2">
    <span class="text-blue-400">let</span> <span class="text-white">idea</span> = <span class="text-green-400">"🚀 Launching innovation"</span>;
  </div>
  <div class="pl-12 mb-2">
    <span class="text-blue-400">const</span> <span class="text-white">tools</span> = <span class="text-green-400">["HTML", "CSS", "JavaScript", "React"]</span>;
  </div>
  <div class="pl-12 mb-2">
    <span class="text-blue-400">const</span> <span class="text-white">mission</span> = <span class="text-green-400">"Craft seamless experiences"</span>;
  </div>
  <div class="pl-12 mb-2"></div>
  <div class="pl-12 mb-2">
    <span class="text-blue-400">const</span> <span class="text-white">build</span> = (<span class="text-white">tools, mission</span>) <span class="text-pink-400">→</span> <span class="text-yellow-300">{</span>
  </div>
  <div class="pl-20 mb-2">
    <span class="text-blue-400">return</span> <span class="text-white">tools</span>.map(<span class="text-white">tool</span> <span class="text-pink-400">→</span> <span class="text-white">tool</span> + <span class="text-green-400">" + "</span> + <span class="text-white">mission</span>);
  </div>
  <div class="pl-12 mb-2 text-yellow-300">};</div>
  <div class="pl-12 mb-2"></div>
  <div class="pl-12 mb-2">
    <span class="text-blue-400">return</span> <span class="text-white">build</span>(<span class="text-white">tools, mission</span>);
  </div>
  <div class="pl-6 mb-2 text-yellow-300">};</div>
  <div class="mb-2 text-neon-purple">&lt;/div&gt;</div>
</div>
  `;

  return (
    <section className="relative w-full py-15 md:py-50 min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
        {/* LEFT */}
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 px-4 py-1 text-xs font-semibold tracking-widest text-cyan-200/90 font-jbm">
            <span className="glow-cyan">FULL STACK DEVELOPER</span>
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] md:text-7xl">
            <span className="block">Creo codice</span>
            <span className="block bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              che connette
            </span>
            <span className="block bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent">
              il mondo
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-slate-300 md:text-lg">
            Trasformo idee in esperienze web immersive con tecnologia
            d’avanguardia e design futuristico, curando prestazioni,
            accessibilità e dettagli.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onClick={scrollTo("contact")}
              className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(194,19,242,0.35)] hover:brightness-110"
            >
              CONTATTAMI
            </a>
            <a
              href="#projects"
              onClick={scrollTo("projects")}
              className="rounded-xl border border-cyan-400/70 px-5 py-3 text-sm font-bold text-cyan-200 hover:drop-shadow-[0_0_12px_rgba(19,242,220,0.65)]"
            >
              VEDI PROGETTI
            </a>
          </div>
        </div>

        {/* RIGHT — code card */}
        <div className="relative">
          <div className="relative rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-[2px] shadow-[0_0_40px_rgba(19,242,220,0.25)]">
            <div className="relative overflow-hidden rounded-2xl bg-[#0f1722]/95 code-card">
              <div className="code-tint" />
              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(19,242,220,0.9)]" />
              <span className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(194,19,242,0.9)]" />

              {/* avatar + name */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="mx-auto grid place-items-center">
                  <div className="grid place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-[3px] shadow-[0_0_24px_rgba(19,242,220,0.45)]">
                    <img
                      src="https://i.imgur.com/uQDizMx.jpeg"
                      alt="MaDGiiRL"
                      className="h-24 w-24 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="mt-3 text-sm font-extrabold tracking-wide text-cyan-300">
                    MaDGiiRL
                  </div>
                  <div className="text-xs font-semibold text-white">
                    Full Stack Developer
                  </div>
                </div>
              </div>

              {/* code content */}
              <div
                className="relative z-10 max-h-[420px] overflow-auto p-6 md:p-8 code-block"
                dangerouslySetInnerHTML={{ __html: codeHtml }}
              />
            </div>
          </div>

          {/* tech pill */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-[#0f1722]/70 px-5 py-2 text-sm text-cyan-200 shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur md:absolute md:left-1/2 md:mt-0 md:-translate-x-1/2 md:translate-y-2">
            <span>React</span>
            <span className="opacity-50">|</span>
            <span>Node.js</span>
            <span className="opacity-50">|</span>
            <span>Laravel</span>
            <span className="opacity-50">|</span>
            <span>JavaScript</span>
          </div>
        </div>
      </div>
    </section>
  );
}
