import { useEffect } from "react";
import { createContext, useState, useMemo, useCallback } from "react";
import axios from "axios";

const AutorizacionContext = createContext(null);
export default AutorizacionContext;

export function AutorizacionProveedor({ children }) {
  const [usuarioBD,setUsuarioBD]=useState([]);

 const [user,setUser]=useState(()=>{
  try {
    const usuarioAlmacenado= localStorage.getItem('LOCAL_STORAGE_KEY');
    return usuarioAlmacenado ? JSON.parse(usuarioAlmacenado):null;
  } catch (error) {
    localStorage.removeItem('LOCAL_STORAGE_KEY');
    return null;
  }
 });

 const buscarUsuarios=useCallback(async () => {
  try {
  const res = await axios.get('/api/obtenerusuario');
  setUsuarioBD(res.data);  
  } catch (error) {
    console.log("Error  al cargar jugadores",error);
  }
  
 },[]);

  const login = useCallback((credentials) => {
    try {
      const usuarioEncontrado = usuarioBD.find(
      u => u.username === credentials.username && u.password === credentials.password
      );

      if (usuarioEncontrado) {
        const { password, ...userWithPassword } = usuarioEncontrado;
        setUser(userWithPassword);
        return { success: true };
      } else {
        setUser(null);
        return {
          success: false,
          message: "Credenciales inválidas. Por favor, inténtelo de nuevo.",
        };
      }
    } catch (error) {
      console.error("Login fallido por error inesperado:", error.message);
      setUser(null);
      return {
        success: false,
        message: "Ocurrió un error inesperado durante el login.",
      };
    }
  }, [usuarioBD]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(()=>{
    if(user){
      localStorage.setItem('LOCAL_STORAGE_KEY',JSON.stringify(user));
    }else{
      localStorage.removeItem('LOCAL_STORAGE_KEY');
    }
  },[user]);
  useEffect(()=>{
    buscarUsuarios();
  },[])

  const valorDelContexto = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      usuarioBD
    }),
    [user, login, logout,usuarioBD]
  );

  return (
    <AutorizacionContext.Provider value={valorDelContexto}>
      {children}
    </AutorizacionContext.Provider>
  );
}
