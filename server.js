const express=require('express');
const app =express();

//endpoint metodo get o post
app.get('/',(req,res)=>{
    res.end("Bienvenido");
})

//routing
const archivosDB=require('./conection.js');
const usuarios=require('./src/routes/usuarioRoutes.js');
//midlware
app.use(express.json());
app.use('/api',usuarios);

//listening
app.listen(5000,()=>{
    console.log("Servidor corriendo");
});