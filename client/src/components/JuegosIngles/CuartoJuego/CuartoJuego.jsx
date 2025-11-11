import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//  Imágenes
import cabeza from '../../../assets/image/Juego4/cabeza.png';
import ojo from '../../../assets/image/Juego4/ojo.png';
import mano from '../../../assets/image/Juego4/mano.png';
import pies from '../../../assets/image/Juego4/pie.png';
import naris from '../../../assets/image/Juego4/nariz.png';

//  Sonidos
import sonidoCorrecto from '../../../assets/sound/Correcto.mp3';
import sonidoIncorrecto from '../../../assets/sound/error.mp3';
import sonidoRendirse from '../../../assets/sound/error.mp3';

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
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('');
  const [intentos, setIntentos] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Cargar sonidos
  const audioCorrecto = new Audio(sonidoCorrecto);
  const audioIncorrecto = new Audio(sonidoIncorrecto);
  const audioRendirse = new Audio(sonidoRendirse);

  useEffect(() => {
    nuevaPalabra();
  }, []);

  const elegirPalabra = () => {
    const indice = Math.floor(Math.random() * listaPalabras.length);
    return listaPalabras[indice];
  };

  const nuevaPalabra = () => {
    if (aciertos >= 5) return;
    setRespuesta('');
    setMensaje('');
    setIntentos(0);
    setPalabraActual(elegirPalabra());
  };

  const limpiarTexto = (texto) => texto.trim().toLowerCase();

  const comprobar = () => {
    if (juegoTerminado) return;

    const respuestaUsuario = limpiarTexto(respuesta);
    if (!respuestaUsuario) {
      setMensaje('Escribe algo antes de comprobar.');
      setColorMensaje('text-danger');
      return;
    }

    const respuestasCorrectas = palabras[palabraActual];
    if (respuestasCorrectas.includes(respuestaUsuario)) {
      audioCorrecto.play();
      const nuevosAciertos = aciertos + 1;
      setPuntos(puntos + 10);
      setAciertos(nuevosAciertos);
      setMensaje('¡Correcto!  +10 puntos');
      setColorMensaje('text-success');

      if (nuevosAciertos >= 5) {
        setMensaje('¡Ganaste el juego!');
        setJuegoTerminado(true);
      } else {
        setTimeout(() => nuevaPalabra(), 1000);
      }
    } else {
      const nuevoIntento = intentos + 1;
      setIntentos(nuevoIntento);
      audioIncorrecto.play();
      setErrores(errores + 1);
      setPuntos(Math.max(0, puntos - 3));

      if (nuevoIntento >= 5) {
        const respuestasCorrectas = palabras[palabraActual];
        setMensaje(`Has alcanzado el límite de intentos. Respuesta: ${respuestasCorrectas.join(', ')}`);
        setColorMensaje('text-secondary');
        setTimeout(() => nuevaPalabra(), 2000);
      } else {
        setMensaje(`Incorrecto. Intento ${nuevoIntento} de 5.`);
        setColorMensaje('text-danger');
      }
    }
  };

  const mostrarRespuesta = () => {
    if (juegoTerminado) return;
    audioRendirse.play();
    const respuestasCorrectas = palabras[palabraActual];
    setMensaje('💡 Respuesta(s): ' + respuestasCorrectas.join(', '));
    setColorMensaje('text-secondary');
  };

  const reiniciar = () => {
    if (window.confirm('¿Reiniciar el juego?')) {
      setPuntos(0);
      setAciertos(0);
      setErrores(0);
      setJuegoTerminado(false);
      nuevaPalabra();
    }
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
          Partes del cuerpo en inglés
        </h1>
        <p className="text-center" style={{ color: '#118ab2' }}>
          Mira la imagen y escribe su nombre en inglés.
        </p>

        <div className="row g-3 align-items-center">
          <div className="col-md-4 text-center">
            {rutaImagen && !juegoTerminado && (
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
              <span className="badge bg-info text-dark me-1">Puntos: {puntos}</span>
              <span className="badge bg-success me-1">Aciertos: {aciertos}</span>
              <span className="badge bg-danger">Errores: {errores}</span>
            </div>
          </div>

          <div className="col-md-8 text-center text-md-start">
            {!juegoTerminado && (
              <input
                type="text"
                className="form-control mb-2 text-center"
                style={{
                  border: '2px solid #06d6a0',
                  borderRadius: '15px',
                  fontSize: '1.1rem'
                }}
                placeholder="Respuesta"
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && comprobar()}
              />
            )}

            <div className={`fw-bold ${colorMensaje}`}>{mensaje}</div>

            {!juegoTerminado && (
              <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center justify-content-md-start">
                <button
                  className="btn"
                  onClick={comprobar}
                  style={{ backgroundColor: '#06d6a0', color: 'white', borderRadius: '15px' }}
                >
                  Comprobar
                </button>
                <button
                  className="btn"
                  onClick={nuevaPalabra}
                  style={{ backgroundColor: '#118ab2', color: 'white', borderRadius: '15px' }}
                >
                  Siguiente imagen
                </button>
                <button
                  className="btn"
                  onClick={mostrarRespuesta}
                  style={{ backgroundColor: '#ffd166', color: '#333', borderRadius: '15px' }}
                >
                  Rendirse
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <small className="text-muted">
            Imágenes: cabeza, ojo, mano, pies, naris
          </small>
          <button
            className="btn btn-danger btn-sm"
            style={{ borderRadius: '15px' }}
            onClick={reiniciar}
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}
