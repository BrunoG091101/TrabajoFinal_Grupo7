import { useState } from "react";

export default function Vista() {
  const [mascotas, setMascotas] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    tipo: "",
    edad: "",
    nombre_dueño: "",
    estado_vacunacion: "No",
  });

  // Agregar nueva mascota
  function agregarMascota(e) {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.tipo ||
      !formData.edad ||
      !formData.nombre_dueño
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevaMascota = {
      ...formData,
      id: Date.now(),
    };

    setMascotas([...mascotas, nuevaMascota]);
    setFormData({
      id: "",
      nombre: "",
      tipo: "",
      edad: "",
      nombre_dueño: "",
      estado_vacunacion: "No",
    });
  }

  // Eliminar mascota por id
  function eliminarMascota(id) {
    const filtradas = mascotas.filter((m) => m.id !== id);
    setMascotas(filtradas);
  }

  // Resumen de vacunación
  const total = mascotas.length;
  const vacunadas = mascotas.filter((m) => m.estado_vacunacion === "Si").length;
  const noVacunadas = total - vacunadas;

  return (
    <div className="ej03_conteiner" style={{ padding: "20px" }}>
      <h2>Registro de Mascotas</h2>

      <form
        onSubmit={agregarMascota}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div>
          <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        </div>
        <div>
          <input
          type="text"
          placeholder="Tipo (perro, gato, etc.)"
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
        />
        </div>
        <div>
          <input
          type="number"
          placeholder="Edad"
          value={formData.edad}
          onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
        />
        </div>
        <div>
          <input
          type="text"
          placeholder="Nombre del dueño"
          value={formData.nombre_dueño}
          onChange={(e) =>
            setFormData({ ...formData, nombre_dueño: e.target.value })
          }
        />
        </div>
        <div>
          <select
          value={formData.estado_vacunacion}
          onChange={(e) =>
            setFormData({ ...formData, estado_vacunacion: e.target.value })
          }
        >
          <option value="Si">Vacunado</option>
          <option value="No">No vacunado</option>
        </select>
        </div>
        <div>
          <button type="submit">Agregar Mascota</button>
        </div>
        
      </form>

      <div id="mascotas_registradas">
        {mascotas.map((m) => (
          <div
            key={m.id}
            className="tarjeta"
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
              textAlign: "left",
            }}
          >
            <p>
              <strong>Nombre: </strong>
              {m.nombre}
            </p>
            <p>
              <strong>Tipo: </strong>
              {m.tipo}
            </p>
            <p>
              <strong>Edad: </strong>
              {m.edad}
            </p>
            <p>
              <strong>Dueño: </strong>
              {m.nombre_dueño}
            </p>
            <p>
              <strong>Vacunado: </strong>
              {m.estado_vacunacion}
            </p>
            <button onClick={() => eliminarMascota(m.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      <div id="resumen" style={{ marginTop: "20px" }}>
        <p>
          <strong>Total de mascotas registradas:</strong> {total}
        </p>
        <p>
          <strong>Vacunadas:</strong> {vacunadas}
        </p>
        <p>
          <strong>No vacunadas:</strong> {noVacunadas}
        </p>
      </div>
    </div>
  );
}
