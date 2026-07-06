import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ApiKeyCard from "../components/ApiKeyCard";
import { getCles, genererCle, getHistorique, getFacturation } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./DashboardUser.css";

export default function DashboardUser() {
  const { utilisateur } = useAuth();
  const [cles, setCles] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [facturation, setFacturation] = useState({ montantTotal: 0, nombreRequetes: 0 });
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const chargerDonnees = async () => {
    setChargement(true);
    setErreur("");
    try {
      const [clesRes, histRes, factRes] = await Promise.all([
        getCles(),
        getHistorique(),
        getFacturation(),
      ]);
      setCles(clesRes.data);
      setHistorique(histRes.data);
      const fact = Array.isArray(factRes.data) ? factRes.data[0] : factRes.data;
      setFacturation(fact || { montantTotal: 0, nombreRequetes: 0 });
    } catch (err) {
      setErreur("Impossible de charger tes données. Vérifie ta connexion au backend.");
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    chargerDonnees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGenererCle = async () => {
    try {
      await genererCle();
      chargerDonnees();
    } catch (err) {
      setErreur("La génération de la clé a échoué.");
    }
  };

  const totalAppels = cles.reduce((acc, c) => acc + c.nombreAppelsUtilises, 0);
  const clesActives = cles.filter((c) => c.statut === "active").length;

  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <div className="content-header">
          <div>
            <h1>Tableau de bord</h1>
            <p>Bienvenue {utilisateur?.prenom}, voici l'état de ta consommation API.</p>
          </div>
        </div>
        {erreur && <div className="auth-error" style={{ marginBottom: 24 }}>{erreur}</div>}
        <div className="stats-grid">
          <StatCard label="Clés actives" value={clesActives} />
          <StatCard label="Appels utilisés" value={totalAppels} />
          <StatCard label="Requêtes facturées" value={facturation.nombreRequetes || 0} />
          <StatCard
            label="Montant à payer"
            value={`${facturation.montantTotal || 0}`}
            unit="FCFA"
            accent="var(--accent)"
          />
        </div>
        <div className="section-title">
          <h2>Mes clés API</h2>
          <button className="btn btn-primary" onClick={handleGenererCle}>
            + Générer une clé
          </button>
        </div>
        <div className="keys-list">
          {chargement && <div className="empty-state">Chargement...</div>}
          {!chargement && cles.length === 0 && (
            <div className="card empty-state">
              Tu n'as encore aucune clé API. Génère-en une pour commencer.
            </div>
          )}
          {!chargement &&
            cles.map((cle) => <ApiKeyCard key={cle.id} cle={cle} />)}
        </div>
        <div className="section-title">
          <h2>Historique des requêtes</h2>
        </div>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {historique.length === 0 ? (
            <div className="empty-state">Aucun appel enregistré pour le moment.</div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>API</th>
                  <th>Temps d'exécution</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {historique.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.dateAppel).toLocaleString("fr-FR")}</td>
                    <td>{log.nomApi || log.api_id}</td>
                    <td>{log.tempsExecution ? `${log.tempsExecution} ms` : "—"}</td>
                    <td>
                      <span className={`badge ${log.statut === "reussi" ? "badge-success" : "badge-danger"}`}>
                        {log.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
