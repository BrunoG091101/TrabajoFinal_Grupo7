const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://ibanez_db:Comunidad123@proyectofinal.gvdaa4o.mongodb.net/usuarioso?retryWrites=true&w=majority&appName=ProyectFinal");
const objeto =mongoose.connection;
objeto.on('connected',()=>{
    console.log("Conectado a la base de datos");
});
objeto.on('error',()=>{
    console.log("Error en la coneccion de la base de datos");
});
module.exports= mongoose;