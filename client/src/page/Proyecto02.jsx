import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import "../assets/css/Proyecto02/ejercicio01.css";

import Ejercicio01 from "../components/Proyecto02/Ejercicio01";
import Ejercicio02 from "../components/Proyecto02/Ejercicio02";
import Ejercicio03 from "../components/Proyecto02/Ejercicio03";
import Ejercicio04 from "../components/Proyecto02/Ejercicio04";
import Ejercicio05 from "../components/Proyecto02/Ejercicio05";
function Proyecto02() {
  return (
    <div className="contenedor-proyecto02">

      <Tabs
        defaultActiveKey="ej1"
        id="tabs-proyecto02"
        className="mb-2"
        justify
      >
        <Tab eventKey="ej1" title="Ejercicio 01">
          <Ejercicio01 />
        </Tab>

        <Tab eventKey="ej2" title="Ejercicio 02">
          <Ejercicio02 />
        </Tab>

        <Tab eventKey="ej3" title="Ejercicio 03">
          <Ejercicio03 />
        </Tab>

        <Tab eventKey="ej4" title="Ejercicio 04">
          <Ejercicio04 />
        </Tab>

        <Tab eventKey="ej5" title="Ejercicio 05">
          <Ejercicio05 />
        </Tab>

      </Tabs>

    </div>
  );
}

export default Proyecto02;
