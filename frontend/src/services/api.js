/**
 * services/api.js
 * ------------------------------------------------------------------
 * Client HTTP centralisé pour parler au backend (Membre 2 / Membre 3).
 *
 * Routes :
 *   POST   /api/auth/register        { nom, prenom, email, motDePasse }
 *   POST   /api/auth/login           { email, motDePasse } -> { token, utilisateur }
 *   GET    /api/cles                 -> liste des clés API de l'utilisateur connecté
 *   POST   /api/cles                 -> génère une nouvelle clé
 *   (la révocation d'une clé est réservée à l'admin, gérée par Membre 4 — pas de route ici)
 *   GET    /api/logs                 -> historique des appels (log_consommation)
 *   GET    /api/facturation          -> montant facturable / factures
 *   GET    /api/apis                 -> catalogue des API disponibles (pour le formulaire)
 *   POST   /api/demandes             -> demande d'accès à une nouvelle API
 */

import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("utilisateur");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

export const getCles = () => api.get("/cles");
export const genererCle = () => api.post("/cles");

export const getHistorique = () => api.get("/logs");

export const getFacturation = () => api.get("/facturation");

export const getApisDisponibles = () => api.get("/apis");
export const demanderNouvelleApi = (data) => api.post("/demandes", data);

export default api;
