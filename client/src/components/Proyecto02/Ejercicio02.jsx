import { useState } from "react";
import "../../assets/css/Proyecto02/ejercicio02.css";
function Ejercicio02() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [numero3, setNumero3] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularPromedio = () => {
    const n1 = parseInt(numero1);
    const n2 = parseInt(numero2);
    const n3 = parseInt(numero3);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      setResultado("Ingrese los tres números enteros.");
      return;
    }

    const promedio = (n1 + n2 + n3) / 3;
    setResultado(` El promedio es: ${promedio}`);
  };

  return (
    <div className="Ejercicio02_contenedor">
      <h2>Calcular Promedio de 3 Números</h2>

      <input
        type="number"
        placeholder="Primer número"
        value={numero1}
        onChange={(e) => setNumero1(e.target.value)}
      />

      <input
        type="number"
        placeholder="Segundo número"
        value={numero2}
        onChange={(e) => setNumero2(e.target.value)}
      />

      <input
        type="number"
        placeholder="Tercer número"
        value={numero3}
        onChange={(e) => setNumero3(e.target.value)}
      />

      <button type="button" onClick={calcularPromedio}>
        Calcular Promedio
      </button>

      <h3 id="resultado">{resultado}</h3>
    </div>
  );
}

export default Ejercicio02;
