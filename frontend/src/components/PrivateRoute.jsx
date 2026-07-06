import { Navigate } from "react-router-dom";

/**
 * Bloque l'accès aux pages protégées si aucun token n'est présent.
 * Usage : <Route path="/dashboard" element={<PrivateRoute><DashboardUser /></PrivateRoute>} />
 */
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
