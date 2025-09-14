// src/components/Footer.jsx
import { useEffect, useState } from "react";
import { FileText, Shield } from "lucide-react";
import TermsModal from "./modals/TermsModal";
import PrivacyModal from "./modals/PrivacyModal";

export default function Footer() {
  const year = new Date().getFullYear();

  // modali
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  // ascolta eventi globali dal Layout (banner consenso)
  useEffect(() => {
    const onOpenTerms = () => setOpenTerms(true);
    const onOpenPrivacy = () => setOpenPrivacy(true);
    window.addEventListener("maddev:open-terms", onOpenTerms);
    window.addEventListener("maddev:open-privacy", onOpenPrivacy);
    return () => {
      window.removeEventListener("maddev:open-terms", onOpenTerms);
      window.removeEventListener("maddev:open-privacy", onOpenPrivacy);
    };
  }, []);

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-white/5 text-slate-200 backdrop-blur-xl backdrop-saturate-150">
      {/* bordo superiore a gradiente (glow) */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-fuchsia-400/60" />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand / Badge con </> */}
          <a
            href="#home"
            className="group inline-flex items-center gap-3 text-slate-100 no-underline"
          >
            <span
              className="h-9 w-9 rounded-xl
                         bg-[radial-gradient(closest-side,theme(colors.fuchsia.600),rgba(194,19,242,0.35)_60%,transparent_100%)]
                         shadow-[0_0_24px_rgba(194,19,242,0.45)_inset,0_0_24px_rgba(194,19,242,0.4)]
                         flex items-center justify-center
                         font-extrabold text-[14px] leading-none text-white/90
                         [text-shadow:0_0_8px_rgba(194,19,242,0.6)]
                         select-none"
              aria-hidden="true"
            >
              &lt;/&gt;
            </span>
            <span className="text-sm font-semibold tracking-wide text-slate-200">
              MADdev
            </span>
          </a>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/MaDGiiRL"
              aria-label="GitHub"
              className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12a10 10 0 0 0 6.838 9.488c.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.701-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.089.636-1.34-2.222-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.985 1.03-2.684-.103-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.684 0 3.842-2.337 4.687-4.565 4.936.36.31.68.919.68 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.481A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/sofia-vidotto-ba1369351"
              aria-label="LinkedIn"
              className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.24 8.16h4.52V24H.24V8.16zM8.339 8.16h4.331v2.158h.062c.603-1.142 2.077-2.347 4.276-2.347 4.573 0 5.416 3.009 5.416 6.922V24h-4.71v-7.01c0-1.673-.03-3.825-2.332-3.825-2.335 0-2.691 1.823-2.691 3.706V24H8.339V8.16z" />
              </svg>
            </a>

            {/* Discord */}
            <a
              href="https://github.com/MaDGiiRL"
              aria-label="Discord"
              className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.472 0 12.3 12.3 0 0 0-.617-1.249.077.077 0 0 0-.078-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.045-.32 13.58.099 18.058a.082.082 0 0 0 .031.055 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.104c-.676-.256-1.319-.566-1.93-.927a.077.077 0 0 1-.008-.124c.13-.098.26-.2.384-.304a.074.074 0 0 1 .077-.01c4.053 1.86 8.431 1.86 12.44 0a.074.074 0 0 1 .078.009c.125.104.254.206.385.305a.077.077 0 0 1-.008.123c-.611.36-1.254.671-1.931.927a.076.076 0 0 0-.041.105c.36.698.772 1.363 1.226 1.993a.078.078 0 0 0 .084.028 19.876 19.876 0 0 0 5.993-3.03.082.082 0 0 0 .031-.055c.5-5.177-.838-9.68-3.548-13.662a.06.06 0 0 0-.031-.028zM8.68 15.331c-1.183 0-2.155-1.09-2.155-2.431 0-1.34.955-2.431 2.155-2.431 1.21 0 2.174 1.1 2.155 2.431 0 1.341-.955 2.431-2.155 2.431zm6.64 0c-1.183 0-2.155-1.09-2.155-2.431 0-1.34.955-2.431 2.155-2.431 1.21 0 2.174 1.1 2.155 2.431 0 1.341-.945 2.431-2.155 2.431z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Riga bottom: copyright + bannerini modali */}
        <div className="mt-2 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-slate-300 md:flex-row">
          <p className="text-center md:text-left">
            © {year} • All rights reserved
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenTerms(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-slate-100 backdrop-blur transition hover:border-cyan-300/40 hover:shadow-[0_0_16px_rgba(19,242,220,0.25)]"
            >
              <FileText className="h-4 w-4 text-cyan-300" />
              <span>Termini &amp; Condizioni</span>
            </button>

            <button
              type="button"
              onClick={() => setOpenPrivacy(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-slate-100 backdrop-blur transition hover:border-fuchsia-400/40 hover:shadow-[0_0_16px_rgba(194,19,242,0.25)]"
            >
              <Shield className="h-4 w-4 text-fuchsia-300" />
              <span>Privacy Policy</span>
            </button>
          </div>

          <p className="text-center md:text-right">
            Developed with 💜 by{" "}
            <span className="font-semibold text-white">MaDGiiRL</span>
          </p>
        </div>
      </div>

      {/* glow morbido sopra il footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-full mb-2 h-8 bg-gradient-to-b from-fuchsia-500/20 via-cyan-400/10 to-transparent blur-md" />

      {/* MODALI SEPARATE */}
      <TermsModal open={openTerms} onClose={() => setOpenTerms(false)} />
      <PrivacyModal open={openPrivacy} onClose={() => setOpenPrivacy(false)} />
    </footer>
  );
}
