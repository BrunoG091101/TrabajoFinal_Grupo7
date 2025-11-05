import { useState } from "react";
import "../../assets/css/Proyecto02/ejercicio03.css";

function Ejercicio03() {
  const [entrada, setEntrada] = useState("");
  const [resultado, setResultado] = useState("");

  const resolverCodigo = () => {
    if (!entrada) {
      setResultado(" Ingresa un código primero");
      return;
    }

    let codigo = entrada.split("");
    let codigoResuelto = [];

    for (let i = 0; i < codigo.length; i++) {
      let caracter = codigo[i];

      // Número mayor a 4
      if (!isNaN(caracter) && Number(caracter) > 4) {
        setResultado("Un número del código es mayor a 4");
        return;
      }

      // Signo de pregunta
      if (caracter === "?") {
        let numeroAnterior = parseInt(codigo[i - 1]);
        let numeroSiguiente = parseInt(codigo[i + 1]);

        if (i === 0) {
          codigoResuelto.push(numeroSiguiente);
        } else if (i === codigo.length - 1) {
          codigoResuelto.push(numeroAnterior);
        } else {
          codigoResuelto.push(numeroAnterior + numeroSiguiente);
        }
      } else {
        codigoResuelto.push(caracter);
      }
    }

    setResultado(`Código resuelto: ${codigoResuelto.join("")}`);
  };

  return (
    <div className="Ejercicio03_contenedor">
      <div className="Tarjeta">
        <h2>Ingrese código con dígitos 0-4 y ?</h2>
        <div className="ej03_input">
            <input
          type="text"
          placeholder="1?2?4"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
        />
        </div>
        
        <div className="ej03_boton">
          <button onClick={resolverCodigo}>Resolver</button>
        </div>

        <div className="resultado">
          <h3>Entrada: {entrada}</h3>
          <h3>{resultado}</h3>
        </div>
      </div>
    </div>
  );
}

export default Ejercicio03;
