const express = require("express");
const routes = express.Router();

const usuarioModel=require('../model/usuarios.js');

routes.get('/obtenerusuario', async (req, res) => {
  try {
    const docs = await usuarioModel.find();
    res.send(docs);
  } catch (error) {
    console.log("Error al obtener usuarios", error);
    res.status(500).send({ message: "Error interno del servidor " });
  }
});

routes.post('/registrarUsuario',async(req,res)=>{
    try {
        const data={...req.body, rol:"alumno"}
        const nuevoUsuario=new usuarioModel(req.body);
        const datosGuardados = await nuevoUsuario.save();
        res.status(201).json({success:true,data: datosGuardados});
        console.log(res.message)
    } catch (error) {
        console.log("Error en /registrarUsuario :",error);
        res.status(500).json({success:false, message:'Error interno del servidor'})
    }
});

routes.get('/obtenerusuario/:username', async (req, res) => {
  try {
    const usuario = await usuarioModel.findOne({ username: req.params.username });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.log("Error al obtener usuario por username:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


routes.put('/actualizarPuntaje/:username', async (req, res) => {
  try {
    const usuario = await usuarioModel.findOne({ username: req.params.username });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Suma el nuevo puntaje al actual
    const nuevoPuntaje = (usuario.puntaje || 0) + (req.body.puntaje || 0);

    usuario.puntaje = nuevoPuntaje;
    await usuario.save();

    res.json({ message: "Puntaje acumulado correctamente", nuevoPuntaje });
  } catch (error) {
    console.log("Error al acumular puntaje:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


module.exports = routes;
