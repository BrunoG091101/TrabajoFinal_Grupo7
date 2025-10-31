import { Navigate } from "react-router-dom";
import { useAutenticacion } from "../hook/useAutorizacion";

const ProtectorRutas = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAutenticacion();

  if (!isAuthenticated || !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default ProtectorRutas;
