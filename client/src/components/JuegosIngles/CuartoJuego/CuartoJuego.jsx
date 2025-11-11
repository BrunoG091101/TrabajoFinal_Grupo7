import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 🔹 Imágenes importadas
import cabeza from '../../../assets/image/Juego4/cabeza.png';
import ojo from '../../../assets/image/Juego4/ojo.png';
import mano from '../../../assets/image/Juego4/mano.png';
import pies from '../../../assets/image/Juego4/pie.png';
import naris from '../../../assets/image/Juego4/nariz.png';

const imagenes = { cabeza, ojo, mano, pies, naris };

export default function BodyPartsGame() {
  const palabras = {
    cabeza: ['head'],
    ojo: ['eye'],
    mano: ['hand'],
    pies: ['feet', 'foot'],
    naris: ['nose', 'nostril', 'naris']
  };

  const listaPalabras = Object.keys(palabras);

  const [palabraActual, setPalabraActual] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [intentos, setIntentos] = useState(5);
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('');
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  useEffect(() => {
    nuevaPalabra();
  }, []);

  const elegirPalabra = () => {
    const indice = Math.floor(Math.random() * listaPalabras.length);
    return listaPalabras[indice];
  };

  const nuevaPalabra = () => {
    setRespuesta('');
    setMensaje('');
    setPalabraActual(elegirPalabra());
  };

  const limpiarTexto = (texto) => texto.trim().toLowerCase();

  const comprobar = () => {
    if (juegoTerminado) return;

    const respuestaUsuario = limpiarTexto(respuesta);
    if (!respuestaUsuario) {
      setMensaje('✏️ Escribe algo antes de comprobar.');
      setColorMensaje('text-danger');
      return;
    }

    const respuestasCorrectas = palabras[palabraActual];
    if (respuestasCorrectas.includes(respuestaUsuario)) {
      setPuntos(puntos + 10);
      setMensaje('🎉 ¡Correcto! +10 puntos');
      setColorMensaje('text-success');

      if (intentos - 1 === 0) {
        setJuegoTerminado(true);
        setMensaje('🏆 ¡Ganaste el juego!');
      } else {
        setTimeout(() => {
          setIntentos(intentos - 1);
          nuevaPalabra();
        }, 1000);
      }
    } else {
      setColorMensaje('text-danger');
      setMensaje('❌ Fallaste. Juego terminado.');
      setJuegoTerminado(true);
    }
  };

  const rendirse = () => {
    setJuegoTerminado(true);
    setMensaje('🏳️ Te rendiste. Fin del juego.');
    setColorMensaje('text-secondary');
  };

  const reiniciar = () => {
    setJuegoTerminado(false);
    setPuntos(0);
    setIntentos(5);
    setMensaje('');
    nuevaPalabra();
  };

  const rutaImagen = imagenes[palabraActual];

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: '#fffdf5',
        backgroundImage:
          'radial-gradient(circle at 10% 10%, #ffe4e1 0%, transparent 40%), radial-gradient(circle at 90% 90%, #e0f7fa 0%, transparent 40%)',
        fontFamily: 'Comic Sans MS, Poppins, sans-serif'
      }}
    >
      <div
        className="card text-dark p-4 shadow-lg w-100"
        style={{
          maxWidth: '700px',
          borderRadius: '25px',
          backgroundColor: '#ffffff',
          border: '5px solid #ffd166'
        }}
      >
        <h1 className="text-center mb-3" style={{ color: '#ef476f' }}>
          🧠 Partes del cuerpo en inglés
        </h1>
        <p className="text-center" style={{ color: '#118ab2' }}>
          Mira la imagen y escribe su nombre en inglés.
        </p>

        {!juegoTerminado ? (
          <div className="row g-3 align-items-center">
            <div className="col-md-4 text-center">
              {rutaImagen && (
                <img
                  src={rutaImagen}
                  alt={palabraActual}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'contain',
                    borderRadius: '20px',
                    backgroundColor: '#f9f9f9',
                    border: '3px solid #ffd166',
                    padding: '10px'
                  }}
                />
              )}
              <div className="mt-3">
                <span className="badge bg-info text-dark me-1">🌟 Puntos: {puntos}</span>
                <span className="badge bg-warning text-dark">Intentos restantes: {intentos}</span>
              </div>
            </div>

            <div className="col-md-8 text-center text-md-start">
              <input
                type="text"
                className="form-control mb-2 text-center"
                style={{
                  border: '2px solid #06d6a0',
                  borderRadius: '15px',
                  fontSize: '1.1rem'
                }}
                placeholder="✏️ Escribe en inglés..."
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && comprobar()}
              />

              <div className={`fw-bold ${colorMensaje}`}>{mensaje}</div>

              <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center justify-content-md-start">
                <button
                  className="btn"
                  onClick={comprobar}
                  style={{ backgroundColor: '#06d6a0', color: 'white', borderRadius: '15px' }}
                >
                  ✅ Comprobar
                </button>
                <button
                  className="btn"
                  onClick={rendirse}
                  style={{ backgroundColor: '#ffd166', color: '#333', borderRadius: '15px' }}
                >
                  🏳️ Rendirse
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className={colorMensaje}>{mensaje}</h3>
            <p>Puntaje final: {puntos}</p>
            <button
              className="btn btn-danger mt-3"
              style={{ borderRadius: '15px' }}
              onClick={reiniciar}
            >
              🔁 Reiniciar juego
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
