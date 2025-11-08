import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; // ✅ Importar botón

import imagenCordoba from "../assets/image/AboutUs/usuario.png";
import imagenFlores from "../assets/image/AboutUs/usuario.png";
import imagenIbañez from "../assets/image/AboutUs/usuario.png";
import imagenGaspar from "../assets/image/AboutUs/usuario.png";
import logogit from "../assets/image/AboutUs/logoGithub.png";

export default function AboutUs() {
    return (
        <div className="cartasAboutUs">
            <Card className="cartaCordoba" style={{ width: "24rem", margin: "auto" }}>
                <div className="imgCordoba">
                    <Card.Img variant="top" src={imagenCordoba} alt="imagenCordoba" />
                </div>
                <Card.Body>
                    <Card.Title>Cordoba Agustina</Card.Title>
                    <Card.Text>
                        {""}
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
                        {""}
                    </Card.Text>
                    <Button
                        variant="dark"
                        href="https://github.com/usuarioGaspar"//cambiar aqui el link para el perfil
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
                        {""}
                    </Card.Text>
                    <Button
                        variant="dark"
                        href="https://github.com/usuarioGaspar"//Cambiar link
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
                    <Card.Img variant="top" src={imagenGaspar} alt="imagenGaspar" />
                </div>
                <Card.Body>
                    <Card.Title>Bruno Ramiro Gaspar</Card.Title>
                    <Card.Text>
                     {""}
                    </Card.Text>
                    <Button
                        variant="dark"
                        href="https://github.com/usuarioGaspar"//Cambiar link perfil
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
    );
}
