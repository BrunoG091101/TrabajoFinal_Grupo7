//modelo de Datos
const mongoose = require("mongoose");
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
  nombre: String,
  apellido: String,
  fechaNac:Date,
  estado:Boolean,
  rol: {
    type: String,
    default: "alumno",
  },
  username:String,
  password:String,
  sexo:String,
  edad:String,
  puntaje: {
    type: Number,
    default: 0,
  }
  
});

module.exports = mongoose.model('user',esquemaUsuario);
