import { useState } from "react";
import "./ApiKeyCard.css";

export default function ApiKeyCard({ cle }) {
  const [visible, setVisible] = useState(false);
  const [copie, setCopie] = useState(false);

  const masquer = (valeur) =>
    visible ? valeur : `${valeur.slice(0, 6)}${"•".repeat(18)}${valeur.slice(-4)}`;

  const copier = () => {
    navigator.clipboard.writeText(cle.valeurCle);
    setCopie(true);
    setTimeout(() => setCopie(false), 1500);
  };

  const pourcentage = Math.min(
    100,
    Math.round((cle.nombreAppelsUtilises / cle.quotaMax) * 100)
  );

  const active = cle.statut === "active";

  return (
    <div className={`keycard ${active ? "" : "keycard-revoked"}`}>
      <div className="keycard-main">
        <div className="keycard-top">
          <span className="keycard-label">Clé API</span>
          <span className={`badge ${active ? "badge-success" : "badge-danger"}`}>
            {active ? "Active" : "Révoquée"}
          </span>
        </div>

        <div className="keycard-value mono">{masquer(cle.valeurCle)}</div>

        <div className="keycard-actions">
          <button className="btn btn-outline" onClick={() => setVisible(!visible)}>
            {visible ? "Masquer" : "Afficher"}
          </button>
          <button className="btn btn-outline" onClick={copier}>
            {copie ? "Copié !" : "Copier"}
          </button>
        </div>
      </div>

      <div className="keycard-perforation" />

      <div className="keycard-stub">
        <div className="keycard-stub-item">
          <span className="stub-label">Quota utilisé</span>
          <span className="stub-value mono">
            {cle.nombreAppelsUtilises}/{cle.quotaMax}
          </span>
          <div className="stub-bar">
            <div
              className="stub-bar-fill"
              style={{
                width: `${pourcentage}%`,
                background: pourcentage > 85 ? "var(--danger)" : "var(--accent-2)",
              }}
            />
          </div>
        </div>
        <div className="keycard-stub-item">
          <span className="stub-label">Créée le</span>
          <span className="stub-value">
            {new Date(cle.dateCreation).toLocaleDateString("fr-FR")}
          </span>
        </div>
      </div>
    </div>
  );
}
