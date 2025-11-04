import { useContext } from "react";
import AutorizacionContext from "../context/AutorizacionContext";

export function useAutenticacion() {
  const context = useContext(AutorizacionContext);
  if (context === null) {
    throw new Error('useAutenticacion debe ser usado dentro de un AutorizacionProveedor');
  }
  return context;
}
