import { Outlet, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import logo from "../assets/image/logo.jpg";
import Footer from "./Footer";
import { useAutenticacion } from "../hook/useAutorizacion";

function Layout() {
  const { user, isAuthenticated, logout } = useAutenticacion();

  return (
    <>
      {/* Navbar fija arriba */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <Image
              src={logo}
              alt="logo"
              width="100"
              height="100"
              className="me-2"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/aboutUs">
                About Us
              </Nav.Link>

              {/* Mostrar "Juegos" si está autenticado o es rol andmin*/}
              {(isAuthenticated || user?.rol==="admin") &&(
                <Nav.Link as={NavLink} to="/juegos">
                  Juegos
                </Nav.Link>
              )}

              {/* Mostrar "Proyectos" solo si el rol es admin */}
              {isAuthenticated && user?.rol === "admin" && (
                <NavDropdown title="Proyectos" id="Proyectos-dropdown">
                  <NavDropdown.Item href="/proyecto02">Proyecto02</NavDropdown.Item>
                  <NavDropdown.Item href="/proyecto03">Proyecto03</NavDropdown.Item>
                  <NavDropdown.Item href="/proyecto04">Proyecto04</NavDropdown.Item>
                  <NavDropdown.Item href="/proyecto05">Proyecto05</NavDropdown.Item>  
                </NavDropdown>
              )}
            </Nav>

            {/* Menú de usuario */}
            {isAuthenticated && user && (
              <Nav className="ms-auto">
                <NavDropdown title={user.username} id="user-dropdown">
                  <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {!isAuthenticated && !user &&(
              <Nav className="registrar">
                <NavDropdown title="Perfil">
                  <NavDropdown.Item href="/registrar">Registrar</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenido dinámico */}
      <Container className="mt-4">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
