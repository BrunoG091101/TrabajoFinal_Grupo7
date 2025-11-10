import { Routes, Route } from "react-router-dom";
import Layout from "./components/Loyout";
import About from "./page/AboutUs";
import Juegos from "./page/Juegos";
//Zona Juegos
import JuegoEstrella from "./components/JuegoEstrella";
import PrimerJuego from "./components/JuegosIngles/PrimerJuego/PrimerJuego"
import SegundoJuego from "./components/JuegosIngles/SegundoJuego/SegundoJuego";
import TercerJuego from "./components/JuegosIngles/TercerJuego/TercerJuego";
import CuartoJuego from "./components/JuegosIngles/CuartoJuego/CuartoJuego"; 
//Fin zona Juego
import Error from "./page/Error";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//zona proyectos
import PagPrin_G from "./components/Proyectos01/GASPAR/Pag-Principal_G";
import Desafio_G from "./components/Proyectos01/GASPAR/Desafio_G";
import Proyecto02 from "./page/Proyecto02";
import Proyecto03 from "./page/Proyecto03";
import Proyecto04 from "./page/Proyecto04";
import Proyecto05 from "./page/Proyecto05";
//fin zona proyectos
import Login from "./components/Login";
import ProtectorRutas from "./components/ProtectorRutas";
import Registro from "./page/Registro";
function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/registrar" element={<Registro/>}/>

          {/* Ruta protegida para alumno */}
          <Route path="/juegos" element={<ProtectorRutas allowedRoles={["alumno", "admin"]} />}>
            <Route index element={<Juegos />} />
            <Route path="juegoEstrella" element={<JuegoEstrella />} />
            <Route path="primerJuego/*" element={<PrimerJuego />} />
            <Route path="segundoJuego" element={<SegundoJuego/>}/>
            <Route path="tercerJuego" element={<TercerJuego/>}/>
            <Route path="cuartoJuego" element={<CuartoJuego/>}/>
          </Route>
            <Route path="/proyecto02" element={<Proyecto02 />} />
            <Route path="/proyecto03" element={<Proyecto03 />} />
            <Route path="/proyecto04" element={<Proyecto04 />} />
            <Route path="/proyecto05" element={<Proyecto05 />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
