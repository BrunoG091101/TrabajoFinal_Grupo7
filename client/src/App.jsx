import { Routes, Route } from "react-router-dom";
import Layout from "./components/Loyout";
import About from "./page/AboutUs";
import Juegos from "./page/Juegos";
<<<<<<< Updated upstream
=======
//Zona Juegos
import JuegoEstrella from "./components/JuegoEstrella";
import PrimerJuego from "./components/JuegosIngles/PrimerJuego/PrimerJuego"
//Fin zona Juego
>>>>>>> Stashed changes
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
function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/aboutUs" element={<About />} />

          {/* Ruta protegida para ALUMNO */}
<<<<<<< Updated upstream
          <Route
            path="/juegos"
            element={
              <ProtectorRutas allowedRoles={["ALUMNO", "ADMINISTRATIVO"]}>
                <Juegos />
              </ProtectorRutas>
            }
          />
=======
          <Route path="/juegos" element={<ProtectorRutas allowedRoles={["ALUMNO", "ADMINISTRATIVO"]} />}>
            <Route index element={<Juegos />} />
            <Route path="juegoEstrella" element={<JuegoEstrella />} />
            <Route path="primerJuego/*" element={<PrimerJuego />} />
          </Route>

>>>>>>> Stashed changes

          {/* Ruta protegida para ADMINISTRATIVO */}
          <Route element={<ProtectorRutas allowedRoles={["ADMINISTRATIVO"]} />}>
            <Route path="/proyecto02" element={<Proyecto02 />} />
            <Route path="/proyecto03" element={<Proyecto03/>}/>
            <Route path="/proyecto04" element={<Proyecto04 />} />
            <Route path="/proyecto05" element={<Proyecto05 />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
