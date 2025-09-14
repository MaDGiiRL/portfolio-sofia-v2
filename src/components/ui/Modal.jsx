import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// ---- Scroll-lock robusto con ripristino posizione esatta
let lockCount = 0;
let savedY = 0;
let savedBody = {};
let savedHtml = {};

function lockBody() {
  if (lockCount === 0) {
    savedY = window.pageYOffset || window.scrollY || 0;

    // salva stili correnti (per ripristino 1:1)
    const b = document.body;
    const html = document.documentElement;
    savedBody = {
      position: b.style.position,
      top: b.style.top,
      left: b.style.left,
      right: b.style.right,
      width: b.style.width,
      overflow: b.style.overflow,
      paddingRight: b.style.paddingRight,
    };
    savedHtml = {
      scrollBehavior: html.style.scrollBehavior,
    };

    // disattiva eventuale smooth scroll per evitare animazioni al ripristino
    html.style.scrollBehavior = "auto";

    // compensa scrollbar per evitare layout shift
    const scrollbarW = window.innerWidth - html.clientWidth;
    if (scrollbarW > 0) b.style.paddingRight = `${scrollbarW}px`;

    // lock
    b.style.position = "fixed";
    b.style.top = `-${savedY}px`;
    b.style.left = "0";
    b.style.right = "0";
    b.style.width = "100%";
    b.style.overflow = "hidden";
  }
  lockCount++;
}

function unlockBody() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    const b = document.body;
    const html = document.documentElement;

    // ripristina stili esatti
    b.style.position = savedBody.position || "";
    b.style.top = savedBody.top || "";
    b.style.left = savedBody.left || "";
    b.style.right = savedBody.right || "";
    b.style.width = savedBody.width || "";
    b.style.overflow = savedBody.overflow || "";
    b.style.paddingRight = savedBody.paddingRight || "";
    html.style.scrollBehavior = savedHtml.scrollBehavior || "";

    // torna esattamente dove eri (niente “vai in alto”)
    window.scrollTo(0, savedY);
  }
}

export default function Modal({ open, onClose, title, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    lockBody();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockBody();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const node = (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        // chiudi solo se clic fuori dal pannello
        if (panelRef.current && !panelRef.current.contains(e.target))
          onClose?.();
      }}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl"
      >
        {/* tinta soffusa */}
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(19,242,220,.10),transparent_55%),radial-gradient(60%_60%_at_80%_100%,rgba(194,19,242,.12),transparent_55%)]" />

        {/* header */}
        <div className="relative flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
          <h3 className="text-base font-extrabold text-white">{title}</h3>
          <button
            aria-label="Chiudi"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body scrollabile */}
        <div className="relative overflow-y-auto px-5 py-4 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );

  // render nel <body> per evitare che “si appiccichi” al footer
  return createPortal(node, document.body);
}
