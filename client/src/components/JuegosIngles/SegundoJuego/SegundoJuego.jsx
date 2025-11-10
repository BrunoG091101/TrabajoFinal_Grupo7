import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//  Importamos las imágenes de los animales
import chickenImg from "../../../assets/image/Juego2/Chicken.jpg";
import cowImg from "../../../assets/image/Juego2/Cow.jpg";
import duckImg from "../../../assets/image/Juego2/Duck.jpg";
import horseImg from "../../../assets/image/Juego2/Horse.jpg";
import pigImg from "../../../assets/image/Juego2/Pig.jpg";
import rabbitImg from "../../../assets/image/Juego2/Rabbit.jpg";

// Importamos los sonidos
import Correcto from "../../../assets/sound/Correcto.mp3";
import Incorrecto from "../../../assets/sound/incorecto.mp3";

export default function SegundoJuego() {
  const animals = [
    { name: "Chicken", image: chickenImg },
    { name: "Cow", image: cowImg },
    { name: "Duck", image: duckImg },
    { name: "Horse", image: horseImg },
    { name: "Pig", image: pigImg },
    { name: "Rabbit", image: rabbitImg },
  ];

  const totalPreguntas = 10;

  const [animalActual, setAnimalActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(1);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // sonidos
  const sonidoCorrecto = new Audio(Correcto);
  const sonidoIncorecto = new Audio(Incorrecto);

  function mezclar(lista) {
    return [...lista].sort(() => Math.random() - 0.5);
  }

  function nuevaRonda() {
    const correcto = animals[Math.floor(Math.random() * animals.length)];
    const otras = animals
      .filter((a) => a.name !== correcto.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const opcionesMezcladas = mezclar([...otras, correcto]);

    setAnimalActual(correcto);
    setOpciones(opcionesMezcladas);
    setMensaje("");
  }

  useEffect(() => {
    nuevaRonda();
  }, []);

  function elegir(nombre) {
    if (juegoTerminado) return;

    let nuevoPuntaje = puntaje;
    if (nombre === animalActual.name) {
      sonidoCorrecto.play();
      nuevoPuntaje++;
      setMensaje("✅ ¡Correcto!");
      setPuntaje(nuevoPuntaje);
    } else {
      sonidoIncorecto.play();
      setMensaje("❌ Incorrecto.");
    }

    // Avanza a la siguiente pregunta
    if (preguntaActual < totalPreguntas) {
      setTimeout(() => {
        setPreguntaActual(preguntaActual + 1);
        nuevaRonda();
      }, 1000);
    } else {
      setTimeout(() => {
        setJuegoTerminado(true);
      }, 1000);
    }
  }

  function reiniciarJuego() {
    setPuntaje(0);
    setPreguntaActual(1);
    setJuegoTerminado(false);
    nuevaRonda();
  }

  return (
    <div className="container text-center mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", margin: "auto" }}>
        <h2>🐾Adivina el Animal🐾</h2>

        {!juegoTerminado ? (
          <>
            <p className="mt-2">Pregunta {preguntaActual} de {totalPreguntas}</p>

            {animalActual && (
              <img
                src={animalActual.image}
                alt="Animal"
                className="img-fluid rounded my-3"
                style={{ maxHeight: "600px", objectFit: "cover" }}
              />
            )}

            <div className="d-flex justify-content-center flex-wrap">
              {opciones.map((op, i) => (
                <button
                  key={i}
                  className="btn btn-outline-primary m-2"
                  onClick={() => elegir(op.name)}
                >
                  {op.name}
                </button>
              ))}
            </div>

            <p className="fs-5 mt-3">{mensaje}</p>
            <p>Puntaje actual: {puntaje}</p>
          </>
        ) : (
          <div className="mt-3">
            <h3 className="text-success">Juego terminado🎉</h3>
            <p className="fs-4">Tu puntaje final: {puntaje} / {totalPreguntas}</p>
            <button className="btn btn-success mt-3" onClick={reiniciarJuego}>
               Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}