import { useState } from "react";

function Ejercicio01() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState("");

  function calcularMayor() {
    const numero1 = Number(num1);
    const numero2 = Number(num2);

    if (isNaN(numero1) || isNaN(numero2) || num1 === "" || num2 === "") {
      setResultado("Por favor, ingresa ambos números.");
    } else if (numero1 > numero2) {
      setResultado(`El número mayor es: ${numero1}`);
    } else if (numero2 > numero1) {
      setResultado(`El número mayor es: ${numero2}`);
    } else {
      setResultado("Ambos números son iguales");
    }
  }

  return (
    <div className="contenedor">
      <section className="seccion-formulario">
        <form className="formulario" onSubmit={(e) => e.preventDefault()}>
          <h2>Comparar Números</h2>
          <h4>Ingresa dos números para saber cuál es mayor</h4>

          <div className="campo">
            <input
              type="text"
              placeholder="Primer Número"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>

          <div className="campo">
            <input
              type="text"
              placeholder="Segundo Número"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>

          <button type="button" onClick={calcularMayor}>
            Calcular
          </button>
        </form>

        {resultado && <div className="Resultado">{resultado}</div>}
      </section>
    </div>
  );
}

export default Ejercicio01;
