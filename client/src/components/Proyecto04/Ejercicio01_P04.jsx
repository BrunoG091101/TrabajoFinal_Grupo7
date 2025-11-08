import { useState } from "react";

function Ejercicio01_P04() {
    const numeroMin = 1;
    const numeroMax = 100;

    function Numero(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [random] = useState(() => Numero(numeroMin, numeroMax));

    const [numero, setNumero] = useState("");
    const [resultado, setResultado] = useState("");
    const [intentos, setIntentos] = useState(0);

    function VerificarNumero() {
        let numeroIngresado = parseInt(numero);

        if (numeroIngresado === random) {
            setResultado("¡Felicitaciones, ganaste! El número a adivinar era el " + random);
        } else if (numeroIngresado > 100 || numeroIngresado < 0 || numero === "") {
            setIntentos(intentos + 1);
            alert("Por favor, ingresa un número válido entre 0 y 100.");
        } else if (numeroIngresado < random) {
            setIntentos(intentos + 1);
            setResultado("El número " + numeroIngresado + " es menor al número a adivinar.");
        } else if (numeroIngresado > random) {
            setIntentos(intentos + 1);
            setResultado("El número " + numeroIngresado + " es mayor al número a adivinar.");
        }
    }

    function Rendirse() {
        setResultado("El número a adivinar era " + random);
    }

    return (
        <div className="contenedorValidarP04">
            <div class="Instruccion_E01">
                <h2 className="h2P04">Por favor, ingresa un número del 0 al 100</h2>
            </div>

            <div>
                <input
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="Ingresa un número"
                />
            </div>

            <div className="botonesValidar">
                <button onClick={VerificarNumero}>
                    Ingresar número
                </button>
                <button onClick={Rendirse}>Rendirse</button>
            </div>

            <div>
                <h2 className="h2P04">{resultado}</h2>
            </div>

            <div class>
                <h2 className="h2P04">Cantidad de intentos: {intentos}</h2>
            </div>
        </div>
    );
}

export default Ejercicio01_P04;