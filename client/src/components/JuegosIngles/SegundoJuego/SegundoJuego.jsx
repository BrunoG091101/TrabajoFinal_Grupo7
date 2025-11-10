import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//  Importamos las imágenes de los animales
import chickenImg from "../../../assets/image/Juego2/Chicken.jpg";
import cowImg from "../../../assets/image/Juego2/Cow.jpg";
import duckImg from "../../../assets/image/Juego2/Duck.jpg";
import horseImg from "../../../assets/image/Juego2/Horse.jpg";
import pigImg from "../../../assets/image/Juego2/Pig.jpg";
import rabbitImg from "../../../assets/image/Juego2/Rabbit.jpg";

export default function SegundoJuego() {
  const animals = [
    { name: "Chicken", image: chickenImg},
    { name: "Cow", image:  cowImg},
    { name: "Duck", image: duckImg},
    { name: "Horse", image:  horseImg},
    { name: "Pig", image: pigImg },
    { name: "Rabbit", image: rabbitImg },
  ];

  const [animalActual, setAnimalActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [acertado, setAcertado] = useState(false);
  const [ganador, setGanador] = useState(false);

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
    setAcertado(false);
  }

  useEffect(() => {
    nuevaRonda();
  }, []);

  function elegir(nombre) {
    if (acertado || ganador) return;

    if (nombre === animalActual.name) {
      const nuevoPuntaje = puntaje + 1;
      setPuntaje(nuevoPuntaje);
      setMensaje("✅ ¡Muy bien!");
      setAcertado(true);

      if (nuevoPuntaje >= 6) {
        setGanador(true);
        setMensaje("🏆 ¡Ganaste! 🎉");
      } else {
        setTimeout(() => nuevaRonda(), 1000);
      }
    } else {
      setMensaje("❌ Intenta otra vez.");
    }
  }

  function reiniciarJuego() {
    setPuntaje(0);
    setGanador(false);
    nuevaRonda();
  }

  return (
    <div className="container text-center mt-5">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2> Adivina el Animal</h2>

        {animalActual && !ganador && (
          <img
            src={animalActual.image}
            alt="Animal"
            className="img-fluid rounded my-3"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        )}

        {!ganador ? (
          <div className="d-flex justify-content-center flex-wrap">
            {opciones.map((op, i) => (
              <button
                key={i}
                className="btn btn-outline-primary m-2"
                onClick={() => elegir(op.name)}
                disabled={acertado}
              >
                {op.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            <h3 className="text-success">{mensaje}</h3>
            <button className="btn btn-success mt-3" onClick={reiniciarJuego}>
               Jugar de nuevo
            </button>
          </div>
        )}

        {!ganador && <p className="fs-5 mt-3">{mensaje}</p>}
        <p>Puntaje: {puntaje}</p>
      </div>
    </div>
  );
}