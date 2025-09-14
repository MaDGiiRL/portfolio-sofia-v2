import { useState } from "react";
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Github,
  Dribbble,
  Facebook,
  ExternalLink,
} from "lucide-react";

const ICONS = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  dribbble: Dribbble,
  facebook: Facebook,
};

export default function ContactSection({
  email = "sofiavidotto8@gmail.com",
  phone = "+39 351 725 5899",
  socials = [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "GitHub", href: "#", icon: "github" },
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Dribbble", href: "#", icon: "dribbble" },
  ],
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    bot: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'sent' | 'error'

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Il nome è richiesto.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Inserisci un’email valida.";
    if (form.message.trim().length < 10)
      e.message = "Scrivi almeno 10 caratteri.";
    if (form.bot) e.bot = "Spam rilevato.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setStatus("sending");
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      };
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // fallback: stampa a console
        console.log("[Contact] payload:", payload);
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("sent");
      setForm({ name: "", email: "", message: "", bot: "" });
      setTimeout(() => setStatus("idle"), 1800);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1800);
    }
  }

  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="font-jbm text-sm font-semibold tracking-widest text-cyan-300/90">
            // CONTATTI
          </div>

          <h2 className="mt-2 text-3xl font-extrabold text-white md:text-5xl">
            Connetti per{" "}
            <span className="bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(194,19,242,0.35)]">
              Innovare
            </span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
          <p className="mx-auto mt-5 max-w-3xl text-slate-300">
            Pronta a trasformare la tua idea in realtà digitale? Scrivimi e
            costruiamo qualcosa di straordinario.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-white/10 bg-white/1 p-6 backdrop-blur-xl"
          >
            {/* honeypot */}
            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={form.bot}
              onChange={(e) => setForm((f) => ({ ...f, bot: e.target.value }))}
            />

            <Field
              label="Nome"
              placeholder="Inserisci il tuo nome"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              error={errors.name}
            />
            <Field
              label="Email"
              type="email"
              placeholder="Inserisci la tua email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              error={errors.email}
            />
            <Textarea
              label="Messaggio"
              placeholder="Parlami del tuo progetto"
              rows={6}
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              error={errors.message}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 px-5 py-3 font-bold text-white shadow-[0_10px_24px_rgba(194,19,242,0.35)] transition hover:brightness-110 disabled:opacity-70"
            >
              {status === "sending"
                ? "Invio in corso…"
                : status === "sent"
                ? "Messaggio inviato ✓"
                : status === "error"
                ? "Errore, riprova"
                : "INVIA MESSAGGIO"}
            </button>
          </form>

          {/* Info + Social */}
          <aside className="rounded-2xl border border-white/10 bg-white/1 p-6 backdrop-blur-xl">
            <img
              src="https://i.imgur.com/uxWml6P.png"
              alt="logo"
              width={200}
              className="block mx-auto mb-4"
            />
            <h3 className="text-xl font-extrabold text-cyan-300">
              Restiamo in contatto
            </h3>
            <p className="mt-2 text-slate-300">
              Disponibile per progetti freelance, collaborazioni o una
              chiacchierata su tech & design.
            </p>

            <ul className="mt-6 space-y-3 text-slate-200">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-300" />
                <a
                  href={`mailto:${email}`}
                  className="hover:underline decoration-cyan-300/60"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-300" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
              </li>
            </ul>

            <h4 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Seguimi
            </h4>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              {socials.map(({ label, href, icon }, i) => {
                const Icon = ICONS[icon] ?? ExternalLink;
                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-slate-200 transition hover:border-cyan-300/40 hover:shadow-[0_0_16px_rgba(19,242,220,0.25)]"
                  >
                    <Icon className="h-4 w-4 text-cyan-300 transition group-hover:scale-110" />
                    <span className="text-sm">{label}</span>
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ------ sub components ------ */

function Field({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder = "",
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1 block text-sm font-semibold text-slate-300">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={[
          "w-full rounded-xl border bg-transparent px-4 py-3 text-slate-100 placeholder:text-slate-400/70 outline-none",
          "border-white/10 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30",
          error ? "border-fuchsia-500/50" : "",
        ].join(" ")}
      />
      {error && (
        <span className="mt-1 block text-xs text-fuchsia-400">{error}</span>
      )}
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  error,
  placeholder = "",
  rows = 5,
}) {
  return (
    <label className="mb-2 block">
      <span className="mb-1 block text-sm font-semibold text-slate-300">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={[
          "w-full resize-y rounded-xl border bg-transparent px-4 py-3 text-slate-100 placeholder:text-slate-400/70 outline-none",
          "border-white/10 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30",
          error ? "border-fuchsia-500/50" : "",
        ].join(" ")}
      />
      {error && (
        <span className="mt-1 block text-xs text-fuchsia-400">{error}</span>
      )}
    </label>
  );
}
