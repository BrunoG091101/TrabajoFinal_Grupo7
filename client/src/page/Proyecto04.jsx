import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import '../assets/css/Proyecto04.css'
import Ejercicio01_P04 from '../components/Proyecto04/Ejercicio01_P04'
import Ejercicio02_P04 from '../components/Proyecto04/Ejercicio02_P04'

function Proyecto04() {
    return (
        <div class="P04">
            <Tabs
                defaultActiveKey="EJ1P04"
                id="tabs-proyecto02"
                className="mb-2"
                justify
            >
                <Tab eventKey="EJ1P04" title="Ejercicio 01">
                    <h1 class="h1P04">Adivina el número</h1>
                    <Ejercicio01_P04 />
                </Tab>

                <Tab eventKey="EJ2P04" title="Ejercicio 02">
                    <h1 class="h1P04">Empareja los botones</h1>
                    <Ejercicio02_P04 />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Proyecto04