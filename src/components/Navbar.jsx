// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";

export default function Navbar({ brand = "MADdev • Portfolio" }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const sheetRef = useRef(null);
  const btnRef = useRef(null);

  // id delle sezioni (devono esistere in Home.jsx)
  const sections = [
    { id: "home", label: "HOME" },
    { id: "about", label: "CHI SONO" },
    { id: "services", label: "SERVIZI" },
    { id: "projects", label: "PROGETTI" },
    { id: "faq", label: "FAQ" },
    // { id: "review", label: "RECENSIONI" },
    { id: "contact", label: "CONTATTI" },
  ];
  const sectionIds = sections.map((s) => s.id);

  // chiudi sheet mobile (ESC / click fuori)
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e) {
      if (!open) return;
      if (
        sheetRef.current &&
        !sheetRef.current.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // blocca scroll quando sheet è aperto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // attiva hash se presente
  useEffect(() => {
    const hash = (window.location.hash || "").slice(1);
    if (hash && sectionIds.includes(hash)) setActive(hash);
  }, []); // eslint-disable-line

  // ---- SCROLL SPY: attiva link in base alla posizione della viewport ----
  useEffect(() => {
    let ticking = false;

    function getOffsets() {
      return sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rectTop = el.getBoundingClientRect().top + window.scrollY;
          return { id, top: Math.max(0, rectTop) };
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);
    }

    let offsets = getOffsets();

    function onResize() {
      offsets = getOffsets();
      onScroll(); // riallinea subito
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const center = window.scrollY + window.innerHeight / 2;
        let current = offsets[0]?.id || "home";
        for (let i = 0; i < offsets.length; i++) {
          if (offsets[i].top <= center) current = offsets[i].id;
          else break;
        }
        setActive(current);
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // ricalcola dopo immagini/font
    const t1 = setTimeout(onResize, 300);
    const t2 = setTimeout(onResize, 1200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []); // eslint-disable-line

  // smooth scroll a sezione
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setOpen(false);
  }

  // stile link
  const baseLink =
    "relative rounded-xl px-3 py-2 font-jbm text-white outline-none transition " +
    "hover:drop-shadow-[0_0_8px_rgba(19,242,220,0.45)] focus-visible:text-white";
  const activePill =
    "rounded-full border border-white/15 bg-gradient-to-br from-cyan-400/15 to-fuchsia-500/20 px-3 py-2 font-jbm text-white";

  // SHOP fucsia glass
  const shopHref = "https://discord.gg/DhDfTWPucn";
  const shopBtn =
    "rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-3 py-2 " +
    "font-jbm text-white backdrop-blur shadow-[0_6px_20px_rgba(194,19,242,0.25)] " +
    "hover:bg-fuchsia-500/25 hover:shadow-[0_8px_24px_rgba(194,19,242,0.35)]";

  return (
    <>
      {/* HEADER FIXED */}
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          aria-label="Navigazione principale"
          className="relative h-16 w-full flex items-center justify-between gap-2 border-b border-white/10 px-3 shadow-[0_6px_10px_rgba(0,0,0,0.15)] backdrop-blur-xl backdrop-saturate-150 bg-white/5"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-fuchsia-400/60"
          />
          {/* Brand */}
          <div className="group flex items-center gap-2 text-slate-100">
            <span className="h-8 w-8 rounded-xl bg-[radial-gradient(closest-side,theme(colors.fuchsia.600),rgba(194,19,242,0.35)_60%,transparent_100%)] shadow-[0_0_24px_rgba(194,19,242,0.45)_inset,0_0_24px_rgba(194,19,242,0.4)] flex items-center justify-center font-extrabold text-[13px] leading-none text-white/90 [text-shadow:0_0_8px_rgba(194,19,242,0.6)] select-none">
              &lt;/&gt;
            </span>
            <span className="font-bold tracking-wide">{brand}</span>
          </div>

          {/* Desktop links + SHOP */}
          <div className="hidden items-center gap-2 md:flex">
            <ul className="flex items-center gap-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(s.id)}
                    className={active === s.id ? activePill : baseLink}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={shopHref}
              target="_blank"
              rel="noreferrer"
              className={shopBtn}
            >
              SHOP
            </a>
          </div>

          {/* Mobile: SHOP + toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={shopHref}
              target="_blank"
              rel="noreferrer"
              className={shopBtn}
            >
              SHOP
            </a>
            <button
              ref={btnRef}
              onClick={() => setOpen((v) => !v)}
              className="rounded-xl p-2 text-slate-100 outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-cyan-300"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              aria-controls="menu-sheet"
              aria-expanded={open}
              type="button"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <div
          id="menu-sheet"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={[
            "fixed left-3 right-3 z-40 origin-top rounded-xl border border-white/10 bg-white/6 p-2 shadow-2xl backdrop-blur-xl backdrop-saturate-150 transition md:hidden",
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          ].join(" ")}
          style={{ top: 64 }}
        >
          <ul className="flex flex-col">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  className={[
                    "block w-full rounded-xl px-3 py-3 text-left font-jbm text-white hover:drop-shadow-[0_0_8px_rgba(19,242,220,0.45)]",
                    active === s.id ? activePill : "",
                  ].join(" ")}
                >
                  {s.label}
                </button>
                {i === 3 && <div className="my-1 h-px bg-white/10" />}
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Spacer per il nav fixed */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
