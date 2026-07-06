import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(() => {
    const stored = localStorage.getItem("utilisateur");
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  const login = async (email, motDePasse) => {
    const { data } = await loginUser({ email, motDePasse });
    localStorage.setItem("token", data.token);
    localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
    setUtilisateur(data.utilisateur);
    navigate("/dashboard");
  };

  const register = async (payload) => {
    await registerUser(payload);
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    setUtilisateur(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ utilisateur, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
