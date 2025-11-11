import { useState, useEffect,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Correcto from "../../../assets/sound/Correcto.mp3";
import Incorrecto from "../../../assets/sound/incorecto.mp3";
import AutorizacionContext from "../../../context/AutorizacionContext"; 

export default function JuegoFacil() {
  const numerosIngles = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const diasEspañol = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const diasIngles = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [tipo, setTipo] = useState("");
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(1);
  const totalPreguntas = 10;
  const { user } = useContext(AutorizacionContext);

  function mezclar(lista) {
    return lista.sort(() => Math.random() - 0.5);
  }

  function nuevaPregunta() {
    if (preguntaActual > totalPreguntas) return;
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

  async function guardarPuntaje(puntajeFinal) {
  try {
    if (!user || !user.username) {
      console.warn("No hay usuario logueado, no se guardará el puntaje.");
      return;
    }

    // Obtener el puntaje actual del usuario
    const res = await axios.get(`/api/obtenerusuario/${user.username}`);
    const puntajeActual = res.data?.puntaje || 0;

    // Sumar el nuevo puntaje
    const nuevoTotal = puntajeActual + puntajeFinal;

    // Actualizar el puntaje en la base de datos
    await axios.put(`/api/actualizarPuntaje/${user.username}`, {
      puntaje: nuevoTotal,
    });

    console.log(`✅ Puntaje acumulado: ${puntajeActual} + ${puntajeFinal} = ${nuevoTotal}`);
  } catch (error) {
    console.error("❌ Error al guardar el puntaje:", error);
  }
}



  function elegir(opcion) {
    if (juegoTerminado) return;

    let correcto = false;

    if (tipo === "numero") {
      correcto = opcion === numerosIngles[parseInt(pregunta) - 1];
    } else {
      const indice = diasEspañol.indexOf(pregunta);
      correcto = opcion === diasIngles[indice];
    }

    // Sonido según resultado
    const sonido = new Audio(correcto ? Correcto : Incorrecto);
    sonido.play();

    if (correcto) {
      setPuntaje((prev) => prev + 1);
      setMensaje("✅ ¡Muy bien!");
    } else {
      setMensaje("❌ Incorrecto.");
    }

    // Avanza a la siguiente pregunta o termina
    if (preguntaActual < totalPreguntas) {
      setTimeout(() => {
        setPreguntaActual((prev) => prev + 1);
        nuevaPregunta();
      }, 1000);
    } else {
      // Terminar juego después de la última pregunta
      setTimeout(async () => {
        const puntajeFinal = puntaje + (correcto ? 1 : 0);
        setJuegoTerminado(true);
        setMensaje(`Juego terminado. Tu puntaje final es ${puntajeFinal} de ${totalPreguntas}.`);
        await guardarPuntaje(puntajeFinal); //Guarda el puntaje en MongoDB
      }, 1000);
    }
  }

  function reiniciarJuego() {
    setPuntaje(0);
    setPreguntaActual(1);
    setJuegoTerminado(false);
    setMensaje("");
    nuevaPregunta();
  }

  return (
    <div className="container text-center mt-5">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", margin: "auto" }}>
        {!juegoTerminado ? (
          <>
            <h4>Pregunta {preguntaActual} de {totalPreguntas}</h4>
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
              >
                {op}
              </button>
            ))}

            <p className="mt-3 fs-5">{mensaje}</p>
            <p>Puntaje: {puntaje}</p>
          </>
        ) : (
          <>
            <h2>🎉 ¡Juego Terminado!</h2>
            <p className="fs-5">{mensaje}</p>
            <p>Puntaje final: {puntaje} de {totalPreguntas}</p>
            <button className="btn btn-success mt-3" onClick={reiniciarJuego}>
              Jugar de nuevo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
