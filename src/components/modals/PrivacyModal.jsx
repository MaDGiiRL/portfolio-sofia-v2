import Modal from "../ui/Modal";

export default function PrivacyModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Privacy Policy">
      <div className="prose prose-invert max-w-none text-slate-200">
        <p className="text-sm text-slate-400">
          Ultimo aggiornamento: 17 agosto 2025
        </p>
        <p>
          Questa Informativa descrive come vengono trattati i dati personali
          raccolti tramite il sito
          <strong> MaD’s Portfolio</strong>.
        </p>
        <h3>Dati trattati</h3>
        <ul>
          <li>
            Dati di contatto inviati volontariamente (nome, email, messaggio).
          </li>
          <li>
            Dati tecnici/di navigazione (IP, user agent) per sicurezza e
            statistiche anonime.
          </li>
        </ul>
        <h3>Finalità e basi giuridiche</h3>
        <ul>
          <li>
            Rispondere alle richieste inviate (esecuzione di misure
            precontrattuali/consenso).
          </li>
          <li>
            Mantenere sicurezza e migliorare il sito (legittimo interesse).
          </li>
        </ul>
        <h3>Conservazione</h3>
        <p>
          I dati sono conservati per il tempo necessario alle finalità indicate
          e/o ad obblighi di legge.
        </p>
        <h3>Diritti dell’interessato</h3>
        <p>
          Puoi richiedere accesso, rettifica, cancellazione, limitazione,
          opposizione. Contatta:{" "}
          <a href="mailto:sofiavidotto8@gmail.com" className="text-cyan-300">
            sofiavidotto8@gmail.com
          </a>
          .
        </p>
        <h3>Terze parti</h3>
        <p>
          Strumenti esterni possono raccogliere dati tecnici (es. hosting,
          analytics). I fornitori sono selezionati e conformi alla normativa
          applicabile.
        </p>
      </div>
    </Modal>
  );
}
