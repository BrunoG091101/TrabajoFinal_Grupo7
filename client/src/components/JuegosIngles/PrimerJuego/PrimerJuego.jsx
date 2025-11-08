import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import Nivel01_J01 from "./Niveles/Nivel01_J01";
import Nivel02_J01 from "./Niveles/Nivel02_J01";
import Nivel03_J01 from "./Niveles/Nivel03_J01";

function PrimerJuego() {
    const [nivelActual, setNivelActual] = useState(1);
    const [nivelCompletado, setNivelCompletado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/juegos/nivel0${nivelActual}`);
    }, [nivelActual, navigate]);

    const manejarCompletado = () => {
        setNivelCompletado(true);
    };

    const avanzarNivel = () => {
        if (nivelActual < 3) {
            setNivelActual((prev) => prev + 1);
            setNivelCompletado(false);
        }
    };

    const reiniciar = () => {
        setNivelActual(1);
        setNivelCompletado(false);
    };

    const renderNivel = () => {
        switch (nivelActual) {
            case 1:
                return <Nivel01_J01 onNivelCompletado={manejarCompletado} />;
            case 2:
                return <Nivel02_J01 onNivelCompletado={manejarCompletado} />;
            case 3:
                return <Nivel03_J01 onNivelCompletado={manejarCompletado} />;
            default:
                return <h2>¡Juego completado! 🎉</h2>;
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h1> Color Match - Level 1 {nivelActual}</h1>
            
            {renderNivel()}

            {nivelCompletado && (
                <div style={{ marginTop: "2rem" }}>
                    {(() => {
                        if (nivelActual < 3) {
                            return (
                                <Button
                                    onClick={avanzarNivel}
                                    style={botonEstilo("#4CAF50")}
                                >
                                    Siguiente Nivel
                                </Button>
                            );
                        } else {
                            return (
                                <Button
                                    onClick={reiniciar}
                                    style={botonEstilo("#2196F3")}
                                >
                                    Volver a empezar
                                </Button>
                            );
                        }
                    })()}
                </div>
            )}
        </div>
    );
}

// Posteriormente se implementara esto a su respectivo CSS
const botonEstilo = (color) => ({
    margin: "0.5rem",
    padding: "1rem 2rem",
    borderRadius: "1rem",
    border: "none",
    backgroundColor: color,
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
});

export default PrimerJuego;