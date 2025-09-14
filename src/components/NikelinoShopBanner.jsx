import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Check,
  ShoppingCart,
} from "lucide-react";

export default function NikelinoShopBanner({
  siteUrl = "https://nikelino-shop.vercel.app",
  shopName = "Nikelino Shop",
  perks = [
    "Script & risorse selezionate",
    "Pagamenti sicuri e supporto",
    "Aggiornamenti e fix rapidi",
    "Qualità e performance garantite",
  ],
  backgroundUrl = "https://i.imgur.com/ZsNAHKy.jpeg",
}) {
  return (
    <section className="relative w-full py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Cornice soft come il banner Discord */}
        <div className="relative rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 p-[1px] shadow-[0_0_18px_rgba(0,0,0,0.25)]">
          <div className="relative overflow-hidden rounded-2xl bg-white/3 backdrop-blur-lg">
            {/* bordo/glow superiore tenue */}
            <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-fuchsia-400/35" />

            {/* BACKGROUND IMAGE (cover) */}
            <img
              src={backgroundUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
            />

            {/* tinta interna tenue */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(70% 60% at 15% 10%, rgba(19,242,220,.10), transparent 55%)," +
                  "radial-gradient(70% 60% at 85% 90%, rgba(194,19,242,.12), transparent 55%)",
              }}
            />

            <div className="relative grid gap-8 p-6 md:grid-cols-[1.1fr_.9fr] md:p-10">
              {/* Left: testo + CTA */}
              <div>
                <div className="font-jbm inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-1 text-xs font-semibold tracking-widest text-cyan-200/90">
                  {/* // SHOP WEB */}
                  // SHOP WEB
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                </div>

                <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
                  Scopri le risorse su{" "}
                  <span className="bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                    {shopName}
                  </span>
                </h2>

                <p className="mt-3 max-w-2xl text-slate-200">
                  Catalogo sempre aggiornato, qualità curata e supporto
                  dedicato. Visita lo shop per offerte, bundle e novità.
                </p>

                {/* Perks */}
                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {perks.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-slate-100"
                    >
                      <Check className="h-4 w-4 flex-none text-cyan-300" />
                      <span className="text-sm">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: card informativa (al posto dell'immagine stand-alone) */}
              <div className="relative grid place-items-center">
                <div className="rounded-2xl bg-[#0f1722]/80 p-4 ring-1 ring-white/10 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-3 py-1 text-xs text-cyan-200">
                      <ShoppingCart className="h-4 w-4" />
                      Store Online
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white">
                      {shopName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      Vetrina digitale con risorse, script e pacchetti.
                    </p>
                    <a
                      href={siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-400/60 bg-white/5 px-4 py-2 font-semibold text-cyan-200 hover:drop-shadow-[0_0_12px_rgba(19,242,220,0.65)]"
                    >
                      Apri lo shop <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* puntini glow sobri */}
                <span className="pointer-events-none absolute -right-2 top-4 h-1.5 w-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_6px_rgba(19,242,220,0.8)]" />
                <span className="pointer-events-none absolute left-4 -bottom-2 h-1.5 w-1.5 rounded-full bg-fuchsia-400/80 shadow-[0_0_6px_rgba(194,19,242,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
