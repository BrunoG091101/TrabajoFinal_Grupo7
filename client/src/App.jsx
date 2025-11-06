import { Routes, Route } from "react-router-dom";
import Layout from "./components/Loyout";
import About from "./page/AboutUs";
import Juegos from "./page/Juegos";
import Error from "./page/Error";
<<<<<<< Updated upstream
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Proyectos from "./page/Proyectos";
=======
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//zona proyectos
import PagPrin_G from "./components/Proyectos01/GASPAR/Pag-Principal_G";
import Proyecto02 from "./page/Proyecto02";
import Proyecto03 from "./page/Proyecto03";
>>>>>>> Stashed changes
import Proyecto04 from "./page/Proyecto04";
import Login from "./components/Login";
import ProtectorRutas from "./components/ProtectorRutas";
function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/aboutUs" element={<About />} />
          
          {/* Ruta protegida para ALUMNO */}
          <Route path="/juegos" element={
            <ProtectorRutas allowedRoles={['ALUMNO','ADMINISTRATIVO']}>
              <Juegos />
            </ProtectorRutas>
          } />

          {/* Ruta protegida para ADMINISTRATIVO */}
          <Route path="/proyectos" element={
            <ProtectorRutas allowedRoles={['ADMINISTRATIVO']}>
              <Proyectos />
            </ProtectorRutas>
          } />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
