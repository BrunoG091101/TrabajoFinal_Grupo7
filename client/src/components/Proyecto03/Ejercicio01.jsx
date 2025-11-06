import { useState } from "react";

export default function Ejercicio01() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [numero3, setNumero3] = useState("");
  const [resultado, setResultado] = useState("");

  function obtenerPosicionX(...numeros) {
    for (let i = 0; i < numeros.length; i++) {
      let pos = numeros[i].indexOf("x");
      if (pos !== -1) {
        return { indiceNumero: i, posicion: pos };
      }
    }
    return null;
  }

  function restaSinNegativos(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    return a >= b ? a - b : b - a;
  }

  function calcularX(indice, posicion, n1, n2, n3) {
    let resultado;

    switch (indice) {
      case 0:
        resultado = restaSinNegativos(n2[posicion], n3[posicion]);
        if (resultado > 9) resultado = resultado % 10;
        return `El valor de x en el primer número es ${resultado}`;

      case 1:
        resultado = restaSinNegativos(n1[posicion], n3[posicion]);
        if (resultado > 9) resultado = resultado % 10;
        return `El valor de x en el segundo número es ${resultado}`;

      case 2:
        resultado = parseInt(n1[posicion]) + parseInt(n2[posicion]);
        if (resultado > 9) resultado = resultado % 10;
        return `El valor de x en el tercer número es ${resultado}`;

      default:
        return "Error al calcular X";
    }
  }

  function solucion() {
    const posicionX = obtenerPosicionX(numero1, numero2, numero3);
    let salida = "";

    if (posicionX) {
      const { indiceNumero, posicion } = posicionX;
      salida = calcularX(indiceNumero, posicion, numero1, numero2, numero3);
    } else {
      salida = "No se encontró la letra 'x' en ninguno de los números.";
    }

    setResultado(salida);
  }

  return (
    <div className="ej03_container" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Calculadora de X</h2>
    <div className="ej03_input">
        <input
        type="text"
        placeholder="Ingresa el primer número"
        value={numero1}
        onChange={(e) => setNumero1(e.target.value)}
      />
    </div>
    <div className="ej03_input">
        <input
        type="text"
        placeholder="Ingresa el segundo número"
        value={numero2}
        onChange={(e) => setNumero2(e.target.value)}
      />
    </div>
      
      <div className="ej03_input">
        <input
        type="text"
        placeholder="Ingresa el tercer número"
        value={numero3}
        onChange={(e) => setNumero3(e.target.value)}
      />
      </div>
      <div className="ej03_boton">
              <button onClick={solucion}>Calcular X</button>
      </div>

      <div className="resultado" style={{ marginTop: "15px", fontWeight: "bold" }}>
        {resultado}
      </div>
    </div>
  );
}
