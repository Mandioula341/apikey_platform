import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      await login(email, motDePasse);
    } catch (err) {
      setErreur(
        err.response?.data?.message || "Email ou mot de passe incorrect."
      );
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <div className="auth-brand">
          <span className="auth-brand-mark">{"</>"}</span>
          <span className="auth-brand-name">APIKey</span>
        </div>

        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">
          Accède à tes clés API, ton historique et ta facturation.
        </p>

        {erreur && <div className="auth-error">{erreur}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nom@exemple.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="motDePasse">Mot de passe</label>
            <input
              id="motDePasse"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={chargement}
          >
            {chargement ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="auth-footer">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
