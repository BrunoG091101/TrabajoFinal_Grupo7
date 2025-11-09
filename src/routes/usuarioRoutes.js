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
module.exports = routes;
