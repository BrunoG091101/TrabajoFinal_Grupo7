import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../assets/css/Juegos.css'

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
        <div className="contPrincipalJuegos" style={{ textAlign: "center", marginTop: "2rem" }}>
            <div className="contJuegosIngles">
                <h1> Diagnóstico Inglés </h1>

                <div className="botonesJuegos">
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
            </div>

            <div className="contJuegoExtra">
                <h1> Juego Extra </h1>
                <Button
                onClick={() => ingresarJuego("juegoEstrella")}
                >
                    Atrapa las estrellas
                </Button>
            </div>
        </div>
    )
}

export default Juegos;