import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JuegoFacil() {
  const navigate = useNavigate();

  const numerosIngles = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const diasEspañol = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const diasIngles = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [tipo, setTipo] = useState("");
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  function mezclar(lista) {
    return lista.sort(() => Math.random() - 0.5);
  }

  function nuevaPregunta() {
    if (juegoTerminado) return; // no generar nuevas preguntas si ya ganó
    setMensaje("");

    const tipoElegido = Math.random() < 0.5 ? "numero" : "dia";
    setTipo(tipoElegido);

    if (tipoElegido === "numero") {
      const numero = Math.floor(Math.random() * 10) + 1;
      const correcta = numerosIngles[numero - 1];
      let otras = [];

      while (otras.length < 2) {
        const aleatoria = numerosIngles[Math.floor(Math.random() * 10)];
        if (aleatoria !== correcta && !otras.includes(aleatoria)) {
          otras.push(aleatoria);
        }
      }

      setPregunta(numero.toString());
      setOpciones(mezclar([correcta, ...otras]));
    } else {
      const indice = Math.floor(Math.random() * diasEspañol.length);
      const correcta = diasIngles[indice];
      let otras = [];

      while (otras.length < 2) {
        const aleatoria = diasIngles[Math.floor(Math.random() * diasIngles.length)];
        if (aleatoria !== correcta && !otras.includes(aleatoria)) {
          otras.push(aleatoria);
        }
      }

      setPregunta(diasEspañol[indice]);
      setOpciones(mezclar([correcta, ...otras]));
    }
  }

  useEffect(() => {
    nuevaPregunta();
  }, []);

  function elegir(opcion) {
    if (juegoTerminado) return; //no permitir seguir jugando

    let correcto = false;

    if (tipo === "numero") {
      correcto = opcion === numerosIngles[parseInt(pregunta) - 1];
    } else {
      const indice = diasEspañol.indexOf(pregunta);
      correcto = opcion === diasIngles[indice];
    }

    if (correcto) {
      const nuevoPuntaje = puntaje + 1;
      setPuntaje(nuevoPuntaje);
      setMensaje("¡Muy bien!");

      if (nuevoPuntaje >= 6) {
        setJuegoTerminado(true); // marcar fin del juego
        setMensaje("¡Excelente! Has terminado el juego.");
      } else {
        setTimeout(() => nuevaPregunta(), 800);
      }
    } else {
      setMensaje("Intenta otra vez.");
    }
  }

  function irASiguiente() {
    navigate("/juegos");
  }

  return (
    <div className="container text-center mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3>
          {tipo === "numero"
            ? "¿Cómo se dice este número en inglés?"
            : "¿Cómo se dice este día en inglés?"}
        </h3>

        <h1 className="py-3">{pregunta}</h1>

        {opciones.map((op) => (
          <button
            key={op}
            className="btn btn-outline-primary m-2"
            onClick={() => elegir(op)}
            disabled={juegoTerminado} //desactivar los botones si terminó
          >
            {op}
          </button>
        ))}

        <p className="mt-3 fs-5">{mensaje}</p>
        <p>Puntaje: {puntaje}</p>

        {!juegoTerminado && (
          <button className="btn btn-secondary mt-2" onClick={nuevaPregunta}>
            Nueva pregunta
          </button>
        )}

        {/*aparece solo cuando gana */}
        {juegoTerminado && (
          <div className="mt-3">
            <button className="btn btn-success" onClick={irASiguiente}>
              Volver al menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
