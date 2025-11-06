import { useState,useEffect } from "react";

function Ejercicio02_P04() {
    const [boton, setBoton] = useState(Array(5).fill("#777777ff"));
    const [intento, setIntento] = useState(0);
    const [mensaje, setMensaje] = useState("");
    const colores = ["#0CA589", "#60991fff", "#C82C31"
    , "#5507CA","#6e00a1ff","#AE13F6","#1414B1","#F56CDA","#6C95F5"
    ,"#77000A"];

    const colorAleatorio = () => {
        let randomColor = Math.floor(Math.random() * colores.length);
        return colores[randomColor];
    };

    const cambiarColor = () => {
        const nuevoColor = boton.map(() => colorAleatorio());
        setBoton(nuevoColor);
        setIntento(intento + 1);
    };

    useEffect(() => {
        const contador = {};

        boton.forEach((color) => {
            contador[color] = (contador[color] || 0) + 1;
        });

        const repetido = Object.values(contador).some(
            (cantidad) => cantidad >= 3
        );

        if (repetido && intento > 0) {
            setMensaje("¡Ganaste!");
        } else {
            setMensaje("");
        }
    }, [boton]);
    
    return(
        <div className="contenedorBoton">
            <div classname="Instruccion_E02">
                <h2 className="h2P04">Haz que 3 o más botones coincidan de color</h2>
            </div>

            <div className="botones">
                {boton.map((color,index)=>(
                <button class="botonP04"
                key={index}
                onClick={cambiarColor}
                style={{backgroundColor:color}}
                >Botón {index+1}</button>
                ))}
            </div>

            <div>
                <h2 class="h2P04">{mensaje}</h2>
            </div>

            <div class>
                <h2 class="h2P04">Cantidad de intentos: {intento}</h2>
            </div>
        </div>
    )
}

export default Ejercicio02_P04