import { Routes, Route } from "react-router-dom";
import Layout from "./components/Loyout";
import About from "./page/AboutUs";
import Juegos from "./page/Juegos";
import Error from "./page/Error";
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Proyectos from "./page/Proyectos";
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
