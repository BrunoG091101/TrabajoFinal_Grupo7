import { Outlet, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import imagenCordoba from "../assets/image/AboutUs/imagenCordoba.jpg";
import imagenFlores from "../assets/image/AboutUs/fer.jpg";
import imagenIbañez from "../assets/image/AboutUs/Eze.jpg";
import imagenGaspar from "../assets/image/AboutUs/imagenGaspar.jpg";
import logogit from "../assets/image/AboutUs/logoGithub.png";

export default function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="contAboutUs">
            <div className="cartasAboutUs">
                <Card className="cartaCordoba" style={{ width: "24rem", margin: "auto" }}>
                    <div className="imgCordoba">
                        <Card.Img variant="top" src={imagenCordoba} alt="imagenCordoba" width="auto" height="auto"/>
                    </div>
                    <Card.Body>
                        <Card.Title>Cordoba Agustina Ayelen </Card.Title>
                        <Card.Text>
                        Estudiante  de primer año en la Tecnicatura Universitaria en Diseño Integral de Videojuegos.{""}
                        </Card.Text>
                        <Button
                            variant="dark"
                            href="https://github.com/AgustinaAyelenCordoba"
                            target="_blank"
                        >
                            <img
                                src={logogit}
                                alt="GitHub"
                                style={{ width: "20px", height: "20px" }}
                            />
                            GitHub
                        </Button>
                    </Card.Body>
                </Card>

                <Card className="cartaFlores" style={{ width: "24rem", margin: "auto" }}>
                    <div className="imgFlores">
                        <Card.Img variant="top" src={imagenFlores} alt="imagenFlores" />
                    </div>
                    <Card.Body>
                        <Card.Title>Flores Jose Fernando</Card.Title>
                        <Card.Text>
                            Estudiante de la tecnicatura Universitaria en diseño integral de videojuegos, 
                            Mi objetivo es seguir creciendo en el ambito del diseño y desarrollo de videojuegos.
                        </Card.Text>
                        <Button
                            variant="dark"
                            href="https://github.com/FerchuTM"//cambiar aqui el link para el perfil
                            target="_blank"
                        >
                            <img
                                src={logogit}
                                alt="GitHub"
                                style={{ width: "20px", height: "20px" }}
                            />
                            GitHub
                        </Button>
                    </Card.Body>
                </Card>

            <Card className="cartaIbañez" style={{ width: "24rem", margin: "auto" }}>
                <div className="imgIbañez">
                    <Card.Img variant="top" src={imagenIbañez} alt="imagenIbañez" />
                </div>
                <Card.Body>
                    <Card.Title>Mario Ezequiel Ibañez</Card.Title>
                    <Card.Text>
                        Estudiante de la Facultad de Ingenieria(UNJU) en la carrera 
                        Tecnicatura en diseño Integral Video Juego {""}
                    </Card.Text>
                    <Button
                        variant="dark"
                        href="https://github.com/IbanezMarioEzequiel"//Cambiar link
                        target="_blank"
                    >
                        <img
                            src={logogit}
                            alt="GitHub"
                            style={{ width: "20px", height: "20px" }}
                        />
                        GitHub
                    </Button>
                </Card.Body>
            </Card>

                <Card className="cartaGaspar" style={{ width: "24rem", margin: "auto" }}>
                    <div className="imgGaspar">
                        <Card.Img variant="top" src={imagenGaspar} alt="imagenGaspar" width="auto" height="auto"/>
                    </div>
                    <Card.Body className="infoGaspar">
                        <Card.Title>Bruno Ramiro Gaspar</Card.Title>
                        <Card.Text>
                            {"Tengo 24 años y soy estudiante de la Facultad de Ingenieria (UNJU) desde 2023, ya tenía algunos conocimientos básicos de programación antes de ingresar y los reforcé estudiando aquí mientras fui adquiriendo otros nuevos. Las aficiones que más me gustan de esta carrera son programación y diseño de sonido"}
                        </Card.Text>
                        <Button
                            variant="dark"
                            href="https://github.com/BrunoG091101"
                            target="_blank"
                        >
                            <img
                                src={logogit}
                                alt="GitHub"
                                style={{ width: "20px", height: "20px" }}
                            />
                            GitHub
                        </Button>
                    </Card.Body>
                </Card>
            </div>
                
            <div className="ejemploP01">
                <h1> Ejemplo de Proyecto 01 </h1>
                <h3> Este es el primer trabajo de la materia, el cuál hicimos individualmente </h3>
                <Button
                onClick={() => navigate("proyecto01")}
                style={botonEstilo("#2196F3")}
                >
                    Mostrar Proyecto
                </Button>
            </div>

            <Outlet />
        </div>
    );
}

const botonEstilo = (color) => ({
    margin: "0.5rem",
    padding: "1rem 2rem",
    borderRadius: "1rem",
    border: "none",
    backgroundColor: color,
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer"
});