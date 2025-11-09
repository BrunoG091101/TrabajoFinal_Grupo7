import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Juegos() {
    const [juegoActual, setJuegoActual] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/juegos/${juegoActual}`);
    }, [juegoActual, navigate]);

    const ingresarJuego = (juego) => {
        setJuegoActual(juego);
    };

    return(
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <div className="contenedorJuegos">
                <h1> Diagnóstico Inglés </h1>

                <Button
                onClick={() => ingresarJuego("primerJuego")}
                >
                    Juego 1
                </Button>

                <Button
                onClick={() => ingresarJuego("segundoJuego")}
                >
                    Juego 2
                </Button>

                <Button
                onClick={() => ingresarJuego("tercerJuego")}
                >
                    Juego 3
                </Button>

                <Button
                onClick={() => ingresarJuego("cuartoJuego")}
                >
                    Juego 4
                </Button>
            </div>

            <h1> Juego Extra </h1>
            <Button
            onClick={() => ingresarJuego("juegoEstrella")}
            >
                Atrapa las estrellas
            </Button>
        </div>
    )
}

export default Juegos;