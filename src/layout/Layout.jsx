// src/layout/Layout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      localStorage.getItem("maddev_consent_v1") === "true";
    if (!ok) setShowConsent(true);
  }, []);

  const acceptConsent = () => {
    localStorage.setItem("maddev_consent_v1", "true");
    setShowConsent(false);
  };

  // helper per aprire modali nel Footer via CustomEvent
  const openTerms = () => window.dispatchEvent(new Event("maddev:open-terms"));
  const openPrivacy = () =>
    window.dispatchEvent(new Event("maddev:open-privacy"));

  return (
    <div className="main-layout">
      <Navbar brand="MADdev" />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />

      {/* Banner consenso sticky bottom (non modale, non blocca scroll) */}
      {showConsent && (
        <div
          role="region"
          aria-label="Consenso termini e privacy"
          className="fixed inset-x-0 bottom-0 z-[60] px-3 sm:px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 sm:p-5 text-slate-100 backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
              {/* tinta soffusa */}
              <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(19,242,220,.10),transparent_55%),radial-gradient(60%_60%_at_80%_100%,rgba(194,19,242,.12),transparent_55%)]" />
              <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-3xl">
                  <h3 className="text-base font-extrabold text-white">
                    Benvenutə su MADdev
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Per continuare, accetta i{" "}
                    <button
                      type="button"
                      className="underline decoration-cyan-300/60 hover:text-white"
                      onClick={openTerms}
                    >
                      Termini &amp; Condizioni
                    </button>{" "}
                    e la{" "}
                    <button
                      type="button"
                      className="underline decoration-fuchsia-400/60 hover:text-white"
                      onClick={openPrivacy}
                    >
                      Privacy Policy
                    </button>
                    .
                  </p>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <button
                    type="button"
                    onClick={acceptConsent}
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 font-semibold text-white shadow-[0_10px_24px_rgba(19,242,220,0.25)] hover:brightness-110"
                  >
                    Accetta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
