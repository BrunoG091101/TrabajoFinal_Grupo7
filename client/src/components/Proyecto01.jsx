import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import '../assets/css/P01_GASPAR.css'

import PagPrin_G from "../components/Proyectos01/GASPAR/Pag-Principal_G";
import Desafio_G from "../components/Proyectos01/GASPAR/Desafio_G";

function Proyecto01() {
    const navigate = useNavigate();

    return (
        <div className="contProyecto01">
            <div class="P01">
                <Tabs
                defaultActiveKey="PagPrincipal"
                id="tabs-proyecto01"
                className="pestañasProy01"
                justify
                >
                    <Tab eventKey="PagPrincipal" title="Página principal">
                        <PagPrin_G />
                    </Tab>

                    <Tab eventKey="Desafío" title="Desafío figuras">
                        <Desafio_G />
                    </Tab>
                </Tabs>
            </div>

            <Button
            className="botonVolverP01"
            onClick={() => navigate("/aboutUs")}
            style={botonEstilo("#178314ff")}
            >
                Ocultar Proyecto
            </Button>
        </div>
    )
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

export default Proyecto01;