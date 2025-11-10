import { useState, useContext } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import AutorizacionContext from "../context/AutorizacionContext";

export const Login = () => {
  const { login, isAuthenticated, user } = useContext(AutorizacionContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    const result = await login({ username, password });

    if (!result.success) {
      setLoginError(result.message || "Error al iniciar sesión");
    }
  };

  if (isAuthenticated) {
    return (
      <Container className="mt-5 text-center">
        <h3> Bienvenido {user?.nombre || user?.username}!</h3>
        <p>   Ya has iniciado sesión correctamente.</p>
      </Container>
    );
  }

  return (
    <Container className="loginContainer">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Iniciar Sesión</h3>

          {loginError && <Alert variant="danger">{loginError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername" className="input_text">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Entrar
            </Button>
          </Form>
          <p>Si no tienes cuenta Porfavor registrate <a href="/registrar"> aqui</a></p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
