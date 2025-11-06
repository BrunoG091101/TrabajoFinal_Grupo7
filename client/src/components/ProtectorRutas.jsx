import { Navigate, Outlet } from "react-router-dom";
import { useAutenticacion } from "../hook/useAutorizacion";

const ProtectorRutas = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAutenticacion();

  if (!isAuthenticated || !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/error" replace />;
  }

  return <Outlet/>;
};

export default ProtectorRutas;
