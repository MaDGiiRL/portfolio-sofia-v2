import { Monitor, Gamepad2, Palette, Check } from "lucide-react";

export default function ServicesSection() {
  return (
    <section className="relative w-full py-16 md:py-24 ">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="font-jbm text-sm font-semibold tracking-widest text-cyan-300/90">
            // SERVIZI
          </div>

          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            Soluzioni{" "}
            <span className="bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(194,19,242,0.35)]">
              "Digitali
            </span>
          </h2>

          {/* Sottolineatura neon */}
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-cyan-300 to-fuchsia-400" />

          <p className="mx-auto mt-5 max-w-3xl text-slate-300">Trasformo idee in esperienze web complete: dallo sviluppo full-stack al design, con performance, SEO e identità visiva curate nei dettagli.</p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {/* 1) CIANO */}
          <ServiceCard
            color="cyan"
            icon={<Monitor className="h-6 w-6 text-cyan-200" />}
            title="Website Full-Stack & Frontend"
            desc="Siti e web-app performanti end-to-end: architettura back-end, UI reattiva e SEO tecnico per massima visibilità."
            bullets={[
              "Full-Stack (React, Node/Laravel)",
              "Frontend SPA/SSR (React, Vite, Tailwind)",
              "SEO tecnico & Core Web Vitals",
            ]}
          />

          {/* 2) FUCSIA */}
          <ServiceCard
            color="fuchsia"
            icon={<Gamepad2 className="h-6 w-6 text-fuchsia-300" />}
            title="FiveM NUI — UI/UX & Custom"
            desc="Grafica, loghi e sviluppo frontend NUI per FiveM: HUD, inventory, telefoni, menu e notifiche in HTML/CSS/JS."
            bullets={[
              "HUD / Inventory / Phone / Menu",
              "UI/UX design + asset grafici (icone, loghi)",
              "NUI frontend (HTML/CSS/JS)",
            ]}
          />

          {/* 3) CIANO */}
          <ServiceCard
            color="cyan"
            icon={<Palette className="h-6 w-6 text-cyan-200" />}
            title="Template, Wireframe & Branding"
            desc="Template personalizzati, wireframe, web design e branding d’immagine per un’identità coerente e memorabile."
            bullets={[
              "Wireframe & UX flow",
              "Template custom & Web design",
              "Brand identity (loghi, palette, UI kit)",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* Card con bordo e glow per-accent */
function ServiceCard({ color = "cyan", icon, title, desc, bullets }) {
  const isFuchsia = color === "fuchsia";

  /* BORDO (riposo + hover) + GLOW */
  const borderBase = isFuchsia
    ? "border-[rgba(194,19,242,0.45)]"
    : "border-[rgba(19,242,220,0.45)]";
  const borderHover = isFuchsia
    ? "hover:border-[rgba(194,19,242,0.9)]"
    : "hover:border-[rgba(19,242,220,0.9)]";
  const glowHover = isFuchsia
    ? "hover:shadow-[0_0_28px_rgba(194,19,242,0.38)]"
    : "hover:shadow-[0_0_28px_rgba(19,242,220,0.38)]";

  /* Icon badge / testi / overlay tinta */
  const ring = isFuchsia ? "ring-fuchsia-500/25" : "ring-cyan-400/25";
  const iconBg = isFuchsia
    ? "from-fuchsia-500/25 to-fuchsia-400/10"
    : "from-cyan-400/25 to-cyan-300/10";
  const titleClr = isFuchsia ? "text-fuchsia-300" : "text-cyan-200";
  const checkClr = isFuchsia ? "text-fuchsia-400" : "text-cyan-300";
  const overlay = isFuchsia
    ? "bg-[radial-gradient(70%_70%_at_80%_20%,rgba(194,19,242,.10),transparent_55%)]"
    : "bg-[radial-gradient(70%_70%_at_20%_20%,rgba(19,242,220,.10),transparent_55%)]";

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl bg-white/ p-6 md:p-8 backdrop-blur-xl transition",
        "border", // abilita il bordo
        borderBase,
        borderHover,
        glowHover,
        "hover:bg-white/2 transition-colors duration-300 ease-out",
      ].join(" ")}
    >
      {/* tinta soffusa */}
      <div
        className={[
          "pointer-events-none absolute inset-0 opacity-70",
          overlay,
        ].join(" ")}
      />

      {/* Icona */}
      <div
        className={[
          "relative mb-5 inline-grid h-12 w-12 place-items-center rounded-full ring-1 bg-gradient-to-br",
          ring,
          iconBg,
        ].join(" ")}
      >
        {icon}
      </div>

      <h3 className={["text-lg font-extrabold", titleClr].join(" ")}>
        {title}
      </h3>
      <p className="mt-3 text-slate-300">{desc}</p>

      <ul className="mt-5 space-y-2 text-sm">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-300">
            <Check
              className={["mt-[2px] h-4 w-4 flex-none", checkClr].join(" ")}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
