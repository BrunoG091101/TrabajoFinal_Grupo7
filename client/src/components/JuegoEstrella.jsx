import { useState, useEffect } from "react";
import { Image, Button } from "react-bootstrap";
import estrella2 from "../assets/image/estrella2.png";

//  Sonidos
import sonidoClick from "../assets/sound/boton.mp3";
import sonidoGanar from "../assets/sound/Correcto.mp3";

function JuegoEstrella() {
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [posicionEstrella, setPosicionEstrella] = useState({ x: 30, y: 30 });
  const [isVisible, setIsVisible] = useState(true);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  //  Inicializar objetos de audio
  const audioClick = new Audio(sonidoClick);
  const audioGanar = new Audio(sonidoGanar);

  function generarPosicion() {
    const anchoContenedor = 900;
    const altoContenedor = 300;
    const anchoBoton = 80;
    const altoBoton = 40;

    const posicionX = Math.floor(Math.random() * (anchoContenedor - anchoBoton));
    const posicionY = Math.floor(Math.random() * (altoContenedor - altoBoton));

    setPosicionEstrella({ x: posicionX, y: posicionY });
  }

  function atraparEstrella() {
    if (juegoTerminado) return;

    audioClick.play(); //  Sonido al hacer clic
    setPuntaje((prev) => prev + 1);
    setIsVisible(false);

    setTimeout(() => {
      if (!juegoTerminado) {
        generarPosicion();
        setIsVisible(true);
      }
    }, 1000);
  }

  useEffect(() => {
    if (puntaje >= 10) {
      audioGanar.play(); //  Sonido al ganar
      setMensaje("¡Ganaste!");
      setJuegoTerminado(true);
      setIsVisible(false);
    }
  }, [puntaje]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!isVisible || juegoTerminado) return;
      generarPosicion();
    }, 1200);

    return () => clearInterval(intervalo);
  }, [isVisible, juegoTerminado]);

  function reiniciarJuego() {
    setPuntaje(0);
    setMensaje("");
    setJuegoTerminado(false);
    setIsVisible(true);
    generarPosicion();
  }

  return (
    <div className="ContenedorJuego" style={{ position: "relative", height: "400px" }}>
      <div className="contenedorBoton">
        {isVisible && (
          <button
            className="Estrella"
            onClick={atraparEstrella}
            style={{
              position: "absolute",
              left: `${posicionEstrella.x}px`,
              top: `${posicionEstrella.y}px`,
              background: "transparent",
              border: "none",
              cursor: "pointer"
            }}
          >
            <Image src={estrella2} width="60" height="30" />
          </button>
        )}
      </div>

      <div className="mensaje" style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>{mensaje}</h1>
        <h2>{puntaje}</h2>
      </div>

      <div className="botonReinicio" style={{ textAlign: "center", marginTop: "10px" }}>
        {juegoTerminado && (
          <Button variant="success" onClick={reiniciarJuego}>
            Reiniciar Juego
          </Button>
        )}
      </div>
    </div>
  );
}

export default JuegoEstrella;
