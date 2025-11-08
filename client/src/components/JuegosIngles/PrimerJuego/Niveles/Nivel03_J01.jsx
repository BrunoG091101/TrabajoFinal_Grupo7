import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'

function Nivel03_J01({onNivelCompletado}) {

  const baseColores = [
    { nombre: "RED", codigo: "#c70000ff" },
    { nombre: "BLUE", codigo: "#004ae9ff" },
    { nombre: "GREEN", codigo: "#009431ff" },
    { nombre: "YELLOW", codigo: "#e2ab12ff" },
  ];

  const [colores, setColores] = useState([]);
  const [textos, setTextos] = useState([]);
  const [seleccion, setSeleccion] = useState(null);
  const [paresEncontrados, setParesEncontrados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [mensajeFinal, setMensajeFinal] = useState("");
  const tiempoLimite = 2;
  
  const barajar = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  
  useEffect(() => {
    const coloresMezclados = barajar(baseColores);
    const textosMezclados = barajar(baseColores);
    
    setColores(coloresMezclados);
    setTextos(textosMezclados);
  }, []);
  
  useEffect(() => {
    if (!seleccion) return;
    
    setTiempoRestante(tiempoLimite);
    setMensaje(`Buscá el par de ${seleccion.item.nombre}...`);
    
    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 0.1) {
          clearInterval(intervalo);
          setSeleccion(null);
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(1)); // redondeo a 1 decimal
      });
    }, 100);
    
    return () => clearInterval(intervalo);
  }, [seleccion]);

  const obtenerColorTiempo = () => {
    if (tiempoRestante > 1.3) return "limegreen";
    if (tiempoRestante > 0.4) return "gold";
    return "red";
  };
  
  useEffect(() => {
    if (paresEncontrados.length === baseColores.length) {
      setMensajeFinal("¡Ganaste! Todos los pares encontrados.");
      onNivelCompletado();
    } else {
      setMensajeFinal(`Pares encontrados: ${paresEncontrados.length}/${baseColores.length}`);
    }
  });

  const manejarClick = (item, tipo) => {
    if (paresEncontrados.includes(item.nombre)) return;

    if (!seleccion) {
      setSeleccion({ item, tipo });
      return;
    }

    if (seleccion.item.nombre === item.nombre && seleccion.tipo !== tipo) {
      setParesEncontrados((prev) => [...prev, item.nombre]);
      setMensaje(`¡Encontraste el par de ${item.nombre}!`);
    } else {
      setMensaje(`No coincide con ${seleccion.item.nombre}.`);
    }

    setSeleccion(null);
    setTiempoRestante(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <div>
        {colores.map((c, i) => (
          <Button
            key={`color-${i}`}
            onClick={() => manejarClick(c, "color")}
            disabled={paresEncontrados.includes(c.nombre)}
            style={{
              backgroundColor: c.codigo,
              width: "80px",
              height: "80px",
              borderRadius: "1rem",
              margin: "0.5rem",
              border: "none",
              opacity: paresEncontrados.includes(c.nombre) ? 0.3 : 1,
              cursor: "pointer",
            }}
          >
          </Button>
        ))}
      </div>

      <div>
        {textos.map((c, i) => (
          <Button
            key={`texto-${i}`}
            onClick={() => manejarClick(c, "texto")}
            disabled={paresEncontrados.includes(c.nombre)}
            style={{
              backgroundColor: "brown",
              border: "2px solid #ccc",
              borderRadius: "1rem",
              margin: "0.5rem",
              padding: "0.8rem 1.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              opacity: paresEncontrados.includes(c.nombre) ? 0.3 : 1,
            }}
          >
            {c.nombre}
          </Button>
        ))}
      </div>

      {mensaje && (
        <p
          style={{
            color: "gold",
            fontWeight: "bold",
            marginTop: "1rem",
            fontSize: "1.2rem",
          }}
        >
          {mensaje}
        </p>
      )}

      {tiempoRestante > 0 && (
        <p style={{ color: obtenerColorTiempo(), fontWeight: "bold", fontSize: "1.2rem"}}>
          Tiempo restante: {tiempoRestante.toFixed(1)}s
        </p>
      )}

      <p style={{ marginTop: "1rem", color: "black" }}>{mensajeFinal}</p>
    </div>
  )   
}

export default Nivel03_J01;