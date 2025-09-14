import Modal from "../ui/Modal";

export default function TermsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Terms & Conditions">
      <div
        className="prose prose-invert max-w-none text-slate-200"
        dangerouslySetInnerHTML={{
          __html: `
<div class="tc-modal-body">
  <h1 class="title">Terms &amp; Conditions</h1>
  <p class="update">terms4 17 agosto 2025</p>
  <p class="intro">I presenti Termini disciplinano l’accesso e l’uso del sito web MaD’s Portfolio. Accedendo o utilizzando il Sito, accetti integralmente questi Termini.</p>
  <main>
    <h2>1. Proprietà intellettuale</h2>
    <p>Salvo diversa indicazione, contenuti, grafiche, loghi, layout e codice sono di proprietà di Sofia Vidotto. È vietata la riproduzione o il riuso non autorizzato.</p>
    <h2>2. Uso consentito </h2>
    <ul>
      <li>Non interferire con la sicurezza o il funzionamento del Sito.</li>
      <li>Non utilizzare il Sito per attività illecite, spam o distribuzione di malware.</li>
      <li>Non tentare di accedere a dati o aree non pubbliche.</li>
    </ul>
    <h2>3. Link a siti di terzi</h2>
    <p>Il Sito può contenere collegamenti a risorse esterne non controllate da noi. Non siamo responsabili per contenuti o policy di tali siti.</p>
    <h2>4. Esclusione di garanzie</h2>
    <p>Il Sito è fornito “così com’è” e “come disponibile”. Non garantiamo assenza di errori, interruzioni o vulnerabilità, né che i contenuti siano sempre aggiornati o completi.</p>
    <h2>5. Limitazione di responsabilità</h2>
    <p> Nei limiti consentiti dalla legge, non saremo responsabili per danni indiretti, incidentali, consequenziali, perdita di dati o profitti derivanti dall’uso o impossibilità d’uso del Sito.</p>
    <h2>6. Modifiche</h2>
    <p> Possiamo aggiornare questi Termini in qualsiasi momento. Le modifiche hanno effetto dalla pubblicazione su questa pagina; l’uso continuato del Sito costituisce accettazione delle modifiche. </p>
    <h2>7. Legge applicabile </h2>
    <p>Questi Termini sono regolati dalla legge italiana, fatto salvo il diritto inderogabile del consumatore nel proprio Stato di  residenza, ove applicabile.</p>
    <h2>8. Contatti</h2>
    <p>Per richieste sui Termini: <a href="mailto:sofiavidotto8@gmail.com">sofiavidotto8@gmail.com</a></p>
  </main>
</div>`,
        }}
      />
    </Modal>
  );
}
