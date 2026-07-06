import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    role: "developpeur",
  });
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState(false);
  const [chargement, setChargement] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      await register(form);
      setSucces(true);
    } catch (err) {
      setErreur(
        err.response?.data?.message || "Impossible de créer le compte."
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

        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-subtitle">
          Rejoins la plateforme pour consommer les API TTS, ASR et traduction.
        </p>

        {erreur && <div className="auth-error">{erreur}</div>}
        {succes && (
          <div className="auth-error" style={{ borderColor: "var(--success)", color: "var(--success)", background: "rgba(61,214,140,0.1)" }}>
            Compte créé ! Tu peux maintenant te connecter.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="prenom">Prénom</label>
              <input
                id="prenom"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nom@exemple.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="motDePasse">Mot de passe</label>
            <input
              id="motDePasse"
              name="motDePasse"
              type="password"
              value={form.motDePasse}
              onChange={handleChange}
              placeholder="8 caractères minimum"
              minLength={8}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="role">Type de compte</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              <option value="developpeur">Développeur</option>
              <option value="public">Public</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={chargement}
          >
            {chargement ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <div className="auth-footer">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
