import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getApisDisponibles, demanderNouvelleApi } from "../services/api";
import "./DashboardUser.css";
import "./DemandeAPI.css";

export default function DemandeAPI() {
  const [apisDisponibles, setApisDisponibles] = useState([]);
  const [apiId, setApiId] = useState("");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getApisDisponibles()
      .then((res) => setApisDisponibles(res.data))
      .catch(() => setErreur("Impossible de charger le catalogue d'API."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    try {
      await demanderNouvelleApi({ apiId, message });
      setSucces(true);
      setApiId("");
      setMessage("");
    } catch (err) {
      setErreur(
        "Envoi impossible pour le moment. Vérifie que l'endpoint /api/demandes existe côté backend."
      );
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="layout">
      <Navbar />

      <main className="content">
        <div className="content-header">
          <div>
            <h1>Demander une nouvelle API</h1>
            <p>Ta demande sera étudiée par un administrateur avant activation.</p>
          </div>
        </div>

        {erreur && <div className="auth-error">{erreur}</div>}
        {succes && (
          <div className="demande-success">
            Demande envoyée ! Tu seras notifié dès qu'un administrateur l'aura traitée.
          </div>
        )}

        <form className="card demande-card" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="api">API souhaitée</label>
            <select
              id="api"
              value={apiId}
              onChange={(e) => setApiId(e.target.value)}
              required
            >
              <option value="" disabled>
                Choisis une API
              </option>
              {apisDisponibles.map((api) => (
                <option key={api.id} value={api.id}>
                  {api.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Motif de la demande</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explique brièvement à quoi te servira cette API..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={envoi}>
            {envoi ? "Envoi..." : "Envoyer la demande"}
          </button>
        </form>
      </main>
    </div>
  );
}
