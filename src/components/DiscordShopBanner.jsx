import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ShoppingCart,
  Check,
} from "lucide-react";

export default function DiscordShopBanner({
  inviteUrl = "https://discord.gg/DhDfTWPucn",
  serverName = "MADdev • Shop",
  perks = [
    "UI/NUI personalizzate FiveM",
    "Siti & landing ad alte performance",
    "Branding, template & wireframe",
    "Assistenza tecnica rapida",
  ],
  coupon = "MAD10",
  heroImg = "https://i.imgur.com/VHec2KF.png", // <- tua immagine
}) {
  return (
    <section className="relative w-full py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Cornice molto più soft */}
        <div className="relative rounded-2xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 p-[1px] shadow-[0_0_18px_rgba(0,0,0,0.25)]">
          <div className="relative overflow-hidden rounded-2xl bg-white/3 backdrop-blur-lg">
            {/* bordo/glow superiore tenue */}
            <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-fuchsia-400/35" />

            {/* tinta interna MOLTO tenue */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(70% 60% at 15% 10%, rgba(19,242,220,.08), transparent 55%)," +
                  "radial-gradient(70% 60% at 85% 90%, rgba(194,19,242,.10), transparent 55%)",
              }}
            />

            <div className="relative grid gap-8 p-6 md:grid-cols-[1.1fr_.9fr] md:p-10">
              {/* Left: testo + CTA */}
              <div>
                <div className="font-jbm inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-1 text-xs font-semibold tracking-widest text-cyan-200/90">
                  // SHOP DISCORD
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                </div>

                <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
                  Potenzia il tuo progetto con{" "}
                  <span className="bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
                    {serverName}
                  </span>
                </h2>

                <p className="mt-3 max-w-2xl text-slate-300">
                  Commissioni rapide, design futuristico e performance top.
                  Entra sul server e chiedi un preventivo: file puliti e
                  supporto dedicato.
                </p>

                {/* Perks */}
                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {perks.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-slate-200"
                    >
                      <Check className="h-4 w-4 flex-none text-cyan-300" />
                      <span className="text-sm">{p}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Row */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={inviteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 px-5 py-3 font-bold text-white shadow-[0_10px_20px_rgba(194,19,242,0.25)] transition hover:brightness-110"
                  >
                    Entra su Discord
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  {coupon && (
                    <span className="font-jbm inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                      <ShieldCheck className="h-4 w-4 text-cyan-300" />
                      Coupon 10% :&nbsp;
                      <span className="rounded px-1 font-bold text-fuchsia-300">
                        {coupon}
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* Right: immagine (sostituisce l’icona) */}
              <div className="relative grid place-items-center">
                <div className="rounded-2xl bg-[#0f1722]/80 p-3 ring-1 ring-white/10 shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                  <img
                    src={heroImg}
                    alt="Discord Shop Banner"
                    className="h-64 w-64 rounded-xl object-contain md:h-72 md:w-72"
                    loading="lazy"
                  />
                </div>

                {/* puntini glow più sobri */}
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
