import { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PASSWORD_REGX = {
  minLength: /^.{8,}$/,
  uppercase: /(?=.*[A-Z])/,
  lowercase: /(?=.*[a-z])/,
  number: /(?=.*\d)/,
  isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

function Registrarse() {
  const navigate = useNavigate();

  const [regError, setRegError] = useState("");
  const [validado, setValidado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [errorPassword, setErrorPassword] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  // 👇 nuevo estado para mostrar validación solo cuando se empieza a escribir
  const [mostrandoValidacion, setMostrandoValidacion] = useState(false);

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    edad: "",
    fechaNac: new Date(),
    estado: true,
    rol: "alumno",
    username: "",
    password: "",
    motivo: "",
  });

  const [mostrarNivel, setMostrarNivel] = useState(false);
  const [nivelIngles, setNivelIngles] = useState("");
  const [motivo, setMotivo] = useState("");

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // ✅ Mostrar validación solo si el usuario empezó a escribir
    if (name === "password") {
      if (value.length > 0) setMostrandoValidacion(true);
      else setMostrandoValidacion(false);

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
        setMostrarNivel(true);
      } else {
        setRegError(response.data.message || "Error desconocido durante el registro");
      }
    } catch (error) {
      console.error("Error de registro o conexión:", error);
      setRegError(error.message || "Fallo de conexión. Inténtelo más tarde");
    }
  };

  const manejarNivelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/guardarNivelIngles", {
        username: usuario.username,
        nivelIngles,
        motivo: motivo,
      });

      if (response.data.success) {
        setMensaje("Nivel de inglés y motivación guardados con éxito ✅");
        setMostrarNivel(false);

        // Redirigir al Home luego de 2 segundos
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setRegError("Error al guardar el nivel de inglés");
      }
    } catch (error) {
      console.error(error);
      setRegError("Fallo al guardar la información");
    }
  };

  const passwordInvalido = Object.values(errorPassword).some((error) => error);

  return (
    <Container className="registroContainer">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="textRegistro">
            {mostrarNivel ? "Formulario de Nivel de Inglés" : "Formulario de Registro"}
          </h2>

          {mensaje && (
            <Alert
              variant={mensaje.includes("✅") ? "success" : "warning"}
              className="text-center"
            >
              {mensaje}
            </Alert>
          )}

          {regError && (
            <Alert variant="danger" className="text-center">
              {regError}
            </Alert>
          )}

          {/* --- FORMULARIO DE REGISTRO --- */}
          {!mostrarNivel && (
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
                <Form.Label>Género</Form.Label>
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

              {/* ✅ Contraseña con validación visible solo al escribir */}
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

                {mostrandoValidacion && (
                  <div className="mt-2">
                    <div className={errorPassword.minLength ? "text-danger" : "text-success"}>
                      {errorPassword.minLength
                        ? "❌ Mínimo 8 caracteres"
                        : "✅ Tiene 8 caracteres"}
                    </div>
                    <div className={errorPassword.uppercase ? "text-danger" : "text-success"}>
                      {errorPassword.uppercase
                        ? "❌ Falta una mayúscula"
                        : "✅ Tiene una mayúscula"}
                    </div>
                    <div className={errorPassword.lowercase ? "text-danger" : "text-success"}>
                      {errorPassword.lowercase
                        ? "❌ Falta una minúscula"
                        : "✅ Tiene una minúscula"}
                    </div>
                    <div className={errorPassword.number ? "text-danger" : "text-success"}>
                      {errorPassword.number
                        ? "❌ Falta un número"
                        : "✅ Tiene un número"}
                    </div>
                  </div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Registrar
              </Button>
            </Form>
          )}

          {/* --- FORMULARIO DE NIVEL DE INGLÉS --- */}
          {mostrarNivel && (
            <Form onSubmit={manejarNivelSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>¿Cuál es tu nivel de inglés?</Form.Label>
                <Form.Select
                  value={nivelIngles}
                  onChange={(e) => setNivelIngles(e.target.value)}
                  required
                >
                  <option value="">Selecciona tu nivel</option>
                  <option value="básico">Básico</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>¿Qué te motiva a aprender inglés?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Escribe tu motivación aquí..."
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Guardar nivel de inglés
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Registrarse;
