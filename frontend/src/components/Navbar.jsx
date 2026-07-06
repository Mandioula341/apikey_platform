import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { utilisateur, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">{"</>"}</span>
        <span className="sidebar-brand-name">APIKey</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          Tableau de bord
        </NavLink>
        <NavLink to="/demande-api" className="sidebar-link">
          Demander une API
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        {utilisateur && (
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {utilisateur.prenom?.[0]}
              {utilisateur.nom?.[0]}
            </div>
            <div>
              <div className="sidebar-user-name">
                {utilisateur.prenom} {utilisateur.nom}
              </div>
              <div className="sidebar-user-role">{utilisateur.role}</div>
            </div>
          </div>
        )}
        <button className="btn btn-outline sidebar-logout" onClick={logout}>
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
