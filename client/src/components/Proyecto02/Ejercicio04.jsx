import { useState } from "react";

function Ejercicio04() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [libreta, setLibreta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const mostrarDatosIngresados = () => {
    if (nombre !== "" && apellido !== "" && libreta !== "") {
      setMensaje(
        `Los datos ingresados son:
        Nombre: ${nombre},
        Apellido: ${apellido},
        Libreta Universitaria: ${libreta}`
      );

      setNombre("");
      setApellido("");
      setLibreta("");
    } else {
      setMensaje("Por favor, ingrese todos los datos.");
    }
  };

  return (
    <main>
      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <div className="saludo">
          <h2>Buen día, estimado alumno</h2>
        </div>

        <div className="gestion">
          <h3>Por favor, ingrese sus datos</h3>

          <div className="nombre">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Roberto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="apellido">
            <label>Apellido</label>
            <input
              type="text"
              placeholder="Madrigal"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>

          <div className="libreta">
            <label>Libreta</label>
            <input
              type="text"
              placeholder="INF999999"
              value={libreta}
              onChange={(e) => setLibreta(e.target.value)}
            />
          </div>

          <button type="button" onClick={mostrarDatosIngresados}>
            Continuar
          </button>
        </div>

        {mensaje && <p className="resultado">{mensaje}</p>}
      </form>
    </main>
  );
}

export default Ejercicio04;
