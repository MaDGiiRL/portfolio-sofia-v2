// src/components/PortfolioSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";

/* ====== CATEGORIE RICHIESTE ====== */
const CATEGORIES = [
  "All Projects",
  "Web Site",
  "Web Design",
  "FiveM",
  "Grafica",
  "3D Experience",
];

/* ====== PROGETTI REALI ====== */
const PROJECTS = [
  {
    id: "mads-portfolio-v1",
    title: "MaD's Portfolio V1",
    category: "Web Site",
    cover: "https://i.imgur.com/tn9kPr3.png",
    images: [
      "https://i.imgur.com/tn9kPr3.png",
      "https://i.imgur.com/RmdSAik.png",
      "https://i.imgur.com/GYm2896.png",
      "https://i.imgur.com/SUhy0bN.png",
      "https://i.imgur.com/WkQkkVB.png",
      "https://i.imgur.com/ww45gsJ.png",
      "https://i.imgur.com/k1pdtOZ.png",
      "https://i.imgur.com/OCUrtrV.png",
      "https://i.imgur.com/N4XsOzL.png",
    ],
    description:
      "Portfolio personale moderno e responsive, curato in ogni dettaglio per mostrare stile, competenze e approccio allo sviluppo. Animazioni fluide e UX attenta all’accessibilità.",
    tags: [
      "React 19",
      "Vite 7",
      "Bootstrap 5",
      "React Router 7",
      "Framer Motion",
      "SweetAlert2",
      "EmailJS",
      "Supabase",
    ],
    features: [
      "Layout moderno & responsive",
      "Animazioni con Framer Motion",
      "Routing avanzato (RR7)",
      "Form contatti (EmailJS)",
      "Feedback UX (SweetAlert2)",
      "Integrazioni Supabase",
    ],
    href: "https://madsportfolio.vercel.app",
    accent: "fuchsia",
    featured: true,
  },

  {
    id: "fallen-world",
    title: "Fallen World — Official Website",
    category: "Web Site",
    cover: "https://i.imgur.com/Xvtw2hu.png",
    images: [
      "https://i.imgur.com/Xvtw2hu.png",
      "https://i.imgur.com/9yec4E7.png",
      "https://i.imgur.com/dUmQ6Ud.png",
      "https://i.imgur.com/OTU1BxW.png",
      "https://i.imgur.com/quDl5Aj.png",
    ],
    description:
      "Sito ufficiale per server FiveM con lore, regolamenti, comunità (prese/libere), team/staff e invito Discord sempre visibile. Accessibile, chiaro e community-driven.",
    tags: [
      "React 19",
      "Vite 7",
      "Tailwind 4",
      "React Router 7",
      "Framer Motion",
      "Lucide",
    ],
    features: [
      "Sezioni: Lore, Regolamenti, Comunità",
      "Team Lore & Staff",
      "Legal in modale (T&C • Privacy)",
      "CTA Discord persistente",
      "UX accessibile (ESC, focus ring)",
      "Navigazione fluida",
    ],
    href: "https://fallen-world.vercel.app",
    accent: "cyan",
    featured: true,
  },

  {
    id: "nikelino-shop",
    title: "Nikelino Shop",
    category: "Web Site",
    cover: "https://i.imgur.com/VsIf68j.png",
    images: [
      "https://i.imgur.com/VsIf68j.png",
      "https://i.imgur.com/SmqAUJ1.png",
      "https://i.imgur.com/k4SyC4o.png",
      "https://i.imgur.com/Fhxg0H8.png",
      "https://i.imgur.com/MbU2Q6i.png",
      "https://i.imgur.com/Lr6t1IW.png",
      "https://i.imgur.com/HRMoQ2L.png",
    ],
    description:
      "Piattaforma web per vendita/gestione risorse FiveM: auth Supabase, routing ottimizzato, animazioni e validazioni robuste.",
    tags: [
      "React 19",
      "Vite 7",
      "Tailwind 4",
      "React Router 7",
      "Supabase",
      "Framer Motion",
      "Zod",
      "SweetAlert2",
    ],
    features: [
      "Auth & profili (Supabase)",
      "UX dinamica (Framer Motion)",
      "Validazioni (Zod)",
      "Notifiche (SweetAlert2)",
      "Catalogo responsive",
      "Navigazione fluida",
    ],
    href: "https://nikelino-shop.vercel.app",
    accent: "fuchsia",
  },
  {
    id: "report-panel",
    title: "Report Panel (QB-Core)",
    category: "FiveM",
    cover: "https://i.imgur.com/AjoObad.png",
    images: [
      "https://i.imgur.com/AjoObad.png",
      "https://i.imgur.com/2tcZ3MZ.png",
      "https://i.imgur.com/v5qY52R.png",
      "https://i.imgur.com/dxzk1vc.png",
      "https://i.imgur.com/dc4G0bk.png",
      "https://i.imgur.com/yzdLVY6.png",
    ],
    description:
      "Un sistema completo e reattivo per la gestione dei report in-game: apertura ticket, smistamento ai moderatori, tracciamento stato e audit log.",
    tags: [
      "Javascript",
      "CSS",
      "Supabase",
      "Framer Motion",
      "SweetAlert2",
      "Lua",
      "QB-Core",
    ],
    features: [
      "Invio report",
      "Lista report utente",
      "Dashboard staff",
      "Elenco report aperti",
      "Azioni staff",
      "Storico con ID, motivo, stato, data",
    ],
    accent: "cyan",
  },
  {
    id: "inventory_1",
    title: "Custom Fallen World OX Inventory (ESX/QB-Core)",
    category: "FiveM",
    cover: "https://i.imgur.com/iuv4ZIt.png",
    images: [
      "https://i.imgur.com/iuv4ZIt.png",
      "https://i.imgur.com/hqjl6lH.png",
      "https://i.imgur.com/8F3dnI9.png",
    ],
    description:
      "Inventory system avanzato e responsive per server FiveM con supporto ESX e QB-Core. Gestione drag & drop, utilizzo oggetti in tempo reale, stack, peso dinamico e interfaccia ottimizzata per l’esperienza di gioco.",
    tags: [
      "JavaScript",
      "HTML/CSS",
      "Mantine",
      "Framer Motion",
      "Lua",
      "ESX",
      "QB-Core",
    ],
    features: [
      "Compatibilità ESX e QB-Core",
      "UI drag & drop responsive",
      "Sistema peso/slot configurabile",
      "Stack oggetti e gestione quantità",
      "Categorie (armi, cibo, utility, ecc.)",
      "Animazioni fluide e feedback UX",
      "Hotbar rapida personalizzabile",
      "Tooltip dinamici con info oggetti",
      "Supporto immagini custom",
    ],
    accent: "fuchsia",
  },
  {
    id: "hud_1",
    title: "Custom ESX HUD MaD City",
    category: "FiveM",
    cover: "https://i.imgur.com/DW59gRS.png",
    images: [
      "https://i.imgur.com/DW59gRS.png",
      "https://i.imgur.com/oOl30P1.png",
      "https://i.imgur.com/ZHXROEY.png",
    ],
    description:
      "Inventory system avanzato e responsive per server FiveM con supporto ESX e QB-Core. Gestione drag & drop, utilizzo oggetti in tempo reale, stack, peso dinamico e interfaccia ottimizzata per l’esperienza di gioco.",
    tags: [
      "JavaScript",
      "HTML/CSS",
      "Mantine",
      "Framer Motion",
      "Lua",
      "ESX",
      "QB-Core",
    ],
    features: [
      "Compatibilità ESX e QB-Core",
      "UI drag & drop responsive",
      "Sistema peso/slot configurabile",
      "Stack oggetti e gestione quantità",
      "Categorie (armi, cibo, utility, ecc.)",
      "Animazioni fluide e feedback UX",
      "Hotbar rapida personalizzabile",
      "Tooltip dinamici con info oggetti",
      "Supporto immagini custom",
    ],
    accent: "fuchsia",
  },
  {
    id: "inventory_2",
    title: "Custom Mad City OX Inventory (ESX/QB-Core)",
    category: "FiveM",
    cover: "https://i.imgur.com/YcU0dzO.png",
    images: [
      "https://i.imgur.com/YcU0dzO.png",
      "https://i.imgur.com/DrGELX8.png",
      "https://i.imgur.com/2vfHjJz.png",
    ],
    description:
      "Inventory system avanzato e responsive per server FiveM con supporto ESX e QB-Core. Gestione drag & drop, utilizzo oggetti in tempo reale, stack, peso dinamico e interfaccia ottimizzata per l’esperienza di gioco.",
    tags: [
      "JavaScript",
      "HTML/CSS",
      "Mantine",
      "Framer Motion",
      "Lua",
      "ESX",
      "QB-Core",
    ],
    features: [
      "Compatibilità ESX e QB-Core",
      "UI drag & drop responsive",
      "Sistema peso/slot configurabile",
      "Stack oggetti e gestione quantità",
      "Categorie (armi, cibo, utility, ecc.)",
      "Animazioni fluide e feedback UX",
      "Hotbar rapida personalizzabile",
      "Tooltip dinamici con info oggetti",
      "Supporto immagini custom",
    ],
    accent: "cyan",
  },
  {
    id: "website_v1",
    title: "Server RP Website Template V1",
    category: "Web Site",
    cover: "https://i.imgur.com/Xc4TTAm.png",
    images: [
      "https://i.imgur.com/Xc4TTAm.png",
      "https://i.imgur.com/fJSWPRz.png",
      "https://i.imgur.com/VTwXmKA.png",
      "https://i.imgur.com/yvHWyDT.png",
      "https://i.imgur.com/NwFSbL0.png",
      "https://i.imgur.com/CHKWRVC.png",
    ],
    description:
      "Template moderno, elegante e responsive per la presentazione di server RP su FiveM. Realizzato con React, Vite e Tailwind, include sezioni Hero full screen, About, Regolamento interattivo, Staff, Sponsor e form di candidatura per lo staff. Pensato per community che vogliono un sito accattivante, veloce e facilmente personalizzabile.",
    tags: ["JavaScript", "HTML/CSS", "React", "TailwindCSS", "Lucide Icons"],
    features: [
      "Hero section full screen con overlay a gradienti",
      "Sezione About con immagini e card dettagliate",
      "Regolamento interattivo diviso in categorie e sidebar",
      "Carosello sponsor con loop orizzontale animato",
      "Sezione Staff con ruoli, foto e icone personalizzate",
      "Form candidatura staff con icone inline e validazione base",
      "Palette colori personalizzabile e gradienti dinamici",
      "Responsive design ottimizzato per mobile e desktop",
      "Animazioni fluide e dettagli visivi moderni",
    ],
    href: "https://template-website-server-rp-v1.vercel.app",
    accent: "fuchsia",
  },
  {
    id: "website_v3",
    title: "Wedding Template",
    category: "Web Site",
    cover: "https://i.imgur.com/sqY7Chf.png",
    images: [
      "https://i.imgur.com/sqY7Chf.png",
      "https://i.imgur.com/qjxzX4P.png",
      "https://i.imgur.com/ebY54mN.png",
      "https://i.imgur.com/ebY54mN.png",
      "https://i.imgur.com/tYItgsD.png",
    ],
    description:
      "Questo progetto è una simulazione frontend di un pannello tipo MaCasatoresc.com realizzato con React, Vite e TailwindCSS. Presenta un design elegante e moderno, con sezioni dedicate a informazioni sull'evento, galleria fotografica, RSVP e dettagli logistici. Il layout è completamente responsive, garantendo un'esperienza utente ottimale su dispositivi mobili e desktop. Include animazioni fluide e interazioni intuitive per migliorare l'engagement degli utenti.",
    tags: ["JavaScript", "HTML/CSS", "React", "TailwindCSS", "Lucide Icons"],
    features: [
      "Modificare i dati del wedding website (nomi, data, location, testi ecc.)",
      "Vedere in live preview una landing page di matrimonio con hero, countdown, about, story e RSVP",
      "Design elegante, moderno e responsive",
      "Animazioni fluide e interazioni intuitive",
      "BACKEND IN COSTRUZIONE",
    ],
    href: "https://wedding-template-one.vercel.app/",
    accent: "cyan",
  },
];

/* ====== HOOK UTILI ====== */
function useKey(handler, deps) {
  useEffect(() => {
    const onKey = (e) => handler(e);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Drag-to-scroll orizzontale (mouse + touch) */
function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e) => {
      isDown = true;
      el.classList.add("dragging");
      startX =
        (("touches" in e ? e.touches[0].pageX : e.pageX) ?? 0) - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onLeaveUp = () => {
      isDown = false;
      el.classList.remove("dragging");
    };
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault(); // evita lo swipe browser su mobile
      const x =
        (("touches" in e ? e.touches[0].pageX : e.pageX) ?? 0) - el.offsetLeft;
      const walk = x - startX;
      el.scrollLeft = scrollLeft - walk;
    };

    // mouse
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onLeaveUp);
    el.addEventListener("mouseup", onLeaveUp);
    el.addEventListener("mousemove", onMove);

    // touch
    el.addEventListener("touchstart", onDown, { passive: false });
    el.addEventListener("touchend", onLeaveUp);
    el.addEventListener("touchmove", onMove, { passive: false });

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onLeaveUp);
      el.removeEventListener("mouseup", onLeaveUp);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend", onLeaveUp);
      el.removeEventListener("touchmove", onMove);
    };
  }, [ref]);
}

/* ====== COMPONENTE PRINCIPALE ====== */
export default function PortfolioSection() {
  const [query, setQuery] = useState("All Projects");
  const [limit, setLimit] = useState(6);
  const [modal, setModal] = useState(null); // {project, indexImg}

  // ✅ categorie fisse come richiesto
  const categories = CATEGORIES;

  const filtered = useMemo(
    () =>
      query === "All Projects"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === query),
    [query]
  );
  const visible = filtered.slice(0, limit);

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="font-jbm text-sm font-semibold tracking-widest text-cyan-300/90">
            // PORTFOLIO
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            Crafted{" "}
            <span className="bg-gradient-to-b from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Innovations
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
          <p className="mx-auto mt-5 max-w-3xl text-slate-300">
            Progetti con design futuristico, tecnologia avanzata e funzionalità
            fluide.
          </p>
        </div>

        {/* Filtri */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((c) => {
            const active = c === query;
            return (
              <button
                key={c}
                onClick={() => {
                  setQuery(c);
                  setLimit(6);
                }}
                type="button"
                className={[
                  "rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "border border-white/15 bg-white/5 text-white shadow-[0_6px_20px_rgba(19,242,220,0.25)]"
                    : "border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Griglia */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <PortfolioCard
              key={p.id}
              project={p}
              onOpen={(idx = 0) => setModal({ project: p, indexImg: idx })}
            />
          ))}
        </div>

        {/* Load more */}
        {visible.length < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setLimit((n) => n + 6)}
              className="rounded-xl border border-fuchsia-500/40 px-6 py-3 font-semibold text-fuchsia-300 shadow-[0_10px_24px_rgba(194,19,242,0.25)] hover:brightness-110"
            >
              LOAD MORE PROJECTS
            </button>
          </div>
        )}
      </div>

      {/* Modale */}
      {modal && <DetailsModal modal={modal} setModal={setModal} />}
    </section>
  );
}

/* ====== CARD ====== */
function PortfolioCard({ project, onOpen }) {
  const {
    title,
    cover,
    description,
    tags,
    href,
    accent = "fuchsia",
    featured,
    images,
  } = project;

  const palette =
    accent === "fuchsia"
      ? { ["--acc"]: "#C213F2", ["--accGlow"]: "rgba(194,19,242,0.38)" }
      : { ["--acc"]: "#13F2DC", ["--accGlow"]: "rgba(19,242,220,0.38)" };

  return (
    <div className="group rounded-xl" style={palette}>
      {/* cornice neon on hover */}
      <div className="rounded-xl bg-transparent p-[2px] transition group-hover:bg-[linear-gradient(135deg,var(--acc),var(--acc))] group-hover:shadow-[0_0_26px_var(--accGlow)]">
        <div className="overflow-hidden rounded-[calc(theme(borderRadius.xl)-2px)] border border-white/10 bg-white/5 shadow-[0_6px_16px_rgba(0,0,0,0.25)] backdrop-blur-xl transition">
          {/* COVER */}
          <figure
            className="relative cursor-pointer"
            onClick={() => onOpen(0)}
            aria-label={`Apri dettagli ${title}`}
          >
            <img
              src={cover}
              alt={title}
              className="h-44 w-full object-cover md:h-52"
              loading="lazy"
            />

            {featured && (
              <span className="absolute right-3 top-3 rounded-full border border-cyan-300/40 bg-[#0f1722]/85 px-2 py-0.5 text-xs font-bold text-cyan-200">
                Featured
              </span>
            )}

            {/* overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1722]/30 to-[#0f1722]/75 opacity-0 transition duration-300 group-hover:opacity-100" />

            {/* TESTO overlay */}
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-xl font-extrabold text-transparent">
                {title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-200/90">
                {description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-cyan-400/40 bg-white/5 px-2 py-0.5 text-xs text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </figcaption>
          </figure>

          {/* FOOTER (link esterno) */}
          <div className="flex items-center justify-between px-4 pb-3 pt-2">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-transparent bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 bg-clip-text font-semibold"
              >
                <ExternalLink className="h-4 w-4 text-fuchsia-300" />
                <span className="sr-only">Apri progetto</span>
              </a>
            ) : (
              <span aria-hidden className="h-4" />
            )}

            {/* Thumb rapida */}
            {Array.isArray(images) && images[1] && (
              <button
                type="button"
                onClick={() => onOpen(1)}
                className="h-9 w-14 overflow-hidden rounded-md border border-white/10 hover:border-white/20"
                aria-label="Apri galleria"
              >
                <img src={images[1]} className="h-full w-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====== MODALE ====== */
function DetailsModal({ modal, setModal }) {
  const { project, indexImg } = modal;
  const [idx, setIdx] = useState(indexImg || 0);
  const ref = useRef(null);
  const thumbsRef = useRef(null);

  // chiusura/arrow keys
  useKey(
    (e) => {
      if (e.key === "Escape") setModal(null);
      if (e.key === "ArrowLeft") setIdx((n) => Math.max(0, n - 1));
      if (e.key === "ArrowRight")
        setIdx((n) => Math.min(project.images.length - 1, n + 1));
    },
    [project.images.length]
  );

  useEffect(() => {
    function onDown(ev) {
      if (!ref.current) return;
      if (!ref.current.contains(ev.target)) setModal(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [setModal]);

  // attiva drag-scroll per le thumbnails
  useDragScroll(thumbsRef);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-3 backdrop-blur-sm">
      {/* Stile locale per nascondere la scrollbar e gestire il cursore */}
      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .dragging { cursor: grabbing !important; }
      `}</style>

      <div
        ref={ref}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f1722]/95 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Project details"
      >
        {/* header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-fuchsia-400">
            {project.title}
          </h3>
          <button
            onClick={() => setModal(null)}
            className="rounded-full border border-fuchsia-400/40 p-1.5 text-fuchsia-300 hover:bg-white/5"
            aria-label="Chiudi"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* GALLERY */}
          <div>
            <div className="relative overflow-hidden rounded-xl border border-white/10">
              <img
                src={project.images[idx]}
                alt={`${project.title} image ${idx + 1}`}
                className="aspect-video w-full object-cover select-none"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                <button
                  onClick={() => setIdx((n) => Math.max(0, n - 1))}
                  className="pointer-events-auto rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                  aria-label="Prev"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setIdx((n) => Math.min(project.images.length - 1, n + 1))
                  }
                  className="pointer-events-auto rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* thumbs: no scrollbar visibile + drag */}
            <div
              ref={thumbsRef}
              className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-1 cursor-grab select-none"
            >
              {project.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={[
                    "h-16 w-28 flex-none overflow-hidden rounded-md border",
                    i === idx
                      ? "border-cyan-300/60"
                      : "border-white/10 hover:border-white/20",
                  ].join(" ")}
                >
                  <img
                    src={src}
                    className="h-full w-full object-cover pointer-events-none"
                    draggable={false}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <p className="text-slate-300">{project.description}</p>

            <div className="mt-4">
              <h4 className="font-bold text-fuchsia-300">Technologies</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-cyan-400/40 bg-white/5 px-2 py-0.5 text-xs text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-bold text-fuchsia-300">Features</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-400/60 bg-white/5 px-4 py-2 font-semibold text-cyan-200 hover:drop-shadow-[0_0_12px_rgba(19,242,220,0.65)]"
              >
                Visit Project <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
