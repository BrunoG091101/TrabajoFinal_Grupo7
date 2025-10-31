const express = require("express");
const routes = express.Router();

//modelo de Datos
const mongoose = require("mongoose");
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
  username: String,
  password: String,
  rol: String,
  name: String,
});

const listaUsuario = mongoose.model('users', esquemaUsuario);



routes.get('/obtenerusuario', async (req, res) => {
  try {
    const docs = await listaUsuario.find();
    res.send(docs);
  } catch (error) {
    console.log("Error al obtener usuarios", error);
    res.status(500).send({ message: "Error interno del servidor " });
  }
});

module.exports = routes;
