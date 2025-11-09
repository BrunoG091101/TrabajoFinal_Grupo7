import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const PASSWORD_REGX = {
  minLength: /^.{8,}$/,
  uppercase: /(?=.*[A-Z])/,
  lowercase: /(?=.*[a-z])/,
  number: /(?=.*\d)/,
  isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

function Registrarse() {
  const [regError, setRegError] = useState("");
  const [validado, setValidado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [errorPassword, setErrorPassword] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    edad: "",
    fechaNac: new Date(),
    estado: true,
    rol:"alumno",
    username: "",
    password: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validar la contraseña mientras se escribe
    if (name === "password") {
      setErrorPassword({
        minLength: !PASSWORD_REGX.minLength.test(value),
        uppercase: !PASSWORD_REGX.uppercase.test(value),
        lowercase: !PASSWORD_REGX.lowercase.test(value),
        number: !PASSWORD_REGX.number.test(value),
      });
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setRegError("");
    setMensaje("");

    const form = e.currentTarget;
    const passwordValido = PASSWORD_REGX.isValid.test(usuario.password);

    if (!form.checkValidity() || !passwordValido) {
      setValidado(true);
      setMensaje("Error en el formulario. Revisa los campos.");
      return;
    }

    try {
      const response = await axios.post("/api/registrarUsuario", usuario);

      if (response.data.success) {
        setMensaje("Usuario registrado con éxito");
        console.log("Usuario registrado con éxito en la BD");
      } else {
        setRegError(response.data.message || "Error desconocido durante el registro");
      }
    } catch (error) {
      console.error("Error de registro o conexión:", error);
      setRegError(error.message || "Fallo de conexión. Inténtelo más tarde");
    }

    // Resetear formulario
    setUsuario({
      nombre: "",
      apellido: "",
      sexo: "",
      edad: "",
      fechaNac: new Date(),
      estado: true,
      username: "",
      password: "",
    });
    setValidado(false);
    setErrorPassword({
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
    });
  };

  const passwordInvalido = Object.values(errorPassword).some((error) => error);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Formulario de Registro</h2>

          {/* Mensajes */}
          {mensaje && (
            <Alert
              variant={mensaje.includes("✅") ? "success" : "warning"}
              onClose={() => setMensaje("")}
              dismissible
            >
              {mensaje}
            </Alert>
          )}

          {regError && (
            <Alert variant="danger" onClose={() => setRegError("")} dismissible>
              {regError}
            </Alert>
          )}

          <Form noValidate validated={validado} onSubmit={manejarSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={usuario.apellido}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={usuario.username}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sexo</Form.Label>
              <Form.Select
                name="sexo"
                value={usuario.sexo}
                onChange={manejarCambio}
                required
              >
                <option value="">Selecciona tu sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="edad"
                value={usuario.edad}
                onChange={manejarCambio}
                min="1"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={usuario.password}
                onChange={manejarCambio}
                required
                isInvalid={passwordInvalido}
              />
              <Form.Text className="text-muted">
                La contraseña debe tener al menos 8 caracteres, una mayúscula,
                una minúscula y un número.
              </Form.Text>
              {Object.entries(errorPassword).map(([key, error]) =>
                error ? (
                  <div key={key} className="text-danger">
                    ❌ {key} inválido
                  </div>
                ) : null
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Registrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Registrarse;
