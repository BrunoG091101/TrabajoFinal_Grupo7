import { useState } from "react";
import "../../assets/css/Proyecto02/ejercicio05.css";

export default function Ejercicio05() {
  const [nombre, setNombre] = useState("");
  const [horas, setHoras] = useState("");
  const [pagoHora, setPagoHora] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularPago = () => {
    if (!nombre || !horas || !pagoHora) {
      setResultado("Por favor completa todos los campos");
      return;
    }

    let horasNum = Number(horas);
    let pagoNum = Number(pagoHora);

    let sueldo = horasNum * pagoNum;

    if (horasNum > 160) {
      sueldo += sueldo * 0.2;
    }

    setResultado(`Hola ${nombre}, tu pago mensual es de $${sueldo} pesos`);
  };

  return (
    <div id="ej05_container">
      <h2>Simulador de salario mensual</h2>
      <h4>Ingresa tus datos y calcula tu pago mensual</h4>

      <form id="formulario" onSubmit={(e) => e.preventDefault()}>
        
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          placeholder="Escribe tu nombre"
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Horas trabajadas al mes:</label>
        <input
          type="number"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
        />

        <label>Pago por hora:</label>
        <input
          type="number"
          value={pagoHora}
          onChange={(e) => setPagoHora(e.target.value)}
        />

        <button type="button" onClick={calcularPago}>
          Calcular pago
        </button>

        <p style={{ marginTop: "15px", fontWeight: "bold" }}>
          {resultado}
        </p>
      </form>
    </div>
  );
}
