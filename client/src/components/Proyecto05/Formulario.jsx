import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Formulario() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    const generarId = () => {
        return Date.now().toString() + Math.random().toString(36).substring(2);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (nombre && apellido && email && password) {
            const newUser = {
                id: generarId(),
                nombre,
                apellido,
                email,
            };
            setUsers([...users, newUser]);
            setNombre("");
            setApellido("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <Container className="ej05_contenedor">
            <h2 className="mb-4">Formulario de Registro</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrar
                </Button>
            </Form>

            <div className="mt-5">
                <h3>Usuarios registrados:</h3>
                {users.map((user) => (
                    <Card key={user.id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{user.nombre} {user.apellido}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}<br />
                                <strong>ID único:</strong> {user.id}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default Formulario;
