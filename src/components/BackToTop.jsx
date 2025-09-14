// src/components/BackToTop.jsx
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop({ threshold = 400 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll(); // stato iniziale
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  function scrollTop() {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const base =
    "fixed z-40 bottom-5 right-5 md:bottom-6 md:right-6 h-12 w-12 grid place-items-center rounded-full " +
    "border border-white/15 bg-white/5 backdrop-blur " +
    "shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-cyan-400/20 " +
    "hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(19,242,220,0.25)] " +
    "transition transform";
  const visibility = show
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "opacity-0 translate-y-2 pointer-events-none";

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Torna su"
      className={`${base} ${visibility}`}
    >
      <ArrowUp className="h-5 w-5 text-cyan-200" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(60%_60%_at_50%_20%,rgba(19,242,220,.12),transparent_55%)]"
      />
    </button>
  );
}
